/**
 * <Poeaa24Pattern39ServerSessionState>：服务器会话状态结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 320;
export function Poeaa24Pattern39ServerSessionState() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="服务器会话状态结构图。客户端只持有会话 ID，状态数据存储在服务器内存中，需处理会话定位、过期清理和节点故障恢复。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Server Session State：状态存在服务器内存" />
          {/* 客户端 */}
          <rect x={48} y={64} width={180} height={80} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={138} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">客户端</text>
          <text x={64} y={110} fontSize="11" fontFamily="monospace" fill={T.primary}>Cookie: sid=abc123</text>
          <text x={64} y={128} fontSize="11" fill={T.secondary}>只持有会话 ID</text>
          {/* 箭头 */}
          <line x1={228} y1={104} x2={300} y2={104} stroke={T.accent} strokeWidth="1.5" />
          <text x={264} y={96} textAnchor="middle" fontSize="11" fill={T.accent}>sid</text>
          {/* 服务器 */}
          <rect x={300} y={64} width={200} height={110} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <text x={400} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>应用服务器</text>
          <text x={316} y={110} fontSize="11" fontFamily="monospace" fill={T.primary}>sessions: Map</text>
          <text x={316} y={128} fontSize="11" fontFamily="monospace" fill={T.primary}>  abc123 → {"{cart, user}"}</text>
          <text x={316} y={146} fontSize="11" fill={T.secondary}>内存中存储状态</text>
          <text x={316} y={164} fontSize="11" fill={T.secondary}>定期清理过期会话</text>
          {/* 故障恢复 */}
          <rect x={540} y={64} width={140} height={110} rx="8" fill="#E5634D" fillOpacity="0.06" stroke="#E5634D" strokeWidth="1.2" />
          <text x={610} y={86} textAnchor="middle" fontSize="11" fontWeight="600" fill="#E5634D">节点故障</text>
          <text x={556} y={110} fontSize="11" fill={T.secondary}>内存丢失</text>
          <text x={556} y={128} fontSize="11" fill={T.secondary}>会话失效</text>
          <text x={556} y={146} fontSize="11" fill={T.secondary}>需粘性会话</text>
          <text x={556} y={164} fontSize="11" fill={T.secondary}>或复制/恢复</text>
          <line x1={500} y1={119} x2={540} y2={119} stroke="#E5634D" strokeWidth="1" strokeDasharray="4 3" />
          {/* 底部说明 */}
          <rect x={48} y={200} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={224} fontSize="11" fontWeight="600" fill={T.primary}>适用与限制：</text>
          <text x={64} y={246} fontSize="11" fill={T.secondary}>• 适用：状态大、敏感、需服务端控制  • 限制：节点故障丢失、扩展需粘性会话或集中存储</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="客户端只持 ID，状态存服务器内存，故障时会话丢失" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        服务器会话状态将数据存储在服务器内存中，客户端只持有会话 ID。
        适合状态大或敏感的场景，代价是节点故障时会话丢失。
      </figcaption>
    </figure>
  );
}
