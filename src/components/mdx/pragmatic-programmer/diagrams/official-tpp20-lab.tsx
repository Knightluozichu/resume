"use client";

import { useState } from "react";

type LabMode = "system" | "feedback" | "evidence";
type Scenario = "baseline" | "fault" | "recovery";
type VisualKind =
  | "roadmap"
  | "edition-timeline"
  | "chapter-map"
  | "ownership-loop"
  | "entropy-field"
  | "threshold"
  | "portfolio"
  | "communication-path"
  | "dependency-graph"
  | "option-tree"
  | "delivery-pipeline"
  | "estimate-cone"
  | "record-ledger"
  | "version-graph"
  | "debug-tree"
  | "contract-boundary"
  | "resource-lifecycle"
  | "event-network"
  | "state-machine"
  | "feedback-loop"
  | "security-boundary"
  | "outcome-map";

type Props = {
  unitId: string;
  title: string;
  nodes: readonly string[];
  focuses: readonly string[];
  mode: LabMode;
};

const kindGroups: Record<VisualKind, readonly string[]> = {
  roadmap: ["tpp20-official-learning-map", "tpp20-official-final-review"],
  "edition-timeline": [
    "tpp20-foreword",
    "tpp20-second-edition-preface",
    "tpp20-first-edition-preface",
    "tpp20-postface",
    "tpp20-translator-postface",
  ],
  "chapter-map": [
    "tpp20-chapter-01-pragmatic-philosophy",
    "tpp20-chapter-02-pragmatic-approach",
    "tpp20-chapter-03-basic-tools",
    "tpp20-chapter-04-pragmatic-paranoia",
    "tpp20-chapter-05-bend-or-break",
    "tpp20-chapter-06-concurrency",
    "tpp20-chapter-07-while-coding",
    "tpp20-chapter-08-before-project",
    "tpp20-chapter-09-pragmatic-projects",
  ],
  "ownership-loop": [
    "tpp20-topic-01-your-life",
    "tpp20-topic-02-cat-ate-source-code",
    "tpp20-topic-53-pride-prejudice",
  ],
  "entropy-field": [
    "tpp20-topic-03-software-entropy",
    "tpp20-topic-04-stone-soup-boiled-frogs",
    "tpp20-topic-38-programming-by-coincidence",
  ],
  threshold: [
    "tpp20-topic-05-good-enough-software",
    "tpp20-topic-27-headlights",
    "tpp20-topic-46-impossible-puzzles",
  ],
  portfolio: [
    "tpp20-topic-06-knowledge-portfolio",
    "tpp20-topic-37-lizard-brain",
  ],
  "communication-path": [
    "tpp20-topic-07-communicate",
    "tpp20-topic-47-working-together",
    "tpp20-topic-49-pragmatic-teams",
  ],
  "dependency-graph": [
    "tpp20-topic-08-essence-good-design",
    "tpp20-topic-09-dry-duplication",
    "tpp20-topic-10-orthogonality",
    "tpp20-topic-28-decoupling",
    "tpp20-topic-31-inheritance-tax",
    "tpp20-topic-44-naming-things",
  ],
  "option-tree": [
    "tpp20-topic-11-reversibility",
    "tpp20-topic-13-prototypes-post-it-notes",
    "tpp20-topic-50-coconuts-dont-cut-it",
  ],
  "delivery-pipeline": [
    "tpp20-topic-12-tracer-bullets",
    "tpp20-topic-14-domain-languages",
    "tpp20-topic-17-shell-games",
    "tpp20-topic-18-power-editing",
    "tpp20-topic-21-text-manipulation",
    "tpp20-topic-30-transforming-programming",
    "tpp20-topic-40-refactoring",
    "tpp20-topic-41-test-to-code",
    "tpp20-topic-51-starter-kit",
  ],
  "estimate-cone": [
    "tpp20-topic-15-estimating",
    "tpp20-topic-39-algorithm-speed",
  ],
  "record-ledger": [
    "tpp20-topic-16-power-plain-text",
    "tpp20-topic-22-engineering-daybooks",
    "tpp20-bibliography",
    "tpp20-exercise-answers",
  ],
  "version-graph": ["tpp20-topic-19-version-control"],
  "debug-tree": [
    "tpp20-topic-20-debugging",
    "tpp20-topic-24-dead-programs-tell-no-lies",
  ],
  "contract-boundary": [
    "tpp20-topic-23-design-by-contract",
    "tpp20-topic-25-assertive-programming",
    "tpp20-topic-45-requirements-pit",
  ],
  "resource-lifecycle": ["tpp20-topic-26-balance-resources"],
  "event-network": [
    "tpp20-topic-29-juggling-real-world",
    "tpp20-topic-33-breaking-temporal-coupling",
    "tpp20-topic-35-actors-processes",
    "tpp20-topic-36-blackboards",
  ],
  "state-machine": [
    "tpp20-topic-32-configuration",
    "tpp20-topic-34-shared-state",
  ],
  "feedback-loop": [
    "tpp20-topic-42-property-based-testing",
    "tpp20-topic-48-essence-agility",
  ],
  "security-boundary": ["tpp20-topic-43-stay-safe"],
  "outcome-map": ["tpp20-topic-52-delight-users"],
};

const kindByUnit = Object.fromEntries(
  Object.entries(kindGroups).flatMap(([kind, units]) =>
    units.map((unit) => [unit, kind as VisualKind]),
  ),
) as Record<string, VisualKind>;

const kindCopy: Record<VisualKind, { heading: string; caption: string }> = {
  roadmap: {
    heading: "从务实主张到可反驳工程证据",
    caption:
      "学习路径按责任、设计、工具、并发、编码、项目与用户结果连接；任何提示都要回到对象和反例。",
  },
  "edition-timeline": {
    heading: "版次语境与主张变化时间线",
    caption:
      "序言和跋用于定位作者、译者、版次变化与时代边界，不把后来经验倒写进早期文本。",
  },
  "chapter-map": {
    heading: "本章 Topic 的依赖与反馈地图",
    caption:
      "章节页连接 Topic 的前提、传递对象与验证出口，不把若干标题排成无因果目录。",
  },
  "ownership-loop": {
    heading: "责任、行动、反馈与修正闭环",
    caption:
      "责任不是口号：每个承诺都有所有者、可观察结果、失败披露和下一次修正。",
  },
  "entropy-field": {
    heading: "坏状态如何扩散并成为默认",
    caption:
      "从第一处破窗或巧合开始，观察复制、容忍、反馈缺失如何把局部异常扩散到系统。",
  },
  threshold: {
    heading: "边界、预测范围与停止条件",
    caption:
      "先写可接受范围与未知区间，再在边界样本上决定继续、停止、缩小承诺或补充信息。",
  },
  portfolio: {
    heading: "知识资产的获得、试用与淘汰",
    caption:
      "知识组合包含来源、练习、反馈和更新周期；收藏链接不等于形成可调用能力。",
  },
  "communication-path": {
    heading: "意图如何穿过受众与反馈",
    caption:
      "信息要经过受众、媒介、上下文和确认；发送动作本身不能证明共同理解。",
  },
  "dependency-graph": {
    heading: "知识、模块与命名的依赖图",
    caption:
      "图中边表示具体依赖或知识复制；修改一个节点时沿边检查触达范围与替代接口。",
  },
  "option-tree": {
    heading: "可逆选择与低成本试探树",
    caption:
      "先保留替代路径，用原型或适配边界购买信息；承诺不可逆决定前必须写退出条件。",
  },
  "delivery-pipeline": {
    heading: "输入经工具与变换到可验证输出",
    caption:
      "每一阶段消费明确输入并产生可检查工件，失败时停在首个不符合合同的转换。",
  },
  "estimate-cone": {
    heading: "不确定性区间如何随证据收敛",
    caption:
      "估算给出范围、假设和重估触发器；算法比较同时固定输入规模、分布和资源模型。",
  },
  "record-ledger": {
    heading: "可搜索、可比较、可追溯的记录",
    caption:
      "纯文本、工程日志、参考资料与答案都要保存身份、时间、上下文和可重放动作。",
  },
  "version-graph": {
    heading: "提交、分支、合并与恢复图",
    caption:
      "每条边是一次内容变更；基线、分支点、冲突和回滚目标必须由提交身份确定。",
  },
  "debug-tree": {
    heading: "从失败样本到可证伪假设树",
    caption:
      "先稳定复现和读取原始错误，再一次验证一个假设；修复后把失败路径固化成回归。",
  },
  "contract-boundary": {
    heading: "前置条件、不变量与失败出口",
    caption:
      "合同把调用者和实现的责任分开；断言暴露不可能状态，需求则通过真实使用场景持续发现。",
  },
  "resource-lifecycle": {
    heading: "资源取得、移交、释放与异常清理",
    caption:
      "所有权必须在每条正常和异常路径上闭合；泄漏和重复释放都能回到具体状态转换。",
  },
  "event-network": {
    heading: "事件、参与者与共享协调网络",
    caption:
      "时间依赖、消息、角色和黑板状态分别标注；并发正确性不靠调用顺序巧合。",
  },
  "state-machine": {
    heading: "配置或共享数据的状态转换",
    caption:
      "合法状态、原子转换、观察者和拒绝路径明确后，运行期变化才不会产生半更新。",
  },
  "feedback-loop": {
    heading: "生成样本、观察结果、缩小反例",
    caption:
      "反馈循环用真实失败缩小假设空间；属性测试和敏捷实践都必须产生下一步可执行信息。",
  },
  "security-boundary": {
    heading: "攻击面、信任边界与最小权限",
    caption:
      "输入从不可信区进入受控区时经过验证、授权与审计；拒绝路径与正常路径同样被测试。",
  },
  "outcome-map": {
    heading: "用户目标、行为变化与交付结果",
    caption:
      "功能只是输出；真正的验收要连接用户问题、可观察行为、业务结果和负面影响。",
  },
};

const modeNames: Record<LabMode, string> = {
  system: "机制对象",
  feedback: "单变量操作",
  evidence: "故障与恢复",
};
const scenarioNames: Record<Scenario, string> = {
  baseline: "基线",
  fault: "故障",
  recovery: "恢复",
};

function Pipeline({
  nodes,
  active,
}: {
  nodes: readonly string[];
  active: number;
}) {
  return (
    <ol className="grid gap-2 sm:grid-cols-5">
      {nodes.slice(0, 5).map((node, index) => (
        <li
          key={node}
          className={`relative min-h-24 rounded border p-3 text-xs leading-5 ${active === index ? "border-blue-600 bg-blue-50 font-semibold text-blue-950 dark:bg-blue-950 dark:text-blue-50" : "border-zinc-300 dark:border-zinc-700"}`}
        >
          <span className="mb-2 block font-mono font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
          {node}
          {index < 4 && (
            <span
              className="absolute -right-2 top-9 z-10 hidden bg-white px-1 text-zinc-500 sm:block dark:bg-zinc-950"
              aria-hidden
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function Cycle({
  nodes,
  active,
}: {
  nodes: readonly string[];
  active: number;
}) {
  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-5">
        {nodes.slice(0, 5).map((node, index) => (
          <div
            key={node}
            className={`min-h-24 rounded-full border p-3 text-center text-xs leading-5 ${active === index ? "border-emerald-600 bg-emerald-50 font-semibold text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {node}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">
        最后一个状态的观察结果会成为下一轮第一个状态的输入。
      </p>
    </div>
  );
}

function Tree({ nodes, active }: { nodes: readonly string[]; active: number }) {
  return (
    <div className="grid gap-3">
      <div
        className={`mx-auto w-full max-w-sm rounded border-2 p-3 text-center text-xs ${active === 0 ? "border-violet-600 bg-violet-50 dark:bg-violet-950" : "border-zinc-400"}`}
      >
        {nodes[0]}
      </div>
      <span className="text-center text-zinc-500" aria-hidden>
        ↓ 条件 / 假设
      </span>
      <div className="grid gap-2 sm:grid-cols-2">
        {nodes.slice(1, 3).map((node, index) => (
          <div
            key={node}
            className={`rounded border p-3 text-center text-xs ${active === index + 1 ? "border-amber-600 bg-amber-50 dark:bg-amber-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {node}
          </div>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {nodes.slice(3, 5).map((node, index) => (
          <div
            key={node}
            className={`rounded border p-3 text-center text-xs ${active === index + 3 ? "border-rose-600 bg-rose-50 dark:bg-rose-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}

function Network({
  nodes,
  active,
}: {
  nodes: readonly string[];
  active: number;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr]">
      <div className="grid gap-2">
        {nodes.slice(0, 2).map((node, index) => (
          <div
            key={node}
            className={`min-h-20 rounded border p-3 text-xs ${active === index ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {node}
          </div>
        ))}
      </div>
      <div
        className="flex items-center justify-center text-2xl text-zinc-500"
        aria-hidden
      >
        ⇄
      </div>
      <div className="grid gap-2">
        {nodes.slice(2, 5).map((node, index) => (
          <div
            key={node}
            className={`min-h-20 rounded border p-3 text-xs ${active === index + 2 ? "border-orange-600 bg-orange-50 dark:bg-orange-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}

function Layers({
  nodes,
  active,
}: {
  nodes: readonly string[];
  active: number;
}) {
  return (
    <div className="mx-auto grid max-w-2xl gap-1">
      {nodes.slice(0, 5).map((node, index) => (
        <div
          key={node}
          className={`min-h-14 rounded border px-4 py-3 text-center text-xs ${active === index ? "border-violet-600 bg-violet-50 font-semibold dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}
          style={{ marginInline: `${index * 9}px` }}
        >
          {node}
        </div>
      ))}
    </div>
  );
}

function Timeline({
  nodes,
  active,
}: {
  nodes: readonly string[];
  active: number;
}) {
  return (
    <ol className="relative grid gap-2 pl-5 before:absolute before:left-[9px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-zinc-300 before:content-[''] dark:before:bg-zinc-700">
      {nodes.slice(0, 5).map((node, index) => (
        <li
          key={node}
          className={`relative min-h-14 rounded border px-4 py-3 text-xs ${active === index ? "border-cyan-600 bg-cyan-50 font-semibold dark:bg-cyan-950" : "border-zinc-300 dark:border-zinc-700"}`}
        >
          <span
            className="absolute -left-[21px] top-4 size-3 rounded-full border-2 border-white bg-cyan-600 dark:border-zinc-950"
            aria-hidden
          />
          <span className="mr-3 font-mono text-zinc-500">T{index}</span>
          {node}
        </li>
      ))}
    </ol>
  );
}

function EntropyField({
  nodes,
  active,
}: {
  nodes: readonly string[];
  active: number;
}) {
  return (
    <div className="grid gap-2">
      {nodes.slice(0, 5).map((node, index) => (
        <div
          key={node}
          className={`min-h-12 rounded border px-4 py-3 text-center text-xs ${active === index ? "border-rose-600 bg-rose-50 font-semibold dark:bg-rose-950" : "border-zinc-300 dark:border-zinc-700"}`}
          style={{ width: `${58 + index * 10.5}%`, marginInline: "auto" }}
        >
          <span className="mr-2 font-mono text-zinc-500">
            扩散层 {index + 1}
          </span>
          {node}
        </div>
      ))}
    </div>
  );
}

function VersionGraph({
  nodes,
  active,
}: {
  nodes: readonly string[];
  active: number;
}) {
  const styleFor = (index: number) =>
    `rounded-full border-2 px-4 py-3 text-center text-xs ${active === index ? "border-violet-600 bg-violet-50 font-semibold dark:bg-violet-950" : "border-zinc-400"}`;
  return (
    <div className="mx-auto max-w-2xl">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        <div className={styleFor(0)}>{nodes[0]}</div>
        <span className="text-zinc-500" aria-hidden>
          →
        </span>
        <div className={styleFor(1)}>{nodes[1]}</div>
        <span className="text-zinc-500" aria-hidden>
          →
        </span>
        <div className={styleFor(3)}>{nodes[3]}</div>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-[18%]">
        <span className="text-center text-zinc-500" aria-hidden>
          ↘
        </span>
        <div className={styleFor(2)}>{nodes[2]}</div>
        <span className="text-center text-zinc-500" aria-hidden>
          ↗ merge
        </span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-3">
        <div className={styleFor(4)}>{nodes[4]}</div>
        <span className="text-xs text-zinc-500">↶ 指向已验证提交或标签</span>
      </div>
    </div>
  );
}

function Ledger({
  nodes,
  focuses,
  active,
}: {
  nodes: readonly string[];
  focuses: readonly string[];
  active: number;
}) {
  return (
    <div className="overflow-hidden rounded border-2 border-zinc-500">
      <div className="grid grid-cols-[0.8fr_1.2fr] border-b border-zinc-400 bg-zinc-100 px-3 py-2 text-xs font-semibold dark:bg-zinc-900">
        <span>记录对象</span>
        <span>必须保存</span>
      </div>
      {nodes.slice(0, 5).map((node, index) => (
        <div
          key={node}
          className={`grid min-h-14 grid-cols-[0.8fr_1.2fr] gap-3 border-b border-zinc-300 px-3 py-2 text-xs last:border-b-0 dark:border-zinc-700 ${active === index ? "bg-emerald-50 font-semibold dark:bg-emerald-950" : ""}`}
        >
          <span>{node}</span>
          <span className="[overflow-wrap:anywhere]">
            {focuses[index % focuses.length]}
          </span>
        </div>
      ))}
    </div>
  );
}

function StateMachine({
  nodes,
  active,
}: {
  nodes: readonly string[];
  active: number;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-5">
      {nodes.slice(0, 5).map((node, index) => (
        <div
          key={node}
          className={`relative min-h-24 rounded border-2 p-3 text-center text-xs ${active === index ? "border-rose-600 bg-rose-50 font-semibold dark:bg-rose-950" : "border-zinc-400"}`}
        >
          {node}
          <span className="mt-2 block font-mono text-zinc-500">
            state:{index}
          </span>
          {index < 4 && (
            <span
              className="absolute -right-2 top-9 z-10 hidden bg-white px-1 text-zinc-500 sm:block dark:bg-zinc-950"
              aria-hidden
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function EstimateCone({
  nodes,
  active,
}: {
  nodes: readonly string[];
  active: number;
}) {
  return (
    <div className="grid gap-2">
      {nodes.slice(0, 5).map((node, index) => (
        <div
          key={node}
          className={`min-h-12 rounded border px-4 py-3 text-xs ${active === index ? "border-blue-600 bg-blue-50 font-semibold dark:bg-blue-950" : "border-zinc-300 dark:border-zinc-700"}`}
          style={{ marginInline: `${index * 11}px` }}
        >
          <span className="mr-3 font-mono text-zinc-500">
            ±{Math.max(10, 50 - index * 9)}%
          </span>
          {node}
        </div>
      ))}
    </div>
  );
}

function DomainVisual({
  kind,
  nodes,
  focuses,
  active,
}: {
  kind: VisualKind;
  nodes: readonly string[];
  focuses: readonly string[];
  active: number;
}) {
  const normalized = active % Math.min(nodes.length, 5);
  if (["roadmap", "chapter-map", "delivery-pipeline"].includes(kind))
    return <Pipeline nodes={nodes} active={normalized} />;
  if (
    [
      "ownership-loop",
      "portfolio",
      "feedback-loop",
      "resource-lifecycle",
    ].includes(kind)
  )
    return <Cycle nodes={nodes} active={normalized} />;
  if (["option-tree", "debug-tree", "threshold"].includes(kind))
    return <Tree nodes={nodes} active={normalized} />;
  if (
    ["communication-path", "dependency-graph", "event-network"].includes(kind)
  )
    return <Network nodes={nodes} active={normalized} />;
  if (["contract-boundary", "security-boundary"].includes(kind))
    return <Layers nodes={nodes} active={normalized} />;
  if (kind === "edition-timeline")
    return <Timeline nodes={nodes} active={normalized} />;
  if (kind === "entropy-field")
    return <EntropyField nodes={nodes} active={normalized} />;
  if (kind === "version-graph")
    return <VersionGraph nodes={nodes} active={normalized} />;
  if (kind === "outcome-map")
    return <Pipeline nodes={nodes} active={normalized} />;
  if (kind === "record-ledger")
    return <Ledger nodes={nodes} focuses={focuses} active={normalized} />;
  if (kind === "estimate-cone")
    return <EstimateCone nodes={nodes} active={normalized} />;
  if (kind === "state-machine")
    return <StateMachine nodes={nodes} active={normalized} />;
  return <Pipeline nodes={nodes} active={normalized} />;
}

export function OfficialTpp20Lab({
  unitId,
  title,
  nodes,
  focuses,
  mode,
}: Props) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const kind = kindByUnit[unitId] ?? "roadmap";
  const copy = kindCopy[kind];
  const active =
    mode === "system"
      ? nodeIndex
      : mode === "feedback"
        ? focusIndex
        : scenario === "baseline"
          ? 0
          : scenario === "fault"
            ? Math.max(1, Math.min(nodes.length, 5) - 2)
            : Math.min(nodes.length, 5) - 1;
  const reset = () => {
    setNodeIndex(0);
    setFocusIndex(0);
    setScenario("baseline");
  };
  const currentNode = nodes[active % nodes.length];
  const currentFocus = focuses[focusIndex % focuses.length];

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${title} · ${copy.heading}专属图`}
      data-tpp20-unit={unitId}
      data-visual-kind={kind}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            程序员修炼之道 · {modeNames[mode]}
          </p>
          <h3 className="break-words text-base font-semibold">
            {copy.heading}
          </h3>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-zinc-600 dark:text-zinc-300">
            {copy.caption}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-zinc-300 bg-white px-3 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950"
          aria-label={`重置${title}实验`}
        >
          <span aria-hidden>↺</span>
        </button>
      </header>
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
        <div className="min-w-0 border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
          {mode === "system" && (
            <div className="mb-4 flex flex-wrap gap-2">
              {nodes.map((node, index) => (
                <button
                  key={`${node}-${index}`}
                  type="button"
                  onClick={() => setNodeIndex(index)}
                  aria-pressed={nodeIndex === index}
                  className={`min-h-11 rounded border px-3 py-2 text-left text-xs ${nodeIndex === index ? "border-emerald-700 bg-emerald-50 font-semibold dark:bg-emerald-950" : "border-zinc-300 dark:border-zinc-700"}`}
                >
                  {node}
                </button>
              ))}
            </div>
          )}
          {mode === "feedback" && (
            <div className="mb-4 grid gap-2 sm:grid-cols-2">
              {focuses.map((focus, index) => (
                <button
                  key={`${focus}-${index}`}
                  type="button"
                  onClick={() => setFocusIndex(index)}
                  aria-pressed={focusIndex === index}
                  className={`min-h-11 rounded border px-3 py-2 text-left text-xs ${focusIndex === index ? "border-blue-700 bg-blue-50 font-semibold dark:bg-blue-950" : "border-zinc-300 dark:border-zinc-700"}`}
                >
                  {focus}
                </button>
              ))}
            </div>
          )}
          {mode === "evidence" && (
            <div className="mb-4 grid grid-cols-3 gap-2">
              {(Object.keys(scenarioNames) as Scenario[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setScenario(item)}
                  aria-pressed={scenario === item}
                  className={`min-h-11 rounded border px-2 py-2 text-xs ${scenario === item ? "border-zinc-950 bg-zinc-950 font-semibold text-white dark:border-white dark:bg-white dark:text-zinc-950" : "border-zinc-300 dark:border-zinc-700"}`}
                >
                  {scenarioNames[item]}
                </button>
              ))}
            </div>
          )}
          <DomainVisual
            kind={kind}
            nodes={nodes}
            focuses={focuses}
            active={active}
          />
        </div>
        <aside className="min-w-0 p-4">
          <p className="text-xs font-semibold text-zinc-500">
            图中当前真实对象
          </p>
          <p className="mt-1 text-sm font-semibold [overflow-wrap:anywhere]">
            {currentNode}
          </p>
          <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
            {title} 当前观察：{currentFocus}
          </p>
          {mode === "feedback" && (
            <div className="mt-4 rounded border border-blue-500 bg-blue-50 p-3 text-xs text-blue-950 dark:bg-blue-950 dark:text-blue-50">
              <strong>本次只改变</strong>
              <p className="mt-1">
                把“{currentFocus}
                ”的输入、责任人或验证条件改变一个，其余节点保持基线；比较第一处状态变化。
              </p>
            </div>
          )}
          {mode === "evidence" && (
            <div className="mt-4 grid gap-3 text-xs">
              <div
                className={`rounded border p-3 ${scenario === "fault" ? "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50" : "border-zinc-300 dark:border-zinc-700"}`}
              >
                <strong>故障样本</strong>
                <p className="mt-1">
                  让“{currentNode}”缺少
                  {focuses[Math.min(focuses.length - 1, 2)]}
                  ，检查下游是否在首个非法状态停止。
                </p>
              </div>
              <div
                className={`rounded border p-3 ${scenario === "recovery" ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-zinc-300 dark:border-zinc-700"}`}
              >
                <strong>恢复断言</strong>
                <p className="mt-1">
                  恢复输入后从基线重放，要求{focuses[focuses.length - 1]}
                  重新出现且不复用故障状态。
                </p>
              </div>
            </div>
          )}
          <div className="mt-4 rounded border p-3 text-xs">
            <strong>应保存的本章工件</strong>
            <p className="mt-1 [overflow-wrap:anywhere]">
              {focuses.join("、")}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
