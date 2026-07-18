import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "确认输入MIME",
  "解析XML文档",
  "检测parsererror",
  "绑定命名空间",
  "执行XPath或XSLT",
  "序列化并验证输出",
] as const;

export function Jpg22WorkingWithXmlMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 22 章 处理XML"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg22WorkingWithXmlExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 22 章 处理XML"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg22WorkingWithXmlEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 22 章 处理XML"
      nodes={nodes}
      mode="evidence"
    />
  );
}
