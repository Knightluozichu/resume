import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-21-sort",
  "unitTitle": "第21章 排序",
  "concepts": [
    "SORT <key>命令的实现",
    "ALPHA选项的实现",
    "ASC选项和DESC选项的实现",
    "BY选项的实现",
    "带有ALPHA选项的BY选项的实现",
    "LIMIT选项的实现",
    "GET选项的实现",
    "STORE选项的实现",
    "多个选项的执行顺序",
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
    "SORT &lt;key&gt;命令的实现",
    "ALPHA选项的实现",
    "ASC选项和DESC选项的实现",
    "BY选项的实现",
    "带有ALPHA选项的BY选项的实现",
    "LIMIT选项的实现"
  ],
  "model": {
    "studio": "SORT选项执行管线台",
    "axisA": {
      "label": "比较方式",
      "levels": [
        "数值",
        "ALPHA",
        "BY外部键"
      ]
    },
    "axisB": {
      "label": "输出阶段",
      "levels": [
        "全量",
        "LIMIT/GET",
        "STORE"
      ]
    },
    "fault": "按参数书写顺序执行所有选项，导致比较、分页、投影和保存的语义错位",
    "command": "rg 'sortCommand|lookupKeyByPattern' src/sort.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "SORT选项执行管线台一致率",
      "risk": "输出阶段分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "输入元素、比较键、排序方向、分页与输出投影按固定顺序组合，缺失外部键语义一致",
    "task": "交付SORT执行管线、选项组合矩阵、稳定性与复杂度测试，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi21SortStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi21SortTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi21SortEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
