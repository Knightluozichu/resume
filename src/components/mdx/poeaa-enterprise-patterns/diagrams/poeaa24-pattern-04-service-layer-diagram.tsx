/**
 * <Poeaa24Pattern04ServiceLayerDiagram>：服务层结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 360;
export function Poeaa24Pattern04ServiceLayerDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="服务层结构图。Service Layer 作为应用入口，定义事务边界，协调领域对象完成用例。上层是控制器，下层是领域模型和数据源。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="服务层：应用入口 + 事务边界" />
          {/* 上层：控制器 */}
          <rect x={240} y={56} width={240} height={36} rx="6" fill={T.secondary} fillOpacity="0.06" stroke={T.secondary} strokeWidth="1" />
          <text x={360} y={79} textAnchor="middle" fontSize="11" fill={T.primary}>Controller / UI</text>
          <line x1={360} y1={92} x2={360} y2={112} stroke={T.secondary} strokeWidth="1.2" />
          {/* Service Layer */}
          <rect x={160} y={112} width={400} height={120} rx="10" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <text x={360} y={136} textAnchor="middle" fontSize="13" fontWeight="700" fill={T.accent}>OrderService（Service Layer）</text>
          <line x1={160} y1={146} x2={560} y2={146} stroke={T.accent} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x={176} y={168} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ placeOrder(dto): OrderResult</text>
          <text x={176} y={190} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ cancelOrder(id): void</text>
          <text x={176} y={212} fontSize="11" fill={T.secondary}>职责：事务边界、用例编排、权限检查</text>
          {/* 下层 */}
          <line x1={280} y1={232} x2={280} y2={252} stroke={T.secondary} strokeWidth="1" />
          <line x1={440} y1={232} x2={440} y2={252} stroke={T.secondary} strokeWidth="1" />
          <rect x={160} y={252} width={200} height={44} rx="6" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1" />
          <text x={260} y={278} textAnchor="middle" fontSize="11" fill="#3FB97F">Domain Model</text>
          <rect x={400} y={252} width={160} height={44} rx="6" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1" />
          <text x={480} y={278} textAnchor="middle" fontSize="11" fill="#E5B567">Data Source</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="服务层横跨所有复杂度，始终作为应用入口和事务边界" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        服务层定义应用的操作边界和事务边界，协调领域对象完成用例。
        它不包含业务规则本身，而是编排业务规则的执行。
      </figcaption>
    </figure>
  );
}

/** 兼容已有导入；章节正文使用带 Diagram 后缀的语义化名称以便质量审计识别专属视觉。 */
export const Poeaa24Pattern04ServiceLayer = Poeaa24Pattern04ServiceLayerDiagram;
