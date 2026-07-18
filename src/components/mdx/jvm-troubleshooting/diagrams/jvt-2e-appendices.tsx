import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Appendices"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="附录总览" focus="把工具、项目打开方式、延伸阅读、线程基础、内存管理与参考资料组织为调查时可回查的前置知识" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="附录总览" focus="随机抽取一次线程或堆症状，说明应回查哪个附录、需要什么前置证据、何时返回主线" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="附录总览" focus="附录索引、前置能力自测、工具版本卡、术语交叉引用" nodes={nodes} />;
}
