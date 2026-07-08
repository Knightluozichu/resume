/**
 * <HcwBinaryNumbersDiagram>：二进制与进制转换图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HcwBinaryNumbersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="二进制与进制转换图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            二进制与进制转换
          </text>

          {/* 左上：十进制转二进制 */}
          <rect x="30" y="48" width="330" height="180" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">十进制 13 → 二进制 1101</text>
          <text x="195" y="84" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">除 2 取余，逆序排列</text>

          {/* 除法过程 */}
          <text x="70" y="108" textAnchor="start" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">13 ÷ 2 = 6 ... 余 1</text>
          <text x="250" y="108" textAnchor="start" fontSize="10" fill="var(--danger)">↑ 最低位</text>
          <text x="70" y="128" textAnchor="start" fontSize="11" fill="var(--text-primary)" fontFamily="monospace"> 6 ÷ 2 = 3 ... 余 0</text>
          <text x="70" y="148" textAnchor="start" fontSize="11" fill="var(--text-primary)" fontFamily="monospace"> 3 ÷ 2 = 1 ... 余 1</text>
          <text x="70" y="168" textAnchor="start" fontSize="11" fill="var(--text-primary)" fontFamily="monospace"> 1 ÷ 2 = 0 ... 余 1</text>
          <text x="250" y="168" textAnchor="start" fontSize="10" fill="var(--danger)">↑ 最高位</text>

          <rect x="70" y="180" width="180" height="30" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="160" y="200" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)" fontFamily="monospace">13 = 1101B</text>

          {/* 右上：二进制转十进制 */}
          <rect x="380" y="48" width="330" height="180" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">二进制 1101 → 十进制 13</text>
          <text x="545" y="84" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按权展开求和</text>

          {/* 位权表 */}
          <text x="420" y="110" textAnchor="start" fontSize="10" fill="var(--text-tertiary)">位</text>
          <text x="480" y="110" textAnchor="middle" fontSize="11" fill="var(--warning)" fontFamily="monospace">1</text>
          <text x="520" y="110" textAnchor="middle" fontSize="11" fill="var(--warning)" fontFamily="monospace">1</text>
          <text x="560" y="110" textAnchor="middle" fontSize="11" fill="var(--warning)" fontFamily="monospace">0</text>
          <text x="600" y="110" textAnchor="middle" fontSize="11" fill="var(--warning)" fontFamily="monospace">1</text>

          <text x="420" y="130" textAnchor="start" fontSize="10" fill="var(--text-tertiary)">权</text>
          <text x="480" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">2³</text>
          <text x="520" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">2²</text>
          <text x="560" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">2¹</text>
          <text x="600" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">2⁰</text>

          <text x="420" y="150" textAnchor="start" fontSize="10" fill="var(--text-tertiary)">值</text>
          <text x="480" y="150" textAnchor="middle" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">8</text>
          <text x="520" y="150" textAnchor="middle" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">4</text>
          <text x="560" y="150" textAnchor="middle" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">0</text>
          <text x="600" y="150" textAnchor="middle" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">1</text>

          <text x="420" y="180" textAnchor="start" fontSize="10" fill="var(--text-secondary)">8 + 4 + 0 + 1 = 13</text>
          <rect x="420" y="190" width="180" height="26" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="510" y="208" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)" fontFamily="monospace">1101B = 13</text>

          {/* 底部：进制对照表 */}
          <rect x="30" y="244" width="680" height="130" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="264" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">进制对照表</text>

          {/* 表头 */}
          <text x="80" y="284" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">十进制</text>
          <text x="200" y="284" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">二进制</text>
          <text x="340" y="284" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">十六进制</text>
          <text x="500" y="284" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">说明</text>
          <line x1="50" y1="290" x2="690" y2="290" stroke="var(--border)" strokeWidth="1" />

          {/* 数据行 */}
          {[
            ["0", "0000", "0", "最小值"],
            ["5", "0101", "5", "—"],
            ["10", "1010", "A", "—"],
            ["15", "1111", "F", "4 位最大值"],
          ].map((row, i) => (
            <g key={i}>
              <text x="80" y={306 + i * 16} textAnchor="middle" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">{row[0]}</text>
              <text x="200" y={306 + i * 16} textAnchor="middle" fontSize="10" fill="var(--success)" fontFamily="monospace">{row[1]}</text>
              <text x="340" y={306 + i * 16} textAnchor="middle" fontSize="10" fill="var(--warning)" fontFamily="monospace">{row[2]}</text>
              <text x="500" y={306 + i * 16} textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{row[3]}</text>
            </g>
          ))}

          <text x="370" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            1 位十六进制 = 4 位二进制 · 1 字节 = 8 位二进制 = 2 位十六进制
          </text>
          <text x="370" y="410" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            二进制太长人眼难读 · 十进制转换需计算 · 十六进制在简洁性与可转换性间取得最佳平衡
          </text>
          <text x="370" y="428" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">
            关键洞察：计算机用二进制因为硬件只需两种状态（高/低电平），最简单可靠
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        二进制与进制转换图解——除 2 取余法、按权展开法、十/二/十六进制对照
      </figcaption>
    </figure>
  );
}
