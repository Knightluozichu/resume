"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "architecturedomaindesign-04",
  title: "分层架构",
  focus:
    "按用户交互、用例编排、领域规则和技术实现分配职责，并让领域模型免受外层机制污染",
  invariant:
    "领域对象可以脱离用户界面和持久化技术表达业务规则，应用层只编排而不吞并领域知识",
  fault: "把四个目录名当成文件夹后仍允许领域层直接调用 SQL、HTTP 与界面控件",
  evidence:
    "层职责表、跨层调用记录、领域单元测试、持久化替换实验与业务规则归属清单",
  concepts: ["用户界面层", "应用层", "领域层", "基础设施层", "分层依赖方向"],
  zones: [
    {
      label: "交互与编排",
      detail: "界面解释请求，应用层组织用例",
    },
    {
      label: "领域模型",
      detail: "表达业务含义、状态与规则",
    },
    {
      label: "技术服务",
      detail: "持久化、消息与框架实现",
    },
  ],
  trace: [
    "接收用户意图",
    "编排应用任务",
    "执行领域规则",
    "调用技术端口",
    "呈现用例结果",
  ],
  scenarios: [
    {
      label: "修改计价规则",
      input: "阶梯折扣规则改变但数据库表结构不变",
      expected: "规则修改集中在领域层，应用层只继续编排计价用例",
    },
    {
      label: "更换入口",
      input: "把客服 Web 操作增加为夜间批处理任务",
      expected: "新增界面入口，共用应用用例与领域模型",
    },
  ],
} satisfies ArchitectureCourseModel;

export function LayeredArchitectureBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function LayeredArchitectureTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function LayeredArchitectureViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
