"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 裸 WebGL2 纹理渲染引擎（HEL-45，TextureCanvas 的发动机）。
 *
 * 设计取舍：与 use-shader-program.ts 同源——不引 React Three Fiber，自写最小 WebGL2 hook。
 * 但纹理 Demo 的关注点与 ShaderCanvas（Shadertoy 式全屏片元）不同，故另起一个专用引擎：
 *  - ShaderCanvas：全屏覆盖三角形 + 作者 frag，无纹理、无顶点属性、rAF 常转推进 uTime
 *  - TextureCanvas：渲染一个「贴满纹理的四边形（quad）」，核心是教「纹理坐标 / 采样 /
 *    环绕 / 过滤」。无常驻动画——静态贴图，仅在参数变化时按需重绘（DESIGN §动效原则：
 *    本 Demo 无必要的持续动画，不挂 rAF 常转，省 GPU、reduced-motion 天然友好）。
 *
 * 本文件被 texture-canvas.tsx 使用，二者只在 next/dynamic 懒加载 chunk 内出现，
 * 绝不进入公共 layout / 首屏关键路径（CLAUDE.md 硬规则 2/6）。
 *
 * 职责：
 *  - 编译/链接「带纹理坐标的 quad」program（一次，挂载时）；失败捕获 InfoLog 回显，不崩页
 *  - 上传一张 256×256 纹理：内置 4 张程序化纹理可切换（UV 测试图 / 木板 / 砖墙 / 笑脸，
 *    全 Canvas2D 生成、零外部资源，HEL-65），切换 = 重新 texImage2D 上传该图 + 重绘，不重建
 *    program；亦可选传外部图片 src（加载完成前用当前内置图兜底，加载好后接管）
 *  - 环绕（wrap S/T）/ 过滤（min/mag filter）经 texParameteri 实时切换——改后只需重绘，
 *    不重编译 program、不重传纹理
 *  - uvScale（平铺/越界看环绕）、zoom（放大看过滤）经 uniform 实时驱动——同样只重绘
 *  - IntersectionObserver：离屏（不可见）不重绘；进视口补一帧。无 rAF 常转。
 *  - 卸载时释放全部 GL 资源（program / texture / vao），避免泄漏
 *
 * 「值变不重编译/不重传」（与 HEL-26 同思路）：所有可调参数（wrap/filter/uvScale/zoom 与
 * 当前 ImageData/HTMLImageElement 源）放进各自 ref，requestDraw() 调度一次重绘从 ref 读。
 * 控件改值 → 写 ref → requestDraw → 下一微任务画一帧。program/texture 对象不重建。
 */

// ============================ 可调参数类型 ============================

/** 纹理环绕方式（对应 gl.TEXTURE_WRAP_S / T 的取值）。 */
export type TextureWrap = "REPEAT" | "MIRRORED_REPEAT" | "CLAMP_TO_EDGE";

/** 纹理过滤方式（对应 min/mag filter；本 Demo 不涉及 mipmap，故只用这两档）。 */
export type TextureFilter = "NEAREST" | "LINEAR";

/**
 * 内置程序化纹理种类（HEL-65）。全部 Canvas2D 程序化生成、零外部图片资源（与全站
 * 「无外部资源」一致），且都是「一眼认得出」的真实感纹理，方便读者切换对比：
 *  - uv：UV 测试图（棋盘 + 网格 + 四角异色 + 中心标记），默认/诊断项，看采样/环绕/过滤
 *  - wood：木板（横向木纹条 + 板缝 + 色差，棕黄系）
 *  - brick：砖墙（错缝排布 + 砂浆缝 + 砖色抖动，红棕系）
 *  - face：笑脸（纯色底 + 两眼 + 一嘴，类 awesomeface，辨识度极高）
 */
export type TextureKind = "uv" | "wood" | "brick" | "face";

/** TextureCanvas 每帧从 ref 读取的当前参数快照。 */
export type TextureParams = {
  wrap: TextureWrap;
  filter: TextureFilter;
  /** UV 缩放：>1 让纹理坐标越出 [0,1]，直观展示环绕方式的差异（平铺/镜像/拉伸边缘）。 */
  uvScale: number;
  /** 放大观察：>1 放大到只覆盖纹理一小块区域，直观展示 NEAREST vs LINEAR 的差异。 */
  zoom: number;
  /** 当前显示的内置程序化纹理；切换 = 重新 texImage2D 上传该图 + 重绘，不重建 program。 */
  kind: TextureKind;
};

export type TextureStatus =
  | { kind: "ok" }
  | { kind: "error"; stage: "vertex" | "fragment" | "link"; log: string };

// ============================ 着色器源码 ============================

/**
 * 顶点着色器：一个覆盖大部分画布的居中 quad（NDC 内留边，避免贴到画布边缘）。
 * 顶点位置与基础 UV 由 gl_VertexID 在着色器内生成（两三角形 = 6 顶点），无需顶点属性/VBO。
 *
 * UV 数学（uvScale / zoom 的语义，见文件头）：
 *  vUv = (uv0 - 0.5) * uUvScale / uZoom + 0.5
 *   - 绕中心 (0.5,0.5) 缩放，保证缩放/平铺都以纹理中心为锚，不偏移
 *   - uUvScale 乘：>1 → UV 越出 [0,1] → 交由 wrap 模式决定平铺/镜像/钳边（看「环绕」）
 *   - uZoom 除：>1 → UV 收缩到中心一小块 → 少数 texel 铺满 quad（看「过滤」）
 *   - 两者可叠加，语义正交：uvScale 管「越界看环绕」，zoom 管「放大看过滤」
 */
const QUAD_VERT = `#version 300 es
precision highp float;

uniform float uUvScale;
uniform float uZoom;
uniform float uAspect; // 画布宽/高，用于把 quad 等比放置（不拉伸纹理）

out vec2 vUv;

void main() {
  // 两个三角形拼一个 quad：顶点序 (0,0)(1,0)(0,1) / (0,1)(1,0)(1,1)
  // 用位运算从 gl_VertexID 取每个三角形的角点 corner ∈ {(0,0),(1,0),(0,1),(1,1)}
  int idx = gl_VertexID;
  // 6 顶点 → 两三角；映射到 0..3 的四角，再生成坐标
  int tri[6] = int[6](0, 1, 2, 2, 1, 3);
  int corner = tri[idx];
  vec2 c = vec2(float(corner & 1), float((corner >> 1) & 1)); // 0..1 两轴

  // quad 在 NDC 里占据居中 90%（留 5% 边），并按画布宽高比等比缩放，纹理不被画布形变拉伸。
  float fill = 0.9;
  vec2 ndc = (c * 2.0 - 1.0) * fill;
  if (uAspect >= 1.0) {
    ndc.x /= uAspect; // 宽画布：横向收缩，保持方形 quad
  } else {
    ndc.y *= uAspect; // 高画布：纵向收缩
  }
  gl_Position = vec4(ndc, 0.0, 1.0);

  // 基础 UV = 角点坐标（0..1），再绕中心做 uvScale / zoom 变换。
  vec2 uv0 = c;
  vUv = (uv0 - 0.5) * uUvScale / uZoom + 0.5;
}`;

/**
 * 片段着色器：直接采样纹理。环绕（越界 UV 怎么取）与过滤（texel 间怎么插值）都由
 * texParameteri 决定，着色器侧只管 texture(uTex, vUv)——所以切 wrap/filter 不必重编译。
 */
const QUAD_FRAG = `#version 300 es
precision highp float;

uniform sampler2D uTex;

in vec2 vUv;
out vec4 outColor;

void main() {
  outColor = texture(uTex, vUv);
}`;

// ============================ 编译辅助（与 use-shader-program 同形） ============================

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): { ok: true; shader: WebGLShader } | { ok: false; log: string } {
  const shader = gl.createShader(type);
  if (!shader) return { ok: false, log: "无法创建着色器对象（GL 上下文异常）" };
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? "未知编译错误";
    gl.deleteShader(shader);
    return { ok: false, log };
  }
  return { ok: true, shader };
}

type BuildResult =
  | { ok: true; program: WebGLProgram }
  | { ok: false; stage: "vertex" | "fragment" | "link"; log: string };

function buildProgram(gl: WebGL2RenderingContext): BuildResult {
  const vert = compileShader(gl, gl.VERTEX_SHADER, QUAD_VERT);
  if (!vert.ok) return { ok: false, stage: "vertex", log: vert.log };

  const frag = compileShader(gl, gl.FRAGMENT_SHADER, QUAD_FRAG);
  if (!frag.ok) {
    gl.deleteShader(vert.shader);
    return { ok: false, stage: "fragment", log: frag.log };
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vert.shader);
    gl.deleteShader(frag.shader);
    return { ok: false, stage: "link", log: "无法创建 program 对象" };
  }
  gl.attachShader(program, vert.shader);
  gl.attachShader(program, frag.shader);
  gl.linkProgram(program);
  gl.detachShader(program, vert.shader);
  gl.detachShader(program, frag.shader);
  gl.deleteShader(vert.shader);
  gl.deleteShader(frag.shader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) ?? "未知链接错误";
    gl.deleteProgram(program);
    return { ok: false, stage: "link", log };
  }
  return { ok: true, program };
}

// ============================ 程序化「UV 测试图」 ============================

const TEX_SIZE = 256; // POT，WebGL2 下 REPEAT 安全

/**
 * 画一张 256×256「UV 测试图」：
 *  - 8×8 棋盘格（深/浅两色），让环绕的平铺/镜像一眼可辨
 *  - 等距坐标网格线（覆盖在棋盘上），放大后能看清 texel 边界
 *  - 四角不同颜色角标（左下红 / 右下绿 / 左上蓝 / 右上黄），辨别 UV 方向与镜像
 *  - 中心一个可辨标记（紫色圆 + 白点），辨别缩放/平铺的锚点
 * 全部用 Canvas2D 画在离屏 canvas 上，无外部资源（避免版权/资产问题）。
 * 返回离屏 canvas（可直接 texImage2D），失败（无 2d context）返回 null。
 */
function createUvTestCanvas(): HTMLCanvasElement | null {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const s = TEX_SIZE;
  const cells = 8;
  const cell = s / cells;

  // —— 棋盘格 —— （深空感配色：近黑底 + 浅灰格，非品牌色，纹理是「数据」不是「品牌面」）
  const dark = "#1b1b24";
  const light = "#3a3a48";
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? dark : light;
      ctx.fillRect(x * cell, y * cell, cell, cell);
    }
  }

  // —— 坐标网格线 —— （细线，叠在棋盘上；放大后是 texel 间隙的参照）
  ctx.strokeStyle = "#5a5a6e";
  ctx.lineWidth = 1;
  for (let i = 0; i <= cells; i++) {
    const p = Math.round(i * cell) + 0.5; // +0.5 对齐像素，线不发虚
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, s);
    ctx.moveTo(0, p);
    ctx.lineTo(s, p);
    ctx.stroke();
  }

  // —— 四角异色角标 —— （UV 原点/方向/镜像的判读锚）
  const corner = Math.round(cell * 0.9);
  const corners: Array<[number, number, string]> = [
    [0, s - corner, "#e5675c"], // 左下：红（UV 原点 (0,0)，y 向上时在下）
    [s - corner, s - corner, "#3fb97f"], // 右下：绿
    [0, 0, "#5c8cff"], // 左上：蓝
    [s - corner, 0, "#e5b567"], // 右上：黄
  ];
  for (const [cx, cy, color] of corners) {
    ctx.fillStyle = color;
    ctx.fillRect(cx, cy, corner, corner);
  }

  // —— 中心可辨标记 —— （品牌紫圆 + 白心点：缩放/平铺的锚点参照）
  ctx.fillStyle = "#7c5cff";
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, cell * 0.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ededf2";
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, cell * 0.22, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

// ============================ 程序化「真实感」纹理（HEL-65） ============================

/**
 * 申请一张 256×256 离屏 canvas + 2d context；拿不到 context 返回 null。
 * 三张真实感纹理共用此入口，保证尺寸一致（POT 256，REPEAT 安全）。
 */
function makeTexCanvas(): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} | null {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  return { canvas, ctx };
}

/** 小工具：把 [0,1) 的确定性伪随机（无需引库），同输入恒同输出，纹理可重现。 */
function hash01(x: number): number {
  const v = Math.sin(x * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
}

/**
 * 木板 Wood：横向木纹条 + 板缝 + 自然色差（棕黄系）。
 * 画法：底铺暖棕；按行分成 5 条木板，每条给一个略不同的基色（色差）；
 * 板内叠多条细密的横向木纹线（深浅交替，模拟年轮纹理）；板与板之间画一道深色板缝。
 * 看起来明显是「一块块横铺的木板」。
 */
function createWoodCanvas(): HTMLCanvasElement | null {
  const made = makeTexCanvas();
  if (!made) return null;
  const { canvas, ctx } = made;
  const s = TEX_SIZE;

  ctx.fillStyle = "#7a4a22"; // 暖棕底
  ctx.fillRect(0, 0, s, s);

  const planks = 5;
  const plankH = s / planks;
  for (let p = 0; p < planks; p++) {
    const y0 = p * plankH;
    // 每条木板的基色略有色差（棕黄系亮度抖动）
    const tone = 0.82 + hash01(p * 7.3) * 0.34; // 0.82~1.16
    const r = Math.round(150 * tone);
    const g = Math.round(95 * tone);
    const b = Math.round(48 * tone);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, y0, s, plankH);

    // 板内横向木纹线：多条细线，深浅沿 y 缓慢起伏（年轮感）
    const lines = 14;
    for (let i = 0; i < lines; i++) {
      const ly = y0 + (i + 0.5) * (plankH / lines) + hash01(p * 31 + i) * 3 - 1.5;
      const dark = hash01(p * 17 + i * 3) > 0.5;
      ctx.strokeStyle = dark
        ? `rgba(60,34,12,0.45)`
        : `rgba(210,160,96,0.30)`;
      ctx.lineWidth = dark ? 1.4 : 1;
      ctx.beginPath();
      // 轻微起伏的横线（用几段折线模拟木纹不平直）
      ctx.moveTo(0, ly);
      for (let x = 0; x <= s; x += 32) {
        const wob = (hash01(p * 5 + i + x) - 0.5) * 3;
        ctx.lineTo(x, ly + wob);
      }
      ctx.stroke();
    }

    // 板缝：板底画一道深色横缝（最后一条板省略，避免和上缘重复）
    if (p < planks - 1) {
      ctx.fillStyle = "rgba(40,22,8,0.85)";
      ctx.fillRect(0, y0 + plankH - 2, s, 3);
    }
  }

  return canvas;
}

/**
 * 砖墙 Brick：错缝排布的砖块 + 砂浆缝 + 砖色微随机抖动（红棕系）。
 * 画法：底铺砂浆灰；逐行画砖，相邻行水平错开半块（错缝/丁字缝）；每块砖填一个
 * 在基准红棕上做亮度抖动的颜色，砖与砖、行与行之间留出砂浆缝（底色透出）。
 * 看起来明显是「一面错缝砌的砖墙」。
 */
function createBrickCanvas(): HTMLCanvasElement | null {
  const made = makeTexCanvas();
  if (!made) return null;
  const { canvas, ctx } = made;
  const s = TEX_SIZE;

  ctx.fillStyle = "#b9b1a4"; // 砂浆灰底（缝的颜色）
  ctx.fillRect(0, 0, s, s);

  const rows = 6;
  const brickH = s / rows;
  const bricksPerRow = 4;
  const brickW = s / bricksPerRow;
  const mortar = 4; // 砂浆缝宽

  for (let row = 0; row < rows; row++) {
    const y = row * brickH;
    const offset = row % 2 === 0 ? 0 : -brickW / 2; // 错缝：奇数行左移半块
    // 多画一块覆盖左移露出的缺口
    for (let col = -1; col <= bricksPerRow; col++) {
      const x = col * brickW + offset;
      // 砖色：红棕基准 + 每块亮度抖动
      const t = 0.85 + hash01(row * 13.7 + col * 4.1) * 0.4; // 0.85~1.25
      const r = Math.round(150 * t);
      const g = Math.round(70 * t);
      const b = Math.round(52 * t);
      ctx.fillStyle = `rgb(${Math.min(255, r)},${Math.min(255, g)},${Math.min(255, b)})`;
      ctx.fillRect(
        x + mortar / 2,
        y + mortar / 2,
        brickW - mortar,
        brickH - mortar,
      );
    }
  }

  return canvas;
}

/**
 * 笑脸 Face：纯色底 + 两只眼睛 + 一张嘴（类 LearnOpenGL 的 awesomeface，辨识度极高）。
 * 画法：暖橙圆底铺满（背景留一点对比），上半画两只圆眼（白底 + 黑瞳），
 * 下半画一道上扬的弧线当微笑嘴。看起来明显是「一张笑脸」。
 */
function createFaceCanvas(): HTMLCanvasElement | null {
  const made = makeTexCanvas();
  if (!made) return null;
  const { canvas, ctx } = made;
  const s = TEX_SIZE;
  const cx = s / 2;
  const cy = s / 2;

  // 背景（脸外）：深色，让圆脸轮廓清晰
  ctx.fillStyle = "#2a2233";
  ctx.fillRect(0, 0, s, s);

  // 脸：暖橙大圆
  ctx.fillStyle = "#f4b942";
  ctx.beginPath();
  ctx.arc(cx, cy, s * 0.42, 0, Math.PI * 2);
  ctx.fill();

  // 眼睛：两只白圆 + 黑瞳
  const eyeY = cy - s * 0.1;
  const eyeDx = s * 0.16;
  const eyeR = s * 0.085;
  for (const ex of [cx - eyeDx, cx + eyeDx]) {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(ex, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2a2233";
    ctx.beginPath();
    ctx.arc(ex, eyeY + eyeR * 0.1, eyeR * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 嘴：上扬弧线（微笑）
  ctx.strokeStyle = "#2a2233";
  ctx.lineWidth = s * 0.04;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy + s * 0.02, s * 0.22, Math.PI * 0.18, Math.PI * 0.82);
  ctx.stroke();

  return canvas;
}

/** 按种类选对应的程序化生成器（值变即重选，调用方据此重新上传）。 */
function createTextureCanvas(kind: TextureKind): HTMLCanvasElement | null {
  switch (kind) {
    case "wood":
      return createWoodCanvas();
    case "brick":
      return createBrickCanvas();
    case "face":
      return createFaceCanvas();
    case "uv":
    default:
      return createUvTestCanvas();
  }
}

// ============================ 主 hook ============================

export type UseTextureProgramArgs = {
  /** 可选外部图片 URL；加载完成前用默认 UV 测试图兜底，加载完成后替换上传。 */
  src?: string;
  /** 可调参数当前值的 ref（控件改值写此 ref，requestDraw 从中读，值变不重编译/不重传）。 */
  paramsRef: React.RefObject<TextureParams>;
};

export type UseTextureProgramReturn = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  status: TextureStatus;
  /** 请求重绘一帧（控件改值后调用；离屏时只置脏位，进视口再画）。 */
  requestDraw: () => void;
};

/**
 * 把「贴满纹理的 quad」跑在 canvas 上，自动管理 GL 生命周期、纹理上传、参数切换与释放。
 * 无 rAF 常转：仅在挂载、resize、参数变化、外部图加载完成、进视口时按需绘一帧。
 */
export function useTextureProgram({
  src,
  paramsRef,
}: UseTextureProgramArgs): UseTextureProgramReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<TextureStatus>({ kind: "ok" });

  // requestDraw 的实现由 effect 内填充（effect 持有 gl/program 等闭包）。对外暴露稳定包装。
  const drawImplRef = useRef<(() => void) | null>(null);
  const requestDraw = useCallback(() => {
    drawImplRef.current?.();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    if (!gl) {
      setStatus({ kind: "error", stage: "link", log: "当前环境不支持 WebGL2" });
      return;
    }

    const built = buildProgram(gl);
    if (!built.ok) {
      setStatus({ kind: "error", stage: built.stage, log: built.log });
      return;
    }
    setStatus({ kind: "ok" });
    const program = built.program;

    const vao = gl.createVertexArray(); // 空 VAO：顶点由 gl_VertexID 生成

    gl.useProgram(program);
    const uTexLoc = gl.getUniformLocation(program, "uTex");
    const uUvScaleLoc = gl.getUniformLocation(program, "uUvScale");
    const uZoomLoc = gl.getUniformLocation(program, "uZoom");
    const uAspectLoc = gl.getUniformLocation(program, "uAspect");
    if (uTexLoc) gl.uniform1i(uTexLoc, 0); // 采样器绑到纹理单元 0

    // —— 纹理：先传默认 UV 测试图，外部 src 加载好再替换 —— 翻转 Y 使图像上方对应 UV.y 上方
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const uploadSource = (
      source: TexImageSource | null,
      fallbackSize: number,
    ) => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      if (source) {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          source,
        );
      } else {
        // 极端兜底：连 2d context 都没有时，传一张纯色，至少不黑屏/不报错。
        const px = new Uint8Array(fallbackSize * fallbackSize * 4).fill(60);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          fallbackSize,
          fallbackSize,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          px,
        );
      }
    };

    // 当前已应用到 GL 的 wrap/filter，避免每帧无谓地重复 texParameteri（仅变化时下发）。
    let appliedWrap: TextureWrap | null = null;
    let appliedFilter: TextureFilter | null = null;

    // 外部 src（极少用）优先；否则按当前内置种类上传。两者都走 uploadSource → texImage2D。
    let srcLoaded = false; // 外部图加载成功后置 true，之后切 kind 不再覆盖外部图
    let appliedKind: TextureKind | null = null;

    // 切换内置纹理（HEL-65）：重新 texImage2D 上传对应程序化图 + 重绘，不重建 program。
    // 有外部 src 且已加载成功时，内置种类让位给外部图（既有 src 用例不变）。
    const applyKind = (p: TextureParams) => {
      if (srcLoaded) return;
      if (p.kind === appliedKind) return;
      uploadSource(createTextureCanvas(p.kind), TEX_SIZE);
      appliedKind = p.kind;
      // 重新上传后强制下发一次 texParameteri（新纹理对象的参数需重设）。
      appliedWrap = null;
      appliedFilter = null;
    };

    uploadSource(createTextureCanvas(paramsRef.current.kind), TEX_SIZE);
    appliedKind = paramsRef.current.kind;

    const wrapEnum = (w: TextureWrap): number =>
      w === "REPEAT"
        ? gl.REPEAT
        : w === "MIRRORED_REPEAT"
          ? gl.MIRRORED_REPEAT
          : gl.CLAMP_TO_EDGE;
    const filterEnum = (f: TextureFilter): number =>
      f === "NEAREST" ? gl.NEAREST : gl.LINEAR;

    const applyTexParams = (p: TextureParams) => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      if (p.wrap !== appliedWrap) {
        const e = wrapEnum(p.wrap);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, e);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, e);
        appliedWrap = p.wrap;
      }
      if (p.filter !== appliedFilter) {
        const e = filterEnum(p.filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, e);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, e);
        appliedFilter = p.filter;
      }
    };

    // —— 尺寸：跟随容器，按 devicePixelRatio 渲染（上限 2，省 GPU）——
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = (): boolean => {
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        return true;
      }
      return false;
    };

    // —— 画一帧（从 paramsRef 读当前参数）——
    const drawFrame = () => {
      resize();
      const p = paramsRef.current;
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      applyKind(p); // 内置纹理切换：种类变则重新上传，再设参数（顺序在 applyTexParams 前）
      applyTexParams(p);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      if (uUvScaleLoc) gl.uniform1f(uUvScaleLoc, p.uvScale);
      if (uZoomLoc) gl.uniform1f(uZoomLoc, p.zoom);
      if (uAspectLoc)
        gl.uniform1f(uAspectLoc, canvas.width / Math.max(1, canvas.height));
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    // —— 重绘调度：合并同一帧内多次请求（如连续拖动滑块）成一次 rAF 绘制 ——
    // 仅可见时真正绘制；离屏只置脏位，进视口补画。无常驻 rAF。
    let visible = false;
    let dirty = false;
    let scheduled = 0;
    const flush = () => {
      scheduled = 0;
      if (!dirty || !visible) return;
      dirty = false;
      drawFrame();
    };
    const requestDrawImpl = () => {
      dirty = true;
      if (!visible) return; // 离屏：仅记脏，进视口时统一补画
      if (scheduled) return;
      scheduled = requestAnimationFrame(flush);
    };
    drawImplRef.current = requestDrawImpl;

    // —— 外部图片：异步加载，成功则替换上传并重绘（失败保留默认 UV 测试图）——
    let cancelled = false;
    if (src) {
      const img = new Image();
      img.crossOrigin = "anonymous"; // 允许跨域图（需服务端 CORS 头），否则纹理被污染
      img.onload = () => {
        if (cancelled) return;
        srcLoaded = true; // 外部图接管：之后切内置 kind 不再覆盖它
        uploadSource(img, TEX_SIZE);
        appliedWrap = null; // 重新上传后强制下发一次 texParameteri
        appliedFilter = null;
        requestDrawImpl();
      };
      img.src = src;
    }

    // —— 离屏暂停：不可见不绘制；进视口若期间有脏则补画 ——
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible = entry.isIntersecting;
          if (visible) requestDrawImpl();
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    // —— 容器尺寸变化：重绘（响应式）——
    const ro = new ResizeObserver(() => {
      dirty = true;
      requestDrawImpl();
    });
    ro.observe(canvas);

    // 先画一帧静态画面（即便从未进视口也不留空白；这也是 reduced-motion 下的终态）。
    drawFrame();

    return () => {
      cancelled = true;
      if (scheduled) cancelAnimationFrame(scheduled);
      drawImplRef.current = null;
      observer.disconnect();
      ro.disconnect();
      gl.deleteTexture(texture);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
    // deps：src 变 → 重建（少见，章节用例固定）。paramsRef 是稳定 ref（identity 不变），
    // 入 deps 仅满足 exhaustive-deps，不触发重跑；参数值变经 requestDraw + ref 读取反映，
    // 故 wrap/filter/uvScale/zoom 变不重编译、不重建 program/texture（HEL-45 核心）。
  }, [src, paramsRef]);

  return { canvasRef, status, requestDraw };
}
