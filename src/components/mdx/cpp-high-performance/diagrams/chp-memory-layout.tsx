/**
 * <ChpMemoryLayoutDiagram>：C++ 进程内存布局（cpp-high-performance 内存管理章）。
 *
 * 把进程虚拟地址空间自下而上画成五段：text / data / bss / heap / stack。
 * 每段一张横向条带，标注：段名、存什么、生命周期、性能特征。
 * 右侧标注 heap 向上增长、stack 向下生长的箭头，点明二者相向而行的内存模型。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 五段主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

// 五段几何：每段高 44、间距 8、左右各留 40。
const SEG_W = 380;
const SEG_H = 44;
const SEG_GAP = 8;
const SEG_LEFT = 60;
const SEG_TOP = 116;

type Segment = {
  id: string;
  name: string;
  color: string;
  holds: string;
  life: string;
  perf: string;
};

// 自下而上：text → data → bss → heap → stack（图中从上到下绘制时反向，这里按地址低→高排）
const SEGMENTS: readonly Segment[] = [
  { id: "text", name: "text 代码段", color: "var(--accent)", holds: "编译后的机器指令", life: "程序运行全程", perf: "只读、常驻、命中缓存" },
  { id: "data", name: "data 已初始化全局", color: "var(--success)", holds: "非零初值的全局/静态变量", life: "程序运行全程", perf: "启动时加载、固定地址" },
  { id: "bss", name: "bss 未初始化全局", color: "var(--success)", holds: "零初值的全局/静态变量", life: "程序运行全程", perf: "不占可执行文件、启动清零" },
  { id: "heap", name: "heap 堆", color: "var(--warning)", holds: "new/malloc 动态分配", life: "手动 delete / GC 式回收", perf: "分配慢、碎片化、缓存差" },
  { id: "stack", name: "stack 栈", color: "var(--danger)", holds: "局部变量、调用帧", life: "函数返回自动回收", perf: "移动指针即分配、缓存友好" },
];

export function ChpMemoryLayoutDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 进程内存布局五段：text 代码段（存编译后机器指令，程序运行全程，只读常驻命中缓存）；data 已初始化全局（存非零初值全局/静态变量，运行全程，启动加载固定地址）；bss 未初始化全局（存零初值全局/静态变量，运行全程，不占可执行文件启动清零）；heap 堆（存 new/malloc 动态分配，手动 delete 回收，分配慢碎片化缓存差，向上增长）；stack 栈（存局部变量与调用帧，函数返回自动回收，移动指针即分配缓存友好，向下增长）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 进程内存布局 · 五段模型
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            地址从低到高：text → data → bss → heap ↑ … ↓ stack
          </text>

          {/* ===== 地址轴标注 ===== */}
          <text x="36" y={SEG_TOP - 8} fontSize="11" fill="var(--text-secondary)">低地址</text>
          <text x="36" y={SEG_TOP + SEGMENTS.length * (SEG_H + SEG_GAP) + 4} fontSize="11" fill="var(--text-secondary)">高地址</text>
          <line x1="48" y1={SEG_TOP - 4} x2="48" y2={SEG_TOP + SEGMENTS.length * (SEG_H + SEG_GAP) - SEG_GAP} stroke="var(--border)" strokeWidth="1" />

          {/* ===== 五段条带 ===== */}
          {SEGMENTS.map((s, i) => {
            const y = SEG_TOP + i * (SEG_H + SEG_GAP);
            return (
              <g key={s.id}>
                <rect x={SEG_LEFT} y={y} width={SEG_W} height={SEG_H} rx="8" fill={s.color} fillOpacity="0.10" stroke={s.color} strokeWidth="1.2" />
                <text x={SEG_LEFT + 14} y={y + 19} fontSize="13" fontWeight="700" fill={s.color}>{s.name}</text>
                <text x={SEG_LEFT + 14} y={y + 35} fontSize="11" fill="var(--text-primary)">存：{s.holds}</text>

                {/* 右侧详情列 */}
                <line x1={SEG_LEFT + SEG_W + 16} y1={y + 8} x2={SEG_LEFT + SEG_W + 16} y2={y + SEG_H - 8} stroke="var(--border)" strokeWidth="1" />
                <text x={SEG_LEFT + SEG_W + 28} y={y + 19} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">生命周期：</tspan>
                  <tspan>{s.life}</tspan>
                </text>
                <text x={SEG_LEFT + SEG_W + 28} y={y + 35} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">性能：</tspan>
                  <tspan>{s.perf}</tspan>
                </text>
              </g>
            );
          })}

          {/* ===== heap 向上 / stack 向下增长箭头 ===== */}
          <g>
            {/* heap 增长箭头（指向上方，紧贴 heap 段右侧条带内） */}
            <line x1={SEG_LEFT + SEG_W - 24} y1={SEG_TOP + 3 * (SEG_H + SEG_GAP) + SEG_H - 6} x2={SEG_LEFT + SEG_W - 24} y2={SEG_TOP + 3 * (SEG_H + SEG_GAP) + 6} stroke="var(--warning)" strokeWidth="1.6" />
            <path d={`M${SEG_LEFT + SEG_W - 28} ${SEG_TOP + 3 * (SEG_H + SEG_GAP) + 12} L${SEG_LEFT + SEG_W - 24} ${SEG_TOP + 3 * (SEG_H + SEG_GAP) + 4} L${SEG_LEFT + SEG_W - 20} ${SEG_TOP + 3 * (SEG_H + SEG_GAP) + 12}`} fill="none" stroke="var(--warning)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
            {/* stack 增长箭头（指向下方） */}
            <line x1={SEG_LEFT + SEG_W - 24} y1={SEG_TOP + 4 * (SEG_H + SEG_GAP) + 6} x2={SEG_LEFT + SEG_W - 24} y2={SEG_TOP + 4 * (SEG_H + SEG_GAP) + SEG_H - 6} stroke="var(--danger)" strokeWidth="1.6" />
            <path d={`M${SEG_LEFT + SEG_W - 28} ${SEG_TOP + 4 * (SEG_H + SEG_GAP) + SEG_H - 12} L${SEG_LEFT + SEG_W - 24} ${SEG_TOP + 4 * (SEG_H + SEG_GAP) + SEG_H - 4} L${SEG_LEFT + SEG_W - 20} ${SEG_TOP + 4 * (SEG_H + SEG_GAP) + SEG_H - 12}`} fill="none" stroke="var(--danger)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
          </g>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            栈分配几乎免费、堆分配昂贵——能上栈不上堆，能复用不新分配
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        进程虚拟地址空间分五段：text 存指令只读常驻，data/bss 存全局变量，heap 与 stack 相向而行。栈分配只是移动栈指针、缓存友好；堆分配要走分配器、易碎片、缓存差。高性能代码应优先栈上分配与对象复用。
      </figcaption>
    </figure>
  );
}
