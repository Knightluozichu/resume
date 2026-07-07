/**
 * <CommentsVsCodeDiagram>：辅图——「注释 vs 代码对比图」。
 *
 * 左侧「好注释」（success 绿）：法律信息、意图说明、警示、TODO。
 * 右侧「坏注释」（danger 红）：废话注释、被注释掉的代码、位置标记、closing brace 注释。
 * 中间标注「好代码自解释，注释解释为什么」。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const LEFT_X = 40;
const SIDE_W = 280;
const RIGHT_X = 400;

const ITEM_H = 52;
const ITEM_GAP = 8;
const ITEM_START_Y = 104;

interface CommentItem {
  title: string;
  desc: string;
}

const goodComments: CommentItem[] = [
  { title: "法律信息", desc: "版权声明、许可证条款" },
  { title: "意图说明", desc: "解释为什么这样做，而非做了什么" },
  { title: "警示", desc: "标记陷阱、性能约束、副作用" },
  { title: "TODO", desc: "标记待办事项与后续计划" },
];

const badComments: CommentItem[] = [
  { title: "废话注释", desc: "// 设置 x 为 0 ——代码已说明" },
  { title: "被注释掉的代码", desc: "死代码堆积，无人敢删" },
  { title: "位置标记", desc: "//// Section //// 噪音" },
  { title: "closing brace 注释", desc: "} // end if 多余" },
];

function itemY(index: number): number {
  return ITEM_START_Y + index * (ITEM_H + ITEM_GAP);
}

export function CommentsVsCodeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="注释与代码对比图。左侧好注释用绿色标注四类：法律信息、意图说明、警示、TODO。右侧坏注释用红色标注四类：废话注释、被注释掉的代码、位置标记、closing brace 注释。中间标注好代码自解释，注释解释为什么。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            注释：好 vs 坏
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            好代码自解释，注释用来解释为什么
          </text>

          {/* 列标题 */}
          <text x={LEFT_X + SIDE_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">
            好注释
          </text>
          <text x={RIGHT_X + SIDE_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">
            坏注释
          </text>

          {/* 左侧好注释 */}
          {goodComments.map((c, i) => (
            <g key={`good-${i}`}>
              <rect
                x={LEFT_X}
                y={itemY(i)}
                width={SIDE_W}
                height={ITEM_H}
                rx="8"
                fill="var(--success)"
                fillOpacity="0.08"
                stroke="var(--success)"
                strokeWidth="1.5"
              />
              <text x={LEFT_X + 16} y={itemY(i) + 22} fontSize="13" fontWeight="600" fill="var(--text-primary)">
                {c.title}
              </text>
              <text x={LEFT_X + 16} y={itemY(i) + 40} fontSize="11" fill="var(--text-secondary)">
                {c.desc}
              </text>
            </g>
          ))}

          {/* 右侧坏注释 */}
          {badComments.map((c, i) => (
            <g key={`bad-${i}`}>
              <rect
                x={RIGHT_X}
                y={itemY(i)}
                width={SIDE_W}
                height={ITEM_H}
                rx="8"
                fill="var(--danger)"
                fillOpacity="0.06"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text x={RIGHT_X + 16} y={itemY(i) + 22} fontSize="13" fontWeight="600" fill="var(--text-primary)">
                {c.title}
              </text>
              <text x={RIGHT_X + 16} y={itemY(i) + 40} fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
                {c.desc}
              </text>
            </g>
          ))}

          {/* 中间标注 */}
          <text x={360} y={196} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">
            好代码
          </text>
          <text x={360} y={214} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            自解释
          </text>
          <text x={360} y={240} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">
            注释
          </text>
          <text x={360} y={258} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            解释为什么
          </text>

          {/* 底部总结 */}
          <line x1={40} y1={352} x2={VIEW_W - 40} y2={352} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={376} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            注释不是补救烂代码的药——代码写清楚了，注释才锦上添花
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        好注释补充代码无法表达的信息：法律信息、意图说明、警示和 TODO。
        坏注释则是噪音：废话、死代码、位置标记和多余的括号注释。好代码自解释，注释解释为什么。
      </figcaption>
    </figure>
  );
}
