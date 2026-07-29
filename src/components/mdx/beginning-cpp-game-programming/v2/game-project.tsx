"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-15",
  title: "第 15 章：Run!、Factory 与组件式对象",
  focus:
    "让 Factory 验证并组装 GameObject、Transform、Update 与 Graphics 行为，用 unique_ptr 原子提交完整对象",
  invariant:
    "半构造对象不可进入世界；每个 GameObject 只有一个所有者，主循环只依赖统一更新与绘制合同",
  fault:
    "Factory 在资源加载完成前先把对象放入世界，随后失败留下缺少 Graphics 组件的实体",
  evidence: "创建请求、资源查找结果、组件清单、unique_ptr 移交点和每帧接口调用",
  concepts: [
    "无尽跑酷（endless runner）",
    "factory 类（factory class）",
    "继承与多态（inheritance and polymorphism）",
    "设计模式（design patterns）",
    "实体组件系统（entity component system）",
  ],
  zones: [
    {
      label: "创建请求",
      detail: "实体类型、资源键与生成参数",
    },
    {
      label: "Factory 装配",
      detail: "Transform、Update、Graphics 与验证",
    },
    {
      label: "世界提交",
      detail: "unique_ptr 所有权和统一主循环",
    },
  ],
  trace: ["解析请求", "加载依赖", "组装组件", "验证合同", "提交所有权"],
  scenarios: [
    {
      label: "创建完整平台",
      input: "Factory 收到合法类型、纹理与 Transform 参数",
      expected: "完整对象一次性进入世界并响应统一 update/draw",
    },
    {
      label: "缺失图形资源",
      input: "创建请求引用不存在的纹理键",
      expected: "Factory 返回失败，世界对象数量和所有权图保持不变",
    },
  ],
} satisfies CppGameBuildModel;

export function GameProjectPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function GameProjectFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function GameProjectFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
