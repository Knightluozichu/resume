/**
 * <UmsLearningMapDiagram>：Unity 神技达人炼成记全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UmsLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 神技达人炼成记全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Unity 神技达人炼成记 — 全书学习地图</text>

          {/* 五阶段流程条 */}
          <rect x="40" y="70" width="110" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="95" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">编辑器</text>
          <text x="160" y="100" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="170" y="70" width="110" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="225" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">脚本</text>
          <text x="290" y="100" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="300" y="70" width="110" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="355" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">渲染</text>
          <text x="420" y="100" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="430" y="70" width="110" height="50" rx="8" fill="var(--info)" fillOpacity="0.12" stroke="var(--info)" strokeWidth="1.2" />
          <text x="485" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--info)">生产</text>
          <text x="550" y="100" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="560" y="70" width="110" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="615" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">收尾</text>

          {/* 主线说明 */}
          <rect x="40" y="150" width="630" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="176" textAnchor="middle" fontSize="12" fill="var(--text-primary)">核心主线：从「会用 Unity」到「精通 Unity」的五大维度跃迁</text>

          {/* 各阶段详情 */}
          <text x="95" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">第 2-3 章</text>
          <text x="95" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">EditorWindow</text>
          <text x="95" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PropertyDrawer</text>
          <text x="95" y="276" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Gizmo</text>

          <text x="225" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">第 4-5 章</text>
          <text x="225" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">泛型 / 委托</text>
          <text x="225" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">扩展方法</text>
          <text x="225" y="276" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编辑器扩展</text>

          <text x="355" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">第 6-7 章</text>
          <text x="355" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">URP / HDRP</text>
          <text x="355" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">RendererFeature</text>
          <text x="355" y="276" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Profiler</text>

          <text x="485" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--info)">第 8-9 章</text>
          <text x="485" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Addressables</text>
          <text x="485" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Git LFS</text>
          <text x="485" y="276" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">代码规范</text>

          <text x="615" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">第 10 章</text>
          <text x="615" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">综合实战</text>
          <text x="615" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">工作链串联</text>

          {/* 底部提示 */}
          <text x="360" y="330" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">每一阶段建立在前一阶段的产出之上：先造工具，再写好代码，后调渲染查性能</text>
          <text x="360" y="355" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">达人分水岭：编辑器定制 + 渲染管线 + 性能分析</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 神技达人炼成记全书学习地图——广铁夫
      </figcaption>
    </figure>
  );
}
