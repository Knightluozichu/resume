import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-17-uras-view-isolation",
  "title": "第17页 URAS View组件与隔离工程",
  "concepts": [
    "每个应用只需集成View组件",
    "脱离Activity",
    "同一页面可有多个View",
    "节省系统资源",
    "实现隔离工程",
    "共享Unity后台渲染服务",
    "车模车控、ADAS与APA视图",
    "音乐、地图与其他应用视图"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "View生命周期隔离台",
    "boundary": "应用View → 注册 → Surface变化 → 多View → 退出/重连",
    "axisA": {
      "label": "生命周期事件",
      "levels": [
        "创建",
        "尺寸变化",
        "销毁重建"
      ]
    },
    "axisB": {
      "label": "客户端状态",
      "levels": [
        "健康",
        "卡顿",
        "退出"
      ]
    },
    "fault": "销毁Activity后遗留Surface和GPU资源",
    "invariant": "任一View退出或重建不破坏其他View，资源在规定时限内回收",
    "probe": "events: attach+resize+detach\nassertions: owner+surface+input-route\nfault: kill-one-client",
    "signal": "存活View、资源回收与重连时间",
    "artifact": "View隔离故障记录",
    "trap": "脱离Activity与同页多View是能力主张，隔离程度仍要用故障验证",
    "practiceMode": "diagnosis",
    "metric": "View生命周期隔离台可信度",
    "risk": "生命周期事件误判风险",
    "task": "围绕第17页 URAS View组件与隔离工程固定输入与目标配置；只改变生命周期事件或客户端状态，保存基线、故障、恢复和复位证据。"
  }
} as const;

export function Uhm2024Slide17UrasViewIsolationScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide17UrasViewIsolationDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide17UrasViewIsolationRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide17UrasViewIsolationMapLab = Uhm2024Slide17UrasViewIsolationScopeLab;
export const Uhm24Slide17UrasViewIsolationExperimentLab = Uhm2024Slide17UrasViewIsolationDecisionLab;
export const Uhm24Slide17UrasViewIsolationEvidenceLab = Uhm2024Slide17UrasViewIsolationRecoveryLab;
