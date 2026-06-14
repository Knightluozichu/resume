/**
 * <DynamicArrayDiagram>：new[]/delete[] vs vector 并排对比 + 忘记 delete[] 的内存泄漏示意。
 *
 * 左侧：new[] 分配 + 手动 delete[] —— 必须记住、忘记就泄漏
 * 右侧：vector 管理 —— 自动扩容、离开作用域自动释放
 * 中间：「忘记 delete[]」红色警示区展示泄漏后果
 *
 * Server Component（纯展示，静态 SVG）。
 */
export function DynamicArrayDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const danger = "rgb(229,103,92)";
  const warn = "rgb(229,181,103)";

  const w = 760;
  const h = 480;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="动态数组对比：左侧 new[]/delete[] 手动管理容易泄漏，右侧 vector 自动管理安全释放，中间展示忘记 delete[] 的内存泄漏后果"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x={w / 2} y={22} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            动态数组：new[] 手动管理 vs vector 自动管理
          </text>

          {/* ====== 左侧：new[] / delete[] ====== */}
          <g transform="translate(14, 34)">
            <rect x={0} y={0} width={280} height={420} rx={10} fill={bg} stroke={border} />
            <text x={140} y={24} fontSize={13} fontWeight={700} fill={warn} textAnchor="middle">
              new[] / delete[] 手动管理
            </text>

            <g transform="translate(12, 44)">
              <text x={0} y={0} fontSize={11} fontWeight={600} fill={primary}>① 分配</text>
              <rect x={0} y={8} width={256} height={24} rx={5} fill={elevated} stroke={border} />
              <text x={10} y={24} fontSize={9} fill={secondary} fontFamily="monospace">int *arr = new int[n];</text>

              <rect x={8} y={46} width={240} height={56} rx={6} fill={bg} stroke={warn} />
              <text x={128} y={60} fontSize={9} fill={secondary} textAnchor="middle">堆上分配的数组（n 个 int）</text>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x={20 + i * 38} y={70} width={30} height={22} rx={3}
                  fill={warn} opacity={0.15} stroke={warn} strokeWidth={1} />
              ))}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <text key={i} x={35 + i * 38} y={85} fontSize={9} fill={warn} textAnchor="middle" fontFamily="monospace">
                  [{i}]
                </text>
              ))}
            </g>

            <g transform="translate(12, 160)">
              <text x={0} y={0} fontSize={11} fontWeight={600} fill={primary}>② 使用</text>
              <text x={0} y={16} fontSize={9} fill={secondary} fontFamily="monospace">arr[2] = 42;</text>
              <text x={0} y={30} fontSize={9} fill={secondary} fontFamily="monospace">cout &lt;&lt; arr[i];</text>
            </g>

            <g transform="translate(12, 214)">
              <text x={0} y={0} fontSize={11} fontWeight={600} fill={good}>③ 释放</text>
              <rect x={0} y={8} width={256} height={20} rx={5} fill={good} opacity={0.06} stroke={good} />
              <text x={10} y={22} fontSize={9} fill={good} fontFamily="monospace">delete[] arr;</text>
              <text x={128} y={44} fontSize={9} fill={good} textAnchor="middle">必须 delete[]！忘记 = 内存泄漏</text>
            </g>

            <g transform="translate(12, 276)">
              <text x={0} y={0} fontSize={11} fontWeight={600} fill={danger}>✕ 忘记 delete[]</text>
              <rect x={0} y={8} width={256} height={50} rx={6} fill={danger} opacity={0.06} stroke={danger} strokeWidth={1} strokeDasharray="4 3" />
              <text x={128} y={24} fontSize={9} fill={danger} textAnchor="middle">函数提前 return / 抛异常 …</text>
              <text x={128} y={38} fontSize={9} fill={danger} textAnchor="middle">delete[] 被跳过 → 数组永远留在堆上</text>
              <text x={128} y={54} fontSize={9} fill={danger} textAnchor="middle">→ 内存泄漏！</text>
            </g>
          </g>

          {/* ====== 右侧：vector 自动管理 ====== */}
          <g transform="translate(466, 34)">
            <rect x={0} y={0} width={280} height={420} rx={10} fill={bg} stroke={border} />
            <text x={140} y={24} fontSize={13} fontWeight={700} fill={good} textAnchor="middle">
              vector 自动管理
            </text>

            <g transform="translate(12, 44)">
              <text x={0} y={0} fontSize={11} fontWeight={600} fill={primary}>① 创建</text>
              <rect x={0} y={8} width={256} height={24} rx={5} fill={elevated} stroke={border} />
              <text x={10} y={24} fontSize={9} fill={secondary} fontFamily="monospace">std::vector&lt;int&gt; vec(n);</text>

              <rect x={8} y={46} width={240} height={80} rx={6} fill={bg} stroke={good} />
              <text x={128} y={60} fontSize={9} fill={secondary} textAnchor="middle">vector 栈对象（24 字节）</text>
              <g transform="translate(10, 68)">
                <rect x={0} y={0} width={220} height={16} rx={3} fill={elevated} stroke={border} />
                <text x={110} y={11} fontSize={8} fill={secondary} textAnchor="middle" fontFamily="monospace">
                  begin → 堆数组 | end → 末尾+1 | capacity → 容量边界
                </text>
              </g>
              <rect x={16} y={94} width={190} height={22} rx={4} fill={good} opacity={0.1} stroke={good} />
              <text x={111} y={108} fontSize={8} fill={good} textAnchor="middle" fontFamily="monospace">
                堆上连续数组（自动分配+扩容）
              </text>
            </g>

            <g transform="translate(12, 180)">
              <text x={0} y={0} fontSize={11} fontWeight={600} fill={primary}>② 使用</text>
              <text x={0} y={16} fontSize={9} fill={secondary} fontFamily="monospace">vec[2] = 42;</text>
              <text x={0} y={30} fontSize={9} fill={secondary} fontFamily="monospace">vec.push_back(100); // 自动扩容</text>
              <text x={0} y={44} fontSize={9} fill={secondary} fontFamily="monospace">for (auto x : vec) {}</text>
            </g>

            <g transform="translate(12, 238)">
              <text x={0} y={0} fontSize={11} fontWeight={600} fill={good}>③ 自动释放</text>
              <rect x={0} y={8} width={256} height={20} rx={5} fill={good} opacity={0.06} stroke={good} />
              <text x={128} y={22} fontSize={9} fill={good} textAnchor="middle">离开作用域自动析构 → delete[]</text>
              <text x={128} y={42} fontSize={9} fill={good} textAnchor="middle">提前 return / 异常 → 也会调析构函数</text>
            </g>

            <g transform="translate(12, 286)">
              <rect x={0} y={0} width={256} height={56} rx={8} fill={good} opacity={0.06} stroke={good} />
              <text x={128} y={18} fontSize={10} fontWeight={600} fill={good} textAnchor="middle">RAII：资源获取即初始化</text>
              <text x={128} y={34} fontSize={9} fill={secondary} textAnchor="middle">vector 构造时申请堆内存</text>
              <text x={128} y={48} fontSize={9} fill={secondary} textAnchor="middle">析构时自动释放 → 永远不会忘记</text>
            </g>
          </g>

          {/* ====== VS 标识 ====== */}
          <g transform="translate(305, 34)">
            <text x={55} y={220} fontSize={16} fontWeight={700} fill={accent} textAnchor="middle">VS</text>
            <line x1={10} y1={230} x2={100} y2={230} stroke={accent} strokeWidth={1} opacity={0.3} />
          </g>

          <text x={w / 2} y={h - 10} fontSize={10} fill={secondary} textAnchor="middle">
            优先使用 vector（或 array）代替 new[]——它能自动释放、支持范围 for、push_back 自动扩容，且异常安全
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>new[] 方案</strong>：手动分配，手动释放；忘记 <code>delete[]</code>（提前 return / 抛异常）→ 内存泄漏。<strong>vector 方案</strong>：自动管理堆数组，RAII 保证离开作用域时自动 <code>delete[]</code>；支持 <code>push_back</code> 自动扩容、范围 for 遍历；异常安全。
      </figcaption>
    </figure>
  );
}
