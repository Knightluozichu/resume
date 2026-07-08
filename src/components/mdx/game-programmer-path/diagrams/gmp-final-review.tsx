/**
 * <GmpFinalReviewDiagram>：游戏程序员学习之路总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmpFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏程序员学习之路总复习图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏程序员知识全景图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            语言是工具 · 数据结构是内功 · 算法是招式
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="580" height="50" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="124" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">编程基础</text>
          <text x="100" y="140" textAnchor="start" fontSize="11" fill="var(--text-secondary)">C++ + 内存管理（RAII/智能指针/栈与堆）→ 能写出代码</text>

          <text x={VIEW_W / 2} y="168" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&uarr; 基础 &darr;</text>

          <rect x="70" y="178" width="580" height="50" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="100" y="202" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--accent)">算法内功</text>
          <text x="100" y="218" textAnchor="start" fontSize="11" fill="var(--text-secondary)">数据结构 + 算法 + 复杂度分析（缓存友好/空间划分/大 O）→ 能写出高效代码</text>

          <text x={VIEW_W / 2} y="246" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&uarr; 内功 &darr;</text>

          <rect x="70" y="256" width="580" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="100" y="280" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--warning)">工程实践</text>
          <text x="100" y="296" textAnchor="start" fontSize="11" fill="var(--text-secondary)">引擎 + 图形 + 玩法 + 面试（游戏循环/渲染管线/状态机/面试准备）→ 能做出游戏</text>

          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            能力三角：编程基础（能写代码）+ 算法思维（写得快）+ 工程实践（做成产品）
          </text>
          <text x={VIEW_W / 2} y="348" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            70% 学底层原理（不变）+ 30% 学上层 API（变化快）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏程序员知识全景图——能力三角与成长路径
      </figcaption>
    </figure>
  );
}
