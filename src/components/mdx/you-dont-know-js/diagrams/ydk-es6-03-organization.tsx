import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "为数据实现迭代入口",
  "按需产生下一项",
  "用模块导出稳定绑定",
  "由导入方建立静态依赖",
  "用类语法组织实例方法",
  "检查底层协议和原型链接",
] as const;

export function YdkEs603OrganizationMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 3 章 代码组织"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkEs603OrganizationExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 3 章 代码组织"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkEs603OrganizationEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 3 章 代码组织"
      nodes={nodes}
      mode="evidence"
    />
  );
}
