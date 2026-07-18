import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第22章 二进制位数组",
  focus: "按SDS字节和大端位序解释GETBIT、SETBIT、查表与SWAR BITCOUNT以及BITOP",
  invariant:
    "偏移到字节与位的映射正确，扩展补零，计数和按位运算对任意长度输入一致",
  artifact: "位序图、偏移边界测试、BITCOUNT算法对照和BITOP样本",
  nodes: [
    "位数组的表示",
    "GETBIT命令的实现",
    "SETBIT命令的实现",
    "BITCOUNT命令的实现",
    "BITOP命令的实现",
    "重点回顾",
    "参考资料",
  ],
};

export function Rdi22BitArrayStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi22BitArrayTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi22BitArrayEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
