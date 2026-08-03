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

type Region = "irp" | "devstack" | "stackloc" | "buffered" | "direct" | "complete";

type Transfer = "buffered" | "direct";

const details: Record<Region, { title: string; content: string }> = {
  irp: {
    title: "IRP：I/O 请求包",
    content:
      "IRP（I/O Request Packet）是内核给驱动的工作单：用户调用 ReadFile/WriteFile/DeviceIoControl 时，I/O 管理器创建 IRP，填好请求类型（MajorFunction）、参数和缓冲区，沿设备栈逐层下发。驱动处理完必须调用 IoCompleteRequest 标记完成，请求才能返回用户模式。",
  },
  devstack: {
    title: "设备栈",
    content:
      "设备栈是处理同一请求的一串设备对象：过滤驱动、功能驱动、总线驱动从上到下叠放。IRP 从栈顶进入，逐层向下传递，每层驱动都有机会处理、修改或拦截。你自己的驱动通常附加在功能设备对象（FDO）上。",
  },
  stackloc: {
    title: "I/O 栈位置",
    content:
      "每个 IRP 带一串 I/O 栈位置（IO_STACK_LOCATION），设备栈每一层各占一个。当前层用 IoGetCurrentIrpStackLocation 拿自己的参数（MajorFunction、IOCTL 码、缓冲区长度），向下传递用 IoSkipCurrentIrpStackLocation 让下一层读自己的。栈位置是“每层工位的工作单副本”——各层各看各的，互不干扰。",
  },
  buffered: {
    title: "缓冲 I/O（METHOD_BUFFERED）",
    content:
      "缓冲 I/O 时，I/O 管理器把用户输入复制到内核 SystemBuffer，驱动在 SystemBuffer 里干活，完成后系统再把输出复制回用户缓冲区。输入输出共用一块缓冲区。最安全（用户指针永不直接可见），适合小数据量的控制类请求；大块数据要多一次复制，性能吃亏。",
  },
  direct: {
    title: "直接 I/O（METHOD_IN_DIRECT / OUT_DIRECT）",
    content:
      "直接 I/O 时，I/O 管理器为输出缓冲区建 MDL（内存描述符表），把用户内存锁定并映射到内核，驱动通过 MDL 直接读写——零复制。适合大块数据传输（如磁盘读写）。注意：MDL 描述的页面已被锁定，访问安全，但缓冲区是用户的，内容仍可能被并发修改。",
  },
  complete: {
    title: "完成请求",
    content:
      "驱动处理完 IRP 必须调用 IoCompleteRequest：设置 IoStatus.Status（结果码）和 IoStatus.Information（传输字节数），然后标记完成，I/O 管理器把结果送回发起者。每个 IRP 只能完成一次——双完成或永不完成都是严重的驱动 bug（挂起或崩溃）。",
  },
};

export function Wkp07IrpJourneyLab() {
  const [selected, setSelected] = useState<Region>("irp");
  const [transfer, setTransfer] = useState<Transfer>("buffered");
  const [layer, setLayer] = useState(1); // 0 filter / 1 fdo / 2 bus

  const reset = useCallback(() => {
    setSelected("irp");
    setTransfer("buffered");
    setLayer(1);
  }, []);

  const strokeFor = (region: Region) =>
    selected === region ? C.accent : C.border;
  const strokeWidthFor = (region: Region) =>
    selected === region ? 2 : 1;

  const layerNames = ["过滤驱动", "功能驱动（你的驱动）", "总线驱动"];

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ IRP 旅程：从用户请求到完成
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
          viewBox="0 0 720 560"
          className="w-full"
          role="img"
          aria-label="IRP 生命周期、设备栈与缓冲区传输方法"
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
            IRP 旅程：用户请求 → 设备栈 → 完成
          </text>

          {/* User request */}
          <g onClick={() => setSelected("irp")} className="cursor-pointer">
            <rect
              x={48}
              y={56}
              width={288}
              height={76}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("irp")}
              strokeWidth={strokeWidthFor("irp")}
            />
            <text x={64} y={82} fontSize={13} fill={C.primary} fontWeight={500}>
              用户模式请求
            </text>
            <text x={64} y={106} fontSize={11} fill={C.secondary}>
              ReadFile / WriteFile / DeviceIoControl
            </text>
            <text x={64} y={124} fontSize={11} fill={C.secondary}>
              → I/O 管理器创建 IRP，填栈位置
            </text>
          </g>

          {/* IRP object */}
          <g onClick={() => setSelected("irp")} className="cursor-pointer">
            <rect
              x={384}
              y={56}
              width={288}
              height={76}
              rx={8}
              fill={C.elevated}
              stroke={strokeFor("irp")}
              strokeWidth={strokeWidthFor("irp")}
            />
            <text x={400} y={82} fontSize={13} fill={C.primary} fontWeight={500}>
              IRP（工作单）
            </text>
            <text x={400} y={106} fontSize={11} fill={C.secondary}>
              MajorFunction: IRP_MJ_READ
            </text>
            <text x={400} y={124} fontSize={11} fill={C.secondary}>
              IoStatus: pending → completed
            </text>
          </g>

          {/* Arrow user → IRP */}
          <line x1={336} y1={94} x2={380} y2={94} stroke={C.accent} strokeWidth={2} />
          <polygon points="376,90 384,94 376,98" fill={C.accent} />

          {/* Device stack */}
          <g onClick={() => setSelected("devstack")} className="cursor-pointer">
            <rect
              x={48}
              y={152}
              width={624}
              height={230}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("devstack")}
              strokeWidth={strokeWidthFor("devstack")}
            />
            <text x={64} y={178} fontSize={13} fill={C.primary} fontWeight={500}>
              设备栈（IRP 逐层向下）
            </text>
          </g>

          {/* Layers */}
          {[0, 1, 2].map((i) => (
            <g
              key={i}
              onClick={() => {
                setLayer(i);
                setSelected("stackloc");
              }}
              className="cursor-pointer"
            >
              <rect
                x={72}
                y={192 + i * 60}
                width={320}
                height={48}
                rx={6}
                fill={layer === i ? C.accent : C.elevated}
                stroke={layer === i ? C.accent : C.border}
                strokeWidth={layer === i ? 2 : 1}
              />
              <text
                x={88}
                y={214 + i * 60}
                fontSize={12}
                fill={layer === i ? C.bg : C.primary}
                fontWeight={500}
              >
                {layerNames[i]}
              </text>
              <text
                x={88}
                y={232 + i * 60}
                fontSize={11}
                fill={layer === i ? C.bg : C.secondary}
              >
                {i === 0 ? "可拦截/修改请求" : i === 1 ? "处理 IRP 的业务逻辑" : "最终落地硬件"}
              </text>
            </g>
          ))}

          {/* Stack location panel */}
          <g onClick={() => setSelected("stackloc")} className="cursor-pointer">
            <rect
              x={420}
              y={192}
              width={228}
              height={148}
              rx={8}
              fill={C.elevated}
              stroke={strokeFor("stackloc")}
              strokeWidth={strokeWidthFor("stackloc")}
            />
            <text x={436} y={218} fontSize={12} fill={C.primary} fontWeight={500}>
              当前层 I/O 栈位置
            </text>
            <text x={436} y={242} fontSize={11} fill={C.secondary}>
              {layerNames[layer]} 的工作单副本
            </text>
            <text x={436} y={266} fontSize={11} fill={C.secondary}>
              MajorFunction: IRP_MJ_READ
            </text>
            <text x={436} y={290} fontSize={11} fill={C.secondary}>
              Parameters.Read.Length: 4096
            </text>
            <text x={436} y={314} fontSize={11} fill={C.secondary}>
              IoGetCurrentIrpStackLocation(Irp)
            </text>
          </g>

          {/* Transfer methods */}
          <text x={48} y={412} fontSize={13} fill={C.primary} fontWeight={500}>
            用户缓冲区传输方法
          </text>
          {(["buffered", "direct"] as Transfer[]).map((key, i) => (
            <g
              key={key}
              onClick={() => {
                setTransfer(key);
                setSelected(key);
              }}
              className="cursor-pointer"
            >
              <rect
                x={48 + i * 200}
                y={424}
                width={192}
                height={36}
                rx={6}
                fill={transfer === key ? C.accent : C.bg}
                stroke={transfer === key ? C.accent : C.border}
                strokeWidth={transfer === key ? 2 : 1}
              />
              <text
                x={144 + i * 200}
                y={446}
                textAnchor="middle"
                fontSize={11}
                fill={transfer === key ? C.bg : C.primary}
                fontWeight={500}
              >
                {key === "buffered" ? "缓冲 I/O（BUFFERED）" : "直接 I/O（DIRECT/MDL）"}
              </text>
            </g>
          ))}

          {/* Buffer detail */}
          <g onClick={() => setSelected(transfer)} className="cursor-pointer">
            <rect
              x={48}
              y={476}
              width={624}
              height={56}
              rx={8}
              fill={C.bg}
              stroke={strokeFor(transfer)}
              strokeWidth={strokeWidthFor(transfer)}
            />
            <text x={64} y={500} fontSize={11} fill={C.primary}>
              {transfer === "buffered"
                ? "SystemBuffer：输入已复制进来，输出复制回去（两次复制，安全）"
                : "MdlAddress：用户页已锁定并映射，驱动直接读写（零复制，大块数据）"}
            </text>
            <text x={64} y={520} fontSize={11} fill={C.secondary}>
              {transfer === "buffered"
                ? "驱动访问 Irp->SystemBuffer，完成后系统自动把输出拷回用户缓冲区"
                : "驱动用 MmGetSystemAddressForMdlSafe 拿映射地址，用完后 IoFreeMdl 由系统回收"}
            </text>
          </g>

          {/* Completion strip */}
          <g onClick={() => setSelected("complete")} className="cursor-pointer">
            <rect
              x={48}
              y={548 - 44}
              width={624}
              height={40}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("complete")}
              strokeWidth={strokeWidthFor("complete")}
            />
            <text x={64} y={548 - 26} fontSize={11} fill={C.primary}>
              完成：设置 IoStatus.Status / Information → IoCompleteRequest(Irp, IO_NO_INCREMENT)
            </text>
            <text x={64} y={548 - 8} fontSize={10} fill={C.secondary}>
              每个 IRP 只完成一次；不完成 = 调用方永久挂起，双完成 = 系统崩溃
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
      </div>
    </div>
  );
}
