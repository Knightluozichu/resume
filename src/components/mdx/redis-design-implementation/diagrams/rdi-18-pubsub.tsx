import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-18-pubsub",
  "unitTitle": "第18章 发布与订阅",
  "concepts": [
    "频道的订阅与退订",
    "模式的订阅与退订",
    "发送消息",
    "查看订阅信息",
    "重点回顾",
    "参考资料"
  ],
  "stages": [
    "冻结3.0基线",
    "定位结构入口",
    "执行单变量变更",
    "注入边界故障",
    "恢复并对账"
  ],
  "focuses": [
    "频道的订阅与退订",
    "模式的订阅与退订",
    "发送消息",
    "查看订阅信息",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "频道与模式扇出台",
    "axisA": {
      "label": "订阅类型",
      "levels": [
        "精确频道",
        "模式",
        "两者重叠"
      ]
    },
    "axisB": {
      "label": "连接状态",
      "levels": [
        "在线",
        "退订",
        "断线"
      ]
    },
    "fault": "把Pub/Sub误当持久队列，向断线订阅者承诺补发历史消息",
    "command": "rg 'pubsubSubscribe|pubsubUnsubscribe|pubsubPublishMessage' src/pubsub.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "频道与模式扇出台一致率",
      "risk": "连接状态分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "订阅与退订更新双向关系，发送只到当前匹配客户端，断线消息不被错误承诺可恢复",
    "task": "交付频道模式结构图、匹配与扇出实验、断线丢失验证和订阅清理，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi18PubsubStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi18PubsubTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi18PubsubEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
