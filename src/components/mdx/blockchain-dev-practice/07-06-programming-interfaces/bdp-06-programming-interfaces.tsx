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

const REQUESTS = {
  account: {
    label: "账户读取",
    method: "eth_getBalance",
    input: "地址 + 区块标记",
    output: "余额或错误对象",
    check: "地址、网络和区块上下文一致",
  },
  transaction: {
    label: "交易提交",
    method: "eth_sendRawTransaction",
    input: "签名交易 + chain ID",
    output: "交易哈希",
    check: "哈希之后仍需回执与确认",
  },
  block: {
    label: "区块读取",
    method: "eth_getBlockByNumber",
    input: "区块标记 + 交易开关",
    output: "区块对象",
    check: "parentHash 与链头可对照",
  },
} as const;

type RequestKind = keyof typeof REQUESTS;

const FLOW_NODES = [
  { id: "request", title: "请求", detail: "method + params" },
  { id: "response", title: "响应", detail: "result 或 error" },
  { id: "receipt", title: "回执", detail: "交易是否执行" },
  { id: "state", title: "状态", detail: "确认后再发布" },
] as const;

export function BdpCh06RequestLab() {
  const [kind, setKind] = useState<RequestKind>("account");
  const [stage, setStage] = useState(0);
  const [fault, setFault] = useState(false);
  const active = REQUESTS[kind];
  const stateLabel = fault
    ? "请求因网络或参数不一致而停止"
    : stage === 0
      ? "尚未发送"
      : stage === 1
        ? "已收到原始响应"
        : stage === 2
          ? "已核对执行回执"
          : "达到发布所需的确认";

  function reset() {
    setKind("account");
    setStage(0);
    setFault(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch06-request-lifecycle"
      aria-label={
        "请求生命周期实验：当前为" +
        active.label +
        "，方法是" +
        active.method +
        "，输入是" +
        active.input +
        "，输出是" +
        active.output +
        "，校验条件是" +
        active.check +
        "；" +
        stateLabel +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 06 · 请求生命周期</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">返回值只是链路中的一个站点</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择读取或提交操作，逐段推进请求、响应、回执和最终状态。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择接口任务</p>
          <div className="grid gap-2">
            <ChoiceButton active={kind === "account"} onClick={() => setKind("account")}>读取账户余额</ChoiceButton>
            <ChoiceButton active={kind === "transaction"} onClick={() => setKind("transaction")}>提交签名交易</ChoiceButton>
            <ChoiceButton active={kind === "block"} onClick={() => setKind("block")}>读取区块对象</ChoiceButton>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <ChoiceButton active={stage > 0} onClick={() => setStage((value) => Math.max(value, 1))}>收到响应</ChoiceButton>
            <ChoiceButton active={stage > 1} onClick={() => setStage((value) => Math.max(value, 2))}>核对回执</ChoiceButton>
            <ChoiceButton active={stage > 2} onClick={() => setStage((value) => Math.max(value, 3))}>确认状态</ChoiceButton>
            <ChoiceButton active={fault} onClick={() => setFault((value) => !value)}>注入错误</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.method} 的输入是“{active.input}”，当前输出是“{active.output}”。{fault ? "错误已注入：不要把旧响应当成新状态。" : active.check + "。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "请求生命周期图：从" +
            active.method +
            "请求经过原始响应、回执和状态确认；当前" +
            stateLabel +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Request → Response → Receipt → Confirmed State</text>
          {FLOW_NODES.map((node, index) => {
            const reached = !fault && stage >= index;
            const color = fault && index >= 1 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 184;
            return (
              <g key={node.id}>
                {index > 0 ? <path d={"M" + (x - 24) + " 146 H" + (x - 8)} stroke="var(--border)" strokeWidth="3" /> : null}
                <rect x={x} y="76" width="152" height="140" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 76} y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.title}</text>
                <text x={x + 76} y="145" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{index === 0 ? active.method : node.detail}</text>
                <text x={x + 76} y="176" textAnchor="middle" fontSize="11" fill={color}>{fault && index >= 1 ? "需重新取证" : reached ? "已核对" : "待推进"}</text>
                <text x={x + 76} y="198" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{index === 0 ? active.input : index === 1 ? active.output : active.check}</text>
              </g>
            );
          })}
          <text x="380" y="264" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">交易哈希只能证明节点接受了一个候选对象</text>
          <text x="380" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{fault ? "故障路径：保留 error、请求和旧状态，停止继续广播" : "发布前把原始请求、响应、回执和区块上下文放在同一份记录里"}</text>
        </svg>
      </div>
    </section>
  );
}

const API_MAPPINGS = {
  account: {
    label: "账户",
    web3: "web3.eth.getBalance(address, block)",
    rpc: "eth_getBalance(address, block)",
    params: "0xabc…，latest",
    result: "余额；失败时读取 error",
    risk: "地址或区块标记指向另一条链",
  },
  transaction: {
    label: "交易",
    web3: "web3.eth.sendSignedTransaction(raw)",
    rpc: "eth_sendRawTransaction(raw)",
    params: "0xf86… 签名交易",
    result: "交易哈希；随后轮询回执",
    risk: "重复提交、nonce 或 chain ID 不匹配",
  },
  block: {
    label: "区块",
    web3: "web3.eth.getBlock(tag, fullTx)",
    rpc: "eth_getBlockByNumber(tag, fullTx)",
    params: "latest，false",
    result: "区块对象与 parentHash",
    risk: "链头变化或节点尚未同步",
  },
} as const;

type ApiKind = keyof typeof API_MAPPINGS;
type ApiLayer = "web3" | "rpc";

export function BdpCh06ApiMappingLab() {
  const [kind, setKind] = useState<ApiKind>("account");
  const [layer, setLayer] = useState<ApiLayer>("web3");
  const [checked, setChecked] = useState(false);
  const active = API_MAPPINGS[kind];
  const method = layer === "web3" ? active.web3 : active.rpc;

  function reset() {
    setKind("account");
    setLayer("web3");
    setChecked(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch06-api-mapping"
      aria-label={
        "API 映射实验：当前为" +
        active.label +
        "，层级为" +
        (layer === "web3" ? "web3.js" : "JSON-RPC") +
        "，方法为" +
        method +
        "，参数为" +
        active.params +
        "，结果为" +
        active.result +
        "；风险是" +
        active.risk +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 06 · API 映射</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">封装层与协议层必须能互相翻译</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换同一任务的 web3.js 与 JSON-RPC 写法，检查方法、参数、结果和风险是否保持一致。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择任务与接口层</p>
          <div className="grid gap-2">
            <ChoiceButton active={kind === "account"} onClick={() => setKind("account")}>账户 API</ChoiceButton>
            <ChoiceButton active={kind === "transaction"} onClick={() => setKind("transaction")}>交易 API</ChoiceButton>
            <ChoiceButton active={kind === "block"} onClick={() => setKind("block")}>区块 API</ChoiceButton>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <ChoiceButton active={layer === "web3"} onClick={() => setLayer("web3")}>web3.js 封装</ChoiceButton>
            <ChoiceButton active={layer === "rpc"} onClick={() => setLayer("rpc")}>JSON-RPC 原语</ChoiceButton>
          </div>
          <ChoiceButton active={checked} onClick={() => setChecked((value) => !value)}>{checked ? "已保存映射证据" : "保存映射证据"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前调用：{method}。参数：{active.params}。{checked ? "已记录方法、参数、result/error 与区块上下文。" : "先确认封装调用确实落到同一个 RPC 方法。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "API 映射图：任务" +
            active.label +
            "在" +
            (layer === "web3" ? "web3.js 封装" : "JSON-RPC 原语") +
            "下调用" +
            method +
            "，参数为" +
            active.params +
            "，结果为" +
            active.result +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Task → API Layer → Method + Params → Evidence</text>
          <rect x="24" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="100" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="100" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">目标任务</text>
          <text x="100" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">账户 / 交易 / 区块</text>
          <path d="M188 148 H208" stroke="var(--border)" strokeWidth="3" />
          <rect x="220" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="296" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{layer === "web3" ? "web3.js" : "JSON-RPC"}</text>
          <text x="296" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{layer === "web3" ? "封装调用" : "协议请求"}</text>
          <text x="296" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">可追溯到节点</text>
          <path d="M384 148 H404" stroke="var(--border)" strokeWidth="3" />
          <rect x="416" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="492" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Method</text>
          <text x="492" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.rpc}</text>
          <text x="492" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.params}</text>
          <path d="M580 148 H600" stroke="var(--border)" strokeWidth="3" />
          <rect x="612" y="78" width="124" height="140" rx="14" fill={checked ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={checked ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="674" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">证据</text>
          <text x="674" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{checked ? "已保存" : "待核对"}</text>
          <text x="674" y="180" textAnchor="middle" fontSize="11" fill={checked ? "var(--success)" : "var(--warning)"}>{checked ? "可复核" : "缺上下文"}</text>
          <text x="380" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.result}</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">风险：{active.risk}</text>
        </svg>
      </div>
    </section>
  );
}

const CONFIRMATION_STATES = {
  pending: {
    label: "只进内存池",
    sequence: ["已广播", "等待打包", "没有回执", "不可发布"],
    note: "交易哈希存在，但还没有证明执行结果。",
  },
  included: {
    label: "已进区块",
    sequence: ["已广播", "已打包", "回执成功", "等待确认"],
    note: "回执说明执行路径完成，还要设定确认深度。",
  },
  reorg: {
    label: "发生重组",
    sequence: ["旧区块", "观察到回执", "链头变化", "重新核对"],
    note: "旧区块里的结果不能直接当作最终状态。",
  },
} as const;

type ConfirmationKind = keyof typeof CONFIRMATION_STATES;

export function BdpCh06ConfirmationLab() {
  const [kind, setKind] = useState<ConfirmationKind>("included");
  const [stage, setStage] = useState(0);
  const [evidence, setEvidence] = useState(false);
  const active = CONFIRMATION_STATES[kind];

  function reset() {
    setKind("included");
    setStage(0);
    setEvidence(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch06-confirmation-boundary"
      aria-label={
        "确认边界实验：当前状态为" +
        active.label +
        "，阶段依次为" +
        active.sequence.join("、") +
        "；" +
        active.note +
        "证据" +
        (evidence ? "已保存" : "未保存") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 06 · 回执与确认</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">执行完成不等于最终确认</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换等待、纳入区块和重组路径，观察发布判断为何必须绑定区块上下文。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择链上状态</p>
          <div className="grid gap-2">
            <ChoiceButton active={kind === "pending"} onClick={() => setKind("pending")}>仍在内存池</ChoiceButton>
            <ChoiceButton active={kind === "included"} onClick={() => setKind("included")}>已纳入区块</ChoiceButton>
            <ChoiceButton active={kind === "reorg"} onClick={() => setKind("reorg")}>观察到重组</ChoiceButton>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <ChoiceButton active={stage > 0} onClick={() => setStage((value) => Math.min(value + 1, 3))}>推进一个阶段</ChoiceButton>
            <ChoiceButton active={evidence} onClick={() => setEvidence((value) => !value)}>{evidence ? "清除证据记录" : "保存区块证据"}</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.sequence[Math.min(stage, 3)]}。{active.note}{evidence ? " 已保存交易哈希、回执、区块哈希和观察时刻。" : " 尚未保存能复核最终性的字段。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "确认边界图：状态" +
            active.label +
            "沿着" +
            active.sequence.join("、") +
            "变化；当前阶段为" +
            active.sequence[Math.min(stage, 3)] +
            "，证据" +
            (evidence ? "已保存" : "未保存") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Broadcast → Inclusion → Receipt → Confirmation</text>
          {active.sequence.map((label, index) => {
            const reached = stage >= index;
            const color = kind === "reorg" && index >= 2 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 184;
            return (
              <g key={label}>
                {index > 0 ? <path d={"M" + (x - 24) + " 146 H" + (x - 8)} stroke="var(--border)" strokeWidth="3" /> : null}
                <rect x={x} y="78" width="152" height="136" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 76} y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{label}</text>
                <text x={x + 76} y="148" textAnchor="middle" fontSize="11" fill={color}>{reached ? "已观察" : "待观察"}</text>
                <text x={x + 76} y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{kind === "reorg" && index >= 2 ? "旧上下文失效" : index === 2 ? "检查 status" : "记录原始对象"}</text>
              </g>
            );
          })}
          <text x="380" y="264" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.note}</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{evidence ? "发布证据：哈希、回执、区块上下文和确认阈值已归档" : "发布门槛：不能只凭交易哈希或界面提示作结论"}</text>
        </svg>
      </div>
    </section>
  );
}
