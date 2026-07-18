import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "创建应用",
  "注册中间件",
  "匹配路由",
  "验证输入",
  "执行业务",
  "错误收口",
] as const;
const concepts = [
  "第14章 使用Express构建Web应用程序",
  "14.1 Express概述",
  "14.2 设置路由",
  "14.3 使用各种提交数据或请求数据的方法",
  "14.4 中间件",
  "14.5 模板引擎",
  "14.6 小结",
] as const;

export function Ndg14ExpressWebAppsMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 14 章 使用 Express 构建 Web 应用程序 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#4d7c0f"
      soft="#ecfccb"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg14ExpressWebAppsExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 14 章 使用 Express 构建 Web 应用程序 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#4d7c0f"
      soft="#ecfccb"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg14ExpressWebAppsEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 14 章 使用 Express 构建 Web 应用程序 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#4d7c0f"
      soft="#ecfccb"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
