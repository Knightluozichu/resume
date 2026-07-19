import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-official-final-review",
  title: "《码农翻身》全书综合复核",
  family: "book",
  nodes: ["用户请求", "运行时处理", "状态持久化", "变更发布", "反馈复盘"],
  concepts: [],
  mechanism:
    "总复习用一次线上请求和一次可审查变更贯穿 CPU、线程、TCP、TLS、Java、数据库、Git、构建、测试和复盘",
  success: "《码农翻身》全书综合复核 的输入、机制、输出与复位轨迹一致",
  failure:
    "《码农翻身》全书综合复核 在“能复述每章名词，却不能从用户现象定位到协议、运行时、数据或变更链的最早偏离点”处拒绝",
} as const;

export function Crv18OfficialFinalReviewLab() {
  return <CoderMechanismLab {...profile} />;
}
