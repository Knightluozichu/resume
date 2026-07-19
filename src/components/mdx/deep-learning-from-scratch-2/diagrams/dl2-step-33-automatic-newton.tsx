import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-33-automatic-newton",
  title: "步骤33 使用牛顿法进行优化（自动计算）",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤33 使用牛顿法进行优化（自动计算）",
    "33.1 求二阶导数",
    "33.2 使用牛顿法进行优化",
  ],
  mechanism:
    "先 backward(create_graph=True) 得到一阶 Variable，再清 x.grad 并对一阶梯度 backward 得到二阶导",
  success: "步骤33 使用牛顿法进行优化（自动计算） 的前向、反向与重放证据一致",
  failure:
    "步骤33 使用牛顿法进行优化（自动计算） 在“未清除一阶梯度就二次 backward 会把不同阶的贡献相加”处拒绝",
} as const;

export function Dl2Step33AutomaticNewtonLab() {
  return <DezeroStepLab {...profile} />;
}
