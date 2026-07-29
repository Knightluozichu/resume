"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "并发测试先分离“算什么”和“何时算”",
    mechanism:
      "GeoServer 接收位置查询并返回地理结果。查询计算本身可以是同步确定函数；只有吞吐或响应需求证明单线程不足时，才引入异步队列和线程池。若从一开始把领域逻辑、socket、队列和多个线程塞进同一测试，任何失败都难以定位。",
    failure:
      "若把「并发测试先分离“算什么”和“何时算”」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「并发测试先分离“算什么”和“何时算”」是否提供快速反馈。",
  },
  {
    label: "GeoServer 先有同步正确性基线",
    mechanism:
      "先对查询解析、距离计算、找最近点和错误输入写普通单元测试。同步版本提供正确性 oracle：后续并发批量结果应与同一输入的同步结果集合一致。这样并发测试无需复制领域算法。",
    failure:
      "若把「GeoServer 先有同步正确性基线」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「GeoServer 先有同步正确性基线」是否提供快速反馈。",
  },
  {
    label: "性能需求必须可测且不替代功能需求",
    mechanism:
      "“需要更快”不能驱动设计。写下基线与目标，例如：在 8 核参考环境、10000 个独立查询下，吞吐至少达到同步实现的 2 倍；队列满时 submit 在 10 ms 内返回拒绝；stop 后已接受任务全部完成并在 2 秒内 join。环境、负载和统计方法必须同时记录。",
    failure:
      "若把「性能需求必须可测且不替代功能需求」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「性能需求必须可测且不替代功能需求」是否提供快速反馈。",
  },
];

export function TddAndThreadingDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 9：TDD and Threading：机制与证据"
      prompt="切换《Chapter 9：TDD and Threading》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 9：TDD and Threading》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function TddAndThreadingMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 9：TDD and Threading：机制路径"
      stages={STAGES}
    />
  );
}

export function TddAndThreadingFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 9：TDD and Threading：失效与核验"
      stages={STAGES}
    />
  );
}
