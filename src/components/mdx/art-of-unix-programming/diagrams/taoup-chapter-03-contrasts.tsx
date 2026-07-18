import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-03-contrasts",
  title: "第3章 对比：Unix哲学同其他哲学的比较",
  nodes: ["比较对象", "统一理念", "系统边界", "接口风格", "演化结果"],
  focuses: ["多任务", "进程协作", "记录结构", "用户界面", "开发门槛"],
} as const;

export function TaoupChapter03ContrastsCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter03ContrastsRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter03ContrastsEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
