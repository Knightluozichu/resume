import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-part-2-integrated-spring",
  "title": "Part 2 集成Spring",
  "concepts": [
    "Part 2. Integrated Spring",
    "Part 2 集成Spring：受控失败边界",
    "Part 2 集成Spring：恢复与发布证据"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "同步与异步边界选择台",
    "boundary": "HTTP/API → message/channel → downstream effect",
    "axisA": {
      "label": "耦合方式",
      "levels": [
        "同步",
        "队列",
        "集成流"
      ]
    },
    "axisB": {
      "label": "交付风险",
      "levels": [
        "重复",
        "乱序",
        "毒消息"
      ]
    },
    "fault": "为了异步而异步，新增代理却没有定义确认、幂等和补偿",
    "invariant": "每条跨系统边界都有明确所有者、交付语义、超时预算和恢复路径",
    "signal": "关联ID、确认位置与死信记录",
    "practiceMode": "design",
    "metric": "同步与异步边界选择台合同命中率",
    "risk": "交付风险暴露风险",
    "task": "把同步REST、OAuth2、异步消息和企业集成流统一到明确的边界合同；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "集成上下文图、协议决策表、失败注入脚本与端到端追踪记录"
  }
} as const;

export function Sia6Part2IntegratedSpringMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia6Part2IntegratedSpringExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia6Part2IntegratedSpringEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
