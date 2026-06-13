/**
 * <HomogeneousTranslateDiagram>：「变换」§4「齐次坐标与平移」小节的核心掰碎图（HEL-35，B 数学型）。
 *
 * 本章最烧脑的概念之一：为什么平移要给点补第 4 个分量 w=1、平移量为什么住在矩阵最后一列。
 * 用一个 4×4 平移矩阵框（左列 = 单位矩阵 I 的三列，最后一列 = 平移量 [tx,ty,tz,1]，
 * 即 [I | t] 分块），右乘一个齐次列向量 (x,y,z,1)，箭头标出「结果 = (x+tx, y+ty, z+tz, 1)」。
 *
 * 三句话语义：①点要写成 4 维齐次坐标，末位 w=1（向量则 w=0，平移不动它）；
 * ②正因为 w=1，矩阵最后一列的 tx/ty/tz 才会被「加」进结果——这就是平移；
 * ③矩阵左上 3×3 是单位阵，所以 x/y/z 本身不被改，只是各加上一个平移量。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent)/--success/--warning/--border/--bg/--bg-elevated/
 * --text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function HomogeneousTranslateDiagram() {
  // 4×4 矩阵单元格几何：左上角 (60,70)，每格 36×34。
  const ox = 60;
  const oy = 70;
  const cw = 36;
  const ch = 34;
  const cx = (col: number) => ox + col * cw + cw / 2;
  const cy = (row: number) => oy + row * ch + ch / 2;

  // 4×4 矩阵内容：左 3 列 = 单位阵，最后一列 = 平移量。
  const M: string[][] = [
    ["1", "0", "0", "tx"],
    ["0", "1", "0", "ty"],
    ["0", "0", "1", "tz"],
    ["0", "0", "0", "1"],
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 660 360"
          role="img"
          aria-label="齐次坐标下的平移矩阵。一个 4×4 矩阵，左上 3×3 是单位矩阵（对角线为 1，其余为 0），最后一列从上到下是平移量 tx、ty、tz、1。它右乘一个 4 维齐次列向量 (x, y, z, 1)，其中末位 w 等于 1。相乘结果是 (x 加 tx, y 加 ty, z 加 tz, 1)：正因为向量末位 w 等于 1，矩阵最后一列的 tx、ty、tz 才被加进了结果，这就是平移。若 w 等于 0（方向向量），平移量被乘以 0，不起作用。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          <text
            x="330"
            y="34"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            平移矩阵 T · 齐次坐标点 = 被平移后的点
          </text>

          {/* ============ 4×4 平移矩阵 [I | t] ============ */}
          {/* 矩阵外框（强调最后一列分块） */}
          <rect
            x={ox - 8}
            y={oy - 8}
            width={cw * 4 + 16}
            height={ch * 4 + 16}
            rx="8"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {/* 高亮最后一列（平移量住所） */}
          <rect
            x={ox + cw * 3 - 4}
            y={oy - 4}
            width={cw + 8}
            height={ch * 4 + 8}
            rx="6"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          {/* 高亮左上 3×3（单位阵） */}
          <rect
            x={ox - 4}
            y={oy - 4}
            width={cw * 3 + 4}
            height={ch * 3 + 4}
            rx="6"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.6"
          />
          {M.map((rowVals, r) =>
            rowVals.map((val, c) => {
              const isTrans = c === 3 && r < 3;
              return (
                <text
                  key={`m-${r}-${c}`}
                  x={cx(c)}
                  y={cy(r) + 4}
                  textAnchor="middle"
                  fontSize="14"
                  fontFamily="var(--font-mono)"
                  fontWeight={isTrans ? "600" : "400"}
                  fill={isTrans ? "var(--accent)" : "var(--text-primary)"}
                >
                  {val}
                </text>
              );
            }),
          )}
          <text
            x={ox + cw * 1.5}
            y={oy + ch * 4 + 26}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            左上 3×3 = 单位阵
          </text>
          <text
            x={cx(3)}
            y={oy + ch * 4 + 26}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            末列 = 平移量
          </text>

          {/* ============ 乘号 ============ */}
          <text
            x="240"
            y={cy(1.5) + 6}
            textAnchor="middle"
            fontSize="20"
            fill="var(--text-secondary)"
          >
            ×
          </text>

          {/* ============ 齐次列向量 (x,y,z,1) ============ */}
          <rect
            x="266"
            y={oy - 8}
            width="52"
            height={ch * 4 + 16}
            rx="8"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="292"
            y={cy(0) + 4}
            textAnchor="middle"
            fontSize="14"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            x
          </text>
          <text
            x="292"
            y={cy(1) + 4}
            textAnchor="middle"
            fontSize="14"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            y
          </text>
          <text
            x="292"
            y={cy(2) + 4}
            textAnchor="middle"
            fontSize="14"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            z
          </text>
          {/* w=1 高亮（关键所在） */}
          <rect
            x="270"
            y={cy(3) - 16}
            width="44"
            height="30"
            rx="6"
            fill="var(--accent-glow)"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="292"
            y={cy(3) + 4}
            textAnchor="middle"
            fontSize="14"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            fill="var(--success)"
          >
            1
          </text>
          <text
            x="292"
            y={oy + ch * 4 + 26}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            w = 1
          </text>

          {/* ============ 等号 ============ */}
          <text
            x="350"
            y={cy(1.5) + 6}
            textAnchor="middle"
            fontSize="20"
            fill="var(--text-secondary)"
          >
            =
          </text>

          {/* ============ 结果向量 (x+tx, y+ty, z+tz, 1) ============ */}
          <rect
            x="386"
            y={oy - 8}
            width="100"
            height={ch * 4 + 16}
            rx="8"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="436"
            y={cy(0) + 4}
            textAnchor="middle"
            fontSize="13"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            x + tx
          </text>
          <text
            x="436"
            y={cy(1) + 4}
            textAnchor="middle"
            fontSize="13"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            y + ty
          </text>
          <text
            x="436"
            y={cy(2) + 4}
            textAnchor="middle"
            fontSize="13"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            z + tz
          </text>
          <text
            x="436"
            y={cy(3) + 4}
            textAnchor="middle"
            fontSize="13"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
          >
            1
          </text>

          {/* 关键箭头：从 w=1 指向结果，强调「正因 w=1，平移量才被加进来」 */}
          <path
            d="M316 250 q 60 40 110 -8"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />

          {/* ============ 底部两句话 ============ */}
          <text
            x="330"
            y="306"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            正因为 w = 1，最后一列的 tx/ty/tz 才被「加」进了结果
          </text>
          <text
            x="330"
            y="330"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            点的 w 取 1（会被平移）；方向向量的 w 取 0（平移量乘 0，不动它）。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        为什么平移要补第 4 个分量？因为平移量住在 4×4
        矩阵的最后一列，只有让点的末位 w = 1，这一列的 tx/ty/tz
        才会在相乘时被「加」进 x/y/z，得到 (x+tx, y+ty, z+tz)。这套带 w
        的坐标就叫齐次坐标；方向向量取 w = 0，平移量乘 0、对它无效。
      </figcaption>
    </figure>
  );
}
