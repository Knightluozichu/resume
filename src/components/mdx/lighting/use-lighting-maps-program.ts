"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  lightPosFromAngle,
  mat3Create,
  mat3NormalFromMat4,
  mat4Create,
  mat4LookAt,
  mat4Multiply,
  mat4Perspective,
  mat4Translate,
} from "../camera/camera-math";

/**
 * 裸 WebGL2「光照贴图」Demo 引擎（HEL-65，lighting-maps 章专用）。
 *
 * 与 use-lighting-program.ts 的 Phong 引擎同源（同一相机/光源/编译链接/资源生命周期范式），
 * 但本引擎专门演示「漫反射贴图 + 镜面光贴图（灰度遮罩）」，把材质从「整块常量」推进到
 * 「逐片段采样」，分三步累积观察：
 *  1. 常量材质：整块一套常量 diffuse/specular 的 Phong（=「贴图之前」基线，整块一起泛高光）
 *  2. +漫反射贴图：material.diffuse 改为 texture(diffuseMap, uv).rgb——木箱木纹 + 钢边底色出现
 *  3. +镜面光贴图遮罩：material.specular 改为 texture(specularMap, uv).r 当镜面强度乘数——
 *     灰度遮罩「钢边白=反光、木头黑=哑」，于是只有钢边随光高光、木面哑光
 *
 * 关键约束（CLAUDE.md / 任务卡红线）：
 *  - 程序化贴图，零外部图片资源（Canvas2D 生成两张 256 POT、UV 严格对齐的图）
 *  - 含 WebGL 代码，只允许经 lighting-maps-demo.tsx 的 next/dynamic(ssr:false) 懒加载
 *  - 自带一份「位置+法线+UV」立方体常量（不改 camera-math 的共享 CUBE_VERTICES*）
 *  - 切步/改参 = 改 uniform 后按需重绘，不重编译；可选自转用 rAF（reduced-motion / 关闭友好）
 *  - 卸载释放全部 GL 资源（program / texture×2 / vao / buffer），IntersectionObserver 离屏暂停
 */

// ============================ 可调参数 / 步骤类型 ============================

/** 三步：常量材质 → +漫反射贴图 → +镜面光贴图遮罩。 */
export type LightingMapsStep = "constant" | "diffuse" | "specular";

export type LightingMapsParams = {
  /** 光源绕物体公转角度（度，水平面方位）。 */
  lightAngle: number;
  /** 是否自转（公转点光源自动转，让高光游走）。reduced-motion 默认关。 */
  autoRotate: boolean;
};

export const DEFAULT_LIGHTING_MAPS_PARAMS: LightingMapsParams = {
  lightAngle: 70,
  autoRotate: false,
};

export type LightingMapsStatus =
  | { kind: "ok" }
  | { kind: "error"; stage: "vertex" | "fragment" | "link"; log: string };

// ============================ 着色器 ============================

// 物体着色器：Phong（世界空间光照），多传一路 UV 给片元采样贴图。
const OBJECT_VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoord;
uniform mat4 uModel;
uniform mat4 uViewProj;
uniform mat3 uNormalMat;
out vec3 vFragPos;   // 世界空间位置
out vec3 vNormal;    // 世界空间法线
out vec2 vTexCoord;  // 贴图 UV
void main() {
  vec4 worldPos = uModel * vec4(aPos, 1.0);
  vFragPos = worldPos.xyz;
  vNormal = uNormalMat * aNormal;
  vTexCoord = aTexCoord;
  gl_Position = uViewProj * worldPos;
}`;

/**
 * 物体片元：Phong 三项。uStep 控制 diffuse/specular 取「常量」还是「贴图采样」：
 *  - uStep < 1（常量）：material.diffuse = 常量底色；material.specular = 常量强度
 *  - uStep >= 1（+漫反射贴图）：material.diffuse = texture(diffuseMap, uv).rgb（环境也跟随它）
 *  - uStep >= 2（+镜面遮罩）：material.specular *= texture(specularMap, uv).r（灰度当强度乘数）
 * 三种情形同一段代码用 mix/step 选择，切步只改 uStep，不重编译。
 */
const OBJECT_FRAG = `#version 300 es
precision highp float;
in vec3 vFragPos;
in vec3 vNormal;
in vec2 vTexCoord;
uniform vec3 uLightColor;
uniform vec3 uLightPos;        // 世界空间
uniform vec3 uViewPos;         // 世界空间
uniform float uAmbientStrength;
uniform float uSpecularStrength;
uniform float uShininess;
uniform vec3 uConstDiffuse;    // 常量底色（第 1 步用）
uniform sampler2D uDiffuseMap; // 漫反射贴图（第 2、3 步用）
uniform sampler2D uSpecularMap;// 镜面光贴图（第 3 步用）
uniform float uStep;           // 0=常量 / 1=+漫反射贴图 / 2=+镜面遮罩
out vec4 fragColor;
void main() {
  vec3 N = normalize(vNormal);
  vec3 L = normalize(uLightPos - vFragPos);
  vec3 V = normalize(uViewPos - vFragPos);
  vec3 R = reflect(-L, N);

  // —— 材质 diffuse 底色：第 1 步用常量，第 2 步起用漫反射贴图采样 ——
  vec3 mapDiffuse = texture(uDiffuseMap, vTexCoord).rgb;
  float useDiffuseMap = step(0.5, uStep); // uStep>=1 → 1
  vec3 matDiffuse = mix(uConstDiffuse, mapDiffuse, useDiffuseMap);

  // —— 材质 specular 强度乘数：第 3 步用镜面贴图灰度当遮罩，否则整块为 1 ——
  float mapSpecMask = texture(uSpecularMap, vTexCoord).r;
  float useSpecMask = step(1.5, uStep); // uStep>=2 → 1
  float specMask = mix(1.0, mapSpecMask, useSpecMask);

  // 环境：跟随漫反射底色（与 LearnOpenGL 一致，环境用同一 diffuse 值）
  vec3 ambient = uAmbientStrength * uLightColor * matDiffuse;

  // 漫反射 max(N·L,0) × 底色
  float diff = max(dot(N, L), 0.0);
  vec3 diffuse = diff * uLightColor * matDiffuse;

  // 镜面 pow(max(R·V,0), shininess) × 强度 × 遮罩；背光面不产生高光
  float specAngle = diff > 0.0 ? max(dot(R, V), 0.0) : 0.0;
  float spec = pow(specAngle, uShininess);
  vec3 specular = uSpecularStrength * spec * specMask * uLightColor;

  fragColor = vec4(ambient + diffuse + specular, 1.0);
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

// ============================ 带 UV 的立方体（本组件自带，不改 camera-math） ============================

/**
 * 单位立方体 36 顶点，每顶点 8 float = position(3) + normal(3) + uv(2)。
 * UV 布局：每面都用整张 [0,1]×[0,1]（六面共用同一张贴图），这样木箱风 diffuse / 镜面遮罩
 * 在每个面上都完整呈现「木纹中心 + 四周钢边」。中心原点、边长 1。
 */
const CUBE_VERTICES_NORMAL_UV = new Float32Array([
  // 后面 (-z) 法线 (0,0,-1)
  -0.5, -0.5, -0.5, 0, 0, -1, 0, 0, 0.5, 0.5, -0.5, 0, 0, -1, 1, 1, 0.5, -0.5,
  -0.5, 0, 0, -1, 1, 0, 0.5, 0.5, -0.5, 0, 0, -1, 1, 1, -0.5, -0.5, -0.5, 0, 0,
  -1, 0, 0, -0.5, 0.5, -0.5, 0, 0, -1, 0, 1,
  // 前面 (+z) 法线 (0,0,1)
  -0.5, -0.5, 0.5, 0, 0, 1, 0, 0, 0.5, -0.5, 0.5, 0, 0, 1, 1, 0, 0.5, 0.5, 0.5,
  0, 0, 1, 1, 1, 0.5, 0.5, 0.5, 0, 0, 1, 1, 1, -0.5, 0.5, 0.5, 0, 0, 1, 0, 1,
  -0.5, -0.5, 0.5, 0, 0, 1, 0, 0,
  // 左面 (-x) 法线 (-1,0,0)
  -0.5, 0.5, 0.5, -1, 0, 0, 1, 0, -0.5, 0.5, -0.5, -1, 0, 0, 1, 1, -0.5, -0.5,
  -0.5, -1, 0, 0, 0, 1, -0.5, -0.5, -0.5, -1, 0, 0, 0, 1, -0.5, -0.5, 0.5, -1,
  0, 0, 0, 0, -0.5, 0.5, 0.5, -1, 0, 0, 1, 0,
  // 右面 (+x) 法线 (1,0,0)
  0.5, 0.5, 0.5, 1, 0, 0, 1, 0, 0.5, -0.5, -0.5, 1, 0, 0, 0, 1, 0.5, 0.5, -0.5,
  1, 0, 0, 1, 1, 0.5, -0.5, -0.5, 1, 0, 0, 0, 1, 0.5, 0.5, 0.5, 1, 0, 0, 1, 0,
  0.5, -0.5, 0.5, 1, 0, 0, 0, 0,
  // 下面 (-y) 法线 (0,-1,0)
  -0.5, -0.5, -0.5, 0, -1, 0, 0, 1, 0.5, -0.5, -0.5, 0, -1, 0, 1, 1, 0.5, -0.5,
  0.5, 0, -1, 0, 1, 0, 0.5, -0.5, 0.5, 0, -1, 0, 1, 0, -0.5, -0.5, 0.5, 0, -1,
  0, 0, 0, -0.5, -0.5, -0.5, 0, -1, 0, 0, 1,
  // 上面 (+y) 法线 (0,1,0)
  -0.5, 0.5, -0.5, 0, 1, 0, 0, 1, 0.5, 0.5, 0.5, 0, 1, 0, 1, 0, 0.5, 0.5, -0.5,
  0, 1, 0, 1, 1, 0.5, 0.5, 0.5, 0, 1, 0, 1, 0, -0.5, 0.5, -0.5, 0, 1, 0, 0, 1,
  -0.5, 0.5, 0.5, 0, 1, 0, 0, 0,
]);

// 只读 position（光源标记复用）：从上面取每顶点前 3 个 float 太碎，直接另存一份小的。
const CUBE_VERTICES_POS = new Float32Array([
  -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5,
  -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
  0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5,
  -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
  0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
  0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5,
  0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
  0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5,
]);

// ============================ 程序化木箱贴图（HEL-65，零外部资源） ============================

const TEX_SIZE = 256; // POT，REPEAT 安全

/** 确定性伪随机（同输入恒同输出，纹理可重现）。 */
function hash01(x: number): number {
  const v = Math.sin(x * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
}

/** 钢边框宽度（占整张图的比例）：diffuse 与 specular 必须用同一值才能严格对齐。 */
const FRAME = 0.16;

/**
 * 木箱风 diffuse：中心木纹箱体（暖棕 + 横向木纹）+ 四周钢边/铆钉（冷灰金属）。
 * 钢边在四周宽 FRAME 的一圈，木头在中央。铆钉沿钢边均匀点几颗。
 */
function createBoxDiffuseCanvas(): HTMLCanvasElement | null {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const s = TEX_SIZE;
  const f = Math.round(s * FRAME);

  // —— 中央木头：暖棕底 + 横向木纹线 ——
  ctx.fillStyle = "#7a4a22";
  ctx.fillRect(0, 0, s, s);
  const lines = 22;
  for (let i = 0; i < lines; i++) {
    const ly = (i + 0.5) * (s / lines) + (hash01(i) - 0.5) * 4;
    const dark = hash01(i * 3.1) > 0.5;
    ctx.strokeStyle = dark ? "rgba(60,34,12,0.5)" : "rgba(205,155,92,0.32)";
    ctx.lineWidth = dark ? 1.6 : 1;
    ctx.beginPath();
    ctx.moveTo(0, ly);
    for (let x = 0; x <= s; x += 32) {
      ctx.lineTo(x, ly + (hash01(i + x) - 0.5) * 3);
    }
    ctx.stroke();
  }

  // —— 四周钢边框（冷灰金属，带一点纵向高光感）——
  const steelGrad = ctx.createLinearGradient(0, 0, 0, s);
  steelGrad.addColorStop(0, "#9aa3ad");
  steelGrad.addColorStop(0.5, "#6f7780");
  steelGrad.addColorStop(1, "#9aa3ad");
  ctx.fillStyle = steelGrad;
  // 上下左右四条边（中间留出木头）
  ctx.fillRect(0, 0, s, f); // 上
  ctx.fillRect(0, s - f, s, f); // 下
  ctx.fillRect(0, 0, f, s); // 左
  ctx.fillRect(s - f, 0, f, s); // 右

  // —— 铆钉：沿钢边中线均匀点几颗（亮金属圆 + 暗描边）——
  const rivetR = Math.max(2, Math.round(f * 0.22));
  const mid = f / 2;
  const drawRivet = (cx: number, cy: number) => {
    ctx.fillStyle = "#3a3f45";
    ctx.beginPath();
    ctx.arc(cx, cy, rivetR + 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#c8cfd6";
    ctx.beginPath();
    ctx.arc(cx, cy, rivetR, 0, Math.PI * 2);
    ctx.fill();
  };
  const n = 5;
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    drawRivet(t * s, mid); // 上边
    drawRivet(t * s, s - mid); // 下边
    drawRivet(mid, t * s); // 左边
    drawRivet(s - mid, t * s); // 右边
  }

  return canvas;
}

/**
 * 配套 specular 灰度遮罩（与 diffuse 严格同一 UV 布局）：钢边 = 白（≈1，反光），
 * 木头 = 黑（≈0，哑光），铆钉 = 更亮（金属反光最强）。
 * 注意尺寸/FRAME/铆钉位置必须与 createBoxDiffuseCanvas 完全一致才能对齐。
 */
function createBoxSpecularCanvas(): HTMLCanvasElement | null {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const s = TEX_SIZE;
  const f = Math.round(s * FRAME);

  // 木头区：黑（不反光）
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, s, s);

  // 钢边：近白（反光强）
  ctx.fillStyle = "#d2d2d2";
  ctx.fillRect(0, 0, s, f);
  ctx.fillRect(0, s - f, s, f);
  ctx.fillRect(0, 0, f, s);
  ctx.fillRect(s - f, 0, f, s);

  // 铆钉：纯白（最强反光），位置与 diffuse 一致
  const rivetR = Math.max(2, Math.round(f * 0.22));
  const mid = f / 2;
  const drawRivet = (cx: number, cy: number) => {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(cx, cy, rivetR + 1, 0, Math.PI * 2);
    ctx.fill();
  };
  const n = 5;
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    drawRivet(t * s, mid);
    drawRivet(t * s, s - mid);
    drawRivet(mid, t * s);
    drawRivet(s - mid, t * s);
  }

  return canvas;
}

// ============================ 编译辅助（与 use-lighting-program 同形） ============================

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

// 固定相机：斜视原点的立方体（与 use-lighting-program 同款取景）。
const CAMERA_EYE = [3.2, 2.4, 4.2] as const;
const CAMERA_TARGET = [0, 0, 0] as const;
const CAMERA_UP = [0, 1, 0] as const;
const LAMP_SCALE = 0.12;

// 预设：暖白光、常量木色底、固定环境/镜面强度/反光度（非主控件，仅切步/转光看差异）。
const LIGHT_COLOR = [1, 0.96, 0.9] as const;
const CONST_DIFFUSE = [0.62, 0.42, 0.24] as const; // 第 1 步整块木色底
const AMBIENT_STRENGTH = 0.18;
const SPECULAR_STRENGTH = 0.9;
const SHININESS = 48;

const STEP_VALUE: Record<LightingMapsStep, number> = {
  constant: 0,
  diffuse: 1,
  specular: 2,
};

type ObjectUniforms = {
  uModel: WebGLUniformLocation | null;
  uViewProj: WebGLUniformLocation | null;
  uNormalMat: WebGLUniformLocation | null;
  uLightColor: WebGLUniformLocation | null;
  uLightPos: WebGLUniformLocation | null;
  uViewPos: WebGLUniformLocation | null;
  uAmbientStrength: WebGLUniformLocation | null;
  uSpecularStrength: WebGLUniformLocation | null;
  uShininess: WebGLUniformLocation | null;
  uConstDiffuse: WebGLUniformLocation | null;
  uDiffuseMap: WebGLUniformLocation | null;
  uSpecularMap: WebGLUniformLocation | null;
  uStep: WebGLUniformLocation | null;
};

type LampUniforms = {
  uMvp: WebGLUniformLocation | null;
  uColor: WebGLUniformLocation | null;
};

export function useLightingMapsProgram(
  paramsRef: React.RefObject<LightingMapsParams>,
  /** 当前步（常量 / +漫反射贴图 / +镜面遮罩）。引擎只读 `.current`，切步后调 requestDraw。 */
  stepRef: React.RefObject<LightingMapsStep>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<LightingMapsStatus>({ kind: "ok" });

  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const objectProgRef = useRef<WebGLProgram | null>(null);
  const lampProgRef = useRef<WebGLProgram | null>(null);
  const objectUniformsRef = useRef<ObjectUniforms | null>(null);
  const lampUniformsRef = useRef<LampUniforms | null>(null);
  const objectVaoRef = useRef<WebGLVertexArrayObject | null>(null);
  const lampVaoRef = useRef<WebGLVertexArrayObject | null>(null);
  const diffuseTexRef = useRef<WebGLTexture | null>(null);
  const specularTexRef = useRef<WebGLTexture | null>(null);
  const visibleRef = useRef(true);
  const rafRef = useRef<number | null>(null);
  // 自转用的常驻 rAF（仅 autoRotate 开且可见时运行）。
  const spinRafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);

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
    const objectVao = objectVaoRef.current;
    const lampVao = lampVaoRef.current;
    const diffuseTex = diffuseTexRef.current;
    const specularTex = specularTexRef.current;
    const canvas = canvasRef.current;
    if (
      !gl ||
      !objectProg ||
      !lampProg ||
      !objectU ||
      !lampU ||
      !objectVao ||
      !lampVao ||
      !diffuseTex ||
      !specularTex ||
      !canvas ||
      !visibleRef.current
    )
      return;

    const params = paramsRef.current;
    const stepVal = STEP_VALUE[stepRef.current ?? "specular"];

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

    // —— 主物体（贴图 Phong）——
    const model = modelRef.current;
    mat4Translate(model, 0, 0, 0);
    const normalMat = normalMatRef.current;
    mat3NormalFromMat4(normalMat, model);

    gl.useProgram(objectProg);
    gl.uniformMatrix4fv(objectU.uModel, false, model);
    gl.uniformMatrix4fv(objectU.uViewProj, false, viewProj);
    gl.uniformMatrix3fv(objectU.uNormalMat, false, normalMat);
    gl.uniform3f(objectU.uLightColor, LIGHT_COLOR[0], LIGHT_COLOR[1], LIGHT_COLOR[2]);
    gl.uniform3f(objectU.uLightPos, lightPos[0], lightPos[1], lightPos[2]);
    gl.uniform3f(objectU.uViewPos, CAMERA_EYE[0], CAMERA_EYE[1], CAMERA_EYE[2]);
    gl.uniform1f(objectU.uAmbientStrength, AMBIENT_STRENGTH);
    gl.uniform1f(objectU.uSpecularStrength, SPECULAR_STRENGTH);
    gl.uniform1f(objectU.uShininess, SHININESS);
    gl.uniform3f(
      objectU.uConstDiffuse,
      CONST_DIFFUSE[0],
      CONST_DIFFUSE[1],
      CONST_DIFFUSE[2],
    );
    gl.uniform1f(objectU.uStep, stepVal);

    // 绑两张贴图到 0/1 号纹理单元（采样器编号在创建时一次性 uniform1i 设好）
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, diffuseTex);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, specularTex);

    gl.bindVertexArray(objectVao);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    // —— 光源标记（小自发光立方体，position-only VAO）——
    const lampModel = lampModelRef.current;
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
    gl.uniform3f(lampU.uColor, LIGHT_COLOR[0], LIGHT_COLOR[1], LIGHT_COLOR[2]);
    gl.bindVertexArray(lampVao);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    gl.bindVertexArray(null);
  }, [paramsRef, stepRef]);

  const requestDraw = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      draw();
    });
  }, [draw]);

  // 自转循环：仅 autoRotate 开且可见时运行；每帧推进 lightAngle 后重绘。
  // 递归经 tickRef 中转（在 effect 里同步），避免 useCallback 自引用 / render 期写 ref。
  const tickRef = useRef<(ts: number) => void>(() => {});
  const tick = useCallback(
    (ts: number) => {
      const params = paramsRef.current;
      if (!params.autoRotate || !visibleRef.current) {
        spinRafRef.current = null;
        return;
      }
      const last = lastTsRef.current || ts;
      const dt = Math.min(0.05, (ts - last) / 1000); // 秒，封顶防跳变
      lastTsRef.current = ts;
      params.lightAngle = (params.lightAngle + dt * 30) % 360; // 30°/s 公转
      draw();
      spinRafRef.current = requestAnimationFrame((t) => tickRef.current(t));
    },
    [paramsRef, draw],
  );
  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  /** 启动/停止自转循环（供组件在切 autoRotate / 进出视口时调用）。 */
  const syncSpin = useCallback(() => {
    const params = paramsRef.current;
    if (params.autoRotate && visibleRef.current) {
      if (spinRafRef.current === null) {
        lastTsRef.current = 0;
        spinRafRef.current = requestAnimationFrame((t) => tickRef.current(t));
      }
    } else if (spinRafRef.current !== null) {
      cancelAnimationFrame(spinRafRef.current);
      spinRafRef.current = null;
    }
  }, [paramsRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: false, antialias: true });
    if (!gl) {
      setStatus({ kind: "error", stage: "link", log: "无法创建 WebGL2 上下文" });
      return;
    }
    glRef.current = gl;

    // —— 编译 + 链接两套程序 ——
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
      uLightColor: gl.getUniformLocation(objectProg, "uLightColor"),
      uLightPos: gl.getUniformLocation(objectProg, "uLightPos"),
      uViewPos: gl.getUniformLocation(objectProg, "uViewPos"),
      uAmbientStrength: gl.getUniformLocation(objectProg, "uAmbientStrength"),
      uSpecularStrength: gl.getUniformLocation(objectProg, "uSpecularStrength"),
      uShininess: gl.getUniformLocation(objectProg, "uShininess"),
      uConstDiffuse: gl.getUniformLocation(objectProg, "uConstDiffuse"),
      uDiffuseMap: gl.getUniformLocation(objectProg, "uDiffuseMap"),
      uSpecularMap: gl.getUniformLocation(objectProg, "uSpecularMap"),
      uStep: gl.getUniformLocation(objectProg, "uStep"),
    };
    lampUniformsRef.current = {
      uMvp: gl.getUniformLocation(lampProg, "uMvp"),
      uColor: gl.getUniformLocation(lampProg, "uColor"),
    };

    // 采样器编号一次设好：diffuseMap → 0 号、specularMap → 1 号单元
    gl.useProgram(objectProg);
    if (objectUniformsRef.current.uDiffuseMap)
      gl.uniform1i(objectUniformsRef.current.uDiffuseMap, 0);
    if (objectUniformsRef.current.uSpecularMap)
      gl.uniform1i(objectUniformsRef.current.uSpecularMap, 1);

    // —— 物体 VAO：position(3)+normal(3)+uv(2)，stride 32，偏移 0/12/24 ——
    const objectVao = gl.createVertexArray();
    const objectBuf = gl.createBuffer();
    gl.bindVertexArray(objectVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, objectBuf);
    gl.bufferData(gl.ARRAY_BUFFER, CUBE_VERTICES_NORMAL_UV, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 32, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 32, 12);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 32, 24);
    gl.bindVertexArray(null);
    objectVaoRef.current = objectVao;

    // —— 光源标记 VAO：position-only ——
    const lampVao = gl.createVertexArray();
    const lampBuf = gl.createBuffer();
    gl.bindVertexArray(lampVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, lampBuf);
    gl.bufferData(gl.ARRAY_BUFFER, CUBE_VERTICES_POS, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
    gl.bindVertexArray(null);
    lampVaoRef.current = lampVao;

    // —— 上传两张程序化贴图 ——
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const uploadTex = (src: HTMLCanvasElement | null): WebGLTexture | null => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      if (src) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      } else {
        // 兜底：无 2d context 时传纯灰，至少不报错
        const px = new Uint8Array(4).fill(128);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, px);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return tex;
    };
    diffuseTexRef.current = uploadTex(createBoxDiffuseCanvas());
    specularTexRef.current = uploadTex(createBoxSpecularCanvas());

    setStatus({ kind: "ok" });
    requestDraw();

    const ro = new ResizeObserver(() => requestDraw());
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
        if (visibleRef.current) requestDraw();
        syncSpin(); // 离屏停转、进视口若开着自转则恢复
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (spinRafRef.current !== null) cancelAnimationFrame(spinRafRef.current);
      spinRafRef.current = null;
      if (objectVao) gl.deleteVertexArray(objectVao);
      if (objectBuf) gl.deleteBuffer(objectBuf);
      if (lampVao) gl.deleteVertexArray(lampVao);
      if (lampBuf) gl.deleteBuffer(lampBuf);
      if (diffuseTexRef.current) gl.deleteTexture(diffuseTexRef.current);
      if (specularTexRef.current) gl.deleteTexture(specularTexRef.current);
      gl.deleteProgram(objectProg);
      gl.deleteProgram(lampProg);
      glRef.current = null;
      objectProgRef.current = null;
      lampProgRef.current = null;
      objectUniformsRef.current = null;
      lampUniformsRef.current = null;
      objectVaoRef.current = null;
      lampVaoRef.current = null;
      diffuseTexRef.current = null;
      specularTexRef.current = null;
    };
  }, [requestDraw, syncSpin]);

  return { canvasRef, status, requestDraw, syncSpin };
}
