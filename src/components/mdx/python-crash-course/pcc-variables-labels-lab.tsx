"use client";

import { useCallback, useState } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

// 概念领域词汇：binding / label / object / rebind / immutable / strip
//                / removeprefix / removesuffix / normalize / raw / assigned
//                / reference —— 贯穿数据结构与注释。

// 概念1：Variables Are Labels —— name → object 绑定模型。
// 三步赋值序列，每步展示两个名字分别指向哪个字符串对象。
type BindStep = {
  step: number;
  code: string;
  message: string; // name binding 描述
  backup: string; // backup 指向的值（"" = 未绑定）
  status: string; // status 指向的值（"" = 未绑定）
  note: string; // 该步解释
};

const BIND_STEPS: BindStep[] = [
  {
    step: 0,
    code: "(初始状态)",
    message: "两个名字尚未绑定",
    backup: "",
    status: "",
    note: "name binding 尚未发生；名字不占内存槽，只是等待指向 object 的 label。",
  },
  {
    step: 1,
    code: 'status = "draft"',
    message: 'status → "draft"',
    backup: "",
    status: "draft",
    note: 'Python 先创建字符串对象 "draft"，再让名字 status 引用它。这不是把值装进盒子。',
  },
  {
    step: 2,
    code: "snapshot = status",
    message: 'snapshot → "draft"（与 status 同一 object）',
    backup: "draft",
    status: "draft",
    note: "snapshot 复制的是 reference，不是值。两个 name 指向同一个 immutable 字符串。",
  },
  {
    step: 3,
    code: 'status = "ready"',
    message: 'status → "ready"（重绑定，snapshot 不变）',
    backup: "draft",
    status: "ready",
    note: 'status 被 rebind 到新对象 "ready"；snapshot 仍指向 "draft"，旧 object 未被改写（string immutable）。',
  },
];

// 概念2：字符串规范化链 —— strip → removeprefix → removesuffix。
// 每步输入一个值，输出一个新值；未赋值的中间结果会被丢弃（string immutable）。
type NormStage = {
  id: string;
  label: string;
  method: string; // 调用方法
  input: string; // 输入（repr 形式）
  output: string; // 输出（repr 形式）
  desc: string; // 该步做了什么
};

const RAW_INPUT = "  https://example.com/report.txt  ";

function repr(s: string): string {
  // 显示隐藏空白：前后空格用 · 表示
  return `"${s.replace(/^ +| +$/g, (m) => "·".repeat(m.length))}"`;
}

const NORM_STAGES: NormStage[] = [
  {
    id: "raw",
    label: "raw input",
    method: "(原始输入)",
    input: "",
    output: repr(RAW_INPUT),
    desc: "外部输入保留原始证据，含两端空白；raw 值不应被覆盖。",
  },
  {
    id: "strip",
    label: "strip()",
    method: ".strip()",
    input: repr(RAW_INPUT),
    output: repr(RAW_INPUT.trim()),
    desc: "strip 只移除两端 whitespace，返回新字符串；原 raw 不变（immutable）。",
  },
  {
    id: "removeprefix",
    label: "removeprefix()",
    method: '.removeprefix("https://")',
    input: repr(RAW_INPUT.trim()),
    output: repr(RAW_INPUT.trim().replace(/^https:\/\//, "")),
    desc: 'removeprefix 精确匹配完整前缀 "https://"，只移除一次，大小写敏感。',
  },
  {
    id: "removesuffix",
    label: "removesuffix()",
    method: '.removesuffix(".txt")',
    input: repr(RAW_INPUT.trim().replace(/^https:\/\//, "")),
    output: repr(
      RAW_INPUT.trim()
        .replace(/^https:\/\//, "")
        .replace(/\.txt$/, ""),
    ),
    desc: 'removesuffix 精确匹配完整后缀 ".txt"，得到 normalized stem。',
  },
];

// SVG 布局常量。
const VIEW_W = 860;
const VIEW_H = 384;

// 绑定模型视图常量。
const NAME_X = 70;
const OBJ_BOX_W = 150;
const OBJ_BOX_H = 52;
const NAME_BOX_W = 90;
const NAME_BOX_H = 40;
const STATUS_Y = 110;
const BACKUP_Y = 230;
const OBJ_DRAFT_X = 320;
const OBJ_READY_X = 560;

// 规范化流水线常量。
const STAGE_W = 168;
const STAGE_GAP = 22;
const STAGE_START_X = 30;
const STAGE_Y = 120;

function stageCenterX(i: number): number {
  return STAGE_START_X + i * (STAGE_W + STAGE_GAP) + STAGE_W / 2;
}

export function PccVariablesLabelsLab() {
  const [mode, setMode] = useState<"binding" | "normalize">("binding");
  const [bindStep, setBindStep] = useState(0);
  const [normStep, setNormStep] = useState(0);
  const [faultOn, setFaultOn] = useState(false);

  const reset = useCallback(() => {
    setBindStep(0);
    setNormStep(0);
    setFaultOn(false);
  }, []);

  const stepForward = useCallback(() => {
    if (mode === "binding") {
      setBindStep((p) => (p >= BIND_STEPS.length - 1 ? 0 : p + 1));
    } else {
      setNormStep((p) => (p >= NORM_STAGES.length - 1 ? 0 : p + 1));
    }
  }, [mode]);

  const currentBind = BIND_STEPS[bindStep];
  const currentNorm = NORM_STAGES[normStep];

  // 信息面板内容。
  let infoTitle =
    mode === "binding" ? "变量是标签（name binding）" : "字符串规范化链";
  let infoBody =
    mode === "binding"
      ? "点「步进」逐句执行三步赋值，看 status 与 snapshot 各自指向哪个 object。"
      : "点「步进」推进 strip → removeprefix → removesuffix，每步返回新值，原对象不变。";
  if (mode === "binding") {
    infoTitle = `第 ${currentBind.step} 步 · ${currentBind.code}`;
    infoBody = currentBind.note;
  } else if (mode === "normalize") {
    infoTitle = `阶段 ${normStep} · ${currentNorm.label}（${currentNorm.method}）`;
    infoBody = currentNorm.desc;
  }

  // 故障注入：binding 模式显示"盒子模型"错误理解；normalize 模式显示 strip 误用。
  const faultTitle = faultOn
    ? mode === "binding"
      ? "错误模型：变量是盒子（值被复制）"
      : '误用：strip("https://") 当前缀删'
    : "";
  const faultBody = faultOn
    ? mode === "binding"
      ? "把变量当盒子会以为 snapshot = status 复制了值、status 改了 snapshot 也改。实际 name binding 复制的是 reference，rebind 只改一个 name。"
      : "strip 把参数视为「两端可移除的字符集合」，会误删 h/t/p/s/: 中的任意字符，而非完整前缀。应使用 removeprefix 精确匹配。"
    : "";

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 变量绑定模型 + 字符串规范化链
        </span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>

      <div className="p-4">
        {/* 模式切换 */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setMode("binding");
              setBindStep(0);
            }}
            className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "binding"
                ? "border-accent bg-accent/10"
                : "border-border hover:border-accent"
            }`}
            style={{ color: mode === "binding" ? C.accent : C.secondary }}
          >
            变量绑定模型
          </button>
          <button
            onClick={() => {
              setMode("normalize");
              setNormStep(0);
            }}
            className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "normalize"
                ? "border-accent bg-accent/10"
                : "border-border hover:border-accent"
            }`}
            style={{ color: mode === "normalize" ? C.accent : C.secondary }}
          >
            字符串规范化链
          </button>
          <button
            onClick={stepForward}
            className="rounded-control border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent"
            style={{ color: C.secondary }}
          >
            步进 →
          </button>
        </div>

        {/* 主可视化区 */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label="变量绑定模型与字符串规范化链可视化：点步进查看 name 到 object 的引用变化，或 strip/removeprefix/removesuffix 规范化链"
        >
          {mode === "binding" ? (
            <BindingView step={currentBind} faultOn={faultOn} />
          ) : (
            <NormalizeView activeStage={normStep} faultOn={faultOn} />
          )}
        </svg>

        {/* 信息面板 */}
        <div
          className="mt-3 rounded-control border border-border p-3"
          style={{ background: C.bg }}
        >
          <div className="text-xs font-semibold" style={{ color: C.primary }}>
            {infoTitle}
          </div>
          <div
            className="mt-1 text-xs leading-relaxed"
            style={{ color: C.secondary }}
          >
            {infoBody}
          </div>
          {faultOn && (
            <>
              <div
                className="mt-2 text-xs font-semibold"
                style={{ color: C.danger }}
              >
                {faultTitle}
              </div>
              <div
                className="mt-1 text-xs leading-relaxed"
                style={{ color: C.danger }}
              >
                {faultBody}
              </div>
            </>
          )}
        </div>

        {/* 故障注入开关 */}
        <label
          className="mt-3 flex cursor-pointer items-center gap-2 rounded-control border border-border p-3"
          style={{ background: C.bg }}
        >
          <input
            type="checkbox"
            checked={faultOn}
            onChange={(e) => setFaultOn(e.target.checked)}
            className="h-4 w-4 cursor-pointer"
          />
          <span
            className="text-xs"
            style={{ color: faultOn ? C.danger : C.secondary }}
          >
            注入故障：显示常见误解（
            {mode === "binding" ? "变量是盒子" : "strip 误用为前缀删除"}）
          </span>
        </label>
      </div>
    </div>
  );
}

// ---- 绑定模型视图 ----
function BindingView({ step, faultOn }: { step: BindStep; faultOn: boolean }) {
  const activeColor = faultOn ? C.danger : C.accent;

  // 画 name → object 箭头
  const arrow = (
    nameY: number,
    objX: number,
    objY: number,
    active: boolean,
  ) => {
    const x1 = NAME_X + NAME_BOX_W;
    const y1 = nameY + NAME_BOX_H / 2;
    const x2 = objX;
    const y2 = objY + OBJ_BOX_H / 2;
    const color = active ? activeColor : C.border;
    return (
      <g key={`arrow-${nameY}-${objX}`}>
        <line
          x1={x1 + 2}
          y1={y1}
          x2={x2 - 6}
          y2={y2}
          stroke={color}
          strokeWidth={active ? 2 : 1.5}
          opacity={active ? 1 : 0.35}
        />
        <polygon
          points={`${x2 - 6},${y2} ${x2 - 12},${y2 - 4} ${x2 - 12},${y2 + 4}`}
          fill={color}
          opacity={active ? 1 : 0.35}
        />
      </g>
    );
  };

  const statusBound = step.status !== "";
  const backupBound = step.backup !== "";
  const statusPointsDraft = step.status === "draft";
  const statusPointsReady = step.status === "ready";
  const backupPointsDraft = step.backup === "draft";

  return (
    <g>
      <text
        x={VIEW_W / 2}
        y={26}
        textAnchor="middle"
        fontSize={15}
        fontWeight={600}
        fill={C.primary}
      >
        变量是标签：name → object reference（
        {faultOn ? "错误：盒子模型" : "label 模型"}）
      </text>
      <text
        x={VIEW_W / 2}
        y={46}
        textAnchor="middle"
        fontSize={11}
        fill={C.secondary}
      >
        赋值复制 reference 而非值；rebind 一个 name 不影响其他 name 指向的
        immutable object
      </text>

      {/* name 框：status */}
      <g key="name-status">
        <rect
          x={NAME_X}
          y={STATUS_Y}
          width={NAME_BOX_W}
          height={NAME_BOX_H}
          rx={6}
          fill={statusBound ? activeColor : C.elevated}
          fillOpacity={statusBound ? 0.16 : 1}
          stroke={statusBound ? activeColor : C.border}
          strokeWidth={statusBound ? 1.8 : 1}
        />
        <text
          x={NAME_X + NAME_BOX_W / 2}
          y={STATUS_Y + 17}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill={C.primary}
        >
          status
        </text>
        <text
          x={NAME_X + NAME_BOX_W / 2}
          y={STATUS_Y + 32}
          textAnchor="middle"
          fontSize={11}
          fill={C.secondary}
        >
          {statusBound ? "→ bound" : "(未绑定)"}
        </text>
      </g>

      {/* name 框：snapshot */}
      <g key="name-snapshot">
        <rect
          x={NAME_X}
          y={BACKUP_Y}
          width={NAME_BOX_W}
          height={NAME_BOX_H}
          rx={6}
          fill={backupBound ? activeColor : C.elevated}
          fillOpacity={backupBound ? 0.16 : 1}
          stroke={backupBound ? activeColor : C.border}
          strokeWidth={backupBound ? 1.8 : 1}
        />
        <text
          x={NAME_X + NAME_BOX_W / 2}
          y={BACKUP_Y + 17}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill={C.primary}
        >
          snapshot
        </text>
        <text
          x={NAME_X + NAME_BOX_W / 2}
          y={BACKUP_Y + 32}
          textAnchor="middle"
          fontSize={11}
          fill={C.secondary}
        >
          {backupBound ? "→ bound" : "(未绑定)"}
        </text>
      </g>

      {/* object 框："draft" */}
      <g
        key="obj-draft"
        opacity={step.backup === "draft" || step.status === "draft" ? 1 : 0.4}
      >
        <rect
          x={OBJ_DRAFT_X}
          y={STATUS_Y}
          width={OBJ_BOX_W}
          height={OBJ_BOX_H}
          rx={6}
          fill={C.elevated}
          stroke={C.border}
          strokeWidth={1.5}
        />
        <text
          x={OBJ_DRAFT_X + OBJ_BOX_W / 2}
          y={STATUS_Y + 17}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill={C.primary}
        >
          object: &quot;draft&quot;
        </text>
        <text
          x={OBJ_DRAFT_X + OBJ_BOX_W / 2}
          y={STATUS_Y + 34}
          textAnchor="middle"
          fontSize={11}
          fill={C.secondary}
        >
          immutable string
        </text>
      </g>

      {/* object 框："ready" */}
      <g key="obj-ready" opacity={step.status === "ready" ? 1 : 0.4}>
        <rect
          x={OBJ_READY_X}
          y={STATUS_Y}
          width={OBJ_BOX_W}
          height={OBJ_BOX_H}
          rx={6}
          fill={C.elevated}
          stroke={C.border}
          strokeWidth={1.5}
        />
        <text
          x={OBJ_READY_X + OBJ_BOX_W / 2}
          y={STATUS_Y + 17}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill={C.primary}
        >
          object: &quot;ready&quot;
        </text>
        <text
          x={OBJ_READY_X + OBJ_BOX_W / 2}
          y={STATUS_Y + 34}
          textAnchor="middle"
          fontSize={11}
          fill={C.secondary}
        >
          immutable string
        </text>
      </g>

      {/* 箭头：status → object */}
      {statusPointsDraft && arrow(STATUS_Y, OBJ_DRAFT_X, STATUS_Y, true)}
      {statusPointsReady && arrow(STATUS_Y, OBJ_READY_X, STATUS_Y, true)}

      {/* 箭头：snapshot → object（snapshot 总是指向 draft，若已绑定） */}
      {backupPointsDraft &&
        (() => {
          const x1 = NAME_X + NAME_BOX_W;
          const y1 = BACKUP_Y + NAME_BOX_H / 2;
          const x2 = OBJ_DRAFT_X;
          const y2 = STATUS_Y + OBJ_BOX_H / 2;
          return (
            <g key="arrow-snapshot-draft">
              <path
                d={`M ${x1 + 2} ${y1} C ${x1 + 60} ${y1}, ${OBJ_DRAFT_X - 40} ${y2}, ${x2 - 6} ${y2}`}
                fill="none"
                stroke={activeColor}
                strokeWidth={2}
              />
              <polygon
                points={`${x2 - 6},${y2} ${x2 - 12},${y2 - 4} ${x2 - 12},${y2 + 4}`}
                fill={activeColor}
              />
            </g>
          );
        })()}

      {/* 当前代码行 */}
      <g key="code-line">
        <rect
          x={STAGE_START_X}
          y={310}
          width={VIEW_W - 60}
          height={40}
          rx={6}
          fill={C.bg}
          stroke={C.border}
        />
        <text
          x={STAGE_START_X + 12}
          y={335}
          fontSize={12}
          fontFamily="monospace"
          fill={activeColor}
        >
          {step.code}
        </text>
        <text
          x={VIEW_W - 70}
          y={335}
          textAnchor="end"
          fontSize={11}
          fill={C.secondary}
        >
          {step.message}
        </text>
      </g>

      {/* 故障注入标注 */}
      {faultOn && (
        <g key="fault-anno">
          <text
            x={OBJ_DRAFT_X + OBJ_BOX_W / 2}
            y={STATUS_Y - 10}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fill={C.danger}
          >
            ✗ 盒子模型误判：以为值被复制
          </text>
        </g>
      )}
    </g>
  );
}

// ---- 规范化链视图 ----
function NormalizeView({
  activeStage,
  faultOn,
}: {
  activeStage: number;
  faultOn: boolean;
}) {
  return (
    <g>
      <text
        x={VIEW_W / 2}
        y={26}
        textAnchor="middle"
        fontSize={15}
        fontWeight={600}
        fill={C.primary}
      >
        字符串规范化链：strip → removeprefix → removesuffix
      </text>
      <text
        x={VIEW_W / 2}
        y={46}
        textAnchor="middle"
        fontSize={11}
        fill={C.secondary}
      >
        每步返回新字符串（immutable），未赋值的中间结果会被丢弃
      </text>

      {NORM_STAGES.map((st, i) => {
        const x = STAGE_START_X + i * (STAGE_W + STAGE_GAP);
        const cx = x + STAGE_W / 2;
        const active = i === activeStage;
        const reached = i <= activeStage;
        const color =
          faultOn && i === 1 ? C.danger : active ? C.accent : C.border;
        const opacity = reached ? 1 : 0.45;
        return (
          <g key={`norm-${st.id}`} opacity={opacity}>
            {/* 节点框 */}
            <rect
              x={x}
              y={STAGE_Y}
              width={STAGE_W}
              height={130}
              rx={8}
              fill={active ? color : C.elevated}
              fillOpacity={active ? 0.12 : 1}
              stroke={color}
              strokeWidth={active ? 2 : 1.5}
              strokeDasharray={faultOn && i === 1 ? "5 3" : "none"}
            />
            <text
              x={cx}
              y={STAGE_Y + 20}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill={C.primary}
            >
              {i === 0 ? "raw input" : st.label}
            </text>
            {/* 方法 */}
            {i > 0 && (
              <text
                x={cx}
                y={STAGE_Y + 38}
                textAnchor="middle"
                fontSize={11}
                fontFamily="monospace"
                fill={active ? color : C.secondary}
              >
                {st.method}
              </text>
            )}
            {/* 输入 */}
            <text x={x + 8} y={STAGE_Y + 60} fontSize={11} fill={C.secondary}>
              输入：
            </text>
            <text
              x={x + 8}
              y={STAGE_Y + 76}
              fontSize={11}
              fontFamily="monospace"
              fill={C.primary}
            >
              {st.input.length > 22 ? st.input.slice(0, 21) + "…" : st.input}
            </text>
            {/* 输出 */}
            <text x={x + 8} y={STAGE_Y + 100} fontSize={11} fill={C.secondary}>
              输出：
            </text>
            <text
              x={x + 8}
              y={STAGE_Y + 116}
              fontSize={11}
              fontFamily="monospace"
              fill={reached ? color : C.secondary}
            >
              {st.output.length > 22 ? st.output.slice(0, 21) + "…" : st.output}
            </text>
          </g>
        );
      })}

      {/* 节点间箭头 */}
      {NORM_STAGES.slice(0, -1).map((_, i) => {
        const x1 = STAGE_START_X + i * (STAGE_W + STAGE_GAP) + STAGE_W;
        const x2 = STAGE_START_X + (i + 1) * (STAGE_W + STAGE_GAP);
        const y = STAGE_Y + 65;
        const reached = i < activeStage;
        const color = reached ? C.accent : C.border;
        return (
          <g key={`norm-arrow-${i}`}>
            <line
              x1={x1 + 2}
              y1={y}
              x2={x2 - 6}
              y2={y}
              stroke={color}
              strokeWidth={2}
              opacity={reached ? 1 : 0.5}
            />
            <polygon
              points={`${x2 - 6},${y} ${x2 - 12},${y - 4} ${x2 - 12},${y + 4}`}
              fill={color}
              opacity={reached ? 1 : 0.5}
            />
          </g>
        );
      })}

      {/* 故障标注 */}
      {faultOn && (
        <g key="norm-fault">
          <text
            x={stageCenterX(1)}
            y={STAGE_Y - 8}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fill={C.danger}
          >
            ✗ 误用：strip(&quot;https://&quot;) ≠ 前缀删除
          </text>
          <text
            x={VIEW_W / 2}
            y={STAGE_Y + 160}
            textAnchor="middle"
            fontSize={11}
            fill={C.danger}
          >
            strip 把参数当「字符集合」，会误删 h/t/p/s/: 任意字符；应改用
            removeprefix 精确匹配完整前缀
          </text>
        </g>
      )}

      {/* 底部说明 */}
      <text
        x={STAGE_START_X}
        y={STAGE_Y + 160}
        fontSize={11}
        fill={C.secondary}
      >
        {faultOn
          ? ""
          : "每步产生新 immutable 字符串；raw 保留原始证据，normalized 用于后续比较——两者都需保留。"}
      </text>
    </g>
  );
}
