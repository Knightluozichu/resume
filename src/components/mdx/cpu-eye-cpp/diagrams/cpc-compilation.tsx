/**
 * <CpcCompilationDiagram>：C++ 编译四阶段流水线（cpu-eye-cpp 编译过程章）。
 *
 * 横向流水线四段：预处理 → 编译 → 汇编 → 链接，每段一张卡片，
 * 上方标注阶段名，中间标注输入/输出产物，下方标注该阶段做的事。
 * 卡片间用粗箭头串联，底部总结栏点出「分别编译 + 链接」的工程意义。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 四段流水线 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

// 四段卡片几何：宽 144、间距 24（含箭头空间）、左右各留 36。
const CARD_W = 144;
const CARD_GAP = 24;
const CARD_MARGIN = 36;
const cardX = (i: number) => CARD_MARGIN + i * (CARD_W + CARD_GAP);
const CARD_TOP = 116;
const CARD_H = 220;

type Stage = {
  name: string;
  color: string;
  input: string;
  output: string;
  actions: string[];
};

const STAGES: readonly Stage[] = [
  {
    name: "预处理",
    color: "var(--accent)",
    input: ".cpp 源文件",
    output: "展开后代码",
    actions: ["展开 #include", "替换 #define 宏", "处理 #ifdef 条件编译"],
  },
  {
    name: "编译",
    color: "var(--success)",
    input: "预处理后代码",
    output: ".s 汇编代码",
    actions: ["词法/语法/语义分析", "生成中间表示 IR", "优化 + 生成汇编"],
  },
  {
    name: "汇编",
    color: "var(--warning)",
    input: ".s 汇编代码",
    output: ".o 目标文件",
    actions: ["汇编指令 → 机器码", "生成符号表", "记录重定位项"],
  },
  {
    name: "链接",
    color: "var(--danger)",
    input: "多个 .o + 库",
    output: "可执行文件",
    actions: ["符号解析（绑定引用）", "地址重定位", "合并段 + COMDAT 折叠"],
  },
];

export function CpcCompilationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 编译四阶段流水线。从左到右：预处理（输入 .cpp，输出展开后代码，处理 #include/#define/#ifdef）、编译（输入预处理后代码，输出 .s 汇编，做语法分析生成 IR 并优化）、汇编（输入 .s，输出 .o 目标文件，汇编指令转机器码并生成符号表）、链接（输入多个 .o 与库，输出可执行文件，做符号解析与地址重定位）。四段串成流水线，支持分别编译。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 编译四阶段流水线
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            源码 → 预处理 → 编译 → 汇编 → 链接 → 可执行文件
          </text>

          {/* ===== 顶部箭头条 ===== */}
          <rect x={CARD_MARGIN} y="76" width={VIEW_W - CARD_MARGIN * 2} height="28" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="95" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)">分别编译</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">每个 .cpp 独立走前三阶段，最后统一链接</tspan>
          </text>

          {/* ===== 四段卡片 + 箭头 ===== */}
          {STAGES.map((s, i) => {
            const x = cardX(i);
            return (
              <g key={s.name}>
                {/* 卡片主体 */}
                <rect x={x} y={CARD_TOP} width={CARD_W} height={CARD_H} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                {/* 阶段名 pill */}
                <rect x={x} y={CARD_TOP} width={CARD_W} height="28" rx="8" fill={s.color} fillOpacity="0.12" stroke={s.color} strokeWidth="1.2" />
                <text x={x + CARD_W / 2} y={CARD_TOP + 19} textAnchor="middle" fontSize="14" fontWeight="700" fill={s.color}>{s.name}</text>

                {/* 输入/输出 */}
                <text x={x + CARD_W / 2} y={CARD_TOP + 48} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">输入</text>
                <text x={x + CARD_W / 2} y={CARD_TOP + 64} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{s.input}</text>
                <text x={x + CARD_W / 2} y={CARD_TOP + 84} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">输出</text>
                <text x={x + CARD_W / 2} y={CARD_TOP + 100} textAnchor="middle" fontSize="11" fontWeight="600" fill={s.color}>{s.output}</text>

                {/* 分隔线 */}
                <line x1={x + 12} y1={CARD_TOP + 114} x2={x + CARD_W - 12} y2={CARD_TOP + 114} stroke="var(--border)" strokeWidth="1" />

                {/* 做的事 */}
                {s.actions.map((a, k) => (
                  <text key={a} x={x + 14} y={CARD_TOP + 132 + k * 22} fontSize="11" fill="var(--text-primary)">
                    <tspan fill={s.color} fontWeight="700">·</tspan>
                    <tspan>{" "}</tspan>
                    <tspan>{a}</tspan>
                  </text>
                ))}

                {/* 段间箭头 */}
                {i < STAGES.length - 1 && (
                  <g>
                    <line x1={x + CARD_W + 4} y1={CARD_TOP + CARD_H / 2} x2={x + CARD_W + CARD_GAP - 4} y2={CARD_TOP + CARD_H / 2} stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.6" />
                    <polygon points={`${x + CARD_W + CARD_GAP - 4},${CARD_TOP + CARD_H / 2 - 5} ${x + CARD_W + CARD_GAP - 4},${CARD_TOP + CARD_H / 2 + 5} ${x + CARD_W + CARD_GAP + 2},${CARD_TOP + CARD_H / 2}`} fill="var(--accent)" fillOpacity="0.6" />
                  </g>
                )}
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            分别编译让大型项目只重编改动的文件再链接；链接器负责符号解析与地址重定位
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 源码经预处理（展开宏与头文件）、编译（语法分析生成汇编）、汇编（转机器码生成目标文件）、链接（符号解析与重定位）四阶段变为可执行文件。分别编译让大型项目不必整体重编。
      </figcaption>
    </figure>
  );
}
