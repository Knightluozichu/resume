import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-04-parallelism-concurrency",
  title: "第4章 Parallelism and Concurrent Programming",
  nodes: [
    "画任务依赖",
    "隔离共享状态",
    "选择同步语义",
    "测量关键路径",
    "注入竞争失败",
  ],
  focuses: ["任务粒度", "内存序", "锁竞争", "SIMD布局", "GPU分歧"],
};

export function Gea3Chapter04ParallelismConcurrencyMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter04ParallelismConcurrencyExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter04ParallelismConcurrencyEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
