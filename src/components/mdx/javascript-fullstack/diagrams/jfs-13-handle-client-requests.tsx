import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "规范化方法和 URL",
  "限制并读取请求体",
  "匹配路由处理器",
  "选择静态或动态数据",
  "安全渲染表示",
  "一次性提交响应",
] as const;

export function Jfs13HandleClientRequestsMapLab() {
  return (
    <JfsBookLab
      title="第 13 章 响应客户请求 · 机制地图"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs13HandleClientRequestsExperimentLab() {
  return (
    <JfsBookLab
      title="第 13 章 响应客户请求 · 边界实验"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs13HandleClientRequestsEvidenceLab() {
  return (
    <JfsBookLab
      title="第 13 章 响应客户请求 · 恢复证据"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="evidence"
    />
  );
}
