import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "会话状态",
  "记忆窗口",
  "非参数知识",
  "外部工具",
  "Streamlit",
  "故障降级",
] as const;

export function Bla06ConversationalApplicationsFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 6: Building Conversational Applications"
      concepts={concepts}
      accent="#c2410c"
      view="pipeline"
    />
  );
}

export function Bla06ConversationalApplicationsExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 6: Building Conversational Applications"
      concepts={concepts}
      accent="#c2410c"
      view="training"
    />
  );
}

export function Bla06ConversationalApplicationsEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 6: Building Conversational Applications"
      concepts={concepts}
      accent="#c2410c"
      view="evidence"
    />
  );
}
