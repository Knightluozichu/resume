"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  CUBE_VERTICES_NORMAL,
  DEFAULT_LIGHTING_ENABLED,
  LIGHTING_LIGHT_COLOR,
  LIGHTING_OBJECT_COLOR,
  lightPosFromAngle,
  mat3Create,
  mat3NormalFromMat4,
  mat4Create,
  mat4LookAt,
  mat4Multiply,
  mat4Perspective,
  mat4Translate,
  type LightingEnabled,
  type LightingParams,
} from "../camera/camera-math";

/**
 * 裸 WebGL2 Phong 光照 Demo 引擎（「光照篇」2–6 章共享主 viz LightingDemo）。
 *
 * 场景：一个带法线的立方体居中，固定相机斜视，深色背景；一个可绕物体公转的点光源
 * （另画一个小自发光立方体标记其位置）。片元做 Phong：ambient + diffuse + specular。
 * 控件经 uniform 驱动 → 改参数仅重设 uniform 后按需重绘，不重编译、不挂常驻 rAF；
 * IntersectionObserver 离屏暂停；卸载释放 GL 资源。
 *
 * 与 use-camera-program 同一三层范式 / 编译链接 / 资源生命周期约定。
 */

// 物体着色器：Phong（世界空间光照），法线用法线矩阵变换。
const OBJECT_VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
uniform mat4 uModel;
uniform mat4 uViewProj;
uniform mat3 uNormalMat;
out vec3 vFragPos;   // 世界空间位置
out vec3 vNormal;    // 世界空间法线
void main() {
  vec4 worldPos = uModel * vec4(aPos, 1.0);
  vFragPos = worldPos.xyz;
  vNormal = uNormalMat * aNormal;
  gl_Position = uViewProj * worldPos;
}`;

const OBJECT_FRAG = `#version 300 es
precision highp float;
in vec3 vFragPos;
in vec3 vNormal;
uniform vec3 uObjectColor;
uniform vec3 uLightColor;
uniform vec3 uLightPos;        // 世界空间
uniform vec3 uViewPos;         // 世界空间
uniform float uAmbientStrength;
uniform float uSpecularStrength;
uniform float uShininess;
// 分步 gating（HEL-64）：每项是否参与（0/1）。三项全 1 = 默认，等同未分步。
uniform float uAmbientOn;
uniform float uDiffuseOn;
uniform float uSpecularOn;
out vec4 fragColor;
void main() {
  vec3 N = normalize(vNormal);
  vec3 L = normalize(uLightPos - vFragPos);
  vec3 V = normalize(uViewPos - vFragPos);
  vec3 R = reflect(-L, N);

  // 环境
  vec3 ambient = uAmbientStrength * uLightColor;

  // 漫反射 max(dot(N,L),0)
  float diff = max(dot(N, L), 0.0);
  vec3 diffuse = diff * uLightColor;

  // 镜面 pow(max(dot(R,V),0), shininess)，背光面不产生高光
  float specAngle = diff > 0.0 ? max(dot(R, V), 0.0) : 0.0;
  float spec = pow(specAngle, uShininess);
  vec3 specular = uSpecularStrength * spec * uLightColor;

  // gating 只决定该项是否计入，不改强度语义；全开时与改造前逐像素一致
  vec3 color =
    (ambient * uAmbientOn + diffuse * uDiffuseOn + specular * uSpecularOn) *
    uObjectColor;
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

export type LightingStatus =
  | { kind: "ok" }
  | { kind: "error"; stage: "vertex" | "fragment" | "link"; log: string };

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
const CAMERA_EYE = [3.2, 2.4, 4.2] as const;
const CAMERA_TARGET = [0, 0, 0] as const;
const CAMERA_UP = [0, 1, 0] as const;
const LAMP_SCALE = 0.12;

type ObjectUniforms = {
  uModel: WebGLUniformLocation | null;
  uViewProj: WebGLUniformLocation | null;
  uNormalMat: WebGLUniformLocation | null;
  uObjectColor: WebGLUniformLocation | null;
  uLightColor: WebGLUniformLocation | null;
  uLightPos: WebGLUniformLocation | null;
  uViewPos: WebGLUniformLocation | null;
  uAmbientStrength: WebGLUniformLocation | null;
  uSpecularStrength: WebGLUniformLocation | null;
  uShininess: WebGLUniformLocation | null;
  uAmbientOn: WebGLUniformLocation | null;
  uDiffuseOn: WebGLUniformLocation | null;
  uSpecularOn: WebGLUniformLocation | null;
};

type LampUniforms = {
  uMvp: WebGLUniformLocation | null;
  uColor: WebGLUniformLocation | null;
};

export function useLightingProgram(
  paramsRef: React.RefObject<LightingParams>,
  /**
   * 分步 gating 开关（可选）。不传 → 三项全开，渲染与未分步时逐像素一致。
   * 引擎只读 `.current`，由调用方在切步时改写并 requestDraw()。
   */
  enabledRef?: React.RefObject<LightingEnabled>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<LightingStatus>({ kind: "ok" });

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
  const modelRef = useRef(mat4Create());
  const normalMatRef = useRef(mat3Create());
  const lampModelRef = useRef(mat4Create());
  const lampMvpRef = useRef(mat4Create());

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

    const params = paramsRef.current;
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

    const lightPos = lightPosFromAngle(params.lightAngle);

    // —— 主物体（Phong）——
    // model = 单位（居中、无缩放、无平移）；法线矩阵 = mat3(model)（此处即单位）
    const model = modelRef.current;
    mat4Translate(model, 0, 0, 0);
    const normalMat = normalMatRef.current;
    mat3NormalFromMat4(normalMat, model);

    gl.useProgram(objectProg);
    gl.uniformMatrix4fv(objectU.uModel, false, model);
    gl.uniformMatrix4fv(objectU.uViewProj, false, viewProj);
    gl.uniformMatrix3fv(objectU.uNormalMat, false, normalMat);
    gl.uniform3f(
      objectU.uObjectColor,
      LIGHTING_OBJECT_COLOR[0],
      LIGHTING_OBJECT_COLOR[1],
      LIGHTING_OBJECT_COLOR[2],
    );
    gl.uniform3f(
      objectU.uLightColor,
      LIGHTING_LIGHT_COLOR[0],
      LIGHTING_LIGHT_COLOR[1],
      LIGHTING_LIGHT_COLOR[2],
    );
    gl.uniform3f(objectU.uLightPos, lightPos[0], lightPos[1], lightPos[2]);
    gl.uniform3f(objectU.uViewPos, CAMERA_EYE[0], CAMERA_EYE[1], CAMERA_EYE[2]);
    gl.uniform1f(objectU.uAmbientStrength, params.ambientStrength);
    gl.uniform1f(objectU.uSpecularStrength, params.specularStrength);
    gl.uniform1f(objectU.uShininess, Math.max(1, params.shininess));

    // 分步 gating：不传 enabledRef → 三项全开（默认，等同未分步）
    const enabled = enabledRef?.current ?? DEFAULT_LIGHTING_ENABLED;
    gl.uniform1f(objectU.uAmbientOn, enabled.ambient ? 1 : 0);
    gl.uniform1f(objectU.uDiffuseOn, enabled.diffuse ? 1 : 0);
    gl.uniform1f(objectU.uSpecularOn, enabled.specular ? 1 : 0);

    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    // —— 光源标记（小自发光立方体，复用同一 VAO，只读 position）——
    const lampModel = lampModelRef.current;
    // 先缩放再平移：列主序手写（避免再引 scale*translate 乘法）
    lampModel[0] = LAMP_SCALE;
    lampModel[1] = 0;
    lampModel[2] = 0;
    lampModel[3] = 0;
    lampModel[4] = 0;
    lampModel[5] = LAMP_SCALE;
    lampModel[6] = 0;
    lampModel[7] = 0;
    lampModel[8] = 0;
    lampModel[9] = 0;
    lampModel[10] = LAMP_SCALE;
    lampModel[11] = 0;
    lampModel[12] = lightPos[0];
    lampModel[13] = lightPos[1];
    lampModel[14] = lightPos[2];
    lampModel[15] = 1;

    const lampMvp = lampMvpRef.current;
    mat4Multiply(lampMvp, viewProj, lampModel);

    gl.useProgram(lampProg);
    gl.uniformMatrix4fv(lampU.uMvp, false, lampMvp);
    gl.uniform3f(
      lampU.uColor,
      LIGHTING_LIGHT_COLOR[0],
      LIGHTING_LIGHT_COLOR[1],
      LIGHTING_LIGHT_COLOR[2],
    );
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    gl.bindVertexArray(null);
  }, [paramsRef, enabledRef]);

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

    objectUniformsRef.current = {
      uModel: gl.getUniformLocation(objectProg, "uModel"),
      uViewProj: gl.getUniformLocation(objectProg, "uViewProj"),
      uNormalMat: gl.getUniformLocation(objectProg, "uNormalMat"),
      uObjectColor: gl.getUniformLocation(objectProg, "uObjectColor"),
      uLightColor: gl.getUniformLocation(objectProg, "uLightColor"),
      uLightPos: gl.getUniformLocation(objectProg, "uLightPos"),
      uViewPos: gl.getUniformLocation(objectProg, "uViewPos"),
      uAmbientStrength: gl.getUniformLocation(objectProg, "uAmbientStrength"),
      uSpecularStrength: gl.getUniformLocation(objectProg, "uSpecularStrength"),
      uShininess: gl.getUniformLocation(objectProg, "uShininess"),
      uAmbientOn: gl.getUniformLocation(objectProg, "uAmbientOn"),
      uDiffuseOn: gl.getUniformLocation(objectProg, "uDiffuseOn"),
      uSpecularOn: gl.getUniformLocation(objectProg, "uSpecularOn"),
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
