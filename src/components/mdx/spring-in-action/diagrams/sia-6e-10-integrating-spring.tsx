import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-10-integrating-spring",
  "title": "第10章 Spring Integration",
  "concepts": [
    "10 Integrating Spring",
    "10.1 Declaring a simple integration flow",
    "10.1.1 Defining integration flows with XML",
    "10.1.2 Configuring integration flows in Java",
    "10.1.3 Using Spring Integration’s DSL configuration",
    "10.2 Surveying the Spring Integration landscape",
    "10.2.1 Message channels",
    "10.2.2 Filters",
    "10.2.3 Transformers",
    "10.2.4 Routers",
    "10.2.5 Splitters",
    "10.2.6 Service activators",
    "10.2.7 Gateways",
    "10.2.8 Channel adapters",
    "10.2.9 Endpoint modules",
    "10.3 Creating an email integration flow",
    "Summary"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "Integration通道拓扑台",
    "boundary": "gateway → channel → filter/router/transformer → adapter",
    "axisA": {
      "label": "通道类型",
      "levels": [
        "Direct",
        "Queue",
        "PublishSubscribe"
      ]
    },
    "axisB": {
      "label": "端点行为",
      "levels": [
        "过滤",
        "路由",
        "转换"
      ]
    },
    "fault": "路由无默认分支，无法处理的消息被静默丢弃",
    "invariant": "每个通道和端点都声明容量、错误通道、超时与无法路由时的结果",
    "signal": "message headers、errorChannel与端点计数",
    "practiceMode": "code",
    "metric": "Integration通道拓扑台合同命中率",
    "risk": "端点行为暴露风险",
    "task": "用消息、通道与端点组合过滤、转换、路由、拆分、网关和适配器，显式表达企业集成模式；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "集成流拓扑、消息模式、通道容量预算、端点合同测试和邮件故障回放"
  }
} as const;

export function Sia610IntegratingSpringMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia610IntegratingSpringExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia610IntegratingSpringEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
