/**
 * Chapter 24 native and COM boundary map.
 *
 * The diagram follows one invariant across P/Invoke, callbacks, shared
 * memory, and COM: every boundary needs an explicit ABI, owner, and teardown.
 */
type BoundaryNode = {
  label: string;
  contract: string;
  evidence: string;
  color: string;
};

const BOUNDARY_NODES: readonly BoundaryNode[] = [
  {
    label: "Native DLL Calls",
    contract: "ABI + entry point",
    evidence: "arch · convention · error",
    color: "var(--accent)",
  },
  {
    label: "Type & Parameter Marshaling",
    contract: "pin · copy · transfer",
    evidence: "width · layout · encoding",
    color: "var(--success)",
  },
  {
    label: "Unmanaged Callbacks",
    contract: "reverse ownership",
    evidence: "root · unregister · quiesce",
    color: "var(--warning)",
  },
  {
    label: "Shared Memory",
    contract: "bytes + protocol",
    evidence: "version · publish · recover",
    color: "var(--danger)",
  },
  {
    label: "COM Interoperability",
    contract: "identity + apartment",
    evidence: "IUnknown · RCW · CCW",
    color: "var(--accent)",
  },
  {
    label: "COM from C#",
    contract: "consume stable IID",
    evidence: "STA · proxy · HRESULT",
    color: "var(--success)",
  },
  {
    label: "C# to COM",
    contract: "publish versioned API",
    evidence: "Guid · vtable · release",
    color: "var(--warning)",
  },
];

const CHAPTER_CONCEPTS =
  "Calling into Native DLLs; Type and Parameter Marshaling; Callbacks from Unmanaged Code; Shared Memory; COM Interoperability; Calling a COM Component from C#; Exposing C# Objects to COM";

export function Ctc10NativeComInteropBoundaryMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 560 680"
          role="img"
          aria-label={`Native and COM interoperability boundary map. Formal nodes: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="ctc10-24-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
          <title>Native and COM interoperability boundary map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            Every boundary needs ABI, owner, and teardown
          </text>
          <text x="280" y="51" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            managed call → representation → ownership → thread/apartment → release
          </text>

          <rect x="80" y="72" width="400" height="58" rx="12" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="280" y="97" textAnchor="middle" fill="var(--accent)" fontSize="13" fontWeight="700">
            Boundary contract
          </text>
          <text x="280" y="116" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            signature · bytes · owner · thread · error · cleanup
          </text>

          {BOUNDARY_NODES.map((node, index) => {
            const column = index === 6 ? 0 : index % 2;
            const row = Math.floor(index / 2);
            const x = column === 0 ? 20 : 290;
            const y = 154 + row * 100;
            const centerX = x + 125;
            const parentY = row === 0 ? 130 : y - 22;

            return (
              <g key={node.label}>
                <path
                  d={`M${centerX} ${parentY} L${centerX} ${y}`}
                  stroke="var(--text-secondary)"
                  strokeWidth="1"
                  strokeDasharray={row === 0 ? undefined : "4 4"}
                  markerEnd="url(#ctc10-24-arrow)"
                />
                <rect x={x} y={y} width="250" height="78" rx="10" fill="var(--bg)" stroke={node.color} strokeWidth="1.5" />
                <circle cx={x + 18} cy={y + 18} r="6" fill={node.color} />
                <text x={x + 32} y={y + 22} fill={node.color} fontSize="12" fontWeight="700">
                  {node.label}
                </text>
                <text x={x + 18} y={y + 48} fill="var(--text-primary)" fontSize="11" fontWeight="600">
                  {node.contract}
                </text>
                <text x={x + 18} y={y + 65} fill="var(--text-secondary)" fontSize="11">
                  {node.evidence}
                </text>
              </g>
            );
          })}

          <path d="M20 578 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="602" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Teardown checkpoint
          </text>
          <text x="280" y="623" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            stop calls, drain callbacks, release the matching allocator, and preserve version compatibility
          </text>
          <text x="280" y="643" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            test architecture, boundary errors, apartment transitions, and crash recovery
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        图 24-1：Interop 不是类型转换，而是跨 ABI、内存、线程和版本边界的 owner 协议。
      </figcaption>
    </figure>
  );
}
