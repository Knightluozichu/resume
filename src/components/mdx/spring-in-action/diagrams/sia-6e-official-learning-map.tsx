import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-official-learning-map",
  "title": "《Spring in Action（第6版）》权威学习地图",
  "concepts": [
    "Part 1. Foundational Spring",
    "1 Getting started with Spring",
    "2 Developing web applications",
    "3 Working with data",
    "4 Working with nonrelational data",
    "5 Securing Spring",
    "6 Working with configuration properties",
    "Part 2. Integrated Spring",
    "7 Creating REST services",
    "8 Securing REST",
    "9 Sending messages asynchronously",
    "10 Integrating Spring",
    "Part 3. Reactive Spring",
    "11 Introducing Reactor",
    "12 Developing reactive APIs",
    "13 Persisting data reactively",
    "14 Working with RSocket",
    "Part 4. Deployed Spring",
    "15 Working with Spring Boot Actuator",
    "16 Administering Spring",
    "17 Monitoring Spring with JMX",
    "18 Deploying Spring",
    "Appendix. Bootstrapping Spring applications"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "23单元迁移路线台",
    "boundary": "第6版目录 → 可执行切片 → 当前版本迁移",
    "axisA": {
      "label": "学习阶段",
      "levels": [
        "建模",
        "实现",
        "运维"
      ]
    },
    "axisB": {
      "label": "证据强度",
      "levels": [
        "术语",
        "测试",
        "故障恢复"
      ]
    },
    "fault": "只按技术名词跳读，无法说明跨章节状态和版本差异",
    "invariant": "每个正式单元都绑定输入、状态、副作用、失败与回滚证据",
    "signal": "路径完成率与迁移账本",
    "practiceMode": "design",
    "metric": "23单元迁移路线台合同命中率",
    "risk": "证据强度暴露风险",
    "task": "沿官方4个Part、18章和附录A规划Taco Cloud从开发到生产的连续证据链；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "255节点覆盖矩阵、章节依赖图、版本边界表和全书验收清单"
  }
} as const;

export function Sia6OfficialLearningMapMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia6OfficialLearningMapExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia6OfficialLearningMapEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
