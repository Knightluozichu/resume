import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-15-uras-architecture",
  "title": "第15页 专有架构：URAS渲染方案",
  "concepts": [
    "专有架构",
    "URAS渲染方案"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "URAS服务边界台",
    "boundary": "客户端 → View合同 → 后台渲染服务 → Surface → 系统合成器",
    "axisA": {
      "label": "服务职责",
      "levels": [
        "注册",
        "调度",
        "资源回收"
      ]
    },
    "axisB": {
      "label": "隔离对象",
      "levels": [
        "应用",
        "View",
        "显示设备"
      ]
    },
    "fault": "把URAS当作普通进程内UI组件",
    "invariant": "跨进程/跨View的所有权、配额、错误和生命周期在服务合同中明确",
    "probe": "interfaces: register+resize+remove\nownership: client+view+surface\nquotas: gpu+memory+frame",
    "signal": "注册、调度、资源与生命周期事件",
    "artifact": "URAS服务合同",
    "trap": "专有架构名称不能证明具体IPC、调度算法或安全等级",
    "practiceMode": "design"
  }
} as const;

export function Uhm2024Slide15UrasArchitectureScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide15UrasArchitectureDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide15UrasArchitectureRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide15UrasArchitectureMapLab = Uhm2024Slide15UrasArchitectureScopeLab;
export const Uhm24Slide15UrasArchitectureExperimentLab = Uhm2024Slide15UrasArchitectureDecisionLab;
export const Uhm24Slide15UrasArchitectureEvidenceLab = Uhm2024Slide15UrasArchitectureRecoveryLab;
