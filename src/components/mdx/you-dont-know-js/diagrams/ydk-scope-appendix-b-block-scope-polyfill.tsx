import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "识别块级声明",
  "分析捕获与重赋值",
  "生成函数包装",
  "重写引用位置",
  "执行旧环境版本",
  "用行为测试核对等价性",
] as const;

export function YdkScopeAppendixBBlockScopePolyfillMapLab() {
  return (
    <YdkjsMechanismLab
      title="附录 B 块作用域的替代方案"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkScopeAppendixBBlockScopePolyfillExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="附录 B 块作用域的替代方案"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkScopeAppendixBBlockScopePolyfillEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="附录 B 块作用域的替代方案"
      nodes={nodes}
      mode="evidence"
    />
  );
}
