import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "为操作建立所有权",
  "启动多个异步分支",
  "传播取消或超时信号",
  "只接受满足策略的结果",
  "丢弃或补偿迟到结果",
  "清理计时器监听器和资源",
] as const;

export function YdkAsyncAppendixBAdvancedPatternsMapLab() {
  return (
    <YdkjsMechanismLab
      title="附录 B 高级异步模式"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkAsyncAppendixBAdvancedPatternsExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="附录 B 高级异步模式"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkAsyncAppendixBAdvancedPatternsEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="附录 B 高级异步模式"
      nodes={nodes}
      mode="evidence"
    />
  );
}
