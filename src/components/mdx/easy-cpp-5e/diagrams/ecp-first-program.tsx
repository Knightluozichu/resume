/**
 * <EcpFirstProgramDiagram>：第一个 C++ 程序结构图（easy-cpp-5e 第一个程序章）。
 *
 * 左侧展示 Hello World 源码（逐行注释色），右侧用箭头对应到四个编译阶段：
 *   预处理 → 编译 → 汇编 → 链接 → 可执行文件
 * 底部一行总结程序从源码到运行的关键流程。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11、间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const CODE_X = 40;
const CODE_W = 300;
const FLOW_X = 380;
const FLOW_W = 300;

type CodeLine = { text: string; note: string };
const CODE_LINES: readonly CodeLine[] = [
  { text: "#include &lt;iostream&gt;", note: "预处理：引入输入输出库" },
  { text: "using namespace std;", note: "命名空间：省略 std:: 前缀" },
  { text: "int main() {", note: "程序入口" },
  { text: '  cout &lt;&lt; "Hello!";', note: "输出流：打印到屏幕" },
  { text: "  return 0;", note: "返回 0：正常退出" },
  { text: "}", note: "函数体结束" },
];

type Stage = { name: string; desc: string; color: string };
const STAGES: readonly Stage[] = [
  { name: "预处理", desc: "#include 展开头文件", color: "var(--success)" },
  { name: "编译", desc: "语法检查 → 汇编码", color: "var(--accent)" },
  { name: "汇编", desc: "汇编码 → 机器码 (.o)", color: "var(--warning)" },
  { name: "链接", desc: "连接标准库 → 可执行", color: "var(--danger)" },
];

export function EcpFirstProgramDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第一个 C++ 程序结构图。左侧展示 Hello World 源码六行，右侧用箭头对应到四个编译阶段：预处理（绿色，展开头文件）、编译（紫色，语法检查生成汇编码）、汇编（橙色，生成机器码目标文件）、链接（红色，连接标准库生成可执行文件）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            第一个 C++ 程序：从源码到运行
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            左：Hello World 源码 · 右：编译四阶段
          </text>

          {/* ===== 左侧代码区 ===== */}
          <rect x={CODE_X} y="76" width={CODE_W} height="220" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x={CODE_X + 12} y="96" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            hello.cpp
          </text>
          {CODE_LINES.map((line, i) => (
            <g key={i}>
              <text
                x={CODE_X + 16}
                y={116 + i * 28}
                fontSize="12"
                fontFamily="monospace"
                fill="var(--text-primary)"
              >
                {line.text}
              </text>
              <text
                x={CODE_X + 16}
                y={128 + i * 28}
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {line.note}
              </text>
            </g>
          ))}

          {/* ===== 箭头连接 ===== */}
          <line x1={CODE_X + CODE_W + 4} y1="186" x2={FLOW_X - 4} y2="186" stroke="var(--accent)" strokeWidth="1.6" strokeOpacity="0.6" />
          <polygon points={`${FLOW_X - 8},182 ${FLOW_X - 8},190 ${FLOW_X},${186}`} fill="var(--accent)" fillOpacity="0.6" />

          {/* ===== 右侧编译流程 ===== */}
          <text x={FLOW_X + FLOW_W / 2} y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            编译流程
          </text>
          {STAGES.map((stage, i) => {
            const sy = 112 + i * 48;
            return (
              <g key={stage.name}>
                <rect
                  x={FLOW_X}
                  y={sy}
                  width={FLOW_W}
                  height="36"
                  rx="8"
                  fill={stage.color}
                  fillOpacity="0.10"
                  stroke={stage.color}
                  strokeWidth="1.2"
                />
                <circle cx={FLOW_X + 18} cy={sy + 18} r="10" fill={stage.color} fillOpacity="0.18" stroke={stage.color} strokeWidth="1" />
                <text x={FLOW_X + 18} y={sy + 22} textAnchor="middle" fontSize="11" fontWeight="700" fill={stage.color}>
                  {i + 1}
                </text>
                <text x={FLOW_X + 38} y={sy + 16} fontSize="12" fontWeight="700" fill="var(--text-primary)">
                  {stage.name}
                </text>
                <text x={FLOW_X + 38} y={sy + 30} fontSize="11" fill="var(--text-secondary)">
                  {stage.desc}
                </text>
                {i < STAGES.length - 1 && (
                  <line
                    x1={FLOW_X + FLOW_W / 2}
                    y1={sy + 36}
                    x2={FLOW_X + FLOW_W / 2}
                    y2={sy + 44}
                    stroke="var(--accent)"
                    strokeWidth="1.2"
                    strokeOpacity="0.5"
                  />
                )}
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="80" y={VIEW_H - 44} width={VIEW_W - 160} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            #include 在预处理阶段起作用，using namespace 在编译阶段起作用——运行时都已消失
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 程序从源码到运行经历预处理、编译、汇编、链接四阶段。`#include` 做文本替换，`using namespace` 做名字解析，最终生成可执行文件。
      </figcaption>
    </figure>
  );
}
