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

const GENESIS_PROFILES = {
  clean: {
    label: "干净创世",
    input: "固定创世配置与初始账户",
    output: "稳定的链身份",
    boundary: "新数据目录与测试密钥",
  },
  replay: {
    label: "历史重放",
    input: "2018 工具与隔离数据",
    output: "可解释的历史行为",
    boundary: "版本、默认值与回退点",
  },
  upgrade: {
    label: "配置迁移",
    input: "旧创世与现代客户端",
    output: "差异可定位的节点",
    boundary: "协议、参数与数据格式",
  },
} as const;

type GenesisProfile = keyof typeof GENESIS_PROFILES;

export function BdpCh05GenesisLab() {
  const [profile, setProfile] = useState<GenesisProfile>("clean");
  const [initialized, setInitialized] = useState(false);
  const active = GENESIS_PROFILES[profile];

  function reset() {
    setProfile("clean");
    setInitialized(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch05-genesis"
      aria-label={
        "创世配置实验：当前为" +
        active.label +
        "，输入是" +
        active.input +
        "，结果是" +
        active.output +
        "，边界是" +
        active.boundary +
        "；初始化" +
        (initialized ? "完成" : "未完成") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 05 · 创世配置实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">私链身份从创世配置开始</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换创世实验类型，观察配置、数据目录和账户如何共同决定一条私链的身份。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择创世策略</p>
          <div className="grid gap-2">
            <ChoiceButton active={profile === "clean"} onClick={() => setProfile("clean")}>干净创世</ChoiceButton>
            <ChoiceButton active={profile === "replay"} onClick={() => setProfile("replay")}>历史重放</ChoiceButton>
            <ChoiceButton active={profile === "upgrade"} onClick={() => setProfile("upgrade")}>配置迁移</ChoiceButton>
          </div>
          <ChoiceButton active={initialized} onClick={() => setInitialized((value) => !value)}>{initialized ? "撤销初始化记录" : "记录初始化结果"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}使用“{active.input}”，预期得到“{active.output}”。边界：{active.boundary}。{initialized ? " 已记录创世摘要、chain ID 和数据目录。" : " 尚未记录创世摘要、chain ID 和数据目录。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "创世配置链路：" +
            active.label +
            "输入" +
            active.input +
            "，形成" +
            active.output +
            "，受" +
            active.boundary +
            "约束；初始化" +
            (initialized ? "完成" : "未完成") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Genesis → Data Directory → Nodes → Chain Identity</text>
          <rect x="28" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="110" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Genesis</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.input}</text>
          <text x="110" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">创世摘要</text>
          <path d="M214 144 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="260" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="342" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Data</text>
          <text x="342" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">新数据目录</text>
          <text x="342" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">初始状态</text>
          <path d="M446 144 H480" stroke="var(--border)" strokeWidth="3" />
          <rect x="492" y="78" width="240" height="132" rx="14" fill={initialized ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={initialized ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="612" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Identity</text>
          <text x="612" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.output}</text>
          <text x="612" y="178" textAnchor="middle" fontSize="11" fill={initialized ? "var(--success)" : "var(--warning)"}>{initialized ? "可核对" : "等待记录"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">不同创世配置即使使用相同客户端，也不属于同一条链</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">账户、chain ID 和创世摘要必须一起归档</text>
        </svg>
      </div>
    </section>
  );
}

const CONSOLE_OPERATIONS = {
  account: {
    label: "账户",
    request: "列出测试账户与余额",
    output: "账户地址、nonce、余额",
    check: "账户属于目标私链且无真实资产",
  },
  block: {
    label: "区块",
    request: "读取链头与区块详情",
    output: "高度、哈希、父块与时间",
    check: "链头属于目标创世历史",
  },
  transaction: {
    label: "交易",
    request: "发送无价值测试交易",
    output: "哈希、回执与状态",
    check: "前后状态和确认深度一致",
  },
} as const;

type ConsoleOperation = keyof typeof CONSOLE_OPERATIONS;

export function BdpCh05ConsoleLab() {
  const [operation, setOperation] = useState<ConsoleOperation>("account");
  const [captured, setCaptured] = useState(false);
  const active = CONSOLE_OPERATIONS[operation];

  function reset() {
    setOperation("account");
    setCaptured(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch05-console"
      aria-label={
        "控制台实验：当前操作为" +
        active.label +
        "，请求是" +
        active.request +
        "，输出是" +
        active.output +
        "，检查" +
        active.check +
        "；证据" +
        (captured ? "已保存" : "未保存") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 05 · 控制台证据实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">命令输出要绑定节点上下文</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择账户、区块或交易操作，练习把可读输出还原成节点、网络和状态证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "控制台链路：" +
            active.label +
            "发送" +
            active.request +
            "，得到" +
            active.output +
            "，检查" +
            active.check +
            "；证据" +
            (captured ? "已保存" : "未保存") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Console Request → RPC → Raw Result → State Check</text>
          <rect x="28" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="110" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Request</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="110" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">控制台输入</text>
          <path d="M214 144 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="260" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="342" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">RPC</text>
          <text x="342" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.request}</text>
          <text x="342" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">节点上下文</text>
          <path d="M446 144 H480" stroke="var(--border)" strokeWidth="3" />
          <rect x="492" y="78" width="240" height="132" rx="14" fill={captured ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={captured ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="612" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Evidence</text>
          <text x="612" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.output}</text>
          <text x="612" y="178" textAnchor="middle" fontSize="11" fill={captured ? "var(--success)" : "var(--warning)"}>{captured ? "可复核" : "先保存原始结果"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">余额、区块和交易输出的证明强度不同</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.check}</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择控制台操作</p>
          <div className="grid gap-2">
            <ChoiceButton active={operation === "account"} onClick={() => setOperation("account")}>账户与余额</ChoiceButton>
            <ChoiceButton active={operation === "block"} onClick={() => setOperation("block")}>链头与区块</ChoiceButton>
            <ChoiceButton active={operation === "transaction"} onClick={() => setOperation("transaction")}>无价值交易</ChoiceButton>
          </div>
          <ChoiceButton active={captured} onClick={() => setCaptured((value) => !value)}>{captured ? "撤销控制台证据" : "保存控制台证据"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.request}，得到“{active.output}”。检查：{active.check}。{captured ? " 已保存原始请求与结果。" : " 尚未保存原始请求与结果。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const TOPOLOGIES = {
  single: {
    label: "单节点",
    nodes: "一个客户端与一个数据目录",
    result: "适合命令和状态机练习",
    risk: "无法观察对等同步和成员连接",
  },
  peers: {
    label: "双节点",
    nodes: "两个独立数据目录与对等连接",
    result: "可以检查传播和一致状态",
    risk: "端口、账户和创世配置必须分别固定",
  },
  testrpc: {
    label: "TestRPC",
    nodes: "内存测试链与预置账户",
    result: "快速验证调用和合约路径",
    risk: "不代表持久化、真实共识或生产安全",
  },
} as const;

type Topology = keyof typeof TOPOLOGIES;

export function BdpCh05PeerLab() {
  const [topology, setTopology] = useState<Topology>("peers");
  const [connected, setConnected] = useState(false);
  const active = TOPOLOGIES[topology];

  function reset() {
    setTopology("peers");
    setConnected(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch05-peer-topology"
      aria-label={
        "节点拓扑实验：当前为" +
        active.label +
        "，节点是" +
        active.nodes +
        "，结果是" +
        active.result +
        "，风险是" +
        active.risk +
        "；连接" +
        (connected ? "已确认" : "未确认") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 05 · 节点拓扑实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">私链不是一个换了名字的单机程序</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换单节点、双节点和 TestRPC，比较连接、持久化、共识与测试便利性的边界。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择拓扑</p>
          <div className="grid grid-cols-3 gap-2">
            <ChoiceButton active={topology === "single"} onClick={() => setTopology("single")}>单节点</ChoiceButton>
            <ChoiceButton active={topology === "peers"} onClick={() => setTopology("peers")}>双节点</ChoiceButton>
            <ChoiceButton active={topology === "testrpc"} onClick={() => setTopology("testrpc")}>TestRPC</ChoiceButton>
          </div>
          <ChoiceButton active={connected} onClick={() => setConnected((value) => !value)}>{connected ? "撤销拓扑验证" : "完成拓扑验证"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.nodes}，{active.result}。风险：{active.risk}。{connected ? " 已记录节点、端口、创世和链头证据。" : " 尚未记录节点、端口、创世和链头证据。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "节点拓扑链路：" +
            active.label +
            "包含" +
            active.nodes +
            "，结果是" +
            active.result +
            "，风险是" +
            active.risk +
            "；拓扑验证" +
            (connected ? "完成" : "未完成") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Genesis → Peer Set → Propagation → State</text>
          <rect x="28" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="110" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Nodes</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.nodes}</text>
          <text x="110" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">独立数据目录</text>
          <path d="M214 144 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="260" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="342" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Peers</text>
          <text x="342" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">端口与同伴</text>
          <text x="342" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">传播边界</text>
          <path d="M446 144 H480" stroke="var(--border)" strokeWidth="3" />
          <rect x="492" y="78" width="240" height="132" rx="14" fill={connected ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={connected ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="612" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">State</text>
          <text x="612" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.result}</text>
          <text x="612" y="178" textAnchor="middle" fontSize="11" fill={connected ? "var(--success)" : "var(--warning)"}>{connected ? "可对照" : "先验证"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">拓扑复杂度增加的是证据对象，不只是进程数量</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.risk}</text>
        </svg>
      </div>
    </section>
  );
}
