/**
 * <LiteralTypesDiagram>：C++ 字面值常量分类卡片图。
 *
 * 四类卡片 + 转义序列独立区块：
 * 整数（十进制/八进制/十六进制 + 后缀 u/l/ll）、浮点（小数/科学计数法 + f/l）、
 * 字符（单引号 + L 宽字符 + 通用字符名）、字符串（双引号 + 自动拼接连写）、
 * 转义序列表（\n \t \\ \' \" \0 \xhh 换行/制表/反斜杠/单双引号/空字符/十六进制）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

interface LiteralCard {
  title: string;
  items: { code: string; desc: string; accent?: boolean }[];
}

export function LiteralTypesDiagram() {
  const cards: LiteralCard[] = [
    {
      title: "整数字面值",
      items: [
        { code: "42", desc: "十进制（默认 int）" },
        { code: "042", desc: "八进制（0 开头）" },
        { code: "0x2A", desc: "十六进制（0x 开头）" },
        { code: "42u", desc: "unsigned（u/U 后缀）" },
        { code: "42L", desc: "long（l/L 后缀）" },
        { code: "42LL", desc: "long long（ll/LL 后缀）", accent: true },
      ],
    },
    {
      title: "浮点字面值",
      items: [
        { code: "3.14", desc: "小数形式（默认 double）" },
        { code: "3.14f", desc: "float（f/F 后缀）" },
        { code: "3.14L", desc: "long double（l/L 后缀）" },
        { code: "1e-10", desc: "科学计数法 =1×10⁻¹⁰" },
        { code: '3.14e0F', desc: "科学计数法 + float", accent: true },
      ],
    },
    {
      title: "字符字面值",
      items: [
        { code: "'a'", desc: "普通单字符（char）" },
        { code: "L'a'", desc: "宽字符（wchar_t）" },
        { code: "'\\n'", desc: "转义：换行符" },
        { code: "'\\x41'", desc: "转义：十六进制 A", accent: true },
      ],
    },
    {
      title: "字符串字面值",
      items: [
        { code: '"Hello"', desc: "普通字符串（末尾暗藏 \\0）" },
        { code: '"Hello" "World"', desc: "相邻自动拼接成一个" },
        { code: 'R"(raw\n)"', desc: "原始字符串（不处理转义）", accent: true },
      ],
    },
  ];

  const cardW = 250;
  const cardH = 200;
  const gapX = 20;
  const gapY = 24;
  const startX = 16;
  const startY = 60;

  // 转义序列表
  const escapes = [
    { esc: "\\n", meaning: "换行（LF）" },
    { esc: "\\t", meaning: "水平制表（Tab）" },
    { esc: "\\\\", meaning: "反斜杠本身" },
    { esc: "\\'", meaning: "单引号" },
    { esc: "\\\"", meaning: "双引号" },
    { esc: "\\0", meaning: "空字符（字符串终" },
    { esc: "\\xhh", meaning: "十六进制字符值" },
  ];

  const escapeStartY = startY + 2 * (cardH + gapY) + 12;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 556 760"
          role="img"
          aria-label="C++ 字面值常量分类：整数字面值（十进制/八进制/十六进制+后缀）、浮点字面值（小数/科学计数法+后缀）、字符字面值、字符串字面值、转义序列"
          className="mx-auto block h-auto w-full max-w-[556px]"
        >
          {/* 四张卡片 2×2 排列 */}
          {cards.map((card, ci) => {
            const col = ci % 2;
            const row = Math.floor(ci / 2);
            const cx = startX + col * (cardW + gapX);
            const cy = startY + row * (cardH + gapY);

            return (
              <g key={card.title}>
                {/* 卡片背景 */}
                <rect
                  x={cx}
                  y={cy}
                  width={cardW}
                  height={cardH}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                />
                {/* 卡片标题栏 */}
                <rect
                  x={cx}
                  y={cy}
                  width={cardW}
                  height="30"
                  rx="8"
                  fill="var(--accent)"
                  opacity="0.15"
                />
                <rect
                  x={cx}
                  y={cy + 22}
                  width={cardW}
                  height="8"
                  fill="var(--accent)"
                  opacity="0.15"
                />
                <text
                  x={cx + 12}
                  y={cy + 20}
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {card.title}
                </text>
                {/* 卡片条目 */}
                {card.items.map((item, ii) => {
                  const iy = cy + 48 + ii * 28;
                  const codeFill = item.accent ? "var(--accent)" : "var(--text-primary)";
                  return (
                    <g key={item.code}>
                      <text
                        x={cx + 14}
                        y={iy}
                        fontSize="12"
                        fontWeight={item.accent ? 600 : 400}
                        fill={codeFill}
                        fontFamily="monospace"
                      >
                        {item.code}
                      </text>
                      <text
                        x={cx + 14}
                        y={iy + 16}
                        fontSize="10"
                        fill="var(--text-secondary)"
                      >
                        {item.desc}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 转义序列区块 */}
          <rect
            x={startX}
            y={escapeStartY}
            width="524"
            height="220"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <rect
            x={startX}
            y={escapeStartY}
            width="524"
            height="30"
            rx="8"
            fill="var(--accent)"
            opacity="0.15"
          />
          <rect
            x={startX}
            y={escapeStartY + 22}
            width="524"
            height="8"
            fill="var(--accent)"
            opacity="0.15"
          />
          <text
            x={startX + 12}
            y={escapeStartY + 20}
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            常用转义序列
          </text>

          {escapes.map((e, ei) => {
            const ey = escapeStartY + 46 + ei * 24;
            return (
              <g key={e.esc}>
                <text
                  x={startX + 24}
                  y={ey}
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--accent)"
                  fontFamily="monospace"
                >
                  {e.esc}
                </text>
                <text
                  x={startX + 140}
                  y={ey}
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {e.meaning}
                </text>
              </g>
            );
          })}

          {/* 转义序列备注 */}
          <text
            x={startX + 24}
            y={escapeStartY + 216}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            换行 \n(0x0A)、回车 \r(0x0D)、制表 \t(0x09)——它们之所以叫"转义"，就是把普通字符转成特殊控制含义。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C++ 字面值常量的分类：整型（可带进制前缀+后缀）、浮点（小数或科学计数法+后缀 f/L）、
        字符（单引号括起）、字符串（双引号括起，以 \0 结尾）；转义序列给不可见字符起名字。
      </figcaption>
    </figure>
  );
}
