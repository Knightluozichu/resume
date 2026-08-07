/**
 * <Poeaa24Ch07RemoteCallCost>：远程调用成本对比图（POEAA 第7章）。
 *
 * 展示本地调用 vs 远程调用的延迟/失败/序列化开销对比，
 * 以及 DTO + Remote Facade 如何减少远程调用次数。
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 420;

export function Poeaa24Ch07RemoteCallCostDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="远程调用成本对比图。上半部分对比本地调用和远程调用：本地调用纳秒级、不会网络失败、直接传引用；远程调用毫秒级、可能超时或丢包、需要序列化和反序列化。下半部分展示 DTO + Remote Facade 的优化：把多次细粒度远程调用合并为一次粗粒度调用，减少网络往返。覆盖 7.1 分布对象的诱惑、7.2 远程接口和本地接口、7.3 必须使用分布的情况、7.4 关于分布边界、7.5 分布接口。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={36}
            text="分布策略：远程调用的代价与优化"
          />

          {/* 上半：本地 vs 远程对比 */}
          {/* 本地调用 */}
          <rect
            x={32}
            y={60}
            width={316}
            height={140}
            rx="10"
            fill="#3FB97F"
            fillOpacity="0.04"
            stroke="#3FB97F"
            strokeWidth="1.5"
          />
          <text
            x={190}
            y={84}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#3FB97F"
          >
            本地调用（同进程）
          </text>
          <line
            x1={32}
            y1={94}
            x2={348}
            y2={94}
            stroke="#3FB97F"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          <text x={48} y={116} fontSize="11" fill={T.primary}>
            延迟：~100 纳秒
          </text>
          <text x={48} y={138} fontSize="11" fill={T.primary}>
            失败：几乎不会（除非 OOM）
          </text>
          <text x={48} y={160} fontSize="11" fill={T.primary}>
            传参：直接传引用 / 指针
          </text>
          <text x={48} y={182} fontSize="11" fill={T.primary}>
            调用粒度：可以很细（getter/setter）
          </text>

          {/* 远程调用 */}
          <rect
            x={372}
            y={60}
            width={316}
            height={140}
            rx="10"
            fill={T.danger}
            fillOpacity="0.04"
            stroke={T.danger}
            strokeWidth="1.5"
          />
          <text
            x={530}
            y={84}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={T.danger}
          >
            远程调用（跨网络）
          </text>
          <line
            x1={372}
            y1={94}
            x2={688}
            y2={94}
            stroke={T.danger}
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          <text x={388} y={116} fontSize="11" fill={T.primary}>
            延迟：~1-100 毫秒（×10000）
          </text>
          <text x={388} y={138} fontSize="11" fill={T.primary}>
            失败：超时、丢包、连接断开
          </text>
          <text x={388} y={160} fontSize="11" fill={T.primary}>
            传参：序列化 → 传输 → 反序列化
          </text>
          <text x={388} y={182} fontSize="11" fill={T.primary}>
            调用粒度：必须粗（否则延迟爆炸）
          </text>

          {/* VS */}
          <text
            x={VIEW_W / 2}
            y={136}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.secondary}
          >
            VS
          </text>

          {/* 下半：DTO + Remote Facade 优化 */}
          <line
            x1={32}
            y1={220}
            x2={688}
            y2={220}
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={VIEW_W / 2}
            y={244}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={T.primary}
          >
            优化：Remote Facade + DTO 减少网络往返
          </text>

          {/* 优化前：多次细粒度调用 */}
          <text x={48} y={272} fontSize="11" fontWeight="600" fill={T.danger}>
            优化前（N 次远程调用）：
          </text>
          {["getName()", "getAddress()", "getOrders()", "getBalance()"].map(
            (call, i) => (
              <g key={call}>
                <rect
                  x={48 + i * 156}
                  y={280}
                  width={140}
                  height={28}
                  rx="4"
                  fill={T.danger}
                  fillOpacity="0.08"
                  stroke={T.danger}
                  strokeWidth="1"
                />
                <text
                  x={48 + i * 156 + 70}
                  y={298}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="monospace"
                  fill={T.primary}
                >
                  {call}
                </text>
              </g>
            ),
          )}
          <text x={48} y={324} fontSize="11" fill={T.danger}>
            4 次网络往返 × 10ms = 40ms 延迟
          </text>

          {/* 优化后：一次粗粒度调用 */}
          <text x={48} y={352} fontSize="11" fontWeight="600" fill="#3FB97F">
            优化后（1 次远程调用）：
          </text>
          <rect
            x={48}
            y={360}
            width={300}
            height={28}
            rx="4"
            fill="#3FB97F"
            fillOpacity="0.08"
            stroke="#3FB97F"
            strokeWidth="1"
          />
          <text
            x={198}
            y={378}
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            getCustomerDTO() → 一次返回全部数据
          </text>
          <text x={380} y={378} fontSize="11" fill="#3FB97F">
            1 次网络往返 × 10ms = 10ms 延迟
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="分布的第一原则：减少远程调用次数，每次调用传递更多信息"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        远程调用比本地调用慢万倍且随时可能失败。分布策略的核心是减少网络往返：
        Remote Facade 提供粗粒度接口，DTO 把多个字段打包成一次传输。
      </figcaption>
    </figure>
  );
}
