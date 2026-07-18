import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e10NumbersStaticsMapLab() {
  return (
    <HfjReferenceMapLab
      title="第10章 数字很重要：数字与静态成员 · 对象/执行图"
      focus="区分实例成员与类成员，掌握常量、包装、自动装箱、解析和格式化的边界"
      stages={stages}
    />
  );
}

export function Hfj3e10NumbersStaticsExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第10章 数字很重要：数字与静态成员 · 执行实验"
      focus="static 访问矩阵、装箱身份反例与格式化契约测试"
      stages={stages}
    />
  );
}

export function Hfj3e10NumbersStaticsEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第10章 数字很重要：数字与静态成员 · 失败证据"
      focus="用 static 制造隐式全局状态，或把包装对象身份比较误当成数值相等"
      stages={stages}
    />
  );
}
