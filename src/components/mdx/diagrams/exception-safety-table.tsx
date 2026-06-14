/**
 * <ExceptionSafetyTable>：C++ 异常安全三个保证级别对比速查表。
 *
 * 三列并排对比：基本保证（basic guarantee）、强保证（strong guarantee）、
 * 不抛异常保证（nothrow guarantee），每列列出关键词、含义、典型示例。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

export function ExceptionSafetyTable() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const green = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const red = "rgb(229,103,92)";

  const w = 860;
  const h = 480;

  const colW = 260;
  const colGap = 30;
  const startX = 20;
  const topY = 40;

  const columns = [
    {
      title: "基本保证",
      subtitle: "basic guarantee",
      color: green,
      x: startX,
      items: [
        { label: "关键词", value: "不泄漏、可析构、数据不变坏" },
        { label: "含义",
          value: "发生异常后：① 没有资源泄漏（RAII 清理）；② 所有对象仍处于可析构的有效状态；③ 但数据内容可能被部分修改，不再是异常前的样子" },
        { label: "典型示例", value: "std::vector 的 insert 失败——vector 有效但元素未知、list::push_back（节点内存分配失败）" },
        { label: "哪里必须", value: "所有标准库容器、所有析构函数自动满足（若抛出则 terminate）" },
      ],
    },
    {
      title: "强保证",
      subtitle: "strong / commit-or-rollback",
      color: warn,
      x: startX + colW + colGap,
      items: [
        { label: "关键词", value: "事务：要么全部成功、要么回滚到原始状态" },
        { label: "含义",
          value: "函数调用如果抛异常——程序状态与调用前完全一样，就像函数从未被调用过。实现技巧：在临时拷贝上修改，成功后再 swap（copy-and-swap）" },
        { label: "典型示例", value: "std::vector::push_back 用 copy-and-swap 时（失败则 vector 不变）、手写 copy-and-swap operator=" },
        { label: "哪里必须", value: "赋值操作符、需要原子性操作的函数。用 copy-and-swap 惯用法实现" },
      ],
    },
    {
      title: "不抛异常",
      subtitle: "nothrow guarantee",
      color: red,
      x: startX + 2 * (colW + colGap),
      items: [
        { label: "关键词", value: "noexcept——绝对不会抛" },
        { label: "含义",
          value: "函数承诺永远不会抛出异常。标记为 noexcept 后：编译器可做激进优化（跳过栈展开机械）；若仍抛出则直接调 terminate() 杀死程序" },
        { label: "典型示例", value: "std::swap (基本类型)、move 构造函数（通常 noexcept）、析构函数（隐式 noexcept）、简单 getter/setter" },
        { label: "哪里必须", value: "析构函数（隐式 noexcept→抛则 terminate）、move 操作（用 noexcept 才能进 vector 快路径）、swap" },
      ],
    },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ 异常安全三级保证对比表——基本保证、强保证、不抛异常保证的含义、示例与应用场景"
          className="mx-auto block h-auto w-full max-w-[860px]"
        >
          <text x={w / 2} y={24} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            异常安全三级保证：基本保证 → 强保证 → 不抛异常
          </text>

          {/* Title row */}
          {columns.map((col) => (
            <g key={col.title}>
              <rect
                x={col.x}
                y={topY}
                width={colW}
                height={44}
                rx={8}
                fill={col.color + "15"}
                stroke={col.color}
                strokeWidth={1.5}
              />
              <text
                x={col.x + colW / 2}
                y={topY + 20}
                fontSize={12}
                fontWeight={700}
                fill={col.color}
                textAnchor="middle"
              >
                {col.title}
              </text>
              <text
                x={col.x + colW / 2}
                y={topY + 36}
                fontSize={9}
                fill={secondary}
                textAnchor="middle"
                fontFamily="monospace"
              >
                {col.subtitle}
              </text>
            </g>
          ))}

          {/* Items for each column */}
          {columns.map((col) =>
            col.items.map((item, idx) => {
              const itemY = topY + 56 + idx * 102;
              return (
                <g key={`${col.title}-${idx}`}>
                  {/* Alternating row background */}
                  <rect
                    x={col.x}
                    y={itemY}
                    width={colW}
                    height={94}
                    rx={6}
                    fill={idx % 2 === 0 ? bg : elevated}
                    stroke={border}
                    strokeWidth={0.5}
                    opacity={0.7}
                  />
                  {/* Label */}
                  <text
                    x={col.x + 10}
                    y={itemY + 18}
                    fontSize={10}
                    fontWeight={600}
                    fill={col.color}
                  >
                    {item.label}
                  </text>
                  {/* Value - wrapped into multiple lines */}
                  <text
                    x={col.x + 10}
                    y={itemY + 36}
                    fontSize={9}
                    fill={primary}
                  >
                    {item.value.length > 80
                      ? item.value.slice(0, Math.floor(item.value.length / 2)).trim()
                      : item.value}
                    {/* This is tight—will use foreignObject for wrapping below */}
                  </text>
                </g>
              );
            })
          )}

          {/* Use foreignObject for better text wrapping in item values */}
          {columns.map((col) =>
            col.items.map((item, idx) => {
              const itemY = topY + 56 + idx * 102;
              return (
                <foreignObject
                  key={`fo-${col.title}-${idx}`}
                  x={col.x + 8}
                  y={itemY + 26}
                  width={colW - 16}
                  height={62}
                >
                  <div style={{ fontSize: "9px", lineHeight: "1.4", color: "#EDEDF2" }}>
                    {item.value}
                  </div>
                </foreignObject>
              );
            })
          )}

          {/* Summary bar at bottom */}
          <rect x={20} y={topY + 56 + 4 * 102 + 8} width={w - 40} height={44} rx={6} fill={accent + "08"} stroke={border} strokeWidth={0.5} />
          <text x={w / 2} y={topY + 56 + 4 * 102 + 32} fontSize={11} fontWeight={600} fill={accent} textAnchor="middle">
            记忆口诀：基本「不乱丢数据」——强「要全成就回滚」——nothrow「打死也不扔」
          </text>
          <text x={w / 2} y={topY + 56 + 4 * 102 + 48} fontSize={9} fill={secondary} textAnchor="middle">
            noexcept 不仅是声明——还是契约：编译器据此做优化（vector 的 move vs copy 路径选择）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        异常安全三级保证速查表。基本保证（不泄漏/对象可析构）是所有标准库容器的底线；
        强保证（commit-or-rollback）用 copy-and-swap 惯用法实现；
        nothrow 保证（noexcept）让编译器做激进优化，move 操作标记 noexcept 是进入容器快路径的前提。
      </figcaption>
    </figure>
  );
}
