/**
 * <Poeaa24Pattern01TransactionScriptDiagram>：事务脚本结构图。
 * 展示一个用例 = 一个过程的核心结构。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 360;

export function Poeaa24Pattern01TransactionScriptDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="事务脚本结构图。一个请求进入一个过程（如 processOrder），过程内部顺序执行：校验输入、读取数据、计算业务规则、写入结果。所有逻辑在一个方法中，没有对象协作。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="事务脚本：一个用例 = 一个过程" />
          {/* 入口 */}
          <rect x={280} y={56} width={160} height={36} rx="8" fill={T.accent} fillOpacity="0.1" stroke={T.accent} strokeWidth="1.5" />
          <text x={360} y={79} textAnchor="middle" fontSize="12" fontWeight="700" fill={T.accent}>HTTP 请求</text>
          <line x1={360} y1={92} x2={360} y2={112} stroke={T.secondary} strokeWidth="1.2" />
          {/* 过程框 */}
          <rect x={160} y={112} width={400} height={180} rx="10" fill="#3FB97F" fillOpacity="0.04" stroke="#3FB97F" strokeWidth="1.5" />
          <text x={360} y={136} textAnchor="middle" fontSize="13" fontWeight="700" fill="#3FB97F">processOrder(request)</text>
          <line x1={160} y1={146} x2={560} y2={146} stroke="#3FB97F" strokeWidth="0.8" strokeOpacity="0.4" />
          {/* 步骤 */}
          {["1. 校验输入参数", "2. 从 DB 读取订单行", "3. 计算折扣（if/else）", "4. 检查授信额度", "5. 写入 DB + 返回结果"].map((step, i) => (
            <text key={step} x={180} y={170 + i * 24} fontSize="11" fill={T.primary}>{step}</text>
          ))}
          {/* 特征标注 */}
          <text x={48} y={320} fontSize="11" fill="#3FB97F">✓ 简单直接、无对象协作</text>
          <text x={400} y={320} fontSize="11" fill={T.danger}>✗ 规则增长后 if/else 爆炸</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="适用：规则少、分支少、用例边界清晰的系统" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        事务脚本把一次用例的所有逻辑放在一个过程中顺序执行。
        简单直接，但规则增长后维护成本急剧上升。
      </figcaption>
    </figure>
  );
}

/** 兼容已有导入；章节正文使用带 Diagram 后缀的语义化名称以便质量审计识别专属视觉。 */
export const Poeaa24Pattern01TransactionScript =
  Poeaa24Pattern01TransactionScriptDiagram;
