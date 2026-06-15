/**
 * <ScriptsVsEngineDiagram />：Scripts (C#) vs Engine (C++) 分区对比。
 *
 * 左侧 Scripts 框列出 MonoBehaviour.Update / Coroutine / Physics callbacks，
 * 右侧 Engine 框列出 Rendering / Physics / Animation，中间箭头标"Profiler 分区"。
 */

export function ScriptsVsEngineDiagram() {
  const scriptItems = [
    "MonoBehaviour.Update",
    "Coroutine",
    "Physics callbacks",
  ];
  const engineItems = ["Rendering", "Physics", "Animation"];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 220"
          role="img"
          aria-label="Profiler 分区：左 Scripts C# 右 Engine C++ 对比"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <defs>
            <marker
              id="scriptsVsEngine-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Title */}
          <text
            x="280"
            y="24"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Scripts vs Engine 时间分区
          </text>

          {/* Left box: Scripts */}
          <rect
            x="30"
            y="48"
            width="200"
            height="130"
            rx="8"
            fill="var(--surface-raised)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="130"
            y="72"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            Scripts (C#)
          </text>
          {scriptItems.map((item, i) => (
            <text
              key={item}
              x="56"
              y={98 + i * 22}
              fontSize="11"
              fill="var(--text-primary)"
            >
              {item}
            </text>
          ))}

          {/* Right box: Engine */}
          <rect
            x="330"
            y="48"
            width="200"
            height="130"
            rx="8"
            fill="var(--surface-raised)"
            stroke="var(--info)"
            strokeWidth="2"
          />
          <text
            x="430"
            y="72"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--info)"
          >
            Engine (C++)
          </text>
          {engineItems.map((item, i) => (
            <text
              key={item}
              x="356"
              y={98 + i * 22}
              fontSize="11"
              fill="var(--text-primary)"
            >
              {item}
            </text>
          ))}

          {/* Center arrow */}
          <line
            x1="235"
            y1="113"
            x2="325"
            y2="113"
            stroke="var(--accent)"
            strokeWidth="1.5"
            markerEnd="url(#scriptsVsEngine-arrow)"
          />
          <line
            x1="325"
            y1="113"
            x2="235"
            y2="113"
            stroke="var(--accent)"
            strokeWidth="1.5"
            markerEnd="url(#scriptsVsEngine-arrow)"
          />
          <text
            x="280"
            y="102"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            Profiler 分区
          </text>

          {/* Bottom note */}
          <text
            x="280"
            y="206"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Profiler 的 CPU Usage 按此分区着色，快速定位瓶颈在脚本还是引擎
          </text>
        </svg>
      </div>
    </figure>
  );
}
