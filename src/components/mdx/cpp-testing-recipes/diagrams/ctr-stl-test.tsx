/**
 * <CtrStlTestDiagram>：STL 容器分类与迭代器失效对照。
 *
 * 上半：四类容器卡片（顺序/关联/无序/适配器）及代表容器。
 * 下半：vector 与 list 的迭代器失效规则对照（push_back / erase）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const CARD_W = 152;
const CARD_GAP = 12;
const CARD_MARGIN = 36;
const cardX = (i: number) => CARD_MARGIN + i * (CARD_W + CARD_GAP);

interface CatCard {
  name: string;
  color: string;
  examples: string[];
}

const CATS: readonly CatCard[] = [
  { name: "顺序容器", color: "var(--accent)", examples: ["vector", "deque", "list"] },
  { name: "关联容器", color: "var(--success)", examples: ["map", "set", "红黑树"] },
  { name: "无序容器", color: "var(--warning)", examples: ["unordered_map", "哈希表"] },
  { name: "容器适配器", color: "var(--danger)", examples: ["stack", "queue", "priority_queue"] },
];

const PANEL_W = 320;
const PANEL_H = 168;
const PANEL_Y = 252;

interface InvalRule {
  op: string;
  vector: string;
  list: string;
}

const RULES: readonly InvalRule[] = [
  { op: "push_back", vector: "扩容则全失效", list: "仅 end() 失效" },
  { op: "erase", vector: "被删及之后失效", list: "仅被删节点失效" },
];

export function CtrStlTestDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="STL 容器分类与迭代器失效。上半四类容器：顺序容器（vector/deque/list）、关联容器（map/set/红黑树）、无序容器（unordered_map/哈希表）、容器适配器（stack/queue/priority_queue）。下半对照 vector 与 list 的迭代器失效规则：push_back 时 vector 扩容则全失效而 list 仅 end 失效；erase 时 vector 被删及之后失效而 list 仅被删节点失效。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            STL 容器分类与迭代器失效
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            按存储分四类 · 失效规则是 STL 最常见 bug 源
          </text>

          {/* 上半：四类容器卡片 */}
          {CATS.map((c, i) => {
            const x = cardX(i);
            return (
              <g key={c.name}>
                <rect x={x} y={78} width={CARD_W} height={108} rx="10" fill={elevated} stroke={c.color} strokeWidth="1.6" strokeOpacity="0.6" />
                <rect x={x} y={78} width={CARD_W} height={30} rx="10" fill={c.color} fillOpacity="0.14" />
                <rect x={x} y={100} width={CARD_W} height={8} fill={c.color} fillOpacity="0.14" />
                <text x={x + CARD_W / 2} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={c.color}>
                  {c.name}
                </text>
                {c.examples.map((ex, ei) => (
                  <text key={ex} x={x + CARD_W / 2} y={130 + ei * 20} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={primary} fontFamily="monospace">
                    {ex}
                  </text>
                ))}
              </g>
            );
          })}

          {/* 分隔线 */}
          <line x1={32} y1={210} x2={VIEW_W - 32} y2={210} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={234} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            迭代器失效对照：vector vs list
          </text>

          {/* 下半：失效规则对照表 */}
          <g>
            {/* 表头 */}
            <rect x={40} y={PANEL_Y} width={640} height={32} rx="8" fill="var(--accent)" fillOpacity="0.12" />
            <text x={140} y={PANEL_Y + 21} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">操作</text>
            <text x={340} y={PANEL_Y + 21} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">vector</text>
            <text x={540} y={PANEL_Y + 21} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">list</text>

            {RULES.map((r, ri) => {
              const y = PANEL_Y + 44 + ri * 56;
              return (
                <g key={r.op}>
                  <rect x={40} y={y} width={640} height={48} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
                  <text x={140} y={y + 30} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={primary} fontFamily="monospace">{r.op}</text>
                  <text x={340} y={y + 30} textAnchor="middle" fontSize="12" fill={secondary}>{r.vector}</text>
                  <text x={540} y={y + 30} textAnchor="middle" fontSize="12" fill={secondary}>{r.list}</text>
                </g>
              );
            })}
          </g>

          {/* 底部总结 */}
          <line x1={32} y1={452} x2={VIEW_W - 32} y2={452} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={476} textAnchor="middle" fontSize="12" fill={secondary}>
            循环删除用 it = v.erase(it) · 批量删用 remove-erase 惯用法
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        STL 容器分四类（顺序/关联/无序/适配器）；vector 扩容与 erase 会波及后续迭代器，list 仅失效被删节点。
      </figcaption>
    </figure>
  );
}
