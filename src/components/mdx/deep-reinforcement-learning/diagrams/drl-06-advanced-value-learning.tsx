import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["经验回放","优先回放","目标网络","双Q学习","对决网络","噪声网络"] as const;

export function Drl06AdvancedValueLearningMapLab() {
  return <OfficialDrlLab title="第6章 价值学习高级技巧" concepts={concepts} accent="#b45309" view="map" />;
}

export function Drl06AdvancedValueLearningTraceLab() {
  return <OfficialDrlLab title="第6章 价值学习高级技巧" concepts={concepts} accent="#b45309" view="trace" />;
}

export function Drl06AdvancedValueLearningAuditLab() {
  return <OfficialDrlLab title="第6章 价值学习高级技巧" concepts={concepts} accent="#b45309" view="audit" />;
}
