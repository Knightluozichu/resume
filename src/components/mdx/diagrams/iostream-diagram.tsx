/**
 * <IOStreamDiagram>：C++ 输入输出流 cin/cout 与缓冲区/控制台的关系示意图。
 *
 * 展示：键盘 → cin → 程序 → cout → 控制台输出，中间经过输入/输出缓冲区。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

export function IOStreamDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 600 200"
          role="img"
          aria-label="C++ 输入输出流：键盘键入 → cin 输入流 → 程序处理 → cout 输出流 → 控制台显示，中间经缓冲区暂存"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {/* 键盘 */}
          <rect
            x="20"
            y="60"
            width="80"
            height="48"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="80"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            键盘
          </text>
          <text
            x="60"
            y="96"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            输入设备
          </text>
          {/* 键盘按键示意 */}
          <rect x="32" y="74" width="16" height="10" rx="2" fill="var(--border)" />
          <rect x="52" y="74" width="16" height="10" rx="2" fill="var(--border)" />
          <rect x="72" y="74" width="16" height="10" rx="2" fill="var(--border)" />

          {/* 箭头 键盘 → cin */}
          <line
            x1="100"
            y1="84"
            x2="142"
            y2="84"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M142 84 l-8 -4 l0 8 z" fill="var(--accent)" />

          {/* cin 输入流 */}
          <rect
            x="144"
            y="52"
            width="100"
            height="64"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="194"
            y="74"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--accent)"
            fontFamily="monospace"
          >
            cin
          </text>
          <text
            x="194"
            y="92"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            输入流（读）
          </text>
          <text
            x="194"
            y="108"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            stdin 缓冲区
          </text>

          {/* 箭头 cin → 程序 */}
          <line
            x1="244"
            y1="84"
            x2="286"
            y2="84"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M286 84 l-8 -4 l0 8 z" fill="var(--accent)" />

          {/* 程序 */}
          <rect
            x="288"
            y="48"
            width="100"
            height="72"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="338"
            y="74"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            你的程序
          </text>
          <text
            x="338"
            y="92"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            处理·计算
          </text>
          <text
            x="338"
            y="108"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            int main()
          </text>

          {/* 箭头 程序 → cout */}
          <line
            x1="388"
            y1="84"
            x2="430"
            y2="84"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M430 84 l-8 -4 l0 8 z" fill="var(--accent)" />

          {/* cout 输出流 */}
          <rect
            x="432"
            y="52"
            width="100"
            height="64"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="482"
            y="74"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--accent)"
            fontFamily="monospace"
          >
            cout
          </text>
          <text
            x="482"
            y="92"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            输出流（写）
          </text>
          <text
            x="482"
            y="108"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            stdout 缓冲区
          </text>

          {/* 箭头 cout → 控制台 */}
          <line
            x1="532"
            y1="84"
            x2="574"
            y2="84"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M574 84 l-6 -3 l0 6 z" fill="var(--accent)" />

          {/* 控制台/屏幕 */}
          <rect
            x="520"
            y="60"
            width="70"
            height="48"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="555"
            y="80"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            控制台
          </text>
          <text
            x="555"
            y="96"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            屏幕显示
          </text>

          {/* 底部流的方向箭头 */}
          <text
            x="50"
            y="148"
            fontSize="11"
            fill="var(--text-secondary)"
            fontFamily="monospace"
          >
            &gt;&gt;
          </text>
          <text
            x="120"
            y="148"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            #include &lt;iostream&gt; 让程序拥有「管道」能力——用 cin 读、用 cout 写
          </text>

          {/* 流方向标注 */}
          <text
            x="178"
            y="168"
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            输入方向 ←
          </text>
          <text
            x="338"
            y="168"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            处理
          </text>
          <text
            x="490"
            y="168"
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            输出方向 →
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        键盘通过 cin 输入流把数据送进程序，程序通过 cout 输出流把结果送到控制台。
        流经过缓冲区暂存，用 &lt;&lt; 和 &gt;&gt; 运算符来「送」数据。
      </figcaption>
    </figure>
  );
}
