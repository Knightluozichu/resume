import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-10-testing",
  title: "步骤10 测试",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤10 测试",
    "10.1 Python的单元测试",
    "10.2 square函数反向传播的测试",
    "10.3 通过梯度检验来自动测试",
    "10.4 测试小结",
  ],
  mechanism:
    "单元测试分别验证 forward、backward 与 numerical gradient，把框架语义固定成可回归合同",
  success: "步骤10 测试 的前向、反向与重放证据一致",
  failure:
    "步骤10 测试 在“只测最终函数值会漏掉 creator 断链和局部梯度错误”处拒绝",
} as const;

export function Dl2Step10TestingLab() {
  return <DezeroStepLab {...profile} />;
}
