/**
 * <Poeaa24Ch15DistributionCallStack>：分布模式调用栈图（POEAA 第15章概览）。
 *
 * 展示 Remote Facade + DTO 的调用栈和序列化边界。
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 400;

export function Poeaa24Ch15DistributionCallStack() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="分布模式调用栈图。左侧是客户端进程，右侧是服务端进程，中间是网络边界。客户端通过 Remote Facade 发起粗粒度调用，参数和返回值用 DTO 打包。网络边界处标注序列化/反序列化。服务端 Remote Facade 接收后解包 DTO，调用内部细粒度领域对象。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={36} text="分布模式：Remote Facade + DTO 调用栈" />

          {/* 客户端进程 */}
          <rect x={48} y={60} width={260} height={260} rx="10" fill="#3FB97F" fillOpacity="0.04" stroke="#3FB97F" strokeWidth="1.5" />
          <text x={178} y={84} textAnchor="middle" fontSize="12" fontWeight="700" fill="#3FB97F">客户端进程</text>
          <line x1={48} y1={94} x2={308} y2={94} stroke="#3FB97F" strokeWidth="0.8" strokeOpacity="0.4" />

          {/* 客户端内部 */}
          <rect x={64} y={108} width={228} height={36} rx="6" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1" />
          <text x={178} y={131} textAnchor="middle" fontSize="11" fill={T.primary}>业务代码（调用 Facade）</text>

          <rect x={64} y={156} width={228} height={36} rx="6" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1" />
          <text x={178} y={179} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.accent}>Remote Facade（粗粒度接口）</text>

          <rect x={64} y={204} width={228} height={36} rx="6" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1" />
          <text x={178} y={227} textAnchor="middle" fontSize="11" fontWeight="600" fill="#E5B567">DTO（打包请求数据）</text>

          <rect x={64} y={252} width={228} height={36} rx="6" fill={T.secondary} fillOpacity="0.08" stroke={T.secondary} strokeWidth="1" />
          <text x={178} y={275} textAnchor="middle" fontSize="11" fill={T.primary}>序列化 → 网络传输</text>

          {/* 网络边界 */}
          <line x1={360} y1={60} x2={360} y2={320} stroke={T.danger} strokeWidth="2" strokeDasharray="6 4" />
          <text x={360} y={340} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.danger}>网络边界</text>

          {/* 服务端进程 */}
          <rect x={412} y={60} width={260} height={260} rx="10" fill={T.accent} fillOpacity="0.04" stroke={T.accent} strokeWidth="1.5" />
          <text x={542} y={84} textAnchor="middle" fontSize="12" fontWeight="700" fill={T.accent}>服务端进程</text>
          <line x1={412} y1={94} x2={672} y2={94} stroke={T.accent} strokeWidth="0.8" strokeOpacity="0.4" />

          {/* 服务端内部 */}
          <rect x={428} y={108} width={228} height={36} rx="6" fill={T.secondary} fillOpacity="0.08" stroke={T.secondary} strokeWidth="1" />
          <text x={542} y={131} textAnchor="middle" fontSize="11" fill={T.primary}>反序列化 → 解包 DTO</text>

          <rect x={428} y={156} width={228} height={36} rx="6" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1" />
          <text x={542} y={179} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.accent}>Remote Facade（接收调用）</text>

          <rect x={428} y={204} width={228} height={36} rx="6" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1" />
          <text x={542} y={227} textAnchor="middle" fontSize="11" fill={T.primary}>领域对象（细粒度操作）</text>

          <rect x={428} y={252} width={228} height={36} rx="6" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1" />
          <text x={542} y={275} textAnchor="middle" fontSize="11" fill={T.primary}>DTO（打包响应数据）</text>

          {/* 调用箭头 */}
          <defs>
            <marker id="ch15-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0 0 L6 3.5 L0 7 z" fill={T.secondary} />
            </marker>
          </defs>
          <line x1={308} y1={270} x2={412} y2={126} stroke={T.secondary} strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#ch15-arr)" />

          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="Facade 减少调用次数，DTO 减少传输次数——两者配合跨越网络边界" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分布模式族只有两个模式但解决核心问题：Remote Facade 提供粗粒度接口减少调用次数，
        DTO 把多个字段打包成一次传输。两者配合让分布式调用尽可能少地跨越网络边界。
      </figcaption>
    </figure>
  );
}
