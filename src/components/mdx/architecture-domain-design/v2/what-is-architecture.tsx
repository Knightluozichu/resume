"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "architecturedomaindesign-01",
  title: "什么是架构",
  focus:
    "从系统行为与结构、政策与细节、边界与依赖三组坐标判断一项决策是否具有架构影响",
  invariant:
    "业务政策不因界面、数据库或框架替换而失效，关键行为可以在外部细节缺席时验证",
  fault: "把当前框架、部署拓扑或数据库品牌直接等同于系统架构",
  evidence:
    "依赖清单、组件职责、关键用例测试、替换实验与被推迟的不可逆决策记录",
  concepts: [
    "策略与细节",
    "行为与结构",
    "边界与组件",
    "保持选择余地",
    "可测试性与可替换性",
  ],
  zones: [
    {
      label: "业务政策",
      detail: "定义系统目的与稳定规则",
    },
    {
      label: "应用边界",
      detail: "编排用例并隔离变化",
    },
    {
      label: "外部细节",
      detail: "界面、数据库、框架与设备",
    },
  ],
  trace: [
    "列出关键行为",
    "识别变化原因",
    "划出组件边界",
    "反转细节依赖",
    "执行替换测试",
  ],
  scenarios: [
    {
      label: "替换数据库",
      input: "订单规则不变，只把关系数据库改为文档存储",
      expected: "业务政策与用例测试不变，改动集中在外部适配器",
    },
    {
      label: "新增界面",
      input: "在既有 Web 入口之外增加批处理入口",
      expected: "新入口调用同一应用边界，不复制业务规则",
    },
  ],
} satisfies ArchitectureCourseModel;

export function WhatIsArchitectureBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function WhatIsArchitectureTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function WhatIsArchitectureViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
