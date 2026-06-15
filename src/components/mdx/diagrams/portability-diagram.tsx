/**
 * <PortabilityDiagram>：C 语言可移植性概念示意图。
 *
 * 展示「一次编写，多平台编译运行」的可移植性理念：
 * 同一份源代码 → 不同平台编译器 → 不同操作系统的可执行文件。
 *
 * 三条分支：GCC → Linux / MSVC → Windows / Clang → macOS，汇合到"C标准"内核。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

export function PortabilityDiagram() {
  const branches = [
    { compiler: "GCC", os: "Linux", exe: "hello", color: "var(--accent)", x: 190 },
    { compiler: "MSVC", os: "Windows", exe: "hello.exe", color: "#3FB97F", x: 350 },
    { compiler: "Clang", os: "macOS", exe: "hello", color: "#E5B567", x: 510 },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 700 260"
          role="img"
          aria-label="C 语言可移植性：同一份源码 hello.c，经过 GCC、MSVC、Clang 不同编译器，分别在 Linux、Windows、macOS 上生成可执行文件"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* 顶部：源码 */}
          <rect
            x="270"
            y="16"
            width="160"
            height="40"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="350"
            y="42"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
            fontFamily="monospace"
          >
            hello.c
          </text>

          {/* 源码到三条分支的连线 */}
          {branches.map((b) => (
            <line
              key={b.compiler}
              x1="350"
              y1="56"
              x2={b.x}
              y2="80"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
          ))}

          {/* C标准内核 */}
          <rect
            x="280"
            y="62"
            width="140"
            height="30"
            rx="6"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="350"
            y="82"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            C 标准（C11/C18）
          </text>

          {/* 三分支 */}
          {branches.map((b) => (
            <g key={b.compiler}>
              {/* 编译器 */}
              <rect
                x={b.x - 60}
                y="100"
                width="120"
                height="36"
                rx="6"
                fill="var(--bg)"
                stroke={b.color}
                strokeWidth="2"
              />
              <text
                x={b.x}
                y="123"
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill={b.color}
                fontFamily="monospace"
              >
                {b.compiler}
              </text>
              {/* 箭头 */}
              <line
                x1={b.x}
                y1="136"
                x2={b.x}
                y2="154"
                stroke={b.color}
                strokeWidth="1.5"
              />
              <path d={`M${b.x} 154 l-4 -6 l8 0 z`} fill={b.color} />
              {/* 操作系统 */}
              <rect
                x={b.x - 50}
                y="160"
                width="100"
                height="32"
                rx="6"
                fill="var(--bg-elevated)"
                stroke={b.color}
                strokeWidth="1.5"
              />
              <text
                x={b.x}
                y="181"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-primary)"
              >
                {b.os}
              </text>
              {/* 可执行文件 */}
              <rect
                x={b.x - 50}
                y="204"
                width="100"
                height="28"
                rx="6"
                fill={b.color}
                opacity="0.15"
              />
              <text
                x={b.x}
                y="223"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={b.color}
                fontFamily="monospace"
              >
                {b.exe}
              </text>
            </g>
          ))}

          {/* 底部说明 */}
          <text
            x="350"
            y="252"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            同一份 C 源码 = 不同编译器下的三份可执行程序，但行为一致
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C 语言的可移植性：同一份 hello.c 源码，经 GCC、MSVC、Clang 三种编译器，
        分别为 Linux、Windows、macOS 生成可执行文件。C 标准保证它们的行为一致。
      </figcaption>
    </figure>
  );
}
