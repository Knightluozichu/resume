"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "architecturedomaindesign-02",
  title: "SOLID 原则回顾",
  focus:
    "把五条原则还原成管理变化来源、扩展方向、替换合同、接口负担和源码依赖的设计判断",
  invariant:
    "调用方依赖的合同在扩展与替换后仍成立，变化被限制在真正承担该责任的模块内",
  fault: "按首字母套模板，制造大量单方法接口和无业务含义的抽象层",
  evidence:
    "变化原因清单、替换合同测试、客户端依赖面、扩展差异与源码 import 图",
  concepts: [
    "单一职责原则（SRP）",
    "开闭原则（OCP）",
    "里氏替换原则（LSP）",
    "接口隔离原则（ISP）",
    "依赖倒置原则（DIP）",
  ],
  zones: [
    {
      label: "变化来源",
      detail: "SRP 区分不同参与者的修改",
    },
    {
      label: "行为合同",
      detail: "OCP、LSP 与 ISP 保护调用方",
    },
    {
      label: "依赖方向",
      detail: "DIP 让细节指向政策抽象",
    },
  ],
  trace: [
    "找变化参与者",
    "写调用合同",
    "构造替换样本",
    "缩小依赖面",
    "核对源码方向",
  ],
  scenarios: [
    {
      label: "折扣策略扩展",
      input: "新增会员折扣但结算调用方不应修改",
      expected: "新增策略实现并用同一合同测试替换，不让结算层识别具体类型",
    },
    {
      label: "胖接口拆分",
      input: "报表客户端被迫依赖写入和删除方法",
      expected: "按客户端需要分离查询接口，避免写模型变化触发报表重编译",
    },
  ],
} satisfies ArchitectureCourseModel;

export function SolidPrinciplesBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function SolidPrinciplesTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function SolidPrinciplesViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
