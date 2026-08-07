/**
 * Poeaa24PrefaceReadingLoopDiagram：前言的 Duplex Book 阅读循环图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24PrefaceReadingLoopDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="前言 Duplex Book 阅读循环图。先从 Enterprise Application 的问题上下文提取责任和约束，再用 Pattern Language 与目录列出候选，最后用 Pattern Evidence 验证并记录拒绝条件；证据不足时回到问题语境。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="Duplex Book：叙述线与目录线互相校验"
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
            叙述线
          </text>
          <text
            x={133}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Enterprise Application
          </text>
          <text
            x={133}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            问题、责任、约束
          </text>
          <text
            x={133}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            先写上下文
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
            目录线
          </text>
          <text
            x={359}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Pattern Language
          </text>
          <text
            x={359}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            候选、关系、替代
          </text>
          <text
            x={359}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            再核对坐标
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
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={586}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            证据线
          </text>
          <text
            x={586}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Pattern Evidence
          </text>
          <text
            x={586}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            验证 + 拒绝条件
          </text>
          <text
            x={586}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            不足则回到问题
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
            阅读循环：问题语境 → 候选模式 → 证据复核 → 回到问题
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="模式名只是假设，证据才完成一次架构阅读"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Duplex Book
        把叙述理解、目录导航与项目验证连成循环，避免从模式名直接跳到实现。
      </figcaption>
    </figure>
  );
}
