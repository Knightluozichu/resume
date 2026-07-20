import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-21-service-model",
  "title": "第21页 创新、实施与迭代服务模式",
  "concepts": [
    "Do the Innovative and feasible thing",
    "Innovation创新咨询",
    "前瞻趋势研究",
    "概念创意脑暴",
    "市场产品调研",
    "高阶人才培训",
    "技术可行性评估",
    "XR模拟用户体验",
    "交互座舱原型制作",
    "Do things Innovative and feasible",
    "Implementation项目合作",
    "PoC项目开发",
    "量产项目开发",
    "美术资产支持",
    "量产部署支持",
    "全链路软件支持",
    "性能调优可选",
    "人才培训可选",
    "Assist with Doing Things",
    "Iteration与ISS服务",
    "专业支持与团队提升",
    "性能调优服务",
    "关键节点评估",
    "开发流程培训",
    "产品规划建议",
    "新产品优先试用",
    "新技术落地共研",
    "3D团队搭建与培训",
    "产品与技术Workshop",
    "丰富灵活的服务模式"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "创新到ISS阶段门",
    "boundary": "创新咨询 → PoC → 量产实施 → ISS迭代 → 团队接管",
    "axisA": {
      "label": "合作阶段",
      "levels": [
        "创新",
        "实施",
        "迭代"
      ]
    },
    "axisB": {
      "label": "退出门",
      "levels": [
        "可行性",
        "量产证据",
        "接管能力"
      ]
    },
    "fault": "PoC画面通过就直接进入量产交付",
    "invariant": "每个阶段有输入、RACI、交付物、退出条件、遗留风险和下一责任人",
    "probe": "gates: innovation+implementation+iteration\nrequired: owner+artifact+exit-criteria\nhandover: runbook+training",
    "signal": "阶段门失败与遗留风险",
    "artifact": "服务阶段验收包",
    "trap": "服务项目数量不能替代范围、工期、验收和知识转移合同",
    "practiceMode": "design",
    "metric": "创新到ISS阶段门可信度",
    "risk": "合作阶段误判风险",
    "task": "围绕第21页 创新、实施与迭代服务模式固定输入与目标配置；只改变合作阶段或退出门，保存基线、故障、恢复和复位证据。"
  }
} as const;

export function Uhm2024Slide21ServiceModelScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide21ServiceModelDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide21ServiceModelRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide21ServiceModelMapLab = Uhm2024Slide21ServiceModelScopeLab;
export const Uhm24Slide21ServiceModelExperimentLab = Uhm2024Slide21ServiceModelDecisionLab;
export const Uhm24Slide21ServiceModelEvidenceLab = Uhm2024Slide21ServiceModelRecoveryLab;
