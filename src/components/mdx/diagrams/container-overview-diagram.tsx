/**
 * <ContainerOverviewDiagram>：6 种顺序容器并排对比（内部结构示意图 + 性能特征表）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 */
export function ContainerOverviewDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const warn = "rgb(229,181,103)";
  const good = "rgb(63,185,127)";

  const w = 960;
  const h = 640;

  // 六种容器定义
  const containers = [
    {
      name: "vector",
      x: 10,
      y: 30,
      desc: "连续内存",
      access: "O(1)",
      insFront: "O(n)",
      insBack: "O(1)∗",
      memory: "紧凑",
      stable: false,
    },
    {
      name: "deque",
      x: 170,
      y: 30,
      desc: "分段数组",
      access: "O(1)",
      insFront: "O(1)",
      insBack: "O(1)",
      memory: "块状",
      stable: false,
    },
    {
      name: "list",
      x: 330,
      y: 30,
      desc: "双向链表",
      access: "O(n)",
      insFront: "O(1)",
      insBack: "O(1)",
      memory: "分散",
      stable: false,
    },
    {
      name: "forward_list",
      x: 490,
      y: 30,
      desc: "单向链表",
      access: "O(n)",
      insFront: "O(1)",
      insBack: "N/A",
      memory: "分散",
      stable: false,
    },
    {
      name: "array",
      x: 650,
      y: 30,
      desc: "固定数组",
      access: "O(1)",
      insFront: "N/A",
      insBack: "N/A",
      memory: "栈上",
      stable: false,
    },
    {
      name: "string",
      x: 810,
      y: 30,
      desc: "字符数组",
      access: "O(1)",
      insFront: "O(n)",
      insBack: "O(1)∗",
      memory: "紧凑",
      stable: false,
    },
  ];

  const cardW = 148;
  const structH = 180;
  const tableY = 30 + structH + 16;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="六种顺序容器并排对比：vector/deque/list/forward_list/array/string 的内部结构与性能特征"
          className="mx-auto block h-auto w-full max-w-[960px]"
        >
          {/* 标题 */}
          <text x={w / 2} y="20" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            六种顺序容器内部结构对比
          </text>

          {containers.map((c, ci) => (
            <g key={c.name} transform={`translate(${c.x}, ${c.y})`}>
              {/* 容器名 */}
              <text x={cardW / 2} y="0" fontSize="13" fontWeight="700" fill={accent} textAnchor="middle">
                {c.name}
              </text>
              <text x={cardW / 2} y="16" fontSize="10" fill={secondary} textAnchor="middle">
                {c.desc}
              </text>

              {/* 结构示意图区域 */}
              <rect
                x="0"
                y="24"
                width={cardW}
                height={structH - 24}
                rx="6"
                fill={bg}
                stroke={border}
              />

              {/* vector 结构：连续方块 */}
              {c.name === "vector" && (
                <>
                  <rect x="10" y="48" width="28" height="28" rx="4" fill={accent} opacity="0.25" stroke={accent} />
                  <rect x="42" y="48" width="28" height="28" rx="4" fill={accent} opacity="0.25" stroke={accent} />
                  <rect x="74" y="48" width="28" height="28" rx="4" fill={accent} opacity="0.25" stroke={accent} />
                  <rect x="106" y="48" width="28" height="28" rx="4" fill="none" stroke={border} strokeDasharray="3 3" />
                  <text x="24" y="66" fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">a</text>
                  <text x="56" y="66" fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">b</text>
                  <text x="88" y="66" fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">c</text>
                  <text x="120" y="66" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">?</text>
                  {/* 三个指针 */}
                  <text x={cardW / 2} y="98" fontSize="9" fill={secondary} textAnchor="middle" fontFamily="monospace">
                    begin/end/capacity
                  </text>
                  <text x={cardW / 2} y="112" fontSize="10" fill={good} textAnchor="middle">
                    连续存储，缓存友好
                  </text>
                </>
              )}

              {/* deque 结构：分段双端 */}
              {c.name === "deque" && (
                <>
                  <rect x="8" y="48" width="56" height="24" rx="4" fill={accent} opacity="0.12" stroke={border} />
                  <rect x="12" y="52" width="14" height="16" rx="2" fill={accent} opacity="0.25" stroke={accent} />
                  <rect x="28" y="52" width="14" height="16" rx="2" fill={accent} opacity="0.25" stroke={accent} />
                  <rect x="44" y="52" width="14" height="16" rx="2" fill="none" stroke={border} strokeDasharray="2 2" />
                  <text x="19" y="63" fontSize="8" fill={accent} textAnchor="middle" fontFamily="monospace">a</text>
                  <text x="35" y="63" fontSize="8" fill={accent} textAnchor="middle" fontFamily="monospace">b</text>
                  <rect x="8" y="78" width="56" height="24" rx="4" fill={accent} opacity="0.08" stroke={border} />
                  <rect x="12" y="82" width="14" height="16" rx="2" fill={accent} opacity="0.25" stroke={accent} />
                  <rect x="28" y="82" width="14" height="16" rx="2" fill={accent} opacity="0.25" stroke={accent} />
                  <text x="19" y="93" fontSize="8" fill={accent} textAnchor="middle" fontFamily="monospace">c</text>
                  <text x="35" y="93" fontSize="8" fill={accent} textAnchor="middle" fontFamily="monospace">d</text>
                  <text x="88" y="60" fontSize="9" fill={secondary} fontFamily="monospace">
                    中控数组
                  </text>
                  <text x="88" y="75" fontSize="9" fill={secondary} fontFamily="monospace">
                    → 块指针
                  </text>
                  <text x="88" y="90" fontSize="9" fill={secondary} fontFamily="monospace">
                    → 块指针
                  </text>
                  <text x={cardW / 2} y="112" fontSize="10" fill={good} textAnchor="middle">
                    两端插入 O(1)
                  </text>
                </>
              )}

              {/* list 结构：双向链表 */}
              {c.name === "list" && (
                <>
                  {/* 节点 */}
                  <circle cx="24" cy="54" r="10" fill={accent} opacity="0.2" stroke={accent} />
                  <text x="24" y="57" fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">a</text>
                  <circle cx="74" cy="54" r="10" fill={accent} opacity="0.2" stroke={accent} />
                  <text x="74" y="57" fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">b</text>
                  <circle cx="124" cy="54" r="10" fill={accent} opacity="0.2" stroke={accent} />
                  <text x="124" y="57" fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">c</text>
                  {/* 双向箭头 */}
                  <line x1="34" y1="54" x2="64" y2="54" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrSmall)" />
                  <line x1="64" y1="50" x2="34" y2="50" stroke={accent} opacity="0.5" strokeWidth="1" />
                  <line x1="84" y1="54" x2="114" y2="54" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrSmall)" />
                  <line x1="114" y1="50" x2="84" y2="50" stroke={accent} opacity="0.5" strokeWidth="1" />
                  <text x={cardW / 2} y="82" fontSize="9" fill={secondary} textAnchor="middle" fontFamily="monospace">
                    每个节点存 prev + next
                  </text>
                  <text x={cardW / 2} y="98" fontSize="10" fill={warn} textAnchor="middle">
                    随机访问 O(n)
                  </text>
                  <text x={cardW / 2} y="112" fontSize="10" fill={good} textAnchor="middle">
                    任意位置插入 O(1)
                  </text>
                </>
              )}

              {/* forward_list 结构：单向链表 */}
              {c.name === "forward_list" && (
                <>
                  <circle cx="24" cy="54" r="10" fill={accent} opacity="0.2" stroke={accent} />
                  <text x="24" y="57" fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">a</text>
                  <circle cx="74" cy="54" r="10" fill={accent} opacity="0.2" stroke={accent} />
                  <text x="74" y="57" fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">b</text>
                  <circle cx="124" cy="54" r="10" fill={accent} opacity="0.2" stroke={accent} />
                  <text x="124" y="57" fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">c</text>
                  {/* 单向箭头 */}
                  <line x1="34" y1="54" x2="64" y2="54" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrSmall)" />
                  <line x1="84" y1="54" x2="114" y2="54" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrSmall)" />
                  <text x={cardW / 2} y="82" fontSize="9" fill={secondary} textAnchor="middle" fontFamily="monospace">
                    只存 next 指针
                  </text>
                  <text x={cardW / 2} y="96" fontSize="9" fill={secondary} textAnchor="middle" fontFamily="monospace">
                    不能反向遍历
                  </text>
                  <text x={cardW / 2} y="112" fontSize="10" fill={good} textAnchor="middle">
                    内存更省，无 push_back
                  </text>
                </>
              )}

              {/* array 结构：固定大小 */}
              {c.name === "array" && (
                <>
                  <rect x="10" y="42" width="128" height="32" rx="4" fill={accent} opacity="0.08" stroke={border} />
                  <rect x="14" y="46" width="28" height="24" rx="3" fill={accent} opacity="0.2" stroke={accent} />
                  <rect x="46" y="46" width="28" height="24" rx="3" fill={accent} opacity="0.2" stroke={accent} />
                  <rect x="78" y="46" width="28" height="24" rx="3" fill={accent} opacity="0.2" stroke={accent} />
                  <rect x="110" y="46" width="24" height="24" rx="3" fill={accent} opacity="0.2" stroke={accent} />
                  <text x="28" y="61" fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">a</text>
                  <text x="60" y="61" fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">b</text>
                  <text x="92" y="61" fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">c</text>
                  <text x="122" y="61" fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">d</text>
                  <text x={cardW / 2} y="96" fontSize="9" fill={secondary} textAnchor="middle" fontFamily="monospace">
                    编译期固定大小
                  </text>
                  <text x={cardW / 2} y="112" fontSize="10" fill={good} textAnchor="middle">
                    栈上分配，零开销
                  </text>
                </>
              )}

              {/* string 结构：连续字符 */}
              {c.name === "string" && (
                <>
                  <rect x="10" y="48" width="28" height="28" rx="4" fill={accent} opacity="0.25" stroke={accent} />
                  <rect x="42" y="48" width="28" height="28" rx="4" fill={accent} opacity="0.25" stroke={accent} />
                  <rect x="74" y="48" width="28" height="28" rx="4" fill={accent} opacity="0.25" stroke={accent} />
                  <rect x="106" y="48" width="28" height="28" rx="4" fill={accent} opacity="0.25" stroke={accent} />
                  <text x="24" y="66" fontSize="10" fill={accent} textAnchor="middle" fontFamily="monospace">H</text>
                  <text x="56" y="66" fontSize="10" fill={accent} textAnchor="middle" fontFamily="monospace">e</text>
                  <text x="88" y="66" fontSize="10" fill={accent} textAnchor="middle" fontFamily="monospace">l</text>
                  <text x="120" y="66" fontSize="10" fill={accent} textAnchor="middle" fontFamily="monospace">l</text>
                  <text x={cardW / 2} y="98" fontSize="9" fill={secondary} textAnchor="middle" fontFamily="monospace">
                    \0 结尾（C++11 后）
                  </text>
                  <text x={cardW / 2} y="112" fontSize="10" fill={good} textAnchor="middle">
                    专属字符串操作
                  </text>
                </>
              )}

              {/* 表头分隔线 */}
              <line x1="0" y1={structH} x2={cardW} y2={structH} stroke={border} />

              {/* 性能特征表 */}
              <g transform={`translate(0, ${structH + 4})`}>
                {[
                  ["访问", c.access],
                  ["前插", c.insFront],
                  ["后插", c.insBack],
                  ["内存", c.memory],
                ].map(([label, val], ri) => (
                  <g key={ri} transform={`translate(0, ${ri * 14})`}>
                    <text x="4" y="11" fontSize="9" fill={secondary}>{label}</text>
                    <text
                      x={cardW - 4}
                      y="11"
                      fontSize="9"
                      fill={val === "N/A" ? secondary : (val.startsWith("O(n)") || val === "分散" ? warn : good)}
                      textAnchor="end"
                      fontFamily={val === "紧凑" || val === "块状" || val === "分散" || val === "栈上" ? undefined : "monospace"}
                    >
                      {val}
                    </text>
                  </g>
                ))}
              </g>
            </g>
          ))}

          {/* 底部注释 */}
          <text x={w / 2} y={h - 10} fontSize="10" fill={secondary} textAnchor="middle">
            ∗ vector/string 尾部插入为均摊 O(1)；中间插入删除 vector/string=O(n)，list/forward_list=O(1)，deque≈O(n)
          </text>

          <defs>
            <marker id="arrSmall" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0,1 5,3 0,5" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        六种顺序容器的内部结构与时间复杂度对比。连续存储（vector/string/array）支持 O(1) 随机访问但中间插入慢；链式存储（list/forward_list）任意位置插入 O(1) 但不支持随机访问。deque 兼顾两端快速插入与分段存储。
      </figcaption>
    </figure>
  );
}
