import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = [
  "并行策略",
  "显存账本",
  "通信",
  "参数服务器",
  "去中心化",
  "故障恢复",
] as const;

export function Lsl04DistributedTrainingPipelineLab() {
  return (
    <OfficialLslBookLab
      title="第4章 分布式训练"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Lsl04DistributedTrainingTrainingLab() {
  return (
    <OfficialLslBookLab
      title="第4章 分布式训练"
      concepts={concepts}
      accent="#0369a1"
      view="training"
    />
  );
}

export function Lsl04DistributedTrainingEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="第4章 分布式训练"
      concepts={concepts}
      accent="#0369a1"
      view="evidence"
    />
  );
}
