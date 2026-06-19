/**
 * <CompositionVsInheritanceDiagram>：「传统继承类爆炸」对比「Unity 组合按需拼装」的并排对比图
 * （HEL-279，《Unity 5 权威讲解》第2章 §3）。
 *
 * 左栏：传统面向对象继承——想要「会飞 + 会射击」的敌人，得为每种能力组合各造一个子类：
 *  Enemy → FlyingEnemy / ShootingEnemy → FlyingShootingEnemy……
 *  能力一多，子类数量指数膨胀（组合爆炸），且代码无法复用。
 *
 * 右栏：Unity 组合优于继承——只有一个 GameObject，能力做成可勾选的组件清单
 *  {Fly? / Shoot?}，要哪个本事就勾哪个组件，自由拼装，不再造子类。
 *
 * 两栏由中缝分隔，左右各自成块、互不重叠（svg-check：任意两 rect 重叠 <30%）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。所有 <text> 距 viewBox 任意边 ≥14px。
 */

const VIEW_W = 700;
const VIEW_H = 440;

const PAD = 18;
const MID = VIEW_W / 2; // 中缝 x

// 左右两栏的内容区。
const COL_GAP = 24; // 中缝两侧各留半个间隙
const LEFT_X = PAD;
const LEFT_W = MID - COL_GAP / 2 - LEFT_X;
const RIGHT_X = MID + COL_GAP / 2;
const RIGHT_W = VIEW_W - PAD - RIGHT_X;

// 继承树节点尺寸。
const NODE_H = 38;

// 一个类盒（左栏继承树用）。
type ClassNode = {
  x: number;
  y: number;
  w: number;
  label: string;
  bad?: boolean; // 组合爆炸出来的「累赘」子类，用 danger 强调
};

export function CompositionVsInheritanceDiagram() {
  // —— 左栏：继承树坐标（三层）——
  const treeTop = 96;
  const rootW = 132;
  const rootX = LEFT_X + (LEFT_W - rootW) / 2;

  // 第二层两类：FlyingEnemy / ShootingEnemy。
  const midY = treeTop + NODE_H + 34;
  const midW = 132;
  const midGap = 16;
  const midTotalW = midW * 2 + midGap;
  const midStartX = LEFT_X + (LEFT_W - midTotalW) / 2;
  const midXs = [midStartX, midStartX + midW + midGap];

  // 第三层组合爆炸：FlyingShootingEnemy（+ 省略号暗示更多）。
  const botY = midY + NODE_H + 34;
  const botW = 168;
  const botX = LEFT_X + (LEFT_W - botW) / 2;

  const leftNodes: readonly ClassNode[] = [
    { x: rootX, y: treeTop, w: rootW, label: "Enemy" },
    { x: midXs[0], y: midY, w: midW, label: "FlyingEnemy" },
    { x: midXs[1], y: midY, w: midW, label: "ShootingEnemy" },
    { x: botX, y: botY, w: botW, label: "FlyingShootingEnemy", bad: true },
  ];

  // 连线：root→两子；两子→底部合流类。
  const cx = (n: ClassNode) => n.x + n.w / 2;
  const root = leftNodes[0];
  const flying = leftNodes[1];
  const shooting = leftNodes[2];
  const combo = leftNodes[3];

  // —— 右栏：一个 GameObject + 可勾选组件清单 ——
  const goTop = 96;
  const goW = RIGHT_W;
  const goH = NODE_H;

  // 组件清单（勾选项）。前两项勾上 = 当前这个对象「会飞 + 会射击」。
  type Toggle = { label: string; note: string; on: boolean };
  const toggles: readonly Toggle[] = [
    { label: "FlyMovement", note: "会飞", on: true },
    { label: "Shooter", note: "会射击", on: true },
    { label: "Health", note: "有血量", on: false },
    { label: "PatrolAI", note: "会巡逻", on: false },
  ];
  const toggleTop = goTop + goH + 24;
  const toggleH = 40;
  const toggleGap = 10;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="传统继承与 Unity 组合的并排对比图。左栏是传统面向对象继承：顶层是 Enemy 类，往下派生出 FlyingEnemy 会飞的敌人和 ShootingEnemy 会射击的敌人两个子类；当你想要一个既会飞又会射击的敌人时，只能再造一个 FlyingShootingEnemy 子类把两条能力合进来。能力种类一多，需要的子类数量就指数膨胀，这叫组合爆炸，而且每个子类的代码很难复用。右栏是 Unity 的组合优于继承：只有一个 GameObject，能力被拆成一张张可勾选的组件，比如 FlyMovement 会飞、Shooter 会射击、Health 有血量、PatrolAI 会巡逻；要哪种本事就勾上哪个组件，自由拼装，永远不用再为能力组合去造新的子类。左右两栏由中缝分隔，各自独立。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={LEFT_X + LEFT_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--danger)"
          >
            传统继承：能力一多，子类就爆炸
          </text>
          <text
            x={RIGHT_X + RIGHT_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--success)"
          >
            Unity 组合：要啥本事就挂啥组件
          </text>

          {/* 副标 */}
          <text
            x={LEFT_X + LEFT_W / 2}
            y={54}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            每种能力组合都得新造一个子类
          </text>
          <text
            x={RIGHT_X + RIGHT_W / 2}
            y={54}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            一个 GameObject，按需勾选组件
          </text>

          {/* 中缝分隔线 */}
          <line
            x1={MID}
            y1={70}
            x2={MID}
            y2={VIEW_H - PAD}
            stroke="var(--border)"
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />

          {/* ===== 左栏：继承连线（先画，置于盒下） ===== */}
          {/* root → flying / shooting */}
          <line
            x1={cx(root)}
            y1={root.y + NODE_H}
            x2={cx(flying)}
            y2={flying.y}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            strokeOpacity="0.6"
          />
          <line
            x1={cx(root)}
            y1={root.y + NODE_H}
            x2={cx(shooting)}
            y2={shooting.y}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            strokeOpacity="0.6"
          />
          {/* flying / shooting → combo（两条能力被迫合进一个子类） */}
          <line
            x1={cx(flying)}
            y1={flying.y + NODE_H}
            x2={cx(combo)}
            y2={combo.y}
            stroke="var(--danger)"
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />
          <line
            x1={cx(shooting)}
            y1={shooting.y + NODE_H}
            x2={cx(combo)}
            y2={combo.y}
            stroke="var(--danger)"
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />

          {/* ===== 左栏：类盒 ===== */}
          {leftNodes.map((n) => (
            <g key={n.label}>
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={NODE_H}
                rx="7"
                fill={n.bad ? "var(--danger)" : "var(--text-secondary)"}
                fillOpacity={n.bad ? 0.16 : 0.08}
                stroke={n.bad ? "var(--danger)" : "var(--text-secondary)"}
                strokeWidth="1.4"
                strokeOpacity={n.bad ? 1 : 0.6}
              />
              <text
                x={n.x + n.w / 2}
                y={n.y + NODE_H / 2 + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {n.label}
              </text>
            </g>
          ))}

          {/* 组合爆炸提示（底部，danger） */}
          <text
            x={LEFT_X + LEFT_W / 2}
            y={botY + NODE_H + 34}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            再加「会潜水」「会隐身」……
          </text>
          <text
            x={LEFT_X + LEFT_W / 2}
            y={botY + NODE_H + 52}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            子类数量 2ⁿ 指数膨胀
          </text>

          {/* ===== 右栏：一个 GameObject 盒 ===== */}
          <rect
            x={RIGHT_X}
            y={goTop}
            width={goW}
            height={goH}
            rx="7"
            fill="var(--accent)"
            fillOpacity="0.14"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={RIGHT_X + goW / 2}
            y={goTop + goH / 2 + 4}
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一个 GameObject（演员）
          </text>

          {/* 右栏：可勾选组件清单 */}
          {toggles.map((t, i) => {
            const y = toggleTop + i * (toggleH + toggleGap);
            const accent = t.on ? "var(--success)" : "var(--text-secondary)";
            return (
              <g key={t.label}>
                <rect
                  x={RIGHT_X}
                  y={y}
                  width={goW}
                  height={toggleH}
                  rx="7"
                  fill={accent}
                  fillOpacity={t.on ? 0.14 : 0.05}
                  stroke={accent}
                  strokeWidth="1.4"
                  strokeOpacity={t.on ? 1 : 0.45}
                />
                {/* 勾选框 */}
                <rect
                  x={RIGHT_X + 12}
                  y={y + toggleH / 2 - 9}
                  width="18"
                  height="18"
                  rx="4"
                  fill={t.on ? accent : "var(--bg)"}
                  fillOpacity={t.on ? 0.9 : 1}
                  stroke={accent}
                  strokeWidth="1.4"
                />
                {t.on && (
                  <path
                    d={`M ${RIGHT_X + 16} ${y + toggleH / 2} l 3.5 3.5 l 6 -7`}
                    fill="none"
                    stroke="var(--bg)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                <text
                  x={RIGHT_X + 40}
                  y={y + toggleH / 2 - 2}
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {t.label}
                </text>
                <text
                  x={RIGHT_X + 40}
                  y={y + toggleH / 2 + 13}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {t.note}
                </text>
                <text
                  x={RIGHT_X + goW - 12}
                  y={y + toggleH / 2 + 4}
                  textAnchor="end"
                  fontSize="11"
                  fontWeight="600"
                  fill={accent}
                >
                  {t.on ? "已挂" : "没挂"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        想要「会飞 + 会射击」的敌人：传统继承得专门造一个 FlyingShootingEnemy
        子类，能力一多子类就 2ⁿ 爆炸；Unity 只有一个 GameObject，勾上
        FlyMovement 和 Shooter 两个组件就行——这就是「组合优于继承」。
      </figcaption>
    </figure>
  );
}
