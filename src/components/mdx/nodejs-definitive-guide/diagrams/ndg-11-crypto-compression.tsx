import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "定义安全目标",
  "选择原语",
  "生成随机材料",
  "流式处理",
  "验证完整性",
  "清理敏感数据",
] as const;
const concepts = [
  "第11章 加密与压缩",
  "11.1 加密与解密处理",
  "11.2 压缩与解压缩处理",
  "11.3 小结",
] as const;

export function Ndg11CryptoCompressionMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 11 章 加密与压缩 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg11CryptoCompressionExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 11 章 加密与压缩 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg11CryptoCompressionEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 11 章 加密与压缩 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
