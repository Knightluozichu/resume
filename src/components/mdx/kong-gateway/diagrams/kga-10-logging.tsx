import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第10章 Kong网关日志",
  focus:
    "区分访问与错误日志、日志级别，接入ELK并按请求关联标识定制Kong和ELK字段",
  invariant:
    "一次请求可从Kong访问日志、错误日志到Elasticsearch文档端到端关联，丢失、重复和敏感字段有检测",
  artifact:
    "日志分类与级别表、ELK管道拓扑、字段契约、关联查询、丢失率和脱敏验收",
  nodes: [
    "Kong网关日志简介",
    "Kong网关日志分类",
    "Kong网关日志级别",
    "Kong网关结合日志平台",
    "ELK方案简介",
    "Kong网关结合ELK",
    "日志系统使用场景",
    "自定义日志",
    "Kong网关定制日志",
    "ELK定制日志",
    "小结",
    "本章小结",
  ],
} as const;

export function Kga10LoggingRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga10LoggingRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga10LoggingEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
