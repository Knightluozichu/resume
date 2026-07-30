"use client";

import { useMemo, useState } from "react";

export type WindowsKernelEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  probe:
    | "cross"
    | "internals"
    | "setup"
    | "basics"
    | "lifecycle"
    | "debug"
    | "mechanisms"
    | "irp"
    | "process-callback"
    | "object-registry"
    | "minifilter"
    | "miscellaneous";
  stages: readonly {
    label: string;
    object: string;
    control: string;
    signal: string;
    rollback: string;
  }[];
  gates: readonly { label: string; detail: string }[];
};

type Props = {
  model: WindowsKernelEvidenceModel;
  view: "version-context" | "executable-probe" | "safety-gate";
};

type ResultRow = { label: string; value: string; note: string };

const controlClass =
  "min-h-11 rounded-control border border-border bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50";

const TRACKS = {
  first: {
    label: "中文版 / 作者一版",
    identity:
      "中文版以2021年机械工业出版社版为范围；作者一版页面与18页授权样章只支持目录、版本及开放页核对。",
    boundary:
      "中文版185坐标与作者一版公开目录204坐标存在19项差异；差异项只能标注，不得冒充中文版缺失正文。",
  },
  second: {
    label: "作者二版迁移轨",
    identity:
      "作者二版及MIT示例仓库用于识别新增章节、接口和示例结构，不能倒写为2021年中文版内容。",
    boundary:
      "二版目录、样例与一版属于不同出版轨；同名代码也必须按仓库提交和适用平台重新验证。",
  },
  target: {
    label: "目标 Windows / WDK",
    identity:
      "实验冻结Windows产品、完整build、架构、SDK、WDK、Visual Studio、驱动模型、签名和VBS/HVCI状态。",
    boundary:
      "Microsoft Learn与目标DDI回答当前支持边界；运行结论只对该构建、驱动包、虚拟机和输入成立。",
  },
} as const;

const CONTEXTS = {
  passive: {
    label: "PASSIVE_LEVEL",
    contract:
      "记录调用线程、进程上下文、可分页性、等待、用户缓冲区捕获、锁和卸载状态；不能仅凭例程名推断上下文。",
  },
  apc: {
    label: "APC_LEVEL / 任意线程",
    contract:
      "声明是否处于任意线程上下文、是否允许分页和等待，并保存请求来源、缓冲区所有权与完成路径。",
  },
  dispatch: {
    label: "DISPATCH_LEVEL / DIRQL",
    contract:
      "禁止访问可分页代码或数据及阻塞等待；记录IRQL、CPU、DPC/ISR、spin lock和NonPagedPoolNx边界。",
  },
} as const;

function rows(
  first: ResultRow,
  second: ResultRow,
  third: ResultRow,
  verdict: string,
) {
  return { rows: [first, second, third], verdict };
}

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button type="button" className={controlClass} onClick={onReset}>
      重置本实验
    </button>
  );
}

function VersionContext({ model }: { model: WindowsKernelEvidenceModel }) {
  const [coordinate, setCoordinate] = useState(0);
  const [track, setTrack] = useState<keyof typeof TRACKS>("first");
  const [context, setContext] = useState<keyof typeof CONTEXTS>("passive");

  function reset() {
    setCoordinate(0);
    setTrack("first");
    setContext("passive");
  }

  const selectedTrack = TRACKS[track];
  const selectedContext = CONTEXTS[context];

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="windows-kernel-version-context"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            版本—驱动模型—执行上下文合同
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            先选正式坐标，再分开一版、二版与目标平台，并冻结真实IRQL边界。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            正式目录坐标
            <select
              className="mt-1 min-h-11 w-full rounded-control border border-border bg-background px-3 py-2 text-sm"
              value={coordinate}
              onChange={(event) => setCoordinate(Number(event.target.value))}
            >
              {model.concepts.map((concept, index) => (
                <option key={`${concept}-${index}`} value={index}>
                  {concept}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-2 sm:grid-cols-3">
            {(Object.keys(TRACKS) as (keyof typeof TRACKS)[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`${controlClass} ${
                  track === key ? "border-primary bg-primary/10" : ""
                }`}
                aria-pressed={track === key}
                onClick={() => setTrack(key)}
              >
                {TRACKS[key].label}
              </button>
            ))}
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {(Object.keys(CONTEXTS) as (keyof typeof CONTEXTS)[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`${controlClass} ${
                  context === key ? "border-primary bg-primary/10" : ""
                }`}
                aria-pressed={context === key}
                onClick={() => setContext(key)}
              >
                {CONTEXTS[key].label}
              </button>
            ))}
          </div>
        </div>

        <article
          className="rounded-card border border-border bg-background p-4"
          aria-live="polite"
        >
          <p className="text-xs text-muted-foreground">
            坐标 {coordinate + 1}/{model.concepts.length}
          </p>
          <h4 className="mt-1 font-semibold text-foreground">
            {model.concepts[coordinate]}
          </h4>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">版本身份</dt>
              <dd className="mt-1 text-foreground">{selectedTrack.identity}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">来源与迁移边界</dt>
              <dd className="mt-1 text-foreground">{selectedTrack.boundary}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                {selectedContext.label}
              </dt>
              <dd className="mt-1 text-foreground">
                {selectedContext.contract}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-card border border-border bg-background p-3 text-sm">
      <span className="flex items-center justify-between gap-3">
        <span className="font-medium text-foreground">{label}</span>
        <output className="font-mono text-primary">
          {value}
          {suffix}
        </output>
      </span>
      <input
        className="mt-3 min-h-11 w-full accent-[var(--primary)]"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function evaluate(
  probe: WindowsKernelEvidenceModel["probe"],
  primary: number,
  secondary: number,
  fault: boolean,
) {
  if (probe === "internals") {
    const threads = primary * secondary;
    const handles = primary * secondary * 16;
    return rows(
      {
        label: "进程 / 线程对象",
        value: `${primary} / ${threads}`,
        note: `${primary}个进程 × 每进程${secondary}线程；PID/TID只在对象生命周期内作为身份线索`,
      },
      {
        label: "句柄表项",
        value: handles.toLocaleString(),
        note: "按每线程16个教学句柄计算；真实句柄属于进程表且必须核对对象类型、访问掩码与引用。",
      },
      {
        label: "地址解释",
        value: fault ? "脱离进程上下文解释用户VA" : "进程 + VA + 页状态",
        note: "同一用户虚拟地址在不同进程中不代表同一映射。",
      },
      "对象管理器、进程、线程、句柄和虚拟内存必须以目标build的公开DDI与调试证据核对，样章中的固定容量是历史说明而非当前承诺。",
    );
  }

  if (probe === "setup") {
    const builds = primary * secondary;
    return rows(
      {
        label: "构建矩阵",
        value: `${builds}个组合`,
        note: `${primary}个目标build × ${secondary}个架构/配置；SDK、WDK、VS与证书另入身份`,
      },
      {
        label: "驱动包工件",
        value: `${builds * 3}项`,
        note: "每个组合至少核对SYS、INF与CAT摘要，不预测构建时长。",
      },
      {
        label: "部署门",
        value: fault ? "签名/目标build/架构不匹配" : "测试签名与隔离目标匹配",
        note: "只在可回滚测试VM或专用测试机部署，生产签名不得用于测试代码。",
      },
      "“能加载”不等于可发布；版本、架构、驱动包隔离、签名、HVCI和卸载结果必须逐项验收。",
    );
  }

  if (probe === "basics") {
    const allocations = primary * secondary;
    const bytes = allocations * 256;
    return rows(
      {
        label: "池分配",
        value: `${allocations}块`,
        note: `${primary}个请求 × ${secondary}块；每块身份、标签、大小、IRQL和释放点都要记录`,
      },
      {
        label: "教学载荷",
        value: `${(bytes / 1024).toFixed(1)} KiB`,
        note: "按每块256字节计算，不等于池开销、碎片或峰值工作集。",
      },
      {
        label: "上下文故障",
        value: fault
          ? "DISPATCH_LEVEL访问可分页内存/阻塞"
          : "IRQL、分页性与分配类型匹配",
        note: "字符串、链表、异常与C++析构都必须沿真实失败路径检查。",
      },
      "内核API的可调用IRQL、分页性、所有权和NTSTATUS是合同；类型安全或RAII不能自动证明内核上下文安全。",
    );
  }

  if (probe === "lifecycle") {
    const requests = primary * secondary;
    return rows(
      {
        label: "客户连接",
        value: primary.toString(),
        note: "每个Create必须与Close、设备对象、访问控制和文件对象身份关联。",
      },
      {
        label: "IOCTL请求",
        value: requests.toLocaleString(),
        note: `${primary}个客户 × ${secondary}次请求；单独记录控制码、输入/输出长度和状态`,
      },
      {
        label: "卸载条件",
        value: fault ? "仍有句柄/请求/符号链接时卸载" : "停止新请求并反向释放",
        note: "清除分发入口、设备对象和符号链接前先证明无在途工作。",
      },
      "DriverEntry成功只是生命周期起点；访问控制、分发、取消、完成、并发关闭和反向清理共同决定正确性。",
    );
  }

  if (probe === "debug") {
    const captures = primary * secondary;
    const rounds = Math.ceil(Math.log2(Math.max(2, captures)));
    return rows(
      {
        label: "转储 / trace捕获",
        value: captures.toLocaleString(),
        note: "每份捕获绑定目标build、符号、驱动摘要、输入、时间和故障编号。",
      },
      {
        label: "二分提示轮次",
        value: rounds.toString(),
        note: `对${captures}个有可靠好坏判定的候选取log2上界；不稳定复现会破坏前提`,
      },
      {
        label: "调试身份",
        value: fault
          ? "符号或宿主/目标build错配"
          : "宿主、目标、符号与转储匹配",
        note: "局部内核调试不能替代可暂停的宿主—目标完整调试。",
      },
      "先取得可重复症状和正确符号，再选择WinDbg、dump、ETW或Verifier；工具输出必须能回到对象与首个分岔。",
    );
  }

  if (probe === "mechanisms") {
    const events = primary * 1000;
    const budgetUs = secondary;
    return rows(
      {
        label: "DPC / 同步事件",
        value: `${events.toLocaleString()}/s`,
        note: "固定事件源、CPU、IRQL和排队策略后记录真实计数。",
      },
      {
        label: "串行预算",
        value: `${((events * budgetUs) / 1000).toFixed(1)} ms/s`,
        note: `${events} × ${budgetUs}µs；未计合并、抢占、并行和调度开销`,
      },
      {
        label: "IRQL故障",
        value: fault ? "高IRQL等待/访问分页代码" : "短路径后移交工作项",
        note: "用调用栈、IRQL、锁集合、DPC队列和完成事件定位首错。",
      },
      "线程优先级与IRQL不是同一轴；DPC、APC、分发器对象、自旋锁和工作项必须按可等待性与执行上下文选择。",
    );
  }

  if (probe === "irp") {
    const irps = primary * 100;
    const locations = irps * secondary;
    const bytes = irps * secondary * 64;
    return rows(
      {
        label: "IRP / 栈位置",
        value: `${irps} / ${locations}`,
        note: `${irps}个IRP × ${secondary}层设备栈；每层只解释自己的IO_STACK_LOCATION`,
      },
      {
        label: "教学缓冲区字节",
        value: `${(bytes / 1024).toFixed(1)} KiB`,
        note: "按每层64字节输入计算；缓冲、直接、Neither方法的所有权与探测规则不同。",
      },
      {
        label: "完成故障",
        value: fault
          ? "双完成/未完成/越界用户缓冲区"
          : "唯一完成且状态/信息一致",
        note: "保存分发、下传、pending、取消和完成例程的对象轨迹。",
      },
      "IRP证据必须连接控制码传输方法、缓冲区、栈位置、pending/取消、完成所有权和最终NTSTATUS。",
    );
  }

  if (probe === "process-callback") {
    const events = primary * 100;
    const capacity = secondary * 64;
    const dropped = Math.max(0, events - capacity);
    return rows(
      {
        label: "进程 / 线程 / 映像事件",
        value: events.toLocaleString(),
        note: "按回调类型、创建/退出方向、PID/TID、时间和驱动注册代次分流。",
      },
      {
        label: "用户态队列容量",
        value: `${capacity}条`,
        note: `${secondary} × 64；队列长度只是教学输入，真实背压要测量`,
      },
      {
        label: "丢弃与卸载",
        value: fault ? `${dropped}条或回调仍注册` : "显式丢弃计数且先注销回调",
        note: "回调快路径不能等待慢用户态；卸载前必须停止新事件并排空引用。",
      },
      "通知回调是观察边界，不是无限事件总线；注册、上下文、队列、丢弃、用户态协议和注销顺序必须闭合。",
    );
  }

  if (probe === "object-registry") {
    const operations = primary * secondary * 10;
    return rows(
      {
        label: "对象 / 注册表操作",
        value: operations.toLocaleString(),
        note: "按对象类型、操作类、进程、desired/granted access或注册表通知类分组。",
      },
      {
        label: "前后回调关联",
        value: `${operations}个关联键`,
        note: "前回调上下文只在合同允许时传给后回调，并记录未发生后回调的路径。",
      },
      {
        label: "策略故障",
        value: fault
          ? "无访问控制的任意内核能力/未注销回调"
          : "最小访问掩码与反向注销",
        note: "不能把示例“保护进程”扩展成绕过系统安全策略的挂钩。",
      },
      "对象和注册表回调必须限制权限、验证输入并保存注册句柄；卸载前用对应注销API结束可达性。",
    );
  }

  if (probe === "minifilter") {
    const callbacks = primary * secondary * 10;
    const messages = primary * secondary;
    return rows(
      {
        label: "操作回调",
        value: callbacks.toLocaleString(),
        note: `${primary}个实例 × ${secondary}类操作 × 10轮；区分pre/post与重入来源`,
      },
      {
        label: "通信端口消息",
        value: messages.toLocaleString(),
        note: "每条消息验证长度、版本、超时、发送方身份和断连清理。",
      },
      {
        label: "过滤器故障",
        value: fault
          ? "伪造高度/名称引用泄漏/上下文未释放"
          : "官方高度与引用闭合",
        note: "Altitude是唯一十进制字符串；文件名、context、callback data均按引用协议管理。",
      },
      "FltMgr的注册、实例、回调、文件名、context、通信端口和卸载是同一生命周期；Filter Verifier用于测试而非生产证明。",
    );
  }

  if (probe === "miscellaneous") {
    const requests = primary * secondary * 10;
    return rows(
      {
        label: "验证请求",
        value: requests.toLocaleString(),
        note: "只对测试驱动或明确设备栈启用适用Verifier规则，并保存设置。",
      },
      {
        label: "驱动包检查",
        value: `${primary * 4}项`,
        note: "按驱动核对INF、CAT/SYS签名、隔离规则和HVCI兼容性。",
      },
      {
        label: "高风险故障",
        value: fault
          ? "全系统Verifier/驱动挂钩/任意内核访问"
          : "最小权限与受支持过滤模型",
        note: "预先准备verifier /reset、重启/恢复环境和目标驱动白名单。",
      },
      "新设计先证明内核驱动确有必要，优先WDF或受支持的Minifilter；挂钩和任意内核读写不能作为当前实践建议。",
    );
  }

  const objects = primary * 10;
  return rows(
    {
      label: "正式坐标样本",
      value: objects.toString(),
      note: "跨章只计对象身份与状态，不把安全、时延和覆盖率混成单分数。",
    },
    {
      label: "证据记录",
      value: `${objects * secondary}条`,
      note: "每对象保存版本、上下文、输入、状态、首个信号与恢复。",
    },
    {
      label: "版本差异",
      value: fault ? "把作者204坐标冒充中文版185坐标" : "19项差异单独登记",
      note: "作者一版、中文版、作者二版和目标平台分别维护来源身份。",
    },
    "全书地图连接185个中文版正式坐标、19项公开目录差异和当前Microsoft证据路由，不生成驱动成熟度或风险综合分。",
  );
}

function ExecutableProbe({ model }: { model: WindowsKernelEvidenceModel }) {
  const [primary, setPrimary] = useState(12);
  const [secondary, setSecondary] = useState(6);
  const [fault, setFault] = useState(false);
  const result = useMemo(
    () => evaluate(model.probe, primary, secondary, fault),
    [fault, model.probe, primary, secondary],
  );

  function reset() {
    setPrimary(12);
    setSecondary(6);
    setFault(false);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="windows-kernel-executable-probe"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            可执行对象与状态探针
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            调整小输入并切换唯一故障；公式、单位和未覆盖边界始终可见。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <RangeControl
          label="主输入 n"
          value={primary}
          min={2}
          max={64}
          suffix=""
          onChange={setPrimary}
        />
        <RangeControl
          label="次输入 k"
          value={secondary}
          min={1}
          max={32}
          suffix=""
          onChange={setSecondary}
        />
      </div>
      <button
        type="button"
        className={`${controlClass} mt-3 w-full ${
          fault ? "border-primary bg-primary/10" : ""
        }`}
        aria-pressed={fault}
        onClick={() => setFault((value) => !value)}
      >
        {fault ? "单故障已启用" : "切换到单故障"}
      </button>

      <div className="mt-4 grid gap-3 lg:grid-cols-3" aria-live="polite">
        {result.rows.map((row) => (
          <article
            key={row.label}
            className="rounded-card border border-border bg-background p-4"
          >
            <p className="text-xs text-muted-foreground">{row.label}</p>
            <p className="mt-1 break-words font-mono text-base font-semibold text-primary">
              {row.value}
            </p>
            <p className="mt-2 text-sm text-foreground">{row.note}</p>
          </article>
        ))}
      </div>
      <p className="mt-4 rounded-card border border-border bg-background p-3 text-sm text-foreground">
        <span className="font-semibold">裁决：</span>
        {result.verdict}
      </p>
    </section>
  );
}

function SafetyGate({ model }: { model: WindowsKernelEvidenceModel }) {
  const [trace, setTrace] = useState<"baseline" | "fault" | "recovery">(
    "baseline",
  );
  const [stage, setStage] = useState(0);
  const [checked, setChecked] = useState<boolean[]>(() =>
    model.gates.map(() => false),
  );
  const selected = model.stages[stage] ?? model.stages[0];

  function reset() {
    setTrace("baseline");
    setStage(0);
    setChecked(model.gates.map(() => false));
  }

  function toggleGate(index: number) {
    setChecked((previous) =>
      previous.map((value, itemIndex) =>
        itemIndex === index ? !value : value,
      ),
    );
  }

  const traceText =
    trace === "baseline"
      ? `对象：${selected?.object}。唯一控制：${selected?.control}。应见信号：${selected?.signal}。回退：${selected?.rollback}`
      : trace === "fault"
        ? `只注入“${model.fault}”。从“${selected?.label}”开始保存首个状态、IRQL、CPU、线程、时间和调用链分岔。`
        : `撤销唯一故障并执行“${selected?.rollback}”，在相同Windows build、WDK、驱动包、VM和输入上重放“${selected?.label}”；必须恢复“${model.invariant}”。`;

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="windows-kernel-safety-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            基线—单故障—恢复安全门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            驱动只在可丢弃VM或专用测试机执行；预备快照、调试宿主、转储、超时和恢复启动。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(["baseline", "fault", "recovery"] as const).map((item) => (
          <button
            key={item}
            type="button"
            className={`${controlClass} ${
              trace === item ? "border-primary bg-primary/10" : ""
            }`}
            aria-pressed={trace === item}
            onClick={() => setTrace(item)}
          >
            {item === "baseline"
              ? "签名参考基线"
              : item === "fault"
                ? "单故障轨迹"
                : "撤销后重放"}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="space-y-2">
          {model.stages.map((item, index) => (
            <button
              key={`${item.label}-${index}`}
              type="button"
              className={`${controlClass} w-full ${
                stage === index ? "border-primary bg-primary/10" : ""
              }`}
              aria-pressed={stage === index}
              onClick={() => setStage(index)}
            >
              <span className="mr-2 font-mono text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </button>
          ))}
        </div>
        <article
          className="rounded-card border border-border bg-background p-4"
          aria-live="polite"
        >
          <p className="text-xs text-muted-foreground">当前安全协议</p>
          <h4 className="mt-1 font-semibold text-foreground">
            {selected?.label}
          </h4>
          <p className="mt-3 text-sm text-foreground">{traceText}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            交付工件：{model.artifact}
          </p>
        </article>
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold text-foreground">
          执行前逐项核对
        </legend>
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          {model.gates.map((gate, index) => (
            <label
              key={gate.label}
              className="flex cursor-pointer gap-3 rounded-card border border-border bg-background p-3"
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--primary)]"
                checked={checked[index] ?? false}
                onChange={() => toggleGate(index)}
              />
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {gate.label}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {gate.detail}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </section>
  );
}

export function WindowsKernelEvidenceLab({ model, view }: Props) {
  if (view === "version-context") return <VersionContext model={model} />;
  if (view === "executable-probe") return <ExecutableProbe model={model} />;
  return <SafetyGate model={model} />;
}
