import { FrontendEngineeringOfficialLab } from "./official-frontend-engineering-lab";
const chain = [
  "读取配置契约",
  "解析模块依赖",
  "转换脚本样式",
  "切分并命名制品",
  "注入资源定位",
  "验证缓存与增量",
] as const;
const concepts = [
  "第3章 构建",
  "3.1 构建功能解决的问题",
  "3.2 配置API设计原则和编程范式约束",
  "3.2.1 配置API设计",
  "3.2.2 编程范式约束",
  "3.3 ECMAScript与Babel",
  "3.3.1 ECMAScript发展史",
  "3.3.2 ES6的跨时代意义",
  "3.3.3 Babel——真正意义的JavaScript编译",
  "3.3.4 结合webpack与Babel实现JavaScript构建",
  "3.4 CSS预编译与PostCSS",
  "3.4.1 CSS的缺陷",
  "3.4.2 CSS预编译器",
  "3.4.3 PostCSS",
  "3.4.4 webpack结合预编译与PostCSS实现CSS构建",
  "3.4.5 案例：自动生成CSS Sprites功能实现",
  "3.5 模块化开发",
  "3.5.1 模块化与组件化",
  "3.5.2 模块化与工程化",
  "3.5.3 模块化开发的价值",
  "3.5.4 前端模块化发展史",
  "3.5.5 webpack模块化构建",
  "3.6 增量更新与缓存",
  "3.6.1 HTTP缓存策略",
  "3.6.2 覆盖更新与增量更新",
  "3.6.3 按需加载与多模块架构场景下的增量更新",
  "3.6.4 webpack实现增量更新构建方案",
  "3.7 资源定位",
  "3.7.1 资源定位的历史变迁",
  "3.7.2 常规的资源定位思维",
  "3.7.3 webpack的逆向注入模式",
  "3.8 总结",
] as const;
export function Feng03BuildMapLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 3 章 构建 · 交付地图"
      label="Frontend Engineering / Map"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Feng03BuildExperimentLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 3 章 构建 · 故障实验"
      label="Frontend Engineering / Experiment"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Feng03BuildEvidenceLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 3 章 构建 · 回滚证据"
      label="Frontend Engineering / Evidence"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
