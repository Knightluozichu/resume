import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Part 1 Revisiting the foundation for code investigation"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="Part 1 重访代码调查基础" focus="建立从症状、假设、最小复现到可推翻结论的调查协议，为调试、日志与AI辅助划定证据边界" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="Part 1 重访代码调查基础" focus="对同一异常分别用静态阅读、调试器和日志提出假设，比较哪项证据真正排除了候选原因" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="Part 1 重访代码调查基础" focus="调查章程、症状时间线、假设队列、证据保全清单" nodes={nodes} />;
}
