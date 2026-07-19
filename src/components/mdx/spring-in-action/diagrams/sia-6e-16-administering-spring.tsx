import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-16-administering-spring",
  "title": "第16章 管理Spring应用",
  "concepts": [
    "16 Administering Spring",
    "16.1 Using Spring Boot Admin",
    "16.1.1 Creating an Admin server",
    "16.1.2 Registering Admin clients",
    "16.2 Exploring the Admin server",
    "16.2.1 Viewing general application health and information",
    "16.2.2 Watching key metrics",
    "16.2.3 Examining environment properties",
    "16.2.4 Viewing and setting logging levels",
    "16.3 Securing the Admin server",
    "16.3.1 Enabling login in the Admin server",
    "16.3.2 Authenticating with the Actuator",
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
    "studio": "Boot Admin注册与诊断台",
    "boundary": "client registration → admin server → actuator proxy",
    "axisA": {
      "label": "注册状态",
      "levels": [
        "首次",
        "过期",
        "重复实例"
      ]
    },
    "axisB": {
      "label": "凭据策略",
      "levels": [
        "明文",
        "受保护",
        "轮换"
      ]
    },
    "fault": "Admin UI显示绿色，但代理凭据过期或实例身份发生碰撞",
    "invariant": "实例ID唯一，注册租约可过期，管理访问经认证且不暴露客户端秘密",
    "signal": "注册事件、实例ID与代理授权",
    "practiceMode": "code",
    "metric": "Boot Admin注册与诊断台合同命中率",
    "risk": "凭据策略暴露风险",
    "task": "建立Spring Boot Admin服务端、客户端注册、运行视图和双向认证的管理面合同；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "管理面数据流、角色权限、注册认证测试、操作审计与版本兼容矩阵"
  }
} as const;

export function Sia616AdministeringSpringMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia616AdministeringSpringExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia616AdministeringSpringEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
