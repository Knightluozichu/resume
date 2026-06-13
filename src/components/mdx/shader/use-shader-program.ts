"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * 裸 WebGL2 片段着色器渲染引擎（HEL-25，ShaderCanvas 的发动机）。
 *
 * 设计取舍：不引 React Three Fiber，自写最小 WebGL2 hook。理由——一页 chapter 可能
 * 同时挂多个 ShaderDemo，R3F 每个实例都拖一套场景图 / 渲染循环 / reconciler，体积与
 * 运行时开销都浪费在「我们根本不需要的 3D 场景管理」上。我们要的只是：一个全屏三角形
 * 跑用户 frag（Shadertoy 式），自动注入 uTime / uResolution / uMouse。裸 WebGL2 把
 * 这件事压到几十行、零额外依赖、可被 code-split 进懒加载 chunk。
 *
 * 本文件被 shader-canvas.tsx 使用，二者只在 next/dynamic 懒加载 chunk 内出现，
 * 绝不进入公共 layout / 首屏关键路径（CLAUDE.md 硬规则 2/6）。
 *
 * 职责：
 *  - 编译顶点/片段着色器、链接 program；失败时捕获 InfoLog 返回错误（不抛、不崩页），
 *    为 HEL-27「在线改 GLSL」预留错误回显口
 *  - 全屏覆盖三角形（单个三角形覆盖整个裁剪空间，比 quad 少一个三角，无对角接缝）
 *  - 每帧更新标准 uniforms：uTime(秒) / uResolution(像素 vec2) / uMouse(画布内归一化 vec2)
 *  - 自定义 uniforms 初值注入（HEL-26 会在此基础上加运行时控件）
 *  - rAF 渲染循环；离屏（IntersectionObserver 不可见）暂停，进视口恢复
 *  - reduced-motion：不自动推进 uTime（冻结在 0），但保留 uMouse 交互
 *  - 卸载 / 重编译时释放全部 GL 资源（program / shader / buffer / vao），避免泄漏
 */

// ============================ 标准 / 自定义 uniform 类型 ============================

/** 作者可传入的自定义 uniform 初值：标量或 2~4 维向量（HEL-26 将据此生成控件）。 */
export type UniformValue = number | readonly number[];
export type UniformMap = Record<string, UniformValue>;

/** 编译 / 链接结果：成功带 program 句柄，失败带可读 InfoLog（用于容器内回显）。 */
type CompileResult =
  | { ok: true; program: WebGLProgram }
  | { ok: false; stage: "vertex" | "fragment" | "link"; log: string };

export type ShaderStatus =
  | { kind: "ok" }
  | { kind: "error"; stage: "vertex" | "fragment" | "link"; log: string };

// ============================ 默认直通顶点着色器 ============================

/**
 * 默认顶点着色器：把覆盖屏幕的「大三角形」原样送进裁剪空间。
 * 作者只关心 frag 时无需写 vert；需要自定义顶点逻辑可传 vert 覆盖。
 * 顶点坐标由 gl_VertexID 在着色器内生成，故无需顶点属性 / VBO 数据上传。
 */
const DEFAULT_VERT = `#version 300 es
void main() {
  // 用单个三角形覆盖整个 NDC：顶点 (-1,-1) (3,-1) (-1,3)，超出部分被裁剪。
  vec2 pos = vec2(
    float((gl_VertexID << 1) & 2),
    float(gl_VertexID & 2)
  ) * 2.0 - 1.0;
  gl_Position = vec4(pos, 0.0, 1.0);
}`;

// ============================ 编译辅助 ============================

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

function buildProgram(
  gl: WebGL2RenderingContext,
  vertSrc: string,
  fragSrc: string,
): CompileResult {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  if (!vert.ok) return { ok: false, stage: "vertex", log: vert.log };

  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
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

  // 链接后 shader 可立即 detach + delete，program 已持有所需信息（避免泄漏）。
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

/** 把一个自定义 uniform 按其维度上传（标量 / vec2~4）。无效维度静默跳过。 */
function setUniform(
  gl: WebGL2RenderingContext,
  location: WebGLUniformLocation,
  value: UniformValue,
): void {
  if (typeof value === "number") {
    gl.uniform1f(location, value);
    return;
  }
  switch (value.length) {
    case 1:
      gl.uniform1f(location, value[0]);
      break;
    case 2:
      gl.uniform2f(location, value[0], value[1]);
      break;
    case 3:
      gl.uniform3f(location, value[0], value[1], value[2]);
      break;
    case 4:
      gl.uniform4f(location, value[0], value[1], value[2], value[3]);
      break;
    // 其它维度（如矩阵）暂不支持，留待后续按需扩展
  }
}

// ============================ reduced-motion ============================

/**
 * 监听 prefers-reduced-motion（与 ferrari-scene 同款 useSyncExternalStore 范式）。
 * SSR 安全（getServerSnapshot=false），无需 effect 内 setState（规避 eslint
 * react-hooks/set-state-in-effect）。检测到 reduce 时冻结 uTime，不自动播放动画。
 */
function usePrefersReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const getSnapshot = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

// ============================ 主 hook ============================

export type UseShaderProgramArgs = {
  frag: string;
  vert?: string;
  uniforms?: UniformMap;
};

export type UseShaderProgramReturn = {
  /** 绑到 <canvas> 上 */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** 编译 / 运行状态：ok 或带 InfoLog 的 error（供容器内回显） */
  status: ShaderStatus;
  /** 重置：uTime 归零、uMouse 复位到中心 */
  reset: () => void;
};

/**
 * 把一个片段着色器跑在 canvas 上，自动管理 GL 生命周期、动画循环、交互与释放。
 * frag / vert / 自定义 uniforms 变化时自动重编译（旧资源先释放）。
 */
export function useShaderProgram({
  frag,
  vert,
  uniforms,
}: UseShaderProgramArgs): UseShaderProgramReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [status, setStatus] = useState<ShaderStatus>({ kind: "ok" });

  // 鼠标位置（画布内归一化 0..1，y 向上），默认画布中心。ref 不触发 re-render。
  const mouseRef = useRef<[number, number]>([0.5, 0.5]);
  // 累计动画时间（秒）。用 ref 而非 state：每帧推进不该触发 re-render。
  const timeRef = useRef<number>(0);

  const reset = useCallback(() => {
    timeRef.current = 0;
    mouseRef.current = [0.5, 0.5];
  }, []);

  // uniforms 对象每次渲染是新引用——序列化成稳定 key，仅在内容真变时才重编译/重传。
  const uniformsKey = JSON.stringify(uniforms ?? {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      // 透明背景：让画布融进 --bg-elevated 容器（容器才是「卡片」，画布只显图像）
      alpha: true,
      antialias: true,
      // 教学 Demo 偏向省电、避免一页多 Demo 抢独显
      powerPreference: "low-power",
    });
    if (!gl) {
      // 理论上 ShaderCanvas 已在挂载前做过 WebGL2 兜底；此处兜底保险，不崩。
      setStatus({
        kind: "error",
        stage: "link",
        log: "当前环境不支持 WebGL2",
      });
      return;
    }

    const built = buildProgram(gl, vert?.trim() ? vert : DEFAULT_VERT, frag);
    if (!built.ok) {
      setStatus({ kind: "error", stage: built.stage, log: built.log });
      return;
    }
    setStatus({ kind: "ok" });
    const program = built.program;

    // 空 VAO：顶点坐标由顶点着色器用 gl_VertexID 生成，无需任何属性 / VBO。
    const vao = gl.createVertexArray();

    // 预取标准 uniform location（不存在则为 null，setUniform 时跳过）。
    gl.useProgram(program);
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");

    // 自定义 uniforms 的 location 预取（HEL-26 将让其值可由控件运行时改）。
    const customUniforms = uniforms ?? {};
    const customLocations: Array<{
      location: WebGLUniformLocation;
      value: UniformValue;
    }> = [];
    for (const [name, value] of Object.entries(customUniforms)) {
      const loc = gl.getUniformLocation(program, name);
      if (loc) customLocations.push({ location: loc, value });
    }

    // —— 尺寸：跟随容器，按 devicePixelRatio 渲染（上限 2，省 GPU）——
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    // —— 鼠标 / 触摸：换算成画布内归一化 0..1，y 翻转（GLSL 习惯下为上）——
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / Math.max(1, rect.width);
      const y = 1 - (e.clientY - rect.top) / Math.max(1, rect.height);
      mouseRef.current = [
        Math.min(1, Math.max(0, x)),
        Math.min(1, Math.max(0, y)),
      ];
    };
    canvas.addEventListener("pointermove", onPointerMove);

    // —— 渲染一帧 ——
    const renderFrame = () => {
      resize();
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      if (uTimeLoc) gl.uniform1f(uTimeLoc, timeRef.current);
      if (uResolutionLoc)
        gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      if (uMouseLoc)
        gl.uniform2f(uMouseLoc, mouseRef.current[0], mouseRef.current[1]);
      for (const { location, value } of customLocations)
        setUniform(gl, location, value);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // —— rAF 循环 + 离屏暂停 ——
    let rafId = 0;
    let running = false;
    let lastTs = 0;

    const tick = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      // reduced-motion：冻结时间，仍每帧重画以保证 uMouse 交互可见。
      if (!reducedMotion) timeRef.current += dt;
      renderFrame();
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0; // 重新计基准，避免离屏期间的时间差被一次性累加
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    // 离屏暂停：画布不在视口时停 rAF（uTime 冻结），进视口恢复。
    // 一页多 Demo 时只有可见的那些在跑，不抢 GPU。
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    // 先画一帧静态画面（即便从未进视口，也不留空白画布；reduced-motion 下这就是终态）。
    resize();
    renderFrame();

    // —— 清理：停循环、断监听、释放全部 GL 资源（避免泄漏）——
    return () => {
      stop();
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, [frag, vert, uniformsKey, uniforms, reducedMotion]);

  return { canvasRef, status, reset };
}
