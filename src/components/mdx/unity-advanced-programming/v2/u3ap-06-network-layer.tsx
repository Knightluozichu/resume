"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = {
  unitId: "u3ap-unit-06",
  title: "第6章 网络层",
  question:
    "TCP、UDP、HTTP、数据协议与同步方案怎样从消息语义和故障模型推导，而不是按速度标签选择？",
  concepts: [
    "第6章 网络层",
    "TCP 还是 UDP",
    "实现 TCP",
    "实现 UDP",
    "封装 HTTP",
    "数据协议原理",
    "网络同步解决方案",
  ],
  invariant:
    "帧边界明确，序号和权威状态单调，重复可处理，超时重试不破坏业务语义",
  fault: "把TCP读取当完整消息、把UDP当可靠通道、对非幂等HTTP操作盲目重试",
  artifact: "消息schema、传输选择表、字节帧轨迹、故障矩阵、重连与权威同步回放",
  experiment: "network",
  stages: [
    {
      label: "定义消息",
      input: "业务事件与状态",
      action: "写schema和幂等性",
      signal: "消息目录",
      check: "语义唯一",
    },
    {
      label: "选择传输",
      input: "可靠性与时效要求",
      action: "映射到字节流或数据报",
      signal: "选择记录",
      check: "故障模型匹配",
    },
    {
      label: "注入网络故障",
      input: "确定性消息流",
      action: "改变一种链路条件",
      signal: "收发轨迹",
      check: "首偏离可定位",
    },
    {
      label: "恢复权威状态",
      input: "重连客户端",
      action: "应用快照和增量",
      signal: "状态摘要",
      check: "与服务器一致",
    },
  ],
  gates: [
    {
      label: "来源与版本身份",
      detail:
        "保存索引只限定结构；当前结论记录Unity、包、脚本后端、渲染管线和API文档版本。",
    },
    {
      label: "目标Player与设备",
      detail:
        "记录构建类型、平台、设备、系统、图形API、质量级别、分辨率和热/电源状态。",
    },
    {
      label: "基线与单变量",
      detail:
        "同一输入先建立稳定基线，每次只改变一个参数或注入一种故障并保存首个分岔。",
    },
    {
      label: "撤销与同输入恢复",
      detail:
        "清理资源、订阅、缓存和网络状态后，用同一输入恢复基线；无法恢复则拒绝发布。",
    },
  ],
} as const satisfies UnityAdvancedEvidenceModel;

export function U3ap06NetworkLayerVersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function U3ap06NetworkLayerBudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function U3ap06NetworkLayerCaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
