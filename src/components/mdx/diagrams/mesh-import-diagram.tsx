/**
 * <MeshImportDiagram>：网格导入设置——Mesh Compression 与 Read/Write Enabled 对内存与 CPU 的影响。
 */

type MeshImportHighlight = "compression" | "readwrite" | "all";

export function MeshImportDiagram({
  highlight = "all",
}: {
  highlight?: MeshImportHighlight;
}) {
  const showCompression = highlight === "compression" || highlight === "all";
  const showReadWrite = highlight === "readwrite" || highlight === "all";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 260"
          role="img"
          aria-label="网格导入：Mesh Compression 降低显存占用；Read/Write Enabled 会复制一份可写网格到内存，运行时改顶点才需要"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text
            x="320"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Model Import Settings：网格内存与 CPU
          </text>

          {/* Compression side */}
          {showCompression && (
            <g>
              <text
                x="160"
                y="56"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                Mesh Compression
              </text>
              <rect
                x="48"
                y="68"
                width="104"
                height="72"
                rx="8"
                fill="var(--bg)"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text
                x="100"
                y="92"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                Off
              </text>
              <text
                x="100"
                y="110"
                textAnchor="middle"
                fontSize="10"
                fill="var(--danger)"
              >
                12 MB
              </text>
              <text
                x="100"
                y="128"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                原始精度
              </text>

              <path d="M168 104 l20 0 l-6 -5 l0 10 z" fill="var(--accent)" />

              <rect
                x="196"
                y="68"
                width="104"
                height="72"
                rx="8"
                fill="var(--bg-elevated)"
                stroke="var(--success)"
                strokeWidth="2"
              />
              <text
                x="248"
                y="92"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                Medium/High
              </text>
              <text
                x="248"
                y="110"
                textAnchor="middle"
                fontSize="10"
                fill="var(--success)"
              >
                ~4 MB
              </text>
              <text
                x="248"
                y="128"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                GPU 解压，略增 CPU
              </text>
            </g>
          )}

          {/* Read/Write side */}
          {showReadWrite && (
            <g>
              <text
                x="480"
                y="56"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                Read/Write Enabled
              </text>
              <rect
                x="368"
                y="68"
                width="104"
                height="72"
                rx="8"
                fill="var(--bg-elevated)"
                stroke="var(--success)"
                strokeWidth="2"
              />
              <text
                x="420"
                y="92"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                ✗ 关闭
              </text>
              <text
                x="420"
                y="110"
                textAnchor="middle"
                fontSize="10"
                fill="var(--success)"
              >
                只读一份
              </text>
              <text
                x="420"
                y="128"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                默认推荐
              </text>

              <rect
                x="488"
                y="68"
                width="104"
                height="72"
                rx="8"
                fill="var(--bg)"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text
                x="540"
                y="92"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                ✓ 开启
              </text>
              <text
                x="540"
                y="110"
                textAnchor="middle"
                fontSize="10"
                fill="var(--danger)"
              >
                ×2 内存
              </text>
              <text
                x="540"
                y="128"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                仅运行时改 mesh 时
              </text>
            </g>
          )}

          {/* Runtime mesh modify flow */}
          <rect
            x="80"
            y="168"
            width="480"
            height="72"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="320"
            y="192"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            何时需要 Read/Write？
          </text>
          <text
            x="320"
            y="212"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Mesh.vertices / RecalculateNormals / 运行时变形 → 开；纯渲染 / 烘焙碰撞 → 关
          </text>
          <text
            x="320"
            y="230"
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            开错 = 每个网格多占一份可写副本，移动平台内存先爆
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Mesh Compression 用略增 CPU 换显存；Read/Write 只在运行时改顶点时开启，否则白白翻倍内存。
      </figcaption>
    </figure>
  );
}
