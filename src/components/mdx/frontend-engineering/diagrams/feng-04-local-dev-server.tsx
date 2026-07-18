import { FrontendEngineeringOfficialLab } from "./official-frontend-engineering-lab";
const chain = [
  "启动本地入口",
  "监听文件变化",
  "执行增量构建",
  "推送更新边界",
  "提供契约化Mock",
  "核对生产差异",
] as const;
const concepts = [
  "第4章 本地开发服务器",
  "4.1 本地开发服务器解决的问题",
  "4.2 动态构建",
  "4.2.1 webpack-dev-middleware",
  "4.2.2 Livereload和HMR",
  "4.3 Mock服务",
  "4.3.1 Mock的必要前提和发展进程",
  "4.3.2 异步数据接口",
  "4.3.3 SSR",
  "4.4 总结",
] as const;
export function Feng04LocalDevServerMapLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 4 章 本地开发服务器 · 交付地图"
      label="Frontend Engineering / Map"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Feng04LocalDevServerExperimentLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 4 章 本地开发服务器 · 故障实验"
      label="Frontend Engineering / Experiment"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Feng04LocalDevServerEvidenceLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 4 章 本地开发服务器 · 回滚证据"
      label="Frontend Engineering / Evidence"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
