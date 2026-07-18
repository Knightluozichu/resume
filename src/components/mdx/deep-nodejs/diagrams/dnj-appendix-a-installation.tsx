import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "确认平台架构",
  "选择发行渠道",
  "校验版本来源",
  "配置项目版本",
  "验证原生工具链",
  "记录卸载回滚",
] as const;
const concepts = [
  "附录A 安装Node",
  "A.1 Windows系统下的Node安装",
  "A.2 macOS系统下Node的安装",
  "A.3 Linux系统下Node的安装",
  "A.4 总结",
  "A.5 参考资源",
] as const;

export function DnjAppendixAInstallationMapLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 A 安装 Node · 运行地图"
      label="Deep Node / Map"
      color="#6d28d9"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function DnjAppendixAInstallationExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 A 安装 Node · 边界实验"
      label="Deep Node / Experiment"
      color="#6d28d9"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function DnjAppendixAInstallationEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 A 安装 Node · 关闭证据"
      label="Deep Node / Evidence"
      color="#6d28d9"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
