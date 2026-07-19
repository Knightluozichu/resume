import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-appendix-b-get-item",
  title: "附录B 实现get_item函数（步骤47的补充内容）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: ["附录B 实现get_item函数（步骤47的补充内容）"],
  mechanism:
    "get_item forward 保存切片索引，backward 用散射加法把上游梯度放回原张量对应位置",
  success:
    "附录B 实现get_item函数（步骤47的补充内容） 的前向、反向与重放证据一致",
  failure:
    "附录B 实现get_item函数（步骤47的补充内容） 在“重复索引用普通赋值而非 add-at 会漏掉重复位置的梯度累加”处拒绝",
} as const;

export function Dl2AppendixBGetItemLab() {
  return <DezeroStepLab {...profile} />;
}
