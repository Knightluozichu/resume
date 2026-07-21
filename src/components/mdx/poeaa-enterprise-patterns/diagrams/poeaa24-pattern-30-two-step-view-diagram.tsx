/**
 * <Poeaa24Pattern30TwoStepView>：两步视图结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 320;
export function Poeaa24Pattern30TwoStepView() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="两步视图结构图。第一步将 Model 数据渲染为内容 HTML（无布局），第二步将内容嵌入全局布局模板（导航、页脚），实现内容与布局分离。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Two Step View：内容 → 布局，两步渲染" />
          {/* Step 1 */}
          <rect x={48} y={64} width={200} height={100} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <rect x={48} y={64} width={200} height={28} rx="8" fill="#3FB97F" fillOpacity="0.12" />
          <rect x={48} y={84} width={200} height={8} fill="#3FB97F" fillOpacity="0.12" />
          <text x={148} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">第一步：内容模板</text>
          <text x={64} y={112} fontSize="9" fontFamily="monospace" fill={T.primary}>orderDetail.html</text>
          <text x={64} y={130} fontSize="9" fill={T.secondary}>只渲染页面主体内容</text>
          <text x={64} y={148} fontSize="9" fill={T.secondary}>无导航、无页脚</text>
          {/* 箭头 */}
          <line x1={248} y1={114} x2={310} y2={114} stroke={T.accent} strokeWidth="1.5" />
          <text x={279} y={106} textAnchor="middle" fontSize="9" fill={T.accent}>嵌入</text>
          {/* Step 2 */}
          <rect x={310} y={64} width={200} height={100} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={310} y={64} width={200} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={310} y={84} width={200} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={410} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>第二步：布局模板</text>
          <text x={326} y={112} fontSize="9" fontFamily="monospace" fill={T.primary}>layout.html</text>
          <text x={326} y={130} fontSize="9" fill={T.secondary}>导航 + {"{{content}}"} + 页脚</text>
          <text x={326} y={148} fontSize="9" fill={T.secondary}>全站统一外观</text>
          {/* 箭头到输出 */}
          <line x1={510} y1={114} x2={560} y2={114} stroke="#E5B567" strokeWidth="1.5" />
          {/* 输出 */}
          <rect x={560} y={72} width={120} height={84} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={620} y={94} textAnchor="middle" fontSize="10" fontWeight="600" fill="#E5B567">完整页面</text>
          <text x={576} y={114} fontSize="8" fill={T.secondary}>┌ 导航 ┐</text>
          <text x={576} y={130} fontSize="8" fill="#3FB97F">│ 内容 │</text>
          <text x={576} y={146} fontSize="8" fill={T.secondary}>└ 页脚 ┘</text>
          {/* 底部说明 */}
          <rect x={48} y={196} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={220} fontSize="11" fontWeight="600" fill={T.primary}>核心优势：</text>
          <text x={64} y={242} fontSize="11" fill={T.secondary}>• 换皮肤只需换布局模板，内容模板不动  • 内容模板可跨布局复用</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="内容与布局分离：第一步渲染内容，第二步嵌入全局布局" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Two Step View 将渲染分为两步：第一步生成页面内容，第二步嵌入全局布局。
        换皮肤只需换布局模板，内容模板完全不受影响。
      </figcaption>
    </figure>
  );
}
