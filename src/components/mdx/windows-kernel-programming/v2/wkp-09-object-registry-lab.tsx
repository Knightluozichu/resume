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
  | "obRegister"
  | "obPre"
  | "obPost"
  | "regNotify"
  | "regPre"
  | "regPost"
  | "client";

type ObOp = "open" | "duplicate";
type RegOp = "query" | "set" | "delete";

const details: Record<Region, { title: string; content: string }> = {
  obRegister: {
    title: "对象通知注册（ObRegisterCallbacks）",
    content:
      "ObRegisterCallbacks 让驱动监视指定对象类型（如进程、线程）的句柄操作。注册时声明感兴趣的操作类别（句柄打开、复制、关闭），返回一个注册句柄（Cookie）——卸载时必须用它注销，否则回调悬空。",
  },
  obPre: {
    title: "操作前回调（PreOperation）",
    content:
      "操作前回调在句柄操作真正发生之前调用，可以：检查访问掩码（AccessMask）、拒绝操作（返回 STATUS_ACCESS_DENIED）、给操作附加上下文。这是实现进程保护的关键位置——把目标进程的句柄操作拦在门口。",
  },
  obPost: {
    title: "操作后回调（PostOperation）",
    content:
      "操作后回调在句柄操作完成之后调用，只能观察结果（操作是否成功、生成了什么句柄），不能拒绝——拒绝必须在前回调做。后回调适合登记审计日志：谁、什么时间、对哪个对象、做了什么操作。",
  },
  regNotify: {
    title: "注册表通知（CmRegisterCallbackEx）",
    content:
      "CmRegisterCallbackEx 注册注册表操作通知：每次对注册表的读写、删键、改名等操作，内核都会调用你的回调，传入操作类型（REG_NOTIFY_CLASS）和上下文。它只能观察与选择性地拒绝，不能修改操作本身。",
  },
  regPre: {
    title: "注册表操作前通知",
    content:
      "注册表前通知在操作执行前到达：回调检查操作类型（如 RegSetValue、RegDeleteKey）与目标键路径，可以阻止敏感操作（返回 STATUS_ACCESS_DENIED）。回调运行在 PASSIVE_LEVEL，允许查询但禁止等待锁和阻塞调用。",
  },
  regPost: {
    title: "注册表操作后通知",
    content:
      "操作完成后到达后通知，可以读到操作的最终结果（Status）。只能观察不能拦截。性能考虑：注册表操作极高频，回调必须短小，注册表过滤是安全产品的基础设施，做慢了整个系统变卡。",
  },
  client: {
    title: "用户模式客户",
    content:
      "保护策略由用户模式客户配置：通过 IOCTL 告诉驱动“保护哪些进程”（按 PID 或进程名），驱动维护受保护列表并在前回调里查表拦截。配置通道与通知通道分离：配置低频小包，通知高频批量。",
  },
};

const obOps: Record<ObOp, { label: string; desc: string }> = {
  open: {
    label: "打开句柄",
    desc: "OpenProcess/OpenThread → 句柄操作前回调检查访问掩码",
  },
  duplicate: {
    label: "复制句柄",
    desc: "DuplicateHandle → 前回调核对来源与目标进程",
  },
};

const regOps: Record<RegOp, { label: string; cls: string }> = {
  query: { label: "查询键值", cls: "RegNtQueryValueKey" },
  set: { label: "设置键值", cls: "RegNtSetValueKey" },
  delete: { label: "删除键", cls: "RegNtDeleteKey" },
};

export function Wkp09ObjectRegistryLab() {
  const [selected, setSelected] = useState<Region>("obPre");
  const [obOp, setObOp] = useState<ObOp>("open");
  const [regOp, setRegOp] = useState<RegOp>("set");
  const [protect, setProtect] = useState(false);

  const reset = useCallback(() => {
    setSelected("obPre");
    setObOp("open");
    setRegOp("set");
    setProtect(false);
  }, []);

  const strokeFor = (region: Region) =>
    selected === region ? C.accent : C.border;
  const strokeWidthFor = (region: Region) =>
    selected === region ? 2 : 1;

  const blocked = protect && obOp === "open";

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 对象通知与注册表通知工作台
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
          aria-label="对象句柄操作前后回调与注册表操作通知"
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
            对象通知：句柄操作的门口检查 · 注册表通知：操作流水
          </text>

          {/* ===== Object notifications ===== */}
          <text x={48} y={70} fontSize={13} fill={C.primary} fontWeight={500}>
            对象通知（ObRegisterCallbacks）
          </text>

          {/* Ob op buttons */}
          {(Object.keys(obOps) as ObOp[]).map((key, i) => (
            <g
              key={key}
              onClick={() => {
                setObOp(key);
                setSelected("obPre");
              }}
              className="cursor-pointer"
            >
              <rect
                x={48 + i * 160}
                y={80}
                width={152}
                height={36}
                rx={6}
                fill={obOp === key ? C.accent : C.bg}
                stroke={obOp === key ? C.accent : C.border}
                strokeWidth={obOp === key ? 2 : 1}
              />
              <text
                x={124 + i * 160}
                y={102}
                textAnchor="middle"
                fontSize={11}
                fill={obOp === key ? C.bg : C.primary}
                fontWeight={500}
              >
                {obOps[key].label}
              </text>
            </g>
          ))}

          {/* Pre callback */}
          <g onClick={() => setSelected("obPre")} className="cursor-pointer">
            <rect
              x={48}
              y={132}
              width={288}
              height={76}
              rx={8}
              fill={blocked ? C.danger : C.bg}
              stroke={strokeFor("obPre")}
              strokeWidth={strokeWidthFor("obPre")}
            />
            <text x={64} y={158} fontSize={13} fill={C.primary} fontWeight={500}>
              PreOperation 前回调
            </text>
            <text x={64} y={182} fontSize={11} fill={C.secondary}>
              检查访问掩码 → 允许 / 拒绝
            </text>
            <text x={64} y={200} fontSize={11} fill={blocked ? C.danger : C.secondary}>
              {blocked ? "拦截：STATUS_ACCESS_DENIED" : "放行：操作继续"}
            </text>
          </g>

          {/* Post callback */}
          <g onClick={() => setSelected("obPost")} className="cursor-pointer">
            <rect
              x={384}
              y={132}
              width={288}
              height={76}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("obPost")}
              strokeWidth={strokeWidthFor("obPost")}
            />
            <text x={400} y={158} fontSize={13} fill={C.primary} fontWeight={500}>
              PostOperation 后回调
            </text>
            <text x={400} y={182} fontSize={11} fill={C.secondary}>
              登记审计：谁 / 何时 / 对哪个对象
            </text>
            <text x={400} y={200} fontSize={11} fill={C.secondary}>
              {blocked ? "未执行（前回调已拒绝）" : "操作结果 = 成功 → 记一笔"}
            </text>
          </g>

          {/* Protect toggle */}
          <g
            onClick={() => {
              setProtect(!protect);
            }}
            className="cursor-pointer"
          >
            <rect
              x={48}
              y={224}
              width={44}
              height={22}
              rx={11}
              fill={protect ? C.danger : C.elevated}
              stroke={C.border}
            />
            <circle
              cx={protect ? 76 : 60}
              cy={235}
              r={8}
              fill={protect ? C.bg : C.secondary}
            />
          </g>
          <text x={104} y={239} fontSize={11} fill={protect ? C.danger : C.secondary}>
            {protect
              ? "进程保护开启：目标 PID 在受保护列表 → 打开句柄被前回调拦截"
              : "进程保护关闭：所有打开操作放行"}
          </text>

          {/* ===== Registry notifications ===== */}
          <line x1={48} y1={268} x2={672} y2={268} stroke={C.border} strokeWidth={1} />
          <text x={48} y={292} fontSize={13} fill={C.primary} fontWeight={500}>
            注册表通知（CmRegisterCallbackEx）
          </text>

          {/* Reg op buttons */}
          {(Object.keys(regOps) as RegOp[]).map((key, i) => (
            <g
              key={key}
              onClick={() => {
                setRegOp(key);
                setSelected("regNotify");
              }}
              className="cursor-pointer"
            >
              <rect
                x={48 + i * 208}
                y={302}
                width={200}
                height={36}
                rx={6}
                fill={regOp === key ? C.accent : C.bg}
                stroke={regOp === key ? C.accent : C.border}
                strokeWidth={regOp === key ? 2 : 1}
              />
              <text
                x={148 + i * 208}
                y={324}
                textAnchor="middle"
                fontSize={11}
                fill={regOp === key ? C.bg : C.primary}
                fontWeight={500}
              >
                {regOps[key].label}（{regOps[key].cls}）
              </text>
            </g>
          ))}

          {/* Reg pre */}
          <g onClick={() => setSelected("regPre")} className="cursor-pointer">
            <rect
              x={48}
              y={354}
              width={288}
              height={76}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("regPre")}
              strokeWidth={strokeWidthFor("regPre")}
            />
            <text x={64} y={380} fontSize={13} fill={C.primary} fontWeight={500}>
              前通知：{regOps[regOp].cls}
            </text>
            <text x={64} y={404} fontSize={11} fill={C.secondary}>
              检查键路径与操作类型 → 可拒绝敏感操作
            </text>
            <text x={64} y={422} fontSize={11} fill={C.secondary}>
              回调必须短小：注册表操作高频，慢了系统卡顿
            </text>
          </g>

          {/* Reg post */}
          <g onClick={() => setSelected("regPost")} className="cursor-pointer">
            <rect
              x={384}
              y={354}
              width={288}
              height={76}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("regPost")}
              strokeWidth={strokeWidthFor("regPost")}
            />
            <text x={400} y={380} fontSize={13} fill={C.primary} fontWeight={500}>
              后通知：操作结果
            </text>
            <text x={400} y={404} fontSize={11} fill={C.secondary}>
              读取最终 Status：成功 / 失败
            </text>
            <text x={400} y={422} fontSize={11} fill={C.secondary}>
              只观察不拦截 → 审计日志用
            </text>
          </g>

          {/* Client */}
          <g onClick={() => setSelected("client")} className="cursor-pointer">
            <rect
              x={48}
              y={452}
              width={624}
              height={64}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("client")}
              strokeWidth={strokeWidthFor("client")}
            />
            <text x={64} y={478} fontSize={12} fill={C.primary} fontWeight={500}>
              用户模式客户：IOCTL 配置受保护列表 / 读取审计记录
            </text>
            <text x={64} y={500} fontSize={11} fill={C.secondary}>
              配置通道低频小包 · 通知通道高频批量 · 与第 8 章管道同构
            </text>
          </g>

          {/* Result strip */}
          <rect
            x={48}
            y={532 - 24}
            width={624}
            height={36}
            rx={8}
            fill={blocked ? C.danger : C.bg}
            opacity={blocked ? 0.12 : 1}
            stroke={blocked ? C.danger : C.border}
          />
          <text x={64} y={532 - 7} fontSize={11} fill={C.primary}>
            {blocked
              ? "打开被拒绝：受保护进程的句柄操作在前回调返回 STATUS_ACCESS_DENIED"
              : `当前模拟：对象操作「${obOps[obOp].label}」+ 注册表操作「${regOps[regOp].label}」均放行`}
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
