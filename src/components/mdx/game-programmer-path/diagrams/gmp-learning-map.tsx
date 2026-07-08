/**
 * <GmpLearningMapDiagram>：游戏程序员学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmpLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏程序员学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏程序员技术栈金字塔
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            语言是工具 · 数据结构是内功 · 算法是招式
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <polygon points="360,100 250,160 470,160" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="130" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">C++ 语言</text>
          <text x="360" y="148" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">内存/模板/RAII</text>

          <polygon points="250,160 470,160 510,210 210,210" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="185" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">数据结构 + 算法</text>
          <text x="360" y="202" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">链表/树/图/排序/DP</text>

          <polygon points="210,210 510,210 550,260 170,260" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="235" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">引擎 · 图形 · 玩法</text>
          <text x="360" y="252" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">渲染管线/组件系统/状态机</text>

          <polygon points="170,260 550,260 580,300 140,300" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="360" y="285" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">面试 · 项目 · 综合</text>

          <text x={VIEW_W / 2} y="324" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            越底层越通用 · 越上层越专用
          </text>
          <text x={VIEW_W / 2} y="342" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            学习从底向上 · 实践从顶向下
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏程序员技术栈金字塔——从 C++ 基础到面试综合
      </figcaption>
    </figure>
  );
}
