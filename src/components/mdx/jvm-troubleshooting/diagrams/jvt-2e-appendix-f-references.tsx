import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Appendix F: references"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="附录F 参考资料" focus="维护本书调查方法所依赖的来源、版本和访问日期，使关键判断可追溯且可在版本变化时复核" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="附录F 参考资料" focus="随机抽取一个工具参数和一个JVM行为命题，追到一手资料并在当前环境最小复现" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="附录F 参考资料" focus="来源账本、版本适用域、命题到证据映射、复核日期" nodes={nodes} />;
}
