import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-official-learning-map",
  title: "《码农翻身》权威学习地图",
  family: "book",
  nodes: ["系统基础", "Java运行时", "Web协议", "工程变更", "语言与成长"],
  concepts: [],
  mechanism:
    "学习地图把 60 个正式单元按计算机基础、Java、Web、代码管理、编程语言和职业精进连接成先机制后应用的依赖路线",
  success: "《码农翻身》权威学习地图 的输入、机制、输出与复位轨迹一致",
  failure:
    "《码农翻身》权威学习地图 在“按标题随机跳读，遇到 Web 或框架问题时无法回到线程、协议和运行时前置模型”处拒绝",
} as const;

export function Crv18OfficialLearningMapLab() {
  return <CoderMechanismLab {...profile} />;
}
