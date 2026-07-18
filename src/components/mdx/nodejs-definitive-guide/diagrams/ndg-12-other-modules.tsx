import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "定义系统问题",
  "选择核心模块",
  "约束输入",
  "执行异步操作",
  "核对平台差异",
  "关闭资源",
] as const;
const concepts = [
  "第12章 Node.js中的其他模块",
  "12.1 使用dns模块解析域名",
  "12.2 使用punycode模块转换punycode编码",
  "12.3 使用os模块获取操作系统信息",
  "12.4 使用readline模块逐行读取流数据",
  "12.5 使用util模块中提供的一些实用方法",
  "12.6 使用vm模块改变脚本运行环境",
  "12.7 自定义REPL运行环境",
  "12.8 小结",
] as const;

export function Ndg12OtherModulesMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 12 章 Node.js 中的其他模块 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg12OtherModulesExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 12 章 Node.js 中的其他模块 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg12OtherModulesEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 12 章 Node.js 中的其他模块 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
