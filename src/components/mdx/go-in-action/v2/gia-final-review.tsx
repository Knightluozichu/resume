"use client";

import {
  GoSemanticsEvidenceLab,
  type GoSemanticsEvidenceModel,
} from "@/components/mdx/go-in-action/v2/go-semantics-evidence-lab";

const model = {
  unitId: "finalReview",
  title: "《Go语言实战》78坐标全书证据总复习",
  question: "能否从一次构建、竞态或性能异常反查语言坐标与最小证据链？",
  concepts: [
    "Chapter 1 · Introducing Go",
    "Introducing Go",
    "solving modern programming challenges",
    "development speed",
    "concurrency",
    "Go's type system",
    "memory management",
    "Hello, Go",
    "Go Playground",
    "Chapter 2 · Go quick-start",
    "Go quick-start",
    "program architecture",
    "main package",
    "search package",
    "search.go, feed.go, match.go and default.go",
    "RSS matcher",
    "types variables functions and methods",
    "goroutines interfaces and errors",
    "Chapter 3 · Packaging and tooling",
    "packaging and tooling",
    "packages and package naming",
    "imports",
    "init function",
    "Go tools",
    "go vet, Go format and Go documentation",
    "collaborating with Go developers",
    "dependency management and vendoring",
    "Chapter 4 · Arrays, slices, and maps",
    "arrays, slices, and maps",
    "array internals and fundamentals",
    "declaring initializing and working with arrays",
    "slice internals and fundamentals",
    "nil and empty slices",
    "append and capacity",
    "map internals and fundamentals",
    "map iteration deletion and function passing",
    "Chapter 5 · Go's type system",
    "Go's type system",
    "user-defined types",
    "methods",
    "nature of types",
    "pointers and values",
    "interfaces and polymorphism",
    "type embedding and composition",
    "exporting and unexporting identifiers",
    "Chapter 6 · Concurrency",
    "concurrency versus parallelism",
    "goroutines",
    "Go scheduler",
    "race conditions",
    "locking shared resources",
    "atomic functions and mutexes",
    "channels",
    "unbuffered and buffered channels",
    "Chapter 7 · Concurrency patterns",
    "concurrency patterns",
    "Runner",
    "program lifetime timeout and interrupt",
    "Pooling",
    "reusable resource pool",
    "Work",
    "goroutine worker pool",
    "Chapter 8 · Standard library",
    "standard library",
    "documentation and source code",
    "logging",
    "encoding and decoding JSON",
    "input and output",
    "io.Reader and io.Writer",
    "interoperability between packages",
    "Chapter 9 · Testing and benchmarking",
    "testing and benchmarking",
    "unit testing",
    "HTTP testing with httptest",
    "examples",
    "documenting packages with example code",
    "benchmarking",
    "go test and benchmark options",
  ],
  invariant:
    "全书裁决必须由固定版本与输入、单变量故障、原始工件和同输入恢复共同支持",
  fault: "同时改变源码、依赖、并发度和测试环境，使首个分岔不可归因",
  artifact: "全书证据索引、跨章状态图、78坐标答辩记录和发布复核表",
  stages: [
    {
      label: "冻结版本与输入",
      input:
        "《Go语言实战》78坐标全书证据总复习的源码提交、go语言版本、工具链、依赖图、GOOS/GOARCH和固定数据",
      state: "尚未执行，只建立可重建身份与预注册预测",
      transition: "读取身份和初始状态，不修改源码、依赖或运行对象",
      observation:
        "《Go语言实战》78坐标全书证据总复习的版本表、输入哈希、能力清单与缺失条件",
    },
    {
      label: "建立参考状态",
      input:
        "在干净缓存或明确缓存身份下执行：用同一小型服务贯穿module、类型、集合、并发、标准库和测试，依次注入一个可撤销故障",
      state:
        "《Go语言实战》78坐标全书证据总复习的包图、值、goroutine、资源和测试基线",
      transition: "只执行预注册参考路径，不注入故障",
      observation:
        "《Go语言实战》78坐标全书证据总复习的构建、运行、状态轨迹与成功条件",
    },
    {
      label: "注入单一迁移",
      input:
        "保持其余身份不变，只注入“同时改变源码、依赖、并发度和测试环境，使首个分岔不可归因”",
      state:
        "《Go语言实战》78坐标全书证据总复习最靠近该变量的语言、包、值、同步或工件状态",
      transition: "一次只改变一个源码、依赖、调度或输入条件",
      observation:
        "《Go语言实战》78坐标全书证据总复习相对参考状态的首个分岔、传播路径与竞争性解释",
    },
    {
      label: "撤销并同输入恢复",
      input: "撤销唯一变量，从干净状态以相同源码、依赖、输入和环境重放",
      state:
        "《Go语言实战》78坐标全书证据总复习的最终状态、残留goroutine、文件、缓存与资源",
      transition: "恢复受控源并重建，不直接修补生成物或测试输出",
      observation:
        "《Go语言实战》78坐标全书证据总复习重新满足“全书裁决必须由固定版本与输入、单变量故障、原始工件和同输入恢复共同支持”且无残留状态",
    },
  ],
  experiments: [
    {
      name: "《Go语言实战》78坐标全书证据总复习首版历史复现",
      setup: "Manning正式目录、官方示例固定提交49fc99e与匹配时代的隔离工具链",
      prediction:
        "可以核对9章跨章状态迁移、证伪实验、当前迁移与发布判断的历史问题和示例身份，并交付全书证据索引、跨章状态图、78坐标答辩记录和发布复核表。",
      boundary:
        "官方示例仓库无LICENSE；只做结构和行为核对，不复制原文、代码或图像，也不把当前结论写成作者观点。",
    },
    {
      name: "《Go语言实战》78坐标全书证据总复习当前Go迁移",
      setup: "当前规范标示go1.26，记录go.mod语言版本、工具链、依赖图与平台",
      prediction:
        "接口与工具可能变化，但实验仍必须守住“全书裁决必须由固定版本与输入、单变量故障、原始工件和同输入恢复共同支持”。",
      boundary:
        "modules、generics、循环变量、fuzz、slog等新能力属于当前迁移轨道，不属于2015首版正文。",
    },
    {
      name: "《Go语言实战》78坐标全书证据总复习单故障恢复",
      setup: "干净仓库、固定输入、明确超时、goroutine/文件清理与原始工件目录",
      prediction:
        "只注入“同时改变源码、依赖、并发度和测试环境，使首个分岔不可归因”后，首个分岔可定位，撤销后同输入恢复。",
      boundary:
        "无法固定工具链、依赖、网络、时钟或基线时，结论只能标记未知，不能调分或补叙事。",
    },
  ],
  baselineTrace: [
    "《Go语言实战》78坐标全书证据总复习基线1：冻结版本与输入，观察《Go语言实战》78坐标全书证据总复习的版本表、输入哈希、能力清单与缺失条件。",
    "《Go语言实战》78坐标全书证据总复习基线2：建立参考状态，观察《Go语言实战》78坐标全书证据总复习的构建、运行、状态轨迹与成功条件。",
    "《Go语言实战》78坐标全书证据总复习基线3：注入单一迁移，观察《Go语言实战》78坐标全书证据总复习相对参考状态的首个分岔、传播路径与竞争性解释。",
    "《Go语言实战》78坐标全书证据总复习基线4：撤销并同输入恢复，观察《Go语言实战》78坐标全书证据总复习重新满足“全书裁决必须由固定版本与输入、单变量故障、原始工件和同输入恢复共同支持”且无残留状态。",
  ],
  faultTrace: [
    "《Go语言实战》78坐标全书证据总复习故障1：冻结版本与输入只追踪“同时改变源码、依赖、并发度和测试环境，使首个分岔不可归因”，核对尚未执行，只建立可重建身份与预注册预测。",
    "《Go语言实战》78坐标全书证据总复习故障2：建立参考状态只追踪“同时改变源码、依赖、并发度和测试环境，使首个分岔不可归因”，核对《Go语言实战》78坐标全书证据总复习的包图、值、goroutine、资源和测试基线。",
    "《Go语言实战》78坐标全书证据总复习故障3：注入单一迁移只追踪“同时改变源码、依赖、并发度和测试环境，使首个分岔不可归因”，核对《Go语言实战》78坐标全书证据总复习最靠近该变量的语言、包、值、同步或工件状态。",
    "《Go语言实战》78坐标全书证据总复习故障4：撤销并同输入恢复只追踪“同时改变源码、依赖、并发度和测试环境，使首个分岔不可归因”，核对《Go语言实战》78坐标全书证据总复习的最终状态、残留goroutine、文件、缓存与资源。",
  ],
  recoveryTrace: [
    "《Go语言实战》78坐标全书证据总复习恢复1：读取身份和初始状态，不修改源码、依赖或运行对象，重新验证《Go语言实战》78坐标全书证据总复习的版本表、输入哈希、能力清单与缺失条件。",
    "《Go语言实战》78坐标全书证据总复习恢复2：只执行预注册参考路径，不注入故障，重新验证《Go语言实战》78坐标全书证据总复习的构建、运行、状态轨迹与成功条件。",
    "《Go语言实战》78坐标全书证据总复习恢复3：一次只改变一个源码、依赖、调度或输入条件，重新验证《Go语言实战》78坐标全书证据总复习相对参考状态的首个分岔、传播路径与竞争性解释。",
    "《Go语言实战》78坐标全书证据总复习恢复4：恢复受控源并重建，不直接修补生成物或测试输出，重新验证《Go语言实战》78坐标全书证据总复习重新满足“全书裁决必须由固定版本与输入、单变量故障、原始工件和同输入恢复共同支持”且无残留状态。",
  ],
  gates: [
    {
      label: "原版、目录与许可门",
      detail:
        "《Go语言实战》78坐标全书证据总复习只用Manning正式目录限定覆盖，以官方示例固定提交核对历史身份；无LICENSE代码和不可访问正文均不复制。",
    },
    {
      label: "语言版本与工具链门",
      detail:
        "《Go语言实战》78坐标全书证据总复习分开2015首版和当前go1.26轨道，记录go.mod语言版本、go version、GOOS/GOARCH、依赖图与构建参数。",
    },
    {
      label: "状态、首错与证伪门",
      detail:
        "《Go语言实战》78坐标全书证据总复习只改变“同时改变源码、依赖、并发度和测试环境，使首个分岔不可归因”，保存首个程序状态分岔、原始工件、竞争性解释和检测盲区。",
    },
    {
      label: "恢复、残留与发布门",
      detail:
        "《Go语言实战》78坐标全书证据总复习撤销后以同一输入重建并恢复基线，交付全书证据索引、跨章状态图、78坐标答辩记录和发布复核表，同时报告失败、残留与未知项。",
    },
  ],
} as const satisfies GoSemanticsEvidenceModel;

export function GiaFinalReviewVersionContractLab() {
  return <GoSemanticsEvidenceLab model={model} view="version-contract" />;
}

export function GiaFinalReviewStateTraceLab() {
  return <GoSemanticsEvidenceLab model={model} view="state-trace" />;
}

export function GiaFinalReviewEvidenceGateLab() {
  return <GoSemanticsEvidenceLab model={model} view="evidence-gate" />;
}
