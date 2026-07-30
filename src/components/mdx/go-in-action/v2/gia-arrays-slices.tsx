"use client";

import {
  GoSemanticsEvidenceLab,
  type GoSemanticsEvidenceModel,
} from "@/components/mdx/go-in-action/v2/go-semantics-evidence-lab";

const model = {
  unitId: "gia-04",
  title: "第4章 数组、切片和映射",
  question: "数组复制、slice别名、append扩容与map操作怎样改变共享状态？",
  concepts: [
    "Chapter 4 · Arrays, slices, and maps",
    "arrays, slices, and maps",
    "array internals and fundamentals",
    "declaring initializing and working with arrays",
    "slice internals and fundamentals",
    "nil and empty slices",
    "append and capacity",
    "map internals and fundamentals",
    "map iteration deletion and function passing",
  ],
  invariant:
    "每次集合操作都必须说明值复制、别名、长度、容量、键可比较性和迭代顺序边界",
  fault: "把仍共享底层数组的slice当作独立副本并在调用方不可见处修改",
  artifact: "别名图、len/cap轨迹、append分岔、map快照、边界测试与恢复记录",
  stages: [
    {
      label: "冻结版本与输入",
      input:
        "第4章 数组、切片和映射的源码提交、go语言版本、工具链、依赖图、GOOS/GOARCH和固定数据",
      state: "尚未执行，只建立可重建身份与预注册预测",
      transition: "读取身份和初始状态，不修改源码、依赖或运行对象",
      observation:
        "第4章 数组、切片和映射的版本表、输入哈希、能力清单与缺失条件",
    },
    {
      label: "建立参考状态",
      input:
        "在干净缓存或明确缓存身份下执行：固定元素序列，记录数组值复制、slice长度容量与底层数组身份、append前后地址以及map增删迭代",
      state: "第4章 数组、切片和映射的包图、值、goroutine、资源和测试基线",
      transition: "只执行预注册参考路径，不注入故障",
      observation: "第4章 数组、切片和映射的构建、运行、状态轨迹与成功条件",
    },
    {
      label: "注入单一迁移",
      input:
        "保持其余身份不变，只注入“把仍共享底层数组的slice当作独立副本并在调用方不可见处修改”",
      state: "第4章 数组、切片和映射最靠近该变量的语言、包、值、同步或工件状态",
      transition: "一次只改变一个源码、依赖、调度或输入条件",
      observation:
        "第4章 数组、切片和映射相对参考状态的首个分岔、传播路径与竞争性解释",
    },
    {
      label: "撤销并同输入恢复",
      input: "撤销唯一变量，从干净状态以相同源码、依赖、输入和环境重放",
      state:
        "第4章 数组、切片和映射的最终状态、残留goroutine、文件、缓存与资源",
      transition: "恢复受控源并重建，不直接修补生成物或测试输出",
      observation:
        "第4章 数组、切片和映射重新满足“每次集合操作都必须说明值复制、别名、长度、容量、键可比较性和迭代顺序边界”且无残留状态",
    },
  ],
  experiments: [
    {
      name: "第4章 数组、切片和映射首版历史复现",
      setup: "Manning正式目录、官方示例固定提交49fc99e与匹配时代的隔离工具链",
      prediction:
        "可以核对数组、slice、nil/empty、append、capacity、map内部语义与当前泛型辅助包的历史问题和示例身份，并交付别名图、len/cap轨迹、append分岔、map快照、边界测试与恢复记录。",
      boundary:
        "官方示例仓库无LICENSE；只做结构和行为核对，不复制原文、代码或图像，也不把当前结论写成作者观点。",
    },
    {
      name: "第4章 数组、切片和映射当前Go迁移",
      setup: "当前规范标示go1.26，记录go.mod语言版本、工具链、依赖图与平台",
      prediction:
        "接口与工具可能变化，但实验仍必须守住“每次集合操作都必须说明值复制、别名、长度、容量、键可比较性和迭代顺序边界”。",
      boundary:
        "modules、generics、循环变量、fuzz、slog等新能力属于当前迁移轨道，不属于2015首版正文。",
    },
    {
      name: "第4章 数组、切片和映射单故障恢复",
      setup: "干净仓库、固定输入、明确超时、goroutine/文件清理与原始工件目录",
      prediction:
        "只注入“把仍共享底层数组的slice当作独立副本并在调用方不可见处修改”后，首个分岔可定位，撤销后同输入恢复。",
      boundary:
        "无法固定工具链、依赖、网络、时钟或基线时，结论只能标记未知，不能调分或补叙事。",
    },
  ],
  baselineTrace: [
    "第4章 数组、切片和映射基线1：冻结版本与输入，观察第4章 数组、切片和映射的版本表、输入哈希、能力清单与缺失条件。",
    "第4章 数组、切片和映射基线2：建立参考状态，观察第4章 数组、切片和映射的构建、运行、状态轨迹与成功条件。",
    "第4章 数组、切片和映射基线3：注入单一迁移，观察第4章 数组、切片和映射相对参考状态的首个分岔、传播路径与竞争性解释。",
    "第4章 数组、切片和映射基线4：撤销并同输入恢复，观察第4章 数组、切片和映射重新满足“每次集合操作都必须说明值复制、别名、长度、容量、键可比较性和迭代顺序边界”且无残留状态。",
  ],
  faultTrace: [
    "第4章 数组、切片和映射故障1：冻结版本与输入只追踪“把仍共享底层数组的slice当作独立副本并在调用方不可见处修改”，核对尚未执行，只建立可重建身份与预注册预测。",
    "第4章 数组、切片和映射故障2：建立参考状态只追踪“把仍共享底层数组的slice当作独立副本并在调用方不可见处修改”，核对第4章 数组、切片和映射的包图、值、goroutine、资源和测试基线。",
    "第4章 数组、切片和映射故障3：注入单一迁移只追踪“把仍共享底层数组的slice当作独立副本并在调用方不可见处修改”，核对第4章 数组、切片和映射最靠近该变量的语言、包、值、同步或工件状态。",
    "第4章 数组、切片和映射故障4：撤销并同输入恢复只追踪“把仍共享底层数组的slice当作独立副本并在调用方不可见处修改”，核对第4章 数组、切片和映射的最终状态、残留goroutine、文件、缓存与资源。",
  ],
  recoveryTrace: [
    "第4章 数组、切片和映射恢复1：读取身份和初始状态，不修改源码、依赖或运行对象，重新验证第4章 数组、切片和映射的版本表、输入哈希、能力清单与缺失条件。",
    "第4章 数组、切片和映射恢复2：只执行预注册参考路径，不注入故障，重新验证第4章 数组、切片和映射的构建、运行、状态轨迹与成功条件。",
    "第4章 数组、切片和映射恢复3：一次只改变一个源码、依赖、调度或输入条件，重新验证第4章 数组、切片和映射相对参考状态的首个分岔、传播路径与竞争性解释。",
    "第4章 数组、切片和映射恢复4：恢复受控源并重建，不直接修补生成物或测试输出，重新验证第4章 数组、切片和映射重新满足“每次集合操作都必须说明值复制、别名、长度、容量、键可比较性和迭代顺序边界”且无残留状态。",
  ],
  gates: [
    {
      label: "原版、目录与许可门",
      detail:
        "第4章 数组、切片和映射只用Manning正式目录限定覆盖，以官方示例固定提交核对历史身份；无LICENSE代码和不可访问正文均不复制。",
    },
    {
      label: "语言版本与工具链门",
      detail:
        "第4章 数组、切片和映射分开2015首版和当前go1.26轨道，记录go.mod语言版本、go version、GOOS/GOARCH、依赖图与构建参数。",
    },
    {
      label: "状态、首错与证伪门",
      detail:
        "第4章 数组、切片和映射只改变“把仍共享底层数组的slice当作独立副本并在调用方不可见处修改”，保存首个程序状态分岔、原始工件、竞争性解释和检测盲区。",
    },
    {
      label: "恢复、残留与发布门",
      detail:
        "第4章 数组、切片和映射撤销后以同一输入重建并恢复基线，交付别名图、len/cap轨迹、append分岔、map快照、边界测试与恢复记录，同时报告失败、残留与未知项。",
    },
  ],
} as const satisfies GoSemanticsEvidenceModel;

export function GiaArraysSlicesVersionContractLab() {
  return <GoSemanticsEvidenceLab model={model} view="version-contract" />;
}

export function GiaArraysSlicesStateTraceLab() {
  return <GoSemanticsEvidenceLab model={model} view="state-trace" />;
}

export function GiaArraysSlicesEvidenceGateLab() {
  return <GoSemanticsEvidenceLab model={model} view="evidence-gate" />;
}
