"use client";

import {
  GoSemanticsEvidenceLab,
  type GoSemanticsEvidenceModel,
} from "@/components/mdx/go-in-action/v2/go-semantics-evidence-lab";

const model = {
  unitId: "gia-02",
  title: "第2章 Go快速入门",
  question: "完整Go程序的package、init、接口与错误怎样形成可追踪执行路径？",
  concepts: [
    "Chapter 2 · Go quick-start",
    "Go quick-start",
    "program architecture",
    "main package",
    "search package",
    "search.go, feed.go, match.go and default.go",
    "RSS matcher",
    "types variables functions and methods",
    "goroutines interfaces and errors",
  ],
  invariant:
    "每个运行行为都能回溯到确定包、初始化边、输入数据、接口实现和错误路径",
  fault: "删除承担注册副作用的空白导入，却仍假定matcher已经存在",
  artifact: "包图、init顺序、接口分派表、输入快照、错误链和同输入回归",
  stages: [
    {
      label: "冻结版本与输入",
      input:
        "第2章 Go快速入门的源码提交、go语言版本、工具链、依赖图、GOOS/GOARCH和固定数据",
      state: "尚未执行，只建立可重建身份与预注册预测",
      transition: "读取身份和初始状态，不修改源码、依赖或运行对象",
      observation: "第2章 Go快速入门的版本表、输入哈希、能力清单与缺失条件",
    },
    {
      label: "建立参考状态",
      input:
        "在干净缓存或明确缓存身份下执行：从官方RSS搜索示例的main入口出发，画出包导入、init注册、接口分派、goroutine和错误返回的先后关系",
      state: "第2章 Go快速入门的包图、值、goroutine、资源和测试基线",
      transition: "只执行预注册参考路径，不注入故障",
      observation: "第2章 Go快速入门的构建、运行、状态轨迹与成功条件",
    },
    {
      label: "注入单一迁移",
      input:
        "保持其余身份不变，只注入“删除承担注册副作用的空白导入，却仍假定matcher已经存在”",
      state: "第2章 Go快速入门最靠近该变量的语言、包、值、同步或工件状态",
      transition: "一次只改变一个源码、依赖、调度或输入条件",
      observation:
        "第2章 Go快速入门相对参考状态的首个分岔、传播路径与竞争性解释",
    },
    {
      label: "撤销并同输入恢复",
      input: "撤销唯一变量，从干净状态以相同源码、依赖、输入和环境重放",
      state: "第2章 Go快速入门的最终状态、残留goroutine、文件、缓存与资源",
      transition: "恢复受控源并重建，不直接修补生成物或测试输出",
      observation:
        "第2章 Go快速入门重新满足“每个运行行为都能回溯到确定包、初始化边、输入数据、接口实现和错误路径”且无残留状态",
    },
  ],
  experiments: [
    {
      name: "第2章 Go快速入门首版历史复现",
      setup: "Manning正式目录、官方示例固定提交49fc99e与匹配时代的隔离工具链",
      prediction:
        "可以核对程序架构、main、search package、四个源文件、RSS matcher、接口、goroutine与错误的历史问题和示例身份，并交付包图、init顺序、接口分派表、输入快照、错误链和同输入回归。",
      boundary:
        "官方示例仓库无LICENSE；只做结构和行为核对，不复制原文、代码或图像，也不把当前结论写成作者观点。",
    },
    {
      name: "第2章 Go快速入门当前Go迁移",
      setup: "当前规范标示go1.26，记录go.mod语言版本、工具链、依赖图与平台",
      prediction:
        "接口与工具可能变化，但实验仍必须守住“每个运行行为都能回溯到确定包、初始化边、输入数据、接口实现和错误路径”。",
      boundary:
        "modules、generics、循环变量、fuzz、slog等新能力属于当前迁移轨道，不属于2015首版正文。",
    },
    {
      name: "第2章 Go快速入门单故障恢复",
      setup: "干净仓库、固定输入、明确超时、goroutine/文件清理与原始工件目录",
      prediction:
        "只注入“删除承担注册副作用的空白导入，却仍假定matcher已经存在”后，首个分岔可定位，撤销后同输入恢复。",
      boundary:
        "无法固定工具链、依赖、网络、时钟或基线时，结论只能标记未知，不能调分或补叙事。",
    },
  ],
  baselineTrace: [
    "第2章 Go快速入门基线1：冻结版本与输入，观察第2章 Go快速入门的版本表、输入哈希、能力清单与缺失条件。",
    "第2章 Go快速入门基线2：建立参考状态，观察第2章 Go快速入门的构建、运行、状态轨迹与成功条件。",
    "第2章 Go快速入门基线3：注入单一迁移，观察第2章 Go快速入门相对参考状态的首个分岔、传播路径与竞争性解释。",
    "第2章 Go快速入门基线4：撤销并同输入恢复，观察第2章 Go快速入门重新满足“每个运行行为都能回溯到确定包、初始化边、输入数据、接口实现和错误路径”且无残留状态。",
  ],
  faultTrace: [
    "第2章 Go快速入门故障1：冻结版本与输入只追踪“删除承担注册副作用的空白导入，却仍假定matcher已经存在”，核对尚未执行，只建立可重建身份与预注册预测。",
    "第2章 Go快速入门故障2：建立参考状态只追踪“删除承担注册副作用的空白导入，却仍假定matcher已经存在”，核对第2章 Go快速入门的包图、值、goroutine、资源和测试基线。",
    "第2章 Go快速入门故障3：注入单一迁移只追踪“删除承担注册副作用的空白导入，却仍假定matcher已经存在”，核对第2章 Go快速入门最靠近该变量的语言、包、值、同步或工件状态。",
    "第2章 Go快速入门故障4：撤销并同输入恢复只追踪“删除承担注册副作用的空白导入，却仍假定matcher已经存在”，核对第2章 Go快速入门的最终状态、残留goroutine、文件、缓存与资源。",
  ],
  recoveryTrace: [
    "第2章 Go快速入门恢复1：读取身份和初始状态，不修改源码、依赖或运行对象，重新验证第2章 Go快速入门的版本表、输入哈希、能力清单与缺失条件。",
    "第2章 Go快速入门恢复2：只执行预注册参考路径，不注入故障，重新验证第2章 Go快速入门的构建、运行、状态轨迹与成功条件。",
    "第2章 Go快速入门恢复3：一次只改变一个源码、依赖、调度或输入条件，重新验证第2章 Go快速入门相对参考状态的首个分岔、传播路径与竞争性解释。",
    "第2章 Go快速入门恢复4：恢复受控源并重建，不直接修补生成物或测试输出，重新验证第2章 Go快速入门重新满足“每个运行行为都能回溯到确定包、初始化边、输入数据、接口实现和错误路径”且无残留状态。",
  ],
  gates: [
    {
      label: "原版、目录与许可门",
      detail:
        "第2章 Go快速入门只用Manning正式目录限定覆盖，以官方示例固定提交核对历史身份；无LICENSE代码和不可访问正文均不复制。",
    },
    {
      label: "语言版本与工具链门",
      detail:
        "第2章 Go快速入门分开2015首版和当前go1.26轨道，记录go.mod语言版本、go version、GOOS/GOARCH、依赖图与构建参数。",
    },
    {
      label: "状态、首错与证伪门",
      detail:
        "第2章 Go快速入门只改变“删除承担注册副作用的空白导入，却仍假定matcher已经存在”，保存首个程序状态分岔、原始工件、竞争性解释和检测盲区。",
    },
    {
      label: "恢复、残留与发布门",
      detail:
        "第2章 Go快速入门撤销后以同一输入重建并恢复基线，交付包图、init顺序、接口分派表、输入快照、错误链和同输入回归，同时报告失败、残留与未知项。",
    },
  ],
} as const satisfies GoSemanticsEvidenceModel;

export function GiaQuickStartVersionContractLab() {
  return <GoSemanticsEvidenceLab model={model} view="version-contract" />;
}

export function GiaQuickStartStateTraceLab() {
  return <GoSemanticsEvidenceLab model={model} view="state-trace" />;
}

export function GiaQuickStartEvidenceGateLab() {
  return <GoSemanticsEvidenceLab model={model} view="evidence-gate" />;
}
