/**
 * <UsgFinalReviewDiagram>: 全书总复习
 *
 * 全书知识图谱：五大板块串联核心知识点
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

export function UsgFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="全书总复习知识图谱。五个板块的核心知识点串联与能力检查清单。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            全书知识图谱 · 总复习
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            五大板块核心能力检查
          </text>
          {/* 中心节点 */}
          <g>
            <circle cx={360} cy={210} r={56} fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
            <text x={360} y={206} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>Unity 3D</text>
            <text x={360} y={222} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>脚本编程</text>
          </g>
          {/* 五大板块辐射 */}
          <g>
            <rect x={36} y={80} width={150} height={56} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" />
            <text x={111} y={102} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>基础入门</text>
            <text x={111} y={120} textAnchor="middle" fontSize="10" fill={secondary}>C#/API/MonoBehaviour</text>
            <line x1={186} y1={128} x2={316} y2={186} stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          </g>
          <g>
            <rect x={534} y={80} width={150} height={56} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" />
            <text x={609} y={102} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>游戏逻辑</text>
            <text x={609} y={120} textAnchor="middle" fontSize="10" fill={secondary}>组件/循环/生命周期</text>
            <line x1={534} y1={128} x2={404} y2={186} stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          </g>
          <g>
            <rect x={36} y={300} width={150} height={56} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" />
            <text x={111} y={322} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>进阶机制</text>
            <text x={111} y={340} textAnchor="middle" fontSize="10" fill={secondary}>协程/事件/持久化</text>
            <line x1={186} y1={300} x2={316} y2={234} stroke={warning} strokeWidth="1" strokeOpacity="0.5" />
          </g>
          <g>
            <rect x={534} y={300} width={150} height={56} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" />
            <text x={609} y={322} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>项目实战</text>
            <text x={609} y={340} textAnchor="middle" fontSize="10" fill={secondary}>优化/构建/发布</text>
            <line x1={534} y1={300} x2={404} y2={234} stroke={danger} strokeWidth="1" strokeOpacity="0.5" />
          </g>
          {/* 能力检查清单 */}
          <g>
            <rect x={210} y={110} width={300} height={200} rx="6" fill={elevated} stroke={border} strokeWidth="1" strokeOpacity="0.6" fillOpacity="0" />
          </g>
          <text x={360} y={140} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>核心能力检查</text>
          <text x={360} y={160} textAnchor="middle" fontSize="10" fill={secondary}>能写 MonoBehaviour 并挂载调试</text>
          <text x={360} y={178} textAnchor="middle" fontSize="10" fill={secondary}>会用 GetComponent 组件通信</text>
          <text x={360} y={196} textAnchor="middle" fontSize="10" fill={secondary}>区分 Update/FixedUpdate/LateUpdate</text>
          <text x={360} y={214} textAnchor="middle" fontSize="10" fill={secondary}>会用协程做延迟与异步加载</text>
          <text x={360} y={232} textAnchor="middle" fontSize="10" fill={secondary}>会用事件系统解耦组件</text>
          <text x={360} y={250} textAnchor="middle" fontSize="10" fill={secondary}>能选对持久化方案存取数据</text>
          <text x={360} y={268} textAnchor="middle" fontSize="10" fill={secondary}>会用对象池/批处理优化性能</text>
          <text x={360} y={286} textAnchor="middle" fontSize="10" fill={secondary}>能完成多平台构建发布</text>
          <text x={360} y={384} textAnchor="middle" fontSize="11" fill={secondary}>学完本书：从 C# 语法到独立完成一个 Unity 游戏的脚本开发与发布</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识图谱：基础入门→游戏逻辑→进阶机制→项目实战，串联八大核心能力。
      </figcaption>
    </figure>
  );
}
