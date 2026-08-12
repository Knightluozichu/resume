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

const IDE_PROFILES = {
  browser: {
    label: "browser-solidity",
    role: "浏览器编辑与即时编译",
    input: "源码、编译器版本、账户",
    output: "ABI、字节码、部署回执",
    risk: "默认编译器和网络可能漂移",
  },
  atom: {
    label: "Atom",
    role: "编辑器与插件工作流",
    input: "项目文件、插件、构建命令",
    output: "可复现的源码与构建产物",
    risk: "插件版本和外部命令需归档",
  },
  idea: {
    label: "IntelliJ IDEA",
    role: "工程化编辑与调试",
    input: "项目配置、插件、节点连接",
    output: "源码摘要、调试日志、回执",
    risk: "IDE 配置不能代替链上证据",
  },
} as const;

type IdeKind = keyof typeof IDE_PROFILES;

export function BdpCh07IdeCompareLab() {
  const [kind, setKind] = useState<IdeKind>("browser");
  const [compiled, setCompiled] = useState(false);
  const active = IDE_PROFILES[kind];

  function reset() {
    setKind("browser");
    setCompiled(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch07-ide-compare"
      aria-label={
        "IDE 对比实验：当前为" +
        active.label +
        "，角色是" +
        active.role +
        "，输入是" +
        active.input +
        "，输出是" +
        active.output +
        "，风险是" +
        active.risk +
        "；编译证据" +
        (compiled ? "已保存" : "未保存") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 07 · 历史 IDE</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">工具不同，验收合同不能不同</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择一种历史 IDE，观察编辑、编译、部署和证据归档之间的边界。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择 IDE 工作流</p>
          <div className="grid gap-2">
            <ChoiceButton active={kind === "browser"} onClick={() => setKind("browser")}>browser-solidity</ChoiceButton>
            <ChoiceButton active={kind === "atom"} onClick={() => setKind("atom")}>Atom</ChoiceButton>
            <ChoiceButton active={kind === "idea"} onClick={() => setKind("idea")}>IntelliJ IDEA</ChoiceButton>
          </div>
          <ChoiceButton active={compiled} onClick={() => setCompiled((value) => !value)}>{compiled ? "清除编译证据" : "保存编译证据"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.role}。输入“{active.input}”，预期输出“{active.output}”。{compiled ? " 已记录源码摘要、Compiler、ABI、字节码和部署回执。" : " 还缺少能重建结果的版本与产物记录。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "IDE 工作流图：使用" +
            active.label +
            "完成" +
            active.role +
            "，从" +
            active.input +
            "得到" +
            active.output +
            "；风险是" +
            active.risk +
            "；证据" +
            (compiled ? "已保存" : "未保存") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">IDE → Compiler → Artifact → Chain Evidence</text>
          <rect x="24" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="100" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="100" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">编辑与调试</text>
          <text x="100" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.role}</text>
          <path d="M188 148 H208" stroke="var(--border)" strokeWidth="3" />
          <rect x="220" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="296" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Compiler</text>
          <text x="296" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">固定版本</text>
          <text x="296" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">源码摘要</text>
          <path d="M384 148 H404" stroke="var(--border)" strokeWidth="3" />
          <rect x="416" y="78" width="152" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="492" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Artifact</text>
          <text x="492" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ABI + bytecode</text>
          <text x="492" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">部署输入</text>
          <path d="M580 148 H600" stroke="var(--border)" strokeWidth="3" />
          <rect x="612" y="78" width="124" height="140" rx="14" fill={compiled ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={compiled ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="674" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">证据</text>
          <text x="674" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{compiled ? "已归档" : "待归档"}</text>
          <text x="674" y="180" textAnchor="middle" fontSize="11" fill={compiled ? "var(--success)" : "var(--warning)"}>{compiled ? "可重放" : "缺版本"}</text>
          <text x="380" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.input} → {active.output}</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">风险：{active.risk}</text>
        </svg>
      </div>
    </section>
  );
}

const BANK_ACTIONS = {
  deposit: {
    label: "存款",
    input: "调用者发送 100 单位",
    effect: "bankBalance + 100，callerCredit + 100",
    result: "状态更新并发出 Deposit",
    next: "可按记录金额取款",
  },
  withdraw: {
    label: "合法取款",
    input: "有余额的调用者取出 100",
    effect: "先清零 credit，再向调用者转账",
    result: "状态更新并发出 Withdraw",
    next: "调用者 credit 回到 0",
  },
  unauthorized: {
    label: "越权取款",
    input: "没有 credit 的调用者取款",
    effect: "权限检查不通过",
    result: "revert，原状态不变",
    next: "不产生有效转账",
  },
  insufficient: {
    label: "余额不足",
    input: "取款金额大于 credit",
    effect: "金额检查不通过",
    result: "revert，原状态不变",
    next: "不产生有效转账",
  },
} as const;

type BankAction = keyof typeof BANK_ACTIONS;

export function BdpCh07BankStateLab() {
  const [action, setAction] = useState<BankAction>("deposit");
  const [executed, setExecuted] = useState(false);
  const active = BANK_ACTIONS[action];
  const successful = executed && (action === "deposit" || action === "withdraw");
  const status = !executed ? "等待执行" : successful ? "提交成功" : "已回滚";

  function reset() {
    setAction("deposit");
    setExecuted(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch07-bank-state"
      aria-label={
        "银行合约状态实验：当前动作是" +
        active.label +
        "，输入是" +
        active.input +
        "，效果是" +
        active.effect +
        "，结果是" +
        active.result +
        "，下一状态是" +
        active.next +
        "；当前" +
        status +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 07 · 银行合约</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">每条动作都要说明状态前后</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择正常或拒绝路径，观察调用者 credit、银行余额和事件结果如何联动。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择银行动作</p>
          <div className="grid gap-2">
            <ChoiceButton active={action === "deposit"} onClick={() => { setAction("deposit"); setExecuted(false); }}>存款 100</ChoiceButton>
            <ChoiceButton active={action === "withdraw"} onClick={() => { setAction("withdraw"); setExecuted(false); }}>合法取款 100</ChoiceButton>
            <ChoiceButton active={action === "unauthorized"} onClick={() => { setAction("unauthorized"); setExecuted(false); }}>越权取款</ChoiceButton>
            <ChoiceButton active={action === "insufficient"} onClick={() => { setAction("insufficient"); setExecuted(false); }}>余额不足</ChoiceButton>
          </div>
          <ChoiceButton active={executed} onClick={() => setExecuted(true)}>执行动作</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.input}。预期效果：{active.effect}。{executed ? active.result + " " + active.next + "。" : "先预测成功或回滚，再执行。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "银行状态图：动作" +
            active.label +
            "从" +
            active.input +
            "开始，预期" +
            active.effect +
            "，结果是" +
            (executed ? active.result : "尚未执行") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Caller → Bank Contract → Credit + Event</text>
          <rect x="24" y="78" width="170" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="109" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Caller</text>
          <text x="109" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">msg.sender</text>
          <text x="109" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.input}</text>
          <path d="M206 148 H228" stroke="var(--border)" strokeWidth="3" />
          <rect x="240" y="78" width="208" height="140" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="344" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Bank Contract</text>
          <text x="344" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">权限 → 金额 → 状态</text>
          <text x="344" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.effect}</text>
          <path d="M460 148 H482" stroke="var(--border)" strokeWidth="3" />
          <rect x="494" y="78" width="242" height="140" rx="14" fill={executed && !successful ? "var(--warning)" : executed ? "var(--success)" : "var(--accent)"} fillOpacity="0.12" stroke={executed && !successful ? "var(--warning)" : executed ? "var(--success)" : "var(--accent)"} strokeWidth="2" />
          <text x="615" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">State + Event</text>
          <text x="615" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{executed ? active.result : "等待执行"}</text>
          <text x="615" y="180" textAnchor="middle" fontSize="11" fill={executed && !successful ? "var(--warning)" : executed ? "var(--success)" : "var(--accent)"}>{executed ? active.next : "先写预期"}</text>
          <text x="380" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">状态不变量：credit 记录的金额必须能解释后续取款</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{executed && !successful ? "revert：前状态恢复，事件和转账都不应伪造" : "成功路径也要保存前后余额、调用者和事件"}</text>
        </svg>
      </div>
    </section>
  );
}

const SAFETY_MODES = {
  safe: {
    label: "检查 → 效果 → 交互",
    steps: ["检查权限与金额", "先清零 credit", "向调用者转账", "失败则整体回滚"],
    note: "外部调用发生时，内部账本已经进入可解释状态。",
  },
  unsafe: {
    label: "交互 → 效果",
    steps: ["检查权限与金额", "先向外部调用", "外部代码再次取款", "余额清零太晚"],
    note: "外部调用可能重入，内部状态仍保留可用余额。",
  },
} as const;

type SafetyMode = keyof typeof SAFETY_MODES;

export function BdpCh07SafetyLab() {
  const [mode, setMode] = useState<SafetyMode>("safe");
  const [failure, setFailure] = useState(false);
  const [step, setStep] = useState(0);
  const active = SAFETY_MODES[mode];

  function reset() {
    setMode("safe");
    setFailure(false);
    setStep(0);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch07-safety-order"
      aria-label={
        "银行安全顺序实验：当前模式为" +
        active.label +
        "，步骤为" +
        active.steps.join("、") +
        "；" +
        active.note +
        "；外部调用" +
        (failure ? "失败" : "正常") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 07 · 安全顺序</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">外部调用前，先让状态可解释</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换安全与危险顺序，再注入外部调用失败，观察回滚与重入风险。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择执行顺序</p>
          <div className="grid gap-2">
            <ChoiceButton active={mode === "safe"} onClick={() => { setMode("safe"); setStep(0); }}>检查 → 效果 → 交互</ChoiceButton>
            <ChoiceButton active={mode === "unsafe"} onClick={() => { setMode("unsafe"); setStep(0); }}>交互 → 效果</ChoiceButton>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <ChoiceButton active={step > 0} onClick={() => setStep((value) => Math.min(value + 1, 3))}>推进一步</ChoiceButton>
            <ChoiceButton active={failure} onClick={() => setFailure((value) => !value)}>模拟外部失败</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.steps[Math.min(step, 3)]}。{failure ? (mode === "safe" ? "失败后整个调用回滚，账本保持可解释。" : "失败或重入发生在清零前，账本可能暴露重复取款窗口。") : active.note}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={
            "安全顺序图：模式" +
            active.label +
            "，当前步骤为" +
            active.steps[Math.min(step, 3)] +
            "；" +
            (failure ? "外部调用失败。" : "外部调用正常。") +
            active.note
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Checks → Effects → Interactions → Revert Boundary</text>
          {active.steps.map((label, index) => {
            const reached = step >= index;
            const color = mode === "unsafe" && index >= 1 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 184;
            return (
              <g key={label}>
                {index > 0 ? <path d={"M" + (x - 24) + " 148 H" + (x - 8)} stroke="var(--border)" strokeWidth="3" /> : null}
                <rect x={x} y="78" width="152" height="140" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 76} y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{label}</text>
                <text x={x + 76} y="148" textAnchor="middle" fontSize="11" fill={color}>{reached ? "已观察" : "待观察"}</text>
                <text x={x + 76} y="182" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{failure && index >= 2 ? "失败边界" : "状态记录"}</text>
              </g>
            );
          })}
          <text x="380" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.note}</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{failure ? (mode === "safe" ? "安全模式：revert 恢复前状态" : "危险模式：检查重入与清零顺序") : "先记录检查条件，再允许外部调用接触状态"}</text>
        </svg>
      </div>
    </section>
  );
}
