import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-05-05",
  title: "5.5 命令式编程 VS 声明式编程",
  family: "language",
  nodes: ["描述目标", "解析约束", "生成计划", "执行计划", "核对结果"],
  concepts: [
    "5.5 命令式编程 VS 声明式编程",
    "一则小故事",
    "命令式编程",
    "声明式编程",
  ],
  mechanism:
    "命令式程序给出状态变化步骤，声明式程序描述期望关系或结果并把求解策略交给执行器；两者可在不同层次组合",
  success: "5.5 命令式编程 VS 声明式编程 的输入、机制、输出与复位轨迹一致",
  failure:
    "5.5 命令式编程 VS 声明式编程 在“认为声明式描述没有执行成本，忽略查询计划、求解策略和数据规模”处拒绝",
} as const;

export function Crv18Section0505Lab() {
  return <CoderMechanismLab {...profile} />;
}
