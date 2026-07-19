import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-08-object",
  "unitTitle": "第8章 对象",
  "concepts": [
    "对象的类型与编码",
    "字符串对象",
    "列表对象",
    "哈希对象",
    "集合对象",
    "有序集合对象",
    "类型检查与命令多态",
    "内存回收",
    "对象共享",
    "对象的空转时长",
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
    "对象的类型与编码",
    "字符串对象",
    "列表对象",
    "哈希对象",
    "集合对象",
    "有序集合对象"
  ],
  "model": {
    "studio": "对象类型—编码切换台",
    "axisA": {
      "label": "对象类型",
      "levels": [
        "字符串",
        "聚合对象",
        "有序集合"
      ]
    },
    "axisB": {
      "label": "数据形态",
      "levels": [
        "紧凑",
        "越过阈值",
        "共享或回收"
      ]
    },
    "fault": "把TYPE当底层编码，或编码转换后改变了用户可见值与引用计数",
    "command": "rg 'create.*Object|tryObjectEncoding|decrRefCount' src/object.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "对象类型—编码切换台一致率",
      "risk": "数据形态分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "对象类型决定命令集合，编码与ptr结构匹配，转换不改变用户值，引用计数和空转时间正确",
    "task": "交付类型编码矩阵、转换阈值实验、命令多态轨迹与内存回收记录，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi08ObjectStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi08ObjectTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi08ObjectEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
