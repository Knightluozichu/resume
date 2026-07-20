import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-01-cover",
  "title": "第1页 Unity for HMI",
  "concepts": [
    "Unity for HMI",
    "第1页 Unity for HMI的不能推出项",
    "第1页 Unity for HMI的恢复证据"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "课程对象边界板",
    "boundary": "Unity HMI主题 → 车载显示对象 → 非目标范围 → 交付责任",
    "axisA": {
      "label": "显示对象",
      "levels": [
        "仪表",
        "中控",
        "附加屏"
      ]
    },
    "axisB": {
      "label": "项目阶段",
      "levels": [
        "概念",
        "原型",
        "量产"
      ]
    },
    "fault": "把普通游戏UI教程包装成车载HMI课程",
    "invariant": "受众、目标显示、信号边界和量产责任在进入后续页前明确",
    "probe": "audience: product+design+engineering\ndisplays: cluster+ivi+other\nnon_goals: generic-game-ui",
    "signal": "范围声明与非目标清单",
    "artifact": "课程范围卡与责任矩阵",
    "trap": "封面标题本身不提供任何平台、性能或安全保证",
    "practiceMode": "design",
    "metric": "课程对象边界板可信度",
    "risk": "显示对象误判风险",
    "task": "围绕第1页 Unity for HMI固定输入与目标配置；只改变显示对象或项目阶段，保存基线、故障、恢复和复位证据。"
  }
} as const;

export function Uhm2024Slide01CoverScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide01CoverDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide01CoverRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide01CoverMapLab = Uhm2024Slide01CoverScopeLab;
export const Uhm24Slide01CoverExperimentLab = Uhm2024Slide01CoverDecisionLab;
export const Uhm24Slide01CoverEvidenceLab = Uhm2024Slide01CoverRecoveryLab;
