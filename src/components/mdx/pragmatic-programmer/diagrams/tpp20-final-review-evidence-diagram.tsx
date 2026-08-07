/**
 * Tpp20FinalReviewEvidenceDiagram：全书总复习的验证、回退与独立复核。
 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20FinalReviewEvidenceDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="《程序员修炼之道（第2版）》全书总复习证据路径。Review Contract 冻结输入和验收命题，经过正常样本与 Boundary Case，注入一次依赖故障，越界时执行 Rollback，最后由 Independent Replay 重建结论。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="全书总复习：验证、回退与独立复核"
          />

          <rect
            x={34}
            y={70}
            width={142}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={105}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Review Contract
          </text>
          <text
            x={105}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            输入 / 边界
          </text>
          <text
            x={105}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            验收命题
          </text>

          <line
            x1={176}
            y1={116}
            x2={210}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={210}
            y={70}
            width={142}
            height={92}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={281}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            样本
          </text>
          <text
            x={281}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            正常 / 边界
          </text>
          <text
            x={281}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            唯一变化
          </text>

          <line
            x1={352}
            y1={116}
            x2={386}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={386}
            y={58}
            width={154}
            height={116}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={463}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            故障与首差
          </text>
          <text
            x={463}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            一次依赖失效
          </text>
          <text
            x={463}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            质量 / 用户越界
          </text>
          <text
            x={463}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Rollback
          </text>

          <line
            x1={540}
            y1={116}
            x2={574}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={574}
            y={70}
            width={112}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={630}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            Replay
          </text>
          <text
            x={630}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            独立重建
          </text>
          <text
            x={630}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            接受 / 撤回
          </text>

          <rect
            x={112}
            y={192}
            width={496}
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
            一次成功不是普遍结论，回退和复核必须可重放
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="让复习结论经得起失败和换人复核"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        跨章复习用边界、故障、回退和独立复核把学习结论变成可迁移证据。
      </figcaption>
    </figure>
  );
}
