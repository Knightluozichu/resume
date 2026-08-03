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

type Region =
  | "driverEntry"
  | "controlDevice"
  | "createClose"
  | "ioctl"
  | "unload";

type Request = "create" | "ioctl" | "close";

const details: Record<Region, { title: string; content: string }> = {
  driverEntry: {
    title: "DriverEntry：初始化",
    content:
      "驱动加载时内核调用 DriverEntry。它读取注册表参数（如协议号、缓冲大小），用 IoCreateDevice 创建控制设备，用 IoCreateSymbolicLink 暴露符号链接，最后注册 Create/Close/DeviceIoControl 分发例程。返回 STATUS_SUCCESS 驱动才进入运行状态。",
  },
  controlDevice: {
    title: "控制设备与符号链接",
    content:
      "控制设备是用户程序与驱动通信的入口，符号链接（如 \\\\.\\MyDriver）是用户模式能访问的名字。创建设备时传入的 SDDL 字符串决定谁能打开它——SDDL 是访问控制的声明式语言，写成 \"D:P(A;;GA;;;SY)(A;;GA;;;BA)\" 表示只允许系统和管理员访问。",
  },
  createClose: {
    title: "Create / Close 分发例程",
    content:
      "用户程序 CreateFile 成功时，内核构造 IRP_MJ_CREATE 请求发给 Create 分发例程；CloseHandle 时发 IRP_MJ_CLOSE。驱动在这里打开/关闭每个客户会话：计数当前句柄数、分配或释放每个客户上下文。",
  },
  ioctl: {
    title: "DeviceIoControl 分发例程",
    content:
      "这是驱动的核心业务入口。用户程序通过 DeviceIoControl 发送 IOCTL 码，内核把输入/输出缓冲区按传输方法映射好，驱动在 DeviceIoControl 分发例程里解析 IOCTL 码、校验长度、执行操作并写回结果。",
  },
  unload: {
    title: "Unload：反向清理",
    content:
      "卸载时驱动必须按创建的反向顺序清理：先停止接受新请求，删除符号链接，删除设备对象，最后释放所有池内存。若还有句柄未关闭就卸载，系统可能蓝屏或留下悬空引用。",
  },
};

const requestMeta: Record<
  Request,
  { label: string; dispatch: Region; path: string; result: string }
> = {
  create: {
    label: "CreateFile",
    dispatch: "createClose",
    path: "用户模式 CreateFile → 内核 IRP_MJ_CREATE → Create 分发例程",
    result: "打开成功，获得句柄，驱动句柄计数 +1",
  },
  ioctl: {
    label: "DeviceIoControl",
    dispatch: "ioctl",
    path: "用户模式 DeviceIoControl → 内核 IRP_MJ_DEVICE_CONTROL → IOCTL 分发例程",
    result: "解析 IOCTL 码 → 校验缓冲区长度 → 执行协议操作 → 结果写回",
  },
  close: {
    label: "CloseHandle",
    dispatch: "createClose",
    path: "用户模式 CloseHandle → 内核 IRP_MJ_CLOSE → Close 分发例程",
    result: "句柄关闭，驱动句柄计数 -1，释放客户上下文",
  },
};

export function Wkp04IoctlProtocolLab() {
  const [selected, setSelected] = useState<Region>("controlDevice");
  const [request, setRequest] = useState<Request | null>(null);
  const [sddlDeny, setSddlDeny] = useState(false);

  const reset = useCallback(() => {
    setSelected("controlDevice");
    setRequest(null);
    setSddlDeny(false);
  }, []);

  const strokeFor = (region: Region) =>
    selected === region ? C.accent : C.border;
  const strokeWidthFor = (region: Region) =>
    selected === region ? 2 : 1;

  const activeDispatch = request ? requestMeta[request].dispatch : null;
  const denied = sddlDeny && request === "ioctl";

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 驱动生命周期与 IOCTL 协议流
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
          aria-label="驱动生命周期状态机与 IOCTL 请求流"
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
            驱动生命周期 · 初始化 → 运行 → 卸载
          </text>

          {/* Lifecycle stages */}
          <g onClick={() => setSelected("driverEntry")} className="cursor-pointer">
            <rect
              x={48}
              y={56}
              width={192}
              height={96}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("driverEntry")}
              strokeWidth={strokeWidthFor("driverEntry")}
            />
            <text x={144} y={84} textAnchor="middle" fontSize={13} fill={C.primary} fontWeight={500}>
              初始化
            </text>
            <text x={144} y={106} textAnchor="middle" fontSize={11} fill={C.secondary}>
              DriverEntry
            </text>
            <text x={144} y={124} textAnchor="middle" fontSize={11} fill={C.secondary}>
              注册表参数 → 创建设备
            </text>
            <text x={144} y={142} textAnchor="middle" fontSize={11} fill={C.secondary}>
              注册分发例程
            </text>
          </g>

          <g onClick={() => setSelected("createClose")} className="cursor-pointer">
            <rect
              x={264}
              y={56}
              width={192}
              height={96}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("createClose")}
              strokeWidth={strokeWidthFor("createClose")}
            />
            <text x={360} y={84} textAnchor="middle" fontSize={13} fill={C.primary} fontWeight={500}>
              运行
            </text>
            <text x={360} y={106} textAnchor="middle" fontSize={11} fill={C.secondary}>
              Create / Close 分发
            </text>
            <text x={360} y={124} textAnchor="middle" fontSize={11} fill={C.secondary}>
              IOCTL 分发
            </text>
            <text x={360} y={142} textAnchor="middle" fontSize={11} fill={C.secondary}>
              处理客户请求
            </text>
          </g>

          <g onClick={() => setSelected("unload")} className="cursor-pointer">
            <rect
              x={480}
              y={56}
              width={192}
              height={96}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("unload")}
              strokeWidth={strokeWidthFor("unload")}
            />
            <text x={576} y={84} textAnchor="middle" fontSize={13} fill={C.primary} fontWeight={500}>
              卸载
            </text>
            <text x={576} y={106} textAnchor="middle" fontSize={11} fill={C.secondary}>
              DriverUnload
            </text>
            <text x={576} y={124} textAnchor="middle" fontSize={11} fill={C.secondary}>
              删链接 → 删设备
            </text>
            <text x={576} y={142} textAnchor="middle" fontSize={11} fill={C.secondary}>
              释放全部资源
            </text>
          </g>

          {/* Stage arrows */}
          <polygon points="248,104 256,104 252,112" fill={C.border} />
          <polygon points="464,104 472,104 468,112" fill={C.border} />

          {/* User / Kernel boundary */}
          <line
            x1={48}
            y1={186}
            x2={672}
            y2={186}
            stroke={C.border}
            strokeWidth={1}
            strokeDasharray="8 4"
          />
          <text x={48} y={178} fontSize={11} fill={C.secondary}>
            用户模式
          </text>
          <text x={48} y={206} fontSize={11} fill={C.secondary}>
            内核模式
          </text>

          {/* Client (user mode) */}
          <g onClick={() => setSelected("controlDevice")} className="cursor-pointer">
            <rect
              x={48}
              y={220}
              width={288}
              height={156}
              rx={8}
              fill={C.elevated}
              stroke={strokeFor("controlDevice")}
              strokeWidth={strokeWidthFor("controlDevice")}
            />
            <text x={64} y={246} fontSize={13} fill={C.primary} fontWeight={500}>
              用户程序客户端
            </text>
            <text x={64} y={272} fontSize={11} fill={C.secondary}>
              1. CreateFile(\\.\MyDriver)
            </text>
            <text x={64} y={296} fontSize={11} fill={C.secondary}>
              2. DeviceIoControl(h, IOCTL_CODE, ...)
            </text>
            <text x={64} y={320} fontSize={11} fill={C.secondary}>
              3. CloseHandle(h)
            </text>
            <text x={64} y={352} fontSize={11} fill={C.secondary}>
              访问门禁：SDDL 决定谁能打开设备
            </text>
          </g>

          {/* Request buttons */}
          {(Object.keys(requestMeta) as Request[]).map((key, i) => (
            <g
              key={key}
              onClick={() => {
                setRequest(key);
                setSelected(requestMeta[key].dispatch);
              }}
              className="cursor-pointer"
            >
              <rect
                x={48 + i * 100}
                y={392}
                width={92}
                height={36}
                rx={6}
                fill={request === key ? C.accent : C.bg}
                stroke={request === key ? C.accent : C.border}
                strokeWidth={request === key ? 2 : 1}
              />
              <text
                x={94 + i * 100}
                y={414}
                textAnchor="middle"
                fontSize={11}
                fill={request === key ? C.bg : C.primary}
                fontWeight={500}
              >
                {requestMeta[key].label}
              </text>
            </g>
          ))}

          {/* Dispatch routines (kernel mode) */}
          <g onClick={() => setSelected("createClose")} className="cursor-pointer">
            <rect
              x={384}
              y={220}
              width={144}
              height={72}
              rx={8}
              fill={activeDispatch === "createClose" ? C.accent : C.bg}
              stroke={strokeFor("createClose")}
              strokeWidth={activeDispatch === "createClose" ? 2 : strokeWidthFor("createClose")}
            />
            <text x={456} y={250} textAnchor="middle" fontSize={12} fill={C.primary} fontWeight={500}>
              Create / Close
            </text>
            <text x={456} y={270} textAnchor="middle" fontSize={11} fill={C.secondary}>
              分发例程
            </text>
          </g>

          <g onClick={() => setSelected("ioctl")} className="cursor-pointer">
            <rect
              x={384}
              y={304}
              width={144}
              height={72}
              rx={8}
              fill={activeDispatch === "ioctl" ? (denied ? C.danger : C.accent) : C.bg}
              stroke={strokeFor("ioctl")}
              strokeWidth={activeDispatch === "ioctl" ? 2 : strokeWidthFor("ioctl")}
            />
            <text x={456} y={334} textAnchor="middle" fontSize={12} fill={C.primary} fontWeight={500}>
              DeviceIoControl
            </text>
            <text x={456} y={354} textAnchor="middle" fontSize={11} fill={C.secondary}>
              分发例程
            </text>
          </g>

          {/* Device object */}
          <g onClick={() => setSelected("controlDevice")} className="cursor-pointer">
            <rect
              x={576}
              y={250}
              width={96}
              height={96}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("controlDevice")}
              strokeWidth={strokeWidthFor("controlDevice")}
            />
            <text x={624} y={286} textAnchor="middle" fontSize={12} fill={C.primary} fontWeight={500}>
              设备对象
            </text>
            <text x={624} y={306} textAnchor="middle" fontSize={11} fill={C.secondary}>
              \Device\MyDriver
            </text>
            <text x={624} y={324} textAnchor="middle" fontSize={11} fill={C.secondary}>
              SDDL 门禁
            </text>
          </g>

          {/* Request flow arrow */}
          {request && !denied && (
            <g>
              <line
                x1={336}
                y1={240}
                x2={380}
                y2={252}
                stroke={C.accent}
                strokeWidth={2}
              />
              <polygon points="376,248 384,254 374,258" fill={C.accent} />
            </g>
          )}
          {request && !denied && activeDispatch === "ioctl" && (
            <g>
              <line
                x1={528}
                y1={330}
                x2={572}
                y2={310}
                stroke={C.accent}
                strokeWidth={2}
              />
              <polygon points="568,314 576,308 572,318" fill={C.accent} />
            </g>
          )}
          {denied && (
            <g>
              <text x={360} y={452} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>
                STATUS_ACCESS_DENIED — 缓冲区和请求被拒绝
              </text>
            </g>
          )}

          {/* SDDL toggle */}
          <text x={48} y={470} fontSize={12} fill={C.secondary}>
            SDDL 门禁：模拟"打开被拒绝"
          </text>
          <g onClick={() => setSddlDeny(!sddlDeny)} className="cursor-pointer">
            <rect
              x={240}
              y={456}
              width={44}
              height={22}
              rx={11}
              fill={sddlDeny ? C.danger : C.elevated}
              stroke={C.border}
            />
            <circle
              cx={sddlDeny ? 268 : 256}
              cy={467}
              r={8}
              fill={sddlDeny ? C.bg : C.secondary}
            />
          </g>
          <text x={300} y={470} fontSize={11} fill={sddlDeny ? C.danger : C.secondary}>
            {sddlDeny ? "拒绝打开（模拟 SDDL 不含当前用户）" : "允许打开（默认）"}
          </text>

          {/* Result strip */}
          <rect
            x={48}
            y={492}
            width={624}
            height={44}
            rx={8}
            fill={denied ? C.danger : request ? C.success : C.bg}
            opacity={denied ? 0.15 : request ? 0.12 : 1}
            stroke={denied ? C.danger : request ? C.success : C.border}
          />
          <text x={64} y={510} fontSize={11} fill={C.primary}>
            {denied
              ? "IOCTL 请求被 SDDL 门禁拦截，返回 STATUS_ACCESS_DENIED"
              : request
                ? `${requestMeta[request].path}`
                : "点击上方请求按钮，观察请求从用户模式流向哪个分发例程"}
          </text>
          <text x={64} y={528} fontSize={11} fill={C.secondary}>
            {denied
              ? "客户端收到拒绝 → 驱动句柄计数不变 → 请求未进入分发例程"
              : request
                ? requestMeta[request].result
                : "提示：先开启“拒绝打开”，再点 DeviceIoControl 看门禁如何工作"}
          </text>
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
