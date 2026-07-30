"use client";

import {
  GoSemanticsEvidenceLab,
  type GoSemanticsEvidenceModel,
} from "@/components/mdx/go-in-action/v2/go-semantics-evidence-lab";

const model = {
  unitId: "gia-07",
  title: "第7章 并发模式",
  question: "Runner、Pool与Work怎样获得有界生命周期、所有权与失败传播？",
  concepts: [
    "Chapter 7 · Concurrency patterns",
    "concurrency patterns",
    "Runner",
    "program lifetime timeout and interrupt",
    "Pooling",
    "reusable resource pool",
    "Work",
    "goroutine worker pool",
  ],
  invariant:
    "每个goroutine和资源都必须有创建者、停止信号、回收者、错误出口与有界等待",
  fault: "worker无界增长或首个错误后仍生产任务，导致取消不能收敛",
  artifact:
    "生命周期图、队列上限、deadline轨迹、首错传播、goroutine profile和资源回收表",
  stages: [
    {
      label: "冻结版本与输入",
      input:
        "第7章 并发模式的源码提交、go语言版本、工具链、依赖图、GOOS/GOARCH和固定数据",
      state: "尚未执行，只建立可重建身份与预注册预测",
      transition: "读取身份和初始状态，不修改源码、依赖或运行对象",
      observation: "第7章 并发模式的版本表、输入哈希、能力清单与缺失条件",
    },
    {
      label: "建立参考状态",
      input:
        "在干净缓存或明确缓存身份下执行：固定任务数、资源数、deadline与第一个失败，比较首版模式和context/errgroup实现的启动、停止与回收轨迹",
      state: "第7章 并发模式的包图、值、goroutine、资源和测试基线",
      transition: "只执行预注册参考路径，不注入故障",
      observation: "第7章 并发模式的构建、运行、状态轨迹与成功条件",
    },
    {
      label: "注入单一迁移",
      input:
        "保持其余身份不变，只注入“worker无界增长或首个错误后仍生产任务，导致取消不能收敛”",
      state: "第7章 并发模式最靠近该变量的语言、包、值、同步或工件状态",
      transition: "一次只改变一个源码、依赖、调度或输入条件",
      observation: "第7章 并发模式相对参考状态的首个分岔、传播路径与竞争性解释",
    },
    {
      label: "撤销并同输入恢复",
      input: "撤销唯一变量，从干净状态以相同源码、依赖、输入和环境重放",
      state: "第7章 并发模式的最终状态、残留goroutine、文件、缓存与资源",
      transition: "恢复受控源并重建，不直接修补生成物或测试输出",
      observation:
        "第7章 并发模式重新满足“每个goroutine和资源都必须有创建者、停止信号、回收者、错误出口与有界等待”且无残留状态",
    },
  ],
  experiments: [
    {
      name: "第7章 并发模式首版历史复现",
      setup: "Manning正式目录、官方示例固定提交49fc99e与匹配时代的隔离工具链",
      prediction:
        "可以核对Runner、程序寿命、timeout、interrupt、Pooling、资源池、Work与worker pool的历史问题和示例身份，并交付生命周期图、队列上限、deadline轨迹、首错传播、goroutine profile和资源回收表。",
      boundary:
        "官方示例仓库无LICENSE；只做结构和行为核对，不复制原文、代码或图像，也不把当前结论写成作者观点。",
    },
    {
      name: "第7章 并发模式当前Go迁移",
      setup: "当前规范标示go1.26，记录go.mod语言版本、工具链、依赖图与平台",
      prediction:
        "接口与工具可能变化，但实验仍必须守住“每个goroutine和资源都必须有创建者、停止信号、回收者、错误出口与有界等待”。",
      boundary:
        "modules、generics、循环变量、fuzz、slog等新能力属于当前迁移轨道，不属于2015首版正文。",
    },
    {
      name: "第7章 并发模式单故障恢复",
      setup: "干净仓库、固定输入、明确超时、goroutine/文件清理与原始工件目录",
      prediction:
        "只注入“worker无界增长或首个错误后仍生产任务，导致取消不能收敛”后，首个分岔可定位，撤销后同输入恢复。",
      boundary:
        "无法固定工具链、依赖、网络、时钟或基线时，结论只能标记未知，不能调分或补叙事。",
    },
  ],
  baselineTrace: [
    "第7章 并发模式基线1：冻结版本与输入，观察第7章 并发模式的版本表、输入哈希、能力清单与缺失条件。",
    "第7章 并发模式基线2：建立参考状态，观察第7章 并发模式的构建、运行、状态轨迹与成功条件。",
    "第7章 并发模式基线3：注入单一迁移，观察第7章 并发模式相对参考状态的首个分岔、传播路径与竞争性解释。",
    "第7章 并发模式基线4：撤销并同输入恢复，观察第7章 并发模式重新满足“每个goroutine和资源都必须有创建者、停止信号、回收者、错误出口与有界等待”且无残留状态。",
  ],
  faultTrace: [
    "第7章 并发模式故障1：冻结版本与输入只追踪“worker无界增长或首个错误后仍生产任务，导致取消不能收敛”，核对尚未执行，只建立可重建身份与预注册预测。",
    "第7章 并发模式故障2：建立参考状态只追踪“worker无界增长或首个错误后仍生产任务，导致取消不能收敛”，核对第7章 并发模式的包图、值、goroutine、资源和测试基线。",
    "第7章 并发模式故障3：注入单一迁移只追踪“worker无界增长或首个错误后仍生产任务，导致取消不能收敛”，核对第7章 并发模式最靠近该变量的语言、包、值、同步或工件状态。",
    "第7章 并发模式故障4：撤销并同输入恢复只追踪“worker无界增长或首个错误后仍生产任务，导致取消不能收敛”，核对第7章 并发模式的最终状态、残留goroutine、文件、缓存与资源。",
  ],
  recoveryTrace: [
    "第7章 并发模式恢复1：读取身份和初始状态，不修改源码、依赖或运行对象，重新验证第7章 并发模式的版本表、输入哈希、能力清单与缺失条件。",
    "第7章 并发模式恢复2：只执行预注册参考路径，不注入故障，重新验证第7章 并发模式的构建、运行、状态轨迹与成功条件。",
    "第7章 并发模式恢复3：一次只改变一个源码、依赖、调度或输入条件，重新验证第7章 并发模式相对参考状态的首个分岔、传播路径与竞争性解释。",
    "第7章 并发模式恢复4：恢复受控源并重建，不直接修补生成物或测试输出，重新验证第7章 并发模式重新满足“每个goroutine和资源都必须有创建者、停止信号、回收者、错误出口与有界等待”且无残留状态。",
  ],
  gates: [
    {
      label: "原版、目录与许可门",
      detail:
        "第7章 并发模式只用Manning正式目录限定覆盖，以官方示例固定提交核对历史身份；无LICENSE代码和不可访问正文均不复制。",
    },
    {
      label: "语言版本与工具链门",
      detail:
        "第7章 并发模式分开2015首版和当前go1.26轨道，记录go.mod语言版本、go version、GOOS/GOARCH、依赖图与构建参数。",
    },
    {
      label: "状态、首错与证伪门",
      detail:
        "第7章 并发模式只改变“worker无界增长或首个错误后仍生产任务，导致取消不能收敛”，保存首个程序状态分岔、原始工件、竞争性解释和检测盲区。",
    },
    {
      label: "恢复、残留与发布门",
      detail:
        "第7章 并发模式撤销后以同一输入重建并恢复基线，交付生命周期图、队列上限、deadline轨迹、首错传播、goroutine profile和资源回收表，同时报告失败、残留与未知项。",
    },
  ],
} as const satisfies GoSemanticsEvidenceModel;

export function GiaConcurrencyPatternsVersionContractLab() {
  return <GoSemanticsEvidenceLab model={model} view="version-contract" />;
}

export function GiaConcurrencyPatternsStateTraceLab() {
  return <GoSemanticsEvidenceLab model={model} view="state-trace" />;
}

export function GiaConcurrencyPatternsEvidenceGateLab() {
  return <GoSemanticsEvidenceLab model={model} view="evidence-gate" />;
}
