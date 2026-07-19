import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-19-transaction",
  "unitTitle": "第19章 事务",
  "concepts": [
    "事务的实现",
    "WATCH命令的实现",
    "事务的ACID性质",
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
    "事务的实现",
    "WATCH命令的实现",
    "事务的ACID性质",
    "恢复不变量",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "MULTI/WATCH状态机台",
    "axisA": {
      "label": "WATCH版本",
      "levels": [
        "未变化",
        "排队后变化",
        "执行后变化"
      ]
    },
    "axisB": {
      "label": "命令错误",
      "levels": [
        "入队前",
        "入队时",
        "执行时"
      ]
    },
    "fault": "把Redis事务描述成遇错自动回滚，忽略EXEC返回逐命令错误的语义",
    "command": "rg 'multiCommand|execCommand|watchForKey|touchWatchedKey' src/multi.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "MULTI/WATCH状态机台一致率",
      "risk": "命令错误分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "入队顺序确定，WATCH键变化使EXEC中止，执行期命令错误按Redis语义返回而非自动回滚",
    "task": "交付事务状态机、WATCH竞态实验、错误矩阵和ACID边界表，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi19TransactionStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi19TransactionTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi19TransactionEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
