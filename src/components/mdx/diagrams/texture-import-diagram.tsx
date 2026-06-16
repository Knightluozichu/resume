/**
 * <TextureImportDiagram>：纹理导入——格式、Max Size、mipmap 对内存与采样质量的影响。
 */

type TextureImportHighlight = "format" | "maxsize" | "mipmap" | "all";

export function TextureImportDiagram({
  highlight = "all",
}: {
  highlight?: TextureImportHighlight;
}) {
  const showFormat = highlight === "format" || highlight === "all";
  const showMaxSize = highlight === "maxsize" || highlight === "all";
  const showMipmap = highlight === "mipmap" || highlight === "all";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 300"
          role="img"
          aria-label="纹理导入：ASTC/ETC2 等压缩格式省内存；Max Size 限制最大边长；mipmap 预生成多级缩小版供远处采样"
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
            Texture Import Settings
          </text>

          {showFormat && (
            <g>
              <text
                x="120"
                y="56"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                Format（平台）
              </text>
              <rect
                x="24"
                y="66"
                width="88"
                height="56"
                rx="6"
                fill="var(--bg)"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text
                x="68"
                y="88"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                RGBA32
              </text>
              <text
                x="68"
                y="106"
                textAnchor="middle"
                fontSize="9"
                fill="var(--danger)"
              >
                4 B/px
              </text>

              <rect
                x="124"
                y="66"
                width="88"
                height="56"
                rx="6"
                fill="var(--bg-elevated)"
                stroke="var(--success)"
                strokeWidth="2"
              />
              <text
                x="168"
                y="88"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                ASTC 6×6
              </text>
              <text
                x="168"
                y="106"
                textAnchor="middle"
                fontSize="9"
                fill="var(--success)"
              >
                ~0.36 B/px
              </text>
            </g>
          )}

          {showMaxSize && (
            <g>
              <text
                x="320"
                y="56"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                Max Size
              </text>
              <rect
                x="248"
                y="66"
                width="64"
                height="64"
                rx="4"
                fill="var(--bg)"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text
                x="280"
                y="102"
                textAnchor="middle"
                fontSize="9"
                fill="var(--danger)"
              >
                4096
              </text>
              <text
                x="280"
                y="142"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                源图 4K
              </text>

              <path d="M320 98 l16 0 l-5 -4 l0 8 z" fill="var(--accent)" />

              <rect
                x="344"
                y="82"
                width="32"
                height="32"
                rx="4"
                fill="var(--bg-elevated)"
                stroke="var(--success)"
                strokeWidth="2"
              />
              <text
                x="360"
                y="102"
                textAnchor="middle"
                fontSize="9"
                fill="var(--success)"
              >
                1024
              </text>
              <text
                x="360"
                y="142"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                UI 图标够用
              </text>
            </g>
          )}

          {showMipmap && (
            <g>
              <text
                x="520"
                y="56"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                Generate Mip Maps
              </text>
              {(() => {
                // 逐级减半的 mipmap 各级方块：横向并排、底边对齐，级间留 6px 间隙
                // （禁止互相重叠——硬规则 1）。尺寸 48/36/24/12 依次递减表示分辨率减半。
                const sizes = [48, 36, 24, 12];
                const gap = 6;
                const baseLeft = 452;
                const baseBottom = 128; // 各级底边对齐
                let cursorX = baseLeft;
                return sizes.map((s, i) => {
                  const x = cursorX;
                  cursorX += s + gap;
                  return (
                    <rect
                      key={i}
                      x={x}
                      y={baseBottom - s}
                      width={s}
                      height={s}
                      rx="4"
                      fill="var(--bg-elevated)"
                      stroke={i === 0 ? "var(--accent)" : "var(--border)"}
                      strokeWidth="1"
                    />
                  );
                });
              })()}
              <text
                x="520"
                y="142"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                远处用低级 · +33% 内存
              </text>
            </g>
          )}

          {/* Memory bar comparison */}
          <text
            x="80"
            y="172"
            fontSize="10"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            1024² 纹理内存（含 mipmap ≈×1.33）
          </text>
          <rect
            x="80"
            y="182"
            width="400"
            height="14"
            rx="4"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <rect
            x="80"
            y="182"
            width="400"
            height="14"
            rx="4"
            fill="var(--danger)"
            opacity="0.35"
          />
          <text x="490" y="193" fontSize="9" fill="var(--danger)">
            RGBA32 ~5.3 MB
          </text>

          <rect
            x="80"
            y="206"
            width="48"
            height="14"
            rx="4"
            fill="var(--success)"
            opacity="0.6"
          />
          <text x="140" y="217" fontSize="9" fill="var(--success)">
            ASTC ~0.5 MB
          </text>

          <text
            x="320"
            y="248"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            规则：按用途设 Max Size · 按平台选压缩格式 · 3D 场景纹理开 mipmap，UI/Sprite 常关
          </text>
          <text
            x="320"
            y="268"
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            源文件 4K 不代表运行时必须 4K——导入设置才是内存真相
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        纹理内存由格式 × 分辨率 ×（mipmap 约 1.33）决定；按平台选 ASTC/ETC2，按用途限制 Max Size。
      </figcaption>
    </figure>
  );
}
