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

type Region = "altitude" | "instance" | "pre" | "post" | "context" | "port";

type Op = "create" | "setinfo" | "write";

const details: Record<Region, { title: string; content: string }> = {
  altitude: {
    title: "高度（Altitude）与加载组",
    content:
      "高度是唯一的十进制数字字符串（如 320000），决定过滤器在卷上的栈顺序：数字越大越靠近应用层，越小越靠近文件系统。IRP 从栈顶向下传。两个过滤器不能同高度；高度由加载组（load order group）与安装 INF 共同决定，正式产品需向微软申请分配范围。",
  },
  instance: {
    title: "实例（Instance）",
    content:
      "实例是过滤器对某个卷的附着：FltStartFiltering 之后，内核按注册的实例回调把过滤器附加到每个卷上。没有实例的过滤器只是加载了但不在任何 I/O 路径上。卸载时先断开实例再注销过滤器，顺序颠倒会留下悬空回调。",
  },
  pre: {
    title: "操作前回调（PreOperationCallback）",
    content:
      "IRP 到达该层时先调 pre 回调：可观察、可修改参数。返回 FLT_PREOP_SUCCESS_WITH_CALLBACK（继续下传且要 post）、FLT_PREOP_COMPLETE（直接完成，不再下传）、FLT_PREOP_SYNCHRONIZE（同步处理）。删除保护就在 pre 里拦 IRP_MJ_SET_INFORMATION 的删除请求并返回 FLT_PREOP_COMPLETE。",
  },
  post: {
    title: "操作后回调（PostOperationCallback）",
    content:
      "IRP 被下层处理完返回时调 post 回调：检查最终状态、释放 pre 里分配的资源。注意：pre 返回 FLT_PREOP_COMPLETE 的请求不会有 post——被拦截的操作没有“回程”。post 只能观察结果，不能改变已发生的操作。",
  },
  context: {
    title: "上下文（Context）",
    content:
      "上下文是过滤器挂在文件、流、实例、卷等对象上的私有数据，用 FltAllocateContext 分配、FltSetStreamContext 挂载、FltGetXxxContext 取用、FltReleaseContext 释放。引用计数制：谁取谁释放。忘记释放 = 引用泄漏，Filter Verifier 会当场报错。",
  },
  port: {
    title: "通信端口（Communication Port）",
    content:
      "通信端口是过滤器与用户模式对话的通道：内核 FltCreateCommunicationPort 创建，用户模式 FilterConnectCommunicationPort 连接，FltSendMessage / FilterGetMessage 双向发消息。卸载前先断开所有客户端连接，再关闭端口、注销过滤器。",
  },
};

const filters = [
  {
    alt: "320000",
    name: "ProtectFilter（删除保护）",
    group: "FSFilter Anti-Virus",
  },
  {
    alt: "180000",
    name: "BackupFilter（备份）",
    group: "FSFilter Continuous Backup",
  },
  {
    alt: "10000",
    name: "MonitorFilter（监控）",
    group: "FSFilter Activity Monitor",
  },
];

const ops: Record<Op, { label: string; mj: string }> = {
  create: { label: "创建文件", mj: "IRP_MJ_CREATE" },
  setinfo: { label: "删除文件", mj: "IRP_MJ_SET_INFORMATION" },
  write: { label: "写入文件", mj: "IRP_MJ_WRITE" },
};

export function Wkp10MinifilterStackLab() {
  const [selected, setSelected] = useState<Region>("pre");
  const [op, setOp] = useState<Op>("create");
  const [protect, setProtect] = useState(false);

  const reset = useCallback(() => {
    setSelected("pre");
    setOp("create");
    setProtect(false);
  }, []);

  const strokeFor = (region: Region) =>
    selected === region ? C.accent : C.border;
  const strokeWidthFor = (region: Region) =>
    selected === region ? 2 : 1;

  // 删除保护拦截：ProtectFilter（层 0）pre 返回 FLT_PREOP_COMPLETE
  const blocked = protect && op === "setinfo";

  const layerY = (i: number) => 192 + i * 70;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ Minifilter 栈：高度、实例与 pre/post 回调
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
          aria-label="Minifilter 过滤器栈、高度排序与前后回调"
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
            IRP 沿过滤器栈下传：pre 先拦，post 收尾
          </text>

          {/* Operation buttons */}
          <text x={48} y={58} fontSize={13} fill={C.primary} fontWeight={500}>
            选择操作（选择后沿栈下传）
          </text>
          {(Object.keys(ops) as Op[]).map((key, i) => (
            <g
              key={key}
              onClick={() => {
                setOp(key);
                setSelected("pre");
              }}
              className="cursor-pointer"
            >
              <rect
                x={48 + i * 158}
                y={66}
                width={150}
                height={36}
                rx={6}
                fill={op === key ? C.accent : C.bg}
                stroke={op === key ? C.accent : C.border}
                strokeWidth={op === key ? 2 : 1}
              />
              <text
                x={123 + i * 158}
                y={82}
                textAnchor="middle"
                fontSize={11}
                fill={op === key ? C.bg : C.primary}
                fontWeight={500}
              >
                {ops[key].label}
              </text>
              <text
                x={123 + i * 158}
                y={96}
                textAnchor="middle"
                fontSize={11}
                fill={op === key ? C.bg : C.secondary}
              >
                {ops[key].mj}
              </text>
            </g>
          ))}

          {/* Protect toggle */}
          <g
            onClick={() => {
              setProtect(!protect);
            }}
            className="cursor-pointer"
          >
            <rect
              x={48}
              y={122}
              width={44}
              height={22}
              rx={11}
              fill={protect ? C.danger : C.elevated}
              stroke={C.border}
            />
            <circle
              cx={protect ? 76 : 60}
              cy={133}
              r={8}
              fill={protect ? C.bg : C.secondary}
            />
          </g>
          <text x={104} y={137} fontSize={11} fill={protect ? C.danger : C.secondary}>
            {protect
              ? "删除保护开启：ProtectFilter 在 pre 拦截删除（FLT_PREOP_COMPLETE）"
              : "删除保护关闭：所有操作放行下传"}
          </text>

          {/* Stack title */}
          <text x={48} y={182} fontSize={13} fill={C.primary} fontWeight={500}>
            过滤器栈（Altitude 从高到低，IRP 先到高层）
          </text>

          {/* Filter layers */}
          {filters.map((f, i) => {
            const y = layerY(i);
            const isBlocked = blocked && i === 0;
            return (
              <g key={f.alt}>
                {/* Layer body: click → altitude */}
                <g
                  onClick={() => setSelected("altitude")}
                  className="cursor-pointer"
                >
                  <rect
                    x={48}
                    y={y}
                    width={392}
                    height={58}
                    rx={8}
                    fill={isBlocked ? C.danger : C.bg}
                    opacity={isBlocked ? 0.12 : 1}
                    stroke={selected === "altitude" ? C.accent : C.border}
                    strokeWidth={selected === "altitude" ? 2 : 1}
                  />
                  <text
                    x={64}
                    y={y + 22}
                    fontSize={13}
                    fill={C.primary}
                    fontWeight={500}
                  >
                    {f.name}
                  </text>
                  <text x={64} y={y + 42} fontSize={11} fill={C.secondary}>
                    Altitude {f.alt} · {f.group}
                  </text>
                </g>

                {/* Pre badge */}
                <g
                  onClick={() => setSelected("pre")}
                  className="cursor-pointer"
                >
                  <rect
                    x={268}
                    y={y + 8}
                    width={80}
                    height={24}
                    rx={6}
                    fill={isBlocked ? C.danger : C.elevated}
                    stroke={isBlocked ? C.danger : selected === "pre" ? C.accent : C.border}
                    strokeWidth={isBlocked || selected === "pre" ? 2 : 1}
                  />
                  <text
                    x={308}
                    y={y + 24}
                    textAnchor="middle"
                    fontSize={11}
                    fill={isBlocked ? C.bg : C.primary}
                    fontWeight={500}
                  >
                    {isBlocked ? "Pre ⛔ 拦截" : "Pre 回调"}
                  </text>
                </g>

                {/* Post badge */}
                <g
                  onClick={() => setSelected("post")}
                  className="cursor-pointer"
                >
                  <rect
                    x={356}
                    y={y + 8}
                    width={76}
                    height={24}
                    rx={6}
                    fill={isBlocked ? C.elevated : C.elevated}
                    stroke={selected === "post" ? C.accent : C.border}
                    strokeWidth={selected === "post" ? 2 : 1}
                  />
                  <text
                    x={394}
                    y={y + 24}
                    textAnchor="middle"
                    fontSize={11}
                    fill={isBlocked ? C.secondary : C.primary}
                    fontWeight={500}
                  >
                    {isBlocked ? "Post ✗" : "Post 回调"}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Volume: click → instance */}
          <g onClick={() => setSelected("instance")} className="cursor-pointer">
            <rect
              x={48}
              y={404}
              width={392}
              height={52}
              rx={8}
              fill={C.elevated}
              stroke={strokeFor("instance")}
              strokeWidth={strokeWidthFor("instance")}
            />
            <text x={64} y={428} fontSize={13} fill={C.primary} fontWeight={500}>
              卷 C:（文件系统）
            </text>
            <text x={64} y={448} fontSize={11} fill={C.secondary}>
              每个卷一条实例链：过滤器附加到卷后才进入 I/O 路径
            </text>
          </g>

          {/* Context panel */}
          <g onClick={() => setSelected("context")} className="cursor-pointer">
            <rect
              x={456}
              y={192}
              width={216}
              height={94}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("context")}
              strokeWidth={strokeWidthFor("context")}
            />
            <text x={472} y={216} fontSize={12} fill={C.primary} fontWeight={500}>
              文件 / 流上下文
            </text>
            <text x={472} y={240} fontSize={11} fill={C.secondary}>
              FltAllocateContext → FltSetStreamContext
            </text>
            <text x={472} y={260} fontSize={11} fill={C.secondary}>
              引用计数：谁取谁释放，泄漏 = Verifier 报错
            </text>
          </g>

          {/* Port panel */}
          <g onClick={() => setSelected("port")} className="cursor-pointer">
            <rect
              x={456}
              y={302}
              width={216}
              height={94}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("port")}
              strokeWidth={strokeWidthFor("port")}
            />
            <text x={472} y={326} fontSize={12} fill={C.primary} fontWeight={500}>
              通信端口
            </text>
            <text x={472} y={350} fontSize={11} fill={C.secondary}>
              FltCreateCommunicationPort
            </text>
            <text x={472} y={370} fontSize={11} fill={C.secondary}>
              用户模式 FilterConnectCommunicationPort
            </text>
          </g>

          {/* Result strip */}
          <rect
            x={48}
            y={472}
            width={624}
            height={40}
            rx={8}
            fill={blocked ? C.danger : C.bg}
            opacity={blocked ? 0.12 : 1}
            stroke={blocked ? C.danger : C.border}
          />
          <text x={64} y={488} fontSize={11} fill={C.primary}>
            {blocked
              ? `删除被拦截：ProtectFilter 的 pre 返回 FLT_PREOP_COMPLETE，${ops[op].mj} 不再下传，post 不执行`
              : `当前模拟：${ops[op].mj} 沿栈下传 → 各层 pre 依次执行 → 卷处理 → 返回时各层 post 逆序执行`}
          </text>
          <text x={64} y={504} fontSize={10} fill={C.secondary}>
            {blocked
              ? "（层 0 的 Post 徽章显示 ✗：被拦截的请求没有回程）"
              : "（点击任意徽章 / 层 / 面板查看说明）"}
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
