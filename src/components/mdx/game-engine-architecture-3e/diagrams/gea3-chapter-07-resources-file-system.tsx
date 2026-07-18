import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-07-resources-file-system",
  title: "第7章 Resources and the File System",
  nodes: [
    "规范资产身份",
    "解析依赖",
    "排队异步读取",
    "创建运行时对象",
    "按预算回收",
  ],
  focuses: ["路径一致", "依赖闭包", "加载抖动", "句柄稳定", "内存预算"],
};

export function Gea3Chapter07ResourcesFileSystemMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter07ResourcesFileSystemExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter07ResourcesFileSystemEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
