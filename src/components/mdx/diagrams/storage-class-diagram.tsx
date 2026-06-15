/**
 * <StorageClassDiagram>：auto / static / extern / register 作用域与生命周期对照。
 *
 * Server Component，token 色，无阴影。
 */

export function StorageClassDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";

  const rows = [
    {
      kw: "auto",
      scope: "块作用域",
      storage: "自动（栈）",
      init: "未初始化（垃圾值）",
      lifetime: "进入块创建，离开块销毁",
      note: "块内局部变量默认类别",
    },
    {
      kw: "static",
      scope: "块或文件",
      storage: "静态区",
      init: "默认 0",
      lifetime: "程序整个运行期",
      note: "块内 static 仅初始化一次",
    },
    {
      kw: "extern",
      scope: "整个程序",
      storage: "取决于定义处",
      init: "取决于定义处",
      lifetime: "取决于定义处",
      note: "声明「别处有定义」",
    },
    {
      kw: "register",
      scope: "块作用域",
      storage: "建议放寄存器",
      init: "未初始化",
      lifetime: "同 auto",
      note: "C11 起取地址 &x 受限",
    },
  ];

  const colX = [24, 100, 200, 300, 400, 520];
  const rowH = 52;
  const startY = 72;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="C 存储类 auto static extern register 作用域与生命周期对照表"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            四种存储类一览
          </text>
          <text x={24} y={48} fontSize="11" fill={secondary}>
            作用域 = 名字在哪可见；存储期 = 内存何时分配/释放
          </text>

          {["关键字", "作用域", "存储位置", "默认初值", "生命周期", "要点"].map((h, i) => (
            <text
              key={h}
              x={colX[i] + (i === 0 ? 0 : 4)}
              y={startY - 8}
              fontSize="10"
              fontWeight="700"
              fill={secondary}
            >
              {h}
            </text>
          ))}

          {rows.map((r, ri) => {
            const y = startY + ri * rowH;
            const highlight = r.kw === "static" || r.kw === "extern";
            return (
              <g key={r.kw}>
                <rect
                  x={20}
                  y={y}
                  width={600}
                  height={rowH - 6}
                  rx="6"
                  fill={highlight ? bgEl : bg}
                  stroke={highlight ? accent : border}
                  strokeWidth={highlight ? 1.5 : 1}
                  opacity={0.95}
                />
                <text x={colX[0]} y={y + 22} fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">
                  {r.kw}
                </text>
                <text x={colX[1]} y={y + 22} fontSize="10" fill={primary}>
                  {r.scope}
                </text>
                <text x={colX[2]} y={y + 22} fontSize="10" fill={primary}>
                  {r.storage}
                </text>
                <text x={colX[3]} y={y + 22} fontSize="10" fill={primary}>
                  {r.init}
                </text>
                <text x={colX[4]} y={y + 22} fontSize="10" fill={primary}>
                  {r.lifetime}
                </text>
                <text x={colX[5]} y={y + 22} fontSize="9" fill={secondary}>
                  {r.note}
                </text>
              </g>
            );
          })}

          <text x={24} y={320} fontSize="11" fill={secondary}>
            不写存储类时，函数内局部变量默认 auto；全局变量默认 extern（定义）且静态存储期。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        auto 随块生灭；static 活整段程序；extern 只声明链接关系；register 提示编译器放寄存器（现代编译器常忽略）。
      </figcaption>
    </figure>
  );
}
