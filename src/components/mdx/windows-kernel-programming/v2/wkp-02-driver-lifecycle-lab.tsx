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

type StageId = "write" | "build" | "sign" | "deploy" | "load" | "run" | "unload";

type Failure = { title: string; desc: string };

type Stage = {
  id: StageId;
  num: string;
  label: string;
  title: string;
  content: string;
  failure?: Failure;
};

const stages: Stage[] = [
  {
    id: "write",
    num: "1",
    label: "编写代码",
    title: "编写代码 · DriverEntry.c",
    content:
      "编写 DriverEntry 与 DriverUnload 的 C 代码。DriverEntry 是驱动的入口函数（类似 main），接收 DriverObject 指针和注册表路径两个参数。在这里注册 Unload 回调、创建设备对象、设置派遣函数。这是整条生命周期的起点——代码错误会在后续阶段被放大。",
  },
  {
    id: "build",
    num: "2",
    label: "编译构建",
    title: "编译构建 · MSBuild + WDK",
    content:
      "用 Visual Studio + WDK + MSBuild 把 C 源码编译链接为 .sys 内核模块。必须选择正确的目标平台（x64）与 Windows 版本。.sys 不是普通 PE——它链接内核运行时，导入 ntoskrnl.exe 导出的函数。",
    failure: {
      title: "架构错配",
      desc: "把 x86 配置的驱动部署到 x64 系统（或反之），加载时直接被拒绝。内核 ABI 与 CPU 位宽绑定。修法：项目属性强制 x64，与目标系统保持一致。",
    },
  },
  {
    id: "sign",
    num: "3",
    label: "签名",
    title: "签名 · 测试签名 / .cat",
    content:
      "64 位 Windows 强制要求内核驱动有数字签名（.cat + 证书）。开发期用测试签名模式：先 bcdedit /set testsigning on，再用自签证书通过 signtool 签名 .cat 文件。未签名驱动在加载阶段会被拒绝。",
    failure: {
      title: "未签名",
      desc: "加载未签名驱动返回 STATUS_INVALID_IMAGE_HASH。原因：内核代码完整性（CI）强制签名策略。修法：开启测试签名 + 用 makecert/signtool 签名驱动包。",
    },
  },
  {
    id: "deploy",
    num: "4",
    label: "部署",
    title: "部署 · 复制 .sys / .inf / .cat",
    content:
      "把 .sys、.inf、.cat 复制到测试目标机。.inf 告诉系统如何安装驱动（硬件 ID、复制目标、服务名）。生产部署用 PnP 或驱动安装框架；开发期可直接用 sc.exe 指定 .sys 路径加载。",
  },
  {
    id: "load",
    num: "5",
    label: "加载",
    title: "加载 · sc create / SCM",
    content:
      "sc create 与 sc start 触发服务控制管理器（SCM）加载驱动。SCM 调用 NtLoadDriver，内核为 .sys 分配内存、修正重定位、解析导入表，最后调用 DriverEntry。加载成功 = DriverEntry 返回 STATUS_SUCCESS。",
  },
  {
    id: "run",
    num: "6",
    label: "运行",
    title: "运行 · 处理 IRP",
    content:
      "驱动驻留内核，响应 I/O 请求包（IRP）。用户模式客户端通过 DeviceIoControl 发送控制码，内核调用驱动注册的派遣函数处理。此时驱动与系统共享内核地址空间——任何指针错误都可能蓝屏。",
  },
  {
    id: "unload",
    num: "7",
    label: "卸载",
    title: "卸载 · sc stop + sc delete",
    content:
      "sc stop 触发 DriverUnload 回调，驱动必须释放所有资源：删除设备对象、解除回调注册、释放池内存。sc delete 从 SCM 删除服务记录。卸载不彻底会导致句柄与内存泄漏，且无法重新加载同名驱动。",
    failure: {
      title: "忘记卸载",
      desc: "驱动还在运行就改代码重编译，下次加载失败或资源泄漏。原因：SCM 服务记录仍存在，.sys 镜像仍被占用。修法：每次重部署前 sc stop && sc delete，确认 DriverUnload 真正释放全部资源。",
    },
  },
];

const VIEW_W = 780;
const VIEW_H = 220;
const NODE_W = 84;
const NODE_H = 72;
const GAP = 16;
const NODE_Y = 92;
const START_X =
  (VIEW_W - (stages.length * NODE_W + (stages.length - 1) * GAP)) / 2;

function nodeX(i: number) {
  return START_X + i * (NODE_W + GAP);
}

export function Wkp02DriverLifecycleLab() {
  const [selected, setSelected] = useState<StageId>("write");
  const [injectFaults, setInjectFaults] = useState(false);

  const reset = useCallback(() => {
    setSelected("write");
    setInjectFaults(false);
  }, []);

  const stage = stages.find((s) => s.id === selected)!;

  const strokeFor = (s: Stage) => {
    if (selected === s.id) return C.accent;
    if (injectFaults && s.failure) return C.danger;
    return C.border;
  };
  const strokeWidthFor = (s: Stage) => (selected === s.id ? 2 : 1);

  const numFill = (s: Stage) => {
    if (selected === s.id) return C.accent;
    if (injectFaults && s.failure) return C.danger;
    return C.bg;
  };
  const numTextColor = (s: Stage) =>
    selected === s.id || (injectFaults && s.failure) ? C.bg : C.secondary;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 驱动生命周期流水线
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
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label="Windows 内核驱动生命周期流水线"
        >
          {/* Title */}
          <text
            x={VIEW_W / 2}
            y={40}
            textAnchor="middle"
            fontSize={16}
            fill={C.primary}
            fontWeight={600}
          >
            内核驱动生命周期：从代码到卸载
          </text>
          <text
            x={VIEW_W / 2}
            y={62}
            textAnchor="middle"
            fontSize={11}
            fill={C.secondary}
          >
            点击任一阶段查看详情；开启&quot;注入故障&quot;高亮常见失败点
          </text>

          {/* Arrows between nodes */}
          {stages.slice(0, -1).map((s, i) => {
            const x1 = nodeX(i) + NODE_W;
            const x2 = nodeX(i + 1);
            const y = NODE_Y + NODE_H / 2;
            return (
              <g key={`arrow-${s.id}`}>
                <line
                  x1={x1}
                  y1={y}
                  x2={x2 - 4}
                  y2={y}
                  stroke={C.border}
                  strokeWidth={1.5}
                />
                <polygon
                  points={`${x2 - 4},${y - 4} ${x2 - 4},${y + 4} ${x2},${y}`}
                  fill={C.border}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {stages.map((s, i) => {
            const x = nodeX(i);
            const cx = x + NODE_W / 2;
            const isFail = injectFaults && !!s.failure;
            return (
              <g
                key={s.id}
                onClick={() => setSelected(s.id)}
                className="cursor-pointer"
              >
                <rect
                  x={x}
                  y={NODE_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill={C.elevated}
                  stroke={strokeFor(s)}
                  strokeWidth={strokeWidthFor(s)}
                />
                {/* Stage number circle */}
                <circle
                  cx={cx}
                  cy={NODE_Y + 22}
                  r={11}
                  fill={numFill(s)}
                  stroke={strokeFor(s)}
                  strokeWidth={1}
                />
                <text
                  x={cx}
                  y={NODE_Y + 26}
                  textAnchor="middle"
                  fontSize={12}
                  fill={numTextColor(s)}
                  fontWeight={600}
                >
                  {s.num}
                </text>
                {/* Stage label */}
                <text
                  x={cx}
                  y={NODE_Y + 52}
                  textAnchor="middle"
                  fontSize={12}
                  fill={C.primary}
                >
                  {s.label}
                </text>
                {/* Failure badge */}
                {isFail && (
                  <g>
                    <rect
                      x={x + 6}
                      y={NODE_Y + NODE_H + 12}
                      width={NODE_W - 12}
                      height={20}
                      rx={4}
                      fill={C.danger}
                      opacity={0.18}
                      stroke={C.danger}
                      strokeWidth={1}
                    />
                    <text
                      x={cx}
                      y={NODE_Y + NODE_H + 26}
                      textAnchor="middle"
                      fontSize={11}
                      fill={C.danger}
                      fontWeight={500}
                    >
                      {s.failure!.title}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Detail Panel */}
        <div
          className="mt-4 rounded-control border border-border p-4"
          style={{ background: C.bg }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: C.accent }}
            />
            <span className="text-sm font-medium" style={{ color: C.primary }}>
              {stage.title}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.secondary }}>
            {stage.content}
          </p>

          {injectFaults && stage.failure && (
            <div
              className="mt-3 rounded-control border p-3"
              style={{ background: C.elevated, borderColor: C.danger }}
            >
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: C.danger }}
                />
                <span
                  className="text-xs font-semibold"
                  style={{ color: C.danger }}
                >
                  故障注入 · {stage.failure.title}
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: C.secondary }}
              >
                {stage.failure.desc}
              </p>
            </div>
          )}
        </div>

        {/* Inject Faults Toggle */}
        <label className="mt-4 flex cursor-pointer items-center gap-3">
          <button
            onClick={() => setInjectFaults(!injectFaults)}
            className="relative h-5 w-9 rounded-full border border-border transition-colors"
            style={{ background: injectFaults ? C.accent : C.elevated }}
            aria-label="注入常见故障"
          >
            <span
              className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform"
              style={{
                transform: injectFaults ? "translateX(16px)" : "translateX(0)",
              }}
            />
          </button>
          <span className="text-sm" style={{ color: C.secondary }}>
            注入常见故障（高亮：架构错配 / 未签名 / 忘记卸载）
          </span>
        </label>
      </div>
    </div>
  );
}
