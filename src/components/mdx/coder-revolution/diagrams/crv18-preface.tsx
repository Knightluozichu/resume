import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-preface",
  title: "前言",
  family: "book",
  nodes: ["故事问题", "真实对象", "状态变化", "边界反例", "迁移复核"],
  concepts: ["前言"],
  mechanism:
    "故事负责建立动机，机制图负责列出对象、状态、边界和可推翻的证据；两者通过一张类比拆解表连接",
  success: "前言 的输入、机制、输出与复位轨迹一致",
  failure: "前言 在“复述人物行为却说不出真实组件的输入、状态和失败条件”处拒绝",
} as const;

export function Crv18PrefaceLab() {
  return <CoderMechanismLab {...profile} />;
}
