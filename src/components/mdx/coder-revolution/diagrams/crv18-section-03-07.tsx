import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-03-07",
  title: "3.7 我是一个函数",
  family: "language",
  nodes: ["绑定参数", "建立栈帧", "执行函数体", "返回或抛错", "释放栈帧"],
  concepts: ["3.7 我是一个函数"],
  mechanism:
    "函数把参数、局部状态、返回值与异常封装成调用合同；调用栈保存活动记录，纯函数还能用相同输入重放结果",
  success: "3.7 我是一个函数 的输入、机制、输出与复位轨迹一致",
  failure:
    "3.7 我是一个函数 在“函数暗中修改全局状态，使同样输入在不同调用次序下产生不同结果”处拒绝",
} as const;

export function Crv18Section0307Lab() {
  return <CoderMechanismLab {...profile} />;
}
