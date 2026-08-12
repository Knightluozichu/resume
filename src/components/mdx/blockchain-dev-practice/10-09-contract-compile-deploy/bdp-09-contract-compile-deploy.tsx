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

const COMPILER_PROFILES = {
  pinned: {
    label: "固定版本",
    input: "源码摘要 + solc 版本 + 优化配置",
    artifact: "ABI、创建字节码、运行时代码",
    result: "可重放同一部署输入",
  },
  mismatch: {
    label: "版本不一致",
    input: "同一源码 + 不同 solc 或优化",
    artifact: "字节码摘要发生变化",
    result: "停止部署并回到编译证据",
  },
  source: {
    label: "源码变更",
    input: "新源码摘要 + 固定 solc",
    artifact: "接口或字节码发生变化",
    result: "更新 ABI 与调用测试",
  },
} as const;

type CompilerProfile = keyof typeof COMPILER_PROFILES;

export function BdpCh09CompileLab() {
  const [profile, setProfile] = useState<CompilerProfile>("pinned");
  const [compiled, setCompiled] = useState(false);
  const active = COMPILER_PROFILES[profile];

  function reset() {
    setProfile("pinned");
    setCompiled(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch09-compile-evidence"
      aria-label={
        "编译证据实验：当前为" +
        active.label +
        "，输入是" +
        active.input +
        "，产物是" +
        active.artifact +
        "，结果是" +
        active.result +
        "；编译证据" +
        (compiled ? "已保存" : "未保存") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 09 · 编译证据</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">同一源码不代表同一字节码</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择编译情境，观察源码、solc、优化设置和 ABI 如何共同决定部署输入。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择编译情境</p>
          <div className="grid gap-2">
            <ChoiceButton active={profile === "pinned"} onClick={() => { setProfile("pinned"); setCompiled(false); }}>固定版本编译</ChoiceButton>
            <ChoiceButton active={profile === "mismatch"} onClick={() => { setProfile("mismatch"); setCompiled(false); }}>版本不一致</ChoiceButton>
            <ChoiceButton active={profile === "source"} onClick={() => { setProfile("source"); setCompiled(false); }}>源码已变化</ChoiceButton>
          </div>
          <ChoiceButton active={compiled} onClick={() => setCompiled((value) => !value)}>{compiled ? "清除编译证据" : "保存编译证据"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.input}。{compiled ? active.artifact + " 已归档，" + active.result + "。" : "先预测字节码是否可复现，再保存源码摘要与产物。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "编译证据图：情境" +
            active.label +
            "从" +
            active.input +
            "得到" +
            active.artifact +
            "；" +
            (compiled ? "证据已保存。" : "证据未保存。") +
            active.result
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Source → solc → Artifact → Deploy Input</text>
          <rect x="24" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="100" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Source</text>
          <text x="100" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">源码摘要</text>
          <text x="100" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">输入固定</text>
          <path d="M188 148 H208" stroke="var(--border)" strokeWidth="3" />
          <rect x="220" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="296" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">solc</text>
          <text x="296" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">版本与优化</text>
          <text x="296" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">编译日志</text>
          <path d="M384 148 H404" stroke="var(--border)" strokeWidth="3" />
          <rect x="416" y="78" width="152" height="140" rx="14" fill={profile === "mismatch" ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={profile === "mismatch" ? "var(--warning)" : "var(--accent)"} strokeWidth="2" />
          <text x="492" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Artifact</text>
          <text x="492" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ABI + bytecode</text>
          <text x="492" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.artifact}</text>
          <path d="M580 148 H600" stroke="var(--border)" strokeWidth="3" />
          <rect x="612" y="78" width="124" height="140" rx="14" fill={compiled ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={compiled ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="674" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">证据</text>
          <text x="674" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{compiled ? "可重放" : "待归档"}</text>
          <text x="674" y="180" textAnchor="middle" fontSize="11" fill={compiled ? "var(--success)" : "var(--warning)"}>{compiled ? "通过" : "缺字段"}</text>
          <text x="380" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.result}</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">部署前先比较源码摘要、字节码摘要和 ABI</text>
        </svg>
      </div>
    </section>
  );
}

const DEPLOY_PROFILES = {
  private: {
    label: "隔离私链",
    network: "固定 chain ID + 独立数据目录",
    output: "部署地址与运行时代码",
    boundary: "节点同步与账户余额",
  },
  testrpc: {
    label: "内存测试链",
    network: "预置账户 + 即时出块",
    output: "快速验证接口路径",
    boundary: "不证明持久化和共识",
  },
  wrong: {
    label: "错误网络",
    network: "provider 与预期 chain ID 不一致",
    output: "停止，不接受部署结论",
    boundary: "地址可能属于另一条链",
  },
} as const;

type DeployProfile = keyof typeof DEPLOY_PROFILES;

export function BdpCh09DeployLab() {
  const [profile, setProfile] = useState<DeployProfile>("private");
  const [stage, setStage] = useState(0);
  const [fault, setFault] = useState(false);
  const active = DEPLOY_PROFILES[profile];
  const stages = ["节点", "签名交易", "Receipt", "运行时代码"];

  function reset() {
    setProfile("private");
    setStage(0);
    setFault(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch09-deploy-lifecycle"
      aria-label={
        "部署生命周期实验：当前为" +
        active.label +
        "，网络是" +
        active.network +
        "，输出是" +
        active.output +
        "，边界是" +
        active.boundary +
        "；当前阶段" +
        stages[stage] +
        "；故障" +
        (fault ? "已注入" : "未注入") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 09 · 部署生命周期</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">地址出现之后还要验证代码</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择目标网络，逐步观察节点、签名交易、回执和运行时代码如何形成部署证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择部署网络</p>
          <div className="grid gap-2">
            <ChoiceButton active={profile === "private"} onClick={() => { setProfile("private"); setStage(0); setFault(false); }}>隔离私链</ChoiceButton>
            <ChoiceButton active={profile === "testrpc"} onClick={() => { setProfile("testrpc"); setStage(0); setFault(false); }}>TestRPC 内存链</ChoiceButton>
            <ChoiceButton active={profile === "wrong"} onClick={() => { setProfile("wrong"); setStage(0); setFault(false); }}>错误网络</ChoiceButton>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <ChoiceButton active={stage > 0} onClick={() => setStage((value) => Math.min(value + 1, 3))}>推进一个阶段</ChoiceButton>
            <ChoiceButton active={fault} onClick={() => setFault((value) => !value)}>注入部署故障</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.network}。当前在“{stages[stage]}”。{fault ? "保留错误、chain ID 和交易输入，停止继续发布。" : active.output + "；边界是" + active.boundary + "。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "部署生命周期图：目标" +
            active.label +
            "经过" +
            stages.join("、") +
            "，当前阶段为" +
            stages[stage] +
            "；" +
            (fault ? "已注入故障。" : "未注入故障。") +
            active.output
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Node → Signed Tx → Receipt → Runtime Code</text>
          {stages.map((label, index) => {
            const reached = stage >= index;
            const color = fault && index >= 1 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 184;
            return (
              <g key={label}>
                {index > 0 ? <path d={"M" + (x - 24) + " 148 H" + (x - 8)} stroke="var(--border)" strokeWidth="3" /> : null}
                <rect x={x} y="78" width="152" height="140" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 76} y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{label}</text>
                <text x={x + 76} y="148" textAnchor="middle" fontSize="11" fill={color}>{fault && index >= 1 ? "停止取证" : reached ? "已核对" : "待推进"}</text>
                <text x={x + 76} y="182" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{index === 0 ? active.network : index === 1 ? "创建字节码 + 参数" : index === 2 ? "status + block hash" : "getCode 对照"}</text>
              </g>
            );
          })}
          <text x="380" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.output}</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{fault ? "故障路径：地址或回执不能代替 chain ID 与运行时代码核对" : "部署成功的最小证据：交易回执、地址、代码哈希和初始状态"}</text>
        </svg>
      </div>
    </section>
  );
}

const CALL_PROFILES = {
  read: {
    label: "只读调用",
    method: "eth_call",
    effect: "不写链上状态",
    evidence: "返回值、区块标记、调用者",
    boundary: "模拟执行成功不等于交易成功",
  },
  write: {
    label: "状态交易",
    method: "sendTransaction",
    effect: "等待交易执行并改变状态",
    evidence: "哈希、Receipt、事件、前后状态",
    boundary: "需要 Gas、nonce、确认深度",
  },
  failed: {
    label: "失败调用",
    method: "eth_call 或交易模拟",
    effect: "保留错误和原状态",
    evidence: "错误码、输入、前状态",
    boundary: "不要把错误吞成默认值",
  },
} as const;

type CallProfile = keyof typeof CALL_PROFILES;

export function BdpCh09CallLab() {
  const [kind, setKind] = useState<CallProfile>("read");
  const [verified, setVerified] = useState(false);
  const active = CALL_PROFILES[kind];

  function reset() {
    setKind("read");
    setVerified(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch09-call-boundary"
      aria-label={
        "合约调用实验：当前为" +
        active.label +
        "，方法是" +
        active.method +
        "，效果是" +
        active.effect +
        "，证据是" +
        active.evidence +
        "，边界是" +
        active.boundary +
        "；验证" +
        (verified ? "已完成" : "未完成") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 09 · 调用边界</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">看懂调用类型，才看得懂回执</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换只读、状态交易和失败调用，比较它们需要的证据与可观察效果。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择调用类型</p>
          <div className="grid gap-2">
            <ChoiceButton active={kind === "read"} onClick={() => { setKind("read"); setVerified(false); }}>eth_call 只读</ChoiceButton>
            <ChoiceButton active={kind === "write"} onClick={() => { setKind("write"); setVerified(false); }}>sendTransaction 写入</ChoiceButton>
            <ChoiceButton active={kind === "failed"} onClick={() => { setKind("failed"); setVerified(false); }}>模拟失败</ChoiceButton>
          </div>
          <ChoiceButton active={verified} onClick={() => setVerified((value) => !value)}>{verified ? "清除调用证据" : "保存调用证据"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label} 使用 {active.method}，{active.effect}。{verified ? active.evidence + " 已记录。" : "先判断该调用是否需要 Receipt 和前后状态。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "合约调用图：调用类型" +
            active.label +
            "使用" +
            active.method +
            "，" +
            active.effect +
            "，需要" +
            active.evidence +
            "；" +
            active.boundary +
            "；证据" +
            (verified ? "已保存" : "未保存") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Call Type → Node → Result → State Evidence</text>
          <rect x="24" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="100" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="100" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.method}</text>
          <text x="100" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">输入与调用者</text>
          <path d="M188 148 H208" stroke="var(--border)" strokeWidth="3" />
          <rect x="220" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="296" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Node</text>
          <text x="296" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">执行或模拟</text>
          <text x="296" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">返回 result/error</text>
          <path d="M384 148 H404" stroke="var(--border)" strokeWidth="3" />
          <rect x="416" y="78" width="152" height="140" rx="14" fill={kind === "failed" ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={kind === "failed" ? "var(--warning)" : "var(--accent)"} strokeWidth="2" />
          <text x="492" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Result</text>
          <text x="492" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.effect}</text>
          <text x="492" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{kind === "write" ? "等待 Receipt" : "读取原始结果"}</text>
          <path d="M580 148 H600" stroke="var(--border)" strokeWidth="3" />
          <rect x="612" y="78" width="124" height="140" rx="14" fill={verified ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={verified ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="674" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">证据</text>
          <text x="674" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{verified ? "已保存" : "待保存"}</text>
          <text x="674" y="180" textAnchor="middle" fontSize="11" fill={verified ? "var(--success)" : "var(--warning)"}>{verified ? "可复核" : "缺字段"}</text>
          <text x="380" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.evidence}</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">边界：{active.boundary}</text>
        </svg>
      </div>
    </section>
  );
}
