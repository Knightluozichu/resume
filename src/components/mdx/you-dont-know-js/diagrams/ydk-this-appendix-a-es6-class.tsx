import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "声明类与原型方法",
  "用 new 创建实例",
  "constructor 初始化状态",
  "extends 建立两层原型关系",
  "super 解析父级方法",
  "检查语法糖之外的运行时链接",
] as const;

export function YdkThisAppendixAEs6ClassMapLab() {
  return (
    <YdkjsMechanismLab
      title="附录 A ES6 中的 class"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkThisAppendixAEs6ClassExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="附录 A ES6 中的 class"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkThisAppendixAEs6ClassEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="附录 A ES6 中的 class"
      nodes={nodes}
      mode="evidence"
    />
  );
}
