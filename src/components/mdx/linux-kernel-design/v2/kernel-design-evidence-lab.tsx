"use client";

import { useMemo, useState } from "react";

export type KernelDesignEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  probe:
    | "cross"
    | "identity"
    | "build"
    | "process"
    | "scheduler"
    | "syscall"
    | "structure"
    | "interrupt"
    | "deferred"
    | "race"
    | "locking"
    | "time"
    | "allocator"
    | "vfs"
    | "block"
    | "vma"
    | "writeback"
    | "device"
    | "debug"
    | "portability"
    | "patch";
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
  model: KernelDesignEvidenceModel;
  view: "object-version" | "executable-probe" | "trace-gate";
};

const controlClass =
  "min-h-11 rounded-control border border-border bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button type="button" className={controlClass} onClick={onReset}>
      重置本实验
    </button>
  );
}

const TRACKS = {
  book: {
    label: "2.6.34成书轨",
    identity:
      "原书第3版明确面向Linux 2.6系列；对象名和算法必须放回该源码快照解释。",
    boundary:
      "出版社目录与授权样章支持版本、结构和局部正文核对，不支持复制未开放章节。",
  },
  upstream: {
    label: "当前上游轨",
    identity:
      "当前实验以实际检出的uname -r、源码提交、.config、架构与工具版本为身份。",
    boundary:
      "上游文档和目标源码核对现状；同名对象可能变义，旧对象也可能已被替换或删除。",
  },
  distro: {
    label: "发行版内核轨",
    identity:
      "发行版构建还带补丁集、配置、编译器、签名、模块与支持策略，不能只写主线版本号。",
    boundary:
      "发行版行为只能由该构建、配置和符号支持，不能无证据推广到主线或其他发行版。",
  },
} as const;

const CONTEXTS = {
  process: {
    label: "进程上下文",
    contract:
      "允许睡眠与否、抢占状态、持锁集合、地址空间和调用者身份必须逐项记录。",
  },
  atomic: {
    label: "原子上下文",
    contract: "不能睡眠的约束、IRQ/softirq状态、栈预算和可用分配标志必须显式。",
  },
  user: {
    label: "用户—内核边界",
    contract:
      "用户指针、访问权限、长度、复制结果、返回值和失败码必须完整验证。",
  },
} as const;

function ObjectVersion({ model }: { model: KernelDesignEvidenceModel }) {
  const [coordinate, setCoordinate] = useState(0);
  const [track, setTrack] = useState<keyof typeof TRACKS>("book");
  const [context, setContext] = useState<keyof typeof CONTEXTS>("process");

  function reset() {
    setCoordinate(0);
    setTrack("book");
    setContext("process");
  }

  const selectedTrack = TRACKS[track];
  const selectedContext = CONTEXTS[context];

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="kernel-design-object-version"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            对象—版本—执行上下文合同
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            先选正式坐标，再冻结源码时代和执行上下文；接口名本身不是机制证据。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
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
                className={`${controlClass} ${track === key ? "border-primary bg-primary/10" : ""}`}
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
                className={`${controlClass} ${context === key ? "border-primary bg-primary/10" : ""}`}
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
              <dt className="text-xs text-muted-foreground">源码身份</dt>
              <dd className="mt-1 text-foreground">{selectedTrack.identity}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">迁移边界</dt>
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

type ResultRow = { label: string; value: string; note: string };

function rows(
  first: ResultRow,
  second: ResultRow,
  third: ResultRow,
  verdict: string,
) {
  return { rows: [first, second, third], verdict };
}

function evaluate(
  probe: KernelDesignEvidenceModel["probe"],
  primary: number,
  secondary: number,
  fault: boolean,
) {
  if (probe === "process") {
    const pages = primary * 128;
    const written = Math.min(pages, secondary * 16);
    return rows(
      {
        label: "fork后共享页",
        value: `${pages - written}`,
        note: `${pages}页中${written}页首次写入；只计教学模型中的COW数据页`,
      },
      {
        label: "COW复制页",
        value: `${written}页`,
        note: `按4 KiB页为${(written * 4) / 1024} MiB；实际还受大页、映射与引用影响`,
      },
      {
        label: "故障状态",
        value: fault ? "父子页身份错误共享写" : "写时分离",
        note: "用页表、缺页和内容摘要验证，不用RSS单值代替对象轨迹。",
      },
      "进程证据必须连接task、mm、VMA、页表、引用和退出回收；旧task_struct字段不能直接套到当前源码。",
    );
  }

  if (probe === "scheduler") {
    const weightA = primary;
    const weightB = secondary;
    const total = weightA + weightB;
    return rows(
      {
        label: "任务A理想份额",
        value: `${((weightA / total) * 100).toFixed(1)}%`,
        note: `${weightA}/(${weightA}+${weightB})；只是冻结权重下的代数份额`,
      },
      {
        label: "任务B理想份额",
        value: `${((weightB / total) * 100).toFixed(1)}%`,
        note: "实际调度还受可运行状态、CPU拓扑、类、迁移与内核配置影响",
      },
      {
        label: "注入条件",
        value: fault ? "任务B周期睡眠/唤醒" : "两任务持续可运行",
        note: "用sched tracepoint重放enqueue、pick、switch与wakeup。",
      },
      "份额公式不是调度器实测；当前调度类和数据结构必须从目标源码与tracepoint重新确认。",
    );
  }

  if (probe === "syscall") {
    const calls = primary * 1000;
    const bytes = calls * secondary;
    return rows(
      {
        label: "调用次数",
        value: calls.toLocaleString(),
        note: "固定系统调用号、参数形状和返回路径后再比较。",
      },
      {
        label: "用户边界字节",
        value: `${(bytes / 1024).toFixed(1)} KiB`,
        note: `${calls}次 × ${secondary}字节；不等于实际cache或总线流量`,
      },
      {
        label: "错误参数",
        value: fault ? "越界用户指针/长度" : "可访问缓冲区",
        note: "必须验证访问、部分复制、错误码与无副作用失败。",
      },
      "系统调用证据以ABI、参数验证、返回值和目标架构入口为准；微基准不能替代语义正确性。",
    );
  }

  if (probe === "structure") {
    const items = primary * 100;
    return rows(
      {
        label: "链表最坏遍历",
        value: `${items}个节点`,
        note: "仅在从头线性查找且无额外索引的模型成立。",
      },
      {
        label: "平衡树高度上界",
        value: `${Math.ceil(Math.log2(items + 1))}`,
        note: "是理想平衡结构的数量级提示，不证明具体内核容器布局。",
      },
      {
        label: "故障不变量",
        value: fault ? "重复插入/断链" : "唯一成员/闭环正确",
        note: "遍历前后核对成员集合、引用与并发保护。",
      },
      "容器选择由查找、插删、排序、并发和生命周期共同决定；书中idr/radix tree要与当前xarray/maple tree显式迁移。",
    );
  }

  if (probe === "interrupt" || probe === "deferred") {
    const events = primary * 1000;
    const budgetUs = secondary;
    const cpuMs = (events * budgetUs) / 1000;
    return rows(
      {
        label: "事件频率",
        value: `${events.toLocaleString()}/s`,
        note: "以固定IRQ或工作项来源记录实际事件计数。",
      },
      {
        label: "串行预算占用",
        value: `${cpuMs.toFixed(1)} ms/s`,
        note: `${events} × ${budgetUs}µs；未考虑并行、合并和调度开销`,
      },
      {
        label: "故障路径",
        value: fault ? "在原子上下文睡眠/队列积压" : "快路径确认后推后工作",
        note: "用irq/softirq/workqueue tracepoint定位上下文和延迟。",
      },
      "上半部、softirq、tasklet和workqueue必须按当前目标构建核对；历史机制不自动等于当前建议。",
    );
  }

  if (probe === "race" || probe === "locking") {
    const actors = Math.max(2, Math.min(8, secondary));
    const pairs = (actors * (actors - 1)) / 2;
    return rows(
      {
        label: "并发执行者",
        value: actors.toString(),
        note: "线程、CPU、IRQ或推后工作必须按真实上下文区分。",
      },
      {
        label: "两两冲突关系",
        value: pairs.toString(),
        note: `n(n-1)/2；只是待检查关系数，不是所有交错数量`,
      },
      {
        label: "锁序故障",
        value: fault ? "A→B与B→A形成环" : "单一全序",
        note: "用lockdep、KCSAN/适用调试器和状态轨迹验证。",
      },
      "锁保护数据而非代码行；睡眠性、IRQ状态、PREEMPT_RT语义和内存序都绑定目标配置。",
    );
  }

  if (probe === "time") {
    const hz = primary * 10;
    const ticks = secondary * hz;
    return rows(
      {
        label: "节拍间隔",
        value: `${(1000 / hz).toFixed(3)} ms`,
        note: `1000/${hz}；目标内核可能使用无节拍与高精度定时器`,
      },
      {
        label: "逻辑时长",
        value: `${ticks} ticks`,
        note: `${secondary}秒 × ${hz} Hz；比较必须使用回绕安全接口`,
      },
      {
        label: "故障计时",
        value: fault ? "直接比较回绕计数" : "使用内核时间比较约定",
        note: "时钟源、clockevent、ktime与定时器类型要从目标构建确认。",
      },
      "jiffies教学有助于理解历史轨，但当前计时结论不能忽略高精度定时器、NO_HZ和时钟源。",
    );
  }

  if (probe === "allocator") {
    const bytes = primary * 1024;
    const pages = Math.ceil(bytes / 4096);
    const order = Math.ceil(Math.log2(Math.max(1, pages)));
    return rows(
      {
        label: "请求字节",
        value: `${bytes / 1024} KiB`,
        note: "先声明物理连续、虚拟连续、睡眠和回收约束。",
      },
      {
        label: "4 KiB页与最小order",
        value: `${pages}页 / order ${order}`,
        note: "只按基础页和2^order块计算；实际页大小与分配器状态另计",
      },
      {
        label: "故障上下文",
        value: fault ? "原子上下文使用可睡眠分配" : "标志与上下文匹配",
        note: "保存GFP标志、NUMA节点、失败路径和释放身份。",
      },
      "kmalloc、vmalloc、slab与per-CPU接口按连续性、生命周期和上下文选择；目标源码决定当前接口。",
    );
  }

  if (probe === "vfs") {
    const depth = primary;
    const lookups = secondary * depth;
    return rows(
      {
        label: "路径分量",
        value: depth.toString(),
        note: "每个分量涉及dentry/inode与挂载边界，缓存命中另记录。",
      },
      {
        label: "重复路径查询",
        value: `${lookups}次分量访问`,
        note: `${secondary}轮 × ${depth}分量；不等于底层I/O次数`,
      },
      {
        label: "故障对象",
        value: fault ? "负dentry/并发重命名" : "稳定挂载与对象引用",
        note: "保存路径解析、引用、锁和最终inode身份。",
      },
      "VFS对象关系必须由目标源码、文件系统锁规则和tracepoint核对；缓存命中不能证明磁盘未访问。",
    );
  }

  if (probe === "block") {
    const requests = primary;
    const sectors = secondary * 8;
    return rows(
      {
        label: "队列请求",
        value: requests.toString(),
        note: "记录设备、队列、调度器、操作类型和提交CPU。",
      },
      {
        label: "请求载荷",
        value: `${(requests * sectors) / 2048} MiB`,
        note: `${requests} × ${sectors}个512字节扇区；不含元数据与放大`,
      },
      {
        label: "故障形态",
        value: fault ? "超时/重排/部分完成" : "顺序完成基线",
        note: "用block tracepoint连接bio、request、发出与完成。",
      },
      "书中的旧I/O调度器是历史坐标；当前blk-mq、设备类型和目标队列配置必须单独确认。",
    );
  }

  if (probe === "vma") {
    const regions = primary;
    const pages = regions * secondary;
    return rows(
      {
        label: "VMA数量",
        value: regions.toString(),
        note: "每个区域记录范围、权限、文件映射与mm身份。",
      },
      {
        label: "映射基础页",
        value: `${pages}页`,
        note: `${regions}个VMA × ${secondary}页；不含页表层级和大页折叠`,
      },
      {
        label: "结构迁移",
        value: fault ? "仍假定红黑树/链表唯一表示" : "从目标源码检查maple tree",
        note: "对象语义与索引结构分开，锁序按当前mm文档。",
      },
      "mm/VMA语义可延续，但查找结构和锁已经演进；历史find_vma讲法不能静默覆盖当前实现。",
    );
  }

  if (probe === "writeback") {
    const dirtyMiB = primary * 16;
    const rate = secondary * 8;
    return rows(
      {
        label: "脏数据",
        value: `${dirtyMiB} MiB`,
        note: "记录页/folio、mapping、cgroup、设备和写入来源。",
      },
      {
        label: "理想排空时间",
        value: `${(dirtyMiB / rate).toFixed(2)} s`,
        note: `${dirtyMiB}/${rate} MiB/s；未计节流、队列、合并与设备尾延迟`,
      },
      {
        label: "故障压力",
        value: fault ? "写回速率低于持续脏化速率" : "停止脏化后排空",
        note: "用writeback与block事件连接产生、节流、提交和完成。",
      },
      "page cache对象和回写线程已演进；基树、旧flusher名字只保留历史轨，当前使用folio/xarray等需查目标源码。",
    );
  }

  if (probe === "device") {
    const objects = primary * 10;
    return rows(
      {
        label: "设备对象",
        value: objects.toString(),
        note: "保存bus、device、driver、kobject、模块与父子关系。",
      },
      {
        label: "引用操作",
        value: `${objects * secondary}次`,
        note: `${objects}对象 × ${secondary}轮获取/释放；最终引用必须回到基线`,
      },
      {
        label: "卸载故障",
        value: fault ? "对象仍可达时卸载模块" : "停止新引用后反向释放",
        note: "核对sysfs、uevent、模块状态和release回调。",
      },
      "设备模型证据是对象图与生命周期；Hello模块成功加载不证明并发卸载安全。",
    );
  }

  if (probe === "debug") {
    const commits = primary * 100;
    return rows(
      {
        label: "候选提交",
        value: commits.toLocaleString(),
        note: "先有可重复好/坏判定与干净构建环境。",
      },
      {
        label: "二分最少轮次",
        value: `${Math.ceil(Math.log2(commits))}`,
        note: "按每轮可靠二分计算；跳过提交与不稳定测试会增加不确定性",
      },
      {
        label: "故障判定",
        value: fault ? "测试随机通过/失败" : "确定性退出码与工件",
        note: "oops、符号、配置、日志、trace和转储与提交身份绑定。",
      },
      "printk、oops、kgdb、ftrace、BPF和sanitizer各回答不同问题；先冻结可重复症状再选工具。",
    );
  }

  if (probe === "portability") {
    const fields = primary;
    const wordBytes = fault ? 4 : 8;
    const raw = fields * secondary;
    const aligned = Math.ceil(raw / wordBytes) * wordBytes;
    return rows(
      {
        label: "字段原始字节",
        value: raw.toString(),
        note: `${fields}字段 × ${secondary}字节；尚未含ABI填充`,
      },
      {
        label: "按字长对齐",
        value: `${aligned}字节`,
        note: `向${wordBytes}字节边界取整；真实布局由架构ABI和字段顺序决定`,
      },
      {
        label: "跨架构故障",
        value: fault ? "32位/大端/非对齐假设破坏" : "显式宽度与字节序转换",
        note: "用多架构构建、静态断言与二进制夹具验证。",
      },
      "可移植性不能靠类型名字猜测；字宽、对齐、字节序、页大小、内存序和配置都需矩阵验证。",
    );
  }

  if (probe === "patch") {
    const changed = primary * 10;
    const reviewers = secondary;
    return rows(
      {
        label: "变更行",
        value: changed.toString(),
        note: "补丁按一个逻辑变化拆分，生成基线和目标提交明确。",
      },
      {
        label: "审阅路径",
        value: `${reviewers}位维护者/审阅者`,
        note: "由MAINTAINERS与get_maintainer.pl候选核对，不是群发数量目标。",
      },
      {
        label: "故障提交",
        value: fault
          ? "混入格式化/无证据性能主张"
          : "编译测试说明与版本历史完整",
        note: "checkpatch不是正确性证明；CI与人工审阅共同留下工件。",
      },
      "当前补丁流程以Documentation/process和子系统规则为准；书中邮件文化保留历史价值但命令模板需更新。",
    );
  }

  if (probe === "build" || probe === "identity") {
    const configs = primary;
    const architectures = secondary;
    return rows(
      {
        label: "构建矩阵",
        value: `${configs * architectures}个组合`,
        note: `${configs}份配置 × ${architectures}个架构；编译器与提交另入身份`,
      },
      {
        label: "并行作业",
        value: `${primary}个`,
        note: "只表示make作业上限，不预测构建时间或峰值内存。",
      },
      {
        label: "故障身份",
        value: fault
          ? "复用旧.config且不记录olddefconfig差分"
          : "提交、配置、工具链和工件摘要完整",
        note: "安装必须在可恢复测试机/虚拟机，保留旧内核启动项。",
      },
      "源码、提交、配置、工具链和工件摘要缺一不可；“能启动”不等于目标子系统正确。",
    );
  }

  const objects = primary * 10;
  return rows(
    {
      label: "正式对象样本",
      value: objects.toString(),
      note: "跨章只计对象身份，不混合延迟、内存和正确性为单分数。",
    },
    {
      label: "事件记录",
      value: `${objects * secondary}条`,
      note: "每对象保存输入、状态、控制、首个信号与恢复。",
    },
    {
      label: "迁移故障",
      value: fault ? "把2.6.34字段直接套到当前构建" : "历史/当前显式差分",
      note: "所有当前结论回到目标源码、配置和上游文档。",
    },
    "全书地图连接404个坐标和证据路由，不生成内核成熟度分或跨子系统性能排名。",
  );
}

function ExecutableProbe({ model }: { model: KernelDesignEvidenceModel }) {
  const [primary, setPrimary] = useState(16);
  const [secondary, setSecondary] = useState(8);
  const [fault, setFault] = useState(false);
  const result = useMemo(
    () => evaluate(model.probe, primary, secondary, fault),
    [fault, model.probe, primary, secondary],
  );

  function reset() {
    setPrimary(16);
    setSecondary(8);
    setFault(false);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="kernel-design-executable-probe"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            可执行计数与状态探针
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            调整小规模输入并注入单故障；结果公开公式、单位和未覆盖边界。
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
        className={`${controlClass} mt-3 w-full ${fault ? "border-primary bg-primary/10" : ""}`}
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

function TraceGate({ model }: { model: KernelDesignEvidenceModel }) {
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
        ? `只注入“${model.fault}”。从“${selected?.label}”开始保存首个状态分岔、上下文、CPU、时间和调用链。`
        : `撤销唯一故障并执行“${selected?.rollback}”，在相同源码、配置、机器和负载上重放“${selected?.label}”；必须恢复“${model.invariant}”。`;

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="kernel-design-trace-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            基线—单故障—恢复轨迹
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            内核实验只在可丢弃虚拟机或专用测试机执行，并预先准备控制台、超时与快照。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(["baseline", "fault", "recovery"] as const).map((item) => (
          <button
            key={item}
            type="button"
            className={`${controlClass} ${trace === item ? "border-primary bg-primary/10" : ""}`}
            aria-pressed={trace === item}
            onClick={() => setTrace(item)}
          >
            {item === "baseline"
              ? "参考构建基线"
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
              className={`${controlClass} w-full ${stage === index ? "border-primary bg-primary/10" : ""}`}
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
          <p className="text-xs text-muted-foreground">当前轨迹协议</p>
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
          发布前逐项核对
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

export function KernelDesignEvidenceLab({ model, view }: Props) {
  if (view === "object-version") return <ObjectVersion model={model} />;
  if (view === "executable-probe") return <ExecutableProbe model={model} />;
  return <TraceGate model={model} />;
}
