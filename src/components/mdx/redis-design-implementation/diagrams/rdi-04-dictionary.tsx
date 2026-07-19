import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-04-dictionary",
  "unitTitle": "第4章 字典",
  "concepts": [
    "字典的实现",
    "哈希算法",
    "解决键冲突",
    "rehash",
    "渐进式rehash",
    "字典API",
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
    "字典的实现",
    "哈希算法",
    "解决键冲突",
    "rehash",
    "渐进式rehash",
    "字典API"
  ],
  "model": {
    "studio": "双表渐进rehash台",
    "axisA": {
      "label": "负载状态",
      "levels": [
        "稀疏",
        "触发扩缩",
        "正在迁移"
      ]
    },
    "axisB": {
      "label": "访问动作",
      "levels": [
        "查找",
        "插入",
        "删除"
      ]
    },
    "fault": "rehash期间只查询ht[0]，或一次迁移整表造成长停顿",
    "command": "rg 'dictRehash|_dictKeyIndex|dictFind' src/dict.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "双表渐进rehash台一致率",
      "risk": "访问动作分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "迁移期间查找覆盖两张表，rehashidx单调推进，键只存在于正确位置且负载因子受控",
    "task": "交付双哈希表图、冲突链样本、渐进rehash轨迹与负载测试，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi04DictionaryStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi04DictionaryTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi04DictionaryEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
