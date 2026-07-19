import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-02-simple-dynamic-string",
  "unitTitle": "第2章 简单动态字符串",
  "concepts": [
    "SDS的定义",
    "SDS与C字符串的区别",
    "SDS API",
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
    "SDS的定义",
    "SDS与C字符串的区别",
    "SDS API",
    "恢复不变量",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "SDS字节与扩容轨迹台",
    "axisA": {
      "label": "写入长度",
      "levels": [
        "短写入",
        "跨预留空间",
        "含零字节"
      ]
    },
    "axisB": {
      "label": "空间状态",
      "levels": [
        "有free",
        "刚好写满",
        "需要扩容"
      ]
    },
    "fault": "按C字符串的strlen和终止零推断SDS长度，截断二进制载荷",
    "command": "rg 'sdsMakeRoomFor|sdslen|sdsRemoveFreeSpace' src/sds.c",
    "practiceMode": "calculation",
    "outcomes": {
      "signal": "SDS字节与扩容轨迹台一致率",
      "risk": "空间状态分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "字符串长度、终止字节和可用空间始终一致，扩容不会溢出，二进制数据不被截断",
    "task": "交付SDS内存图、扩缩容轨迹、边界测试与C字符串对照，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi02SimpleDynamicStringStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi02SimpleDynamicStringTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi02SimpleDynamicStringEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
