/**
 * Tpp20Chapter08FeedbackBoundaryDiagram：第8章反馈与边界证据图。
 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Chapter08FeedbackBoundaryDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第8章 项目启动之前的反馈边界。项目从正常用户场景开始，经过边界权限和副作用检查，再注入一次反馈依赖失效；首个偏差触发回退、术语修正或切片缩小，最后由用户确认重新验证。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="第8章：正常、边界、失效与回退"
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
            正常场景
          </text>
          <text
            x={109}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户确认目标
          </text>
          <text
            x={109}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            最小切片
          </text>

          <line
            x1={184}
            y1={116}
            x2={218}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={218}
            y={70}
            width={150}
            height={92}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={293}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            边界样本
          </text>
          <text
            x={293}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            权限 / 撤回
          </text>
          <text
            x={293}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            外部副作用
          </text>

          <line
            x1={368}
            y1={116}
            x2={402}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={402}
            y={58}
            width={150}
            height={116}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={477}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            反馈依赖失效
          </text>
          <text
            x={477}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            首个偏差
          </text>
          <text
            x={477}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            错误假设暴露
          </text>
          <text
            x={477}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            回退 / 缩小
          </text>

          <line
            x1={552}
            y1={116}
            x2={582}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={582}
            y={70}
            width={104}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={634}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            再验证
          </text>
          <text
            x={634}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户结果
          </text>
          <text
            x={634}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            术语更新
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
            反馈更快不等于价值更高：同时检查质量、安全和用户理解
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="错误假设越早暴露，回退成本越低"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        第 8 章用正常、边界和反馈失效样本验证项目是否真正具备适应能力。
      </figcaption>
    </figure>
  );
}
