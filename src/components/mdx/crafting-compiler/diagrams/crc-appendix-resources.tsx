import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-appendix-resources",
  title: "附录",
  concepts: ["附录", "A.1 参考文献", "A.2 在线资料", "A.3 源代码"],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "附录来源可重放台",
    boundary:
      "reference → URL/source archive → version → checksum → experiment",
    axisA: {
      label: "资源类型",
      levels: ["参考文献", "在线资料", "源代码"],
    },
    axisB: {
      label: "可用状态",
      levels: ["原始可达", "归档", "替代一手资料"],
    },
    fault: "链接失效后用无版本镜像替换且不披露",
    invariant: "每个资源记录身份、版本、访问状态、哈希和所支持的实验",
    probe:
      "resource: title+author+url\nversion: tag-or-date\narchive: checksum+retrieved-at",
    signal: "资源可达性、版本与哈希",
    artifact: "附录资源清单",
    trap: "来源清单不等于授权复制正文",
    practiceMode: "design",
    task: "附录固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变资源类型或可用状态。",
  },
} as const;

export function CrcAppendixResourcesMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function CrcAppendixResourcesExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function CrcAppendixResourcesEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
