/**
 * <Poeaa24Pattern26PageController>：页面控制器请求流图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 320;
export function Poeaa24Pattern26PageController() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="页面控制器请求流图。每个页面/URL 对应一个 Controller 类，处理该页面的输入、调用 Model、选择 View 渲染。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Page Controller：一个页面 = 一个 Controller" />
          {/* URL 请求 */}
          <rect x={48} y={72} width={120} height={36} rx="6" fill={T.primary} fillOpacity="0.05" stroke={T.border} strokeWidth="1" />
          <text x={108} y={94} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={T.primary}>GET /order/42</text>
          {/* 箭头 */}
          <line x1={168} y1={90} x2={220} y2={90} stroke={T.primary} strokeWidth="1.2" />
          {/* Page Controller */}
          <rect x={220} y={64} width={180} height={100} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={220} y={64} width={180} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={220} y={84} width={180} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={310} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>OrderPageController</text>
          <text x={236} y={112} fontSize="9" fontFamily="monospace" fill="#3FB97F">handleGet(id)</text>
          <text x={236} y={130} fontSize="9" fontFamily="monospace" fill="#3FB97F">handlePost(form)</text>
          <text x={236} y={148} fontSize="9" fill={T.secondary}>解析参数 → 调 Model → 选 View</text>
          {/* 箭头到 Model */}
          <line x1={310} y1={164} x2={310} y2={196} stroke="#3FB97F" strokeWidth="1.2" />
          <text x={320} y={184} fontSize="9" fill="#3FB97F">调用</text>
          {/* Model */}
          <rect x={220} y={196} width={180} height={44} rx="6" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1" />
          <text x={310} y={222} textAnchor="middle" fontSize="10" fill="#3FB97F">Order.find(42)</text>
          {/* 箭头到 View */}
          <line x1={400} y1={114} x2={480} y2={114} stroke="#E5B567" strokeWidth="1.2" />
          <text x={440} y={106} textAnchor="middle" fontSize="9" fill="#E5B567">选择</text>
          {/* View */}
          <rect x={480} y={84} width={180} height={60} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={570} y={108} textAnchor="middle" fontSize="10" fontWeight="600" fill="#E5B567">orderDetail.jsp</text>
          <text x={570} y={128} textAnchor="middle" fontSize="9" fill={T.secondary}>渲染 HTML 响应</text>
          {/* 底部说明 */}
          <rect x={48} y={260} width={624} height={36} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={282} fontSize="11" fill={T.secondary}>每个 URL 对应一个 Controller 类，结构简单，适合页面间逻辑差异大的场景</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="一个页面一个 Controller，各自处理输入、调用 Model、选择 View" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Page Controller 为每个页面/URL 分配一个 Controller 类。
        每个 Controller 处理该页面的输入、调用 Model、选择 View 渲染。
      </figcaption>
    </figure>
  );
}
