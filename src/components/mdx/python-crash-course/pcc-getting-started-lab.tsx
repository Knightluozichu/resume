"use client";

import { useCallback, useMemo, useState } from "react";

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

// 概念领域词汇：editor / terminal / interpreter / program / executable
//                / stdout / stderr / parse / runtime / parser / shell / path
//                / layer / trace —— 贯穿数据结构与注释。

// 执行流水线的 6 个阶段节点，自左向右。
// 前 4 个故障分别落在不同阶段，体现「按层定位」。
type Stage = {
  id: string;
  short: string;   // 节点短标题
  detail: string;  // 节点职责
  layerId: string; // 所属环境层
};

const STAGES: Stage[] = [
  { id: "save", short: "保存文件", detail: "Editor 编辑并保存 .py 源文件", layerId: "editor" },
  { id: "launch", short: "启动·PATH", detail: "Terminal 解析命令、PATH 查找、启动进程", layerId: "terminal" },
  { id: "read", short: "读取文件", detail: "Interpreter 读取 .py 文件（path 层）", layerId: "interpreter" },
  { id: "parse", short: "解析语法", detail: "Interpreter parse 语法树（parser 层）", layerId: "interpreter" },
  { id: "run", short: "执行·runtime", detail: "Program 执行语句、写 stdout/stderr", layerId: "program" },
  { id: "output", short: "输出·exit", detail: "stdout/stderr + exit code 作为证据", layerId: "program" },
];

type Layer = {
  id: string;
  name: string;
  enName: string;
};

// 四个环境层，按覆盖的阶段节点分组。
const LAYERS: Layer[] = [
  { id: "editor", name: "Editor", enName: "editor" },
  { id: "terminal", name: "Terminal", enName: "terminal" },
  { id: "interpreter", name: "Interpreter", enName: "interpreter" },
  { id: "program", name: "Program", enName: "program" },
];

type Fault = {
  id: string;
  label: string;
  stageId: string;      // 正确落点阶段
  wrongStageId: string; // 故障注入后的错误落点
  symptom: string;
  cause: string;
  fix: string;
};

const FAULTS: Fault[] = [
  {
    id: "command-not-found",
    label: "command not found",
    stageId: "launch",
    wrongStageId: "save",
    symptom: "shell 报 command not found: python3",
    cause: "PATH 未含 Python，或终端未重开；发生在解释器启动之前。",
    fix: "检查安装、重开终端、试 py/python3；不要建同名 alias 掩盖。",
  },
  {
    id: "cant-open-file",
    label: "can't open file",
    stageId: "read",
    wrongStageId: "run",
    symptom: "解释器已启动但 can't open file 'hello_world.py'",
    cause: "working directory 错、拼写/大小写错、隐藏 .py.txt 扩展名。",
    fix: "列目录证明文件位置、进正确目录或传绝对路径。",
  },
  {
    id: "syntax-error",
    label: "SyntaxError",
    stageId: "parse",
    wrongStageId: "launch",
    symptom: "解释器找到文件但 SyntaxError，caret 指向某行",
    cause: "未闭合引号或括号；parser 无法继续解析。",
    fix: "看 traceback 文件行号和 caret，修最小错误后用原命令重跑。",
  },
  {
    id: "name-error",
    label: "NameError",
    stageId: "run",
    wrongStageId: "parse",
    symptom: "语法通过但执行到该行 NameError: mesage",
    cause: "变量名拼错（mesage vs message），runtime 才暴露。",
    fix: "恢复正确名后重跑；区分 parser 错与 runtime 错的时间顺序。",
  },
];

// SVG 布局常量。
const NODE_W = 116;
const NODE_H = 58;
const GAP = 22;
const START_X = 24;
const NODE_Y = 138;
const VIEW_W = 860;
const VIEW_H = 384;

function stageX(index: number): number {
  return START_X + index * (NODE_W + GAP);
}

// 每个环境层覆盖的阶段节点 index 范围（用于画背景 band）。
const LAYER_BANDS: { layerId: string; from: number; to: number }[] = [
  { layerId: "editor", from: 0, to: 0 },
  { layerId: "terminal", from: 1, to: 1 },
  { layerId: "interpreter", from: 2, to: 3 },
  { layerId: "program", from: 4, to: 5 },
];

export function PccGettingStartedLab() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [selectedFault, setSelectedFault] = useState<string | null>(null);
  const [faultOn, setFaultOn] = useState(false);

  const reset = useCallback(() => {
    setActiveStage(null);
    setSelectedFault(null);
    setFaultOn(false);
  }, []);

  const stepForward = useCallback(() => {
    setSelectedFault(null);
    setActiveStage((prev) => {
      if (prev == null) return 0;
      return prev >= STAGES.length - 1 ? 0 : prev + 1;
    });
  }, []);

  const selectFault = useCallback((id: string) => {
    setSelectedFault(id);
    setActiveStage(null);
  }, []);

  const activeFault = useMemo(
    () => FAULTS.find((f) => f.id === selectedFault) ?? null,
    [selectedFault],
  );

  // 当前命中的阶段（故障正确落点或错误落点）。
  const landingStageId = useMemo(() => {
    if (!activeFault) return null;
    return faultOn ? activeFault.wrongStageId : activeFault.stageId;
  }, [activeFault, faultOn]);

  const landingIndex = useMemo(
    () => (landingStageId ? STAGES.findIndex((s) => s.id === landingStageId) : -1),
    [landingStageId],
  );

  const wrongPath = faultOn && activeFault != null;

  // 信息面板内容。
  let infoTitle = "编程环境四层 + 执行 trace";
  let infoBody =
    "点故障按钮看错误落在哪一层，或点「步进」推进执行 trace。每个故障对应一个最小修复层。";
  if (activeStage != null) {
    const st = STAGES[activeStage];
    const layer = LAYERS.find((l) => l.id === st.layerId)!;
    infoTitle = `阶段 ${activeStage + 1} · ${st.short}（${layer.name} 层）`;
    infoBody = st.detail;
  } else if (activeFault) {
    infoTitle = wrongPath
      ? `错误定位 · ${activeFault.label}`
      : `故障落点 · ${activeFault.label}`;
    infoBody = wrongPath
      ? `现象：${activeFault.symptom}。误判到错误层，根因未除。正确应落在「${STAGES.find((s) => s.id === activeFault.stageId)?.short}」。`
      : `现象：${activeFault.symptom}。原因：${activeFault.cause} 修法：${activeFault.fix}`;
  }

  const accentColor = wrongPath ? C.danger : C.accent;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 编程环境四层 + 分层排错 trace
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
        {/* 主可视化区：执行流水线 + 环境层 band + 故障落点 */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label="Python 编程环境四层执行流水线，选择故障看错误落在哪一层，或步进推进执行 trace"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.primary}>
            执行 trace：保存 → 启动 → 读取 → 解析 → 执行 → 输出
          </text>
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize={11} fill={C.secondary}>
            四个环境层（Editor/Terminal/Interpreter/Program）覆盖六个阶段；故障落在不同层 = 按层定位
          </text>

          {/* 环境层背景 band */}
          {LAYER_BANDS.map((band) => {
            const x1 = stageX(band.from);
            const x2 = stageX(band.to) + NODE_W;
            const layer = LAYERS.find((l) => l.id === band.layerId)!;
            const isLanding =
              landingStageId != null &&
              STAGES.slice(band.from, band.to + 1).some((s) => s.id === landingStageId);
            const bandColor = isLanding ? accentColor : C.border;
            return (
              <g key={`band-${band.layerId}`}>
                <rect
                  x={x1 - 6}
                  y={NODE_Y - 34}
                  width={x2 - x1 + 12}
                  height={NODE_H + 44}
                  rx={8}
                  fill="transparent"
                  stroke={bandColor}
                  strokeWidth={isLanding ? 1.8 : 1}
                  strokeDasharray={isLanding && wrongPath ? "5 3" : "none"}
                  opacity={isLanding ? 1 : 0.55}
                />
                <text x={(x1 + x2) / 2} y={NODE_Y - 18} textAnchor="middle" fontSize={12} fontWeight={700} fill={isLanding ? bandColor : C.secondary}>
                  {layer.name} · {layer.enName}
                </text>
              </g>
            );
          })}

          {/* 流水线节点 */}
          {STAGES.map((st, i) => {
            const x = stageX(i);
            const cx = x + NODE_W / 2;
            const cy = NODE_Y + NODE_H / 2;
            const isActive = activeStage === i;
            const isLanding = landingIndex === i;
            const highlighted = isActive || isLanding;
            const color = isLanding && wrongPath ? C.danger : isLanding ? C.danger : C.accent;
            const borderColor = highlighted ? color : C.border;
            const fillColor = highlighted ? color : C.elevated;
            const fillOpacity = highlighted ? 0.16 : 1;
            const strokeW = highlighted ? 1.8 : 1;
            const opacity = activeFault && !isLanding ? 0.4 : 1;
            return (
              <g key={`stage-${st.id}`} opacity={opacity} style={{ cursor: "pointer" }} onClick={() => { setSelectedFault(null); setActiveStage(i); }}>
                <rect
                  x={x}
                  y={NODE_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={6}
                  fill={fillColor}
                  fillOpacity={fillOpacity}
                  stroke={borderColor}
                  strokeWidth={strokeW}
                />
                <text x={cx} y={cy - 8} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.primary}>
                  {i + 1}. {st.short}
                </text>
                <text x={cx} y={cy + 9} textAnchor="middle" fontSize={11} fill={C.secondary}>
                  {st.detail.length > 14 ? st.detail.slice(0, 13) + "…" : st.detail}
                </text>
                {/* 故障落点标记 */}
                {isLanding && (
                  <g key={`mark-${st.id}`}>
                    <text x={cx} y={NODE_Y - 6} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.danger}>
                      {wrongPath ? "✗ 误判" : "● 落点"}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* 节点间箭头 */}
          {STAGES.slice(0, -1).map((st, i) => {
            const x1 = stageX(i) + NODE_W;
            const x2 = stageX(i + 1);
            const y = NODE_Y + NODE_H / 2;
            const reached = activeStage != null && i < activeStage;
            const color = reached ? C.accent : C.border;
            return (
              <g key={`arrow-${i}`}>
                <line x1={x1 + 2} y1={y} x2={x2 - 6} y2={y} stroke={color} strokeWidth={2} />
                <polygon points={`${x2 - 6},${y} ${x2 - 12},${y - 4} ${x2 - 12},${y + 4}`} fill={color} />
              </g>
            );
          })}

          {/* 底部图例 */}
          <text x={START_X} y={NODE_Y + NODE_H + 56} fontSize={11} fill={C.secondary}>
            层职责：Editor 只编辑 · Terminal 只启动 · Interpreter 读取+parse · Program 执行+输出
          </text>
          <text x={START_X} y={NODE_Y + NODE_H + 74} fontSize={11} fill={C.secondary}>
            排错原则：先辨失败层（shell/path/parser/runtime），再最小修复并用原命令回归
          </text>
        </svg>

        {/* 操作按钮行 */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            onClick={stepForward}
            className="rounded-control border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent"
            style={{ color: C.secondary }}
          >
            步进 trace
          </button>
          <span className="mx-1 text-xs" style={{ color: C.secondary }}>
            故障：
          </span>
          {FAULTS.map((f) => {
            const active = selectedFault === f.id;
            return (
              <button
                key={f.id}
                onClick={() => selectFault(f.id)}
                className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? wrongPath
                      ? "border-danger bg-danger/10"
                      : "border-accent bg-accent/10"
                    : "border-border hover:border-accent"
                }`}
                style={{ color: active ? (wrongPath ? C.danger : C.accent) : C.secondary }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* 信息面板 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs font-semibold" style={{ color: wrongPath ? C.danger : C.primary }}>
            {infoTitle}
          </div>
          <div className="mt-1 text-xs leading-relaxed" style={{ color: C.secondary }}>
            {infoBody}
          </div>
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
          <span className="text-xs" style={{ color: faultOn ? C.danger : C.secondary }}>
            注入故障：显示错误定位层（红色虚线 ✗ 误判，掩盖真实根因）
          </span>
        </label>
      </div>
    </div>
  );
}
