import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-27-program-size",
  title: "第27章：程序规模对“构建”的影响",
  nodes: ["规模口径", "沟通网络", "缺陷分布", "活动比例", "方法调整"],
  focuses: ["交流规模", "错误", "生产率", "活动占比", "系统产品"],
} as const;

export function Cc2e27ProgramSizeStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e27ProgramSizeTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e27ProgramSizeEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
