import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-preface",
  title: "序",
  nodes: ["目标读者", "阅读方式", "参考坐标", "案例方法", "作者责任"],
  focuses: ["适用读者", "四部分路径", "外部参考", "约定", "案例边界"],
} as const;

export function TaoupPrefaceCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupPrefaceRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupPrefaceEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
