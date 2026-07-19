import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-29-manual-newton",
  title: "步骤29 使用牛顿法进行优化（手动计算）",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤29 使用牛顿法进行优化（手动计算）",
    "29.1 使用牛顿法进行优化的理论知识",
    "29.2 使用牛顿法实现优化",
  ],
  mechanism:
    "一维牛顿法用一阶导数除以二阶导数自适应步长，手算二阶信息作为高阶自动微分基线",
  success: "步骤29 使用牛顿法进行优化（手动计算） 的前向、反向与重放证据一致",
  failure:
    "步骤29 使用牛顿法进行优化（手动计算） 在“二阶导数接近零会放大步长并导致发散”处拒绝",
} as const;

export function Dl2Step29ManualNewtonLab() {
  return <DezeroStepLab {...profile} />;
}
