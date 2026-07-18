import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第10章 标量优化",
  label: "第10章 标量优化",
  color: "#5b21b6",
  soft: "#ede9fe",
  chain: [
    "建立变换前事实",
    "选取候选",
    "证明安全条件",
    "重写CFG与IR",
    "重算失效分析",
    "执行差分回归",
  ],
  concepts: [
    "第10章 标量优化",
    "10.1 简介",
    "10.2 消除无用和不可达代码",
    "10.2.1 消除无用代码",
    "10.2.2 消除无用控制流",
    "10.2.3 消除不可达代码",
    "10.3 代码移动",
    "10.3.1 缓式代码移动",
    "10.3.2 代码提升",
    "10.4 特化",
    "10.4.1 尾调用优化",
    "10.4.2 叶调用优化",
    "10.4.3 参数提升",
    "10.5 冗余消除",
    "10.5.1 值相同与名字相同",
    "10.5.2 基于支配者的值编号算法",
    "10.6 为其他变换制造时机",
    "10.6.1 超级块复制",
    "10.6.2 过程复制",
    "10.6.3 循环外提",
    "10.6.4 重命名",
    "10.7 高级主题",
    "10.7.1 合并优化",
    "10.7.2 强度削减",
    "10.7.3 选择一种优化序列",
    "10.8 小结和展望",
  ],
} as const;

export function Eac10ScalarOptimizationsMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac10ScalarOptimizationsExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac10ScalarOptimizationsEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
