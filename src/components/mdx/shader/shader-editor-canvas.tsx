"use client";

/**
 * <ShaderEditorCanvas>：editable ShaderDemo 的编排层（HEL-27）。
 *
 * !!! 本文件直接 import CodeMirror（经 ./shader-editor）与 WebGL（经 ./shader-canvas），
 * 只允许出现在 next/dynamic 懒加载 chunk 内 —— 由 shader-demo.tsx 在 editable=true 时
 * dynamic(ssr:false) 引入。这是「editable 专属 chunk」的入口：CodeMirror 仅经本文件可达，
 * 故非 editable 的 ShaderDemo（直接 dynamic ./shader-canvas）永不拉 CodeMirror（硬规则 2/6）。
 *
 * 职责（把已有件粘起来，自己不碰 GL / 不碰 CM 内部）：
 *  1. 持有「编辑器当前源码」state；编辑 → 防抖 ~400ms → 把防抖后的 frag 喂给 ShaderCanvas。
 *     ShaderCanvas 的 frag prop 变 → useShaderProgram effect 重跑 → 引擎重建 program（HEL-25）。
 *  2. 监听 ShaderCanvas 的 onStatusChange：error 时从 GLSL InfoLog 解析错误行号（1-based），
 *     传给 ShaderEditor 高亮对应行 + 在编辑器下方显示错误信息。不崩页。
 *  3. 重置：编辑器内容 + 喂给画布的 frag 都回到初始 frag。
 *
 * 错误行号与编辑器行号对齐：编辑器编辑的是「完整 frag」（含 #version/precision），
 * 喂给引擎编译的也是同一份完整源码，故 InfoLog 的行号（相对被编译源码）= 编辑器行号。
 * 所见即所跑（task 推荐方案），无偏移换算。
 *
 * 布局：宽屏（lg+）编辑器与画布左右并排（各占一半）；窄屏上下堆叠。
 *
 * 单层卡（HEL-30 收口）：本层整体画一张 editable Demo 卡（外壳 + 单一「⚡ 可编辑」标签 +
 * 重置按钮），ShaderCanvas 以 bare 模式嵌进来（不画自己的卡片外壳、不画自己的 ⚡/重置头部），
 * 编辑器作为同一张卡内的并列一块。由此外层卡统一承载「⚡ + 画布 + 控件 + 编辑器 + 重置」，
 * 避免早期「⚡可编辑」卡套「⚡可交互」画布卡的卡中卡 + 双 ⚡ 标签。
 * 重置：本层「重置」按钮既复位源码/编辑器，又通过递增 canvasReset 信号驱动 bare 画布
 * 复位 uTime/uMouse + 全部自定义 uniform（bare 画布无自带重置按钮）。
 * 非 editable 的 ShaderDemo 仍走 ShaderCanvas 默认（非 bare）路径，画布自带完整卡，不变。
 */

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ShaderCanvas 含 WebGL —— 与本文件同 chunk（本文件已是 dynamic 入口，无需再 dynamic）。
import ShaderCanvas from "./shader-canvas";
import type { ShaderStatus, UniformControl } from "./use-shader-program";

// ShaderEditor 含 CodeMirror —— 再 dynamic 一层（ssr:false），保证 CM 切进异步 chunk 且
// 不在服务端求值。loading 期画布照常先渲染（编辑器晚到不挡画布）。
const ShaderEditor = dynamic(() => import("./shader-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-40 items-center justify-center rounded-control border border-border bg-code text-xs text-secondary">
      编辑器加载中…
    </div>
  ),
});

export type ShaderEditorCanvasProps = {
  /** 初始片段着色器源码（= 编辑器初值 + 重置目标）。 */
  frag: string;
  /** 顶点着色器源码（可选；透传给 ShaderCanvas）。 */
  vert?: string;
  /** 自定义 uniform 控件 schema（透传给 ShaderCanvas）。 */
  controls?: readonly UniformControl[];
  /** 画布 / 编辑器高度（px）。默认 280。 */
  height?: number;
  /** 画布宽高比（仅当未给 height 时对画布生效，透传 ShaderCanvas）。 */
  aspect?: number;
  /** 图注（透传 ShaderCanvas）。 */
  caption?: string;
  /** 防抖毫秒（编辑停止后多久重编译）。默认 400。 */
  debounceMs?: number;
};

/**
 * 从 GLSL InfoLog 解析错误行号（1-based）。
 *
 * GLSL InfoLog 行格式（各驱动略有差异，均含 `源串号 : 行号` 这一对）：
 *   `ERROR: 0:12: 'foo' : undeclared identifier`   ← ANGLE/Chrome（第二个数字 12 = 行号）
 *   `0:12: ...`                                      ← 省略 ERROR 前缀
 *   `0:23(5): error: ...`                            ← Mesa（行号 23 后跟 (列号)）
 *   `ERROR: 12: ...`                                 ← 个别驱动只有一个数字
 * 取每行里 `数字 : 数字` 的第二个数字为行号（其后可跟 `:` 或 `(列号)`）；
 * 只有单个 `数字:` 时取该数字。解析失败时返回空数组（不高亮，仅靠下方文字提示），绝不抛错。
 */
export function parseErrorLines(log: string): number[] {
  const lines = new Set<number>();
  // 优先匹配 `a:b` → 行号取 b；b 后须跟 `:` 或 `(`（列号），以排除随机的两数字。
  const reTwo = /\b\d+\s*:\s*(\d+)\s*(?=[:(])/g;
  for (const m of log.matchAll(reTwo)) {
    const n = Number(m[1]);
    if (Number.isInteger(n) && n > 0) lines.add(n);
  }
  if (lines.size === 0) {
    // 回退：形如 `ERROR: 12:` 只有一个数字的情况。
    const reOne = /\bERROR\s*:\s*(\d+)\s*:/gi;
    for (const m of log.matchAll(reOne)) {
      const n = Number(m[1]);
      if (Number.isInteger(n) && n > 0) lines.add(n);
    }
  }
  return Array.from(lines).sort((a, b) => a - b);
}

export function ShaderEditorCanvas({
  frag: initialFrag,
  vert,
  controls,
  height = 280,
  aspect,
  caption,
  debounceMs = 400,
}: ShaderEditorCanvasProps) {
  // liveFrag = 真正喂给 ShaderCanvas 的源码（防抖后的编辑内容）。frag prop 变才触发重编译。
  // 编辑器自己持有「随手敲的最新文本」（CodeMirror 内部状态，受控更新由 onChange 传出），
  // 故这里无需另存一份 source state——handleChange 直接拿到最新 next。
  const [liveFrag, setLiveFrag] = useState(initialFrag);
  // 编译错误行号（来自 ShaderCanvas onStatusChange 的 InfoLog 解析）+ 可读错误信息。
  const [errorLines, setErrorLines] = useState<readonly number[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // 重置信号：递增 → ShaderEditor 据此把内容覆盖回 initialFrag。
  const [resetSignal, setResetSignal] = useState(0);
  // 画布重置信号（HEL-30）：递增 → bare 的 ShaderCanvas 复位 uTime/uMouse + 自定义 uniform。
  const [canvasReset, setCanvasReset] = useState(0);

  // —— 编辑 → 防抖 → 喂画布 ——
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleChange = useCallback(
    (next: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setLiveFrag(next);
      }, debounceMs);
    },
    [debounceMs],
  );
  // 卸载时清防抖计时器。
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // —— 画布状态变化 → 解析错误行 / 错误信息 ——
  const handleStatusChange = useCallback((status: ShaderStatus) => {
    if (status.kind === "ok") {
      setErrorLines([]);
      setErrorMsg(null);
      return;
    }
    // 仅片段着色器错误的行号与编辑器对齐（编辑器编辑的就是 frag）；vertex/link 不高亮行，
    // 但仍显示信息。fragment 错误才解析行号。
    const parsed =
      status.stage === "fragment" ? parseErrorLines(status.log) : [];
    setErrorLines(parsed);
    setErrorMsg(status.log.trim());
  }, []);

  // —— 重置：源码 / 喂画布的 frag / 错误态都回初始；递增 resetSignal 让编辑器覆盖内容；
  //         递增 canvasReset 让 bare 画布复位 uTime/uMouse + 自定义 uniform ——
  const handleReset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLiveFrag(initialFrag);
    setErrorLines([]);
    setErrorMsg(null);
    setResetSignal((n) => n + 1);
    setCanvasReset((n) => n + 1);
  }, [initialFrag]);

  // controls 按内容 memo，稳引用透传（避免 ShaderCanvas 内重算）。
  const controlsKey = useMemo(
    () => (controls ? JSON.stringify(controls) : ""),
    [controls],
  );
  const stableControls = useMemo(
    () => controls,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [controlsKey],
  );

  const hasError = errorMsg !== null;

  return (
    <div className="mdx-shader-editor my-6 rounded-card border border-border bg-elevated p-6">
      {/* 头部：⚡可编辑标签 + 重置 */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可编辑
        </span>
        <button
          type="button"
          onClick={handleReset}
          aria-label="重置：着色器源码恢复到初始内容、时间归零、鼠标与参数复位"
          className="rounded-control border border-border px-2 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>

      {/* 画布 + 编辑器：宽屏左右并排，窄屏上下堆叠 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* 画布舞台（bare：不画自己的卡片外壳/头部，由本层 editable 卡统一承载——单层卡） */}
        <ShaderCanvas
          frag={liveFrag}
          vert={vert}
          controls={stableControls}
          height={height}
          aspect={aspect}
          caption={caption}
          onStatusChange={handleStatusChange}
          bare
          resetSignal={canvasReset}
        />

        {/* 编辑器 + 错误信息 */}
        <div className="flex flex-col gap-2">
          <ShaderEditor
            value={initialFrag}
            onChange={handleChange}
            errorLines={errorLines}
            resetSignal={resetSignal}
            resetTo={initialFrag}
            height={height}
          />
          {hasError ? (
            <pre
              role="alert"
              className="max-h-32 overflow-auto whitespace-pre-wrap rounded-control border border-border bg-code p-2 font-mono text-xs text-danger"
            >
              {errorMsg}
            </pre>
          ) : (
            <p className="text-xs text-secondary">
              改下面的 GLSL，停手约 {Math.round(debounceMs / 100) / 10}{" "}
              秒后自动重编译； 出错时对应行会标红并在此显示信息。
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShaderEditorCanvas;
