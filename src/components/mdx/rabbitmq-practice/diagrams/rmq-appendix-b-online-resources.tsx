import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "附录B 在线资源",
  focus:
    "按网站、博客、AMQP库、开源项目、讨论组和邮件列表建立与2012年原书对应的资源索引及失效替代记录",
  invariant:
    "每个资源标明原书用途、访问状态、版本适用性和可替代的一手资料，不把后来文档的行为倒灌为RabbitMQ 2.7事实",
  artifact: "资源清单、链接状态、版本标签、归档证据与官方替代路径",
  nodes: [
    "你应知道的网站",
    "博客",
    "AMQP库与相关开源项目",
    "讨论与邮件列表",
    "总结",
  ],
} as const;

export function RmqAppendixBOnlineResourcesTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function RmqAppendixBOnlineResourcesDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function RmqAppendixBOnlineResourcesEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
