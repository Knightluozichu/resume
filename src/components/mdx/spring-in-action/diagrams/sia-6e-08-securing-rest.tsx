import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-08-securing-rest",
  "title": "第8章 保护REST API",
  "concepts": [
    "8 Securing REST",
    "8.1 Introducing OAuth 2",
    "8.2 Creating an authorization server",
    "8.3 Securing an API with a resource server",
    "8.4 Developing the client",
    "Summary"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "OAuth2授权码与资源服务器台",
    "boundary": "client → authorization server → token → resource server",
    "axisA": {
      "label": "令牌状态",
      "levels": [
        "合法",
        "过期",
        "伪造"
      ]
    },
    "axisB": {
      "label": "授权范围",
      "levels": [
        "不足",
        "恰好",
        "过宽"
      ]
    },
    "fault": "只验证JWT签名，却忽略issuer、audience、过期时间与scope",
    "invariant": "资源服务器只接受预期签发者、受众和最小权限的有效令牌",
    "signal": "令牌声明、授权决策与401/403差异",
    "practiceMode": "code",
    "metric": "OAuth2授权码与资源服务器台合同命中率",
    "risk": "授权范围暴露风险",
    "task": "把OAuth2角色、授权流程、令牌受众、作用域与客户端责任映射到信任边界；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "信任边界图、流程选择记录、JWT负例集、作用域矩阵与密钥轮换演练"
  }
} as const;

export function Sia608SecuringRestMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia608SecuringRestExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia608SecuringRestEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
