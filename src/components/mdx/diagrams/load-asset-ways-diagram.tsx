/**
 * <LoadAssetWaysDiagram>：辅图（示意 / 对照，静态）——「拿到资源 / 对象的三条路」（HEL-289）。
 *
 * 三列并排，对照运行时 / 编辑期拿到资源或对象的三种方式：
 *  ① Inspector 拖引用（编辑期就绑好，最推荐）。
 *  ② Instantiate 预制体（运行时按模板造实例）。
 *  ③ Resources.Load("路径")（运行时按路径加载 Resources/ 下的资源，标「慎用」）。
 * 每列标清各自适用场景与取舍。
 *
 * 纯静态对照图（无 anime，无可交互徽章）。所有坐标整数常量；token-only 无裸 hex；
 * 所有 <text> 距 viewBox 任意边 ≥20px；三列等宽互不重叠。
 */

const VIEW_W = 736;
// VIEW_H=388：列内最后一行基线 264（≤300），底部说明基线 364（距底边 24px，≥20）；bbox 底 ~367，距底边 ~21px。
// 纵向利用率 ~85%。
const VIEW_H = 388;

// ── 三列（等宽、整数坐标） ──
const COL_Y = 72;
const COL_H = 236;
const COL_W = 212;
const COL_GAP = 18;
const C1_X = 28; // Inspector 拖引用（右边距：28 + 212*3 + 18*2 = 700，右留 36px ≥24）
const C2_X = C1_X + COL_W + COL_GAP; // 258
const C3_X = C2_X + COL_W + COL_GAP; // 488

const cols = [
  {
    key: "drag",
    x: C1_X,
    badge: "① 最推荐",
    badgeFill: "var(--success)",
    title: "Inspector 拖引用",
    when: "编辑期就把对象绑好",
    code: "[SerializeField]\nGameObject prefab;",
    lines: [
      "编译期绑定，零运行时查找",
      "最快、最稳、最清晰",
      "见第 5 章「拖引用」",
    ],
    accent: "var(--accent)",
  },
  {
    key: "inst",
    x: C2_X,
    badge: "② 运行时造",
    badgeFill: "var(--accent)",
    title: "Instantiate 预制体",
    when: "运行时按模板造实例",
    code: "Instantiate(\n  prefab, pos, rot);",
    lines: [
      "生成子弹 / 敌人 / 特效",
      "复制源通常已拖引用绑好",
      "运行时不停造实例",
    ],
    accent: "var(--accent)",
  },
  {
    key: "load",
    x: C3_X,
    badge: "③ 慎用",
    badgeFill: "var(--warning)",
    title: 'Resources.Load("路径")',
    when: "运行时按路径加载",
    code: 'Resources.Load\n  ("Enemies/Slime");',
    lines: [
      "只能加载 Resources/ 下资源",
      "全进包、不能裁剪、拖慢启动",
      "官方建议少用，大资源用 AssetBundle",
    ],
    accent: "var(--warning)",
  },
];

export function LoadAssetWaysDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="拿到资源或对象的三条路对照图，三列并排。第一列，最推荐：在 Inspector 里拖引用，用 SerializeField 声明一个字段，在编辑期就把对象绑好。它是编译期绑定，零运行时查找，最快、最稳、最清晰，见第五章拖引用。第二列，运行时造实例：用 Instantiate 照预制体在运行时复制出新实例，常用来生成子弹、敌人、特效，它的复制源通常已经用拖引用绑好。第三列，慎用：用 Resources.Load 加路径字符串，在运行时按路径加载，只能加载 Resources 文件夹下的资源；缺点是全部进包、不能被裁剪、拖慢启动，官方建议少用，大资源应该用 AssetBundle。核心结论：优先在编辑期拖引用，运行时造实例用 Instantiate，Resources.Load 能不用就不用。"
          className="mx-auto block h-auto w-full max-w-[736px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            拿到资源 / 对象的三条路（按推荐程度排）
          </text>
          <text
            x={VIEW_W / 2}
            y={48}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            能在编辑期拖引用就别运行时查找；Resources.Load 慎用
          </text>

          {/* ============ 三列 ============ */}
          {cols.map((c) => {
            const cx = c.x + COL_W / 2;
            const codeLines = c.code.split("\n");
            return (
              <g key={c.key}>
                <rect
                  x={c.x}
                  y={COL_Y}
                  width={COL_W}
                  height={COL_H}
                  rx="12"
                  fill="var(--bg)"
                  stroke={c.accent}
                  strokeWidth="2"
                />
                {/* 徽标 */}
                <rect
                  x={c.x + 16}
                  y={COL_Y + 14}
                  width={84}
                  height={22}
                  rx="6"
                  fill={c.badgeFill}
                  fillOpacity="0.18"
                  stroke={c.badgeFill}
                  strokeWidth="1.2"
                />
                <text
                  x={c.x + 58}
                  y={COL_Y + 29}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill={c.badgeFill}
                >
                  {c.badge}
                </text>
                {/* 标题 */}
                <text
                  x={cx}
                  y={COL_Y + 60}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="700"
                  fill={c.accent}
                >
                  {c.title}
                </text>
                <text
                  x={cx}
                  y={COL_Y + 80}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {c.when}
                </text>
                {/* 代码片段框 */}
                <rect
                  x={c.x + 16}
                  y={COL_Y + 92}
                  width={COL_W - 32}
                  height={42}
                  rx="6"
                  fill="var(--bg-elevated)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                {codeLines.map((ln, j) => (
                  <text
                    key={`${c.key}-code-${j}`}
                    x={c.x + 26}
                    y={COL_Y + 110 + j * 16}
                    textAnchor="start"
                    fontSize="9"
                    fontFamily="var(--font-mono)"
                    fill="var(--text-primary)"
                  >
                    {ln}
                  </text>
                ))}
                {/* 要点（3 行） */}
                {c.lines.map((ln, j) => (
                  <text
                    key={`${c.key}-line-${j}`}
                    x={c.x + 16}
                    y={COL_Y + 156 + j * 18}
                    textAnchor="start"
                    fontSize="8.8"
                    fill="var(--text-secondary)"
                  >
                    · {ln}
                  </text>
                ))}
              </g>
            );
          })}

          {/* ===== 底部一句话点题（基线 364，距底边 24px） ===== */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 24}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            优先编辑期拖引用；运行时造实例用 Instantiate；Resources.Load
            能不用就不用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        拿到资源 / 对象有三条路：**① Inspector
        拖引用**（编辑期就绑好，最快最稳，**最推荐**）；**② Instantiate
        预制体**（运行时按模板造实例，生成子弹 / 敌人 / 特效）；**③
        `Resources.Load(「路径」)`**（运行时按路径加载 Resources/
        下的资源，但**全进包、不能裁剪、拖慢启动，慎用**——大资源用
        AssetBundle）。
      </figcaption>
    </figure>
  );
}
