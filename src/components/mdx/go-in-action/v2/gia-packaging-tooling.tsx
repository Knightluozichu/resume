"use client";

import {
  GoSemanticsEvidenceLab,
  type GoSemanticsEvidenceModel,
} from "@/components/mdx/go-in-action/v2/go-semantics-evidence-lab";

const model = {
  unitId: "gia-03",
  title: "第3章 包与工具",
  question: "首版GOPATH、vendoring与gb怎样迁移到当前module和workspace证据链？",
  concepts: [
    "Chapter 3 · Packaging and tooling",
    "packaging and tooling",
    "packages and package naming",
    "imports",
    "init function",
    "Go tools",
    "go vet, Go format and Go documentation",
    "collaborating with Go developers",
    "dependency management and vendoring",
  ],
  invariant:
    "包身份、模块版本、替换、校验和、工具链与构建输出必须可重建且相互一致",
  fault: "把gb或仅vendor目录当成当前依赖真值，却遗漏go.mod、go.sum与工具链版本",
  artifact: "模块图、go env快照、go.mod/go.sum、工具输出、二进制哈希和迁移差分",
  stages: [
    {
      label: "冻结版本与输入",
      input:
        "第3章 包与工具的源码提交、go语言版本、工具链、依赖图、GOOS/GOARCH和固定数据",
      state: "尚未执行，只建立可重建身份与预注册预测",
      transition: "读取身份和初始状态，不修改源码、依赖或运行对象",
      observation: "第3章 包与工具的版本表、输入哈希、能力清单与缺失条件",
    },
    {
      label: "建立参考状态",
      input:
        "在干净缓存或明确缓存身份下执行：为同一多包程序分别记录首版路径假设与当前go.mod依赖图，从干净缓存执行format、vet、test和build",
      state: "第3章 包与工具的包图、值、goroutine、资源和测试基线",
      transition: "只执行预注册参考路径，不注入故障",
      observation: "第3章 包与工具的构建、运行、状态轨迹与成功条件",
    },
    {
      label: "注入单一迁移",
      input:
        "保持其余身份不变，只注入“把gb或仅vendor目录当成当前依赖真值，却遗漏go.mod、go.sum与工具链版本”",
      state: "第3章 包与工具最靠近该变量的语言、包、值、同步或工件状态",
      transition: "一次只改变一个源码、依赖、调度或输入条件",
      observation: "第3章 包与工具相对参考状态的首个分岔、传播路径与竞争性解释",
    },
    {
      label: "撤销并同输入恢复",
      input: "撤销唯一变量，从干净状态以相同源码、依赖、输入和环境重放",
      state: "第3章 包与工具的最终状态、残留goroutine、文件、缓存与资源",
      transition: "恢复受控源并重建，不直接修补生成物或测试输出",
      observation:
        "第3章 包与工具重新满足“包身份、模块版本、替换、校验和、工具链与构建输出必须可重建且相互一致”且无残留状态",
    },
  ],
  experiments: [
    {
      name: "第3章 包与工具首版历史复现",
      setup: "Manning正式目录、官方示例固定提交49fc99e与匹配时代的隔离工具链",
      prediction:
        "可以核对包命名、import、init、Go工具、协作、vendoring、gb与当前modules的历史问题和示例身份，并交付模块图、go env快照、go.mod/go.sum、工具输出、二进制哈希和迁移差分。",
      boundary:
        "官方示例仓库无LICENSE；只做结构和行为核对，不复制原文、代码或图像，也不把当前结论写成作者观点。",
    },
    {
      name: "第3章 包与工具当前Go迁移",
      setup: "当前规范标示go1.26，记录go.mod语言版本、工具链、依赖图与平台",
      prediction:
        "接口与工具可能变化，但实验仍必须守住“包身份、模块版本、替换、校验和、工具链与构建输出必须可重建且相互一致”。",
      boundary:
        "modules、generics、循环变量、fuzz、slog等新能力属于当前迁移轨道，不属于2015首版正文。",
    },
    {
      name: "第3章 包与工具单故障恢复",
      setup: "干净仓库、固定输入、明确超时、goroutine/文件清理与原始工件目录",
      prediction:
        "只注入“把gb或仅vendor目录当成当前依赖真值，却遗漏go.mod、go.sum与工具链版本”后，首个分岔可定位，撤销后同输入恢复。",
      boundary:
        "无法固定工具链、依赖、网络、时钟或基线时，结论只能标记未知，不能调分或补叙事。",
    },
  ],
  baselineTrace: [
    "第3章 包与工具基线1：冻结版本与输入，观察第3章 包与工具的版本表、输入哈希、能力清单与缺失条件。",
    "第3章 包与工具基线2：建立参考状态，观察第3章 包与工具的构建、运行、状态轨迹与成功条件。",
    "第3章 包与工具基线3：注入单一迁移，观察第3章 包与工具相对参考状态的首个分岔、传播路径与竞争性解释。",
    "第3章 包与工具基线4：撤销并同输入恢复，观察第3章 包与工具重新满足“包身份、模块版本、替换、校验和、工具链与构建输出必须可重建且相互一致”且无残留状态。",
  ],
  faultTrace: [
    "第3章 包与工具故障1：冻结版本与输入只追踪“把gb或仅vendor目录当成当前依赖真值，却遗漏go.mod、go.sum与工具链版本”，核对尚未执行，只建立可重建身份与预注册预测。",
    "第3章 包与工具故障2：建立参考状态只追踪“把gb或仅vendor目录当成当前依赖真值，却遗漏go.mod、go.sum与工具链版本”，核对第3章 包与工具的包图、值、goroutine、资源和测试基线。",
    "第3章 包与工具故障3：注入单一迁移只追踪“把gb或仅vendor目录当成当前依赖真值，却遗漏go.mod、go.sum与工具链版本”，核对第3章 包与工具最靠近该变量的语言、包、值、同步或工件状态。",
    "第3章 包与工具故障4：撤销并同输入恢复只追踪“把gb或仅vendor目录当成当前依赖真值，却遗漏go.mod、go.sum与工具链版本”，核对第3章 包与工具的最终状态、残留goroutine、文件、缓存与资源。",
  ],
  recoveryTrace: [
    "第3章 包与工具恢复1：读取身份和初始状态，不修改源码、依赖或运行对象，重新验证第3章 包与工具的版本表、输入哈希、能力清单与缺失条件。",
    "第3章 包与工具恢复2：只执行预注册参考路径，不注入故障，重新验证第3章 包与工具的构建、运行、状态轨迹与成功条件。",
    "第3章 包与工具恢复3：一次只改变一个源码、依赖、调度或输入条件，重新验证第3章 包与工具相对参考状态的首个分岔、传播路径与竞争性解释。",
    "第3章 包与工具恢复4：恢复受控源并重建，不直接修补生成物或测试输出，重新验证第3章 包与工具重新满足“包身份、模块版本、替换、校验和、工具链与构建输出必须可重建且相互一致”且无残留状态。",
  ],
  gates: [
    {
      label: "原版、目录与许可门",
      detail:
        "第3章 包与工具只用Manning正式目录限定覆盖，以官方示例固定提交核对历史身份；无LICENSE代码和不可访问正文均不复制。",
    },
    {
      label: "语言版本与工具链门",
      detail:
        "第3章 包与工具分开2015首版和当前go1.26轨道，记录go.mod语言版本、go version、GOOS/GOARCH、依赖图与构建参数。",
    },
    {
      label: "状态、首错与证伪门",
      detail:
        "第3章 包与工具只改变“把gb或仅vendor目录当成当前依赖真值，却遗漏go.mod、go.sum与工具链版本”，保存首个程序状态分岔、原始工件、竞争性解释和检测盲区。",
    },
    {
      label: "恢复、残留与发布门",
      detail:
        "第3章 包与工具撤销后以同一输入重建并恢复基线，交付模块图、go env快照、go.mod/go.sum、工具输出、二进制哈希和迁移差分，同时报告失败、残留与未知项。",
    },
  ],
} as const satisfies GoSemanticsEvidenceModel;

export function GiaPackagingToolingVersionContractLab() {
  return <GoSemanticsEvidenceLab model={model} view="version-contract" />;
}

export function GiaPackagingToolingStateTraceLab() {
  return <GoSemanticsEvidenceLab model={model} view="state-trace" />;
}

export function GiaPackagingToolingEvidenceGateLab() {
  return <GoSemanticsEvidenceLab model={model} view="evidence-gate" />;
}
