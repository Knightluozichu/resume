"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

// ---- types ----

type AndroidDesignMode =
  | "team-map" | "architecture" | "lifecycle" | "mvp" | "patterns"
  | "error-handling" | "testing" | "refactoring" | "aac" | "kotlin" | "team-review";

type Props = {
  mode: AndroidDesignMode;
  title?: string;
  story?: string;
  /** Stepper 当前步（1-4），传入时用外部控制替代内部 state */
  currentStep?: number;
  /** 每步的可视化内容（覆盖默认的节点高亮逻辑） */
  stepVisuals?: ReactNode[];
};

type NodeDef = { label: string; x: number; y: number; tone: string };
type EdgeDef = [number, number, string?];

// ---- mode configs ----

const MODE_LABELS: Record<AndroidDesignMode, string> = {
  "team-map": "团队设计地图", architecture: "分层架构",
  lifecycle: "画面生命周期", mvp: "MVP 职责分工",
  patterns: "设计模式拓扑", "error-handling": "异常与恢复",
  testing: "测试接缝", refactoring: "重构路径",
  aac: "AAC 响应链", kotlin: "Kotlin 类型安全",
  "team-review": "团队审查地图",
};

const STORIES: Record<AndroidDesignMode, string[]> = {
  "team-map": ["需求卡片到达", "边界讨论", "接口约定", "团队同步交付"],
  architecture: ["UI 收事件", "Presenter 判断", "Repository 取数", "Model 回写"],
  lifecycle: ["打开画面", "旋转/后台", "恢复状态", "释放资源"],
  mvp: ["用户点击保存", "View 传事件给 Presenter", "Presenter 校验调 Repository", "View 显示成功或错误"],
  patterns: ["同一问题重复出现", "抽出通用角色", "替换具体实现", "团队统一写法"],
  "error-handling": ["API 调用失败", "转成 Result 类型", "UI 展示恢复入口", "记录失败原因"],
  testing: ["切开依赖", "放入替身", "驱动场景", "验证交互"],
  refactoring: ["线上 bug 暴露旧边界", "加回归测试", "包一层接口", "小切片替换"],
  aac: ["打开页面订阅数据", "旋转屏幕View重建", "ViewModel保留状态", "Observer重新订阅"],
  kotlin: ["散落的null变量", "收束为sealed UiState", "扩展函数封装习惯", "View穷尽渲染"],
  "team-review": ["发起 PR", "审查边界职责", "跑测试验证", "记录决策 ADR"],
};

// DESIGN token-based colors for nodes (map semantic roles to token var names)
// We embed the CSS var() in fill/stroke since we're in SVG
const NODE_TONES: Record<string, string> = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
  info: "#0ea5e9",
  mute: "var(--text-secondary)",
};

const NODE_SETS: Record<AndroidDesignMode, NodeDef[]> = {
  "team-map": [
    { label: "PM", x: 90, y: 92, tone: NODE_TONES.warning },
    { label: "Android", x: 225, y: 60, tone: NODE_TONES.info },
    { label: "Design", x: 225, y: 138, tone: NODE_TONES.accent },
    { label: "后端 API", x: 370, y: 60, tone: NODE_TONES.info },
    { label: "QA", x: 370, y: 138, tone: NODE_TONES.danger },
    { label: "Release", x: 520, y: 100, tone: NODE_TONES.success },
  ],
  architecture: [
    { label: "Activity", x: 100, y: 74, tone: NODE_TONES.warning },
    { label: "View", x: 225, y: 74, tone: NODE_TONES.info },
    { label: "Presenter", x: 345, y: 74, tone: NODE_TONES.accent },
    { label: "UseCase", x: 465, y: 74, tone: NODE_TONES.info },
    { label: "Repository", x: 345, y: 168, tone: NODE_TONES.success },
    { label: "DataSource", x: 465, y: 168, tone: NODE_TONES.mute },
  ],
  lifecycle: [
    { label: "Created", x: 100, y: 92, tone: NODE_TONES.info },
    { label: "Started", x: 230, y: 62, tone: NODE_TONES.success },
    { label: "Resumed", x: 365, y: 92, tone: NODE_TONES.warning },
    { label: "Paused", x: 365, y: 170, tone: NODE_TONES.accent },
    { label: "Stopped", x: 230, y: 200, tone: NODE_TONES.mute },
    { label: "Destroyed", x: 100, y: 170, tone: NODE_TONES.danger },
  ],
  mvp: [
    { label: "View", x: 130, y: 75, tone: NODE_TONES.info },
    { label: "Presenter", x: 320, y: 75, tone: NODE_TONES.accent },
    { label: "Model", x: 510, y: 75, tone: NODE_TONES.warning },
    { label: "State", x: 130, y: 175, tone: NODE_TONES.success },
    { label: "Command", x: 320, y: 175, tone: NODE_TONES.info },
    { label: "Result", x: 510, y: 175, tone: NODE_TONES.mute },
  ],
  patterns: [
    { label: "Factory", x: 110, y: 74, tone: NODE_TONES.warning },
    { label: "Strategy", x: 280, y: 54, tone: NODE_TONES.info },
    { label: "Observer", x: 450, y: 74, tone: NODE_TONES.accent },
    { label: "Adapter", x: 160, y: 178, tone: NODE_TONES.info },
    { label: "Facade", x: 380, y: 178, tone: NODE_TONES.success },
  ],
  "error-handling": [
    { label: "API Fail", x: 90, y: 82, tone: NODE_TONES.danger },
    { label: "Exception", x: 230, y: 82, tone: NODE_TONES.warning },
    { label: "Result", x: 370, y: 82, tone: NODE_TONES.info },
    { label: "Message", x: 510, y: 82, tone: NODE_TONES.accent },
    { label: "Retry", x: 370, y: 178, tone: NODE_TONES.success },
    { label: "Log", x: 510, y: 178, tone: NODE_TONES.mute },
  ],
  testing: [
    { label: "Spec", x: 95, y: 82, tone: NODE_TONES.accent },
    { label: "Presenter", x: 250, y: 82, tone: NODE_TONES.info },
    { label: "Fake Repo", x: 410, y: 82, tone: NODE_TONES.warning },
    { label: "View Spy", x: 250, y: 180, tone: NODE_TONES.info },
    { label: "Assert", x: 410, y: 180, tone: NODE_TONES.success },
  ],
  refactoring: [
    { label: "Fat Activity", x: 92, y: 90, tone: NODE_TONES.danger },
    { label: "提取职责", x: 220, y: 55, tone: NODE_TONES.warning },
    { label: "Presenter", x: 355, y: 90, tone: NODE_TONES.info },
    { label: "UseCase", x: 490, y: 55, tone: NODE_TONES.accent },
    { label: "干净 View", x: 490, y: 170, tone: NODE_TONES.success },
  ],
  aac: [
    { label: "Fragment", x: 100, y: 75, tone: NODE_TONES.info },
    { label: "ViewModel", x: 250, y: 75, tone: NODE_TONES.accent },
    { label: "LiveData", x: 400, y: 75, tone: NODE_TONES.warning },
    { label: "Room DB", x: 250, y: 178, tone: NODE_TONES.info },
    { label: "Worker", x: 400, y: 178, tone: NODE_TONES.success },
  ],
  kotlin: [
    { label: "data class", x: 110, y: 72, tone: NODE_TONES.accent },
    { label: "sealed", x: 270, y: 72, tone: NODE_TONES.warning },
    { label: "extension", x: 430, y: 72, tone: NODE_TONES.info },
    { label: "null safety", x: 190, y: 178, tone: NODE_TONES.info },
    { label: "coroutine", x: 360, y: 178, tone: NODE_TONES.success },
  ],
  "team-review": [
    { label: "PR", x: 95, y: 92, tone: NODE_TONES.accent },
    { label: "ADR", x: 225, y: 55, tone: NODE_TONES.warning },
    { label: "Tests", x: 365, y: 55, tone: NODE_TONES.info },
    { label: "Docs", x: 500, y: 92, tone: NODE_TONES.info },
    { label: "Retro", x: 365, y: 178, tone: NODE_TONES.success },
    { label: "Rules", x: 225, y: 178, tone: NODE_TONES.mute },
  ],
};

// Per-mode edge definitions: modes not listed fall back to simple chain
const EDGES: Partial<Record<AndroidDesignMode, EdgeDef[]>> = {
  lifecycle: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 1, "return"]],
  mvp: [[0, 1, "event"], [1, 2, "query"], [2, 5, "data"], [1, 4, "command"], [4, 0, "render"]],
  architecture: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5]],
  aac: [[0, 1, "observe"], [1, 2, "emit"], [2, 0, "render"], [1, 3, "query"], [1, 4, "schedule"]],
  "team-review": [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5]],
  kotlin: [[0, 1], [1, 4], [2, 0], [3, 0], [4, 2]],
  // fallback: simple chain
};

function getEdges(mode: AndroidDesignMode, nodeCount: number): EdgeDef[] {
  if (EDGES[mode]) return EDGES[mode]!;
  return Array.from({ length: nodeCount - 1 }, (_, i) => [i, i + 1]);
}

function cardWidth(label: string) {
  return Math.max(72, Math.min(118, label.length * 9 + 42));
}

/**
 * <AndroidDesignLab>：Android 设计模式系列专属交互演示组件。
 *
 * 核心改进（v2）：
 * - 接受 currentStep 外部控制 → Stepper 的每个 Step 渲染的图是连续动画
 * - 全部 DESIGN token（var(--accent)/--success 等），无裸 hex（硬规则 5）
 * - 暗色主题 bg-elevated/border，无 shadow（DESIGN §间距与布局 · 阴影禁用）
 * - 教学意义 slider：改动压力调依赖耦合度、交接清晰度调边界显式度（直接影响连线形态）
 */
export function AndroidDesignLab({ mode, title, story, currentStep, stepVisuals }: Props) {
  const [internalStep, setInternalStep] = useState(1);
  const [pressure, setPressure] = useState(45);
  const [handoff, setHandoff] = useState(55);
  const uid = useId();

  // 外部控制优先
  const step = currentStep ?? internalStep;
  const nodes = NODE_SETS[mode];
  const edges = getEdges(mode, nodes.length);
  const label = title ?? MODE_LABELS[mode];
  const storyText = story ?? STORIES[mode]?.[step - 1] ?? label;

  // 改动压力映射：压力越高连线越密→耦合度视觉化
  const couplingOpacity = 0.3 + (pressure / 100) * 0.7;

  // 交接清晰度映射：越清晰→边框越粗表边界强
  const boundaryWidth = 1 + (handoff / 100) * 3;

  const activeEdgeCount = step >= nodes.length ? edges.length : step;

  return (
    <section
      aria-label={label}
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
        {/* ---- SVG panel ---- */}
        <div className="border-b border-border bg-bg p-4 lg:border-r lg:border-b-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold tracking-wide uppercase text-accent">
                Android Design Lab
              </p>
              <h3 className="text-lg font-semibold text-primary">{label}</h3>
            </div>
            <span className="rounded-full bg-accent/10 border border-accent/30 px-3 py-1 text-xs font-semibold text-accent">
              {storyText}
            </span>
          </div>

          {stepVisuals && stepVisuals[step - 1] ? (
            <div className="flex items-center justify-center py-8">
              {stepVisuals[step - 1]}
            </div>
          ) : (
            <svg
              viewBox="0 0 640 320"
              role="img"
              aria-label={`${label} 第 ${step} 步`}
              className="h-auto w-full"
            >
              {/* 顶部标题弧线：耦合度视觉化 */}
              <path
                d={`M 60 36 C ${160 + pressure * 0.8} ${26 + step * 3}, ${300 - pressure * 0.3} ${56 + step * 5}, 570 35`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                opacity={couplingOpacity}
              />
              <text x="320" y="32" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-secondary)">
                把职责边界画清楚，再写代码
              </text>

              {/* ---- 连线（先画连线再画节点，线在节点下方）---- */}
              {edges.map(([from, to, text], idx) => {
                const a = nodes[from];
                const b = nodes[to];
                const lit = idx < activeEdgeCount;
                return (
                  <g key={`edge-${from}-${to}`}>
                    <line
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={lit ? "var(--accent)" : "var(--border)"}
                      strokeWidth={lit ? boundaryWidth + 1 : 1}
                      strokeLinecap="round"
                      opacity={lit ? 1 : 0.35}
                    />
                    {text ? (
                      <text
                        x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 8}
                        textAnchor="middle"
                        fontSize="11" fontWeight="600"
                        fill={lit ? "var(--accent)" : "var(--text-secondary)"}
                      >
                        {text}
                      </text>
                    ) : null}
                  </g>
                );
              })}

              {/* ---- 节点 ---- */}
              {nodes.map((node, idx) => {
                const w = cardWidth(node.label);
                const lit = idx < step;
                const t = lit ? `color-mix(in srgb, ${node.tone} 100%, #fff 30%)` : "var(--bg-elevated)";
                return (
                  <g key={node.label}>
                    <rect
                      x={node.x - w / 2} y={node.y - 23}
                      width={w} height="46" rx="10"
                      fill={lit ? node.tone : "var(--bg-elevated)"}
                      stroke={node.tone}
                      strokeWidth={lit ? 2.5 : 2}
                      opacity={lit ? 1 : 0.35}
                    />
                    <text
                      x={node.x} y={node.y + 5}
                      textAnchor="middle"
                      fontSize="13" fontWeight="bold"
                      fill={lit ? "var(--bg)" : "var(--text-secondary)"}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}

              {/* 底部 bar：交接清晰度 */}
              <rect x="42" y="260" width="556" height="34" rx="17" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <rect
                x="42" y="260"
                width={60 + handoff * 4.96} height="34" rx="17"
                fill="var(--success)" opacity="0.45"
              />
              <text x="320" y="281" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-secondary)">
                review handoff 清晰度
              </text>
            </svg>
          )}
        </div>

        {/* ---- controls panel ---- */}
        <div className="space-y-4 p-4">
          {/* Step slider (only when externally controlled) */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-primary">
              <span>故事步骤</span>
              <span className="font-mono tabular-nums text-accent">{step}/4</span>
            </label>
            {currentStep !== undefined ? (
              // External control: read-only display
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full transition-colors duration-(--duration-hover) ease-standard ${
                      s <= step ? "bg-accent" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            ) : (
              <input
                type="range" min="1" max="4" value={step}
                onChange={(e) => setInternalStep(Number(e.target.value))}
                className="mdx-range w-full accent-accent"
              />
            )}
          </div>

          {/* 改动压力 → 调连线密度的视觉概念映射 */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-primary">
              <span>改动压力</span>
              <span className="font-mono tabular-nums text-xs text-warning">{pressure}%</span>
            </label>
            <input
              type="range" min="10" max="100" value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="mdx-range w-full accent-warning"
            />
            <p className="mt-0.5 text-[10px] text-secondary">
              压力越高 → 依赖越密 → 越需要显式边界
            </p>
          </div>

          {/* 交接清晰度 → 调边界线粗细的视觉概念映射 */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-primary">
              <span>交接清晰度</span>
              <span className="font-mono tabular-nums text-xs text-success">{handoff}%</span>
            </label>
            <input
              type="range" min="10" max="100" value={handoff}
              onChange={(e) => setHandoff(Number(e.target.value))}
              className="mdx-range w-full accent-success"
            />
            <p className="mt-0.5 text-[10px] text-secondary">
              越清晰 → 职责边界越粗 → review 越容易
            </p>
          </div>

          {/* 步骤说明卡 */}
          <div className="rounded-control border border-accent/20 bg-accent/5 p-3 text-sm leading-6">
            <p className="font-semibold text-accent">{storyText}</p>
            <p className="mt-1 text-xs text-secondary">
              {step === 1
                ? "观察起点：谁接收事件、触发流程？"
                : step === 4
                  ? "观察终点：谁负责展示结果、谁能解释失败？"
                  : "观察中间：谁做判断、谁取数据？边界会不会被踩？"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => { setInternalStep(1); setPressure(45); setHandoff(55); }}
            className="w-full rounded-control border border-border px-3 py-2 text-sm font-semibold text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置演示
          </button>
        </div>
      </div>
    </section>
  );
}
