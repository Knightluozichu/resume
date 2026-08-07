/**
 * Poeaa24Chapter17SessionStateDiagram：第17章会话状态位置比较图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Chapter17SessionStateDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第17章 会话状态模式。订单向导请求可把状态放在客户端、服务器节点内存或共享数据库；三种位置分别承担签名与重放、路由与故障、持久化与并发版本责任。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={32} text="第17章：会话状态权威位置" />

          <rect
            x={34}
            y={64}
            width={196}
            height={110}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={132}
            y={90}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Client Session State
          </text>
          <text
            x={132}
            y={116}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            签名 / 大小 / 重放
          </text>
          <text
            x={132}
            y={138}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            减少服务端存储
          </text>
          <text
            x={132}
            y={160}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            服务端重算事实
          </text>

          <rect
            x={262}
            y={64}
            width={196}
            height={110}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={360}
            y={90}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Server Session State
          </text>
          <text
            x={360}
            y={116}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            节点路由 / 内存
          </text>
          <text
            x={360}
            y={138}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            低延迟访问
          </text>
          <text
            x={360}
            y={160}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            故障可能丢失
          </text>

          <rect
            x={490}
            y={64}
            width={196}
            height={110}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={588}
            y={90}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            Database Session State
          </text>
          <text
            x={588}
            y={116}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            跨节点 / 持久化
          </text>
          <text
            x={588}
            y={138}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            版本 / 清理
          </text>
          <text
            x={588}
            y={160}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            延迟与存储成本
          </text>

          <line
            x1={230}
            y1={119}
            x2={262}
            y2={119}
            stroke={T.border}
            strokeWidth="1.2"
          />
          <line
            x1={458}
            y1={119}
            x2={490}
            y2={119}
            stroke={T.border}
            strokeWidth="1.2"
          />

          <rect
            x={118}
            y={192}
            width={484}
            height={28}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={360}
            y={211}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            同一应用切片：权威、恢复、过期和并发都必须可验证
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="状态位置不是存储细节，而是责任与风险的选择"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种会话状态位置分别把安全、路由或持久化责任推到不同边界，不能只按访问速度选择。
      </figcaption>
    </figure>
  );
}
