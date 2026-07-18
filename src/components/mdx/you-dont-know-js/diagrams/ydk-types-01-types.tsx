import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "表达式产生一个值",
  "值携带运行时类型",
  "typeof 执行分类",
  "识别 null 历史特例",
  "区分未声明与未赋值",
  "按用途选择可靠检测",
] as const;

export function YdkTypes01TypesMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 1 章 类型"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkTypes01TypesExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 1 章 类型"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkTypes01TypesEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 1 章 类型"
      nodes={nodes}
      mode="evidence"
    />
  );
}
