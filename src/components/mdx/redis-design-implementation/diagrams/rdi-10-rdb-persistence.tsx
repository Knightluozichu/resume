import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-10-rdb-persistence",
  "unitTitle": "第10章 RDB持久化",
  "concepts": [
    "RDB文件的创建与载入",
    "自动间隔性保存",
    "RDB文件结构",
    "分析RDB文件",
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
    "RDB文件的创建与载入",
    "自动间隔性保存",
    "RDB文件结构",
    "分析RDB文件",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "RDB快照恢复台",
    "axisA": {
      "label": "保存方式",
      "levels": [
        "SAVE",
        "BGSAVE",
        "自动保存"
      ]
    },
    "axisB": {
      "label": "故障时点",
      "levels": [
        "fork前",
        "子进程写入中",
        "原子替换后"
      ]
    },
    "fault": "看到dump.rdb存在就宣称可恢复，忽略校验、快照时点和写时复制成本",
    "command": "rg 'rdbSave|rdbLoad|rdbSaveBackground' src/rdb.c",
    "practiceMode": "diagnosis",
    "outcomes": {
      "signal": "RDB快照恢复台一致率",
      "risk": "故障时点分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "快照表示一致时点，文件头尾与对象编码可校验，恢复结果与快照时刻对账",
    "task": "交付快照时间线、RDB字节解析、自动保存实验与恢复对账，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi10RdbPersistenceStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi10RdbPersistenceTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi10RdbPersistenceEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
