import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-official-learning-map",
  title: "《深度学习入门2：自制框架》权威学习地图",
  family: "book",
  nodes: ["前置合同", "新增能力", "最小验证", "故障注入", "跨步复用"],
  concepts: [],
  mechanism:
    "五阶段把 60 步组织成自动微分、自然表达、高阶导数、神经网络和高级挑战的依赖链",
  success: "《深度学习入门2：自制框架》权威学习地图 的前向、反向与重放证据一致",
  failure:
    "《深度学习入门2：自制框架》权威学习地图 在“跳过早期图语义直接训练 CNN 会让 shape 或梯度错误无法定位”处拒绝",
} as const;

export function Dl2OfficialLearningMapLab() {
  return <DezeroStepLab {...profile} />;
}
