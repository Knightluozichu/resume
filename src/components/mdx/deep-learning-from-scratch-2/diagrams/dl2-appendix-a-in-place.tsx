import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-appendix-a-in-place",
  title: "附录A in-place运算（步骤14的补充内容）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "附录A in-place运算（步骤14的补充内容）",
    "A.1 问题确认",
    "A.2 关于复制和覆盖",
    "A.3 DeZero的反向传播",
  ],
  mechanism:
    "in-place 覆盖会改变别名共享的数据，反向传播需要前向原值时必须复制或禁止破坏性写入",
  success: "附录A in-place运算（步骤14的补充内容） 的前向、反向与重放证据一致",
  failure:
    "附录A in-place运算（步骤14的补充内容） 在“在多分支图中原地改写共享数组会让另一分支看到错误历史值”处拒绝",
} as const;

export function Dl2AppendixAInPlaceLab() {
  return <DezeroStepLab {...profile} />;
}
