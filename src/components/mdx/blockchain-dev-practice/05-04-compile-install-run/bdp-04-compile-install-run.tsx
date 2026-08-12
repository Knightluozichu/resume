"use client";

import { useState } from "react";

const BUTTON_CLASS =
  "min-h-11 rounded-control border border-border px-3 py-2 text-left text-sm text-secondary transition-colors hover:border-accent hover:text-primary";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
    >
      重置实验
    </button>
  );
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={BUTTON_CLASS + (active ? " border-accent bg-accent/10 text-accent" : "")}
    >
      {children}
    </button>
  );
}

const PLATFORMS = {
  ubuntu: {
    label: "Ubuntu",
    source: "发行包或官方二进制",
    boundary: "用户、服务、端口和数据目录",
    proof: "架构、版本、摘要和服务状态",
  },
  macos: {
    label: "macOS",
    source: "包管理器或签名二进制",
    boundary: "Intel/Apple Silicon、路径和权限",
    proof: "架构、版本、摘要和可执行路径",
  },
  windows: {
    label: "Windows",
    source: "安装包或压缩档案",
    boundary: "路径、服务和防火墙规则",
    proof: "版本、路径、端口和日志",
  },
  docker: {
    label: "Docker",
    source: "固定摘要的镜像",
    boundary: "网络、端口、卷和容器用户",
    proof: "镜像摘要、启动参数和卷映射",
  },
} as const;

type Platform = keyof typeof PLATFORMS;

export function BdpCh04PlatformInstallLab() {
  const [platform, setPlatform] = useState<Platform>("ubuntu");
  const [recorded, setRecorded] = useState(false);
  const active = PLATFORMS[platform];

  function reset() {
    setPlatform("ubuntu");
    setRecorded(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch04-platform-install"
      aria-label={
        "平台安装实验：当前平台为" +
        active.label +
        "，来源是" +
        active.source +
        "，边界是" +
        active.boundary +
        "，证据是" +
        active.proof +
        "；记录" +
        (recorded ? "已完成" : "未完成") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 04 · 跨平台安装实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">路径可以不同，证据合同不能不同</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换 Ubuntu、macOS、Windows 和 Docker，比较每条安装路径的输入、边界和验收证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择平台</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={platform === "ubuntu"} onClick={() => setPlatform("ubuntu")}>Ubuntu</ChoiceButton>
            <ChoiceButton active={platform === "macos"} onClick={() => setPlatform("macos")}>macOS</ChoiceButton>
            <ChoiceButton active={platform === "windows"} onClick={() => setPlatform("windows")}>Windows</ChoiceButton>
            <ChoiceButton active={platform === "docker"} onClick={() => setPlatform("docker")}>Docker</ChoiceButton>
          </div>
          <ChoiceButton active={recorded} onClick={() => setRecorded((value) => !value)}>{recorded ? "撤销安装记录" : "完成安装记录"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}使用“{active.source}”，要检查“{active.boundary}”。{recorded ? " 已保存" + active.proof + "。" : " 还要保存" + active.proof + "。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "平台安装链路：" +
            active.label +
            "从" +
            active.source +
            "开始，经过" +
            active.boundary +
            "，以" +
            active.proof +
            "验收；记录" +
            (recorded ? "完成" : "未完成") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Source → Binary → Boundary → Proof</text>
          <rect x="28" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="110" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Source</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.source}</text>
          <text x="110" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">来源与摘要</text>
          <path d="M214 144 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="260" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="342" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Binary</text>
          <text x="342" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="342" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">版本与架构</text>
          <path d="M446 144 H480" stroke="var(--border)" strokeWidth="3" />
          <rect x="492" y="78" width="240" height="132" rx="14" fill={recorded ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={recorded ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="612" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Proof</text>
          <text x="612" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{recorded ? active.proof : "等待验收证据"}</text>
          <text x="612" y="178" textAnchor="middle" fontSize="11" fill={recorded ? "var(--success)" : "var(--warning)"}>{recorded ? "可复核" : "未完成"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">安装路径不同，不代表验收标准可以省略</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.boundary}</text>
        </svg>
      </div>
    </section>
  );
}

const HEALTH_CHECKS = {
  binary: {
    label: "二进制",
    input: "来源、版本、架构、摘要",
    output: "可执行文件身份",
    failure: "路径错误或版本漂移",
  },
  network: {
    label: "网络",
    input: "chain ID、创世块、节点",
    output: "连接到目标网络",
    failure: "误连公共网络或旧节点",
  },
  service: {
    label: "服务",
    input: "RPC、端口、权限、日志",
    output: "接口按预期可用",
    failure: "端口暴露或接口拒绝",
  },
  sync: {
    label: "同步",
    input: "链头、区块高度、时间",
    output: "状态读取具有上下文",
    failure: "节点未同步或数据目录错",
  },
} as const;

type HealthCheck = keyof typeof HEALTH_CHECKS;

export function BdpCh04HealthCheckLab() {
  const [check, setCheck] = useState<HealthCheck>("binary");
  const [passed, setPassed] = useState(false);
  const active = HEALTH_CHECKS[check];

  function reset() {
    setCheck("binary");
    setPassed(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch04-health-check"
      aria-label={
        "节点健康检查实验：当前检查" +
        active.label +
        "，输入是" +
        active.input +
        "，输出是" +
        active.output +
        "，失败信号是" +
        active.failure +
        "；检查" +
        (passed ? "通过" : "未通过") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 04 · 节点健康检查</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">启动进程不等于服务健康</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">逐项检查二进制、网络、服务和同步状态，把“节点在运行”拆成可观察证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "健康检查链路：" +
            active.label +
            "读取" +
            active.input +
            "并判断" +
            active.output +
            "；失败信号是" +
            active.failure +
            "，当前" +
            (passed ? "通过" : "未通过") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Input → Check → Service Identity → Failure Signal</text>
          <rect x="28" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="110" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Input</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.input}</text>
          <text x="110" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">原始响应</text>
          <path d="M214 144 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="260" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="342" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Check</text>
          <text x="342" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="342" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">健康合同</text>
          <path d="M446 144 H480" stroke="var(--border)" strokeWidth="3" />
          <rect x="492" y="78" width="240" height="132" rx="14" fill={passed ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={passed ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="612" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Result</text>
          <text x="612" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.output}</text>
          <text x="612" y="178" textAnchor="middle" fontSize="11" fill={passed ? "var(--success)" : "var(--warning)"}>{passed ? "检查通过" : "先保存失败信号"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">每项健康检查都要有通过条件和失败信号</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.failure}</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择检查项</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={check === "binary"} onClick={() => setCheck("binary")}>二进制</ChoiceButton>
            <ChoiceButton active={check === "network"} onClick={() => setCheck("network")}>网络</ChoiceButton>
            <ChoiceButton active={check === "service"} onClick={() => setCheck("service")}>服务</ChoiceButton>
            <ChoiceButton active={check === "sync"} onClick={() => setCheck("sync")}>同步</ChoiceButton>
          </div>
          <ChoiceButton active={passed} onClick={() => setPassed((value) => !value)}>{passed ? "撤销健康检查" : "记录检查结果"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}读取“{active.input}”，用于判断“{active.output}”。失败信号：{active.failure}。{passed ? " 已记录检查结果。" : " 尚未记录检查结果。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const FAILURE_LAYERS = {
  source: {
    label: "来源层",
    change: "下载源或镜像摘要",
    expected: "二进制身份可验证",
    recovery: "重新下载并核对签名/摘要",
  },
  runtime: {
    label: "运行层",
    change: "版本、架构或依赖",
    expected: "程序启动并输出版本",
    recovery: "锁定版本并补齐依赖",
  },
  network: {
    label: "网络层",
    change: "RPC、端口或 chain ID",
    expected: "读取目标网络身份",
    recovery: "隔离端口并重新核对网络",
  },
  data: {
    label: "数据层",
    change: "创世配置或数据目录",
    expected: "链头与状态可解释",
    recovery: "清理目录并从固定输入重放",
  },
} as const;

type FailureLayer = keyof typeof FAILURE_LAYERS;

export function BdpCh04FailureIsolationLab() {
  const [layer, setLayer] = useState<FailureLayer>("source");
  const [isolated, setIsolated] = useState(false);
  const active = FAILURE_LAYERS[layer];

  function reset() {
    setLayer("source");
    setIsolated(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch04-failure-isolation"
      aria-label={
        "失败分层实验：当前为" +
        active.label +
        "，改变" +
        active.change +
        "，预期" +
        active.expected +
        "，恢复动作是" +
        active.recovery +
        "；隔离" +
        (isolated ? "完成" : "未完成") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 04 · 失败分层实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先定位层级，再决定重装还是重配</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择一个故障层，只改变该层输入，比较预期结果、首个差异和最小恢复动作。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择故障层</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={layer === "source"} onClick={() => setLayer("source")}>来源层</ChoiceButton>
            <ChoiceButton active={layer === "runtime"} onClick={() => setLayer("runtime")}>运行层</ChoiceButton>
            <ChoiceButton active={layer === "network"} onClick={() => setLayer("network")}>网络层</ChoiceButton>
            <ChoiceButton active={layer === "data"} onClick={() => setLayer("data")}>数据层</ChoiceButton>
          </div>
          <ChoiceButton active={isolated} onClick={() => setIsolated((value) => !value)}>{isolated ? "撤销分层记录" : "完成分层记录"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}只改变“{active.change}”，预期“{active.expected}”。{isolated ? " 已记录最小恢复动作：" + active.recovery + "。" : " 还要记录最小恢复动作：" + active.recovery + "。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "失败分层链路：" +
            active.label +
            "改变" +
            active.change +
            "，期待" +
            active.expected +
            "，恢复动作是" +
            active.recovery +
            "；记录" +
            (isolated ? "完成" : "未完成") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Layer → First Difference → Recovery → Replay</text>
          <rect x="28" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="110" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Layer</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="110" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.change}</text>
          <path d="M214 144 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="260" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="342" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Difference</text>
          <text x="342" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">首个偏差</text>
          <text x="342" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">停止重试</text>
          <path d="M446 144 H480" stroke="var(--border)" strokeWidth="3" />
          <rect x="492" y="78" width="240" height="132" rx="14" fill={isolated ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={isolated ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="612" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Recovery</text>
          <text x="612" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{isolated ? active.recovery : "等待分层记录"}</text>
          <text x="612" y="178" textAnchor="middle" fontSize="11" fill={isolated ? "var(--success)" : "var(--warning)"}>{isolated ? "可重放" : "先定位"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">首个差异比最后一个错误更适合指导恢复</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">固定其他层输入，再验证修复是否有效</text>
        </svg>
      </div>
    </section>
  );
}
