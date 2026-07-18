import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "定义仓库边界",
  "部署存储服务",
  "同步公共镜像",
  "发布私有模块",
  "校验权限完整性",
  "备份恢复演练",
] as const;
const concepts = [
  "附录D 搭建局域npm仓库",
  "D.1 npm仓库的安装",
  "D.1.1 安装Erlang和CouchDB",
  "D.1.2 搭建npm仓库",
  "D.2 高阶应用",
  "D.2.1 镜像仓库",
  "D.2.2 私有模块应用",
  "D.2.3 纯私有仓库",
  "D.3 总结",
  "D.4 参考资源",
] as const;

export function DnjAppendixDLocalNpmMapLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 D 搭建局域 npm 仓库 · 运行地图"
      label="Deep Node / Map"
      color="#475569"
      soft="#f1f5f9"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function DnjAppendixDLocalNpmExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 D 搭建局域 npm 仓库 · 边界实验"
      label="Deep Node / Experiment"
      color="#475569"
      soft="#f1f5f9"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function DnjAppendixDLocalNpmEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 D 搭建局域 npm 仓库 · 关闭证据"
      label="Deep Node / Evidence"
      color="#475569"
      soft="#f1f5f9"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
