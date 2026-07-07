/**
 * <CpcFunctionCallsDiagram>：函数调用栈帧机制（cpu-eye-cpp 函数调用机制章）。
 *
 * 左侧展示调用栈从高地址到低地址的栈帧堆叠：main → foo → bar，
 * 每个栈帧标注内部内容（参数、返回地址、局部变量）。
 * 右侧展示调用约定的参数传递（寄存器 vs 栈），底部总结调用成本。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×500、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const STACK_X = 60;
const STACK_W = 300;
const STACK_TOP = 104;

const RIGHT_X = 400;
const RIGHT_W = 264;

type Frame = {
  name: string;
  color: string;
  items: string[];
};

const FRAMES: readonly Frame[] = [
  { name: "bar() 栈帧", color: "var(--danger)", items: ["局部变量 b1, b2", "临时值", "保存的寄存器"] },
  { name: "foo() 栈帧", color: "var(--warning)", items: ["局部变量 f1", "返回地址 → main", "保存的帧指针 BP"] },
  { name: "main() 栈帧", color: "var(--success)", items: ["局部变量 m, n", "argc/argv 参数"] },
];

export function CpcFunctionCallsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="函数调用栈帧机制。左侧调用栈从高地址向下堆叠：main 栈帧（局部变量 m/n、argc/argv）、foo 栈帧（局部变量 f1、返回地址回 main、保存的帧指针）、bar 栈帧（局部变量、临时值、保存的寄存器）。栈指针 SP 指向栈顶 bar 帧，帧指针 BP 指向当前帧基址。右侧展示调用约定：前 6 个整数/指针参数用寄存器传递（rdi/rsi/rdx/rcx/r8/r9），多余参数压栈；返回值走 rax。底部总结调用成本。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            函数调用 · 栈帧与调用约定
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            左：调用栈（高地址 → 低地址）　右：x86-64 System V 调用约定
          </text>

          {/* ===== 左：调用栈 ===== */}
          <text x={STACK_X} y={STACK_TOP - 12} fontSize="13" fontWeight="700" fill="var(--text-primary)">调用栈</text>
          <text x={STACK_X + STACK_W - 4} y={STACK_TOP - 12} textAnchor="end" fontSize="11" fill="var(--text-secondary)">高地址 ↑</text>

          {/* SP 标记 */}
          <line x1={STACK_X - 8} y1={STACK_TOP} x2={STACK_X - 2} y2={STACK_TOP} stroke="var(--danger)" strokeWidth="1.4" />
          <text x={STACK_X - 12} y={STACK_TOP + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="var(--danger)">SP →</text>

          {FRAMES.map((f, i) => {
            const y = STACK_TOP + i * 96;
            return (
              <g key={f.name}>
                <rect x={STACK_X} y={y} width={STACK_W} height="84" rx="8" fill={f.color} fillOpacity="0.06" stroke={f.color} strokeWidth="1.2" />
                <rect x={STACK_X} y={y} width={STACK_W} height="24" rx="8" fill={f.color} fillOpacity="0.12" />
                <text x={STACK_X + 12} y={y + 17} fontSize="12" fontWeight="700" fill={f.color}>{f.name}</text>
                {f.items.map((it, k) => (
                  <text key={it} x={STACK_X + 20} y={y + 40 + k * 16} fontSize="11" fill="var(--text-primary)">
                    <tspan fill={f.color}>·</tspan>
                    <tspan>{" "}</tspan>
                    <tspan>{it}</tspan>
                  </text>
                ))}
                {/* BP 标记在 foo 帧 */}
                {i === 1 && (
                  <g>
                    <line x1={STACK_X - 8} y1={y + 28} x2={STACK_X - 2} y2={y + 28} stroke="var(--warning)" strokeWidth="1.4" />
                    <text x={STACK_X - 12} y={y + 32} textAnchor="end" fontSize="11" fontWeight="700" fill="var(--warning)">BP →</text>
                  </g>
                )}
              </g>
            );
          })}
          <text x={STACK_X + STACK_W - 4} y={STACK_TOP + 3 * 96 + 4} textAnchor="end" fontSize="11" fill="var(--text-secondary)">低地址 ↓</text>

          {/* ===== 右：调用约定 ===== */}
          <text x={RIGHT_X} y={STACK_TOP - 12} fontSize="13" fontWeight="700" fill="var(--text-primary)">x86-64 调用约定</text>

          {/* 参数传递 */}
          <rect x={RIGHT_X} y={STACK_TOP} width={RIGHT_W} height="108" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x={RIGHT_X} y={STACK_TOP} width={RIGHT_W} height="24" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={RIGHT_X + 12} y={STACK_TOP + 17} fontSize="12" fontWeight="700" fill="var(--accent)">参数传递</text>
          <text x={RIGHT_X + 16} y={STACK_TOP + 40} fontSize="11" fill="var(--text-primary)">前 6 个整数/指针 → 寄存器</text>
          <text x={RIGHT_X + 16} y={STACK_TOP + 56} fontSize="11" fill="var(--text-secondary)">rdi, rsi, rdx, rcx, r8, r9</text>
          <text x={RIGHT_X + 16} y={STACK_TOP + 74} fontSize="11" fill="var(--text-primary)">浮点 → xmm0 ~ xmm7</text>
          <text x={RIGHT_X + 16} y={STACK_TOP + 92} fontSize="11" fill="var(--text-secondary)">多余参数 → 压栈</text>

          {/* 返回值 */}
          <rect x={RIGHT_X} y={STACK_TOP + 120} width={RIGHT_W} height="64" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x={RIGHT_X} y={STACK_TOP + 120} width={RIGHT_W} height="24" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x={RIGHT_X + 12} y={STACK_TOP + 137} fontSize="12" fontWeight="700" fill="var(--success)">返回值</text>
          <text x={RIGHT_X + 16} y={STACK_TOP + 160} fontSize="11" fill="var(--text-primary)">小值 → rax / xmm0</text>
          <text x={RIGHT_X + 16} y={STACK_TOP + 176} fontSize="11" fill="var(--text-secondary)">大对象 → 隐藏指针（RVO 优化）</text>

          {/* 调用成本 */}
          <rect x={RIGHT_X} y={STACK_TOP + 200} width={RIGHT_W} height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x={RIGHT_X} y={STACK_TOP + 200} width={RIGHT_W} height="24" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x={RIGHT_X + 12} y={STACK_TOP + 217} fontSize="12" fontWeight="700" fill="var(--warning)">调用成本</text>
          <text x={RIGHT_X + 16} y={STACK_TOP + 240} fontSize="11" fill="var(--text-primary)">· 建立栈帧 / 保存寄存器</text>
          <text x={RIGHT_X + 16} y={STACK_TOP + 256} fontSize="11" fill="var(--text-primary)">· 分支预测（call/ret）</text>
          <text x={RIGHT_X + 16} y={STACK_TOP + 272} fontSize="11" fill="var(--text-primary)">· 阻碍内联与跨函数优化</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 40} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 22} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            函数调用 = 压栈帧；返回 = 弹栈帧。递归每层一帧，深递归易爆栈
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每次函数调用在栈上压入一个栈帧（参数、返回地址、保存寄存器、局部变量），返回时弹出。调用约定规定参数经寄存器传递、返回值走 rax，大对象走隐藏指针。深递归因每层一帧易耗尽栈空间。
      </figcaption>
    </figure>
  );
}
