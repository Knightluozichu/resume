/**
 * Original static diagram for the recommendation-03 independent reading guide.
 * The sequence is a teaching aid, not a diagram or claim attributed to the book.
 */
export function Eex19Recommendation03TransferMap() {
  const steps = [
    { x: 18, title: "场景", detail: "谁在何种工作中？" },
    { x: 217, title: "行动", detail: "这次改变什么？" },
    { x: 416, title: "采用", detail: "接收者怎样使用？" },
    { x: 615, title: "结果", detail: "出现什么变化？" },
  ];

  return (
    <figure className="not-prose my-6 rounded-card border border-border bg-elevated p-4 text-primary">
      <figcaption className="mb-3 text-sm font-semibold">
        阅读主张的四步检验图
      </figcaption>
      <svg
        aria-labelledby="eex19-rec03-map-title eex19-rec03-map-desc"
        className="h-auto w-full"
        role="img"
        viewBox="0 0 800 190"
      >
        <title id="eex19-rec03-map-title">从工作场景到可观察结果</title>
        <desc id="eex19-rec03-map-desc">
          场景连接行动，行动产生交付并由接收者采用，最后观察结果；边界条件贯穿整个检验过程。
        </desc>
        <defs>
          <marker
            id="eex19-rec03-map-arrow"
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
          markerEnd="url(#eex19-rec03-map-arrow)"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M174 62h35" />
          <path d="M373 62h35" />
          <path d="M572 62h35" />
        </g>
        {steps.map((step) => (
          <g key={step.title}>
            <rect
              fill="var(--bg-surface)"
              height="76"
              rx="12"
              stroke="currentColor"
              width="156"
              x={step.x}
              y="24"
            />
            <text
              fill="currentColor"
              fontSize="18"
              fontWeight="600"
              textAnchor="middle"
              x={step.x + 78}
              y="52"
            >
              {step.title}
            </text>
            <text
              fill="currentColor"
              fontSize="12"
              textAnchor="middle"
              x={step.x + 78}
              y="78"
            >
              {step.detail}
            </text>
          </g>
        ))}
        <path
          d="M92 124v18h616v-18"
          fill="none"
          stroke="currentColor"
          strokeDasharray="6 5"
          strokeWidth="1.5"
        />
        <text
          fill="currentColor"
          fontSize="13"
          textAnchor="middle"
          x="400"
          y="164"
        >
          适用边界与反例：贯穿每一步，并决定是否迁移结论
        </text>
      </svg>
      <p className="mt-2 text-xs text-secondary">
        本站原创阅读脚手架：箭头表示需要追问的关系，不预设行动必然造成结果。
      </p>
    </figure>
  );
}
