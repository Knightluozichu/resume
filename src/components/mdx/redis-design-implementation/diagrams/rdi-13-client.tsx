import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-13-client",
  "unitTitle": "第13章 客户端",
  "concepts": [
    "客户端属性",
    "客户端的创建与关闭",
    "重点回顾"
  ],
  "stages": [
    "冻结3.0基线",
    "定位结构入口",
    "执行单变量变更",
    "注入边界故障",
    "恢复并对账"
  ],
  "focuses": [
    "客户端属性",
    "客户端的创建与关闭",
    "运行反例",
    "恢复不变量",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "客户端缓冲与生命周期台",
    "axisA": {
      "label": "输入输出量",
      "levels": [
        "小请求",
        "流水请求",
        "慢消费者"
      ]
    },
    "axisB": {
      "label": "客户端状态",
      "levels": [
        "普通",
        "事务或订阅",
        "关闭"
      ]
    },
    "fault": "关闭套接字却遗留WATCH、订阅或输出缓冲关系，造成资源与状态泄漏",
    "command": "rg 'createClient|freeClient|sendReplyToClient' src/networking.c",
    "practiceMode": "diagnosis",
    "outcomes": {
      "signal": "客户端缓冲与生命周期台一致率",
      "risk": "客户端状态分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "客户端生命周期与套接字一致，缓冲区有上界，关闭路径清理订阅、监视和事务状态",
    "task": "交付客户端结构图、创建关闭轨迹、缓冲区压力与资源泄漏检查，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi13ClientStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi13ClientTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi13ClientEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
