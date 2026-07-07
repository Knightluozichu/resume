/**
 * <CodeSmellsMap>：辅图——「代码异味分类图」。
 *
 * 树形结构，三大类：
 *  ①冗余（danger 红）：重复代码、过长函数、过大类、过长参数列。
 *  ②复杂（warning 黄）：发散修改、霰弹手术、特性依恋、数据泥团。
 *  ③命名与设计（accent 紫）：命名不当、纯数据类、被拒绝的馈赠。
 *
 * 顶部根节点「代码异味」，三条树形连线分叉到三个分类。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 380;

const COL_W = 200;
const COL1_X = 40;
const COL2_X = 260;
const COL3_X = 480;

const CAT_Y = 88;
const CAT_H = 36;

const ITEM_H = 44;
const ITEM_GAP = 8;
const ITEM_START_Y = 136;

interface Category {
  name: string;
  color: string;
  fillOpacity: string;
  items: string[];
}

const categories: Category[] = [
  {
    name: "冗余",
    color: "var(--danger)",
    fillOpacity: "0.08",
    items: ["重复代码", "过长函数", "过大类", "过长参数列"],
  },
  {
    name: "复杂",
    color: "var(--warning)",
    fillOpacity: "0.08",
    items: ["发散修改", "霰弹手术", "特性依恋", "数据泥团"],
  },
  {
    name: "命名与设计",
    color: "var(--accent)",
    fillOpacity: "0.08",
    items: ["命名不当", "纯数据类", "被拒绝的馈赠"],
  },
];

const colXs = [COL1_X, COL2_X, COL3_X];

function itemY(index: number): number {
  return ITEM_START_Y + index * (ITEM_H + ITEM_GAP);
}

export function CodeSmellsMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="代码异味分类图。顶部根节点代码异味，分叉为三大类：冗余用红色标注，包含重复代码、过长函数、过大类、过长参数列；复杂用黄色标注，包含发散修改、霰弹手术、特性依恋、数据泥团；命名与设计用紫色标注，包含命名不当、纯数据类、被拒绝的馈赠。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={24} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            代码异味分类
          </text>

          {/* 根节点 */}
          <rect x={300} y={36} width={120} height={32} rx="8" fill="var(--bg)" stroke="var(--text-primary)" strokeWidth="1.5" />
          <text x={360} y={56} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            代码异味
          </text>

          {/* 树形连线 */}
          <line x1={360} y1={68} x2={360} y2={78} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={COL1_X + COL_W / 2} y1={78} x2={COL3_X + COL_W / 2} y2={78} stroke="var(--border)" strokeWidth="1.5" />
          {colXs.map((cx, i) => (
            <line key={`tree-${i}`} x1={cx + COL_W / 2} y1={78} x2={cx + COL_W / 2} y2={CAT_Y} stroke="var(--border)" strokeWidth="1.5" />
          ))}

          {/* 分类标题 + 子项 */}
          {categories.map((cat, ci) => {
            const cx = colXs[ci];
            return (
              <g key={`cat-${ci}`}>
                {/* 分类标题框 */}
                <rect
                  x={cx}
                  y={CAT_Y}
                  width={COL_W}
                  height={CAT_H}
                  rx="8"
                  fill={cat.color}
                  fillOpacity={cat.fillOpacity}
                  stroke={cat.color}
                  strokeWidth="2"
                />
                <text x={cx + COL_W / 2} y={CAT_Y + 23} textAnchor="middle" fontSize="13" fontWeight="700" fill={cat.color}>
                  {cat.name}
                </text>

                {/* 子项 */}
                {cat.items.map((item, ii) => (
                  <g key={`item-${ci}-${ii}`}>
                    <rect
                      x={cx}
                      y={itemY(ii)}
                      width={COL_W}
                      height={ITEM_H}
                      rx="8"
                      fill={cat.color}
                      fillOpacity="0.04"
                      stroke={cat.color}
                      strokeWidth="1"
                      opacity="0.8"
                    />
                    <text x={cx + 16} y={itemY(ii) + 28} fontSize="12" fontWeight="500" fill="var(--text-primary)">
                      {item}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={40} y1={340} x2={VIEW_W - 40} y2={340} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={362} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            识别异味是重构的第一步——先闻到坏味道，再决定用什么手法
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        代码异味分三大类：冗余类（重复、过长、过大）提示你需要提取和拆分；
        复杂类（发散修改、霰弹手术等）提示职责分配有问题；命名与设计类提示抽象和建模需要改进。
      </figcaption>
    </figure>
  );
}
