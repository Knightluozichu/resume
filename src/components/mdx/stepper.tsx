"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * <Stepper> + <Step>：分步动画讲解（管线阶段 / 算法步骤，chapter-spec「概念/流程型」主力动画）。
 *
 * 教学动效铁律（DESIGN §动效原则 2）——必须可暂停、可单步、可拖进度：
 *  - 可单步：上一步 / 下一步按钮，逐步推进
 *  - 可暂停：自动播放时显「暂停」；本就是手动态时无须暂停（默认即暂停态）
 *  - 可拖进度：底部 range 进度条直接跳到任意步（拖动 = 拖进度）
 *  - 当前步高亮 + 步点指示
 *
 * reduced-motion（DESIGN §动效原则 4，教学动效默认暂停态加载）：
 *  - 自动播放被禁用（即使作者传了 autoPlay，也不自动跑），用户仍可手动单步/拖进度
 *  - 步间切换无额外过渡动画（内容直接替换）
 * 通过 matchMedia 显式判定（autoPlay 是定时器逻辑，不能只靠 CSS token 降级）。
 *
 * 为何 client：单步/暂停/拖进度/自动播放都是真交互与定时器。
 *
 * <Step title="...">：纯标记组件，本身不渲染；title/children 由父 <Stepper> 读取
 * （沿用 code-tabs 的 isTabElement 思路：靠 props.title 判定，不依赖 type 引用相等，
 * 跨 RSC/MDX client 代理边界稳定）。
 *
 * 颜色/间距/圆角/动效全部走 DESIGN token（硬规则 5）。
 */

type StepProps = { title: string; children: ReactNode };

export function Step(_props: StepProps): null {
  return null;
}

function isStepElement(node: ReactNode): node is ReactElement<StepProps> {
  return (
    isValidElement(node) &&
    typeof (node.props as { title?: unknown }).title === "string"
  );
}

type StepperProps = {
  children: ReactNode;
  /** 自动播放（默认 false，手动）；reduced-motion 下强制不自动播 */
  autoPlay?: boolean;
  /** 自动播放每步停留（ms），默认 1600 */
  interval?: number;
};

export function Stepper({
  children,
  autoPlay = false,
  interval = 1600,
}: StepperProps) {
  const steps = Children.toArray(children)
    .filter(isStepElement)
    .map((el) => ({ title: el.props.title, content: el.props.children }));

  const baseId = useId();
  const reduced = usePrefersReducedMotion();
  // reduced-motion 下，即使作者要求 autoPlay 也以暂停态加载
  const [playing, setPlaying] = useState(autoPlay && !reduced);
  const [index, setIndex] = useState(0);

  const last = steps.length - 1;

  const go = (next: number) => {
    setIndex(Math.min(last, Math.max(0, next)));
  };

  // 自动播放：只在「正在播 + 未到末步」时排一个定时器推进。
  // 到末步后条件不再成立、不再排定时器，自动停（不循环，教学场景看完即止）；
  // 不在 effect 里同步 setState，避免级联渲染（React Compiler 规则）。
  const ticking = playing && !reduced && steps.length > 1 && index < last;
  useEffect(() => {
    if (!ticking) return;
    const t = setTimeout(() => setIndex((i) => i + 1), interval);
    return () => clearTimeout(t);
  }, [ticking, index, interval]);

  if (steps.length === 0) return null;

  const current = steps[index];

  return (
    <section
      aria-label="分步演示"
      className="not-prose mdx-stepper my-6 rounded-card border border-border bg-elevated p-6"
    >
      {/* 顶部：⚡标签 + 步点指示 */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          分步
        </span>
        <span className="font-mono text-xs tabular-nums text-secondary">
          {index + 1} / {steps.length}
        </span>
      </div>

      {/* 步点条：当前步高亮 */}
      <ol className="mb-4 flex flex-wrap gap-2" aria-hidden="true">
        {steps.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={`跳到第 ${i + 1} 步：${s.title}`}
              className={`rounded-control border px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                i === index
                  ? "border-accent text-accent"
                  : i < index
                    ? "border-border text-primary"
                    : "border-border text-secondary hover:text-primary"
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ol>

      {/* 当前步内容 */}
      <div
        id={`${baseId}-panel`}
        role="group"
        aria-label={`第 ${index + 1} 步，共 ${steps.length} 步`}
        className="min-h-32"
      >
        <h4 className="mb-2 text-base font-semibold text-accent">
          {current.title}
        </h4>
        <div className="text-primary">{current.content}</div>
      </div>

      {/* 进度条：拖动 = 拖进度（直接跳步） */}
      {steps.length > 1 && (
        <input
          type="range"
          min={0}
          max={last}
          step={1}
          value={index}
          aria-label="演示进度"
          aria-valuetext={`第 ${index + 1} 步：${current.title}`}
          onChange={(e) => {
            setPlaying(false);
            go(Number(e.target.value));
          }}
          className="mdx-range mt-4 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
        />
      )}

      {/* 控制栏：上一步 / 暂停-播放 / 下一步 */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            go(index - 1);
          }}
          disabled={index === 0}
          aria-label="上一步"
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          上一步
        </button>

        {/* 暂停/播放：reduced-motion 下隐藏自动播放（无意义）。
            ticking=false（含播到末步）时按钮显「播放」，点击从头重播。 */}
        {!reduced && steps.length > 1 && (
          <button
            type="button"
            onClick={() => {
              if (ticking) {
                setPlaying(false);
              } else {
                // 在末步则从头播
                if (index >= last) setIndex(0);
                setPlaying(true);
              }
            }}
            aria-label={ticking ? "暂停" : "播放"}
            className="rounded-control border border-border px-3 py-2 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:border-accent"
          >
            {ticking ? "暂停" : "播放"}
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            go(index + 1);
          }}
          disabled={index === last}
          aria-label="下一步"
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          下一步
        </button>
      </div>
    </section>
  );
}

/**
 * 监听 prefers-reduced-motion（SSR 安全：server 与首渲染按「不减弱」，挂载后校正）。
 * 用 useSyncExternalStore 订阅 matchMedia——无需在 effect 内同步 setState，
 * 契合 React Compiler「不在 effect 体内级联 setState」规则。
 */
function subscribeReducedMotion(callback: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // server snapshot：不减弱
  );
}
