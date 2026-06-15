/**
 * <WorkManagerDiagram />：《Android 编程权威指南》background-network/workmanager 章
 * 「WorkManager 可靠后台任务生命周期」配图（HEL-196）。
 *
 * 画面内容：自上而下五段任务流水线（每段一张圆角卡片 + 向下箭头），右侧挂注解：
 *  ① 定义 Worker（accent 色）：继承 Worker / CoroutineWorker，重写 doWork() 返回
 *     Result.success / retry / failure。
 *  ② 构建 WorkRequest（accent 色）：OneTimeWorkRequest / PeriodicWorkRequest，并 setConstraints
 *     设约束——约束四件套用 warning 色小标签挂在本段下方：需联网 / 充电中 / 设备空闲 / 电量充足。
 *  ③ WorkManager.enqueue 入队（accent 色）：把请求交给 WorkManager。
 *  ④ 约束满足时调度执行（success 色）：进程被杀 / 设备重启后仍保证最终执行——任务持久化到内部 DB。
 *  ⑤ 可链式（success 色）：beginWith(A).then(B).then(C).enqueue —— WorkContinuation 顺序 / 并行。
 *  右侧三条系统注解：可延迟但保证执行、尊重系统省电(Doze)、底层据 API 级别选 JobScheduler/AlarmManager。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（Worker/请求/入队 --accent、约束 --warning、执行/链式 --success、
 * text-primary / text-secondary / border / bg），无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 五段流水线节点：title = 阶段名；sub = 一句话职责；color = 语义色 token。 ——
type Stage = {
  /** 阶段序号 + 名（① 定义 Worker …）。 */
  title: string;
  /** 副标题：对应 API 形态。 */
  sub: string;
  /** 职责说明（多行）。 */
  notes: readonly string[];
  /** 语义色 token。 */
  color: string;
};

const STAGES: readonly Stage[] = [
  {
    title: "① 定义 Worker",
    sub: "继承 Worker / CoroutineWorker",
    notes: [
      "重写 doWork()：写后台逻辑",
      "返回 Result.success / retry / failure",
    ],
    color: "var(--accent)",
  },
  {
    title: "② 构建 WorkRequest + 约束",
    sub: "OneTimeWorkRequest / PeriodicWorkRequest",
    notes: [
      "setConstraints 设约束（见下方四件套）",
      "可设 setInitialDelay / 退避策略",
    ],
    color: "var(--accent)",
  },
  {
    title: "③ WorkManager.enqueue 入队",
    sub: "WorkManager.getInstance(ctx).enqueue(req)",
    notes: ["把请求交给 WorkManager 统一调度"],
    color: "var(--accent)",
  },
  {
    title: "④ 约束满足时调度执行",
    sub: "持久化到内部 DB，保证最终执行",
    notes: [
      "约束都满足才跑 doWork()",
      "进程被杀 / 设备重启后仍自动恢复重跑",
    ],
    color: "var(--success)",
  },
  {
    title: "⑤ 可链式：WorkContinuation",
    sub: "beginWith(A).then(B).then(C).enqueue()",
    notes: ["多个 Worker 顺序 / 并行编排", "前一段输出可作后一段输入"],
    color: "var(--success)",
  },
];

// —— 约束四件套（挂在 ② 节点下方的 warning 小标签）。 ——
const CONSTRAINTS: readonly string[] = ["需联网", "充电中", "设备空闲", "电量充足"];

// —— 右侧系统注解三条。 ——
const SYSTEM_NOTES: readonly string[] = [
  "可延迟但保证执行：不抢即时性，换可靠性",
  "尊重系统省电（Doze）：低电 / 待机时顺延",
  "底层据 API 级别自动选 JobScheduler / AlarmManager",
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const STAGE_X = 24; // 流水线卡片左边距
const STAGE_W = 360; // 流水线卡片宽
const STAGE_H = 72; // 流水线卡片高
const STAGE_GAP = 44; // 卡片竖向间距（容纳向下箭头）
const TOP = 64; // 第一段顶部 y（标题留白）

// 约束小标签（挂在 ② 卡片与 ③ 卡片之间的箭头旁）。
const TAG_W = 64; // 约束标签宽
const TAG_H = 20; // 约束标签高
const TAG_GAP = 8; // 约束标签间距

const ARROW = 5; // 箭头三角半高

// 右侧系统注解栏。
const NOTE_X = STAGE_X + STAGE_W + 48; // 注解卡片左边距
const NOTE_W = 304; // 注解卡片宽
const NOTE_H = 64; // 注解卡片高
const NOTE_GAP = 16; // 注解卡片间距

const VIEW_W = 760;

/** 第 i 段卡片的顶部 y。 */
function stageTop(i: number): number {
  return TOP + i * (STAGE_H + STAGE_GAP);
}

export function WorkManagerDiagram() {
  // ② 卡片与 ③ 卡片之间的箭头中段 y（约束标签挂在这里）。
  const tagBandY = stageTop(1) + STAGE_H + (STAGE_GAP - TAG_H) / 2;
  const constraintTotalW =
    CONSTRAINTS.length * TAG_W + (CONSTRAINTS.length - 1) * TAG_GAP;
  const constraintStartX = STAGE_X + STAGE_W / 2 - constraintTotalW / 2;

  // 整图高度：五段流水线 + 收尾留白，与右侧注解栏取大者。
  const flowBottom = stageTop(STAGES.length - 1) + STAGE_H + 40;
  const noteBottom =
    TOP + SYSTEM_NOTES.length * NOTE_H + (SYSTEM_NOTES.length - 1) * NOTE_GAP + 24;
  const viewH = Math.max(flowBottom, noteBottom);

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${viewH}`}
          role="img"
          aria-label="WorkManager 可靠后台任务生命周期流程图。左侧是一条自上而下的五段流水线，每段一张圆角卡片，并用语义色区分性质：第一段「定义 Worker」用品牌紫，做法是继承 Worker 或 CoroutineWorker，重写 doWork() 写后台逻辑，并返回 Result.success、Result.retry 或 Result.failure；箭头向下到第二段「构建 WorkRequest 并设约束」，同样用品牌紫，可选 OneTimeWorkRequest 或 PeriodicWorkRequest，通过 setConstraints 设置约束、可设初始延迟与退避策略，约束有四件套，用黄色小标签挂在本段下方：需联网、充电中、设备空闲、电量充足；箭头向下到第三段「WorkManager.enqueue 入队」，品牌紫，把请求交给 WorkManager 统一调度；箭头向下到第四段「约束满足时调度执行」，用绿色，只有约束全部满足才运行 doWork()，任务持久化到内部数据库，即使进程被杀或设备重启也会自动恢复重跑、保证最终执行；箭头向下到第五段「可链式」，绿色，用 beginWith(A).then(B).then(C).enqueue() 把多个 Worker 顺序或并行编排成 WorkContinuation，前一段的输出可作为后一段的输入。右侧另有三条系统注解：WorkManager 可延迟但保证执行，不抢即时性、换可靠性；它尊重系统省电的 Doze 机制，低电或待机时会顺延；底层会根据 API 级别自动在 JobScheduler 与 AlarmManager 之间选择实现。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* —— 标题 —— */}
          <text
            x={STAGE_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            WorkManager 生命周期：定义 → 约束 → 入队 → 保证执行 → 链式
          </text>
          <text
            x={STAGE_X}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            把「保证最终执行」交给系统：进程被杀 / 重启都不丢任务
          </text>

          {/* —— 段间向下箭头（画在卡片下层）—— */}
          {STAGES.slice(0, -1).map((s, i) => {
            const x = STAGE_X + STAGE_W / 2;
            const fromBottom = stageTop(i) + STAGE_H;
            const toTop = stageTop(i + 1);
            return (
              <g key={`arrow-${s.title}`}>
                <line
                  x1={x}
                  y1={fromBottom}
                  x2={x}
                  y2={toTop - ARROW}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.6"
                />
                <path
                  d={`M ${x} ${toTop}
                      l -${ARROW} -${ARROW * 1.6}
                      l ${ARROW * 2} 0 Z`}
                  fill="var(--text-secondary)"
                />
              </g>
            );
          })}

          {/* —— 约束四件套小标签（挂在 ② → ③ 箭头旁）—— */}
          <text
            x={constraintStartX}
            y={tagBandY - 6}
            fontSize="9.5"
            fontWeight="600"
            fill="var(--warning)"
          >
            约束 Constraints（都满足才执行）：
          </text>
          {CONSTRAINTS.map((c, i) => {
            const x = constraintStartX + i * (TAG_W + TAG_GAP);
            return (
              <g key={c}>
                <rect
                  x={x}
                  y={tagBandY}
                  width={TAG_W}
                  height={TAG_H}
                  rx="4"
                  fill="var(--warning)"
                  fillOpacity="0.1"
                  stroke="var(--warning)"
                  strokeWidth="1"
                />
                <text
                  x={x + TAG_W / 2}
                  y={tagBandY + 14}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="var(--warning)"
                >
                  {c}
                </text>
              </g>
            );
          })}

          {/* —— 五段流水线卡片 —— */}
          {STAGES.map((s, i) => {
            const y = stageTop(i);
            return (
              <g key={s.title}>
                <rect
                  x={STAGE_X}
                  y={y}
                  width={STAGE_W}
                  height={STAGE_H}
                  rx="8"
                  fill={s.color}
                  fillOpacity="0.08"
                  stroke={s.color}
                  strokeWidth="1.4"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={STAGE_X}
                  y={y}
                  width="4"
                  height={STAGE_H}
                  rx="2"
                  fill={s.color}
                />
                {/* 阶段名 */}
                <text
                  x={STAGE_X + 16}
                  y={y + 22}
                  fontSize="12.5"
                  fontWeight="700"
                  fill={s.color}
                >
                  {s.title}
                </text>
                {/* 副标题（API 形态） */}
                <text
                  x={STAGE_X + 16}
                  y={y + 38}
                  fontSize="9.5"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {s.sub}
                </text>
                {/* 职责说明（多行） */}
                {s.notes.map((n, j) => (
                  <text
                    key={n}
                    x={STAGE_X + 16}
                    y={y + 54 + j * 13}
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    {n}
                  </text>
                ))}
              </g>
            );
          })}

          {/* —— 右侧系统注解三条 —— */}
          <text
            x={NOTE_X}
            y={TOP - 16}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            WorkManager 的脾气
          </text>
          {SYSTEM_NOTES.map((note, i) => {
            const y = TOP + i * (NOTE_H + NOTE_GAP);
            // 注解文本按 ≈ 每行 16 字软折行（避免溢出卡片）。
            const lines: string[] = [];
            let rest = note;
            const MAX = 16;
            while (rest.length > MAX) {
              lines.push(rest.slice(0, MAX));
              rest = rest.slice(MAX);
            }
            lines.push(rest);
            return (
              <g key={note}>
                <rect
                  x={NOTE_X}
                  y={y}
                  width={NOTE_W}
                  height={NOTE_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                {/* 左侧 accent 提示条 */}
                <rect
                  x={NOTE_X}
                  y={y}
                  width="4"
                  height={NOTE_H}
                  rx="2"
                  fill="var(--accent)"
                />
                {lines.map((line, j) => (
                  <text
                    key={line}
                    x={NOTE_X + 16}
                    y={y + 24 + j * 16}
                    fontSize="10"
                    fontWeight={j === 0 ? "600" : "400"}
                    fill={j === 0 ? "var(--text-primary)" : "var(--text-secondary)"}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        WorkManager 把「可靠后台任务」拆成五步：定义 <code>Worker</code>（重写
        <code> doWork()</code> 返 <code>Result</code>）→ 构建{" "}
        <code>WorkRequest</code> 并设约束（联网 / 充电 / 空闲 / 电量）→{" "}
        <code>enqueue</code> 入队 → 约束满足时调度执行（持久化到 DB，进程被杀 /
        重启都保证最终执行）→ 可用 <code>beginWith().then()</code> 链式编排。它换的是
        可靠性而非即时性，并尊重系统省电（Doze）。
      </figcaption>
    </figure>
  );
}
