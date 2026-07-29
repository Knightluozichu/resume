"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "architecturedomaindesign-05",
  title: "整洁架构",
  focus:
    "把实体、用例、接口适配器和框架驱动器按政策层级组织，并让所有源码依赖只指向更内层",
  invariant:
    "跨圆环依赖向内，内层不知道外层名称；边界数据只包含内层可以理解的简单结构",
  fault:
    "用圆环数量做形式检查，却让实体注解 ORM、用例接收 HTTP Request 并返回数据库 Row",
  evidence: "源码依赖图、用例端口、边界 DTO、无框架测试、数据库和界面替换结果",
  concepts: [
    "实体",
    "用例",
    "接口适配器",
    "框架与驱动器",
    "依赖规则",
    "跨边界通信",
  ],
  zones: [
    {
      label: "实体与用例",
      detail: "企业政策和应用政策位于内层",
    },
    {
      label: "接口适配器",
      detail: "转换控制流与数据形状",
    },
    {
      label: "框架与驱动器",
      detail: "可替换的界面、数据库和设备",
    },
  ],
  trace: [
    "接收外部请求",
    "转换输入数据",
    "执行应用用例",
    "调用输出端口",
    "适配外部呈现",
  ],
  scenarios: [
    {
      label: "无 Web 测试",
      input: "不启动 HTTP Server，直接执行创建订单用例",
      expected: "输入端口接收简单请求模型，实体和用例独立完成规则",
    },
    {
      label: "数据库迁移",
      input: "从 SQL Gateway 切换到内存 Gateway",
      expected: "实体和用例不变，接口适配器替换且合同测试继续通过",
    },
  ],
} satisfies ArchitectureCourseModel;

export function CleanArchitectureBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function CleanArchitectureTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function CleanArchitectureViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
