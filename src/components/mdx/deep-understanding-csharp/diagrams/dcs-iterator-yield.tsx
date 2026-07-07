/**
 * <DcsIteratorYieldDiagram>：yield return 状态机原理。
 *
 * 上半：原始 yield return 代码与编译器生成的状态机对照。
 * 下半：MoveNext 调用时序——每次暂停/恢复的状态变化。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const STEP_W = 120;
const STEP_H = 56;
const STEP_Y = 280;
const stepX = (i: number) => 50 + i * (STEP_W + 20);

export function DcsIteratorYieldDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="迭代器与 yield 状态机原理。上半展示原始 yield return 代码被编译器转换为状态机。下半展示 MoveNext 四次调用的暂停-恢复时序：每次 yield return 产出一个值并暂停，下次 MoveNext 从暂停处继续。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            yield return 状态机原理
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            编译器把方法体拆成状态机 · MoveNext 驱动暂停-恢复
          </text>

          {/* 上半左：原始代码 */}
          <rect x={40} y={74} width={300} height={110} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={190} y={94} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            原始代码
          </text>
          <text x={56} y={114} fontSize="11" fill={primary} fontFamily="monospace">
            {"IEnumerable<int> Count()"}
          </text>
          <text x={56} y={130} fontSize="11" fill={primary} fontFamily="monospace">
            {"{"}
          </text>
          <text x={64} y={146} fontSize="11" fill={success} fontFamily="monospace">
            {"yield return 1;"}
          </text>
          <text x={64} y={162} fontSize="11" fill={success} fontFamily="monospace">
            {"yield return 2;"}
          </text>
          <text x={64} y={178} fontSize="11" fill={success} fontFamily="monospace">
            {"yield return 3;"}
          </text>

          {/* 转换箭头 */}
          <text x={360} y={120} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>
            编译器
          </text>
          <text x={360} y={136} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>
            转换
          </text>
          <line x1={345} y1={150} x2={375} y2={150} stroke={warning} strokeWidth="1.4" markerEnd="url(#dcs-it-arrow)" />

          {/* 上半右：状态机 */}
          <rect x={380} y={74} width={300} height={110} rx="8" fill={elevated} stroke={accent} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={530} y={94} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            编译器生成的状态机
          </text>
          <text x={396} y={114} fontSize="11" fill={primary} fontFamily="monospace">
            {"class StateMachine : IEnumerator<int>"}
          </text>
          <text x={396} y={130} fontSize="11" fill={secondary} fontFamily="monospace">
            {"  int _state;  // 当前位置"}
          </text>
          <text x={396} y={146} fontSize="11" fill={secondary} fontFamily="monospace">
            {"  int _current;  // 当前值"}
          </text>
          <text x={396} y={162} fontSize="11" fill={secondary} fontFamily="monospace">
            {"  bool MoveNext() {"}
          </text>
          <text x={396} y={178} fontSize="11" fill={secondary} fontFamily="monospace">
            {"    switch(_state) { ... } }"}
          </text>

          {/* 分隔线 */}
          <line x1={32} y1={210} x2={VIEW_W - 32} y2={210} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：MoveNext 时序 */}
          <text x={VIEW_W / 2} y={236} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            MoveNext 调用时序
          </text>

          {/* 四个步骤 */}
          {[
            { label: "MoveNext()", state: "_state=0", output: "yield 1", color: accent, desc: "产出 1，暂停" },
            { label: "MoveNext()", state: "_state=1", output: "yield 2", color: accent, desc: "产出 2，暂停" },
            { label: "MoveNext()", state: "_state=2", output: "yield 3", color: accent, desc: "产出 3，暂停" },
            { label: "MoveNext()", state: "_state=-2", output: "false", color: secondary, desc: "结束" },
          ].map((step, i) => {
            const x = stepX(i);
            return (
              <g key={i}>
                <rect x={x} y={STEP_Y} width={STEP_W} height={STEP_H} rx="6" fill={elevated} stroke={step.color} strokeWidth="1.4" strokeOpacity="0.4" />
                <text x={x + STEP_W / 2} y={STEP_Y + 16} textAnchor="middle" fontSize="11" fontWeight="700" fill={step.color} fontFamily="monospace">
                  {step.label}
                </text>
                <text x={x + STEP_W / 2} y={STEP_Y + 32} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
                  {step.state}
                </text>
                <text x={x + STEP_W / 2} y={STEP_Y + 46} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">
                  {step.output}
                </text>
                <text x={x + STEP_W / 2} y={STEP_Y + 68} textAnchor="middle" fontSize="10" fill={secondary}>
                  {step.desc}
                </text>
                {/* 步骤间箭头 */}
                {i < 3 && (
                  <line x1={x + STEP_W} y1={STEP_Y + STEP_H / 2} x2={x + STEP_W + 20} y2={STEP_Y + STEP_H / 2} stroke={border} strokeWidth="1.2" markerEnd="url(#dcs-it-arrow)" />
                )}
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={32} y1={376} x2={VIEW_W - 32} y2={376} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill={secondary}>
            延迟执行：调用时不执行方法体 · 只有 MoveNext 才逐步执行
          </text>
          <text x={VIEW_W / 2} y={410} textAnchor="middle" fontSize="11" fill={secondary}>
            局部变量提升为字段 · 与 async/await 状态机技术同源
          </text>

          <defs>
            <marker id="dcs-it-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        yield return 被编译器转换为状态机，MoveNext 驱动暂停-恢复。
      </figcaption>
    </figure>
  );
}
