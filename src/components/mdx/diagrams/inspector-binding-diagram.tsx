/**
 * <InspectorBindingDiagram>：[SerializeField] 字段在 Inspector 拖拽赋引用的静态对照图（HEL-282）。
 *
 * 数字片场隐喻——「提前把要用的道具指给演员」：脚本里声明一个空槽，开发者在 Inspector 里
 * 把场景中的某个对象「拖」进这个槽，运行前字段就已经被赋好值（比运行时用 Find 去找更优）。
 *
 * 左栏：脚本源码——`[SerializeField] private Transform target;` 字段（暴露到 Inspector）。
 * 右栏：Inspector 面板——出现一个名为「Target」的对象槽；一条拖拽箭头把场景里的对象拖进槽，
 *  槽被赋值（从空 None → 指向 Enemy）。
 * 底部对照条：拖引用（编辑器里点一下，零运行时开销、清晰）vs 代码 Find（运行时字符串查找、慢、易错）。
 *
 * 两栏由中缝分隔，各自成块、互不重叠（svg-check：任意两 rect 重叠 <30%）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。所有 <text> 距 viewBox 任意边 ≥14px。
 */

const VIEW_W = 700;
const VIEW_H = 430;

const PAD = 18;
const MID = VIEW_W / 2; // 中缝 x
const COL_GAP = 28; // 中缝两侧各留半个间隙
const LEFT_X = PAD;
const LEFT_W = MID - COL_GAP / 2 - LEFT_X;
const RIGHT_X = MID + COL_GAP / 2;
const RIGHT_W = VIEW_W - PAD - RIGHT_X;

// 底部对照条。
const CMP_Y = 330;
const CMP_H = 72;

export function InspectorBindingDiagram() {
  // —— 左栏：脚本框 ——
  const codeY = 92;
  const codeH = 200;

  // —— 右栏：Inspector 面板 ——
  const panelY = 92;
  const panelH = 200;
  // 字段槽（Target）。
  const slotX = RIGHT_X + 16;
  const slotW = RIGHT_W - 32;
  const slotY = panelY + 78;
  const slotH = 44;

  // 中缝偏左的「拖拽」箭头：从左栏字段名指向右栏的槽。
  const dragFromX = LEFT_X + LEFT_W - 12;
  const dragFromY = codeY + 120;
  const dragToX = slotX - 6;
  const dragToY = slotY + slotH / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="在 Inspector 里拖拽赋引用的对照图。左栏是脚本源码，里面有一个用 [SerializeField] 标注的私有字段 target，类型是 Transform，这个标注让私有字段也暴露到 Inspector 面板上。右栏是 Inspector 面板，面板上出现一个名为 Target 的对象槽，初始是空的，显示 None。一条拖拽箭头从左栏的字段指向右栏的槽，表示开发者把场景里的某个对象，比如名为 Enemy 的对象，直接拖进这个槽，于是字段就被赋好了引用，从 None 变成指向 Enemy，这一切发生在运行之前。底部是一条对照：左边拖引用，在编辑器里点一下就赋好、零运行时开销、清晰可见；右边代码里用 Find 查找，要在运行时按名字搜索整个场景、慢且找不到失活对象、容易写错名字。两栏由中缝分隔，各自独立、互不重叠。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={LEFT_X + LEFT_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            脚本里声明一个空槽
          </text>
          <text
            x={LEFT_X + LEFT_W / 2}
            y={52}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            [SerializeField] 让字段暴露到 Inspector
          </text>
          <text
            x={RIGHT_X + RIGHT_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            在 Inspector 里把对象拖进槽
          </text>
          <text
            x={RIGHT_X + RIGHT_W / 2}
            y={52}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            运行前字段就赋好引用
          </text>

          {/* 中缝分隔线 */}
          <line
            x1={MID}
            y1={68}
            x2={MID}
            y2={CMP_Y - 12}
            stroke="var(--border)"
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />

          {/* ===== 左栏：脚本框 ===== */}
          <rect
            x={LEFT_X}
            y={codeY}
            width={LEFT_W}
            height={codeH}
            rx="9"
            fill="var(--text-secondary)"
            fillOpacity="0.05"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={LEFT_X + 16}
            y={codeY + 30}
            fontSize="11.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            public class Chaser : MonoBehaviour
          </text>
          <text
            x={LEFT_X + 16}
            y={codeY + 50}
            fontSize="11.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            {"{"}
          </text>
          {/* 高亮这一行：[SerializeField] 字段 */}
          <rect
            x={LEFT_X + 10}
            y={codeY + 86}
            width={LEFT_W - 20}
            height={48}
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <text
            x={LEFT_X + 16}
            y={codeY + 106}
            fontSize="11.5"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            fill="var(--accent)"
          >
            [SerializeField]
          </text>
          <text
            x={LEFT_X + 16}
            y={codeY + 124}
            fontSize="11.5"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Transform target;
          </text>
          <text
            x={LEFT_X + 16}
            y={codeY + 168}
            fontSize="11.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            {"}"}
          </text>
          <text
            x={LEFT_X + 16}
            y={codeY + 188}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            私有字段，靠特性暴露给编辑器
          </text>

          {/* ===== 拖拽箭头：左字段 → 右槽 ===== */}
          <path
            d={`M ${dragFromX} ${dragFromY} C ${MID - 6} ${dragFromY}, ${MID + 6} ${dragToY}, ${dragToX} ${dragToY}`}
            fill="none"
            stroke="var(--success)"
            strokeWidth="2"
            strokeDasharray="6 4"
            markerEnd="url(#ibd-arrow)"
          />
          <text
            x={MID}
            y={dragFromY - 12}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--success)"
          >
            拖一下
          </text>

          {/* ===== 右栏：Inspector 面板 ===== */}
          <rect
            x={RIGHT_X}
            y={panelY}
            width={RIGHT_W}
            height={panelH}
            rx="9"
            fill="var(--text-secondary)"
            fillOpacity="0.05"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={RIGHT_X + 16}
            y={panelY + 28}
            fontSize="11.5"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            Inspector · Chaser (Script)
          </text>

          {/* 字段槽（赋值后：指向 Enemy） */}
          <text
            x={slotX}
            y={slotY - 8}
            fontSize="11"
            fill="var(--text-primary)"
          >
            Target
          </text>
          <rect
            x={slotX}
            y={slotY}
            width={slotW}
            height={slotH}
            rx="7"
            fill="var(--success)"
            fillOpacity="0.12"
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <circle
            cx={slotX + 22}
            cy={slotY + slotH / 2}
            r="9"
            fill="var(--success)"
            fillOpacity="0.85"
          />
          <text
            x={slotX + 42}
            y={slotY + slotH / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            Enemy (Transform)
          </text>
          <text
            x={slotX}
            y={slotY + slotH + 22}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            原本是空槽 None，拖进来后就指向 Enemy
          </text>

          {/* ===== 底部对照条：拖引用 vs 代码 Find ===== */}
          <rect
            x={LEFT_X}
            y={CMP_Y}
            width={LEFT_W}
            height={CMP_H}
            rx="8"
            fill="var(--success)"
            fillOpacity="0.1"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x={LEFT_X + LEFT_W / 2}
            y={CMP_Y + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            拖引用（推荐）
          </text>
          <text
            x={LEFT_X + LEFT_W / 2}
            y={CMP_Y + 44}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            编辑器里点一下就赋好
          </text>
          <text
            x={LEFT_X + LEFT_W / 2}
            y={CMP_Y + 60}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            零运行时开销 · 清晰可见
          </text>

          <rect
            x={RIGHT_X}
            y={CMP_Y}
            width={RIGHT_W}
            height={CMP_H}
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.1"
            stroke="var(--warning)"
            strokeWidth="1.4"
          />
          <text
            x={RIGHT_X + RIGHT_W / 2}
            y={CMP_Y + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--warning)"
          >
            代码 Find（慎用）
          </text>
          <text
            x={RIGHT_X + RIGHT_W / 2}
            y={CMP_Y + 44}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            运行时按名字搜整个场景
          </text>
          <text
            x={RIGHT_X + RIGHT_W / 2}
            y={CMP_Y + 60}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            慢 · 找不到失活对象 · 易写错名
          </text>

          <defs>
            <marker
              id="ibd-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        用 [SerializeField]（或 public）把字段暴露到
        Inspector，再把场景里的对象直接拖进槽， 运行前就赋好引用——比运行时用
        GameObject.Find 按名字搜整个场景更快、更稳、更清晰。
      </figcaption>
    </figure>
  );
}
