import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "附录B 展望Java技术的未来（2013年版）"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="附录B 展望Java技术的未来（2013年版）" focus="把2013年的预测作为可检验历史样本，与第3版2019年的观察分开，训练技术判断的证据意识" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="附录B 展望Java技术的未来（2013年版）" focus="随机选择三项预测，固定截止日期和判定标准，用一手发布资料复核命中与偏差" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="附录B 展望Java技术的未来（2013年版）" focus="预测命题、当时证据、实际结果、偏差原因与不可知项" nodes={nodes} />;
}
