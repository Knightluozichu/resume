import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["TRPO","置信域","KL散度","重要性比率","共轭梯度","熵正则"] as const;

export function Drl09AdvancedPolicyLearningMapLab() {
  return <OfficialDrlLab title="第9章 策略学习高级技巧" concepts={concepts} accent="#4d7c0f" view="map" />;
}

export function Drl09AdvancedPolicyLearningTraceLab() {
  return <OfficialDrlLab title="第9章 策略学习高级技巧" concepts={concepts} accent="#4d7c0f" view="trace" />;
}

export function Drl09AdvancedPolicyLearningAuditLab() {
  return <OfficialDrlLab title="第9章 策略学习高级技巧" concepts={concepts} accent="#4d7c0f" view="audit" />;
}
