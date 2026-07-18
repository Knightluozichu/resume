import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "声明编码",
  "计算字节数",
  "分配缓冲区",
  "读写字段",
  "验证边界",
  "释放引用",
] as const;
const concepts = [
  "第5章 使用Buffer类处理二进制数据",
  "5.1 创建Buffer对象",
  "5.2 字符串的长度与缓存区的长度",
  "5.3 Buffer对象与字符串对象之间的相互转换",
  "5.4 Buffer对象与数值对象之间的相互转换",
  "5.5 Buffer对象与JSON对象之间的相互转换",
  "5.6 复制缓存数据",
  "5.7 Buffer类的类方法",
  "5.8 小结",
] as const;

export function Ndg05BufferBinaryMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 5 章 使用 Buffer 类处理二进制数据 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg05BufferBinaryExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 5 章 使用 Buffer 类处理二进制数据 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg05BufferBinaryEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 5 章 使用 Buffer 类处理二进制数据 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
