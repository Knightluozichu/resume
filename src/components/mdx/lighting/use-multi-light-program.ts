"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  CUBE_VERTICES_NORMAL,
  mat3Create,
  mat3NormalFromMat4,
  mat4Create,
  mat4LookAt,
  mat4Multiply,
  mat4Perspective,
  mat4Translate,
  type Vec3,
} from "../camera/camera-math";

/**
 * 裸 WebGL2 多光源 Demo 引擎（「光照篇」multiple-lights 章专用，HEL-66）。
 *
 * 场景：一个带法线的立方体居中，固定相机斜视，深色背景。同时叠加三类光：
 *  - 1 盏平行光 directional（可开关 + 方向/颜色/强度）
 *  - 至多 MAX_POINT_LIGHTS 盏点光源 point（可增删 + 方位/颜色/衰减档位），用固定大小
 *    uniform 数组 + uActivePointCount 循环防越界；每盏画一个小自发光立方体标记位置
 *  - 1 盏聚光 spot（可开关 + 朝向/颜色/切光角）
 *
 * 片元：result = dir贡献 + Σ point_i贡献 + spot贡献，每盏 = ambient+diffuse+specular 的 Phong，
 * **不做归一/clamp 到 1 之外** —— 让被多盏同照处可顶到纯白过曝（本章要看到的现象）。
 * 减到 0 盏点光 / 关掉平行光与聚光时，环境光托底（不全黑、不报错）。
 *
 * 控件经 uniform/ref 驱动 → 改参数仅重设 uniform 后按需重绘，不重编译、不挂常驻 rAF；
 * IntersectionObserver 离屏暂停；卸载释放 GL 资源（program/vao/buffer）。
 *
 * 与 use-lighting-program / use-lighting-maps-program 同一三层范式 / 编译链接 / 资源生命周期约定。
 * 复用 camera-math 的矩阵基座与带法线立方体常量（不改其中任何共享常量/函数）。
 */

// 点光源固定上限（GLSL 数组定长，编译期常量）。增删只动 uActivePointCount，不越界。
export const MAX_POINT_LIGHTS = 4;

// 物体着色器：对三类光各算一份 Phong，相加（不 clamp，可过曝顶白）。
const OBJECT_VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
uniform mat4 uModel;
uniform mat4 uViewProj;
uniform mat3 uNormalMat;
out vec3 vFragPos;
out vec3 vNormal;
void main() {
  vec4 worldPos = uModel * vec4(aPos, 1.0);
  vFragPos = worldPos.xyz;
  vNormal = uNormalMat * aNormal;
  gl_Position = uViewProj * worldPos;
}`;

const OBJECT_FRAG = `#version 300 es
precision highp float;

#define NR_POINT_LIGHTS ${MAX_POINT_LIGHTS}

in vec3 vFragPos;
in vec3 vNormal;

uniform vec3 uObjectColor;
uniform vec3 uViewPos;
uniform float uAmbientStrength;   // 各盏共用的环境占比（小，托底）
uniform float uSpecularStrength;  // 各盏共用的镜面占比
uniform float uShininess;

// 平行光
uniform bool  uDirOn;
uniform vec3  uDirDirection;      // 指向场景的方向（光怎么打过来）
uniform vec3  uDirColor;
uniform float uDirIntensity;

// 点光源数组（固定大小 + uActivePointCount 防越界）
uniform int   uActivePointCount;
uniform vec3  uPointPos[NR_POINT_LIGHTS];
uniform vec3  uPointColor[NR_POINT_LIGHTS];
uniform float uPointIntensity[NR_POINT_LIGHTS];
uniform float uPointLinear[NR_POINT_LIGHTS];     // 衰减一次项
uniform float uPointQuadratic[NR_POINT_LIGHTS];  // 衰减二次项

// 聚光
uniform bool  uSpotOn;
uniform vec3  uSpotPos;
uniform vec3  uSpotDirection;     // 聚光朝向（射出方向）
uniform vec3  uSpotColor;
uniform float uSpotIntensity;
uniform float uSpotCutOff;        // 内切光角 cos
uniform float uSpotOuterCutOff;   // 外切光角 cos

out vec4 fragColor;

// 一盏「有 L 方向」的 Phong 三项（环境 + 漫反射 + 镜面），返回该盏贡献。
vec3 phong(vec3 N, vec3 V, vec3 L, vec3 color, float intensity) {
  vec3 ambient = uAmbientStrength * color;
  float diff = max(dot(N, L), 0.0);
  vec3 diffuse = diff * color;
  vec3 R = reflect(-L, N);
  float specAngle = diff > 0.0 ? max(dot(R, V), 0.0) : 0.0;
  float spec = pow(specAngle, uShininess);
  vec3 specular = uSpecularStrength * spec * color;
  return (ambient + diffuse + specular) * intensity;
}

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(uViewPos - vFragPos);

  vec3 result = vec3(0.0);

  // 1) 平行光：只有方向、不衰减
  if (uDirOn) {
    vec3 L = normalize(-uDirDirection);
    result += phong(N, V, L, uDirColor, uDirIntensity);
  }

  // 2) 点光源：固定数组 + uActivePointCount 循环防越界；按距离衰减
  for (int i = 0; i < NR_POINT_LIGHTS; i++) {
    if (i >= uActivePointCount) break;
    vec3 toLight = uPointPos[i] - vFragPos;
    float d = length(toLight);
    vec3 L = toLight / max(d, 1e-4);
    float att = 1.0 / (1.0 + uPointLinear[i] * d + uPointQuadratic[i] * d * d);
    result += phong(N, V, L, uPointColor[i], uPointIntensity[i]) * att;
  }

  // 3) 聚光：锥形软边（内外切光角 clamp 平滑）
  if (uSpotOn) {
    vec3 toLight = uSpotPos - vFragPos;
    float d = length(toLight);
    vec3 L = toLight / max(d, 1e-4);
    float theta = dot(L, normalize(-uSpotDirection));
    float eps = max(uSpotCutOff - uSpotOuterCutOff, 1e-4);
    float intensity = clamp((theta - uSpotOuterCutOff) / eps, 0.0, 1.0);
    float att = 1.0 / (1.0 + 0.09 * d + 0.032 * d * d);
    result += phong(N, V, L, uSpotColor, uSpotIntensity) * att * intensity;
  }

  // 故意不 clamp 到 1：被多盏同照处可顶到纯白（过曝），这是本章要看到的现象。
  // 但物体本色作为「反照率」乘上去（×objectColor，让暗处仍是物体色而非死黑）。
  vec3 color = result * uObjectColor;
  fragColor = vec4(color, 1.0);
}`;

// 光源标记着色器：自发光，直接输出光色（不参与光照计算）。
const LAMP_VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec3 aPos;
uniform mat4 uMvp;
void main() {
  gl_Position = uMvp * vec4(aPos, 1.0);
}`;

const LAMP_FRAG = `#version 300 es
precision highp float;
uniform vec3 uColor;
out vec4 fragColor;
void main() {
  fragColor = vec4(uColor, 1.0);
}`;

export type MultiLightStatus =
  | { kind: "ok" }
  | { kind: "error"; stage: "vertex" | "fragment" | "link"; log: string };

// —— 数据模型 ——

/** 点光源衰减档位（沿用 LearnOpenGL 表的近似值，越大档越「亮得远」）。 */
export type AttenuationLevel = "near" | "mid" | "far";

export const ATTENUATION_TABLE: Record<
  AttenuationLevel,
  { label: string; linear: number; quadratic: number }
> = {
  near: { label: "近（衰减快）", linear: 0.35, quadratic: 0.44 },
  mid: { label: "中", linear: 0.14, quadratic: 0.07 },
  far: { label: "远（衰减慢）", linear: 0.07, quadratic: 0.017 },
};

export type PointLightModel = {
  on: boolean;
  /** 绕物体的方位角（度，水平面） */
  azimuth: number;
  color: Vec3;
  intensity: number;
  attenuation: AttenuationLevel;
};

export type DirLightModel = {
  on: boolean;
  /** 方向方位角（度，光从哪个水平方向斜下打来） */
  azimuth: number;
  color: Vec3;
  intensity: number;
};

export type SpotLightModel = {
  on: boolean;
  /** 聚光机位方位角（度） */
  azimuth: number;
  color: Vec3;
  intensity: number;
  /** 外切光角（度，半角）；内切光角 = 外角 - 软边宽度 */
  outerAngleDeg: number;
};

export type MultiLightModel = {
  dir: DirLightModel;
  points: PointLightModel[];
  spot: SpotLightModel;
};

// 点光源 / 聚光的公转半径与高度（世界空间，绕原点物体）。
const POINT_RADIUS = 2.4;
const POINT_HEIGHT = 1.3;
const SPOT_RADIUS = 2.8;
const SPOT_HEIGHT = 2.2;
// 平行光方向的俯角（向下打）。
const DIR_PITCH = -0.55;
// 聚光内外软边宽度（度）。
export const SPOT_SOFT_EDGE_DEG = 6;
const LAMP_SCALE = 0.1;

/** 由方位角（度）+ 半径 + 高度算世界位置（绕 y 轴）。 */
function posFromAzimuth(azimuthDeg: number, radius: number, height: number): Vec3 {
  const a = (azimuthDeg * Math.PI) / 180;
  return [Math.cos(a) * radius, height, Math.sin(a) * radius];
}

/** 平行光方向（从光位指向原点附近、带俯角）。归一化由 shader 做。 */
function dirVecFromAzimuth(azimuthDeg: number): Vec3 {
  const a = (azimuthDeg * Math.PI) / 180;
  // 光「打过来」的方向：从空中某点指向原点。
  return [-Math.cos(a), DIR_PITCH, -Math.sin(a)];
}

/** 默认布灯：1 平行光 + 2 异色点光源 + 1 聚光 —— 开箱即「多盏叠加、亮处过曝顶白」。 */
export function defaultModel(): MultiLightModel {
  return {
    dir: {
      on: true,
      azimuth: 35,
      color: [0.35, 0.4, 0.55], // 冷蓝天光，整体托底
      intensity: 0.5,
    },
    points: [
      {
        on: true,
        azimuth: 50,
        color: [1.0, 0.45, 0.3], // 暖橙
        intensity: 1.2,
        attenuation: "mid",
      },
      {
        on: true,
        azimuth: 210,
        color: [0.3, 0.7, 1.0], // 冷青
        intensity: 1.2,
        attenuation: "mid",
      },
    ],
    spot: {
      on: true,
      azimuth: 130,
      color: [1.0, 0.95, 0.8], // 暖白射灯
      intensity: 1.6,
      outerAngleDeg: 22,
    },
  };
}

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  src: string,
): { shader: WebGLShader | null; log: string } {
  const sh = gl.createShader(type);
  if (!sh) return { shader: null, log: "无法创建着色器对象" };
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh) ?? "着色器编译失败";
    gl.deleteShader(sh);
    return { shader: null, log };
  }
  return { shader: sh, log: "" };
}

function linkProgram(
  gl: WebGL2RenderingContext,
  vs: WebGLShader,
  fs: WebGLShader,
): { program: WebGLProgram | null; log: string } {
  const prog = gl.createProgram();
  if (!prog) return { program: null, log: "无法创建程序对象" };
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog) ?? "程序链接失败";
    gl.deleteProgram(prog);
    return { program: null, log };
  }
  return { program: prog, log: "" };
}

// 固定相机：斜视原点的立方体。
const CAMERA_EYE = [3.4, 2.6, 4.4] as const;
const CAMERA_TARGET = [0, 0, 0] as const;
const CAMERA_UP = [0, 1, 0] as const;
// 物体本色（DESIGN 品牌紫偏中性，给各色光当反照率底）。
const OBJECT_COLOR: Vec3 = [0.62, 0.6, 0.72];
const AMBIENT_STRENGTH = 0.06;
const SPECULAR_STRENGTH = 0.5;
const SHININESS = 32;

type ObjectUniforms = {
  uModel: WebGLUniformLocation | null;
  uViewProj: WebGLUniformLocation | null;
  uNormalMat: WebGLUniformLocation | null;
  uObjectColor: WebGLUniformLocation | null;
  uViewPos: WebGLUniformLocation | null;
  uAmbientStrength: WebGLUniformLocation | null;
  uSpecularStrength: WebGLUniformLocation | null;
  uShininess: WebGLUniformLocation | null;
  uDirOn: WebGLUniformLocation | null;
  uDirDirection: WebGLUniformLocation | null;
  uDirColor: WebGLUniformLocation | null;
  uDirIntensity: WebGLUniformLocation | null;
  uActivePointCount: WebGLUniformLocation | null;
  uPointPos: (WebGLUniformLocation | null)[];
  uPointColor: (WebGLUniformLocation | null)[];
  uPointIntensity: (WebGLUniformLocation | null)[];
  uPointLinear: (WebGLUniformLocation | null)[];
  uPointQuadratic: (WebGLUniformLocation | null)[];
  uSpotOn: WebGLUniformLocation | null;
  uSpotPos: WebGLUniformLocation | null;
  uSpotDirection: WebGLUniformLocation | null;
  uSpotColor: WebGLUniformLocation | null;
  uSpotIntensity: WebGLUniformLocation | null;
  uSpotCutOff: WebGLUniformLocation | null;
  uSpotOuterCutOff: WebGLUniformLocation | null;
};

type LampUniforms = {
  uMvp: WebGLUniformLocation | null;
  uColor: WebGLUniformLocation | null;
};

export function useMultiLightProgram(
  modelRef: React.RefObject<MultiLightModel>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<MultiLightStatus>({ kind: "ok" });

  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const objectProgRef = useRef<WebGLProgram | null>(null);
  const lampProgRef = useRef<WebGLProgram | null>(null);
  const objectUniformsRef = useRef<ObjectUniforms | null>(null);
  const lampUniformsRef = useRef<LampUniforms | null>(null);
  const vaoRef = useRef<WebGLVertexArrayObject | null>(null);
  const visibleRef = useRef(true);
  const rafRef = useRef<number | null>(null);

  // 复用矩阵缓冲（避免每帧分配）
  const projRef = useRef(mat4Create());
  const viewRef = useRef(mat4Create());
  const viewProjRef = useRef(mat4Create());
  const modelMatRef = useRef(mat4Create());
  const normalMatRef = useRef(mat3Create());
  const lampModelRef = useRef(mat4Create());
  const lampMvpRef = useRef(mat4Create());

  const drawLamp = useCallback(
    (pos: Vec3, color: Vec3) => {
      const gl = glRef.current;
      const lampProg = lampProgRef.current;
      const lampU = lampUniformsRef.current;
      const viewProj = viewProjRef.current;
      if (!gl || !lampProg || !lampU) return;

      const m = lampModelRef.current;
      m[0] = LAMP_SCALE;
      m[1] = 0;
      m[2] = 0;
      m[3] = 0;
      m[4] = 0;
      m[5] = LAMP_SCALE;
      m[6] = 0;
      m[7] = 0;
      m[8] = 0;
      m[9] = 0;
      m[10] = LAMP_SCALE;
      m[11] = 0;
      m[12] = pos[0];
      m[13] = pos[1];
      m[14] = pos[2];
      m[15] = 1;

      const mvp = lampMvpRef.current;
      mat4Multiply(mvp, viewProj, m);
      gl.uniformMatrix4fv(lampU.uMvp, false, mvp);
      gl.uniform3f(lampU.uColor, color[0], color[1], color[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 36);
    },
    [],
  );

  const draw = useCallback(() => {
    const gl = glRef.current;
    const objectProg = objectProgRef.current;
    const lampProg = lampProgRef.current;
    const objectU = objectUniformsRef.current;
    const lampU = lampUniformsRef.current;
    const vao = vaoRef.current;
    const canvas = canvasRef.current;
    if (
      !gl ||
      !objectProg ||
      !lampProg ||
      !objectU ||
      !lampU ||
      !vao ||
      !canvas ||
      !visibleRef.current
    )
      return;

    const model = modelRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.04, 0.04, 0.06, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const aspect = w / h;
    const proj = projRef.current;
    const view = viewRef.current;
    const viewProj = viewProjRef.current;
    mat4Perspective(proj, (45 * Math.PI) / 180, aspect, 0.1, 100);
    mat4LookAt(view, CAMERA_EYE, CAMERA_TARGET, CAMERA_UP);
    mat4Multiply(viewProj, proj, view);

    // —— 主物体（多光源 Phong）——
    const modelMat = modelMatRef.current;
    mat4Translate(modelMat, 0, 0, 0);
    const normalMat = normalMatRef.current;
    mat3NormalFromMat4(normalMat, modelMat);

    gl.useProgram(objectProg);
    gl.uniformMatrix4fv(objectU.uModel, false, modelMat);
    gl.uniformMatrix4fv(objectU.uViewProj, false, viewProj);
    gl.uniformMatrix3fv(objectU.uNormalMat, false, normalMat);
    gl.uniform3f(
      objectU.uObjectColor,
      OBJECT_COLOR[0],
      OBJECT_COLOR[1],
      OBJECT_COLOR[2],
    );
    gl.uniform3f(objectU.uViewPos, CAMERA_EYE[0], CAMERA_EYE[1], CAMERA_EYE[2]);
    gl.uniform1f(objectU.uAmbientStrength, AMBIENT_STRENGTH);
    gl.uniform1f(objectU.uSpecularStrength, SPECULAR_STRENGTH);
    gl.uniform1f(objectU.uShininess, SHININESS);

    // 平行光
    gl.uniform1i(objectU.uDirOn, model.dir.on ? 1 : 0);
    const dirVec = dirVecFromAzimuth(model.dir.azimuth);
    gl.uniform3f(objectU.uDirDirection, dirVec[0], dirVec[1], dirVec[2]);
    gl.uniform3f(
      objectU.uDirColor,
      model.dir.color[0],
      model.dir.color[1],
      model.dir.color[2],
    );
    gl.uniform1f(objectU.uDirIntensity, model.dir.intensity);

    // 点光源数组：只灌「开着的」前 N 盏，uActivePointCount = N，循环到 N 即 break。
    const activePoints = model.points.filter((p) => p.on);
    const count = Math.min(activePoints.length, MAX_POINT_LIGHTS);
    gl.uniform1i(objectU.uActivePointCount, count);
    for (let i = 0; i < count; i++) {
      const p = activePoints[i];
      const pos = posFromAzimuth(p.azimuth, POINT_RADIUS, POINT_HEIGHT);
      const att = ATTENUATION_TABLE[p.attenuation];
      gl.uniform3f(objectU.uPointPos[i], pos[0], pos[1], pos[2]);
      gl.uniform3f(objectU.uPointColor[i], p.color[0], p.color[1], p.color[2]);
      gl.uniform1f(objectU.uPointIntensity[i], p.intensity);
      gl.uniform1f(objectU.uPointLinear[i], att.linear);
      gl.uniform1f(objectU.uPointQuadratic[i], att.quadratic);
    }

    // 聚光
    gl.uniform1i(objectU.uSpotOn, model.spot.on ? 1 : 0);
    const spotPos = posFromAzimuth(model.spot.azimuth, SPOT_RADIUS, SPOT_HEIGHT);
    // 聚光朝向：从机位指向原点。
    const spotDir: Vec3 = [-spotPos[0], -spotPos[1], -spotPos[2]];
    gl.uniform3f(objectU.uSpotPos, spotPos[0], spotPos[1], spotPos[2]);
    gl.uniform3f(objectU.uSpotDirection, spotDir[0], spotDir[1], spotDir[2]);
    gl.uniform3f(
      objectU.uSpotColor,
      model.spot.color[0],
      model.spot.color[1],
      model.spot.color[2],
    );
    gl.uniform1f(objectU.uSpotIntensity, model.spot.intensity);
    const outer = (model.spot.outerAngleDeg * Math.PI) / 180;
    const inner =
      ((model.spot.outerAngleDeg - SPOT_SOFT_EDGE_DEG) * Math.PI) / 180;
    gl.uniform1f(objectU.uSpotCutOff, Math.cos(Math.max(0, inner)));
    gl.uniform1f(objectU.uSpotOuterCutOff, Math.cos(outer));

    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    // —— 光源标记（每盏开着的灯画一个小自发光立方体）——
    gl.useProgram(lampProg);
    for (let i = 0; i < count; i++) {
      const p = activePoints[i];
      const pos = posFromAzimuth(p.azimuth, POINT_RADIUS, POINT_HEIGHT);
      drawLamp(pos, p.color);
    }
    if (model.spot.on) {
      drawLamp(spotPos, model.spot.color);
    }

    gl.bindVertexArray(null);
  }, [modelRef, drawLamp]);

  const requestDraw = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      draw();
    });
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: false, antialias: true });
    if (!gl) {
      setStatus({
        kind: "error",
        stage: "link",
        log: "无法创建 WebGL2 上下文",
      });
      return;
    }
    glRef.current = gl;

    // 编译 + 链接两套程序，任一失败 → 回显错误并清理。
    const objVs = compileShader(gl, gl.VERTEX_SHADER, OBJECT_VERT);
    if (!objVs.shader) {
      setStatus({ kind: "error", stage: "vertex", log: objVs.log });
      return;
    }
    const objFs = compileShader(gl, gl.FRAGMENT_SHADER, OBJECT_FRAG);
    if (!objFs.shader) {
      gl.deleteShader(objVs.shader);
      setStatus({ kind: "error", stage: "fragment", log: objFs.log });
      return;
    }
    const objLink = linkProgram(gl, objVs.shader, objFs.shader);
    gl.deleteShader(objVs.shader);
    gl.deleteShader(objFs.shader);
    if (!objLink.program) {
      setStatus({ kind: "error", stage: "link", log: objLink.log });
      return;
    }
    const objectProg = objLink.program;

    const lampVs = compileShader(gl, gl.VERTEX_SHADER, LAMP_VERT);
    if (!lampVs.shader) {
      gl.deleteProgram(objectProg);
      setStatus({ kind: "error", stage: "vertex", log: lampVs.log });
      return;
    }
    const lampFs = compileShader(gl, gl.FRAGMENT_SHADER, LAMP_FRAG);
    if (!lampFs.shader) {
      gl.deleteShader(lampVs.shader);
      gl.deleteProgram(objectProg);
      setStatus({ kind: "error", stage: "fragment", log: lampFs.log });
      return;
    }
    const lampLink = linkProgram(gl, lampVs.shader, lampFs.shader);
    gl.deleteShader(lampVs.shader);
    gl.deleteShader(lampFs.shader);
    if (!lampLink.program) {
      gl.deleteProgram(objectProg);
      setStatus({ kind: "error", stage: "link", log: lampLink.log });
      return;
    }
    const lampProg = lampLink.program;

    objectProgRef.current = objectProg;
    lampProgRef.current = lampProg;

    const arrLoc = (base: string) =>
      Array.from({ length: MAX_POINT_LIGHTS }, (_, i) =>
        gl.getUniformLocation(objectProg, `${base}[${i}]`),
      );

    objectUniformsRef.current = {
      uModel: gl.getUniformLocation(objectProg, "uModel"),
      uViewProj: gl.getUniformLocation(objectProg, "uViewProj"),
      uNormalMat: gl.getUniformLocation(objectProg, "uNormalMat"),
      uObjectColor: gl.getUniformLocation(objectProg, "uObjectColor"),
      uViewPos: gl.getUniformLocation(objectProg, "uViewPos"),
      uAmbientStrength: gl.getUniformLocation(objectProg, "uAmbientStrength"),
      uSpecularStrength: gl.getUniformLocation(objectProg, "uSpecularStrength"),
      uShininess: gl.getUniformLocation(objectProg, "uShininess"),
      uDirOn: gl.getUniformLocation(objectProg, "uDirOn"),
      uDirDirection: gl.getUniformLocation(objectProg, "uDirDirection"),
      uDirColor: gl.getUniformLocation(objectProg, "uDirColor"),
      uDirIntensity: gl.getUniformLocation(objectProg, "uDirIntensity"),
      uActivePointCount: gl.getUniformLocation(objectProg, "uActivePointCount"),
      uPointPos: arrLoc("uPointPos"),
      uPointColor: arrLoc("uPointColor"),
      uPointIntensity: arrLoc("uPointIntensity"),
      uPointLinear: arrLoc("uPointLinear"),
      uPointQuadratic: arrLoc("uPointQuadratic"),
      uSpotOn: gl.getUniformLocation(objectProg, "uSpotOn"),
      uSpotPos: gl.getUniformLocation(objectProg, "uSpotPos"),
      uSpotDirection: gl.getUniformLocation(objectProg, "uSpotDirection"),
      uSpotColor: gl.getUniformLocation(objectProg, "uSpotColor"),
      uSpotIntensity: gl.getUniformLocation(objectProg, "uSpotIntensity"),
      uSpotCutOff: gl.getUniformLocation(objectProg, "uSpotCutOff"),
      uSpotOuterCutOff: gl.getUniformLocation(objectProg, "uSpotOuterCutOff"),
    };
    lampUniformsRef.current = {
      uMvp: gl.getUniformLocation(lampProg, "uMvp"),
      uColor: gl.getUniformLocation(lampProg, "uColor"),
    };

    // 顶点缓冲：position(3)+normal(3)，stride 24，法线偏移 12。
    const vao = gl.createVertexArray();
    const buf = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, CUBE_VERTICES_NORMAL, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
    gl.bindVertexArray(null);
    vaoRef.current = vao;

    setStatus({ kind: "ok" });
    requestDraw();

    const ro = new ResizeObserver(() => requestDraw());
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
        if (visibleRef.current) requestDraw();
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (vao) gl.deleteVertexArray(vao);
      if (buf) gl.deleteBuffer(buf);
      gl.deleteProgram(objectProg);
      gl.deleteProgram(lampProg);
      glRef.current = null;
      objectProgRef.current = null;
      lampProgRef.current = null;
      objectUniformsRef.current = null;
      lampUniformsRef.current = null;
      vaoRef.current = null;
    };
  }, [requestDraw]);

  return { canvasRef, status, requestDraw };
}
