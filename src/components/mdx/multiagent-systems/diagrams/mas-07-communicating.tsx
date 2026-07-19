import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-07-communicating",
  "title": "Chapter 7 Communicating",
  "question": "买方代理发起请求、接收提案、确认并处理超时",
  "actors": [
    "言语行为代理",
    "KQML代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "形成意图",
    "编码消息",
    "路由传输",
    "解释语义",
    "更新承诺"
  ],
  "concepts": [
    "Chapter 7 Communicating",
    "7.1 Speech Acts",
    "7.1.1 Austin",
    "7.1.2 Searle",
    "7.1.3 The plan-based theory of speech acts",
    "7.1.4 Speech acts as rational action",
    "7.2 Agent Communication Languages",
    "7.2.1 KQML",
    "7.2.2 The FIPA Agent Communication Language",
    "7.2.3 JADE"
  ],
  "interventions": [
    {
      "label": "公开言语行为",
      "detail": "让所有评审者看到言语行为的定义，保持KQML和FIPA ACL不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验FIPA ACL",
      "detail": "在FIPA ACL进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过会话状态",
      "detail": "跳过会话状态直接追求JADE，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "言语行为不稳定度",
    "FIPA ACL联合收益",
    "JADE可追踪度"
  ],
  "partialNote": "语法兼容不代表语义兼容，协议状态和本体版本必须共同验证。",
  "strategicNote": "拒绝原因：接收方识别 INFORM 字段，却在错误会话状态接受了过期内容。"
} as const;

export function Mas07CommunicatingModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas07CommunicatingInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas07CommunicatingEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
