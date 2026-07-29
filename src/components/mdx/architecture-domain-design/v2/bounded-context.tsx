"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "architecturedomaindesign-07",
  title: "限界上下文",
  focus:
    "为一个模型和一套通用语言划定明确适用范围，并在边界外通过翻译维护各自模型完整性",
  invariant:
    "上下文内部术语含义一致且持续集成，跨上下文数据必须经过显式映射或协议",
  fault: "以微服务数量、代码仓库或数据库 schema 自动代替模型边界",
  evidence:
    "上下文名称、语言词典、所有者、边界接口、翻译映射、集成测试与模型冲突记录",
  concepts: ["限界上下文", "显式边界", "持续集成", "翻译", "局部通用语言"],
  zones: [
    {
      label: "订单上下文",
      detail: "客户是下单与履约参与者",
    },
    {
      label: "翻译边界",
      detail: "映射身份、状态和允许的语义损失",
    },
    {
      label: "风控上下文",
      detail: "客户是被评估的风险主体",
    },
  ],
  trace: [
    "发现术语冲突",
    "声明上下文",
    "指定模型所有者",
    "设计翻译",
    "持续集成验证",
  ],
  scenarios: [
    {
      label: "客户含义冲突",
      input: "订单关心收货资料，风控关心主体与风险关系",
      expected: "分别建模并在边界映射标识，不共享一个不断膨胀的 Customer",
    },
    {
      label: "仓库共用",
      input: "两个团队共用代码仓库但业务语言完全不同",
      expected: "仓库不是模型边界证据，仍需显式上下文和翻译合同",
    },
  ],
} satisfies ArchitectureCourseModel;

export function BoundedContextBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function BoundedContextTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function BoundedContextViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
