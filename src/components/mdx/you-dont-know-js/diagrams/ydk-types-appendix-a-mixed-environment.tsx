import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "锁定 ECMAScript 基线",
  "识别宿主提供的对象",
  "检查 polyfill 注入",
  "避免跨 realm 的 instanceof 假设",
  "用行为做特性检测",
  "隔离原生原型修改",
] as const;

export function YdkTypesAppendixAMixedEnvironmentMapLab() {
  return (
    <YdkjsMechanismLab
      title="附录 A 混合环境 JavaScript"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkTypesAppendixAMixedEnvironmentExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="附录 A 混合环境 JavaScript"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkTypesAppendixAMixedEnvironmentEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="附录 A 混合环境 JavaScript"
      nodes={nodes}
      mode="evidence"
    />
  );
}
