/**
 * <Poeaa24Pattern25ModelViewController>：MVC 请求流序列图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 380;
export function Poeaa24Pattern25ModelViewController() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="MVC 请求流序列图。用户操作触发 Controller，Controller 更新 Model，Model 通知 View 刷新，View 渲染响应返回用户。三者职责分离。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="MVC：请求 → Controller → Model → View → 响应" />
          {/* 三个角色 */}
          <rect x={48} y={64} width={120} height={44} rx="8" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={108} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">Model</text>
          <rect x={300} y={64} width={120} height={44} rx="8" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1.2" />
          <text x={360} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>View</text>
          <rect x={552} y={64} width={120} height={44} rx="8" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1.2" />
          <text x={612} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">Controller</text>
          {/* 生命线 */}
          <line x1={108} y1={108} x2={108} y2={330} stroke="#3FB97F" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />
          <line x1={360} y1={108} x2={360} y2={330} stroke={T.accent} strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />
          <line x1={612} y1={108} x2={612} y2={330} stroke="#E5B567" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />
          {/* Step 1: 用户 → Controller */}
          <line x1={680} y1={130} x2={622} y2={130} stroke={T.primary} strokeWidth="1.2" />
          <text x={660} y={124} fontSize="11" fill={T.secondary}>用户操作</text>
          {/* Step 2: Controller → Model */}
          <line x1={602} y1={160} x2={118} y2={160} stroke="#E5B567" strokeWidth="1.2" />
          <text x={360} y={154} textAnchor="middle" fontSize="11" fill="#E5B567">① 调用业务方法</text>
          {/* Step 3: Model 变更 */}
          <rect x={88} y={170} width={40} height={24} rx="3" fill="#3FB97F" fillOpacity="0.15" stroke="#3FB97F" strokeWidth="0.8" />
          <text x={108} y={186} textAnchor="middle" fontSize="11" fill="#3FB97F">变更</text>
          {/* Step 4: Model → View 通知 */}
          <line x1={118} y1={210} x2={350} y2={210} stroke="#3FB97F" strokeWidth="1.2" />
          <text x={234} y={204} textAnchor="middle" fontSize="11" fill="#3FB97F">② 通知变更</text>
          {/* Step 5: View → Model 读取 */}
          <line x1={350} y1={240} x2={118} y2={240} stroke={T.accent} strokeWidth="1" strokeDasharray="4 2" />
          <text x={234} y={234} textAnchor="middle" fontSize="11" fill={T.accent}>③ 读取状态</text>
          {/* Step 6: View 渲染 */}
          <rect x={340} y={254} width={40} height={24} rx="3" fill={T.accent} fillOpacity="0.15" stroke={T.accent} strokeWidth="0.8" />
          <text x={360} y={270} textAnchor="middle" fontSize="11" fill={T.accent}>渲染</text>
          {/* Step 7: View → 用户 */}
          <line x1={370} y1={296} x2={680} y2={296} stroke={T.accent} strokeWidth="1" strokeDasharray="4 2" />
          <text x={525} y={290} textAnchor="middle" fontSize="11" fill={T.accent}>④ 返回 HTML</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="Controller 接收输入 → Model 处理业务 → View 渲染输出，三者解耦" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MVC 将输入处理（Controller）、业务状态（Model）和输出渲染（View）分离。
        Model 变更通知 View 刷新，View 可独立替换而不影响业务逻辑。
      </figcaption>
    </figure>
  );
}
