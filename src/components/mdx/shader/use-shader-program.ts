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
 *  - 自定义 uniforms：值放 ref，每帧从 ref 读并上传（HEL-26 控件改值 → 改 ref → 下一帧反映）
 *  - rAF 渲染循环；离屏（IntersectionObserver 不可见）暂停，进视口恢复
 *  - reduced-motion：不自动推进 uTime（冻结在 0），但保留 uMouse 交互
 *  - 卸载 / 重编译时释放全部 GL 资源（program / shader / buffer / vao），避免泄漏
 *
 * 「值变不重编译」（HEL-26 核心，修 HEL-25 遗留）：
 *  program 只在 frag/vert 变化时构建一次（effect deps 仅 [frag, vert, reducedMotion]）；
 *  自定义 uniform 的当前值由调用方放进 uniformValuesRef，renderFrame 每帧从 ref 读取并上传。
 *  控件改值只写 ref，不进 effect deps、不触发重编译、不重建 program——下一帧自动反映。
 */

// ============================ 标准 / 自定义 uniform 类型 ============================

/** 自定义 uniform 的运行时值：标量或 2~4 维向量。 */
export type UniformValue = number | readonly number[];
export type UniformMap = Record<string, UniformValue>;

/**
 * uniform 控件声明 schema（HEL-26）。作者在 .mdx 里声明一组 control，
 * UniformControls 据此自动生成滑块 / 颜色选择器 / 开关，运行时驱动同名 uniform。
 *
 * 着色器侧约定（须与 type 对应声明）：
 *  - float → `uniform float <name>;`   控件 = 单个 Slider
 *  - color → `uniform vec3  <name>;`   控件 = 原生 color input（rgb 0..1 传入）
 *  - bool  → `uniform float <name>;`   控件 = Toggle（传 0.0 / 1.0，非 GLSL bool）
 *  - vec2  → `uniform vec2  <name>;`   控件 = 2 个分量 Slider
 *  - vec3  → `uniform vec3  <name>;`   控件 = 3 个分量 Slider
 *
 * bool 选用 float 0.0/1.0（而非 GLSL `bool`）以与引擎 setUniform 的 uniform1f 通路统一，
 * 作者在 frag 里用 `if (<name> > 0.5)` 判定即可，避免 bool uniform 的上传分支。
 */
export type UniformControlType = "float" | "color" | "bool" | "vec2" | "vec3";

export type UniformControl = {
  /** 对应 frag 里的 uniform 名（如 "uSpeed"） */
  name: string;
  /** 控件显示标签（缺省回退到 name） */
  label?: string;
  /** 控件类型，决定生成哪种控件与上传维度 */
  type: UniformControlType;
  /** 滑块下界（float / vec*），缺省 0 */
  min?: number;
  /** 滑块上界（float / vec*），缺省 1 */
  max?: number;
  /** 滑块步进（float / vec*），缺省 0.01 */
  step?: number;
  /**
   * 默认值（= 初值，也是重置目标）：
   *  - float → number
   *  - color → [r, g, b]（0..1）
   *  - bool  → boolean
   *  - vec2  → [x, y]；vec3 → [x, y, z]
   */
  default: number | boolean | readonly number[];
};

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
  /**
   * 自定义 uniform 当前值的 ref（HEL-26 关键通路）。
   * 调用方（ShaderCanvas）持有此 ref，控件改值时直接写 ref.current；
   * renderFrame 每帧从 ref 读取并上传——值变只写 ref，不进 effect deps、不重编译。
   */
  uniformValuesRef?: React.RefObject<UniformMap>;
};

export type UseShaderProgramReturn = {
  /** 绑到 <canvas> 上 */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** 编译 / 运行状态：ok 或带 InfoLog 的 error（供容器内回显） */
  status: ShaderStatus;
  /** 重置：uTime 归零、uMouse 复位到中心（自定义 uniform 的重置由调用方各自处理） */
  reset: () => void;
};

/**
 * 把一个片段着色器跑在 canvas 上，自动管理 GL 生命周期、动画循环、交互与释放。
 * program 只在 frag / vert 变化时构建一次（旧资源先释放）；自定义 uniform 的当前值
 * 从 uniformValuesRef 每帧读取上传，值变不重编译（见文件头「值变不重编译」说明）。
 */
export function useShaderProgram({
  frag,
  vert,
  uniformValuesRef,
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

    // 自定义 uniforms 的 location 缓存：按名查询一次，缓存 name → location（含 null）。
    // program 在此 effect 内构建，故缓存随 program 同生命周期；frag/vert 变 → effect 重跑 →
    // program 重建 → 缓存重建。值不在此处读取，由 renderFrame 每帧从 valuesRef 读（值变不重编译）。
    // 未被 frag 使用 / 被编译器优化掉的名字缓存为 null，下帧不再重复查询。
    const customLocations = new Map<string, WebGLUniformLocation | null>();
    const resolveLocation = (name: string): WebGLUniformLocation | null => {
      const cached = customLocations.get(name);
      if (cached !== undefined) return cached;
      const loc = gl.getUniformLocation(program, name);
      customLocations.set(name, loc);
      return loc;
    };

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
      // 自定义 uniform：每帧从 ref 读当前值并上传。控件改值只改 ref.current，
      // 下一帧自动反映——不触发 effect、不重建 program（值变不重编译）。
      const values = uniformValuesRef?.current;
      if (values) {
        for (const name in values) {
          const loc = resolveLocation(name);
          if (loc) setUniform(gl, loc, values[name]);
        }
      }
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
    // deps 含 frag / vert / reducedMotion / uniformValuesRef：program 只在着色器源码或动效
    // 偏好变化时重建。uniformValuesRef 是稳定 ref 对象（调用方 useRef 创建，identity 不变），
    // 入 deps 仅满足 exhaustive-deps，不会触发重跑；其 .current 的值变化经每帧读取反映，
    // 故 uniform 值变不重编译、不重建 program（HEL-26 核心）。
  }, [frag, vert, reducedMotion, uniformValuesRef]);

  return { canvasRef, status, reset };
}
