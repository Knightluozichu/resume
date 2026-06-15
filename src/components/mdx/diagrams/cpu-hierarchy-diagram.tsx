/**
 * <CPUHierarchyDiagram />：CPU Profiler 调用树层级示意。
 *
 * 顶层 PlayerLoop → 三个子节点 Update.ScriptRunBehaviourUpdate / PreLateUpdate.Physics /
 * PostLateUpdate.Render，每个节点标注占比时间。
 */

export function CPUHierarchyDiagram() {
  const children = [
    { label: "Update.Script​RunBehaviourUpdate", pct: "38%", x: 40 },
    { label: "PreLateUpdate​.Physics", pct: "22%", x: 215 },
    { label: "PostLateUpdate​.Render", pct: "31%", x: 380 },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 250"
          role="img"
          aria-label="CPU Profiler 调用树：PlayerLoop 下分 Script / Physics / Render 三子节点"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <defs>
            <marker
              id="cpuHierarchy-arrow"
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
            CPU Profiler Hierarchy
          </text>

          {/* Root: PlayerLoop */}
          <rect
            x="190"
            y="44"
            width="180"
            height="44"
            rx="8"
            fill="var(--surface-raised)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="280"
            y="62"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            PlayerLoop
          </text>
          <text
            x="280"
            y="78"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            100% | 16.6 ms
          </text>

          {/* Arrows */}
          {children.map((child) => (
            <line
              key={child.label}
              x1="280"
              y1="88"
              x2={child.x + 75}
              y2="130"
              stroke="var(--accent)"
              strokeWidth="1.5"
              markerEnd="url(#cpuHierarchy-arrow)"
            />
          ))}

          {/* Child boxes */}
          {children.map((child) => (
            <g key={child.label}>
              <rect
                x={child.x}
                y="134"
                width="150"
                height="52"
                rx="8"
                fill="var(--surface-raised)"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              <text
                x={child.x + 75}
                y="155"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {child.label}
              </text>
              <text
                x={child.x + 75}
                y="174"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--accent)"
              >
                {child.pct}
              </text>
            </g>
          ))}

          {/* Bottom note */}
          <text
            x="280"
            y="218"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Hierarchy 视图按调用树层级展开，定位最耗时子节点
          </text>
          <text
            x="280"
            y="236"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            剩余 9% = GC / UI / Audio 等其他子系统
          </text>
        </svg>
      </div>
    </figure>
  );
}
