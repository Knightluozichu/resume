type BoostCell = readonly [stage: string, artifact: string, value: string];

function BoostGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly BoostCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, artifact, value], index) => (
            <section
              key={stage}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage}
              </strong>
              <code className="mt-3 block text-xs text-accent">{artifact}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {value}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const pipelineCells = [
  [
    "Proposal",
    "problem + generic design",
    "库从可复用 C++ 问题和清晰 contract 开始。",
  ],
  [
    "Peer review",
    "public technical review",
    "接口、可移植性、文档和测试接受同行质询。",
  ],
  [
    "Portable implementation",
    "multiple compilers",
    "避免绑定单一 vendor extension。",
  ],
  ["Field use", "real projects", "真实 workload 暴露 API、性能和演进问题。"],
  ["Standard proposal", "committee paper", "成熟经验可进入标准化讨论。"],
  [
    "Std evolution",
    "TR1 / later standards",
    "部分设施成为标准库，Boost 继续探索新领域。",
  ],
] as const;

const categoryCells = [
  ["Ownership/data", "smart_ptr / any / variant", "表达资源生命周期和异构值。"],
  ["Generic/TMP", "type_traits / MPL", "类型查询、概念检查和编译期组合。"],
  [
    "Containers",
    "multi_index / circular_buffer",
    "提供标准容器之外的数据组织。",
  ],
  ["Systems", "filesystem / asio / process", "抽象路径、异步 I/O 与进程能力。"],
  [
    "Math/graph",
    "graph / uBLAS / geometry",
    "复用图算法、线性代数和几何模型。",
  ],
  ["Testing/tools", "test / program_options", "提供验证、配置和工程基础设施。"],
] as const;

const adoptionCells = [
  [
    "Define gap",
    "missing std contract",
    "证明标准库为何不足，不因熟悉度直接引入。",
  ],
  [
    "Choose library",
    "one Boost component",
    "按组件而非把整个生态视作单一依赖。",
  ],
  [
    "Audit",
    "version / build / license",
    "检查 header-only、binary ABI、toolchain 和许可。",
  ],
  ["Wrap boundary", "domain adapter", "公共 API 不泄漏可替换的供应商类型。"],
  ["Verify", "matrix + benchmark", "在正式平台测语义、编译、运行与部署。"],
  [
    "Plan evolution",
    "std migration / upgrade",
    "记录升级节奏、弃用和标准替代出口。",
  ],
] as const;

export function EcppBoostStandardizationPipelineMap() {
  return (
    <BoostGrid
      ariaLabel="提案同行评审可移植实现真实使用标准提案标准演进六阶段 Boost 标准化图"
      caption="Boost 通过公开 peer review、portable implementation 和真实使用磨炼库设计，部分成果成为 TR1/后续标准化输入。"
      cells={pipelineCells}
    />
  );
}

export function EcppBoostLibraryFamiliesMap() {
  return (
    <BoostGrid
      ariaLabel="所有权数据泛型元编程容器系统数学图算法测试工具六类 Boost 能力图"
      caption="Boost 是按组件组织的广泛 portable libraries 生态，覆盖 ownership、generic programming、systems、math 与工程工具。"
      cells={categoryCells}
    />
  );
}

export function EcppBoostAdoptionWorkflowMap() {
  return (
    <BoostGrid
      ariaLabel="定义缺口选择组件依赖审计边界包装矩阵验证演进规划六阶段 Boost 采用流程图"
      caption="采用 Boost 应从标准库缺口出发，逐组件审计并隔离边界，同时保留升级与 std migration 路径。"
      cells={adoptionCells}
    />
  );
}
