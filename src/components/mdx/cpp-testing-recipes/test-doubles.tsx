"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "替身的起点是不可控依赖，不是框架语法",
    mechanism:
      "订单到期提醒需要读取当前时间并发送通知。若领域对象直接调用系统时钟和 SMTP，测试只能等待真实日期、配置邮件服务器，并承担网络失败。这样的测试慢、非确定，失败也无法区分业务规则与基础设施。",
    failure:
      "若把「替身的起点是不可控依赖，不是框架语法」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「替身的起点是不可控依赖，不是框架语法」是否提供快速反馈。",
  },
  {
    label: "测试替身是角色，不是一个万能 mock",
    mechanism:
      "fake 是简化但可运行的实现，stub 返回预定查询值，spy 记录调用供事后检查，mock 预先声明交互期望并在调用时验证。一个对象可能兼有角色，但测试应说明它在当前场景承担哪项责任。",
    failure:
      "若把「测试替身是角色，不是一个万能 mock」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「测试替身是角色，不是一个万能 mock」是否提供快速反馈。",
  },
  {
    label: "先写窄端口，再选择实现",
    mechanism:
      "接口应由调用者需求驱动，不照搬大型第三方 API。时钟只需要 now() ；通知端口只需要领域可理解的 send 。窄接口减少替身工作，也让生产适配器隔离 SMTP、SDK 或系统调用细节。",
    failure:
      "若把「先写窄端口，再选择实现」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「先写窄端口，再选择实现」是否提供快速反馈。",
  },
];

export function TestDoublesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 5：Test Doubles：机制与证据"
      prompt="切换《Chapter 5：Test Doubles》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 5：Test Doubles》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function TestDoublesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 5：Test Doubles：机制路径"
      stages={STAGES}
    />
  );
}

export function TestDoublesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 5：Test Doubles：失效与核验"
      stages={STAGES}
    />
  );
}
