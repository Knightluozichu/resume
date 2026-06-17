"use client";

/**
 * <EventConditionDiagram>：辅图——「碰撞/触发事件能否触发 + 走哪套回调」判定流（静态图，HEL-285）。
 *
 * 用一条清晰的纵向决策流替代吓人的全 9×9 碰撞矩阵（少文字原则）。三个判定关卡：
 *  ① 两物体都有 Collider 吗？ —— 否 → 啥都不触发。
 *  ② 至少一个有 Rigidbody 吗？（两个都是静态碰撞器则否）—— 否 → 啥都不触发。
 *  ③ 任一 Collider 勾了 isTrigger 吗？ —— 是 → 走 OnTrigger* 回调（不阻挡，参数 Collider other）；
 *                                        否 → 走 OnCollision* 回调（会阻挡，参数 Collision c）。
 *
 * 纯静态展示组件（无 anime、无交互），与本章其它图统一外观（卡片 + figcaption）。
 * 无 Math 算坐标（全整数常量）。视觉：全部 DESIGN token；无裸 hex（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；节点互不重叠、连线不穿字。
 */

const VIEW_W = 600;
// VIEW_H=476：最低内容是底部两个结果框底 452，下留 24px。纵向利用率 ~89%。
const VIEW_H = 476;

// 主干居中 x。
const CX = VIEW_W / 2;
// 判定框尺寸（菱形用矩形+圆角近似，配文字）。
const Q_W = 300;
const Q_H = 52;
// 三个判定关卡的 y（框顶）。
const Q1_Y = 70;
const Q2_Y = 168;
const Q3_Y = 266;

// 结果框尺寸。
const R_W = 218;
const R_H = 64;
// 底部两个结果框（左 = OnTrigger*，右 = OnCollision*）。
const RESULT_Y = 388;
const TRIG_X = 28; // 左结果框左缘
const COL_X = VIEW_W - 28 - R_W; // 右结果框左缘

// 右侧「否 → 啥都不触发」的小结果（贴判定①②右侧）。
const NONE_W = 132;
const NONE_X = VIEW_W - 14 - NONE_W; // 右缘距边 14px
const NONE1_Y = Q1_Y - 6;
const NONE2_Y = Q2_Y - 6;
const NONE_H = 40;

export function EventConditionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="碰撞和触发事件能否触发、走哪套回调的判定流程图。从上往下三个判定关卡。第一关：两个物体都有 Collider 吗？如果否，啥都不触发。如果是，进入第二关：两个物体里至少一个有 Rigidbody 吗？如果两个都是静态碰撞器、都没有 Rigidbody，那么否，啥都不触发。如果是，进入第三关：任意一个 Collider 勾了 isTrigger 吗？如果是，走 OnTrigger 系列回调 OnTriggerEnter、Stay、Exit，不阻挡、参数是 Collider other。如果否，走 OnCollision 系列回调 OnCollisionEnter、Stay、Exit，会物理阻挡、参数是 Collision c。这是用清晰的决策流替代复杂的碰撞矩阵。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={CX}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            事件能不能触发？走哪套回调？三关判定
          </text>
          <text
            x={CX}
            y={48}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            不用背 9×9 碰撞矩阵，顺着这条决策流走一遍就清楚
          </text>

          {/* ===== 连线（主干 + 分叉）：先画线再画框，框盖住线头 ===== */}
          {/* ① → ②（是） */}
          <line
            x1={CX}
            y1={Q1_Y + Q_H}
            x2={CX}
            y2={Q2_Y}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#ec-arrow)"
          />
          {/* ② → ③（是） */}
          <line
            x1={CX}
            y1={Q2_Y + Q_H}
            x2={CX}
            y2={Q3_Y}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#ec-arrow)"
          />
          {/* ③ → 左结果（是·走 Trigger）：折线到左 */}
          <polyline
            points={`${CX - 60},${Q3_Y + Q_H} ${CX - 60},${RESULT_Y - 18} ${TRIG_X + R_W / 2},${RESULT_Y - 18} ${TRIG_X + R_W / 2},${RESULT_Y}`}
            fill="none"
            stroke="var(--success)"
            strokeWidth="1.8"
            markerEnd="url(#ec-arrow-success)"
          />
          {/* ③ → 右结果（否·走 Collision）：折线到右 */}
          <polyline
            points={`${CX + 60},${Q3_Y + Q_H} ${CX + 60},${RESULT_Y - 18} ${COL_X + R_W / 2},${RESULT_Y - 18} ${COL_X + R_W / 2},${RESULT_Y}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
            markerEnd="url(#ec-arrow-accent)"
          />
          {/* ① → 右「啥都不触发」（否） */}
          <line
            x1={CX + Q_W / 2}
            y1={Q1_Y + Q_H / 2}
            x2={NONE_X}
            y2={NONE1_Y + NONE_H / 2}
            stroke="var(--danger)"
            strokeWidth="1.6"
            markerEnd="url(#ec-arrow-danger)"
          />
          {/* ② → 右「啥都不触发」（否） */}
          <line
            x1={CX + Q_W / 2}
            y1={Q2_Y + Q_H / 2}
            x2={NONE_X}
            y2={NONE2_Y + NONE_H / 2}
            stroke="var(--danger)"
            strokeWidth="1.6"
            markerEnd="url(#ec-arrow-danger)"
          />

          {/* ===== 判定① ===== */}
          <rect
            x={CX - Q_W / 2}
            y={Q1_Y}
            width={Q_W}
            height={Q_H}
            rx="9"
            fill="var(--text-secondary)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1.6"
          />
          <text
            x={CX}
            y={Q1_Y + 21}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ① 两个物体都挂了 Collider 吗？
          </text>
          <text
            x={CX}
            y={Q1_Y + 39}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            缺一个碰撞器 → 引擎无从判断接触
          </text>
          {/* ① 是/否 标 */}
          <text
            x={CX + 10}
            y={Q1_Y + Q_H + 16}
            textAnchor="start"
            fontSize="10"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            是 ↓
          </text>

          {/* ===== 判定② ===== */}
          <rect
            x={CX - Q_W / 2}
            y={Q2_Y}
            width={Q_W}
            height={Q_H}
            rx="9"
            fill="var(--text-secondary)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1.6"
          />
          <text
            x={CX}
            y={Q2_Y + 21}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ② 至少一个有 Rigidbody 吗？
          </text>
          <text
            x={CX}
            y={Q2_Y + 39}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            两个都是静态碰撞器（都没 rb）→ 引擎不为它俩算
          </text>
          <text
            x={CX + 10}
            y={Q2_Y + Q_H + 16}
            textAnchor="start"
            fontSize="10"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            是 ↓
          </text>

          {/* ===== 判定③ ===== */}
          <rect
            x={CX - Q_W / 2}
            y={Q3_Y}
            width={Q_W}
            height={Q_H}
            rx="9"
            fill="var(--text-secondary)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1.6"
          />
          <text
            x={CX}
            y={Q3_Y + 21}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ③ 任一 Collider 勾了 isTrigger 吗？
          </text>
          <text
            x={CX}
            y={Q3_Y + 39}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            勾了走触发回调，没勾走碰撞回调
          </text>
          {/* ③ 分叉 是/否 标 */}
          <text
            x={CX - 66}
            y={Q3_Y + Q_H + 16}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--success)"
          >
            是
          </text>
          <text
            x={CX + 66}
            y={Q3_Y + Q_H + 16}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--accent)"
          >
            否
          </text>

          {/* ===== 左结果：走 OnTrigger* ===== */}
          <rect
            x={TRIG_X}
            y={RESULT_Y}
            width={R_W}
            height={R_H}
            rx="9"
            fill="var(--success)"
            fillOpacity="0.1"
            stroke="var(--success)"
            strokeWidth="1.8"
          />
          <text
            x={TRIG_X + R_W / 2}
            y={RESULT_Y + 22}
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
          >
            OnTrigger Enter/Stay/Exit
          </text>
          <text
            x={TRIG_X + R_W / 2}
            y={RESULT_Y + 40}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            不阻挡（能穿过）
          </text>
          <text
            x={TRIG_X + R_W / 2}
            y={RESULT_Y + 55}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            参数：Collider other
          </text>

          {/* ===== 右结果：走 OnCollision* ===== */}
          <rect
            x={COL_X}
            y={RESULT_Y}
            width={R_W}
            height={R_H}
            rx="9"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <text
            x={COL_X + R_W / 2}
            y={RESULT_Y + 22}
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            OnCollision Enter/Stay/Exit
          </text>
          <text
            x={COL_X + R_W / 2}
            y={RESULT_Y + 40}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            会物理阻挡（撞上停 / 弹）
          </text>
          <text
            x={COL_X + R_W / 2}
            y={RESULT_Y + 55}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            参数：Collision c
          </text>

          {/* ===== 右上「否 → 啥都不触发」（①②共用语义，画两个小框） ===== */}
          <rect
            x={NONE_X}
            y={NONE1_Y}
            width={NONE_W}
            height={NONE_H}
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.1"
            stroke="var(--danger)"
            strokeWidth="1.6"
          />
          <text
            x={NONE_X + NONE_W / 2}
            y={NONE1_Y + 17}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--danger)"
          >
            否 → 啥都不触发
          </text>
          <text
            x={NONE_X + NONE_W / 2}
            y={NONE1_Y + 31}
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--text-secondary)"
          >
            缺 Collider
          </text>

          <rect
            x={NONE_X}
            y={NONE2_Y}
            width={NONE_W}
            height={NONE_H}
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.1"
            stroke="var(--danger)"
            strokeWidth="1.6"
          />
          <text
            x={NONE_X + NONE_W / 2}
            y={NONE2_Y + 17}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--danger)"
          >
            否 → 啥都不触发
          </text>
          <text
            x={NONE_X + NONE_W / 2}
            y={NONE2_Y + 31}
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--text-secondary)"
          >
            两边都无 Rigidbody
          </text>

          <defs>
            <marker
              id="ec-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="ec-arrow-success"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker
              id="ec-arrow-accent"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="ec-arrow-danger"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--danger)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        想让事件触发：两边都得有 Collider，且至少一个有
        Rigidbody；满足后，任一勾了 isTrigger 就走 `OnTrigger*`（不挡、参数
        Collider），否则走 `OnCollision*`（会挡、参数 Collision）。两边都没
        Rigidbody → 引擎不为它俩算，啥都不触发。
      </figcaption>
    </figure>
  );
}
