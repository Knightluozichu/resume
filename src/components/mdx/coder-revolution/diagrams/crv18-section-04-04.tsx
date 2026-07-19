import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-04-04",
  title: "4.4 敏捷下的单元测试",
  family: "engineering",
  nodes: ["安排夹具", "执行单元", "断言结果", "清理状态", "回归重放"],
  concepts: ["4.4 敏捷下的单元测试", "敏捷运动", "困惑", "讨论", "一年以后"],
  mechanism:
    "单元测试在隔离边界内安排输入、执行行为并断言结果；敏捷迭代依赖快速、确定、可重复的反馈而非测试数量",
  success: "4.4 敏捷下的单元测试 的输入、机制、输出与复位轨迹一致",
  failure:
    "4.4 敏捷下的单元测试 在“测试依赖真实时间、网络或共享数据库，导致相同代码随机红绿”处拒绝",
} as const;

export function Crv18Section0404Lab() {
  return <CoderMechanismLab {...profile} />;
}
