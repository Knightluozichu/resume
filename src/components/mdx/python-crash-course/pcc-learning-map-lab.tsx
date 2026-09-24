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

// 概念领域词汇：phase / foundation / contract / realtime / pipeline / release
//                / fallback / chapter / dependency —— 贯穿数据结构与注释。

type Chapter = { num: number; short: string; phase: number; index: number };

// 第三版官方 20 章，按五阶段分组：foundation → contract → realtime → pipeline → release。
const CHAPTERS: Chapter[] = [
  { num: 1, short: "起步", phase: 1, index: 0 },
  { num: 2, short: "变量/字符串", phase: 1, index: 1 },
  { num: 3, short: "列表引入", phase: 1, index: 2 },
  { num: 4, short: "列表进阶", phase: 1, index: 3 },
  { num: 5, short: "条件分支", phase: 2, index: 0 },
  { num: 6, short: "字典", phase: 2, index: 1 },
  { num: 7, short: "输入/while", phase: 2, index: 2 },
  { num: 8, short: "函数", phase: 2, index: 3 },
  { num: 9, short: "类", phase: 2, index: 4 },
  { num: 10, short: "文件/异常", phase: 2, index: 5 },
  { num: 11, short: "测试", phase: 2, index: 6 },
  { num: 12, short: "飞船/子弹", phase: 3, index: 0 },
  { num: 13, short: "外星舰队", phase: 3, index: 1 },
  { num: 14, short: "计分", phase: 3, index: 2 },
  { num: 15, short: "生成数据", phase: 4, index: 0 },
  { num: 16, short: "下载数据", phase: 4, index: 1 },
  { num: 17, short: "API", phase: 4, index: 2 },
  { num: 18, short: "Django起步", phase: 5, index: 0 },
  { num: 19, short: "用户账户", phase: 5, index: 1 },
  { num: 20, short: "样式/部署", phase: 5, index: 2 },
];

type Phase = {
  id: number;
  label: string;
  name: string;
  range: string;
  capability: string;
};

const PHASES: Phase[] = [
  {
    id: 1,
    label: "阶段一",
    name: "foundation",
    range: "1–4",
    capability:
      "interpreter、binding、type、index、mutation、copy/alias 与 iteration 模型。",
  },
  {
    id: 2,
    label: "阶段二",
    name: "contract",
    range: "5–11",
    capability:
      "condition、state transition、function signature、class invariant、I/O failure 与 test oracle 边界。",
  },
  {
    id: 3,
    label: "阶段三",
    name: "realtime",
    range: "12–14",
    capability:
      "event、逐帧 update、Sprite Groups、collision 与 restart 实时状态闭环。",
  },
  {
    id: 4,
    label: "阶段四",
    name: "pipeline",
    range: "15–17",
    capability:
      "generate/read/request、parse、schema validate、normalize、encode 与 artifact 链路。",
  },
  {
    id: 5,
    label: "阶段五",
    name: "release",
    range: "18–20",
    capability:
      "Django model、migration、request、auth、static 与 deployment gates。",
  },
];

type Symptom = {
  id: string;
  label: string;
  /** 正确回退链：从症状章逐级回退到最小前置章。 */
  correct: number[];
  /** 注入故障后的错误回退路径。 */
  wrong: number[];
  explain: string;
  wrongExplain: string;
};

const SYMPTOMS: Symptom[] = [
  {
    id: "api-empty",
    label: "API 图表为空",
    correct: [17, 10, 6],
    wrong: [17, 15],
    explain:
      "先在第17章区分 transport/status/JSON schema 与 valid empty；异常处理回第10章，nested dict shape 回第6章——先修 producer contract 再重验 consumer。",
    wrongExplain:
      "错误回退：跳过 contract 直接回第15章画图，掩盖 schema/exception 缺陷，图表仍会随机为空。",
  },
  {
    id: "pygame-freeze",
    label: "Pygame 窗口冻结",
    correct: [12, 7, 9],
    wrong: [12, 5],
    explain:
      "先查第12章 event drain；termination 回第7章 while，Group cleanup 的 object owner 回第9章 class——跨章故障保留完整 dependency 链路。",
    wrongExplain:
      "错误回退：只回第5章 if 分支，忽略 while termination 与 Group ownership，冻结依旧。",
  },
  {
    id: "django-edit-other",
    label: "Django 能编辑他人 Entry",
    correct: [19],
    wrong: [19, 20],
    explain:
      "根因是第19章 authorization（owner 校验）缺失，而非第20章 CSS 样式——安全漏洞在 contract 层。",
    wrongExplain:
      "错误回退：回第20章调 CSS/样式，owner 校验缺失依旧，安全漏洞仍在。",
  },
];

// SVG 布局常量。
const NODE_W = 98;
const NODE_H = 38;
const GAP = 8;
const START_X = 116;
const ROW_GAP = 62;
const ROW_Y = [96, 158, 220, 282, 344]; // 五阶段行的中心 Y。
const VIEW_W = 860;
const VIEW_H = 384;

function chapterByNum(num: number): Chapter {
  const ch = CHAPTERS.find((c) => c.num === num);
  if (!ch) throw new Error(`unknown chapter ${num}`);
  return ch;
}

function nodeCenter(num: number): { cx: number; cy: number } {
  const ch = chapterByNum(num);
  const cx = START_X + ch.index * (NODE_W + GAP) + NODE_W / 2;
  const cy = ROW_Y[ch.phase - 1];
  return { cx, cy };
}

function nodeTopLeft(num: number): { x: number; y: number } {
  const ch = chapterByNum(num);
  const x = START_X + ch.index * (NODE_W + GAP);
  const y = ROW_Y[ch.phase - 1] - NODE_H / 2;
  return { x, y };
}

// 沿「中心→目标」方向，求射线穿出节点矩形的边界点（箭头起止贴边）。
function boundaryPoint(num: number, tx: number, ty: number): { x: number; y: number } {
  const { cx, cy } = nodeCenter(num);
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const hw = NODE_W / 2;
  const hh = NODE_H / 2;
  const sx = dx === 0 ? Infinity : hw / Math.abs(dx);
  const sy = dy === 0 ? Infinity : hh / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: cx + dx * s, y: cy + dy * s };
}

type Arrow = { path: string; endX: number; endY: number; tanX: number; tanY: number };

// 两章之间的回退箭头：二次贝塞尔曲线，控制点垂直偏移产生柔和弧度。
function arrowBetween(fromNum: number, toNum: number): Arrow {
  const fromC = nodeCenter(fromNum);
  const toC = nodeCenter(toNum);
  const start = boundaryPoint(fromNum, toC.cx, toC.cy);
  const end = boundaryPoint(toNum, fromC.cx, fromC.cy);
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  const dlen = Math.hypot(end.x - start.x, end.y - start.y) || 1;
  const perpX = (-(end.y - start.y) / dlen) * 18;
  const perpY = ((end.x - start.x) / dlen) * 18;
  const cpx = midX + perpX;
  const cpy = midY + perpY;
  const path = `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} Q ${cpx.toFixed(1)} ${cpy.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
  return { path, endX: end.x, endY: end.y, tanX: end.x - cpx, tanY: end.y - cpy };
}

function ArrowHead({ ex, ey, tanX, tanY, color }: { ex: number; ey: number; tanX: number; tanY: number; color: string }) {
  const len = Math.hypot(tanX, tanY) || 1;
  const ux = tanX / len;
  const uy = tanY / len;
  const size = 7;
  const bx = ex - ux * size;
  const by = ey - uy * size;
  const px = -uy * size * 0.42;
  const py = ux * size * 0.42;
  return (
    <polygon
      points={`${ex.toFixed(1)},${ey.toFixed(1)} ${(bx + px).toFixed(1)},${(by + py).toFixed(1)} ${(bx - px).toFixed(1)},${(by - py).toFixed(1)}`}
      fill={color}
    />
  );
}

export function PccLearningMapLab() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [faultOn, setFaultOn] = useState(false);

  const reset = useCallback(() => {
    setSelectedPhase(null);
    setSelectedSymptom(null);
    setFaultOn(false);
  }, []);

  const selectPhase = useCallback((p: number) => {
    setSelectedPhase(p);
    setSelectedSymptom(null);
  }, []);

  const selectSymptom = useCallback((id: string) => {
    setSelectedSymptom(id);
    setSelectedPhase(null);
  }, []);

  const activeSymptom = useMemo(
    () => SYMPTOMS.find((s) => s.id === selectedSymptom) ?? null,
    [selectedSymptom],
  );

  // 当前回退链：正确路径或故障路径。
  const chain = useMemo<number[] | null>(() => {
    if (!activeSymptom) return null;
    return faultOn ? activeSymptom.wrong : activeSymptom.correct;
  }, [activeSymptom, faultOn]);

  const chainSet = useMemo(() => new Set(chain ?? []), [chain]);
  const wrongPath = faultOn && activeSymptom != null;

  type NodeState = "active" | "dim" | "normal";
  const nodeState = useCallback(
    (num: number): NodeState => {
      if (activeSymptom && chain) {
        return chainSet.has(num) ? "active" : "dim";
      }
      if (selectedPhase != null) {
        return chapterByNum(num).phase === selectedPhase ? "active" : "dim";
      }
      return "normal";
    },
    [activeSymptom, chain, chainSet, selectedPhase],
  );

  // 信息面板内容。
  let infoTitle = "20 章五阶段 dependency 地图";
  let infoBody =
    "点击左侧阶段高亮该阶段章节，或选择一个症状查看最小 fallback 路径。";
  if (selectedPhase != null) {
    const ph = PHASES.find((p) => p.id === selectedPhase)!;
    infoTitle = `${ph.label} · 第${ph.range}章 · ${ph.name}`;
    infoBody = `本阶段建立的能力：${ph.capability}`;
  } else if (activeSymptom) {
    infoTitle = wrongPath
      ? `故障回退 · ${activeSymptom.label}`
      : `回退路径 · ${activeSymptom.label}`;
    infoBody = wrongPath ? activeSymptom.wrongExplain : activeSymptom.explain;
  }

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 20 章五阶段 dependency 地图
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
        {/* 主可视化区：分层索引图 */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label="Python Crash Course 第三版 20 章五阶段依赖地图，点击阶段高亮或选择症状查看回退路径"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.primary}>
            五阶段分层索引 · foundation → contract → realtime → pipeline → release
          </text>
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize={11} fill={C.secondary}>
            左侧点阶段高亮该阶段章节；下方选症状看最小回退路径
          </text>

          {/* 阶段标签列（可点击） */}
          {PHASES.map((p, i) => {
            const cy = ROW_Y[i];
            const active = selectedPhase === p.id;
            return (
              <g
                key={`phase-${p.id}`}
                onClick={() => selectPhase(p.id)}
                style={{ cursor: "pointer" }}
              >
                <rect x={6} y={cy - 20} width={104} height={40} fill="transparent" />
                <text x={14} y={cy - 4} fontSize={12} fontWeight={700} fill={active ? C.accent : C.primary}>
                  {p.label}
                </text>
                <text x={14} y={cy + 11} fontSize={11} fill={active ? C.accent : C.secondary}>
                  {p.range} {p.name}
                </text>
              </g>
            );
          })}

          {/* 章节点 */}
          {CHAPTERS.map((ch) => {
            const { x, y } = nodeTopLeft(ch.num);
            const { cx, cy } = nodeCenter(ch.num);
            const st = nodeState(ch.num);
            const opacity = st === "dim" ? 0.3 : 1;
            const accentColor = wrongPath ? C.danger : C.accent;
            const borderColor = st === "active" ? accentColor : C.border;
            const fillColor = st === "active" ? accentColor : C.elevated;
            const fillOpacity = st === "active" ? 0.16 : 1;
            const strokeW = st === "active" ? 1.8 : 1;
            return (
              <g key={`chapter-${ch.num}`} opacity={opacity}>
                <rect
                  x={x}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={5}
                  fill={fillColor}
                  fillOpacity={fillOpacity}
                  stroke={borderColor}
                  strokeWidth={strokeW}
                />
                <text x={cx} y={cy - 3} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.primary}>
                  Ch{ch.num}
                </text>
                <text
                  x={cx}
                  y={cy + 12}
                  textAnchor="middle"
                  fontSize={11}
                  fill={st === "active" ? C.primary : C.secondary}
                >
                  {ch.short}
                </text>
              </g>
            );
          })}

          {/* 回退箭头链（症状选中时） */}
          {chain && chain.length >= 2 && (
            <g key="fallback-arrows">
              {chain.slice(0, -1).map((fromNum, i) => {
                const toNum = chain[i + 1];
                const a = arrowBetween(fromNum, toNum);
                const color = wrongPath ? C.danger : C.accent;
                return (
                  <g key={`arrow-${i}`}>
                    <path
                      d={a.path}
                      fill="none"
                      stroke={color}
                      strokeWidth={2}
                      strokeDasharray={wrongPath ? "5 3" : "none"}
                    />
                    <ArrowHead ex={a.endX} ey={a.endY} tanX={a.tanX} tanY={a.tanY} color={color} />
                  </g>
                );
              })}
            </g>
          )}
        </svg>

        {/* 操作按钮行 */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {PHASES.map((p) => {
            const active = selectedPhase === p.id;
            return (
              <button
                key={p.id}
                onClick={() => selectPhase(p.id)}
                className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active ? "border-accent bg-accent/10" : "border-border hover:border-accent"
                }`}
                style={{ color: active ? C.accent : C.secondary }}
              >
                {p.label}
              </button>
            );
          })}
          <span className="mx-1 text-xs" style={{ color: C.secondary }}>
            症状：
          </span>
          {SYMPTOMS.map((s) => {
            const active = selectedSymptom === s.id;
            return (
              <button
                key={s.id}
                onClick={() => selectSymptom(s.id)}
                className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? wrongPath
                      ? "border-danger bg-danger/10"
                      : "border-accent bg-accent/10"
                    : "border-border hover:border-accent"
                }`}
                style={{ color: active ? (wrongPath ? C.danger : C.accent) : C.secondary }}
              >
                {s.label}
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
            注入故障：显示错误回退路径（红色虚线）
          </span>
        </label>
      </div>
    </div>
  );
}
