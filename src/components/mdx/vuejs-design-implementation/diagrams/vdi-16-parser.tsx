import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "选择文本模式",
  "识别节点起点",
  "解析标签属性",
  "递归解析子节点",
  "解码字符引用",
  "验证结束标签",
] as const;

export function Vdi16ParserMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 16 章 解析器"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi16ParserExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 16 章 解析器"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi16ParserEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 16 章 解析器"
      nodes={nodes}
      mode="evidence"
    />
  );
}
