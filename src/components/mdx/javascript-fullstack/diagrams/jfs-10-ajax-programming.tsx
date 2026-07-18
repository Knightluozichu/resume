import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "构造请求契约",
  "发送异步 HTTP",
  "等待响应头和正文",
  "按状态码分类",
  "解析并提交界面",
  "取消迟到请求",
] as const;

export function Jfs10AjaxProgrammingMapLab() {
  return (
    <JfsBookLab
      title="第 10 章 AJAX 编程方法 · 机制地图"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs10AjaxProgrammingExperimentLab() {
  return (
    <JfsBookLab
      title="第 10 章 AJAX 编程方法 · 边界实验"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs10AjaxProgrammingEvidenceLab() {
  return (
    <JfsBookLab
      title="第 10 章 AJAX 编程方法 · 恢复证据"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="evidence"
    />
  );
}
