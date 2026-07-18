import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "识别字节来源",
  "选择编码",
  "分配受限缓冲区",
  "处理跨块边界",
  "验证转换损失",
  "测量复制成本",
] as const;
const concepts = [
  "第6章 理解Buffer",
  "6.1 Buffer结构",
  "6.1.1 模块结构",
  "6.1.2 Buffer对象",
  "6.1.3 Buffer内存分配",
  "6.2 Buffer的转换",
  "6.2.1 字符串转Buffer",
  "6.2.2 Buffer转字符串",
  "6.2.3 Buffer不支持的编码类型",
  "6.3 Buffer的拼接",
  "6.3.1 乱码是如何产生的",
  "6.3.2 setEncoding()与string_decoder()",
  "6.3.3 正确拼接Buffer",
  "6.4 Buffer与性能",
  "6.5 总结",
  "6.6 参考资源",
] as const;

export function Dnj06BufferMapLab() {
  return (
    <DeepNodeOfficialLab
      title="第 6 章 理解 Buffer · 运行地图"
      label="Deep Node / Map"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Dnj06BufferExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="第 6 章 理解 Buffer · 边界实验"
      label="Deep Node / Experiment"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Dnj06BufferEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="第 6 章 理解 Buffer · 关闭证据"
      label="Deep Node / Evidence"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
