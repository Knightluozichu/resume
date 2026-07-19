import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-06-integer-set",
  "unitTitle": "第6章 整数集合",
  "concepts": [
    "整数集合的实现",
    "升级",
    "升级的好处",
    "降级",
    "整数集合API",
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
    "整数集合的实现",
    "升级",
    "升级的好处",
    "降级",
    "整数集合API",
    "控制流"
  ],
  "model": {
    "studio": "整数集合编码升级台",
    "axisA": {
      "label": "新值范围",
      "levels": [
        "int16",
        "int32",
        "int64"
      ]
    },
    "axisB": {
      "label": "插入位置",
      "levels": [
        "最小端",
        "中间",
        "最大端"
      ]
    },
    "fault": "升级后按旧宽度解释contents，或假设删除会自动降级",
    "command": "rg 'intsetUpgradeAndAdd|intsetSearch' src/intset.c",
    "practiceMode": "calculation",
    "outcomes": {
      "signal": "整数集合编码升级台一致率",
      "risk": "插入位置分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "contents按当前编码解释且严格有序，升级后所有旧值保持数值不变，新值落在正确位置",
    "task": "交付编码布局、升级搬迁轨迹、边界值测试与空间对照，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi06IntegerSetStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi06IntegerSetTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi06IntegerSetEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
