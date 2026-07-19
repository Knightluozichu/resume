import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-05-securing-spring",
  "title": "第5章 保护Spring应用",
  "concepts": [
    "5 Securing Spring",
    "5.1 Enabling Spring Security",
    "5.2 Configuring authentication",
    "5.2.1 In-memory user details service",
    "5.2.2 Customizing user authentication",
    "5.3 Securing web requests",
    "5.3.1 Securing requests",
    "5.3.2 Creating a custom login page",
    "5.3.3 Enabling third-party authentication",
    "5.3.4 Logging out",
    "5.3.5 Preventing cross-site request forgery",
    "5.4 Applying method-level security",
    "5.5 Knowing your user",
    "5.6 Summary"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "过滤链与授权决策台",
    "boundary": "credentials → authentication → authorization → controller",
    "axisA": {
      "label": "调用身份",
      "levels": [
        "匿名",
        "合法用户",
        "越权用户"
      ]
    },
    "axisB": {
      "label": "保护位置",
      "levels": [
        "请求",
        "方法",
        "数据对象"
      ]
    },
    "fault": "只隐藏页面按钮，却允许越权请求直接命中服务方法",
    "invariant": "默认拒绝，身份来源可追溯，请求与方法授权对同一资源保持一致",
    "signal": "SecurityContext、决策事件与403断言",
    "practiceMode": "code",
    "metric": "过滤链与授权决策台合同命中率",
    "risk": "保护位置暴露风险",
    "task": "把认证、授权、会话、CSRF、方法安全和当前主体分成可独立验证的安全合同；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "威胁模型、过滤链规则表、授权矩阵、CSRF测试与主体传播记录"
  }
} as const;

export function Sia605SecuringSpringMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia605SecuringSpringExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia605SecuringSpringEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
