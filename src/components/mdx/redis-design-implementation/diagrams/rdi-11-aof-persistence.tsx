import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-11-aof-persistence",
  "unitTitle": "第11章 AOF持久化",
  "concepts": [
    "AOF持久化的实现",
    "AOF文件的载入与数据还原",
    "AOF重写",
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
    "AOF持久化的实现",
    "AOF文件的载入与数据还原",
    "AOF重写",
    "恢复不变量",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "AOF追加与重写双缓冲台",
    "axisA": {
      "label": "fsync策略",
      "levels": [
        "always",
        "everysec",
        "no"
      ]
    },
    "axisB": {
      "label": "重写阶段",
      "levels": [
        "开始前",
        "子进程中",
        "差量合并"
      ]
    },
    "fault": "重写期间漏掉父进程新命令，或把everysec误称为零数据损失",
    "command": "rg 'feedAppendOnlyFile|flushAppendOnlyFile|rewriteAppendOnlyFile' src/aof.c",
    "practiceMode": "diagnosis",
    "outcomes": {
      "signal": "AOF追加与重写双缓冲台一致率",
      "risk": "重写阶段分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "确认策略对应明确丢失窗口，AOF语法完整可重放，重写期间增量不丢且结果等价",
    "task": "交付appendfsync对照、AOF解析、崩溃截断实验、重写双缓冲轨迹，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi11AofPersistenceStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi11AofPersistenceTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi11AofPersistenceEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
