"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

type Region = "process" | "thread" | "vads" | "handle" | "syscall" | "kernel";

const details: Record<Region, { title: string; content: string }> = {
  process: {
    title: "进程 (Process)",
    content:
      "进程是 Windows 资源隔离的基本单位。每个进程拥有独立的虚拟地址空间、句柄表和安全令牌。进程本身不执行代码——执行代码的是它内部的线程。",
  },
  thread: {
    title: "线程 (Thread)",
    content:
      "线程是 CPU 调度的基本单位。每个线程有自己的用户态栈、内核态栈和寄存器上下文，但共享所属进程的地址空间和句柄表。一个进程可以包含多个线程并发执行。",
  },
  vads: {
    title: "虚拟地址空间 (Virtual Address Space)",
    content:
      "每个进程拥有独立的虚拟地址空间（64位下约 128TB）。虚拟地址通过页表映射到物理内存，页状态分为：空闲(灰色)、保留(黄色)、已提交(绿色)。不同进程的相同虚拟地址指向不同的物理内存。",
  },
  handle: {
    title: "句柄表 (Handle Table)",
    content:
      "用户模式代码不能直接访问内核对象。每个进程有一张句柄表，句柄是表中的索引，指向内核空间中的对象。通过句柄而非指针访问对象，内核可以控制访问权限和对象生命周期。",
  },
  syscall: {
    title: "系统调用边界 (syscall)",
    content:
      "用户模式代码通过 syscall 指令进入内核模式。CPU 从 Ring 3 切换到 Ring 0，切换栈和执行权限。这不是普通的函数调用——内核会检查参数合法性和调用者权限。",
  },
  kernel: {
    title: "内核空间 (Kernel Space)",
    content:
      "内核代码和数据存放在高地址空间，只有 Ring 0 才能访问。对象管理器创建和管理内核对象（EPROCESS、ETHREAD、FILE_OBJECT 等），实际数据结构只对内核可见。",
  },
};

const pageStates = [
  { label: "0x00400000", state: "committed", phys: "0x1A2F000" },
  { label: "0x00401000", state: "committed", phys: "0x7B14000" },
  { label: "0x00402000", state: "free", phys: "—" },
  { label: "0x00403000", state: "reserved", phys: "—" },
  { label: "0x00404000", state: "reserved", phys: "—" },
  { label: "0x00405000", state: "committed", phys: "0x3C89000" },
  { label: "0x00406000", state: "committed", phys: "0x9D02000" },
  { label: "0x00407000", state: "free", phys: "—" },
] as const;

const pageColors: Record<string, string> = {
  committed: C.success,
  free: C.border,
  reserved: C.warning,
};

const pageLabels: Record<string, string> = {
  committed: "已提交",
  free: "空闲",
  reserved: "保留",
};

export function Wkp01ProcessInternalsLab() {
  const [selected, setSelected] = useState<Region>("process");
  const [showPhysical, setShowPhysical] = useState(false);

  const reset = useCallback(() => {
    setSelected("process");
    setShowPhysical(false);
  }, []);

  const strokeFor = (region: Region) =>
    selected === region ? C.accent : C.border;
  const strokeWidthFor = (region: Region) =>
    selected === region ? 2 : 1;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ Windows 进程内部结构探索器
        </span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>

      {/* SVG Diagram */}
      <div className="p-4">
        <svg
          viewBox="0 0 720 500"
          className="w-full"
          role="img"
          aria-label="Windows 进程内部结构剖面图"
        >
          {/* Title */}
          <text
            x={360}
            y={36}
            textAnchor="middle"
            fontSize={16}
            fill={C.primary}
            fontWeight={600}
          >
            Windows 进程内部结构
          </text>

          {/* User Mode Label */}
          <text x={48} y={66} fontSize={13} fill={C.secondary}>
            用户模式 (Ring 3)
          </text>

          {/* Process Box */}
          <g onClick={() => setSelected("process")} className="cursor-pointer">
            <rect
              x={48}
              y={76}
              width={624}
              height={244}
              rx={8}
              fill={C.elevated}
              stroke={strokeFor("process")}
              strokeWidth={strokeWidthFor("process")}
            />
            <text x={64} y={96} fontSize={13} fill={C.primary} fontWeight={500}>
              进程 (Process)
            </text>
          </g>

          {/* Threads Sub-box */}
          <g onClick={() => setSelected("thread")} className="cursor-pointer">
            <rect
              x={72}
              y={108}
              width={148}
              height={196}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("thread")}
              strokeWidth={strokeWidthFor("thread")}
            />
            <text
              x={146}
              y={128}
              textAnchor="middle"
              fontSize={13}
              fill={C.primary}
              fontWeight={500}
            >
              线程
            </text>
            {/* Thread 1 */}
            <rect x={84} y={142} width={124} height={56} rx={6} fill={C.elevated} stroke={C.border} />
            <text x={146} y={164} textAnchor="middle" fontSize={12} fill={C.primary}>
              Thread 1
            </text>
            <text x={146} y={182} textAnchor="middle" fontSize={11} fill={C.secondary}>
              栈 · 寄存器上下文
            </text>
            {/* Thread 2 */}
            <rect x={84} y={210} width={124} height={56} rx={6} fill={C.elevated} stroke={C.border} />
            <text x={146} y={232} textAnchor="middle" fontSize={12} fill={C.primary}>
              Thread 2
            </text>
            <text x={146} y={250} textAnchor="middle" fontSize={11} fill={C.secondary}>
              栈 · 寄存器上下文
            </text>
          </g>

          {/* Virtual Address Space Sub-box */}
          <g onClick={() => setSelected("vads")} className="cursor-pointer">
            <rect
              x={240}
              y={108}
              width={220}
              height={196}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("vads")}
              strokeWidth={strokeWidthFor("vads")}
            />
            <text
              x={350}
              y={128}
              textAnchor="middle"
              fontSize={13}
              fill={C.primary}
              fontWeight={500}
            >
              虚拟地址空间
            </text>
            {/* Page blocks */}
            {pageStates.map((page, i) => (
              <g key={i}>
                <rect
                  x={256 + i * 24}
                  y={142}
                  width={20}
                  height={40}
                  rx={3}
                  fill={pageColors[page.state]}
                  opacity={page.state === "free" ? 0.3 : 0.7}
                />
                <text
                  x={266 + i * 24}
                  y={194}
                  textAnchor="middle"
                  fontSize={10}
                  fill={C.secondary}
                >
                  {i}
                </text>
                {showPhysical && page.state === "committed" && (
                  <text
                    x={266 + i * 24}
                    y={208}
                    textAnchor="middle"
                    fontSize={10}
                    fill={C.accent}
                  >
                    {page.phys}
                  </text>
                )}
              </g>
            ))}
            {/* Legend */}
            <rect x={256} y={232} width={12} height={12} rx={2} fill={C.success} opacity={0.7} />
            <text x={274} y={242} fontSize={11} fill={C.secondary}>
              已提交
            </text>
            <rect x={312} y={232} width={12} height={12} rx={2} fill={C.warning} opacity={0.7} />
            <text x={330} y={242} fontSize={11} fill={C.secondary}>
              保留
            </text>
            <rect x={368} y={232} width={12} height={12} rx={2} fill={C.border} opacity={0.5} />
            <text x={386} y={242} fontSize={11} fill={C.secondary}>
              空闲
            </text>
            {showPhysical && (
              <text x={350} y={270} textAnchor="middle" fontSize={11} fill={C.accent}>
                ↓ 通过页表映射到物理内存
              </text>
            )}
          </g>

          {/* Handle Table Sub-box */}
          <g onClick={() => setSelected("handle")} className="cursor-pointer">
            <rect
              x={480}
              y={108}
              width={176}
              height={196}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("handle")}
              strokeWidth={strokeWidthFor("handle")}
            />
            <text
              x={568}
              y={128}
              textAnchor="middle"
              fontSize={13}
              fill={C.primary}
              fontWeight={500}
            >
              句柄表
            </text>
            {/* Handle entries */}
            <text x={496} y={154} fontSize={12} fill={C.primary}>
              #0
            </text>
            <text x={524} y={154} fontSize={12} fill={C.secondary}>
              → 进程对象
            </text>
            <text x={496} y={182} fontSize={12} fill={C.primary}>
              #1
            </text>
            <text x={524} y={182} fontSize={12} fill={C.secondary}>
              → 线程对象
            </text>
            <text x={496} y={210} fontSize={12} fill={C.primary}>
              #2
            </text>
            <text x={524} y={210} fontSize={12} fill={C.secondary}>
              → 文件对象
            </text>
            {/* Arrow down to kernel */}
            <line
              x1={568}
              y1={232}
              x2={568}
              y2={284}
              stroke={C.accent}
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
            <polygon points="564,280 572,280 568,288" fill={C.accent} />
          </g>

          {/* Syscall Boundary */}
          <g onClick={() => setSelected("syscall")} className="cursor-pointer">
            <line
              x1={48}
              y1={338}
              x2={672}
              y2={338}
              stroke={strokeFor("syscall")}
              strokeWidth={strokeWidthFor("syscall")}
              strokeDasharray="8 4"
            />
            <rect x={328} y={326} width={64} height={20} rx={4} fill={C.elevated} stroke={C.border} />
            <text
              x={360}
              y={340}
              textAnchor="middle"
              fontSize={12}
              fill={selected === "syscall" ? C.accent : C.secondary}
              fontWeight={500}
            >
              syscall
            </text>
          </g>

          {/* Kernel Mode Label */}
          <text x={48} y={364} fontSize={13} fill={C.secondary}>
            内核模式 (Ring 0)
          </text>

          {/* Kernel Box */}
          <g onClick={() => setSelected("kernel")} className="cursor-pointer">
            <rect
              x={48}
              y={376}
              width={624}
              height={96}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("kernel")}
              strokeWidth={strokeWidthFor("kernel")}
            />
            <text x={160} y={404} textAnchor="middle" fontSize={12} fill={C.primary}>
              对象管理器
            </text>
            <text x={360} y={404} textAnchor="middle" fontSize={12} fill={C.primary}>
              内存管理器
            </text>
            <text x={560} y={404} textAnchor="middle" fontSize={12} fill={C.primary}>
              调度器
            </text>
            <text x={160} y={432} textAnchor="middle" fontSize={11} fill={C.secondary}>
              EPROCESS
            </text>
            <text x={360} y={432} textAnchor="middle" fontSize={11} fill={C.secondary}>
              页表 · 工作集
            </text>
            <text x={560} y={432} textAnchor="middle" fontSize={11} fill={C.secondary}>
              ETHREAD
            </text>
            <text x={360} y={458} textAnchor="middle" fontSize={11} fill={C.secondary}>
              内核对象的实际数据结构只对内核可见
            </text>
          </g>
        </svg>

        {/* Detail Panel */}
        <div className="mt-4 rounded-control border border-border p-4" style={{ background: C.bg }}>
          <div className="mb-2 flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: C.accent }}
            />
            <span className="text-sm font-medium" style={{ color: C.primary }}>
              {details[selected].title}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.secondary }}>
            {details[selected].content}
          </p>
        </div>

        {/* Physical Mapping Toggle */}
        <label className="mt-4 flex cursor-pointer items-center gap-3">
          <button
            onClick={() => setShowPhysical(!showPhysical)}
            className="relative h-5 w-9 rounded-full border border-border transition-colors"
            style={{ background: showPhysical ? C.accent : C.elevated }}
            aria-label="显示物理地址映射"
          >
            <span
              className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform"
              style={{ transform: showPhysical ? "translateX(16px)" : "translateX(0)" }}
            />
          </button>
          <span className="text-sm" style={{ color: C.secondary }}>
            显示物理地址映射（观察：虚拟地址相同，物理地址不同）
          </span>
        </label>
      </div>
    </div>
  );
}
