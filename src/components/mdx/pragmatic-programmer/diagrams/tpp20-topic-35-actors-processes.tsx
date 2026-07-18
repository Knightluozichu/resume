import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-35-actors-processes",
  title: "35 角色与进程",
  nodes: ["消息", "邮箱", "角色状态", "处理", "响应"],
  focuses: ["角色模型", "进程", "邮箱", "监督", "消息契约"],
} as const;

export function Tpp20Topic35ActorsProcessesSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic35ActorsProcessesFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic35ActorsProcessesEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
