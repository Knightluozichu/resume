/**
 * <BitFieldDiagram>：struct bit-field 位字段内存打包示意。
 */

export function BitFieldDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";
  const colors = ["rgb(63,185,127)", "rgb(96,165,250)", "rgb(229,181,103)", "rgb(229,103,92)"];

  const fields = [
    { name: "ready", width: 1, color: colors[0] },
    { name: "mode", width: 3, color: colors[1] },
    { name: "error", width: 4, color: colors[2] },
    { name: "flags", width: 8, color: colors[3] },
  ];

  let bitPos = 0;
  const cells: { name: string; w: number; color: string; start: number }[] = [];
  for (const f of fields) {
    cells.push({ name: f.name, w: f.width, color: f.color, start: bitPos });
    bitPos += f.width;
  }

  const unitW = 22;
  const startX = 80;
  const rowY = 120;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 300"
          role="img"
          aria-label="结构体位字段在 unsigned int 内的打包布局"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            位字段（bit-field）内存打包
          </text>
          <text x={24} y={48} fontSize="10" fill={secondary} fontFamily="monospace">
            struct Status {"{ unsigned ready : 1; unsigned mode : 3; unsigned error : 4; unsigned flags : 8; };"}
          </text>

          <text x={startX - 8} y={rowY - 14} fontSize="9" fill={secondary}>
            一个 unsigned int 存储单元（16 bit 示意）
          </text>
          <rect x={startX - 8} y={rowY - 8} width={bitPos * unitW + 16} height={68} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />

          {cells.map((c) => {
            const x = startX + c.start * unitW;
            const w = c.w * unitW - 2;
            return (
              <g key={c.name}>
                <rect x={x} y={rowY} width={w} height={36} rx="4" fill={`${c.color}22`} stroke={c.color} strokeWidth="1.5" />
                <text x={x + w / 2} y={rowY + 16} textAnchor="middle" fontSize="9" fontWeight="700" fill={primary}>
                  {c.name}
                </text>
                <text x={x + w / 2} y={rowY + 30} textAnchor="middle" fontSize="8" fill={secondary} fontFamily="monospace">
                  : {c.w}
                </text>
              </g>
            );
          })}

          {Array.from({ length: bitPos + 4 }).map((_, i) => (
            <text key={`idx-${i}`} x={startX + i * unitW + 10} y={rowY + 52} textAnchor="middle" fontSize="7" fill={secondary}>
              {i}
            </text>
          ))}

          <rect x={startX + bitPos * unitW} y={rowY} width={4 * unitW - 2} height={36} rx="4" fill={bgEl} stroke={border} strokeDasharray="3 2" strokeWidth="1" />
          <text x={startX + bitPos * unitW + 2 * unitW} y={rowY + 22} textAnchor="middle" fontSize="8" fill={secondary}>
            未用 / padding
          </text>

          <rect x={24} y={190} width={592} height={96} rx="8" fill={bgEl} stroke={border} strokeWidth="1.5" />
          <text x={44} y={214} fontSize="11" fontWeight="600" fill={accent}>
            要点
          </text>
          <text x={44} y={234} fontSize="10" fill={primary}>
            • 多个小字段**打包**进同一整型存储单元，省内存、贴近硬件寄存器布局
          </text>
          <text x={44} y={252} fontSize="10" fill={primary}>
            • **不能**对位字段取地址；**不能**跨越单元边界（超宽会占用下一单元）
          </text>
          <text x={44} y={270} fontSize="10" fill={secondary}>
            • 布局**实现定义**——跨平台二进制不可移植；可移植协议用手动掩码 + 位移更稳
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        位字段把 struct 成员限制在指定位宽内；编译器按声明顺序打包，常用于嵌入式状态寄存器与标志位压缩。
      </figcaption>
    </figure>
  );
}
