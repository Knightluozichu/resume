/**
 * <StranglerFigDiagram>：Strangler Fig 模式——差分开发中的设计方法。
 *
 * 展示如何用 Strangler Fig 模式渐进式替换旧系统：
 *   左侧：旧 Activity（3000 行），所有逻辑混杂
 *   中间：Facade 适配层，拦截调用、路由到新或旧
 *   右侧：新 ViewModel + Repository，小且干净的模块
 *   底部：Step 1→2→3→4 的渐进时间线
 *   视觉示意旧代码逐渐缩小、新代码逐渐增长。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */

const VIEW_W = 760;
const VIEW_H = 400;

// ---- 三个主体区块 ----
const BOX_W = 180;
const BOX_H = 120;
const TOP_Y = 32;

const OLD_BOX = { x: 40, y: TOP_Y };
const FACADE_BOX = { x: (VIEW_W - BOX_W) / 2, y: TOP_Y };
const NEW_BOX = { x: VIEW_W - BOX_W - 40, y: TOP_Y };

// ---- 旧代码内部「逻辑混杂」的几块碎片 ----
const OLD_CHUNKS = [
  { label: "UI 逻辑", x: OLD_BOX.x + 14, y: OLD_BOX.y + 28, w: 68, h: 28 },
  { label: "网络请求", x: OLD_BOX.x + 92, y: OLD_BOX.y + 28, w: 76, h: 28 },
  { label: "数据解析", x: OLD_BOX.x + 14, y: OLD_BOX.y + 64, w: 68, h: 28 },
  { label: "状态管理", x: OLD_BOX.x + 92, y: OLD_BOX.y + 64, w: 76, h: 28 },
];

// ---- Facade 内部路由示意 ----
const FACADE_ROUTES = [
  { dir: "← 旧", x: FACADE_BOX.x + 10, y: FACADE_BOX.y + 36, color: "var(--text-secondary)" },
  { dir: "→ 新", x: FACADE_BOX.x + BOX_W - 72, y: FACADE_BOX.y + 36, color: "var(--success)" },
];

// ---- 新代码内部的小干净模块 ----
const NEW_MODULES = [
  { label: "ViewModel", x: NEW_BOX.x + 14, y: NEW_BOX.y + 28, w: 72, h: 28, color: "var(--success)" },
  { label: "Repository", x: NEW_BOX.x + 96, y: NEW_BOX.y + 28, w: 72, h: 28, color: "var(--success)" },
];

// ---- 四个步骤 ----
interface StepDef {
  id: string;
  label: string;
  desc: string;
}

const STEPS: readonly StepDef[] = [
  { id: "s1", label: "Step 1", desc: "加测试保护" },
  { id: "s2", label: "Step 2", desc: "抽接口" },
  { id: "s3", label: "Step 3", desc: "小模块替换" },
  { id: "s4", label: "Step 4", desc: "删除旧代码" },
];

const STEP_Y = 310;
const STEP_GAP = (VIEW_W - 80) / 4;
const STEP_START_X = 60;

export function StranglerFigDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Strangler Fig 渐进替换模式示意图。左侧是旧 Activity 约 3000 行代码，内部 UI 逻辑、网络请求、数据解析、状态管理全混在一起。中间是 Facade 适配层，拦截所有调用并根据路由分发到旧代码或新代码。右侧是新 ViewModel + Repository 小且干净的模块。底部四步渐进时间线：Step 1 加测试保护 → Step 2 抽接口 → Step 3 小模块替换 → Step 4 删除旧代码。视觉上旧代码框逐渐缩小，新代码框逐渐增长，展示 Strangler Fig 的核心思想。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker
              id="fig-arrow-old"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="fig-arrow-new"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* ===== 旧系统（左侧）===== */}
          <rect
            x={OLD_BOX.x}
            y={OLD_BOX.y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--danger)"
            strokeWidth="2.5"
          />
          <rect
            x={OLD_BOX.x}
            y={OLD_BOX.y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--danger)"
            fillOpacity="0.06"
          />
          <text
            x={OLD_BOX.x + BOX_W / 2}
            y={OLD_BOX.y + 18}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--danger)"
          >
            旧 Activity
          </text>

          {OLD_CHUNKS.map((c) => (
            <g key={c.label}>
              <rect
                x={c.x}
                y={c.y}
                width={c.w}
                height={c.h}
                rx="4"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x={c.x + c.w / 2}
                y={c.y + c.h / 2 + 4}
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {c.label}
              </text>
            </g>
          ))}

          <text
            x={OLD_BOX.x + BOX_W / 2}
            y={OLD_BOX.y + BOX_H + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            3000 行 · 逻辑混杂
          </text>

          {/* ===== Facade 适配层（中间）===== */}
          <rect
            x={FACADE_BOX.x}
            y={FACADE_BOX.y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <rect
            x={FACADE_BOX.x}
            y={FACADE_BOX.y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.08"
          />
          <text
            x={FACADE_BOX.x + BOX_W / 2}
            y={FACADE_BOX.y + 18}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            Facade 适配层
          </text>
          <text
            x={FACADE_BOX.x + BOX_W / 2}
            y={FACADE_BOX.y + BOX_H - 12}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            拦截调用 → 路由
          </text>

          {FACADE_ROUTES.map((r) => (
            <text
              key={r.dir}
              x={r.x}
              y={r.y}
              fontSize="12"
              fontWeight="600"
              fill={r.color}
            >
              {r.dir}
            </text>
          ))}

          {/* 路由分叉箭头 */}
          <text
            x={FACADE_BOX.x + BOX_W / 2}
            y={FACADE_BOX.y + 64}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            分派调用
          </text>

          {/* ===== 新系统（右侧）===== */}
          <rect
            x={NEW_BOX.x}
            y={NEW_BOX.y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="2.5"
          />
          <rect
            x={NEW_BOX.x}
            y={NEW_BOX.y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--success)"
            fillOpacity="0.06"
          />
          <text
            x={NEW_BOX.x + BOX_W / 2}
            y={NEW_BOX.y + 18}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            新模块
          </text>

          {NEW_MODULES.map((m) => (
            <g key={m.label}>
              <rect
                x={m.x}
                y={m.y}
                width={m.w}
                height={m.h}
                rx="4"
                fill={m.color}
                fillOpacity="0.12"
                stroke={m.color}
                strokeWidth="1"
              />
              <text
                x={m.x + m.w / 2}
                y={m.y + m.h / 2 + 4}
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-primary)"
              >
                {m.label}
              </text>
            </g>
          ))}

          <text
            x={NEW_BOX.x + BOX_W / 2}
            y={NEW_BOX.y + BOX_H + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            干净 · 可测试
          </text>

          {/* ===== 连接箭头 ===== */}
          {/* 左 → 中 */}
          <line
            x1={OLD_BOX.x + BOX_W}
            y1={OLD_BOX.y + BOX_H / 2}
            x2={FACADE_BOX.x}
            y2={FACADE_BOX.y + BOX_H / 2 - 16}
            stroke="var(--text-secondary)"
            strokeWidth="2"
            strokeDasharray="6 3"
            markerEnd="url(#fig-arrow-old)"
          />
          {/* 中 → 新 */}
          <line
            x1={FACADE_BOX.x + BOX_W}
            y1={FACADE_BOX.y + BOX_H / 2 - 16}
            x2={NEW_BOX.x}
            y2={NEW_BOX.y + BOX_H / 2}
            stroke="var(--success)"
            strokeWidth="2"
            markerEnd="url(#fig-arrow-new)"
          />
          {/* 中 ← 新（返回） */}
          <line
            x1={NEW_BOX.x}
            y1={NEW_BOX.y + BOX_H / 2 + 16}
            x2={FACADE_BOX.x + BOX_W}
            y2={FACADE_BOX.y + BOX_H / 2 + 16}
            stroke="var(--success)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            markerEnd="url(#fig-arrow-old)"
          />

          {/* ===== 四个步骤时间线 ===== */}
          <line
            x1={STEP_START_X}
            y1={STEP_Y}
            x2={STEP_START_X + STEP_GAP * 3 + 20}
            y2={STEP_Y}
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {STEPS.map((step, i) => {
            const sx = STEP_START_X + i * STEP_GAP;
            return (
              <g key={step.id}>
                {/* 时间线上的圆点 */}
                <circle
                  cx={sx}
                  cy={STEP_Y}
                  r="6"
                  fill="var(--bg-elevated)"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                />
                {/* Step n */}
                <text
                  x={sx}
                  y={STEP_Y - 16}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {step.label}
                </text>
                {/* 描述 */}
                <text
                  x={sx}
                  y={STEP_Y + 24}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {step.desc}
                </text>
                {/* 箭头（非最后一步） */}
                {i < STEPS.length - 1 && (
                  <text
                    x={sx + STEP_GAP / 2}
                    y={STEP_Y + 4}
                    textAnchor="middle"
                    fontSize="14"
                    fill="var(--accent)"
                  >
                    →
                  </text>
                )}
              </g>
            );
          })}

          {/* ===== 视觉暗示：旧代码缩小、新代码增长 ===== */}
          <text
            x={OLD_BOX.x + BOX_W / 2}
            y={OLD_BOX.y - 8}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            逐渐缩小 ▾
          </text>
          <text
            x={NEW_BOX.x + BOX_W / 2}
            y={NEW_BOX.y - 8}
            textAnchor="middle"
            fontSize="11"
            fill="var(--success)"
          >
            逐渐增长 ▴
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Strangler Fig 模式：Facade 适配层拦截调用，渐进式用新模块替换旧代码，旧系统逐步萎缩、新系统逐步增长。
      </figcaption>
    </figure>
  );
}
