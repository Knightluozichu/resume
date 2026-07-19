import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-official-final-review",
  "unitTitle": "第2版全书总复习",
  "concepts": [
    "客户端与事件入口",
    "对象与底层结构",
    "数据库与过期",
    "RDB与AOF恢复",
    "复制、Sentinel与集群",
    "事务、脚本与可观测性"
  ],
  "stages": [
    "冻结3.0基线",
    "定位结构入口",
    "执行单变量变更",
    "注入边界故障",
    "恢复并对账"
  ],
  "focuses": [
    "客户端与事件入口",
    "对象与底层结构",
    "数据库与过期",
    "RDB与AOF恢复",
    "复制、Sentinel与集群",
    "事务、脚本与可观测性"
  ],
  "model": {
    "studio": "一条命令的全栈答辩台",
    "axisA": {
      "label": "故障位置",
      "levels": [
        "结构或对象",
        "持久化或复制",
        "集群或独立功能"
      ]
    },
    "axisB": {
      "label": "证据闭环",
      "levels": [
        "源码",
        "运行",
        "故障恢复对账"
      ]
    },
    "fault": "只解释命令返回，不检查文件、偏移、槽位和用户数据的最终状态",
    "command": "redis-cli --latency-history",
    "practiceMode": "diagnosis",
    "outcomes": {
      "signal": "一条命令的全栈答辩台一致率",
      "risk": "证据闭环分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "任何实现结论可追溯到Redis 3.0目录、结构字段、函数路径、运行指标和故障对账",
    "task": "交付24章追踪矩阵、综合时序图、崩溃与切换演练、源码口试记录，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function RdiOfficialFinalReviewStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function RdiOfficialFinalReviewTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function RdiOfficialFinalReviewEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
