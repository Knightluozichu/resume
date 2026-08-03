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

type Region = "host" | "link" | "target" | "symbol" | "breakpoint" | "dump";

type Breakpoint = "driverEntry" | "dispatch" | "unload";

const details: Record<Region, { title: string; content: string }> = {
  host: {
    title: "宿主机（调试机）",
    content:
      "宿主机运行 WinDbg，是观察窗口所在。它不运行被调试的驱动，而是通过调试链路控制目标机：设置断点、查看寄存器、回溯调用栈、读取内存。宿主机的 WinDbg 需要正确加载符号文件，否则看到的只是地址不是函数名。",
  },
  link: {
    title: "调试链路",
    content:
      "宿主与目标之间通过串口、网络或 USB 连接。目标机启动时用 bcdedit 开启调试模式，内核在启动早期就等待调试器连接。链路断开时目标机可以继续运行，但宿主无法打断它。",
  },
  target: {
    title: "目标机（被测机）",
    content:
      "目标机是运行被调试驱动的机器，必须是可丢弃的测试环境——驱动蓝屏只会损失这台机器。目标机用 bcdedit /debug on 开启内核调试，通过调试端口等待宿主机连接。",
  },
  symbol: {
    title: "符号文件",
    content:
      "符号文件（.pdb）把二进制地址映射回函数名、变量名和源文件行号。调试驱动必须加载与 .sys 完全同版本的 .pdb——版本错配时 WinDbg 显示的调用栈全是乱码地址，无法定位问题。",
  },
  breakpoint: {
    title: "断点",
    content:
      "断点让目标机在指定函数或地址处暂停执行，控制权交给宿主机。内核调试支持按函数名断点（bp MyDriver!MyDeviceControl）、按地址断点，以及数据断点（访问特定内存时触发）。",
  },
  dump: {
    title: "崩溃转储",
    content:
      "目标机蓝屏时，如果配置了转储文件，系统会把崩溃时的内存镜像保存为 .dmp 文件。宿主机用 !analyze -v 分析转储，直接得到崩溃模块、错误码和调用栈——这是定位驱动崩溃的起点。",
  },
};

const breakpointMeta: Record<
  Breakpoint,
  { label: string; command: string; stack: string[]; note: string }
> = {
  driverEntry: {
    label: "DriverEntry",
    command: "bp MyDriver!DriverEntry",
    stack: [
      "nt!IopLoadDriver+0x9a",
      "nt!NtLoadDriver+0x4f",
      "nt!KiSystemServiceCopyEnd+0x25",
    ],
    note: "断点命中：驱动加载入口，此时设备对象还没创建",
  },
  dispatch: {
    label: "DeviceIoControl",
    command: "bp MyDriver!MyDeviceControl",
    stack: [
      "MyDriver!MyDeviceControl+0x14",
      "nt!IofCallDriver+0x51",
      "nt!IopXxxControlFile+0xa1",
      "nt!NtDeviceIoControlFile+0x2a",
    ],
    note: "断点命中：业务分发例程，可检查 IOCTL 码和缓冲区长度",
  },
  unload: {
    label: "DriverUnload",
    command: "bp MyDriver!DriverUnload",
    stack: [
      "MyDriver!DriverUnload+0x8",
      "nt!NtUnloadDriver+0x3d",
      "nt!KiSystemServiceCopyEnd+0x25",
    ],
    note: "断点命中：卸载入口，可核对清理顺序",
  },
};

const stackLines = [
  "MyDriver!MyDeviceControl+0x14",
  "nt!IofCallDriver+0x51",
  "nt!IopXxxControlFile+0xa1",
  "nt!NtDeviceIoControlFile+0x2a",
  "nt!KiSystemServiceCopyEnd+0x25",
];

export function Wkp05DebuggingLab() {
  const [selected, setSelected] = useState<Region>("host");
  const [bp, setBp] = useState<Breakpoint>("dispatch");
  const [stepping, setStepping] = useState(false);
  const [symbolsOn, setSymbolsOn] = useState(true);

  const reset = useCallback(() => {
    setSelected("host");
    setBp("dispatch");
    setStepping(false);
    setSymbolsOn(true);
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
          ⚡ 宿主—目标内核调试工作台
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
          aria-label="宿主目标内核调试架构与断点调用栈"
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
            内核调试：宿主机观察，目标机执行
          </text>

          {/* Host */}
          <g onClick={() => setSelected("host")} className="cursor-pointer">
            <rect
              x={48}
              y={56}
              width={240}
              height={180}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("host")}
              strokeWidth={strokeWidthFor("host")}
            />
            <text x={64} y={84} fontSize={13} fill={C.primary} fontWeight={500}>
              宿主机（WinDbg）
            </text>
            <text x={64} y={110} fontSize={11} fill={C.secondary}>
              kd&gt; bp MyDriver!MyDeviceControl
            </text>
            <text x={64} y={132} fontSize={11} fill={C.secondary}>
              kd&gt; g            （继续运行）
            </text>
            <text x={64} y={154} fontSize={11} fill={C.secondary}>
              kd&gt; k            （回溯调用栈）
            </text>
            <text x={64} y={176} fontSize={11} fill={C.secondary}>
              kd&gt; !analyze -v  （分析崩溃）
            </text>
            <text x={64} y={204} fontSize={11} fill={C.secondary}>
              符号加载：{symbolsOn ? "已加载 .pdb ✓" : "未加载 ✗ 栈显示地址"}
            </text>
          </g>

          {/* Link */}
          <g onClick={() => setSelected("link")} className="cursor-pointer">
            <line
              x1={288}
              y1={146}
              x2={432}
              y2={146}
              stroke={strokeFor("link")}
              strokeWidth={strokeWidthFor("link")}
              strokeDasharray="8 4"
            />
            <rect x={330} y={128} width={60} height={20} rx={4} fill={C.elevated} stroke={C.border} />
            <text
              x={360}
              y={142}
              textAnchor="middle"
              fontSize={11}
              fill={selected === "link" ? C.accent : C.secondary}
              fontWeight={500}
            >
              调试链路
            </text>
            <text x={360} y={168} textAnchor="middle" fontSize={11} fill={C.secondary}>
              串口 / 网络 / USB
            </text>
          </g>

          {/* Target */}
          <g onClick={() => setSelected("target")} className="cursor-pointer">
            <rect
              x={432}
              y={56}
              width={240}
              height={180}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("target")}
              strokeWidth={strokeWidthFor("target")}
            />
            <text x={448} y={84} fontSize={13} fill={C.primary} fontWeight={500}>
              目标机（测试 VM）
            </text>
            <text x={448} y={110} fontSize={11} fill={C.secondary}>
              bcdedit /debug on
            </text>
            <text x={448} y={132} fontSize={11} fill={C.secondary}>
              bcdedit /dbgsettings net hostip:192.168.1.10
            </text>
            <text x={448} y={154} fontSize={11} fill={C.secondary}>
              sc start MyDriver
            </text>
            <text x={448} y={176} fontSize={11} fill={C.secondary}>
              驱动蓝屏 → 转储 .dmp
            </text>
            <text x={448} y={204} fontSize={11} fill={C.secondary}>
              可丢弃环境：快照随时可恢复
            </text>
          </g>

          {/* Breakpoint selector */}
          <text x={48} y={276} fontSize={13} fill={C.primary} fontWeight={500}>
            选择断点位置
          </text>
          {(Object.keys(breakpointMeta) as Breakpoint[]).map((key, i) => (
            <g
              key={key}
              onClick={() => {
                setBp(key);
                setSelected("breakpoint");
              }}
              className="cursor-pointer"
            >
              <rect
                x={48 + i * 160}
                y={288}
                width={152}
                height={36}
                rx={6}
                fill={bp === key ? C.accent : C.bg}
                stroke={bp === key ? C.accent : C.border}
                strokeWidth={bp === key ? 2 : 1}
              />
              <text
                x={124 + i * 160}
                y={310}
                textAnchor="middle"
                fontSize={11}
                fill={bp === key ? C.bg : C.primary}
                fontWeight={500}
              >
                {breakpointMeta[key].label}
              </text>
            </g>
          ))}

          {/* Command strip */}
          <rect
            x={48}
            y={340}
            width={624}
            height={36}
            rx={6}
            fill={C.bg}
            stroke={C.border}
          />
          <text x={64} y={362} fontSize={11} fill={symbolsOn ? C.success : C.warning}>
            kd&gt; {breakpointMeta[bp].command}   （命中后按 g 继续 / 按 p 单步）
          </text>

          {/* Call stack */}
          <g onClick={() => setSelected("symbol")} className="cursor-pointer">
            <rect
              x={48}
              y={392}
              width={300}
              height={144}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("symbol")}
              strokeWidth={strokeWidthFor("symbol")}
            />
            <text x={64} y={416} fontSize={12} fill={C.primary} fontWeight={500}>
              调用栈（kd&gt; k）
            </text>
            {stackLines.map((line, i) => (
              <text
                key={i}
                x={64}
                y={440 + i * 18}
                fontSize={11}
                fill={i === 0 ? C.accent : C.secondary}
              >
                {symbolsOn ? line : line.replace(/!.*$/, "!0x????")}
              </text>
            ))}
          </g>

          {/* Dump analysis */}
          <g onClick={() => setSelected("dump")} className="cursor-pointer">
            <rect
              x={372}
              y={392}
              width={300}
              height={144}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("dump")}
              strokeWidth={strokeWidthFor("dump")}
            />
            <text x={388} y={416} fontSize={12} fill={C.primary} fontWeight={500}>
              崩溃转储分析（!analyze -v）
            </text>
            <text x={388} y={440} fontSize={11} fill={C.secondary}>
              BugCheck 0xD1  DRIVER_IRQL_NOT_LESS_OR_EQUAL
            </text>
            <text x={388} y={462} fontSize={11} fill={C.secondary}>
              Probably caused by : MyDriver.sys
            </text>
            <text x={388} y={484} fontSize={11} fill={C.secondary}>
              首错地址：MyDeviceControl+0x14
            </text>
            <text x={388} y={506} fontSize={11} fill={C.secondary}>
              → 检查 IRQL 与缓冲区访问（对应第 3 章规则）
            </text>
          </g>

          {/* Step toggle */}
          <g onClick={() => setStepping(!stepping)} className="cursor-pointer">
            <rect
              x={48}
              y={552 - 60}
              width={44}
              height={22}
              rx={11}
              fill={stepping ? C.accent : C.elevated}
              stroke={C.border}
            />
            <circle
              cx={stepping ? 76 : 60}
              cy={552 - 49}
              r={8}
              fill={stepping ? C.bg : C.secondary}
            />
          </g>
          <text x={104} y={552 - 48} fontSize={11} fill={stepping ? C.accent : C.secondary}>
            {stepping
              ? "单步模式：每按一次 g 执行一条指令（p）"
              : "连续模式：g 直接跑到下一个断点"}
          </text>
          <text x={48} y={556} fontSize={11} fill={C.secondary}>
            提示：符号开关模拟 .sympath / .reload；真实调试需目标 build 同版本的 .pdb
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
