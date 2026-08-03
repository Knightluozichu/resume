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

type Region = "develop" | "verifier" | "sign" | "deploy" | "route";

type Stage = "develop" | "verifier" | "testsign" | "relsign" | "deploy";

const details: Record<Region, { title: string; content: string }> = {
  develop: {
    title: "开发阶段",
    content:
      "开发阶段要同时产出三样东西：驱动代码（第 4 章全套纪律）、工程配置（WDK/VS，符号 PDB 必须生成）和部署脚本。纪律：只在可丢弃 VM 或专用测试机上开发调试，生产机从不直接装开发驱动——一次越界访问就能让整台机器蓝屏。",
  },
  verifier: {
    title: "Driver Verifier",
    content:
      "Driver Verifier 是内核自带的\"体检仪\"：对目标驱动开启内存池、IRQL、锁、引用计数等规则检查，任何违规当场 bug check（蓝屏）并定位到出错驱动。只能在测试机上、只对目标驱动开——全局开启会让系统慢 3-5 倍甚至无法启动。违规时的崩溃转储配合调试器 !analyze 就能找到责任代码。",
  },
  sign: {
    title: "驱动签名",
    content:
      "64 位 Windows 强制要求驱动带有效签名。两条路径：测试签名（bcdedit /set testsigning on + 自签证书，仅限测试机，重启后权限边界降低）与发布签名（EV 证书签名并提交微软门户获取 attestation 签名，HVCI 兼容的唯一途径）。测试证书签名过的驱动在生产机上直接拒绝加载。",
  },
  deploy: {
    title: "部署与设备通知",
    content:
      "部署用 sc create / 设备管理器把驱动装到测试机，启动日志、Verifier、崩溃转储三重验证。设备通知（IoRegisterPlugPlayNotification）让驱动在设备到达（如插入 U 盘）时得到回调，完成按需初始化——热插拔设备驱动的基本能力，用后必须注销，否则回调悬空。",
  },
  route: {
    title: "三条路线怎么选",
    content:
      "新代码只有一条推荐路线：受支持的框架（Minifilter/WDF/KMDF + 通知机制）。传统过滤驱动是遗留路线，只为兼容老代码存在，新代码别写。SSDT 挂钩是被 PatchGuard 检测的禁区——改动关键内核结构会被当场蓝屏，任何\"隐藏进程\"类的旧技法都不再可行，也不做教学推荐。",
  },
};

const stages: Record<Stage, { label: string; sub: string }> = {
  develop: { label: "① 开发", sub: "源码 + 符号" },
  verifier: { label: "② Verifier", sub: "测试机体检" },
  testsign: { label: "③ 测试签名", sub: "自签证书" },
  relsign: { label: "④ 发布签名", sub: "EV + 微软" },
  deploy: { label: "⑤ 部署通知", sub: "设备到达" },
};

const routes = [
  {
    label: "Minifilter / WDF",
    tag: "受支持 · 推荐",
    color: C.success,
    desc: "第 10 章小过滤 + 框架对象",
  },
  {
    label: "传统过滤驱动",
    tag: "遗留 · 仅兼容",
    color: C.warning,
    desc: "老代码迁移理解，新代码别写",
  },
  {
    label: "SSDT 挂钩",
    tag: "不支持 · 蓝屏",
    color: C.danger,
    desc: "PatchGuard 检测，当场 bug check",
  },
];

export function Wkp11ToolboxMapLab() {
  const [selected, setSelected] = useState<Region>("verifier");
  const [globalVerifier, setGlobalVerifier] = useState(false);
  const [routeIdx, setRouteIdx] = useState(0);

  const reset = useCallback(() => {
    setSelected("verifier");
    setGlobalVerifier(false);
    setRouteIdx(0);
  }, []);

  const strokeFor = (region: Region) =>
    selected === region ? C.accent : C.border;
  const strokeWidthFor = (region: Region) =>
    selected === region ? 2 : 1;

  const stageX: Record<Stage, number> = {
    develop: 48,
    verifier: 180,
    testsign: 312,
    relsign: 444,
    deploy: 576,
  };
  const stageToRegion: Record<Stage, Region> = {
    develop: "develop",
    verifier: "verifier",
    testsign: "sign",
    relsign: "sign",
    deploy: "deploy",
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 驱动交付工具箱：体检 → 签名 → 部署 → 选路线
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
          aria-label="驱动交付流水线与路线选择图"
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
            驱动交付流水线：体检 → 签名 → 部署（点击阶段查看）
          </text>

          {/* Pipeline stages */}
          {(Object.keys(stages) as Stage[]).map((key) => (
            <g
              key={key}
              onClick={() => setSelected(stageToRegion[key])}
              className="cursor-pointer"
            >
              <rect
                x={stageX[key]}
                y={64}
                width={120}
                height={56}
                rx={8}
                fill={selected === stageToRegion[key] ? C.accent : C.bg}
                stroke={selected === stageToRegion[key] ? C.accent : C.border}
                strokeWidth={selected === stageToRegion[key] ? 2 : 1}
              />
              <text
                x={stageX[key] + 60}
                y={86}
                textAnchor="middle"
                fontSize={12}
                fill={selected === stageToRegion[key] ? C.bg : C.primary}
                fontWeight={500}
              >
                {stages[key].label}
              </text>
              <text
                x={stageX[key] + 60}
                y={106}
                textAnchor="middle"
                fontSize={11}
                fill={selected === stageToRegion[key] ? C.bg : C.secondary}
              >
                {stages[key].sub}
              </text>
            </g>
          ))}

          {/* Arrows between stages */}
          {[132, 264, 396, 528].map((x) => (
            <g key={x}>
              <line x1={x} y1={92} x2={x + 12} y2={92} stroke={C.border} strokeWidth={1} />
              <polygon points={`${x + 8},88 ${x + 16},92 ${x + 8},96`} fill={C.border} />
            </g>
          ))}

          {/* Verifier workbench */}
          <g onClick={() => setSelected("verifier")} className="cursor-pointer">
            <rect
              x={48}
              y={148}
              width={624}
              height={176}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("verifier")}
              strokeWidth={strokeWidthFor("verifier")}
            />
            <text x={64} y={172} fontSize={13} fill={C.primary} fontWeight={500}>
              Driver Verifier 工作台（只在测试机，只查目标驱动）
            </text>
            <text x={64} y={194} fontSize={11} fill={C.secondary}>
              verifier /flags 0x1 /driver MyDriver.sys → 违规当场 bug check → 转储定位
            </text>
          </g>

          {/* Verifier steps */}
          {[
            { x: 64, t: "① 选择驱动", d: "verifier /driver 目标.sys" },
            { x: 240, t: "② 选择规则", d: "池 / IRQL / 锁 / 引用" },
            { x: 416, t: "③ 检测结果", d: "违规 → 蓝屏 + 定位" },
          ].map((s) => (
            <g
              key={s.x}
              onClick={() => setSelected("verifier")}
              className="cursor-pointer"
            >
              <rect
                x={s.x}
                y={204}
                width={200}
                height={44}
                rx={6}
                fill={C.elevated}
                stroke={C.border}
              />
              <text x={s.x + 12} y={224} fontSize={11} fill={C.primary} fontWeight={500}>
                {s.t}
              </text>
              <text x={s.x + 12} y={240} fontSize={11} fill={C.secondary}>
                {s.d}
              </text>
            </g>
          ))}

          {/* Global verifier toggle */}
          <g
            onClick={() => {
              setGlobalVerifier(!globalVerifier);
            }}
            className="cursor-pointer"
          >
            <rect
              x={64}
              y={266}
              width={44}
              height={22}
              rx={11}
              fill={globalVerifier ? C.danger : C.elevated}
              stroke={C.border}
            />
            <circle
              cx={globalVerifier ? 92 : 76}
              cy={277}
              r={8}
              fill={globalVerifier ? C.bg : C.secondary}
            />
          </g>
          <text x={120} y={281} fontSize={11} fill={globalVerifier ? C.danger : C.secondary}>
            {globalVerifier
              ? "危险：生产机全局 Verifier → 系统慢 3-5 倍，甚至无法启动"
              : "正确：只对目标驱动验证，违规可定位、系统不受拖累"}
          </text>

          {/* Route selection */}
          <text x={48} y={352} fontSize={13} fill={C.primary} fontWeight={500}>
            路线选择：新代码该怎么写？
          </text>
          {routes.map((r, i) => (
            <g
              key={r.label}
              onClick={() => {
                setRouteIdx(i);
                setSelected("route");
              }}
              className="cursor-pointer"
            >
              <rect
                x={48 + i * 208}
                y={362}
                width={200}
                height={64}
                rx={8}
                fill={routeIdx === i ? r.color : C.bg}
                stroke={routeIdx === i ? r.color : C.border}
                strokeWidth={routeIdx === i ? 2 : 1}
              />
              <text
                x={64 + i * 208}
                y={384}
                fontSize={12}
                fill={routeIdx === i ? C.bg : C.primary}
                fontWeight={500}
              >
                {r.label}
              </text>
              <text
                x={64 + i * 208}
                y={404}
                fontSize={11}
                fill={routeIdx === i ? C.bg : r.color}
                fontWeight={500}
              >
                {r.tag}
              </text>
              <text
                x={64 + i * 208}
                y={420}
                fontSize={11}
                fill={routeIdx === i ? C.bg : C.secondary}
              >
                {r.desc}
              </text>
            </g>
          ))}

          {/* Result strip */}
          <rect
            x={48}
            y={452}
            width={624}
            height={52}
            rx={8}
            fill={C.bg}
            stroke={globalVerifier ? C.danger : C.border}
          />
          <text x={64} y={474} fontSize={11} fill={C.primary}>
            {globalVerifier
              ? "模拟失败：全局 Verifier 拖垮系统 → 用 verifier /reset 或安全模式恢复"
              : `当前选择：${stages[routeIdx === 0 ? "relsign" : "deploy"].label} · 路线「${routes[routeIdx].label}」${routes[routeIdx].tag}`}
          </text>
          <text x={64} y={492} fontSize={11} fill={C.secondary}>
            {globalVerifier
              ? "经验：验证边界永远限定在测试机 + 目标驱动"
              : "经验：交付前过完 ②③④ 三步，生产机保持 testsigning off"}
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
