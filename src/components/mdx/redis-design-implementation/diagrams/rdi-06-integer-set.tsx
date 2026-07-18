import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第6章 整数集合",
  focus: "理解intset的有序连续存储、编码升级、重排插入和不支持降级的空间权衡",
  invariant:
    "contents按当前编码解释且严格有序，升级后所有旧值保持数值不变，新值落在正确位置",
  artifact: "编码布局、升级搬迁轨迹、边界值测试与空间对照",
  nodes: [
    "整数集合的实现",
    "升级",
    "升级的好处",
    "降级",
    "整数集合API",
    "重点回顾",
  ],
};

export function Rdi06IntegerSetStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi06IntegerSetTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi06IntegerSetEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
