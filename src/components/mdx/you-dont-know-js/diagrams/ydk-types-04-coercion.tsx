import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "读取运算符与操作数类型",
  "必要时把对象转为原始值",
  "按抽象操作转换目标类型",
  "执行数值、字符串或布尔运算",
  "对宽松相等递归应用规则",
  "保留转换前后证据",
] as const;

export function YdkTypes04CoercionMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 4 章 强制类型转换"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkTypes04CoercionExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 4 章 强制类型转换"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkTypes04CoercionEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 4 章 强制类型转换"
      nodes={nodes}
      mode="evidence"
    />
  );
}
