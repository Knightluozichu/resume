/**
 * <Poeaa24Pattern31ApplicationController>：应用控制器结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 340;
export function Poeaa24Pattern31ApplicationController() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="应用控制器结构图。Application Controller 管理多步流程（向导），根据当前步骤和领域状态决定下一步显示哪个 View、执行哪个 Command。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Application Controller：多步流程调度" />
          {/* Application Controller */}
          <rect x={240} y={64} width={240} height={120} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={240} y={64} width={240} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={240} y={84} width={240} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={360} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>ApplicationController</text>
          <text x={256} y={112} fontSize="9" fontFamily="monospace" fill="#3FB97F">getCommand(event)</text>
          <text x={256} y={130} fontSize="9" fontFamily="monospace" fill="#3FB97F">getView(state)</text>
          <text x={256} y={152} fontSize="9" fill={T.secondary}>根据领域状态决定下一步</text>
          <text x={256} y={170} fontSize="9" fill={T.secondary}>管理向导/多步流程</text>
          {/* 左侧：输入事件 */}
          <rect x={48} y={80} width={140} height={36} rx="6" fill={T.primary} fillOpacity="0.05" stroke={T.border} strokeWidth="1" />
          <text x={118} y={102} textAnchor="middle" fontSize="9" fill={T.primary}>用户事件/步骤</text>
          <line x1={188} y1={98} x2={240} y2={98} stroke={T.primary} strokeWidth="1.2" />
          {/* 右侧：Views */}
          <line x1={480} y1={98} x2={540} y2={80} stroke="#E5B567" strokeWidth="1" />
          <line x1={480} y1={124} x2={540} y2={124} stroke="#E5B567" strokeWidth="1" />
          <line x1={480} y1={150} x2={540} y2={168} stroke="#E5B567" strokeWidth="1" />
          <rect x={540} y={64} width={148} height={32} rx="6" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1" />
          <text x={614} y={84} textAnchor="middle" fontSize="9" fill="#E5B567">Step1: 选商品</text>
          <rect x={540} y={108} width={148} height={32} rx="6" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1" />
          <text x={614} y={128} textAnchor="middle" fontSize="9" fill="#E5B567">Step2: 填地址</text>
          <rect x={540} y={152} width={148} height={32} rx="6" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1" />
          <text x={614} y={172} textAnchor="middle" fontSize="9" fill="#E5B567">Step3: 确认支付</text>
          {/* 底部说明 */}
          <rect x={48} y={216} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={240} fontSize="11" fontWeight="600" fill={T.primary}>vs Page/Front Controller：</text>
          <text x={64} y={262} fontSize="11" fill={T.secondary}>Application Controller 管理跨请求的多步流程（向导），根据领域状态动态决定下一步</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="管理多步流程：根据领域状态决定下一步的 View 和 Command" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Application Controller 管理跨请求的多步流程（如购物向导），
        根据当前领域状态动态决定下一步显示哪个 View、执行哪个 Command。
      </figcaption>
    </figure>
  );
}
