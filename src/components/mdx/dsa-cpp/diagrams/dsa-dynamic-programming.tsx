/**
 * <DsaDynamicProgrammingDiagram>：动态规划设计流程图解（dsa-dynamic-programming 章）。
 *
 * 左上：递归树展示重叠子问题（斐波那契）。
 * 右上：DP 填表示意（0-1 背包）。
 * 左下：记忆化 vs 递推对比。
 * 右下：LCS 状态转移表。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function DsaDynamicProgrammingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="动态规划设计流程。左上：斐波那契递归树展示重叠子问题，fib(3) 和 fib(2) 被重复计算，朴素递归 O(2^n)。右上：0-1 背包 DP 填表，dp[i][j]=max(dp[i-1][j], dp[i-1][j-w]+v)。左下：记忆化自顶向下 vs 递推自底向上对比。右下：LCS 状态转移表。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            动态规划：从重叠子问题到最优解
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            定义状态 → 转移方程 → 填表 → 空间优化
          </text>

          <line
            x1="360"
            y1="74"
            x2="360"
            y2="260"
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="40"
            y1="260"
            x2="680"
            y2="260"
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== 左上：递归树（重叠子问题） ===== */}
          <text
            x="180"
            y="88"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={danger}
          >
            重叠子问题（fib(5) 递归树）
          </text>

          {/* fib(5) */}
          <circle
            cx="180"
            cy="108"
            r="14"
            fill={accent}
            fillOpacity="0.1"
            stroke={accent}
            strokeWidth="1.5"
          />
          <text x="180" y="112" textAnchor="middle" fontSize="11" fill={accent}>
            5
          </text>

          {/* fib(4), fib(3) */}
          <circle
            cx="130"
            cy="138"
            r="12"
            fill={accent}
            fillOpacity="0.08"
            stroke={accent}
            strokeWidth="1"
          />
          <text x="130" y="142" textAnchor="middle" fontSize="11" fill={accent}>
            4
          </text>
          <circle
            cx="230"
            cy="138"
            r="12"
            fill={warning}
            fillOpacity="0.1"
            stroke={warning}
            strokeWidth="1.5"
          />
          <text
            x="230"
            y="142"
            textAnchor="middle"
            fontSize="11"
            fill={warning}
          >
            3
          </text>
          <line
            x1="170"
            y1="120"
            x2="136"
            y2="128"
            stroke={border}
            strokeWidth="1"
          />
          <line
            x1="190"
            y1="120"
            x2="224"
            y2="128"
            stroke={border}
            strokeWidth="1"
          />

          {/* fib(4) → fib(3), fib(2) */}
          <circle
            cx="100"
            cy="168"
            r="11"
            fill={warning}
            fillOpacity="0.1"
            stroke={warning}
            strokeWidth="1.5"
          />
          <text
            x="100"
            y="171"
            textAnchor="middle"
            fontSize="11"
            fill={warning}
          >
            3
          </text>
          <circle
            cx="150"
            cy="168"
            r="10"
            fill={success}
            fillOpacity="0.1"
            stroke={success}
            strokeWidth="1"
          />
          <text x="150" y="171" textAnchor="middle" fontSize="11" fill={success}>
            2
          </text>
          <line
            x1="122"
            y1="148"
            x2="106"
            y2="158"
            stroke={border}
            strokeWidth="1"
          />
          <line
            x1="138"
            y1="148"
            x2="146"
            y2="158"
            stroke={border}
            strokeWidth="1"
          />

          {/* fib(3) → fib(2), fib(1) */}
          <circle
            cx="200"
            cy="168"
            r="10"
            fill={success}
            fillOpacity="0.1"
            stroke={success}
            strokeWidth="1.5"
          />
          <text x="200" y="171" textAnchor="middle" fontSize="11" fill={success}>
            2
          </text>
          <circle
            cx="250"
            cy="168"
            r="10"
            fill="var(--bg)"
            stroke={border}
            strokeWidth="1"
          />
          <text
            x="250"
            y="171"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            1
          </text>
          <line
            x1="222"
            y1="148"
            x2="206"
            y2="158"
            stroke={border}
            strokeWidth="1"
          />
          <line
            x1="238"
            y1="148"
            x2="246"
            y2="158"
            stroke={border}
            strokeWidth="1"
          />

          {/* 重复标记 */}
          <text x="70" y="196" fontSize="11" fill={warning}>
            fib(3) 算了 2 次
          </text>
          <text x="70" y="212" fontSize="11" fill={success}>
            fib(2) 算了 3 次
          </text>
          <text x="70" y="234" fontSize="11" fill={danger}>
            朴素递归 O(2^n)
          </text>
          <text x="70" y="250" fontSize="11" fill={accent}>
            DP 缓存后 O(n)
          </text>

          {/* ===== 右上：0-1 背包 DP 表 ===== */}
          <text
            x="540"
            y="88"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={success}
          >
            0-1 背包 DP 表
          </text>
          <text
            x="540"
            y="106"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            物品(w=2,v=3), (w=3,v=4), 容量 W=5
          </text>

          {/* 表头 */}
          <text
            x="400"
            y="128"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={secondary}
          >
            i\W
          </text>
          {[0, 1, 2, 3, 4, 5].map((w) => (
            <text
              key={w}
              x={420 + w * 28}
              y="128"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={secondary}
            >
              {w}
            </text>
          ))}

          {/* 表数据 */}
          {[
            { i: 0, vals: [0, 0, 0, 0, 0, 0] },
            { i: 1, vals: [0, 0, 3, 3, 3, 3] },
            { i: 2, vals: [0, 0, 3, 4, 4, 7] },
          ].map((row) => (
            <g key={row.i}>
              <text
                x="400"
                y={148 + row.i * 24}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={secondary}
              >
                {row.i}
              </text>
              {row.vals.map((v, j) => (
                <g key={j}>
                  <rect
                    x={408 + j * 28}
                    y={132 + row.i * 24}
                    width="24"
                    height="20"
                    rx="2"
                    fill={v > 0 ? success : "var(--bg)"}
                    fillOpacity={v > 0 ? 0.06 : 0}
                    stroke={border}
                    strokeWidth="0.8"
                  />
                  <text
                    x={420 + j * 28}
                    y={146 + row.i * 24}
                    textAnchor="middle"
                    fontSize="11"
                    fill={v > 0 ? success : secondary}
                  >
                    {v}
                  </text>
                </g>
              ))}
            </g>
          ))}

          <text
            x="540"
            y="220"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            dp[i][j] = max(dp[i-1][j], dp[i-1][j-w]+v)
          </text>
          <text x="540" y="238" textAnchor="middle" fontSize="11" fill={accent}>
            答案 = dp[2][5] = 7
          </text>

          {/* ===== 左下：记忆化 vs 递推 ===== */}
          <text
            x="180"
            y="280"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={warning}
          >
            记忆化 vs 递推
          </text>

          {/* 记忆化 */}
          <rect
            x="50"
            y="294"
            width="130"
            height="80"
            rx="8"
            fill={accent}
            fillOpacity="0.04"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x="115"
            y="312"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={accent}
          >
            记忆化（自顶向下）
          </text>
          <text x="60" y="330" fontSize="11" fill={primary}>
            递归 + 缓存
          </text>
          <text x="60" y="346" fontSize="11" fill={primary}>
            思路自然
          </text>
          <text x="60" y="362" fontSize="11" fill={secondary}>
            有递归栈开销
          </text>

          {/* 递推 */}
          <rect
            x="200"
            y="294"
            width="130"
            height="80"
            rx="8"
            fill={success}
            fillOpacity="0.04"
            stroke={success}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x="265"
            y="312"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={success}
          >
            递推（自底向上）
          </text>
          <text x="210" y="330" fontSize="11" fill={primary}>
            循环填表
          </text>
          <text x="210" y="346" fontSize="11" fill={primary}>
            无递归开销
          </text>
          <text x="210" y="362" fontSize="11" fill={secondary}>
            可能算无用状态
          </text>

          {/* ===== 右下：LCS 转移表 ===== */}
          <text
            x="540"
            y="280"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={danger}
          >
            LCS 状态转移（ABC vs AC）
          </text>

          {/* 表头 */}
          <text
            x="410"
            y="302"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={secondary}
          >
            {" "}
            &quot;&quot;
          </text>
          <text
            x="450"
            y="302"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={secondary}
          >
            A
          </text>
          <text
            x="490"
            y="302"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={secondary}
          >
            C
          </text>

          {/* 行 */}
          {[
            { label: '""', vals: [0, 0, 0] },
            { label: "A", vals: [0, 1, 1] },
            { label: "B", vals: [0, 1, 1] },
            { label: "C", vals: [0, 1, 2] },
          ].map((row, i) => (
            <g key={row.label}>
              <text
                x="410"
                y={322 + i * 22}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={secondary}
              >
                {row.label}
              </text>
              {row.vals.map((v, j) => (
                <g key={j}>
                  <rect
                    x={434 + j * 40}
                    y={308 + i * 22}
                    width="32"
                    height="20"
                    rx="2"
                    fill={v > 0 ? danger : "var(--bg)"}
                    fillOpacity={v > 0 ? 0.06 : 0}
                    stroke={border}
                    strokeWidth="0.8"
                  />
                  <text
                    x={450 + j * 40}
                    y={322 + i * 22}
                    textAnchor="middle"
                    fontSize="11"
                    fill={v > 0 ? danger : secondary}
                  >
                    {v}
                  </text>
                </g>
              ))}
            </g>
          ))}
          <text x="540" y="412" textAnchor="middle" fontSize="11" fill={accent}>
            LCS(&quot;ABC&quot;,&quot;AC&quot;) = 2 (即 &quot;AC&quot;)
          </text>

          {/* 底部总结 */}
          <rect
            x="40"
            y="424"
            width={VIEW_W - 80}
            height="24"
            rx="6"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text
            x={VIEW_W / 2}
            y="440"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={primary}
          >
            DP = 分治 + 缓存，关键：定义状态、找转移方程、确定计算顺序
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        动态规划通过缓存重叠子问题将指数级递归降为多项式。设计流程：定义状态描述子问题、推导转移方程、确定边界与计算顺序、最后优化空间。0-1
        背包和 LCS 是两大经典模型。
      </figcaption>
    </figure>
  );
}
