import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-12-event",
  "unitTitle": "第12章 事件",
  "concepts": [
    "文件事件",
    "时间事件",
    "事件的调度与执行",
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
    "文件事件",
    "时间事件",
    "事件的调度与执行",
    "恢复不变量",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "文件与时间事件调度台",
    "axisA": {
      "label": "文件就绪量",
      "levels": [
        "空闲",
        "稳定",
        "突发"
      ]
    },
    "axisB": {
      "label": "回调耗时",
      "levels": [
        "短",
        "接近预算",
        "阻塞"
      ]
    },
    "fault": "在单个事件回调中执行长任务，使其他客户端与时间事件共同饥饿",
    "command": "rg 'aeProcessEvents|aeCreateFileEvent|aeCreateTimeEvent' src/ae.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "文件与时间事件调度台一致率",
      "risk": "回调耗时分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "就绪事件不丢不重复，时间事件按策略执行，长回调不无限阻塞其他客户端与serverCron",
    "task": "交付事件循环时序、处理器注册表、阻塞实验与调度延迟分布，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi12EventStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi12EventTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi12EventEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
