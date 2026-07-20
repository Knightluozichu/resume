import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-03-made-with-unity",
  "title": "第3页 Made with Unity",
  "concepts": [
    "Made with Unity",
    "第3页 Made with Unity的不能推出项",
    "第3页 Made with Unity的恢复证据"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "证据类型分流台",
    "boundary": "分隔页 → 采用案例 → 性能预算 → 平台与架构证据",
    "axisA": {
      "label": "证据种类",
      "levels": [
        "展示",
        "统计",
        "可复现实验"
      ]
    },
    "axisB": {
      "label": "结论强度",
      "levels": [
        "存在",
        "适用",
        "量产通过"
      ]
    },
    "fault": "用车型图片证明指定版本组合稳定",
    "invariant": "展示材料只支持存在性，适用性和量产性必须补充配置与实验",
    "probe": "claim: Made-with-Unity\nevidence_class: showcase\nrequired_next: configuration+measurement",
    "signal": "展示证据等级与缺口",
    "artifact": "主张分级表",
    "trap": "Made with Unity不等于本项目使用相同架构或达到相同性能",
    "practiceMode": "design",
    "metric": "证据类型分流台可信度",
    "risk": "证据种类误判风险",
    "task": "围绕第3页 Made with Unity固定输入与目标配置；只改变证据种类或结论强度，保存基线、故障、恢复和复位证据。"
  }
} as const;

export function Uhm2024Slide03MadeWithUnityScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide03MadeWithUnityDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide03MadeWithUnityRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide03MadeWithUnityMapLab = Uhm2024Slide03MadeWithUnityScopeLab;
export const Uhm24Slide03MadeWithUnityExperimentLab = Uhm2024Slide03MadeWithUnityDecisionLab;
export const Uhm24Slide03MadeWithUnityEvidenceLab = Uhm2024Slide03MadeWithUnityRecoveryLab;
