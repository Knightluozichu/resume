import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Appendix C: Recommended further reading"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="附录C 延伸阅读" focus="按调试、性能、并发、JVM与分布式系统问题组织延伸资料，并记录资料能回答与不能回答的边界" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="附录C 延伸阅读" focus="选择一个相互冲突的调优建议，回到官方文档与可控基准，用数据决定适用条件" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="附录C 延伸阅读" focus="阅读决策表、来源日期、版本适用域、待验证命题" nodes={nodes} />;
}
