"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "architecturedomaindesign-09",
  title: "战略模式：上下文映射",
  focus:
    "先记录上下文之间真实的模型与团队关系，再按控制力、协作成本和翻译需求选择集成模式",
  invariant:
    "每条上下文关系都有方向、所有者和语义合同，任何共享或遵奉选择都明确其变化传播代价",
  fault: "把 Context Map 画成无方向的系统调用拓扑，忽略上下游权力和模型翻译",
  evidence:
    "上下文地图、上下游方向、团队承诺、共享代码所有者、翻译测试、发布语言版本与退出条件",
  concepts: [
    "上下文映射",
    "共享内核",
    "客户—供应商",
    "遵奉者",
    "防腐层",
    "开放主机服务与发布语言",
    "各行其道",
    "大泥球",
  ],
  zones: [
    {
      label: "上游模型",
      detail: "决定能力、发布节奏与交换合同",
    },
    {
      label: "关系策略",
      detail: "共享、协商、遵奉、翻译或分离",
    },
    {
      label: "下游模型",
      detail: "决定接受、保护或拒绝外部语义",
    },
  ],
  trace: [
    "盘点上下文",
    "标出上下游",
    "评估控制力",
    "选择关系模式",
    "定义版本与退出条件",
  ],
  scenarios: [
    {
      label: "支付平台接入",
      input: "支付上游无法按订单团队的术语修改接口",
      expected: "订单侧建立防腐层，把支付状态翻译为本地履约语言",
    },
    {
      label: "共享税则模型",
      input: "两个团队共同维护很小且高价值的税率计算内核",
      expected: "明确共享内核所有者、联合测试和变更协商，不扩大共享范围",
    },
  ],
} satisfies ArchitectureCourseModel;

export function StrategicPatternsBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function StrategicPatternsTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function StrategicPatternsViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
