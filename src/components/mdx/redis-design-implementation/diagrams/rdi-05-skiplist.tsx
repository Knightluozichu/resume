import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第5章 跳跃表",
  focus:
    "用zskiplist层级、前进指针、跨度和后退指针解释有序集合的范围与排名操作",
  invariant:
    "分值顺序与成员字典序稳定，跨度可恢复排名，层级和前后链在更新后保持一致",
  artifact: "多层路径图、插删轨迹、排名验证与复杂度实验",
  nodes: ["跳跃表的实现", "跳跃表API", "重点回顾"],
};

export function Rdi05SkiplistStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi05SkiplistTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi05SkiplistEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
