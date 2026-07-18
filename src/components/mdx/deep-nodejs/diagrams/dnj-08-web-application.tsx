import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "限制并解析请求",
  "恢复身份会话",
  "匹配路由",
  "执行中间件链",
  "渲染或流式响应",
  "统一异常出口",
] as const;
const concepts = [
  "第8章 构建Web应用",
  "8.1 基础功能",
  "8.1.1 请求方法",
  "8.1.2 路径解析",
  "8.1.3 查询字符串",
  "8.1.4 Cookie",
  "8.1.5 Session",
  "8.1.6 缓存",
  "8.1.7 Basic认证",
  "8.2 数据上传",
  "8.2.1 表单数据",
  "8.2.2 其他格式",
  "8.2.3 附件上传",
  "8.2.4 数据上传与安全",
  "8.3 路由解析",
  "8.3.1 文件路径型",
  "8.3.2 MVC",
  "8.3.3 RESTful",
  "8.4 中间件",
  "8.4.1 异常处理",
  "8.4.2 中间件与性能",
  "8.4.3 小结",
  "8.5 页面渲染",
  "8.5.1 内容响应",
  "8.5.2 视图渲染",
  "8.5.3 模板",
  "8.5.4 BigPipe",
  "8.6 总结",
  "8.7 参考资源",
] as const;

export function Dnj08WebApplicationMapLab() {
  return (
    <DeepNodeOfficialLab
      title="第 8 章 构建 Web 应用 · 运行地图"
      label="Deep Node / Map"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Dnj08WebApplicationExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="第 8 章 构建 Web 应用 · 边界实验"
      label="Deep Node / Experiment"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Dnj08WebApplicationEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="第 8 章 构建 Web 应用 · 关闭证据"
      label="Deep Node / Evidence"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
