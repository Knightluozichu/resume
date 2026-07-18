import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第18章 发布与订阅",
  focus:
    "追踪频道字典、模式链表、订阅状态和PUBLISH扇出，并明确Pub/Sub不持久化消息",
  invariant:
    "订阅与退订更新双向关系，发送只到当前匹配客户端，断线消息不被错误承诺可恢复",
  artifact: "频道模式结构图、匹配与扇出实验、断线丢失验证和订阅清理",
  nodes: [
    "频道的订阅与退订",
    "模式的订阅与退订",
    "发送消息",
    "查看订阅信息",
    "重点回顾",
    "参考资料",
  ],
};

export function Rdi18PubsubStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi18PubsubTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi18PubsubEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
