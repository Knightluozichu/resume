import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第1章 简介",
  focus:
    "固定Redis 3.0源码版本、24章边界、阅读顺序和配套注释源码，建立从结构到功能的追踪方法",
  invariant: "任何结论都标明Redis 3.0语境、目录归属、源码入口和后续版本差异",
  artifact: "版本边界表、24章路线、源码阅读索引与术语约定",
  nodes: ["版本说明", "章节编排", "推荐的阅读方法", "行文规则", "配套网站"],
};

export function Rdi01IntroductionStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi01IntroductionTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi01IntroductionEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
