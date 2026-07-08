/**
 * <UsgLearningMapDiagram>: Unity 3D 脚本编程与游戏开发 全书学习地图
 *
 * 基础入门 -> 脚本核心 -> 游戏逻辑 -> 进阶机制 -> 项目实战
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function UsgLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity 3D 脚本编程与游戏开发全书学习地图。五个板块：基础入门、脚本核心、游戏逻辑、进阶机制、项目实战。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Unity 3D 脚本编程与游戏开发 · 学习地图
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            基础入门 -&gt; 脚本核心 -&gt; 游戏逻辑 -&gt; 进阶机制 -&gt; 项目实战
          </text>
          <g>
            <rect x={36} y={74} width={648} height={60} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={96} fontSize="13" fontWeight="700" fill={accent}>基础入门</text>
            <rect x={158} y={84} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={233} y={104} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>C# 语法基础</text>
            <rect x={328} y={84} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={403} y={104} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Unity API 核心</text>
            <rect x={498} y={84} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={573} y={104} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>脚本挂载</text>
          </g>
          <g>
            <rect x={36} y={142} width={648} height={60} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={164} fontSize="13" fontWeight="700" fill={success}>游戏逻辑</text>
            <rect x={158} y={152} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={233} y={172} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>组件模式</text>
            <rect x={328} y={152} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={403} y={172} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>游戏循环</text>
            <rect x={498} y={152} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={573} y={172} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>生命周期</text>
          </g>
          <g>
            <rect x={36} y={210} width={648} height={60} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={232} fontSize="13" fontWeight="700" fill={warning}>进阶机制</text>
            <rect x={158} y={220} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={233} y={240} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>协程与事件</text>
            <rect x={328} y={220} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={403} y={240} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>数据持久化</text>
            <rect x={498} y={220} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={573} y={240} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>ScriptableObject</text>
          </g>
          <g>
            <rect x={36} y={278} width={648} height={60} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={300} fontSize="13" fontWeight="700" fill={danger}>项目实战</text>
            <rect x={158} y={288} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={233} y={308} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>性能优化</text>
            <rect x={328} y={288} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={403} y={308} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>构建发布</text>
            <rect x={498} y={288} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={573} y={308} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>全书复习</text>
          </g>
          <text x={360} y={366} textAnchor="middle" fontSize="11" fill={secondary}>主线：C# 基础 -&gt; Unity API -&gt; 组件架构 -&gt; 协程/数据 -&gt; 优化/发布</text>
          <text x={360} y={384} textAnchor="middle" fontSize="11" fill={secondary}>每章配套代码示例与 SVG 图解，视觉优先、边读边练</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书五大板块：基础入门→脚本核心→游戏逻辑→进阶机制→项目实战。
      </figcaption>
    </figure>
  );
}
