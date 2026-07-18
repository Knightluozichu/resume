import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "构造请求与凭据",
  "通过同源或CORS检查",
  "接收状态头与流",
  "判定业务成功",
  "处理取消重试",
  "关闭连接与释放读取器",
] as const;

export function Jpg24NetworkRequestsMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 24 章 网络请求与远程资源"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg24NetworkRequestsExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 24 章 网络请求与远程资源"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg24NetworkRequestsEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 24 章 网络请求与远程资源"
      nodes={nodes}
      mode="evidence"
    />
  );
}
