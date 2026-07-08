/**
 * <HcwDataRepresentationDiagram>：数据表示图解——补码、浮点数、字符编码。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HcwDataRepresentationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数据表示图解——补码、浮点数、字符编码"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            数据表示：补码、浮点数与字符编码
          </text>

          {/* 左上：补码 */}
          <rect x="30" y="48" width="330" height="160" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">补码（8 位）</text>

          <text x="50" y="90" textAnchor="start" fontSize="10" fill="var(--text-secondary)">+5:</text>
          <text x="90" y="90" textAnchor="start" fontSize="11" fill="var(--success)" fontFamily="monospace">00000101</text>
          <text x="220" y="90" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">正数：直接表示</text>

          <text x="50" y="112" textAnchor="start" fontSize="10" fill="var(--text-secondary)">取反:</text>
          <text x="90" y="112" textAnchor="start" fontSize="11" fill="var(--warning)" fontFamily="monospace">11111010</text>
          <text x="220" y="112" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">按位取反</text>

          <text x="50" y="134" textAnchor="start" fontSize="10" fill="var(--text-secondary)">+1:</text>
          <text x="90" y="134" textAnchor="start" fontSize="11" fill="var(--danger)" fontFamily="monospace">11111011</text>
          <text x="220" y="134" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">-5 的补码</text>

          <rect x="50" y="146" width="290" height="50" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="60" y="164" textAnchor="start" fontSize="9" fill="var(--text-secondary)">优势：</text>
          <text x="60" y="178" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">① 减法 → 加法（A-B = A+(-B)）</text>
          <text x="60" y="190" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">② 无正负零 · 范围 -128~+127</text>

          {/* 右上：IEEE 754 浮点数 */}
          <rect x="380" y="48" width="330" height="160" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">IEEE 754 浮点数（32 位）</text>

          {/* 符号位 */}
          <rect x="400" y="80" width="30" height="40" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="415" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">S</text>
          <text x="415" y="110" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">1位</text>
          <text x="415" y="132" textAnchor="middle" fontSize="8" fill="var(--danger)">符号</text>

          {/* 指数位 */}
          <rect x="434" y="80" width="90" height="40" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="479" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">Exponent</text>
          <text x="479" y="110" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">8位</text>
          <text x="479" y="132" textAnchor="middle" fontSize="8" fill="var(--warning)">指数(偏移127)</text>

          {/* 尾数位 */}
          <rect x="528" y="80" width="160" height="40" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="608" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">Mantissa</text>
          <text x="608" y="110" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">23位</text>
          <text x="608" y="132" textAnchor="middle" fontSize="8" fill="var(--success)">尾数(隐含1.)</text>

          <text x="400" y="154" textAnchor="start" fontSize="9" fill="var(--text-secondary)">值 = (-1)^S × 1.M × 2^(E-127)</text>
          <text x="400" y="170" textAnchor="start" fontSize="9" fill="var(--danger)">精度问题：0.1 + 0.2 &ne; 0.3</text>
          <text x="400" y="186" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">0.1 在二进制中是无限循环小数</text>
          <text x="400" y="200" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">23 位尾数 ≈ 7 位十进制精度</text>

          {/* 底部：字符编码 */}
          <rect x="30" y="224" width="680" height="140" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="244" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">字符编码演进</text>

          {/* ASCII */}
          <rect x="50" y="256" width="180" height="95" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="276" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">ASCII</text>
          <text x="140" y="292" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">7 位 · 128 个字符</text>
          <text x="140" y="306" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">英文 + 数字 + 符号</text>
          <text x="140" y="320" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace">'A' = 65 = 0x41</text>
          <text x="140" y="334" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace">'a' = 97 = 0x61</text>

          {/* Unicode */}
          <rect x="260" y="256" width="180" height="95" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="350" y="276" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Unicode</text>
          <text x="350" y="292" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">字符集 · 14 万+ 字符</text>
          <text x="350" y="306" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">每个字符唯一码点</text>
          <text x="350" y="320" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace">中 = U+4E2D</text>
          <text x="350" y="334" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace">只规定码点不规定存储</text>

          {/* UTF-8 */}
          <rect x="470" y="256" width="180" height="95" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="560" y="276" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">UTF-8</text>
          <text x="560" y="292" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">变长编码 · 兼容 ASCII</text>
          <text x="560" y="306" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">英文 1B · 中文 3B</text>
          <text x="560" y="320" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace">Web 事实标准</text>
          <text x="560" y="334" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace">无字节序问题</text>

          <text x="370" y="388" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            整数溢出：无符号回绕（255+1=0）| 有符号反转（127+1=-128）
          </text>
          <text x="370" y="406" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">
            关键洞察：一切信息（数字/文字/图像/声音）最终都编码为二进制——补码管整数、IEEE 754 管小数、UTF-8 管文字
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据表示图解——补码统一加减法、IEEE 754 浮点数精度、ASCII→Unicode→UTF-8 编码演进
      </figcaption>
    </figure>
  );
}
