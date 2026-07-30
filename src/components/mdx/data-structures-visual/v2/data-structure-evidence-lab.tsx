"use client";

import { useMemo, useState } from "react";

export type DataStructureEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  experiment:
    | "cross"
    | "contract"
    | "complexity"
    | "list"
    | "stack-queue"
    | "kmp"
    | "tree"
    | "graph"
    | "search"
    | "sort";
  operations: readonly {
    label: string;
    precondition: string;
    action: string;
    invariant: string;
  }[];
  gates: readonly { label: string; detail: string }[];
};

type Props = {
  model: DataStructureEvidenceModel;
  view: "representation-contract" | "operation-counter" | "trace-gate";
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

const REPRESENTATIONS = {
  array: {
    label: "连续数组",
    storage: "元素按下标映射到连续槽位；容量与逻辑长度分开记录。",
    relation: "第 i 个逻辑元素由槽位 i 表示，随机访问依赖有效下标。",
    invariant: "0 ≤ length ≤ capacity；有效区间之外不属于线性表。",
  },
  linked: {
    label: "链式结点",
    storage: "每个结点保存值和后继身份，结点地址不要求连续。",
    relation: "从头结点沿 next 恰好访问每个成员一次并最终到达终止标记。",
    invariant: "无意外环、无悬空边、长度等于可达数据结点数。",
  },
  tree: {
    label: "有根树",
    storage: "结点保存孩子、父亲或孩子—兄弟关系中的一种明确编码。",
    relation: "除根外每个结点恰有一个父结点，从根到任意结点路径唯一。",
    invariant: "连通且无环；遍历前后结点集合不变。",
  },
  graph: {
    label: "图表示",
    storage: "邻接矩阵按顶点对分配槽位，邻接表按实际边保存邻接项。",
    relation: "有向边和无向边的对称性、权重与重复边策略必须显式。",
    invariant: "表示中的每条邻接记录与抽象边集合一一对应。",
  },
} as const;

function RepresentationContract({
  model,
}: {
  model: DataStructureEvidenceModel;
}) {
  const [coordinate, setCoordinate] = useState(0);
  const [representation, setRepresentation] =
    useState<keyof typeof REPRESENTATIONS>("array");
  const [track, setTrack] = useState<"publisher" | "sample" | "current">(
    "publisher",
  );

  function reset() {
    setCoordinate(0);
    setRepresentation("array");
    setTrack("publisher");
  }

  const selected = REPRESENTATIONS[representation];
  const sourceText = {
    publisher:
      "出版社完整目录限定2020溢彩加强版的291个正式坐标；目录中的叙事句不等于算法证明。",
    sample:
      "出版社第2章授权样章允许局部核对算法定义与复杂度讲法；课件和样章不授权整书正文。",
    current:
      "NIST DADS与开放数据结构教材核对当前术语、抽象操作和复杂度；新补充不倒写成作者观点。",
  }[track];

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="data-structure-representation-contract"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            抽象对象—物理表示—不变量
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            先选正式坐标和来源轨，再比较同一抽象对象的存储关系与必须保持的性质。
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
            {(["publisher", "sample", "current"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`${controlClass} ${track === item ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={track === item}
                onClick={() => setTrack(item)}
              >
                {item === "publisher"
                  ? "出版社目录"
                  : item === "sample"
                    ? "第2章样章"
                    : "当前参考轨"}
              </button>
            ))}
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {(
              Object.keys(REPRESENTATIONS) as (keyof typeof REPRESENTATIONS)[]
            ).map((key) => (
              <button
                key={key}
                type="button"
                className={`${controlClass} ${representation === key ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={representation === key}
                onClick={() => setRepresentation(key)}
              >
                {REPRESENTATIONS[key].label}
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
          <p className="mt-3 text-sm text-foreground">{sourceText}</p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">存储合同</dt>
              <dd className="mt-1 text-foreground">{selected.storage}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">关系映射</dt>
              <dd className="mt-1 text-foreground">{selected.relation}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground">表示不变量</dt>
              <dd className="mt-1 text-foreground">
                {selected.invariant} 本页另要求：{model.invariant}
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
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-card border border-border bg-background p-3 text-sm">
      <span className="flex items-center justify-between gap-3">
        <span className="font-medium text-foreground">{label}</span>
        <output className="font-mono text-primary">{value}</output>
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

function linearAndBinary(size: number, targetIndex: number) {
  const target = Math.min(size - 1, targetIndex);
  const linearComparisons = target + 1;
  let low = 0;
  let high = size - 1;
  let binaryComparisons = 0;
  const probes: number[] = [];
  while (low <= high) {
    const middle = low + Math.floor((high - low) / 2);
    probes.push(middle);
    binaryComparisons += 1;
    if (middle === target) break;
    if (middle < target) low = middle + 1;
    else high = middle - 1;
  }
  return { target, linearComparisons, binaryComparisons, probes };
}

function prefixFunction(pattern: string) {
  const prefix = Array(pattern.length).fill(0) as number[];
  let comparisons = 0;
  for (let index = 1; index < pattern.length; index += 1) {
    let border = prefix[index - 1] ?? 0;
    while (border > 0 && pattern[index] !== pattern[border]) {
      comparisons += 1;
      border = prefix[border - 1] ?? 0;
    }
    comparisons += 1;
    if (pattern[index] === pattern[border]) border += 1;
    prefix[index] = border;
  }
  return { prefix, comparisons };
}

function stringSearch(text: string, pattern: string) {
  let naive = 0;
  for (let start = 0; start <= text.length - pattern.length; start += 1) {
    let offset = 0;
    while (offset < pattern.length) {
      naive += 1;
      if (text[start + offset] !== pattern[offset]) break;
      offset += 1;
    }
    if (offset === pattern.length) break;
  }

  const { prefix } = prefixFunction(pattern);
  let matched = 0;
  let kmp = 0;
  let matchIndex = -1;
  for (let index = 0; index < text.length; index += 1) {
    while (matched > 0 && text[index] !== pattern[matched]) {
      kmp += 1;
      matched = prefix[matched - 1] ?? 0;
    }
    kmp += 1;
    if (text[index] === pattern[matched]) matched += 1;
    if (matched === pattern.length) {
      matchIndex = index - pattern.length + 1;
      break;
    }
  }
  return { naive, kmp, matchIndex, prefix };
}

function countBubble(values: number[]) {
  const data = [...values];
  let comparisons = 0;
  let writes = 0;
  for (let end = data.length - 1; end > 0; end -= 1) {
    let swapped = false;
    for (let index = 0; index < end; index += 1) {
      comparisons += 1;
      if ((data[index] ?? 0) > (data[index + 1] ?? 0)) {
        [data[index], data[index + 1]] = [
          data[index + 1] ?? 0,
          data[index] ?? 0,
        ];
        writes += 2;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return { data, comparisons, writes };
}

function countInsertion(values: number[]) {
  const data = [...values];
  let comparisons = 0;
  let writes = 0;
  for (let index = 1; index < data.length; index += 1) {
    const key = data[index] ?? 0;
    let cursor = index - 1;
    while (cursor >= 0) {
      comparisons += 1;
      if ((data[cursor] ?? 0) <= key) break;
      data[cursor + 1] = data[cursor] ?? 0;
      writes += 1;
      cursor -= 1;
    }
    data[cursor + 1] = key;
    writes += 1;
  }
  return { data, comparisons, writes };
}

function dijkstraTrace() {
  const weights = [
    [0, 2, 5, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
    [2, 0, 1, 4, Number.POSITIVE_INFINITY],
    [5, 1, 0, 1, 7],
    [Number.POSITIVE_INFINITY, 4, 1, 0, 2],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 7, 2, 0],
  ];
  const distance = [0, Infinity, Infinity, Infinity, Infinity];
  const visited = Array(5).fill(false) as boolean[];
  let relaxations = 0;
  const settled: string[] = [];
  for (let count = 0; count < 5; count += 1) {
    let vertex = -1;
    for (let index = 0; index < 5; index += 1) {
      if (
        !visited[index] &&
        (vertex === -1 ||
          (distance[index] ?? Infinity) < (distance[vertex] ?? Infinity))
      ) {
        vertex = index;
      }
    }
    if (vertex < 0) break;
    visited[vertex] = true;
    settled.push(`${"ABCDE"[vertex]}:${distance[vertex]}`);
    for (let next = 0; next < 5; next += 1) {
      const weight = weights[vertex]?.[next] ?? Infinity;
      if (!visited[next] && Number.isFinite(weight)) {
        relaxations += 1;
        distance[next] = Math.min(
          distance[next] ?? Infinity,
          (distance[vertex] ?? Infinity) + weight,
        );
      }
    }
  }
  return { distance, relaxations, settled };
}

function evaluate(
  experiment: DataStructureEvidenceModel["experiment"],
  size: number,
  auxiliary: number,
  adversarial: boolean,
): { rows: ResultRow[]; verdict: string } {
  if (experiment === "contract" || experiment === "list") {
    const index = Math.min(size, auxiliary);
    const arrayMoves = size - index;
    const linkedTraversal = index;
    return {
      rows: [
        {
          label: "数组中间插入",
          value: `${arrayMoves} 次搬移`,
          note: `逻辑长度${size}，在下标${index}前插入；另有1次新值写入`,
        },
        {
          label: "单链表插入",
          value: `${linkedTraversal} 条边遍历 + 2 次改链`,
          note: "若已持有前驱身份则遍历可省；改链数量不随n增长",
        },
      ],
      verdict:
        "操作计数依赖已知信息与成本模型；数组随机定位和链表已知前驱不能被混成一句“谁更快”。",
    };
  }

  if (experiment === "complexity" || experiment === "search") {
    const result = linearAndBinary(size, adversarial ? size - 1 : auxiliary);
    return {
      rows: [
        {
          label: "顺序查找比较",
          value: result.linearComparisons.toString(),
          note: `目标位于有序数组下标${result.target}`,
        },
        {
          label: "折半查找比较",
          value: result.binaryComparisons.toString(),
          note: `探测下标 ${result.probes.join(" → ")}`,
        },
      ],
      verdict:
        "两算法返回同一目标；比较次数来自本次轨迹，不用大O替代实际小输入成本。",
    };
  }

  if (experiment === "stack-queue") {
    const capacity = Math.max(4, size);
    const head = adversarial ? capacity - 2 : 1;
    const length = Math.min(capacity - 1, auxiliary);
    const tail = (head + length) % capacity;
    const afterEnqueue = (tail + 1) % capacity;
    return {
      rows: [
        {
          label: "循环队列状态",
          value: `head=${head}, tail=${tail}`,
          note: `capacity=${capacity}，length=${length}`,
        },
        {
          label: "入队后tail",
          value: afterEnqueue.toString(),
          note: `(tail+1) mod ${capacity}；跨数组末端时回到0`,
        },
        {
          label: "空/满判定",
          value: head === afterEnqueue ? "满" : "仍可入队",
          note: "本站采用牺牲一个槽位的约定；其他约定必须另带size字段或标志",
        },
      ],
      verdict:
        "head与tail的模运算保持FIFO顺序；数组物理回绕不改变逻辑队列次序。",
    };
  }

  if (experiment === "kmp") {
    const text = adversarial ? "aaaaaaaaaaaaab" : "ababcabcabababd";
    const pattern = adversarial ? "aaaab" : "ababd";
    const result = stringSearch(text, pattern);
    return {
      rows: [
        {
          label: "朴素字符比较",
          value: result.naive.toString(),
          note: `文本 ${text}`,
        },
        {
          label: "KMP字符比较",
          value: result.kmp.toString(),
          note: `prefix=[${result.prefix.join(", ")}]`,
        },
        {
          label: "首个匹配下标",
          value: result.matchIndex.toString(),
          note: `模式 ${pattern}`,
        },
      ],
      verdict:
        "两路径必须返回同一匹配位置；prefix只移动模式状态，文本索引不回退。",
    };
  }

  if (experiment === "tree") {
    const preorder = ["A", "B", "D", "E", "C", "F"];
    const inorder = ["D", "B", "E", "A", "C", "F"];
    const postorder = ["D", "E", "B", "F", "C", "A"];
    return {
      rows: [
        {
          label: "前序 根—左—右",
          value: preorder.join(" "),
          note: "显式栈先压右后压左",
        },
        {
          label: "中序 左—根—右",
          value: inorder.join(" "),
          note: "二叉搜索树中序可产生有序键",
        },
        {
          label: "后序 左—右—根",
          value: postorder.join(" "),
          note: "释放子树时先处理孩子",
        },
      ],
      verdict:
        "三种遍历访问同一6结点集合且各访问一次；顺序不同来自根结点的处理时机。",
    };
  }

  if (experiment === "graph") {
    const result = dijkstraTrace();
    return {
      rows: [
        {
          label: "A到各点最短距离",
          value: result.distance.join(", "),
          note: "顶点顺序 A,B,C,D,E；所有边权非负",
        },
        {
          label: "确定顺序",
          value: result.settled.join(" → "),
          note: "每次选择未确定顶点中的最小暂定距离",
        },
        {
          label: "松弛尝试",
          value: result.relaxations.toString(),
          note: "计数来自固定5顶点图的实际轨迹",
        },
      ],
      verdict:
        "非负边权保证已确定距离不再被后续路径改小；负边反例必须改用其他算法。",
    };
  }

  if (experiment === "sort") {
    const values = Array.from({ length: size }, (_, index) =>
      adversarial ? size - index : (index * 7 + 3) % size,
    );
    const bubble = countBubble(values);
    const insertion = countInsertion(values);
    return {
      rows: [
        {
          label: "输入",
          value: values.join(" "),
          note: adversarial ? "逆序压力输入" : "确定性置换输入",
        },
        {
          label: "冒泡",
          value: `${bubble.comparisons} 比较 / ${bubble.writes} 写`,
          note: bubble.data.join(" "),
        },
        {
          label: "插入",
          value: `${insertion.comparisons} 比较 / ${insertion.writes} 写`,
          note: insertion.data.join(" "),
        },
      ],
      verdict:
        JSON.stringify(bubble.data) === JSON.stringify(insertion.data)
          ? "两算法产出同一有序多重集；比较与写入分开报告。"
          : "输出不一致，拒绝复杂度比较。",
    };
  }

  const search = linearAndBinary(size, auxiliary);
  const values = Array.from({ length: size }, (_, index) => size - index);
  const bubble = countBubble(values);
  return {
    rows: [
      {
        label: "线性表插入搬移",
        value: (size - Math.min(size, auxiliary)).toString(),
        note: "固定插入下标后逐槽计数",
      },
      {
        label: "折半查找比较",
        value: search.binaryComparisons.toString(),
        note: search.probes.join(" → "),
      },
      {
        label: "逆序冒泡比较",
        value: bubble.comparisons.toString(),
        note: "来自实际循环轨迹",
      },
    ],
    verdict:
      "三种计数属于不同操作与成本模型；学习地图只连接证据，不生成综合效率分。",
  };
}

function OperationCounter({ model }: { model: DataStructureEvidenceModel }) {
  const [size, setSize] = useState(10);
  const [auxiliary, setAuxiliary] = useState(4);
  const [adversarial, setAdversarial] = useState(false);
  const result = useMemo(
    () => evaluate(model.experiment, size, auxiliary, adversarial),
    [adversarial, auxiliary, model.experiment, size],
  );

  function reset() {
    setSize(10);
    setAuxiliary(4);
    setAdversarial(false);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="data-structure-operation-counter"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            操作轨迹与真实计数
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            调整小输入并切换压力场景；结果由当前算法轨迹计算，不使用合成效率分。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <RangeControl
          label="规模 n"
          value={size}
          min={4}
          max={16}
          onChange={setSize}
        />
        <RangeControl
          label="目标 / 下标 / 长度 k"
          value={auxiliary}
          min={1}
          max={Math.max(2, size - 1)}
          onChange={setAuxiliary}
        />
      </div>

      <button
        type="button"
        className={`${controlClass} mt-3 w-full ${adversarial ? "border-primary bg-primary/10" : ""}`}
        aria-pressed={adversarial}
        onClick={() => setAdversarial((value) => !value)}
      >
        {adversarial ? "压力场景已启用" : "切换到压力场景"}
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

function TraceGate({ model }: { model: DataStructureEvidenceModel }) {
  const [trace, setTrace] = useState<"baseline" | "fault" | "recovery">(
    "baseline",
  );
  const [operation, setOperation] = useState(0);
  const [checked, setChecked] = useState<boolean[]>(() =>
    model.gates.map(() => false),
  );
  const selected = model.operations[operation] ?? model.operations[0];

  function reset() {
    setTrace("baseline");
    setOperation(0);
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
      ? `${selected?.precondition} 执行“${selected?.action}”后核对：${selected?.invariant}`
      : trace === "fault"
        ? `只注入“${model.fault}”。从“${selected?.label}”的前置条件开始，记录第一个错误状态、越界访问或错误输出。`
        : `撤销唯一故障，以同一输入重放“${selected?.label}”；结构、输出、操作计数和“${selected?.invariant}”必须一起恢复。`;

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="data-structure-trace-gate"
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
            逐操作核对前置条件、状态转移与不变量；勾选清单只记录完成项。
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
              ? "参考操作"
              : item === "fault"
                ? "单故障注入"
                : "撤销后重放"}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="space-y-2">
          {model.operations.map((item, index) => (
            <button
              key={`${item.label}-${index}`}
              type="button"
              className={`${controlClass} w-full ${operation === index ? "border-primary bg-primary/10" : ""}`}
              aria-pressed={operation === index}
              onClick={() => setOperation(index)}
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
          <p className="text-xs text-muted-foreground">当前轨迹</p>
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
          上架前逐项核对
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

export function DataStructureEvidenceLab({ model, view }: Props) {
  if (view === "representation-contract") {
    return <RepresentationContract model={model} />;
  }
  if (view === "operation-counter") {
    return <OperationCounter model={model} />;
  }
  return <TraceGate model={model} />;
}
