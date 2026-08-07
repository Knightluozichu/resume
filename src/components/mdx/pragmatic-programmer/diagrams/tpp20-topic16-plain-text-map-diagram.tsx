/**
 * Tpp20Topic16PlainTextMapDiagram：提示 25 的“可迁移表面”全景图。
 *
 * 这张图把一份知识从封闭应用移到纯文本源，再分发给人、差异工具和脚本。
 * 它与交互实验台互补：这里看结构，实验台逐站观察首个拒绝点。
 */
import {
  DiagramCaption,
  DiagramTitle,
  T,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 760;
const VIEW_H = 330;

const SOURCE = { x: 32, y: 92, w: 174, h: 108 };
const TEXT = { x: 292, y: 72, w: 184, h: 148 };
const READERS = [
  { x: 558, y: 58, w: 164, h: 72, title: "人", sub: "阅读 / 审阅" },
  { x: 558, y: 164, w: 164, h: 72, title: "脚本", sub: "校验 / 生成" },
] as const;

export function Tpp20Topic16PlainTextMapDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic16-plain-text-map"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="提示25：将知识用纯文本保存。知识从封闭应用迁移到可读的纯文本源，编码、结构格式、版本控制和差异比较围绕文本源形成证据，最后由人和脚本独立读取。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker
              id="tpp20-topic16-map-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={T.secondary} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="提示25：将知识用纯文本保存"
          />

          <rect
            x={SOURCE.x}
            y={SOURCE.y}
            width={SOURCE.w}
            height={SOURCE.h}
            rx="10"
            fill={T.primary}
            fillOpacity="0.04"
            stroke={T.border}
            strokeWidth="1.3"
          />
          <text
            x={SOURCE.x + SOURCE.w / 2}
            y={SOURCE.y + 34}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={T.primary}
          >
            封闭应用
          </text>
          <text
            x={SOURCE.x + SOURCE.w / 2}
            y={SOURCE.y + 60}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            知识 + 隐含状态
          </text>
          <text
            x={SOURCE.x + SOURCE.w / 2}
            y={SOURCE.y + 82}
            textAnchor="middle"
            fontSize="11"
            fill={T.danger}
          >
            唯一出口 = 风险
          </text>

          <line
            x1={SOURCE.x + SOURCE.w + 8}
            y1={SOURCE.y + SOURCE.h / 2}
            x2={TEXT.x - 10}
            y2={TEXT.y + TEXT.h / 2}
            stroke={T.accent}
            strokeWidth="1.8"
            markerEnd="url(#tpp20-topic16-map-arrow)"
          />
          <text
            x="248"
            y="132"
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            提取最小知识
          </text>

          <rect
            x={TEXT.x}
            y={TEXT.y}
            width={TEXT.w}
            height={TEXT.h}
            rx="10"
            fill={T.accent}
            fillOpacity="0.08"
            stroke={T.accent}
            strokeWidth="1.8"
          />
          <text
            x={TEXT.x + TEXT.w / 2}
            y={TEXT.y + 35}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={T.accent}
          >
            纯文本源
          </text>
          <text
            x={TEXT.x + TEXT.w / 2}
            y={TEXT.y + 65}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            编码 · 结构格式
          </text>
          <text
            x={TEXT.x + TEXT.w / 2}
            y={TEXT.y + 88}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            版本控制 · 差异比较
          </text>
          <text
            x={TEXT.x + TEXT.w / 2}
            y={TEXT.y + 118}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={T.success}
          >
            可读 / 可追踪 / 可迁移
          </text>

          {READERS.map((reader) => (
            <g key={reader.title}>
              <line
                x1={TEXT.x + TEXT.w + 8}
                y1={TEXT.y + TEXT.h / 2}
                x2={reader.x - 10}
                y2={reader.y + reader.h / 2}
                stroke={T.secondary}
                strokeWidth="1.4"
                markerEnd="url(#tpp20-topic16-map-arrow)"
              />
              <rect
                x={reader.x}
                y={reader.y}
                width={reader.w}
                height={reader.h}
                rx="9"
                fill={T.success}
                fillOpacity="0.07"
                stroke={T.success}
                strokeWidth="1.3"
              />
              <text
                x={reader.x + reader.w / 2}
                y={reader.y + 29}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={T.success}
              >
                {reader.title}
              </text>
              <text
                x={reader.x + reader.w / 2}
                y={reader.y + 51}
                textAnchor="middle"
                fontSize="11"
                fill={T.secondary}
              >
                {reader.sub}
              </text>
            </g>
          ))}

          <text x="32" y="260" fontSize="11" fill={T.secondary}>
            验收问题：换掉原应用后，谁还能重建这份知识？
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="纯文本不是终点；它是让编码、结构、历史和读取者都能被检查的共同边界"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一份知识保留为文本源，才有机会被人、差异工具和脚本共同复核。
      </figcaption>
    </figure>
  );
}
