/**
 * <FlpFinalReviewDiagram>：流畅的 Python 总复习——四大能力自检。
 *
 * 把全书四大板块凝练为「你能做到什么」的四象限自检卡。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const CARDS = [
  { x: 40, y: 80, w: 294, h: 124, color: accent, title: "数据模型", items: ["实现特殊方法让类型融入语言", "len/for/+ 都走 dunder", "用内置函数不直接调 __xx__"] },
  { x: 386, y: 80, w: 294, h: 124, color: success, title: "数据结构", items: ["按容器/扁平、可变/不可变选型", "推导式替代 map+filter", "避 [[0]]*n 共享引用陷阱"] },
  { x: 40, y: 220, w: 294, h: 124, color: warning, title: "函数与对象", items: ["函数即值：赋值/传参/返回", "类型提示渐进式、静态检查", "Protocol 看形状、ABC 看血缘"] },
  { x: 386, y: 220, w: 294, h: 124, color: danger, title: "高级特性", items: ["闭包捕获变量而非值", "装饰器 = greet = timer(greet)", "生成器惰性、O(1) 内存"] },
];

export function FlpFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="流畅的Python总复习：数据模型、数据结构、函数与对象、高级特性四大能力自检卡。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            总复习：四大能力自检
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            每条都能脱口而出并写出代码，才算把书读「流畅」
          </text>

          {/* 四象限卡片 */}
          {CARDS.map((c) => (
            <g key={c.title}>
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="10" fill={c.color} fillOpacity="0.06" stroke={c.color} strokeWidth="1.4" strokeOpacity="0.55" />
              <text x={c.x + 18} y={c.y + 26} fontSize="14" fontWeight="700" fill={c.color}>
                {c.title}
              </text>
              <line x1={c.x + 16} y1={c.y + 36} x2={c.x + c.w - 16} y2={c.y + 36} stroke={border} strokeWidth="1" />
              {c.items.map((it, i) => (
                <text key={i} x={c.x + 18} y={c.y + 60 + i * 22} fontSize="11" fill={primary}>
                  · {it}
                </text>
              ))}
            </g>
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={358} x2={VIEW_W - 32} y2={358} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={378} textAnchor="middle" fontSize="11" fill={secondary}>
            主线：数据模型立心 → 数据结构筑基 → 函数对象塑形 → 高级特性升华
          </text>
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill={secondary}>
            Pythonic 的本质：顺应数据模型，用协议与语法糖而非造轮子
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        流畅的 Python 全书四大能力自检。
      </figcaption>
    </figure>
  );
}
