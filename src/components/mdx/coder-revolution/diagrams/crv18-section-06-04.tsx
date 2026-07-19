import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-06-04",
  title: "6.4 对自己狠一点，开始写作吧",
  family: "growth",
  nodes: ["选择读者", "写出主张", "补充证据", "邀请复现", "根据反馈修订"],
  concepts: ["6.4 对自己狠一点，开始写作吧"],
  mechanism:
    "技术写作先定义读者问题和中心主张，再组织证据、示例、反例与修改；发布后的误解和复现结果进入下一轮修订",
  success: "6.4 对自己狠一点，开始写作吧 的输入、机制、输出与复位轨迹一致",
  failure:
    "6.4 对自己狠一点，开始写作吧 在“堆积术语和链接却没有明确读者、主张与可复现实例”处拒绝",
} as const;

export function Crv18Section0604Lab() {
  return <CoderMechanismLab {...profile} />;
}
