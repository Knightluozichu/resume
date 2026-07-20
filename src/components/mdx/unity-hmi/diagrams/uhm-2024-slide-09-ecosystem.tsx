import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-09-ecosystem",
  "title": "第9页 地图方案与合作伙伴生态",
  "concepts": [
    "Supported Mapping Solutions",
    "Apple Maps",
    "腾讯地图",
    "高德地图",
    "Google Maps",
    "HERE",
    "Mapbox",
    "Partner Ecosystem",
    "ICONA",
    "TCL CSOT",
    "WANOS",
    "Dolby",
    "更多生态伙伴持续加入"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "地图与伙伴依赖台",
    "boundary": "SDK/数据许可 → 适配层 → 缓存 → HMI视图 → 安全降级",
    "axisA": {
      "label": "伙伴状态",
      "levels": [
        "在线",
        "延迟",
        "不可用"
      ]
    },
    "axisB": {
      "label": "数据模式",
      "levels": [
        "在线",
        "离线缓存",
        "受控兜底"
      ]
    },
    "fault": "地图或音画SDK退出后让关键驾驶信息一并消失",
    "invariant": "第三方版本、许可、数据新鲜度、超时与安全兜底可独立验证",
    "probe": "dependency_lock: sdk+license+schema\nfaults: timeout+bad-data+offline\nfallback: safety-owned-channel",
    "signal": "数据时效、SDK错误与降级时刻",
    "artifact": "伙伴依赖合同",
    "trap": "合作伙伴名单不等于已集成、已授权或已通过量产验收",
    "practiceMode": "diagnosis",
    "metric": "地图与伙伴依赖台可信度",
    "risk": "伙伴状态误判风险",
    "task": "围绕第9页 地图方案与合作伙伴生态固定输入与目标配置；只改变伙伴状态或数据模式，保存基线、故障、恢复和复位证据。"
  }
} as const;

export function Uhm2024Slide09EcosystemScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide09EcosystemDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide09EcosystemRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide09EcosystemMapLab = Uhm2024Slide09EcosystemScopeLab;
export const Uhm24Slide09EcosystemExperimentLab = Uhm2024Slide09EcosystemDecisionLab;
export const Uhm24Slide09EcosystemEvidenceLab = Uhm2024Slide09EcosystemRecoveryLab;
