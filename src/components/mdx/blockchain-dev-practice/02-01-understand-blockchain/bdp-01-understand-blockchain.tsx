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

const TRUST_MODELS = {
  centralized: {
    label: "中心化账本",
    actors: "一个运营者",
    ledger: "单点写入与授权",
    verifier: "运营者负责解释",
    tradeoff: "效率高，但参与者依赖同一运营者的可用性与诚实性。",
  },
  consortium: {
    label: "联盟链",
    actors: "受许可的多方",
    ledger: "共同规则下复制",
    verifier: "成员按协议复核",
    tradeoff: "适合有边界的协作网络，但成员准入和治理仍由联盟负责。",
  },
  public: {
    label: "开放网络",
    actors: "任意可验证参与者",
    ledger: "公开复制与竞争确认",
    verifier: "节点按共识验证",
    tradeoff: "抗单方控制更强，但吞吐、费用、隐私与治理成本更高。",
  },
} as const;

type TrustModel = keyof typeof TRUST_MODELS;

export function BdpCh01TrustModelLab() {
  const [model, setModel] = useState<TrustModel>("consortium");
  const [checked, setChecked] = useState(false);
  const active = TRUST_MODELS[model];

  function reset() {
    setModel("consortium");
    setChecked(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch01-trust-model"
      aria-label={
        "信任模型实验：" +
        active.label +
        "，参与者为" +
        active.actors +
        "，账本为" +
        active.ledger +
        "，复核方式为" +
        active.verifier +
        "；" +
        (checked ? "已完成边界检查" : "尚未完成边界检查") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 01 · 信任模型实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先画参与者，再谈“去中心化”</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换账本组织方式，观察谁能写入、谁能验证，以及故障和治理边界落在哪里。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择账本模型</p>
          <div className="grid gap-2">
            <ChoiceButton active={model === "centralized"} onClick={() => setModel("centralized")}>中心化账本</ChoiceButton>
            <ChoiceButton active={model === "consortium"} onClick={() => setModel("consortium")}>联盟链</ChoiceButton>
            <ChoiceButton active={model === "public"} onClick={() => setModel("public")}>开放网络</ChoiceButton>
          </div>
          <ChoiceButton active={checked} onClick={() => setChecked((value) => !value)}>{checked ? "撤销边界检查" : "完成边界检查"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.label}。{active.tradeoff}{checked ? " 已记录参与者、写入权、验证权和治理边界。" : " 还要记录参与者、写入权、验证权和治理边界。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "信任模型链路：" +
            active.actors +
            "通过" +
            active.ledger +
            "保存记录，由" +
            active.verifier +
            "检查；边界" +
            (checked ? "已记录" : "未记录") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Actors → Shared Ledger → Verification → Governance</text>
          <rect x="28" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="113" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Actors</text>
          <text x="113" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.actors}</text>
          <text x="113" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">谁提交请求</text>
          <path d="M220 144 H254" stroke="var(--border)" strokeWidth="3" />
          <rect x="266" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="351" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Ledger</text>
          <text x="351" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.ledger}</text>
          <text x="351" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录如何复制</text>
          <path d="M458 144 H492" stroke="var(--border)" strokeWidth="3" />
          <rect x="504" y="78" width="228" height="132" rx="14" fill={checked ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={checked ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="618" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Verification</text>
          <text x="618" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.verifier}</text>
          <text x="618" y="178" textAnchor="middle" fontSize="11" fill={checked ? "var(--success)" : "var(--warning)"}>{checked ? "边界已记录" : "需要边界"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">去中心化不是单一开关，而是写入、复制、验证和治理权的组合</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">换模型时，先说明信任假设如何变化</text>
        </svg>
      </div>
    </section>
  );
}

const CORE_MECHANISMS = {
  storage: { label: "分布式存储", input: "多节点记录", property: "副本可对照", signal: "副本高度或内容不一致" },
  crypto: { label: "密码学", input: "消息与身份", property: "完整性和授权可验证", signal: "哈希、签名或身份校验失败" },
  consensus: { label: "共识机制", input: "候选状态", property: "网络选择可接受结果", signal: "分叉、拒绝或确认延迟" },
  contract: { label: "智能合约", input: "交易与当前状态", property: "规则驱动状态转移", signal: "回滚、权限错误或前置条件不满足" },
} as const;

type CoreMechanism = keyof typeof CORE_MECHANISMS;

export function BdpCh01MechanismLab() {
  const [mechanism, setMechanism] = useState<CoreMechanism>("storage");
  const [verified, setVerified] = useState(false);
  const active = CORE_MECHANISMS[mechanism];

  function reset() {
    setMechanism("storage");
    setVerified(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch01-core-mechanisms"
      aria-label={
        "核心机制实验：" +
        active.label +
        "接收" +
        active.input +
        "，提供" +
        active.property +
        "，需要观察" +
        active.signal +
        "；" +
        (verified ? "已完成验证" : "尚未完成验证") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 01 · 机制拆解实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">把“区块链”拆成四个可验证机制</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">每次只选择一个机制，沿着输入、属性和失败信号解释它解决了哪一类问题。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "机制链路：" +
            active.label +
            "处理" +
            active.input +
            "，带来" +
            active.property +
            "，失败信号是" +
            active.signal +
            "；验证" +
            (verified ? "完成" : "未完成") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Input → Mechanism → Property → Failure Signal</text>
          <rect x="28" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="113" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Input</text>
          <text x="113" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.input}</text>
          <text x="113" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">问题边界</text>
          <path d="M220 144 H254" stroke="var(--border)" strokeWidth="3" />
          <rect x="266" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="351" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Mechanism</text>
          <text x="351" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="351" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">协议 / 状态规则</text>
          <path d="M458 144 H492" stroke="var(--border)" strokeWidth="3" />
          <rect x="504" y="78" width="228" height="132" rx="14" fill={verified ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={verified ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="618" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Evidence</text>
          <text x="618" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.property}</text>
          <text x="618" y="178" textAnchor="middle" fontSize="11" fill={verified ? "var(--success)" : "var(--warning)"}>{verified ? "可复核" : "先找信号"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">机制的价值必须和可观察的失败信号一起说明</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.signal}</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择核心机制</p>
          <div className="grid gap-2">
            <ChoiceButton active={mechanism === "storage"} onClick={() => setMechanism("storage")}>分布式存储</ChoiceButton>
            <ChoiceButton active={mechanism === "crypto"} onClick={() => setMechanism("crypto")}>密码学</ChoiceButton>
            <ChoiceButton active={mechanism === "consensus"} onClick={() => setMechanism("consensus")}>共识机制</ChoiceButton>
            <ChoiceButton active={mechanism === "contract"} onClick={() => setMechanism("contract")}>智能合约</ChoiceButton>
          </div>
          <ChoiceButton active={verified} onClick={() => setVerified((value) => !value)}>{verified ? "撤销机制验证" : "完成机制验证"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}的输入是“{active.input}”，它提供“{active.property}”；验证时优先观察：{active.signal}。{verified ? " 你已经把机制、收益和失败信号连起来了。" : " 请选择并记录一条可观察证据。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const USE_CASES = {
  finance: { label: "金融", participants: "银行、清算方与客户", record: "资产与结算事件", result: "减少重复对账", boundary: "隐私、监管和吞吐" },
  supplyChain: { label: "供应链", participants: "供应商、物流与采购方", record: "批次、交接与来源", result: "共享追溯证据", boundary: "线下数据真实性" },
  copyright: { label: "数字版权", participants: "作者、平台与使用方", record: "创作时间与授权事件", result: "形成可核对记录", boundary: "身份和侵权认定" },
  manufacturing: { label: "智能制造", participants: "工厂、设备与质检方", record: "工序、传感与质检", result: "跨组织协作可追踪", boundary: "设备接入与数据质量" },
} as const;

type UseCase = keyof typeof USE_CASES;

export function BdpCh01UseCaseLab() {
  const [domain, setDomain] = useState<UseCase>("finance");
  const [tested, setTested] = useState(false);
  const active = USE_CASES[domain];

  function reset() {
    setDomain("finance");
    setTested(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch01-use-case"
      aria-label={
        "应用领域实验：" +
        active.label +
        "场景由" +
        active.participants +
        "参与，记录" +
        active.record +
        "，结果是" +
        active.result +
        "，边界是" +
        active.boundary +
        "；" +
        (tested ? "已完成边界测试" : "尚未完成边界测试") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 01 · 应用边界实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">应用价值来自共享证据，不来自标签</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换一个行业场景，沿着参与者、记录、结果和边界检查它是否真的需要共享账本。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择应用领域</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={domain === "finance"} onClick={() => setDomain("finance")}>金融</ChoiceButton>
            <ChoiceButton active={domain === "supplyChain"} onClick={() => setDomain("supplyChain")}>供应链</ChoiceButton>
            <ChoiceButton active={domain === "copyright"} onClick={() => setDomain("copyright")}>数字版权</ChoiceButton>
            <ChoiceButton active={domain === "manufacturing"} onClick={() => setDomain("manufacturing")}>智能制造</ChoiceButton>
          </div>
          <ChoiceButton active={tested} onClick={() => setTested((value) => !value)}>{tested ? "撤销边界测试" : "完成边界测试"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}场景：{active.participants}共享“{active.record}”，预期{active.result}。真正的边界是“{active.boundary}”。{tested ? " 已完成价值与限制的双向检查。" : " 还要同时检查价值和限制。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "应用链路：" +
            active.participants +
            "共享" +
            active.record +
            "，得到" +
            active.result +
            "，但受" +
            active.boundary +
            "约束；边界测试" +
            (tested ? "完成" : "未完成") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Participants → Shared Record → Outcome → Boundary</text>
          <rect x="28" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="113" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Participants</text>
          <text x="113" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.participants}</text>
          <text x="113" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">协作关系</text>
          <path d="M220 144 H254" stroke="var(--border)" strokeWidth="3" />
          <rect x="266" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="351" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Record</text>
          <text x="351" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.record}</text>
          <text x="351" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">共享证据</text>
          <path d="M458 144 H492" stroke="var(--border)" strokeWidth="3" />
          <rect x="504" y="78" width="228" height="132" rx="14" fill={tested ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={tested ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="618" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Boundary</text>
          <text x="618" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.boundary}</text>
          <text x="618" y="178" textAnchor="middle" fontSize="11" fill={tested ? "var(--success)" : "var(--warning)"}>{tested ? "已检查限制" : "不要漏掉限制"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">先问“谁需要共同验证”，再问“是否需要区块链”</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">线下输入不因上链而自动变成真实事实</text>
        </svg>
      </div>
    </section>
  );
}
