import { OfficialDrlLab } from "./official-drl-lab";

const concepts = ["已知条件","推导步骤","数值核对","反例","实现证据","独立重放"] as const;

export function DrlAppendixBExerciseAnswersMapLab() {
  return <OfficialDrlLab title="附录B 习题答案" concepts={concepts} accent="#b45309" view="map" />;
}

export function DrlAppendixBExerciseAnswersTraceLab() {
  return <OfficialDrlLab title="附录B 习题答案" concepts={concepts} accent="#b45309" view="trace" />;
}

export function DrlAppendixBExerciseAnswersAuditLab() {
  return <OfficialDrlLab title="附录B 习题答案" concepts={concepts} accent="#b45309" view="audit" />;
}
