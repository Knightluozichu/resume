/**
 * <Poeaa24Pattern38ClientSessionState>：客户会话状态结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 320;
export function Poeaa24Pattern38ClientSessionState() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="客户会话状态结构图。会话数据存储在客户端（Cookie/隐藏字段/URL），每次请求携带全部状态，服务器无状态。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Client Session State：状态存在客户端" />
          {/* 客户端 */}
          <rect x={48} y={64} width={240} height={110} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={168} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">客户端（浏览器）</text>
          <text x={64} y={108} fontSize="11" fontFamily="monospace" fill={T.primary}>Cookie: cart=[...]</text>
          <text x={64} y={126} fontSize="11" fontFamily="monospace" fill={T.primary}>Hidden: step=2</text>
          <text x={64} y={144} fontSize="11" fontFamily="monospace" fill={T.primary}>URL: ?session=xyz</text>
          <text x={64} y={162} fontSize="11" fill={T.secondary}>每次请求携带全部状态</text>
          {/* 双向箭头 */}
          <line x1={288} y1={100} x2={420} y2={100} stroke={T.accent} strokeWidth="1.5" />
          <text x={354} y={92} textAnchor="middle" fontSize="11" fill={T.accent}>请求（带状态）</text>
          <line x1={420} y1={130} x2={288} y2={130} stroke={T.border} strokeWidth="1.2" />
          <text x={354} y={146} textAnchor="middle" fontSize="11" fill={T.secondary}>响应（更新状态）</text>
          {/* 服务器 */}
          <rect x={420} y={64} width={260} height={110} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <text x={550} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>服务器（无状态）</text>
          <text x={436} y={110} fontSize="11" fill={T.secondary}>不存储会话数据</text>
          <text x={436} y={128} fontSize="11" fill={T.secondary}>任意节点可处理请求</text>
          <text x={436} y={146} fontSize="11" fill={T.secondary}>水平扩展简单</text>
          <text x={436} y={164} fontSize="11" fill={T.secondary}>需防篡改（签名/加密）</text>
          {/* 底部说明 */}
          <rect x={48} y={200} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={224} fontSize="11" fontWeight="600" fill={T.primary}>适用与限制：</text>
          <text x={64} y={246} fontSize="11" fill={T.secondary}>• 适用：状态小、无敏感数据、需高扩展  • 限制：大小受限、需防篡改、敏感状态不可信</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="状态存客户端，服务器无状态，任意节点可处理请求" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        客户会话状态将数据存储在客户端（Cookie/隐藏字段/URL），
        服务器无状态，任意节点可处理请求，但需防篡改且大小受限。
      </figcaption>
    </figure>
  );
}
