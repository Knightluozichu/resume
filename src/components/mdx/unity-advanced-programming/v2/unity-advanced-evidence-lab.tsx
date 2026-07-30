"use client";

import { useMemo, useState } from "react";

export type UnityAdvancedEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  experiment:
    | "cross"
    | "language"
    | "architecture"
    | "data"
    | "ui"
    | "assets"
    | "network"
    | "rendering"
    | "ai"
    | "navigation";
  stages: readonly {
    label: string;
    input: string;
    action: string;
    signal: string;
    check: string;
  }[];
  gates: readonly { label: string; detail: string }[];
};

type Props = {
  model: UnityAdvancedEvidenceModel;
  view: "version-contract" | "budget-workbench" | "capture-gate";
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
  index: {
    label: "保存索引轨",
    identity:
      "第三方保存索引只能核对第1—8章与第10章的48个不重复主题；它不是作者授权正文。",
    boundary:
      "保留旧标题、缺失第9章和索引错号，不从标题臆造作者代码、结论或性能数据。",
  },
  historical: {
    label: "历史机制轨",
    identity:
      "NGUI、早期uGUI、Projector及旧资源工作流按连载时代的问题意识解释。",
    boundary:
      "历史机制用于理解迁移约束；接口、默认值和推荐方案必须重新核对目标版本。",
  },
  current: {
    label: "Unity 6.3轨",
    identity:
      "当前轨冻结Unity 6.3 LTS、具体包版本、渲染管线、脚本后端、平台与Player构建。",
    boundary: "当前官方资料支持新陈述，但不能倒写成原作者观点或连载年代事实。",
  },
} as const;

const PLATFORMS = {
  desktop: {
    label: "桌面Player",
    contract: "记录操作系统、GPU与驱动、图形API、分辨率、质量级别和脚本后端。",
  },
  mobile: {
    label: "移动设备Player",
    contract:
      "记录机型、SoC、系统、热状态、电源模式、图形API和真实屏幕分辨率。",
  },
  web: {
    label: "Web Player",
    contract:
      "记录浏览器、WebGL/WebGPU路径、内存上限、网络条件与发布构建配置。",
  },
} as const;

function VersionContract({ model }: { model: UnityAdvancedEvidenceModel }) {
  const [coordinate, setCoordinate] = useState(0);
  const [track, setTrack] = useState<keyof typeof TRACKS>("index");
  const [platform, setPlatform] = useState<keyof typeof PLATFORMS>("desktop");

  function reset() {
    setCoordinate(0);
    setTrack("index");
    setPlatform("desktop");
  }

  const selectedTrack = TRACKS[track];
  const selectedPlatform = PLATFORMS[platform];

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="unity-advanced-version-contract"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            来源—版本—执行环境合同
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            先选正式坐标和时间轨，再冻结真正承载结论的Player环境。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            正式连载坐标
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
            {(Object.keys(PLATFORMS) as (keyof typeof PLATFORMS)[]).map(
              (key) => (
                <button
                  key={key}
                  type="button"
                  className={`${controlClass} ${platform === key ? "border-primary bg-primary/10" : ""}`}
                  aria-pressed={platform === key}
                  onClick={() => setPlatform(key)}
                >
                  {PLATFORMS[key].label}
                </button>
              ),
            )}
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
              <dt className="text-xs text-muted-foreground">来源身份</dt>
              <dd className="mt-1 text-foreground">{selectedTrack.identity}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">时代边界</dt>
              <dd className="mt-1 text-foreground">{selectedTrack.boundary}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                {selectedPlatform.label}捕获合同
              </dt>
              <dd className="mt-1 text-foreground">
                {selectedPlatform.contract}
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
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
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
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

type ResultRow = { label: string; value: string; note: string };

function listGrowth(count: number, initialCapacity: number) {
  let capacity = Math.max(1, initialCapacity);
  let reallocations = 0;
  let copiedElements = 0;
  while (capacity < count) {
    copiedElements += capacity;
    capacity *= 2;
    reallocations += 1;
  }
  return { capacity, reallocations, copiedElements };
}

function evaluate(
  experiment: UnityAdvancedEvidenceModel["experiment"],
  load: number,
  secondary: number,
  fault: boolean,
): { rows: ResultRow[]; verdict: string } {
  if (experiment === "language") {
    const count = load * 100;
    const growth = listGrowth(count, secondary);
    const rounded = Math.fround(0.1 + (fault ? 0.7 : 0.2));
    return {
      rows: [
        {
          label: "List扩容轨迹",
          value: `${growth.reallocations} 次重分配`,
          note: `${count}个元素、初始容量${secondary}，累计复制${growth.copiedElements}个旧元素，最终容量${growth.capacity}`,
        },
        {
          label: "折半查找上界",
          value: `${Math.ceil(Math.log2(Math.max(2, count)))} 次比较`,
          note: "只对已排序且可随机访问的数据成立；计数是声明模型的上界。",
        },
        {
          label: "float32实际舍入",
          value: rounded.toPrecision(9),
          note: `Math.fround模拟单精度存储；十进制期望值为${fault ? "0.8" : "0.3"}。`,
        },
      ],
      verdict:
        "容量复制、比较上界和float32舍入来自可复算步骤；真实分配字节与耗时仍须在目标Player采集。",
    };
  }

  if (experiment === "architecture") {
    const modules = load;
    const directEdges = (modules * (modules - 1)) / 2;
    const boundaryEdges = modules + secondary;
    return {
      rows: [
        {
          label: "全互连依赖边",
          value: directEdges.toString(),
          note: `${modules}个模块两两直接依赖时的无向边数 n(n-1)/2`,
        },
        {
          label: "端口化边界边",
          value: boundaryEdges.toString(),
          note: `${modules}个模块各连一个端口，另有${secondary}条适配器边`,
        },
        {
          label: "故障传播入口",
          value: fault ? `${modules - 1} 个直接邻居` : "1 个显式端口",
          note: "这是给定依赖图的可达入口计数，不是架构成熟度评分。",
        },
      ],
      verdict:
        "架构裁决基于实际依赖边、生命周期所有者和可替换端口；目录层数本身不构成证据。",
    };
  }

  if (experiment === "data") {
    const records = load * 1000;
    const languages = secondary;
    const payload = records * (48 + languages * 24);
    return {
      rows: [
        {
          label: "字段载荷估算",
          value: `${(payload / 1024 / 1024).toFixed(2)} MiB`,
          note: `${records}条记录，每条固定48字节并含${languages}个24字节本地化引用；不含对象头和索引`,
        },
        {
          label: "本地化键检查",
          value: `${records * languages} 个单元`,
          note: "构建前逐键核对缺失、重复、占位符集合与回退链。",
        },
        {
          label: "故障输入",
          value: fault ? "重复主键 + 缺失回退" : "唯一主键 + 完整回退",
          note: "失败必须在导入/构建阶段被拒绝，不能拖到运行时随机覆盖。",
        },
      ],
      verdict:
        "字节账本是显式假设下的估算；Player中的托管堆、原生内存与压缩结果必须另测。",
    };
  }

  if (experiment === "ui") {
    const elements = load * 100;
    const dirty = Math.min(elements, secondary * 10);
    const vertices = dirty * 4;
    return {
      rows: [
        {
          label: "测试元素",
          value: elements.toString(),
          note: "固定层级与控件类型后才可比较uGUI和UI Toolkit捕获。",
        },
        {
          label: "脏元素重建规模",
          value: `${dirty} 个 / ${vertices} 顶点`,
          note: "按每个矩形4顶点的教学模型；不冒充Canvas或UI Renderer实测。",
        },
        {
          label: "生命周期故障",
          value: fault ? "重复订阅，关闭后仍接收事件" : "启用订阅，禁用注销",
          note: "用订阅计数和关闭后回调断言定位泄漏，而非只看页面是否消失。",
        },
      ],
      verdict:
        "Unity 6.3的UI选择按运行时/编辑器、世界空间、动画与材质需求决定；性能结论需目标Player捕获。",
    };
  }

  if (experiment === "assets") {
    const edge = load * 64;
    const mipFactor = fault ? 1 : 4 / 3;
    const bytes = edge * edge * 4 * mipFactor * secondary;
    return {
      rows: [
        {
          label: "纹理驻留估算",
          value: `${(bytes / 1024 / 1024).toFixed(2)} MiB`,
          note: `${edge}² RGBA8 × ${secondary}份驻留 × mip系数${mipFactor.toFixed(2)}；未计压缩、对齐和流送`,
        },
        {
          label: "Addressables句柄",
          value: fault
            ? `${secondary}次加载 / 0次释放`
            : `${secondary}次加载 / ${secondary}次释放`,
          note: "加载与Release必须成对；引用计数归零只表示资源可卸载。",
        },
        {
          label: "变换验证点",
          value: `${load}个层级样本`,
          note: "保存局部/世界矩阵、骨骼根、缩放和边界盒，不用视觉近似代替数值断言。",
        },
      ],
      verdict:
        "资源账本只提供可复算上界；实际bundle依赖、原生内存和卸载时机由Addressables工具与Memory Profiler捕获。",
    };
  }

  if (experiment === "network") {
    const tick = load;
    const entities = secondary * 10;
    const payloadPerSecond = tick * entities * 48;
    const packetsPerSecond = tick * Math.ceil(entities / 20);
    const overhead = packetsPerSecond * 28;
    return {
      rows: [
        {
          label: "状态载荷",
          value: `${(payloadPerSecond / 1024).toFixed(1)} KiB/s`,
          note: `${tick} tick/s × ${entities}实体 × 48字节；尚未压缩`,
        },
        {
          label: "IPv4+UDP头账本",
          value: `${(overhead / 1024).toFixed(1)} KiB/s`,
          note: `每包20个实体，${packetsPerSecond}包/s × 28字节；实际链路还有额外开销`,
        },
        {
          label: "故障计划",
          value: fault ? "丢包、乱序、重复与延迟" : "顺序送达基线",
          note: "协议必须用序号、确认、超时、幂等或权威快照显式处理适用故障。",
        },
      ],
      verdict:
        "TCP、UDP和HTTP按消息语义与故障模型选择；本账本不把UDP等同低延迟，也不把TCP等同消息边界。",
    };
  }

  if (experiment === "rendering") {
    const targetFps = load;
    const frameBudget = 1000 / targetFps;
    const cpu = 2 + secondary * 0.08;
    const gpu = 3 + secondary * (fault ? 0.12 : 0.06);
    return {
      rows: [
        {
          label: "帧预算",
          value: `${frameBudget.toFixed(2)} ms`,
          note: `1000/${targetFps}；预算不是测得帧时`,
        },
        {
          label: "场景代数模型",
          value: `CPU ${cpu.toFixed(2)} / GPU ${gpu.toFixed(2)} ms`,
          note: `${secondary}个批次参数；系数仅用于演示瓶颈切换，不支持设备性能结论`,
        },
        {
          label: "预算余量",
          value: `${(frameBudget - Math.max(cpu, gpu)).toFixed(2)} ms`,
          note: "按CPU/GPU可重叠的简化上界；真实同步、渲染线程与present必须看Profiler和GPU捕获。",
        },
      ],
      verdict:
        "Built-in、URP、HDRP与Projector迁移按功能、平台和Shader兼容性裁决；只有目标Player/GPU捕获能签发性能。",
    };
  }

  if (experiment === "ai") {
    const agents = load;
    const decisions = secondary;
    const evaluations = agents * decisions * (fault ? 24 : 8);
    return {
      rows: [
        {
          label: "决策节点求值",
          value: `${evaluations}/s`,
          note: `${agents}个Agent × ${decisions}次决策/s × ${fault ? 24 : 8}节点`,
        },
        {
          label: "状态记录",
          value: `${agents * decisions}条/s`,
          note: "每次决策保存感知输入、旧状态、选择分支、动作与中断原因。",
        },
        {
          label: "故障树",
          value: fault
            ? "条件永真导致高优先级分支饿死其余行为"
            : "互斥条件 + 明确中断",
          note: "随机性必须带种子；不能用自然表现掩盖不可回放状态。",
        },
      ],
      verdict:
        "FSM、行为树和其他方案按状态组合、并发、中断与调试需求选择；节点数不生成“智能程度”分数。",
    };
  }

  if (experiment === "navigation") {
    const width = load;
    const cells = width * width;
    const blocked = Math.floor((cells * secondary) / 100);
    return {
      rows: [
        {
          label: "规则网格",
          value: `${width}×${width} = ${cells}格`,
          note: `${secondary}%障碍时约${blocked}格不可通行；实际连通性取决于空间分布`,
        },
        {
          label: "A*候选上界",
          value: `${cells - blocked}个可通行格`,
          note: "只是有限网格的候选集合上界，不是扩展节点实测；启发式和地图结构会改变轨迹。",
        },
        {
          label: "动态故障",
          value: fault ? "路径提交后障碍改变" : "静态NavMesh/网格基线",
          note: "版本化地图、重规划条件和不可达结果必须进入协议。",
        },
      ],
      verdict:
        "A*正确性、NavMesh生成、编辑器数据与运行预算分开验收；AI Navigation包版本和Agent参数必须入档。",
    };
  }

  const frameBudget = 1000 / load;
  const bandwidth = load * secondary * 48;
  const textureBytes = secondary * 1024 * 1024 * 4;
  return {
    rows: [
      {
        label: "帧预算",
        value: `${frameBudget.toFixed(2)} ms`,
        note: `目标${load} FPS对应的代数预算`,
      },
      {
        label: "状态载荷",
        value: `${(bandwidth / 1024).toFixed(1)} KiB/s`,
        note: `${load} tick/s × ${secondary}实体 × 48字节`,
      },
      {
        label: "RGBA8纹理基数",
        value: `${(textureBytes / 1024 / 1024).toFixed(1)} MiB`,
        note: `${secondary}张1024²纹理，不含mip、压缩、对齐与副本`,
      },
    ],
    verdict:
      "跨章地图只连接可复算预算；任何帧率、内存和带宽发布结论都必须回到指定版本、Player、设备和捕获文件。",
  };
}

function BudgetWorkbench({ model }: { model: UnityAdvancedEvidenceModel }) {
  const [load, setLoad] = useState(60);
  const [secondary, setSecondary] = useState(8);
  const [fault, setFault] = useState(false);
  const result = useMemo(
    () => evaluate(model.experiment, load, secondary, fault),
    [fault, load, model.experiment, secondary],
  );

  function reset() {
    setLoad(60);
    setSecondary(8);
    setFault(false);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="unity-advanced-budget-workbench"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            透明预算与状态工作台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            调整明确输入，查看可复算计数与估算；工作台不会生成综合质量分。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <RangeControl
          label="主输入 n / 频率"
          value={load}
          min={10}
          max={120}
          suffix=""
          onChange={setLoad}
        />
        <RangeControl
          label="次输入 k / 百分比"
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
        {fault ? "单故障场景已启用" : "切换到单故障场景"}
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

function CaptureGate({ model }: { model: UnityAdvancedEvidenceModel }) {
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
      ? `输入：${selected?.input}。执行：${selected?.action}。观察：${selected?.signal}。验收：${selected?.check}`
      : trace === "fault"
        ? `只注入“${model.fault}”。从“${selected?.label}”开始记录相对基线的首个分岔，不同时改变版本、平台或负载。`
        : `撤销唯一故障，清理残留状态，以相同版本、Player、设备和输入重放“${selected?.label}”；必须重新满足“${selected?.check}”。`;

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="unity-advanced-capture-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            基线—单故障—恢复捕获
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            性能结论只由目标Player/设备捕获签发；Editor数据只用于定位和快速迭代。
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
              ? "目标Player基线"
              : item === "fault"
                ? "单故障捕获"
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
          <p className="text-xs text-muted-foreground">当前捕获协议</p>
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

export function UnityAdvancedEvidenceLab({ model, view }: Props) {
  if (view === "version-contract") {
    return <VersionContract model={model} />;
  }
  if (view === "budget-workbench") {
    return <BudgetWorkbench model={model} />;
  }
  return <CaptureGate model={model} />;
}
