import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "定义对象不变量",
  "配置属性描述符",
  "建立原型委托",
  "初始化实例状态",
  "扩展继承关系",
  "检查身份与封装",
] as const;

export function Jpg08ObjectsClassesOopMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 8 章 对象、类与面向对象编程"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg08ObjectsClassesOopExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 8 章 对象、类与面向对象编程"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg08ObjectsClassesOopEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 8 章 对象、类与面向对象编程"
      nodes={nodes}
      mode="evidence"
    />
  );
}
