import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "提出可证伪性能问题",
  "固定环境与输入",
  "预热 JIT 和缓存",
  "交替运行多个样本",
  "比较分布而非单次值",
  "回到真实负载验证收益",
] as const;

export function YdkAsync06BenchmarkingTuningMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 6 章 性能测试与调优"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkAsync06BenchmarkingTuningExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 6 章 性能测试与调优"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkAsync06BenchmarkingTuningEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 6 章 性能测试与调优"
      nodes={nodes}
      mode="evidence"
    />
  );
}
