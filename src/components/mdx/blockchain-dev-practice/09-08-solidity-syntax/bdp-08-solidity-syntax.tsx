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

const TYPE_PROFILES = {
  integer: {
    label: "整型",
    value: "uint8(255) + 1",
    boundary: "宽度上限",
    result: "旧版可能回绕，现代检查通常拒绝",
    rule: "先断言范围，再转换或计算",
  },
  bytes: {
    label: "字节数组",
    value: "bytes1 与 bytes",
    boundary: "长度与编码",
    result: "固定长度和动态长度采用不同 ABI",
    rule: "明确字节序、长度和复制成本",
  },
  collection: {
    label: "数组 / 映射",
    value: "items[index] 与 balances[key]",
    boundary: "索引、默认值、遍历",
    result: "越界或无键读取必须有明确语义",
    rule: "限制循环，区分不存在与零值",
  },
  address: {
    label: "地址",
    value: "address 与 address payable",
    boundary: "零地址与目标代码",
    result: "格式正确不等于收款人正确",
    rule: "检查身份、网络和转账返回值",
  },
} as const;

type TypeKind = keyof typeof TYPE_PROFILES;

export function BdpCh08TypeLab() {
  const [kind, setKind] = useState<TypeKind>("integer");
  const [checked, setChecked] = useState(false);
  const active = TYPE_PROFILES[kind];

  function reset() {
    setKind("integer");
    setChecked(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch08-type-boundary"
      aria-label={
        "Solidity 类型边界实验：当前为" +
        active.label +
        "，值为" +
        active.value +
        "，边界是" +
        active.boundary +
        "，结果是" +
        active.result +
        "；检查" +
        (checked ? "已完成" : "未完成") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 08 · 类型边界</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">类型声明要带着边界一起读</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择一种 Solidity 类型，观察值域、编码和安全检查之间的关系。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择类型族</p>
          <div className="grid gap-2">
            <ChoiceButton active={kind === "integer"} onClick={() => { setKind("integer"); setChecked(false); }}>整型与布尔型</ChoiceButton>
            <ChoiceButton active={kind === "bytes"} onClick={() => { setKind("bytes"); setChecked(false); }}>字节数组</ChoiceButton>
            <ChoiceButton active={kind === "collection"} onClick={() => { setKind("collection"); setChecked(false); }}>数组与映射</ChoiceButton>
            <ChoiceButton active={kind === "address"} onClick={() => { setKind("address"); setChecked(false); }}>地址类型</ChoiceButton>
          </div>
          <ChoiceButton active={checked} onClick={() => setChecked((value) => !value)}>{checked ? "已记录边界" : "记录边界检查"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：值“{active.value}”，边界“{active.boundary}”。{checked ? active.rule + "；结果已保存。" : "先猜边界行为，再选择记录。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "类型边界图：类型" +
            active.label +
            "接收值" +
            active.value +
            "，遇到" +
            active.boundary +
            "时" +
            active.result +
            "；检查" +
            (checked ? "已完成" : "未完成") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Type → Value → Boundary → Verified Rule</text>
          <rect x="24" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="100" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="100" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">声明</text>
          <text x="100" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.value}</text>
          <path d="M188 148 H208" stroke="var(--border)" strokeWidth="3" />
          <rect x="220" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="296" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Value</text>
          <text x="296" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">编码与范围</text>
          <text x="296" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">输入前先校验</text>
          <path d="M384 148 H404" stroke="var(--border)" strokeWidth="3" />
          <rect x="416" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="492" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Boundary</text>
          <text x="492" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.boundary}</text>
          <text x="492" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.result}</text>
          <path d="M580 148 H600" stroke="var(--border)" strokeWidth="3" />
          <rect x="612" y="78" width="124" height="140" rx="14" fill={checked ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={checked ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="674" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">规则</text>
          <text x="674" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{checked ? "已记录" : "待检查"}</text>
          <text x="674" y="180" textAnchor="middle" fontSize="11" fill={checked ? "var(--success)" : "var(--warning)"}>{checked ? "可复核" : "缺证据"}</text>
          <text x="380" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.rule}</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">类型转换、ABI 编码和存储布局都要绑定 Compiler 版本</text>
        </svg>
      </div>
    </section>
  );
}

const LOCATION_PROFILES = {
  storage: {
    label: "storage",
    lifetime: "跨交易持久化",
    mutation: "写入会改变链上状态",
    cost: "读写成本与槽位相关",
    rule: "需要保存的状态放这里",
  },
  memory: {
    label: "memory",
    lifetime: "单次调用内存在",
    mutation: "修改副本，不直接持久化",
    cost: "临时计算与复制有成本",
    rule: "函数内部暂存复杂值",
  },
  calldata: {
    label: "calldata",
    lifetime: "外部调用输入期间",
    mutation: "只读，不复制为可写值",
    cost: "适合大输入的只读访问",
    rule: "外部函数参数优先保持只读",
  },
} as const;

type LocationKind = keyof typeof LOCATION_PROFILES;

export function BdpCh08DataLocationLab() {
  const [kind, setKind] = useState<LocationKind>("storage");
  const [mutated, setMutated] = useState(false);
  const active = LOCATION_PROFILES[kind];

  function reset() {
    setKind("storage");
    setMutated(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch08-data-location"
      aria-label={
        "数据位置实验：当前为" +
        active.label +
        "，生命周期为" +
        active.lifetime +
        "，修改行为是" +
        active.mutation +
        "，成本提示是" +
        active.cost +
        "；" +
        (mutated ? "已执行修改" : "尚未修改") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 08 · 数据位置</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">同一个值，放置位置决定生命周期</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换 storage、memory 和 calldata，观察持久化、可写性和复制成本。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择数据位置</p>
          <div className="grid gap-2">
            <ChoiceButton active={kind === "storage"} onClick={() => { setKind("storage"); setMutated(false); }}>storage：持久状态</ChoiceButton>
            <ChoiceButton active={kind === "memory"} onClick={() => { setKind("memory"); setMutated(false); }}>memory：调用副本</ChoiceButton>
            <ChoiceButton active={kind === "calldata"} onClick={() => { setKind("calldata"); setMutated(false); }}>calldata：只读输入</ChoiceButton>
          </div>
          <ChoiceButton active={mutated} onClick={() => setMutated((value) => !value)}>{mutated ? "撤销修改" : "模拟修改值"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.lifetime}，{active.mutation}。{mutated ? (kind === "storage" ? "修改会留下链上状态变化。" : kind === "memory" ? "修改只影响本次调用副本。" : "只读输入不能被函数直接改写。") : "先预测修改是否会留在链上。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "数据位置图：当前" +
            active.label +
            "的生命周期是" +
            active.lifetime +
            "，修改行为是" +
            active.mutation +
            "；" +
            (mutated ? "已模拟修改。" : "尚未模拟修改。")
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Input → Data Location → Mutation → Lifetime</text>
          <rect x="24" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="100" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">输入</text>
          <text x="100" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数组 / 映射 / 结构体</text>
          <text x="100" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">函数参数或状态</text>
          <path d="M188 148 H208" stroke="var(--border)" strokeWidth="3" />
          <rect x="220" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="296" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="296" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.lifetime}</text>
          <text x="296" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.cost}</text>
          <path d="M384 148 H404" stroke="var(--border)" strokeWidth="3" />
          <rect x="416" y="78" width="152" height="140" rx="14" fill={mutated && kind === "storage" ? "var(--success)" : "var(--accent)"} fillOpacity="0.12" stroke={mutated && kind === "storage" ? "var(--success)" : "var(--accent)"} strokeWidth="2" />
          <text x="492" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">修改</text>
          <text x="492" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{mutated ? "已模拟" : "待模拟"}</text>
          <text x="492" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.mutation}</text>
          <path d="M580 148 H600" stroke="var(--border)" strokeWidth="3" />
          <rect x="612" y="78" width="124" height="140" rx="14" fill={mutated ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={mutated ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="674" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">结果</text>
          <text x="674" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{mutated ? "已判定" : "待判定"}</text>
          <text x="674" y="180" textAnchor="middle" fontSize="11" fill={mutated ? "var(--success)" : "var(--warning)"}>{mutated ? "可解释" : "缺上下文"}</text>
          <text x="380" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.rule}</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数据位置、复制规则和 ABI 必须与 Compiler 版本一起验证</text>
        </svg>
      </div>
    </section>
  );
}

const SAFETY_RULES = {
  checks: {
    label: "尽早抛出异常",
    steps: ["检查权限", "检查金额", "执行状态变化", "保留失败原因"],
    result: "无效输入在副作用前停止",
  },
  order: {
    label: "结构化函数顺序",
    steps: ["Checks", "Effects", "Interactions", "失败整体回滚"],
    result: "外部调用前内部状态可解释",
  },
  pull: {
    label: "Pull 支付",
    steps: ["记录应付金额", "收款方主动领取", "单次领取清零", "失败可重试"],
    result: "减少批量推送阻塞和重入面",
  },
  arithmetic: {
    label: "整数边界",
    steps: ["固定类型宽度", "检查加减范围", "执行运算", "保存错误轨迹"],
    result: "溢出路径不会静默污染状态",
  },
} as const;

type SafetyRule = keyof typeof SAFETY_RULES;

export function BdpCh08SafetyLab() {
  const [rule, setRule] = useState<SafetyRule>("checks");
  const [failure, setFailure] = useState(false);
  const [step, setStep] = useState(0);
  const active = SAFETY_RULES[rule];

  function reset() {
    setRule("checks");
    setFailure(false);
    setStep(0);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch08-safety-practices"
      aria-label={
        "Solidity 安全实践实验：当前规则为" +
        active.label +
        "，步骤为" +
        active.steps.join("、") +
        "，预期结果是" +
        active.result +
        "；故障" +
        (failure ? "已注入" : "未注入") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 08 · 安全实践</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">语法选择最终要回到失败边界</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换安全规则并注入错误，观察检查、状态变化、支付和回滚的关系。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择安全规则</p>
          <div className="grid gap-2">
            <ChoiceButton active={rule === "checks"} onClick={() => { setRule("checks"); setStep(0); }}>尽早抛出异常</ChoiceButton>
            <ChoiceButton active={rule === "order"} onClick={() => { setRule("order"); setStep(0); }}>结构化函数顺序</ChoiceButton>
            <ChoiceButton active={rule === "pull"} onClick={() => { setRule("pull"); setStep(0); }}>Pull 支付</ChoiceButton>
            <ChoiceButton active={rule === "arithmetic"} onClick={() => { setRule("arithmetic"); setStep(0); }}>整数上溢和下溢</ChoiceButton>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <ChoiceButton active={step > 0} onClick={() => setStep((value) => Math.min(value + 1, 3))}>推进一步</ChoiceButton>
            <ChoiceButton active={failure} onClick={() => setFailure((value) => !value)}>注入失败</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.steps[Math.min(step, 3)]}。{failure ? "错误轨迹已保存，检查是否在副作用前停止。" : active.result + "。先预测再推进。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "安全实践图：规则" +
            active.label +
            "依次经过" +
            active.steps.join("、") +
            "；当前步骤是" +
            active.steps[Math.min(step, 3)] +
            "；故障" +
            (failure ? "已注入" : "未注入") +
            "，预期结果是" +
            active.result +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Rule → Check → State → Failure Boundary</text>
          {active.steps.map((label, index) => {
            const reached = step >= index;
            const color = failure && index >= 2 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 184;
            return (
              <g key={label}>
                {index > 0 ? <path d={"M" + (x - 24) + " 148 H" + (x - 8)} stroke="var(--border)" strokeWidth="3" /> : null}
                <rect x={x} y="78" width="152" height="140" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 76} y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{label}</text>
                <text x={x + 76} y="148" textAnchor="middle" fontSize="11" fill={color}>{reached ? "已观察" : "待观察"}</text>
                <text x={x + 76} y="182" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{failure && index >= 2 ? "失败边界" : "保留证据"}</text>
              </g>
            );
          })}
          <text x="380" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.result}</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{failure ? "故障路径：保留错误、输入和前状态，不把静默结果当成功" : "安全实践不是一句口号，要能从测试轨迹解释每个分支"}</text>
        </svg>
      </div>
    </section>
  );
}
