import { OfficialDeepLearningLab } from "./official-deep-learning-lab";

export function DlsAppendixSoftmaxLossMapLab() {
  return (
    <OfficialDeepLearningLab
      title="附录A Softmax-with-Loss层的计算图"
      label="DLS-A"
      color="#0369a1"
      soft="#e0f2fe"
      chain={[
        "稳定平移logit",
        "计算指数分母",
        "归一得到概率",
        "计算交叉熵",
        "反传概率差",
        "执行中心差分",
      ]}
      concepts={[
        "附录A Softmax-with-Loss层的计算图",
        "A.1 正向传播",
        "A.2 反向传播",
        "A.3 小结",
      ]}
      view="map"
    />
  );
}

export function DlsAppendixSoftmaxLossExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="附录A Softmax-with-Loss层的计算图"
      label="DLS-A"
      color="#0369a1"
      soft="#e0f2fe"
      chain={[
        "稳定平移logit",
        "计算指数分母",
        "归一得到概率",
        "计算交叉熵",
        "反传概率差",
        "执行中心差分",
      ]}
      concepts={[
        "附录A Softmax-with-Loss层的计算图",
        "A.1 正向传播",
        "A.2 反向传播",
        "A.3 小结",
      ]}
      view="experiment"
    />
  );
}

export function DlsAppendixSoftmaxLossEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="附录A Softmax-with-Loss层的计算图"
      label="DLS-A"
      color="#0369a1"
      soft="#e0f2fe"
      chain={[
        "稳定平移logit",
        "计算指数分母",
        "归一得到概率",
        "计算交叉熵",
        "反传概率差",
        "执行中心差分",
      ]}
      concepts={[
        "附录A Softmax-with-Loss层的计算图",
        "A.1 正向传播",
        "A.2 反向传播",
        "A.3 小结",
      ]}
      view="evidence"
    />
  );
}
