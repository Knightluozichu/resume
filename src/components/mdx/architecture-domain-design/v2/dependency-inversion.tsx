"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "architecturedomaindesign-03",
  title: "依赖倒置与架构边界",
  focus:
    "区分运行时控制流与编译时源码依赖，并用边界接口让控制流跨越边界而源码仍指向内层政策",
  invariant:
    "跨边界接口由内层需要定义，外层实现依赖该接口，内层源码不引用外层框架类型",
  fault: "控制器直接返回 ORM 实体并让业务用例 import Web 与数据库包",
  evidence:
    "构建依赖图、端口所有权、请求响应数据结构、插件替换测试与控制流时序",
  concepts: [
    "源码依赖与控制流",
    "稳定抽象",
    "边界接口",
    "插件架构",
    "跨边界数据",
  ],
  zones: [
    {
      label: "内层政策",
      detail: "拥有用例接口和边界数据",
    },
    {
      label: "接口边界",
      detail: "控制流穿越，源码依赖向内",
    },
    {
      label: "外层插件",
      detail: "实现接口并适配具体技术",
    },
  ],
  trace: [
    "标出控制流",
    "画出源码依赖",
    "把接口移到内层",
    "定义边界数据",
    "替换外层插件",
  ],
  scenarios: [
    {
      label: "展示订单结果",
      input: "用例完成后需要把结果交给 Web Presenter",
      expected: "用例调用内层定义的输出端口，外层 Presenter 实现该端口",
    },
    {
      label: "替换持久化",
      input: "Repository 从 SQL 改为远程 API",
      expected: "外层实现变化，核心用例与其输入输出合同保持不变",
    },
  ],
} satisfies ArchitectureCourseModel;

export function DependencyInversionBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function DependencyInversionTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function DependencyInversionViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
