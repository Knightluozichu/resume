import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-22-bit-array",
  "unitTitle": "第22章 二进制位数组",
  "concepts": [
    "位数组的表示",
    "GETBIT命令的实现",
    "SETBIT命令的实现",
    "BITCOUNT命令的实现",
    "BITOP命令的实现",
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
    "位数组的表示",
    "GETBIT命令的实现",
    "SETBIT命令的实现",
    "BITCOUNT命令的实现",
    "BITOP命令的实现",
    "控制流"
  ],
  "model": {
    "studio": "位偏移与BITCOUNT算法台",
    "axisA": {
      "label": "位偏移",
      "levels": [
        "字节首位",
        "跨字节",
        "扩展尾部"
      ]
    },
    "axisB": {
      "label": "运算",
      "levels": [
        "GET/SET",
        "BITCOUNT",
        "BITOP"
      ]
    },
    "fault": "按本机位序而非Redis定义映射偏移，造成SETBIT与BITCOUNT结果不一致",
    "command": "rg 'getbitCommand|setbitCommand|bitcountCommand|bitopCommand' src/bitops.c",
    "practiceMode": "calculation",
    "outcomes": {
      "signal": "位偏移与BITCOUNT算法台一致率",
      "risk": "运算分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "偏移到字节与位的映射正确，扩展补零，计数和按位运算对任意长度输入一致",
    "task": "交付位序图、偏移边界测试、BITCOUNT算法对照和BITOP样本，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi22BitArrayStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi22BitArrayTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi22BitArrayEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
