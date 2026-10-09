export function Eex19Recommendation02ReadingMap() {
  return (
    <figure className="my-6 rounded-xl border border-border bg-surface p-4 sm:p-6">
      <svg
        aria-labelledby="eex19-rec02-map-title eex19-rec02-map-description"
        className="h-auto w-full text-primary"
        role="img"
        viewBox="0 0 760 270"
      >
        <title id="eex19-rec02-map-title">推荐序的审慎阅读路径</title>
        <desc id="eex19-rec02-map-description">
          目录只确认篇目和署名；取得正文后核验主张与证据；最后把读者的工作应用作为独立迁移假设检验。
        </desc>
        <defs>
          <marker
            id="eex19-rec02-arrow"
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="4"
          >
            <path d="M0 0 8 4 0 8z" fill="currentColor" />
          </marker>
        </defs>
        <g
          fill="none"
          markerEnd="url(#eex19-rec02-arrow)"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M225 93h52" />
          <path d="M485 93h52" />
          <path d="M612 147v45H145v-42" strokeDasharray="7 6" />
        </g>
        <g>
          <rect
            fill="var(--bg-elevated)"
            height="112"
            rx="14"
            stroke="currentColor"
            width="205"
            x="20"
            y="38"
          />
          <text
            fontSize="17"
            fontWeight="700"
            textAnchor="middle"
            x="122"
            y="72"
          >
            目录坐标
          </text>
          <text fontSize="14" textAnchor="middle" x="122" y="101">
            篇目 + 署名
          </text>
          <text fontSize="12" textAnchor="middle" x="122" y="126">
            目前可确认
          </text>

          <rect
            fill="var(--bg-elevated)"
            height="112"
            rx="14"
            stroke="currentColor"
            width="205"
            x="277"
            y="38"
          />
          <text
            fontSize="17"
            fontWeight="700"
            textAnchor="middle"
            x="379"
            y="72"
          >
            原文核验
          </text>
          <text fontSize="14" textAnchor="middle" x="379" y="101">
            主张 + 证据锚点
          </text>
          <text fontSize="12" textAnchor="middle" x="379" y="126">
            取得正文后填写
          </text>

          <rect
            fill="var(--bg-elevated)"
            height="112"
            rx="14"
            stroke="currentColor"
            width="205"
            x="535"
            y="38"
          />
          <text
            fontSize="17"
            fontWeight="700"
            textAnchor="middle"
            x="637"
            y="72"
          >
            读者迁移
          </text>
          <text fontSize="14" textAnchor="middle" x="637" y="101">
            场景 + 可观察结果
          </text>
          <text fontSize="12" textAnchor="middle" x="637" y="126">
            独立检验，不作归因
          </text>
        </g>
        <text
          fill="currentColor"
          fontSize="13"
          textAnchor="middle"
          x="380"
          y="230"
        >
          若没有原文，停在目录坐标：保留空白，不用猜测填补
        </text>
      </svg>
      <figcaption className="mt-3 text-sm text-secondary">
        阅读路径中的三种材料各有边界：目录提供定位，正文提供待核实内容，工作试验产生读者自己的观察。
      </figcaption>
    </figure>
  );
}
