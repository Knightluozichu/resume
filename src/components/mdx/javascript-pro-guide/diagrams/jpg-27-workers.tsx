import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "创建工作者",
  "完成脚本与版本装载",
  "建立消息协议",
  "复制转移或共享数据",
  "处理错误取消",
  "终止或激活新版本",
] as const;

export function Jpg27WorkersMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 27 章 工作者线程"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg27WorkersExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 27 章 工作者线程"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg27WorkersEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 27 章 工作者线程"
      nodes={nodes}
      mode="evidence"
    />
  );
}
