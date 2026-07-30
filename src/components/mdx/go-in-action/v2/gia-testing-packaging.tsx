"use client";

import {
  GoSemanticsEvidenceLab,
  type GoSemanticsEvidenceModel,
} from "@/components/mdx/go-in-action/v2/go-semantics-evidence-lab";

const model = {
  unitId: "gia-09",
  title: "第9章 测试和性能",
  question: "单元测试、HTTP测试、Example与benchmark怎样形成可重复发布证据？",
  concepts: [
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
    "测试结论必须绑定工具链、源码、输入、缓存、环境、原始样本、失败seed和统计方法",
  fault: "用单次benchmark或缓存PASS宣称性能和正确性均已证明",
  artifact:
    "测试矩阵、HTTP transcript、Example输出、fuzz seed、race/coverage工件与benchstat比较",
  stages: [
    {
      label: "冻结版本与输入",
      input:
        "第9章 测试和性能的源码提交、go语言版本、工具链、依赖图、GOOS/GOARCH和固定数据",
      state: "尚未执行，只建立可重建身份与预注册预测",
      transition: "读取身份和初始状态，不修改源码、依赖或运行对象",
      observation: "第9章 测试和性能的版本表、输入哈希、能力清单与缺失条件",
    },
    {
      label: "建立参考状态",
      input:
        "在干净缓存或明确缓存身份下执行：冻结工具链和输入，运行表驱动测试、httptest、Example、fuzz、race、coverage与多轮benchmark比较",
      state: "第9章 测试和性能的包图、值、goroutine、资源和测试基线",
      transition: "只执行预注册参考路径，不注入故障",
      observation: "第9章 测试和性能的构建、运行、状态轨迹与成功条件",
    },
    {
      label: "注入单一迁移",
      input:
        "保持其余身份不变，只注入“用单次benchmark或缓存PASS宣称性能和正确性均已证明”",
      state: "第9章 测试和性能最靠近该变量的语言、包、值、同步或工件状态",
      transition: "一次只改变一个源码、依赖、调度或输入条件",
      observation:
        "第9章 测试和性能相对参考状态的首个分岔、传播路径与竞争性解释",
    },
    {
      label: "撤销并同输入恢复",
      input: "撤销唯一变量，从干净状态以相同源码、依赖、输入和环境重放",
      state: "第9章 测试和性能的最终状态、残留goroutine、文件、缓存与资源",
      transition: "恢复受控源并重建，不直接修补生成物或测试输出",
      observation:
        "第9章 测试和性能重新满足“测试结论必须绑定工具链、源码、输入、缓存、环境、原始样本、失败seed和统计方法”且无残留状态",
    },
  ],
  experiments: [
    {
      name: "第9章 测试和性能首版历史复现",
      setup: "Manning正式目录、官方示例固定提交49fc99e与匹配时代的隔离工具链",
      prediction:
        "可以核对unit test、httptest、Example文档、benchmark、go test参数、fuzz、coverage与benchstat的历史问题和示例身份，并交付测试矩阵、HTTP transcript、Example输出、fuzz seed、race/coverage工件与benchstat比较。",
      boundary:
        "官方示例仓库无LICENSE；只做结构和行为核对，不复制原文、代码或图像，也不把当前结论写成作者观点。",
    },
    {
      name: "第9章 测试和性能当前Go迁移",
      setup: "当前规范标示go1.26，记录go.mod语言版本、工具链、依赖图与平台",
      prediction:
        "接口与工具可能变化，但实验仍必须守住“测试结论必须绑定工具链、源码、输入、缓存、环境、原始样本、失败seed和统计方法”。",
      boundary:
        "modules、generics、循环变量、fuzz、slog等新能力属于当前迁移轨道，不属于2015首版正文。",
    },
    {
      name: "第9章 测试和性能单故障恢复",
      setup: "干净仓库、固定输入、明确超时、goroutine/文件清理与原始工件目录",
      prediction:
        "只注入“用单次benchmark或缓存PASS宣称性能和正确性均已证明”后，首个分岔可定位，撤销后同输入恢复。",
      boundary:
        "无法固定工具链、依赖、网络、时钟或基线时，结论只能标记未知，不能调分或补叙事。",
    },
  ],
  baselineTrace: [
    "第9章 测试和性能基线1：冻结版本与输入，观察第9章 测试和性能的版本表、输入哈希、能力清单与缺失条件。",
    "第9章 测试和性能基线2：建立参考状态，观察第9章 测试和性能的构建、运行、状态轨迹与成功条件。",
    "第9章 测试和性能基线3：注入单一迁移，观察第9章 测试和性能相对参考状态的首个分岔、传播路径与竞争性解释。",
    "第9章 测试和性能基线4：撤销并同输入恢复，观察第9章 测试和性能重新满足“测试结论必须绑定工具链、源码、输入、缓存、环境、原始样本、失败seed和统计方法”且无残留状态。",
  ],
  faultTrace: [
    "第9章 测试和性能故障1：冻结版本与输入只追踪“用单次benchmark或缓存PASS宣称性能和正确性均已证明”，核对尚未执行，只建立可重建身份与预注册预测。",
    "第9章 测试和性能故障2：建立参考状态只追踪“用单次benchmark或缓存PASS宣称性能和正确性均已证明”，核对第9章 测试和性能的包图、值、goroutine、资源和测试基线。",
    "第9章 测试和性能故障3：注入单一迁移只追踪“用单次benchmark或缓存PASS宣称性能和正确性均已证明”，核对第9章 测试和性能最靠近该变量的语言、包、值、同步或工件状态。",
    "第9章 测试和性能故障4：撤销并同输入恢复只追踪“用单次benchmark或缓存PASS宣称性能和正确性均已证明”，核对第9章 测试和性能的最终状态、残留goroutine、文件、缓存与资源。",
  ],
  recoveryTrace: [
    "第9章 测试和性能恢复1：读取身份和初始状态，不修改源码、依赖或运行对象，重新验证第9章 测试和性能的版本表、输入哈希、能力清单与缺失条件。",
    "第9章 测试和性能恢复2：只执行预注册参考路径，不注入故障，重新验证第9章 测试和性能的构建、运行、状态轨迹与成功条件。",
    "第9章 测试和性能恢复3：一次只改变一个源码、依赖、调度或输入条件，重新验证第9章 测试和性能相对参考状态的首个分岔、传播路径与竞争性解释。",
    "第9章 测试和性能恢复4：恢复受控源并重建，不直接修补生成物或测试输出，重新验证第9章 测试和性能重新满足“测试结论必须绑定工具链、源码、输入、缓存、环境、原始样本、失败seed和统计方法”且无残留状态。",
  ],
  gates: [
    {
      label: "原版、目录与许可门",
      detail:
        "第9章 测试和性能只用Manning正式目录限定覆盖，以官方示例固定提交核对历史身份；无LICENSE代码和不可访问正文均不复制。",
    },
    {
      label: "语言版本与工具链门",
      detail:
        "第9章 测试和性能分开2015首版和当前go1.26轨道，记录go.mod语言版本、go version、GOOS/GOARCH、依赖图与构建参数。",
    },
    {
      label: "状态、首错与证伪门",
      detail:
        "第9章 测试和性能只改变“用单次benchmark或缓存PASS宣称性能和正确性均已证明”，保存首个程序状态分岔、原始工件、竞争性解释和检测盲区。",
    },
    {
      label: "恢复、残留与发布门",
      detail:
        "第9章 测试和性能撤销后以同一输入重建并恢复基线，交付测试矩阵、HTTP transcript、Example输出、fuzz seed、race/coverage工件与benchstat比较，同时报告失败、残留与未知项。",
    },
  ],
} as const satisfies GoSemanticsEvidenceModel;

export function GiaTestingPackagingVersionContractLab() {
  return <GoSemanticsEvidenceLab model={model} view="version-contract" />;
}

export function GiaTestingPackagingStateTraceLab() {
  return <GoSemanticsEvidenceLab model={model} view="state-trace" />;
}

export function GiaTestingPackagingEvidenceGateLab() {
  return <GoSemanticsEvidenceLab model={model} view="evidence-gate" />;
}
