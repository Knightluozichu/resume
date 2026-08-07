/**
 * Poeaa24Chapter17SessionStateFailureDiagram：第17章会话状态故障与过期图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Chapter17SessionStateFailureDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第17章 会话状态模式故障路径。订单向导从会话键和当前版本开始，经过正常续期；并发旧版本进入冲突拒绝，节点故障进入共享恢复或安全丢失，过期进入清理与重新开始。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="第17章：续期、冲突、故障与过期"
          />

          <rect
            x={34}
            y={70}
            width={150}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={109}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            会话键 + 版本
          </text>
          <text
            x={109}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            读取权威状态
          </text>
          <text
            x={109}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            正常续期
          </text>

          <line
            x1={184}
            y1={116}
            x2={220}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={220}
            y={58}
            width={176}
            height={116}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={308}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            更新与提交
          </text>
          <text
            x={308}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            原子版本检查
          </text>
          <text
            x={308}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            幂等重试
          </text>
          <text
            x={308}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            写入新版本
          </text>

          <line
            x1={396}
            y1={116}
            x2={428}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={428}
            y={52}
            width={118}
            height={54}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={487}
            y={75}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            旧版本
          </text>
          <text
            x={487}
            y={94}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            冲突拒绝
          </text>

          <rect
            x={428}
            y={120}
            width={118}
            height={54}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={487}
            y={143}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            节点故障
          </text>
          <text
            x={487}
            y={162}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            恢复或安全丢失
          </text>

          <line
            x1={546}
            y1={80}
            x2={574}
            y2={80}
            stroke="#D77A61"
            strokeWidth="1.4"
          />
          <line
            x1={546}
            y1={148}
            x2={574}
            y2={148}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={574}
            y={88}
            width={112}
            height={58}
            rx="8"
            fill={T.primary}
            fillOpacity="0.04"
            stroke={T.border}
            strokeWidth="1.2"
          />
          <text
            x={630}
            y={112}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            过期清理
          </text>
          <text
            x={630}
            y={132}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            提示 / 重启
          </text>

          <rect
            x={108}
            y={192}
            width={504}
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
            记录版本、原因、用户补救和清理延迟，才能重放失败
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="失败路径必须比成功路径更明确"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        会话状态设计同时验证续期成功、旧版本冲突、节点故障和过期后的安全恢复。
      </figcaption>
    </figure>
  );
}
