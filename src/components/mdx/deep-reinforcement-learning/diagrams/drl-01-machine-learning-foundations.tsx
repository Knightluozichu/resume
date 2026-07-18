import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["线性模型","交叉熵","softmax","全连接网络","卷积网络","反向传播"] as const;

export function Drl01MachineLearningFoundationsMapLab() {
  return <OfficialDrlLab title="第1章 机器学习基础" concepts={concepts} accent="#b45309" view="map" />;
}

export function Drl01MachineLearningFoundationsTraceLab() {
  return <OfficialDrlLab title="第1章 机器学习基础" concepts={concepts} accent="#b45309" view="trace" />;
}

export function Drl01MachineLearningFoundationsAuditLab() {
  return <OfficialDrlLab title="第1章 机器学习基础" concepts={concepts} accent="#b45309" view="audit" />;
}
