"use client";

/**
 * <FramebufferCanvas>：帧缓冲「渲到纹理 + 后处理核」交互演示画布（HEL-71，FramebufferDemo 实现层）。
 *
 * !!! 含 WebGL 代码，只允许经 framebuffer-demo.tsx 的 next/dynamic(ssr:false) 懒加载。
 *
 * 本章灵魂——真两遍渲染（render-to-texture + post-processing）：
 *  Pass 1（离屏）：把一个自转的彩色立方体（复用 camera-math 带法线立方体 + 矩阵基座，开深度测试）
 *    渲进一个自建的帧缓冲对象 FBO，FBO 挂一张颜色纹理附件 + 一个深度 renderbuffer 附件；
 *    建完用 gl.checkFramebufferStatus 验完整性，不完整则回显错误。
 *  Pass 2（上屏）：绑回默认帧缓冲（null），关深度测试，画一个铺满 NDC 的全屏四边形，
 *    片段着色器采样 Pass 1 的颜色纹理，按当前选中的后处理核（uKernel 0..4）输出：
 *    ①原图 ②反相 ③灰度 ④模糊(3×3 均值核 /9) ⑤边缘检测(3×3 边缘核)。
 *
 * 控件（≤5，spec §五）：5 个后处理核的分段选择器（默认「原图」）+ 重置；reduced-motion 默认不自转。
 * IntersectionObserver 离屏暂停 rAF；resize 重建附件；卸载释放全部 GL 资源。
 * GLSL 用 #version 300 es + precision highp float，禁用保留字。
 *
 * 与 LightingCanvas / use-lighting-program 同一三层范式（编译链接 / 资源生命周期 / rAF）。
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";

import {
  CUBE_VERTICES_NORMAL,
  mat3Create,
  mat3NormalFromMat4,
  mat4Create,
  mat4LookAt,
  mat4Multiply,
  mat4Perspective,
} from "../camera/camera-math";

export type FramebufferCanvasProps = {
  height?: number;
  /** 画布宽高比（默认 16/9，仅作 fallback 提示语义，实际尺寸由容器宽度 + height 决定） */
  aspect?: number;
  caption?: string;
};

// —— 后处理核（Pass 2 全屏四边形片段着色器的 uKernel 取值）——
const KERNELS = [
  { id: 0, label: "原图", hint: "直接采样离屏纹理，不做任何处理" },
  { id: 1, label: "反相", hint: "1 − 颜色：亮变暗、暗变亮，像底片" },
  { id: 2, label: "灰度", hint: "按亮度权重 0.2126/0.7152/0.0722 取灰" },
  { id: 3, label: "模糊", hint: "3×3 均值核（每格 1/9）抹平细节" },
  { id: 4, label: "边缘检测", hint: "3×3 边缘核：突出明暗变化处，描出轮廓" },
] as const;

type KernelId = (typeof KERNELS)[number]["id"];

// —— Pass 1：彩色立方体（按面法线给一个柔和的程序化色，开深度测试渲进 FBO）——
const SCENE_VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
uniform mat4 uModel;
uniform mat4 uViewProj;
uniform mat3 uNormalMat;
out vec3 vNormal;
void main() {
  vNormal = uNormalMat * aNormal;
  gl_Position = uViewProj * uModel * vec4(aPos, 1.0);
}`;

const SCENE_FRAG = `#version 300 es
precision highp float;
in vec3 vNormal;
uniform vec3 uLightDir;
out vec4 fragColor;
void main() {
  vec3 N = normalize(vNormal);
  // 按面法线给每个面一个鲜明的程序化色（让后处理核效果一眼可辨）
  vec3 base = 0.5 + 0.5 * N;
  // 一点方向光让立体感更强（与本章无关，仅为画面好看）
  float diff = 0.4 + 0.6 * max(dot(N, normalize(uLightDir)), 0.0);
  fragColor = vec4(base * diff, 1.0);
}`;

// —— Pass 2：全屏四边形采样离屏纹理 + 后处理核 ——
// 全屏四边形顶点：position(NDC vec2) + texcoord(vec2)，两个三角共 6 顶点。
// UV 与 NDC 同向（左下 0,0 → 右上 1,1），WebGL 纹理原点在左下，故无需翻转。
const QUAD_VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
layout(location = 1) in vec2 aTexCoord;
out vec2 vTexCoord;
void main() {
  vTexCoord = aTexCoord;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const QUAD_FRAG = `#version 300 es
precision highp float;
in vec2 vTexCoord;
uniform sampler2D uScene;   // Pass 1 的颜色纹理附件
uniform int uKernel;        // 0 原图 / 1 反相 / 2 灰度 / 3 模糊 / 4 边缘检测
uniform vec2 uTexel;        // 1 / 纹理尺寸：邻域采样的偏移步长
out vec4 fragColor;
// 取 3×3 邻域 9 个采样，按权重 w 加权求和（卷积核）。
vec3 conv(float w0, float w1, float w2, float w3, float w4, float w5, float w6, float w7, float w8) {
  vec2 o = uTexel;
  vec3 s0 = texture(uScene, vTexCoord + vec2(-o.x, o.y)).rgb;
  vec3 s1 = texture(uScene, vTexCoord + vec2(0.0, o.y)).rgb;
  vec3 s2 = texture(uScene, vTexCoord + vec2(o.x, o.y)).rgb;
  vec3 s3 = texture(uScene, vTexCoord + vec2(-o.x, 0.0)).rgb;
  vec3 s4 = texture(uScene, vTexCoord).rgb;
  vec3 s5 = texture(uScene, vTexCoord + vec2(o.x, 0.0)).rgb;
  vec3 s6 = texture(uScene, vTexCoord + vec2(-o.x, -o.y)).rgb;
  vec3 s7 = texture(uScene, vTexCoord + vec2(0.0, -o.y)).rgb;
  vec3 s8 = texture(uScene, vTexCoord + vec2(o.x, -o.y)).rgb;
  return s0 * w0 + s1 * w1 + s2 * w2 + s3 * w3 + s4 * w4 + s5 * w5 + s6 * w6 + s7 * w7 + s8 * w8;
}
void main() {
  vec3 color = texture(uScene, vTexCoord).rgb;
  if (uKernel == 1) {
    // 反相：1 − 颜色
    color = vec3(1.0) - color;
  } else if (uKernel == 2) {
    // 灰度：按人眼亮度权重取灰
    float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
    color = vec3(lum);
  } else if (uKernel == 3) {
    // 模糊：3×3 均值核，每格权重 1/9，权重和 = 1（不变亮变暗）
    float k = 1.0 / 9.0;
    color = conv(k, k, k, k, k, k, k, k, k);
  } else if (uKernel == 4) {
    // 边缘检测：3×3 边缘核（中心 8、周围 −1，权重和 = 0），突出明暗变化处
    color = conv(-1.0, -1.0, -1.0, -1.0, 8.0, -1.0, -1.0, -1.0, -1.0);
  }
  fragColor = vec4(color, 1.0);
}`;

type Status =
  | { kind: "ok" }
  | {
      kind: "error";
      stage: "vertex" | "fragment" | "link" | "framebuffer";
      log: string;
    };

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

function buildProgram(
  gl: WebGL2RenderingContext,
  vertSrc: string,
  fragSrc: string,
): {
  program: WebGLProgram | null;
  stage: "vertex" | "fragment" | "link";
  log: string;
} {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  if (!vs.shader) return { program: null, stage: "vertex", log: vs.log };
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!fs.shader) {
    gl.deleteShader(vs.shader);
    return { program: null, stage: "fragment", log: fs.log };
  }
  const prog = gl.createProgram();
  if (!prog) {
    gl.deleteShader(vs.shader);
    gl.deleteShader(fs.shader);
    return { program: null, stage: "link", log: "无法创建程序对象" };
  }
  gl.attachShader(prog, vs.shader);
  gl.attachShader(prog, fs.shader);
  gl.linkProgram(prog);
  gl.deleteShader(vs.shader);
  gl.deleteShader(fs.shader);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog) ?? "程序链接失败";
    gl.deleteProgram(prog);
    return { program: null, stage: "link", log };
  }
  return { program: prog, stage: "link", log: "" };
}

// 全屏四边形顶点：x, y (NDC), u, v。左下 (-1,-1)/(0,0) → 右上 (1,1)/(1,1)。
const QUAD_VERTICES = new Float32Array([
  // 左下三角
  -1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1,
  // 右上三角
  -1, -1, 0, 0, 1, 1, 1, 1, -1, 1, 0, 1,
]);

const CAMERA_EYE = [2.6, 2.0, 3.4] as const;
const CAMERA_TARGET = [0, 0, 0] as const;
const CAMERA_UP = [0, 1, 0] as const;
const LIGHT_DIR = [0.5, 0.8, 0.6] as const;

export default function FramebufferCanvas({
  height = 320,
  caption = "上面这块画布是「两遍渲染」的成果：第一遍把自转的彩色立方体画进一张离屏纹理，第二遍把那张纹理贴满屏幕、按所选的后处理核处理后显示。切换下方的核，看同一画面被反相 / 取灰 / 模糊 / 描边。",
}: FramebufferCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "ok" });
  const [kernel, setKernel] = useState<KernelId>(0);
  const kernelRef = useRef<KernelId>(0);
  const reactId = useId();

  // GL 资源 refs
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const sceneProgRef = useRef<WebGLProgram | null>(null);
  const quadProgRef = useRef<WebGLProgram | null>(null);
  const cubeVaoRef = useRef<WebGLVertexArrayObject | null>(null);
  const quadVaoRef = useRef<WebGLVertexArrayObject | null>(null);
  const fboRef = useRef<WebGLFramebuffer | null>(null);
  const colorTexRef = useRef<WebGLTexture | null>(null);
  const depthRboRef = useRef<WebGLRenderbuffer | null>(null);
  const fboSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  // 立方体程序 uniform locations
  const sceneURef = useRef<{
    uModel: WebGLUniformLocation | null;
    uViewProj: WebGLUniformLocation | null;
    uNormalMat: WebGLUniformLocation | null;
    uLightDir: WebGLUniformLocation | null;
  } | null>(null);
  // 全屏四边形程序 uniform locations
  const quadURef = useRef<{
    uScene: WebGLUniformLocation | null;
    uKernel: WebGLUniformLocation | null;
    uTexel: WebGLUniformLocation | null;
  } | null>(null);

  // 自转状态（连续循环范式：running 标志 + rAF id，参照 use-shader-program）
  const visibleRef = useRef(true);
  const reducedRef = useRef(false);
  // 连续自转 loop 是否在跑（start/stop 切换）；loop 内每帧据此决定是否续帧
  const runningRef = useRef(false);
  // 连续 loop 的 rAF id（stop 时取消）
  const rafIdRef = useRef(0);
  // 一次性重绘（切核 / resize / 静态态）的 rAF id，与连续 loop 的 id 分开，互不打架
  const onceRafRef = useRef(0);
  const angleRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  // 持有最新的 tick，供 rAF 自循环引用（避免 useCallback 自引用 / 闭包过期）
  const tickRef = useRef<(ts: number) => void>(() => {});

  // 复用矩阵
  const projRef = useRef(mat4Create());
  const viewRef = useRef(mat4Create());
  const viewProjRef = useRef(mat4Create());
  const modelRef = useRef(mat4Create());
  const rotRef = useRef(mat4Create());
  const normalMatRef = useRef(mat3Create());

  // 按当前画布像素尺寸（重新）分配 FBO 的颜色纹理 + 深度 renderbuffer，并验完整性。
  const ensureFramebuffer = useCallback((w: number, h: number): boolean => {
    const gl = glRef.current;
    const fbo = fboRef.current;
    const colorTex = colorTexRef.current;
    const depthRbo = depthRboRef.current;
    if (!gl || !fbo || !colorTex || !depthRbo) return false;
    const cur = fboSizeRef.current;
    if (cur.w === w && cur.h === h) return true;

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

    // 颜色纹理附件：重新分配存储为新尺寸（data = null，只占空间供渲染写入）
    gl.bindTexture(gl.TEXTURE_2D, colorTex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      w,
      h,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // 邻域采样到边缘时夹紧，避免环绕取到对边导致描边出现假边
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      colorTex,
      0,
    );

    // 深度 renderbuffer 附件：离屏渲染立方体需要深度测试，否则前后面穿插错乱
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthRbo);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER,
      depthRbo,
    );

    const ok =
      gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);

    if (!ok) {
      setStatus({
        kind: "error",
        stage: "framebuffer",
        log: "帧缓冲不完整（checkFramebufferStatus 未返回 FRAMEBUFFER_COMPLETE）",
      });
      return false;
    }
    fboSizeRef.current = { w, h };
    return true;
  }, []);

  const draw = useCallback(() => {
    const gl = glRef.current;
    const sceneProg = sceneProgRef.current;
    const quadProg = quadProgRef.current;
    const sceneU = sceneURef.current;
    const quadU = quadURef.current;
    const cubeVao = cubeVaoRef.current;
    const quadVao = quadVaoRef.current;
    const fbo = fboRef.current;
    const colorTex = colorTexRef.current;
    const canvas = canvasRef.current;
    if (
      !gl ||
      !sceneProg ||
      !quadProg ||
      !sceneU ||
      !quadU ||
      !cubeVao ||
      !quadVao ||
      !fbo ||
      !colorTex ||
      !canvas
    )
      return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    if (!ensureFramebuffer(w, h)) return;

    // ===== Pass 1：渲染彩色立方体到离屏帧缓冲 =====
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.viewport(0, 0, w, h);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.04, 0.04, 0.06, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const proj = projRef.current;
    const view = viewRef.current;
    const viewProj = viewProjRef.current;
    mat4Perspective(proj, (45 * Math.PI) / 180, w / h, 0.1, 100);
    mat4LookAt(view, CAMERA_EYE, CAMERA_TARGET, CAMERA_UP);
    mat4Multiply(viewProj, proj, view);

    // model = 绕 Y 轴自转（angleRef 由 rAF 推进；reduced-motion 下停在初始角）
    const a = angleRef.current;
    const c = Math.cos(a);
    const s = Math.sin(a);
    const rot = rotRef.current;
    rot[0] = c;
    rot[1] = 0;
    rot[2] = -s;
    rot[3] = 0;
    rot[4] = 0;
    rot[5] = 1;
    rot[6] = 0;
    rot[7] = 0;
    rot[8] = s;
    rot[9] = 0;
    rot[10] = c;
    rot[11] = 0;
    rot[12] = 0;
    rot[13] = 0;
    rot[14] = 0;
    rot[15] = 1;
    const model = modelRef.current;
    // 叠一点 X 轴倾斜让多面同时可见：这里直接用纯 Y 自转 + 固定相机即可看到 3 个面
    model.set(rot);
    const normalMat = normalMatRef.current;
    mat3NormalFromMat4(normalMat, model);

    gl.useProgram(sceneProg);
    gl.uniformMatrix4fv(sceneU.uModel, false, model);
    gl.uniformMatrix4fv(sceneU.uViewProj, false, viewProj);
    gl.uniformMatrix3fv(sceneU.uNormalMat, false, normalMat);
    gl.uniform3f(sceneU.uLightDir, LIGHT_DIR[0], LIGHT_DIR[1], LIGHT_DIR[2]);
    gl.bindVertexArray(cubeVao);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    // ===== Pass 2：绑回默认帧缓冲，画全屏四边形采样离屏纹理 + 后处理核 =====
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, w, h);
    gl.disable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(quadProg);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, colorTex);
    gl.uniform1i(quadU.uScene, 0);
    gl.uniform1i(quadU.uKernel, kernelRef.current);
    gl.uniform2f(quadU.uTexel, 1 / w, 1 / h);
    gl.bindVertexArray(quadVao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    gl.bindVertexArray(null);
  }, [ensureFramebuffer]);

  // 连续自转循环（参照 use-shader-program 的 running 标志范式）：
  //  - tick：runningRef 为真才续帧；推进 angle（reduced-motion 下冻结角度但仍每帧重画以保持可交互）→ draw → 续帧。
  //  - 自循环经 tickRef 再次排程（不直接引用自身，避免 react-hooks/immutability 自引用报错）。
  const tick = useCallback(
    (ts: number) => {
      if (!runningRef.current) return;
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      // reduced-motion：冻结角度，仍每帧重画（保持画面可交互/可响应）
      if (!reducedRef.current) {
        angleRef.current = (angleRef.current + dt * 0.6) % (Math.PI * 2);
      }
      draw();
      rafIdRef.current = requestAnimationFrame((t) => tickRef.current(t));
    },
    [draw],
  );
  // 同步最新 tick 到 ref（在 effect 内更新，不在 render 期写 ref）
  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  // 开始连续循环：已在跑则忽略；重置时间基准后排第一帧（第一 tick 会画一帧）。
  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    lastTsRef.current = null;
    rafIdRef.current = requestAnimationFrame((t) => tickRef.current(t));
  }, []);

  // 停连续循环：清 running 标志并取消已排的帧。
  const stop = useCallback(() => {
    runningRef.current = false;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = 0;
  }, []);

  // 一次性重绘（切核 / resize / 静态态下）：连续 loop 在跑时下一 tick 会自然重画（读 kernelRef），
  // 无需额外调度；未在跑时取消任何 pending 的一次性帧再重排一次 draw（必出一帧）。
  const requestDraw = useCallback(() => {
    if (runningRef.current) return;
    if (onceRafRef.current) cancelAnimationFrame(onceRafRef.current);
    onceRafRef.current = requestAnimationFrame(() => {
      onceRafRef.current = 0;
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

    // 两套程序
    const sceneBuilt = buildProgram(gl, SCENE_VERT, SCENE_FRAG);
    if (!sceneBuilt.program) {
      setStatus({
        kind: "error",
        stage: sceneBuilt.stage,
        log: sceneBuilt.log,
      });
      return;
    }
    const quadBuilt = buildProgram(gl, QUAD_VERT, QUAD_FRAG);
    if (!quadBuilt.program) {
      gl.deleteProgram(sceneBuilt.program);
      setStatus({ kind: "error", stage: quadBuilt.stage, log: quadBuilt.log });
      return;
    }
    const sceneProg = sceneBuilt.program;
    const quadProg = quadBuilt.program;
    sceneProgRef.current = sceneProg;
    quadProgRef.current = quadProg;

    sceneURef.current = {
      uModel: gl.getUniformLocation(sceneProg, "uModel"),
      uViewProj: gl.getUniformLocation(sceneProg, "uViewProj"),
      uNormalMat: gl.getUniformLocation(sceneProg, "uNormalMat"),
      uLightDir: gl.getUniformLocation(sceneProg, "uLightDir"),
    };
    quadURef.current = {
      uScene: gl.getUniformLocation(quadProg, "uScene"),
      uKernel: gl.getUniformLocation(quadProg, "uKernel"),
      uTexel: gl.getUniformLocation(quadProg, "uTexel"),
    };

    // 立方体 VAO：position(3)+normal(3)，stride 24，法线偏移 12。
    const cubeVao = gl.createVertexArray();
    const cubeBuf = gl.createBuffer();
    gl.bindVertexArray(cubeVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuf);
    gl.bufferData(gl.ARRAY_BUFFER, CUBE_VERTICES_NORMAL, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
    cubeVaoRef.current = cubeVao;

    // 全屏四边形 VAO：position(2)+texcoord(2)，stride 16，texcoord 偏移 8。
    const quadVao = gl.createVertexArray();
    const quadBuf = gl.createBuffer();
    gl.bindVertexArray(quadVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER, QUAD_VERTICES, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
    gl.bindVertexArray(null);
    quadVaoRef.current = quadVao;

    // 帧缓冲对象 + 颜色纹理附件 + 深度 renderbuffer 附件（尺寸在 ensureFramebuffer 里按画布分配）
    const fbo = gl.createFramebuffer();
    const colorTex = gl.createTexture();
    const depthRbo = gl.createRenderbuffer();
    fboRef.current = fbo;
    colorTexRef.current = colorTex;
    depthRboRef.current = depthRbo;

    setStatus({ kind: "ok" });

    // reduced-motion 检测：reduce → 停转 + 画一帧静态；非 reduce 且可见 → 起连续循环。
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    const onMq = () => {
      reducedRef.current = mq.matches;
      if (reducedRef.current) {
        stop();
        requestDraw();
      } else if (visibleRef.current) {
        start();
      }
    };
    mq.addEventListener("change", onMq);

    // 尺寸变化重绘（连续循环在跑时下一 tick 会自然重画，requestDraw 内部会忽略）
    const ro = new ResizeObserver(() => requestDraw());
    ro.observe(canvas);

    // 离屏暂停：可见且非 reduced-motion → 连续自转；否则停转，可见时补画一帧静态。
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries[0]?.isIntersecting ?? true;
        visibleRef.current = vis;
        if (vis && !reducedRef.current) {
          start();
        } else {
          stop();
          if (vis) requestDraw();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    // 无条件画首帧（不依赖 IO/rAF 时序）：挂载即出画面，draw 内部已含 resize。
    draw();
    // 非 reduced-motion 且初始可见 → 起连续循环（start 的第一 tick 也会画一帧）。
    if (!reducedRef.current && visibleRef.current) start();

    return () => {
      mq.removeEventListener("change", onMq);
      ro.disconnect();
      io.disconnect();
      stop();
      if (onceRafRef.current) cancelAnimationFrame(onceRafRef.current);
      onceRafRef.current = 0;
      if (cubeVao) gl.deleteVertexArray(cubeVao);
      if (cubeBuf) gl.deleteBuffer(cubeBuf);
      if (quadVao) gl.deleteVertexArray(quadVao);
      if (quadBuf) gl.deleteBuffer(quadBuf);
      if (fbo) gl.deleteFramebuffer(fbo);
      if (colorTex) gl.deleteTexture(colorTex);
      if (depthRbo) gl.deleteRenderbuffer(depthRbo);
      gl.deleteProgram(sceneProg);
      gl.deleteProgram(quadProg);
      glRef.current = null;
      sceneProgRef.current = null;
      quadProgRef.current = null;
      cubeVaoRef.current = null;
      quadVaoRef.current = null;
      fboRef.current = null;
      colorTexRef.current = null;
      depthRboRef.current = null;
      fboSizeRef.current = { w: 0, h: 0 };
    };
  }, [draw, requestDraw, start, stop]);

  const selectKernel = useCallback(
    (id: KernelId) => {
      kernelRef.current = id;
      setKernel(id);
      requestDraw();
    },
    [requestDraw],
  );

  const reset = useCallback(() => {
    selectKernel(0);
  }, [selectKernel]);

  const activeHint = KERNELS.find((k) => k.id === kernel)?.hint ?? "";

  return (
    <div className="mdx-framebuffer-demo my-6 rounded-card border border-border bg-elevated p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
        <button
          type="button"
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>

      <div
        className="overflow-hidden rounded-control border border-border bg-bg"
        style={{ boxShadow: "inset 0 0 0 1px var(--accent-glow)" }}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="帧缓冲两遍渲染演示：第一遍把自转的彩色立方体渲染进一张离屏纹理，第二遍把该纹理贴满屏幕并按所选后处理核（原图/反相/灰度/模糊/边缘检测）处理后显示"
          className="block w-full"
          style={{ height }}
        />
      </div>

      {status.kind === "error" && (
        <pre className="mt-3 overflow-x-auto rounded-control border border-border bg-bg p-3 font-mono text-xs text-danger">
          {status.stage}: {status.log}
        </pre>
      )}

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        {/* 后处理核分段选择器（5 个 ghost 按钮，当前态高亮） */}
        <div
          role="radiogroup"
          aria-label="后处理核"
          className="flex flex-wrap gap-2"
        >
          {KERNELS.map((k) => {
            const selected = k.id === kernel;
            return (
              <button
                key={k.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`${k.label}：${k.hint}`}
                id={`${reactId}-kernel-${k.id}`}
                onClick={() => selectKernel(k.id)}
                className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  selected
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {k.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-secondary">
          当前后处理核：
          <span className="text-primary">
            {KERNELS.find((k) => k.id === kernel)?.label}
          </span>
          —— {activeHint}
        </p>
      </div>

      {caption && <p className="mt-3 text-sm text-secondary">{caption}</p>}
    </div>
  );
}
