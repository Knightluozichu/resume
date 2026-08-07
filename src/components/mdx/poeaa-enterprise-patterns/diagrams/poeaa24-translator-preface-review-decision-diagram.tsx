/**
 * Poeaa24TranslatorPrefaceReviewDecisionDiagram：译者序术语复核决策图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24TranslatorPrefaceReviewDecisionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="译者序术语复核决策图。先核对英文原名与中文译名，再绑定 Official Unit ID 和 Source Basis，最后放回问题语境；任一步缺失就回到来源记录，不把译名直接当成技术决策。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="术语复核：名称 → 坐标 → 来源 → 语境"
          />

          <rect
            x={34}
            y={60}
            width={198}
            height={112}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={133}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            名称对齐
          </text>
          <text
            x={133}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            English + 中文
          </text>
          <text
            x={133}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            术语同义词
          </text>
          <text
            x={133}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            写出误读边界
          </text>

          <line
            x1={232}
            y1={116}
            x2={260}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={260}
            y={60}
            width={198}
            height={112}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.07"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={359}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            坐标与来源
          </text>
          <text
            x={359}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Official Unit ID
          </text>
          <text
            x={359}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Source Basis
          </text>
          <text
            x={359}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            记录版次范围
          </text>

          <line
            x1={458}
            y1={116}
            x2={486}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={486}
            y={60}
            width={200}
            height={112}
            rx="8"
            fill={T.danger}
            fillOpacity="0.07"
            stroke={T.danger}
            strokeWidth="1.2"
          />
          <text
            x={586}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.danger}
          >
            放回语境
          </text>
          <text
            x={586}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            问题与责任
          </text>
          <text
            x={586}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            适用与拒绝条件
          </text>
          <text
            x={586}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            缺失则退回复核
          </text>

          <rect
            x={88}
            y={190}
            width={544}
            height={30}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={360}
            y={210}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            复核证据：名称一致 × 坐标唯一 × 来源诚实 × 语境可解释
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="术语是阅读入口，不是脱离语境的技术结论"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        译者序把翻译判断和架构判断分开：先能复核术语，再进入模式选择。
      </figcaption>
    </figure>
  );
}
