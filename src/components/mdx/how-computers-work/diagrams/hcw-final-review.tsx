/**
 * <HcwFinalReviewDiagram>：全书总复习图解——从硬件到应用的完整分层。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HcwFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书总复习图解——从硬件到应用的完整分层"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            计算机完整分层：从晶体管到应用
          </text>

          {/* 七层栈 */}
          {[
            { label: "⑦ 应用层", desc: "浏览器 / 编辑器 / 游戏", color: "var(--success)", y: 48 },
            { label: "⑥ 高级语言层", desc: "C / Python / Java → 编译器/解释器", color: "var(--accent)", y: 92 },
            { label: "⑤ 操作系统层", desc: "进程调度 / 内存分页 / 文件系统 / 系统调用", color: "var(--warning)", y: 136 },
            { label: "④ 汇编语言层", desc: "MOV / ADD / JMP → 直接操作寄存器和内存", color: "var(--danger)", y: 180 },
            { label: "③ 指令集层 ISA", desc: "机器语言 → 硬件和软件的接口", color: "var(--accent)", y: 224 },
            { label: "② 微架构层", desc: "门电路 → 寄存器 / ALU / 控制器 → CPU", color: "var(--warning)", y: 268 },
            { label: "① 数字逻辑层", desc: "晶体管 → 与/或/非门 → 计算的物理基础", color: "var(--text-tertiary)", y: 312 },
          ].map((layer) => (
            <g key={layer.label}>
              <rect x="100" y={layer.y} width="540" height="36" rx="6" fill={layer.color} fillOpacity="0.12" stroke={layer.color} strokeWidth="1" />
              <text x="180" y={layer.y + 22} textAnchor="middle" fontSize="11" fontWeight="600" fill={layer.color}>{layer.label}</text>
              <text x="440" y={layer.y + 22} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{layer.desc}</text>
            </g>
          ))}

          {/* 左右标注 */}
          <text x="60" y="70" textAnchor="middle" fontSize="10" fill="var(--success)" fontWeight="600">抽象</text>
          <text x="60" y="86" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&uarr;</text>
          <text x="60" y="324" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&darr;</text>
          <text x="60" y="340" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)" fontWeight="600">物理</text>

          <text x="690" y="70" textAnchor="middle" fontSize="10" fill="var(--success)" fontWeight="600">高级</text>
          <text x="690" y="86" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&uarr;</text>
          <text x="690" y="324" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&darr;</text>
          <text x="690" y="340" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)" fontWeight="600">底层</text>

          {/* 底部：核心洞察 */}
          <rect x="30" y="358" width="680" height="82" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="378" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">核心洞察：计算机是一台「层层抽象」的机器</text>
          <text x="50" y="396" textAnchor="start" fontSize="9" fill="var(--text-secondary)">每层封装下层复杂性，向上提供简洁接口 · 程序员工作在最高层，但每层机制都影响程序行为和性能</text>
          <text x="50" y="412" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">性能：缓存友好代码差 10-100x · 调试：读崩溃报告需懂虚拟内存/栈帧 · 安全：避免缓冲区/整数溢出</text>
          <text x="50" y="428" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">架构：进程/线程/I/O 模型决定系统设计 · 学习：懂底层后学任何新语言/框架都快——能看到语法糖下的本质</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习图解——从数字逻辑到应用层的七层抽象栈，每层封装下层细节向上提供接口
      </figcaption>
    </figure>
  );
}
