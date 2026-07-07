/**
 * <DataLocalityDiagram>：数据局部性内存布局图（game-programming-patterns 课程）。
 *
 * 上 AoS（Array of Structures）：3 个 Entity 结构体，每个内含 position/velocity/hp/texture
 *   四字段——遍历 position 时会把同缓存行的 hp/texture 也载入，cache miss（红）。
 * 下 SoA（Structure of Arrays）：4 个连续数组 positions[]/velocities[]/hps[]/textures[]，
 *   遍历 positions[] 时只载入连续的 positions，cache 友好（绿）。
 * 底部总结：数据局部性——让频繁访问的数据在内存中连续。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 双段对比 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const warning = "var(--warning)";
const success = "var(--success)";

// AoS：3 个 Entity 结构体
const AOS_BOX_W = 190;
const AOS_BOX_H = 100;
const AOS_GAP = 20;
const AOS_Y = 96;
const AOS_NAMES = ["Entity[0]", "Entity[1]", "Entity[2]"];
const aosX = (i: number) =>
  (VIEW_W - (AOS_NAMES.length * AOS_BOX_W + (AOS_NAMES.length - 1) * AOS_GAP)) / 2 +
  i * (AOS_BOX_W + AOS_GAP);
const aosCx = (i: number) => aosX(i) + AOS_BOX_W / 2;
const AOS_FIELDS = ["position", "velocity", "hp", "texture"];

// SoA：4 个连续数组
const SOA_ROWS = [
  { label: "positions[]", cells: ["pos[0]", "pos[1]", "pos[2]", "pos[3]"], hot: true },
  { label: "velocities[]", cells: ["vel[0]", "vel[1]", "vel[2]", "vel[3]"], hot: false },
  { label: "hps[]", cells: ["hp[0]", "hp[1]", "hp[2]", "hp[3]"], hot: false },
  { label: "textures[]", cells: ["tex[0]", "tex[1]", "tex[2]", "tex[3]"], hot: false },
];
const SOA_ROW_H = 22;
const SOA_ROW_GAP = 8;
const SOA_LABEL_X = 44;
const SOA_CELL_W = 120;
const SOA_CELL_X = 148;

export function DataLocalityDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数据局部性内存布局图。上方 AoS（Array of Structures）：三个 Entity 结构体，每个含 position、velocity、hp、texture 四字段；遍历 position 时会把同一缓存行的 hp、texture 也载入，造成 cache miss。下方 SoA（Structure of Arrays）：四个连续数组 positions、velocities、hps、textures，遍历 positions 时只载入连续的 positions，cache 友好。底部总结：数据局部性——让频繁访问的数据在内存中连续。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="dl-cont-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={success} />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            数据局部性 · AoS vs SoA
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            让频繁访问的数据在内存中连续，减少 cache miss
          </text>

          {/* ===== AoS 段 ===== */}
          <text
            x="48"
            y="84"
            fontSize="13"
            fontWeight="700"
            fill={warning}
            fontFamily="monospace"
          >
            AoS · Array of Structures
          </text>
          <rect
            x="560"
            y="72"
            width="104"
            height="20"
            rx="10"
            fill="var(--danger)"
            fillOpacity="0.12"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="612"
            y="86"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--danger)"
          >
            cache miss
          </text>

          {AOS_NAMES.map((name, i) => (
            <g key={name}>
              <rect
                x={aosX(i)}
                y={AOS_Y}
                width={AOS_BOX_W}
                height={AOS_BOX_H}
                rx="8"
                fill={elevated}
                stroke={border}
                strokeWidth="1.6"
              />
              <text
                x={aosCx(i)}
                y={AOS_Y + 18}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={primary}
                fontFamily="monospace"
              >
                {name}
              </text>
              <line
                x1={aosX(i)}
                y1={AOS_Y + 26}
                x2={aosX(i) + AOS_BOX_W}
                y2={AOS_Y + 26}
                stroke={border}
                strokeWidth="1"
              />
              {AOS_FIELDS.map((f, fi) => (
                <text
                  key={f}
                  x={aosX(i) + 14}
                  y={AOS_Y + 42 + fi * 16}
                  fontSize="11"
                  fontWeight={fi === 0 ? "700" : "400"}
                  fill={fi === 0 ? accent : secondary}
                  fontFamily="monospace"
                >
                  {f}
                </text>
              ))}
            </g>
          ))}

          {/* AoS 注：访问 position 拖带其他字段 */}
          <text
            x={VIEW_W / 2}
            y="212"
            textAnchor="middle"
            fontSize="11"
            fontStyle="italic"
            fill="var(--danger)"
          >
            访问 position 时，同一缓存行的 velocity / hp / texture 也被载入 → 浪费带宽
          </text>

          {/* ===== SoA 段 ===== */}
          <text
            x="48"
            y="238"
            fontSize="13"
            fontWeight="700"
            fill={success}
            fontFamily="monospace"
          >
            SoA · Structure of Arrays
          </text>
          <rect
            x="560"
            y="226"
            width="104"
            height="20"
            rx="10"
            fill={success}
            fillOpacity="0.12"
            stroke={success}
            strokeWidth="1.2"
          />
          <text
            x="612"
            y="240"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={success}
          >
            cache 友好
          </text>

          {SOA_ROWS.map((row, ri) => {
            const ry = 252 + ri * (SOA_ROW_H + SOA_ROW_GAP);
            const isHot = row.hot;
            return (
              <g key={row.label}>
                {/* 行标签 */}
                <text
                  x={SOA_LABEL_X}
                  y={ry + SOA_ROW_H / 2 + 4}
                  fontSize="11"
                  fontWeight={isHot ? "700" : "400"}
                  fill={isHot ? success : primary}
                  fontFamily="monospace"
                >
                  {row.label}
                </text>
                {/* 4 个连续 cell */}
                {row.cells.map((c, ci) => (
                  <g key={c}>
                    <rect
                      x={SOA_CELL_X + ci * SOA_CELL_W}
                      y={ry}
                      width={SOA_CELL_W}
                      height={SOA_ROW_H}
                      rx={ci === 0 || ci === row.cells.length - 1 ? 6 : 0}
                      fill={isHot ? success : elevated}
                      fillOpacity={isHot ? 0.1 : 1}
                      stroke={isHot ? success : border}
                      strokeWidth={isHot ? 1.4 : 1}
                    />
                    <text
                      x={SOA_CELL_X + ci * SOA_CELL_W + SOA_CELL_W / 2}
                      y={ry + SOA_ROW_H / 2 + 4}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight={isHot ? "700" : "400"}
                      fill={isHot ? success : primary}
                      fontFamily="monospace"
                    >
                      {c}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="80"
            y="384"
            width={VIEW_W - 160}
            height="32"
            rx="10"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="405"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            数据局部性：让频繁访问的数据在内存中连续
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        CPU 以缓存行为单位载入内存。AoS 把一个对象的所有字段堆在一起，遍历单字段时会把不访问的字段也拖进缓存；SoA 把同名字段铺成连续数组，遍历时每一字节都是需要的。冷数据与热数据分仓，是性能敏感循环里最朴素也最有效的优化。
      </figcaption>
    </figure>
  );
}
