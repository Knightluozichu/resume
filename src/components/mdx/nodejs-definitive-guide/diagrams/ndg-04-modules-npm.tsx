import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "辨认模块类型",
  "解析标识符",
  "执行模块",
  "冻结导出契约",
  "锁定依赖",
  "验证干净安装",
] as const;
const concepts = [
  "第4章 模块与npm包管理工具",
  "4.1 核心模块与文件模块",
  "4.2 从模块外部访问模块内的成员",
  "4.3 组织与管理模块",
  "4.4 模块对象的属性",
  "4.5 包与npm包管理工具",
  "4.6 小结",
] as const;

export function Ndg04ModulesNpmMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 4 章 模块与 npm 包管理工具 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg04ModulesNpmExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 4 章 模块与 npm 包管理工具 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg04ModulesNpmEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 4 章 模块与 npm 包管理工具 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
