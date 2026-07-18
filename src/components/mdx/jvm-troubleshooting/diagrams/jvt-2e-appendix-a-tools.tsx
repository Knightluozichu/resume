import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Appendix A: Tools you’ll need"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="附录A 所需工具" focus="建立JDK、IDE、命令行、剖析器和示例工程的可重复工具环境，记录版本、权限和采集开销" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="附录A 所需工具" focus="在干净环境按清单安装并运行样例，比较本地与目标环境的版本和默认参数差异" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="附录A 所需工具" focus="工具清单、版本输出、权限边界、样例启动与清理步骤" nodes={nodes} />;
}
