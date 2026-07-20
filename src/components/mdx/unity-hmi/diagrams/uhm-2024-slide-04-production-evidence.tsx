import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-04-production-evidence",
  "title": "第4页 量产采用证据",
  "concepts": [
    "85%：智能电动车品类中使用Unity打造实时3D HMI的车厂比例",
    "35：Unity中国合作整车厂商数量",
    "68：搭载Unity引擎驱动HMI的量产车型数量",
    "统计为UNITE 2024演讲时点口径"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "采用数字核验台",
    "boundary": "口径 → 分母 → 时间点 → 样本 → 可复核结论",
    "axisA": {
      "label": "统计口径",
      "levels": [
        "车企",
        "合作厂商",
        "量产车型"
      ]
    },
    "axisB": {
      "label": "核验状态",
      "levels": [
        "演讲原值",
        "外部交叉核对",
        "项目禁用外推"
      ]
    },
    "fault": "忽略分母和截止日期，把85%、35、68当成当前市场事实",
    "invariant": "三组数字只在演讲的2024时点和原口径内陈述，不外推产品适用性",
    "probe": "claims: [85_percent, 35_oems, 68_models]\nas_of: UNITE-2024\nengineering_conclusion: none",
    "signal": "口径、时间戳与外推警告",
    "artifact": "采用声明证据卡",
    "trap": "采用规模不能证明性能、安全或某一目标平台可部署",
    "practiceMode": "diagnosis"
  }
} as const;

export function Uhm2024Slide04ProductionEvidenceScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide04ProductionEvidenceDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide04ProductionEvidenceRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide04ProductionEvidenceMapLab = Uhm2024Slide04ProductionEvidenceScopeLab;
export const Uhm24Slide04ProductionEvidenceExperimentLab = Uhm2024Slide04ProductionEvidenceDecisionLab;
export const Uhm24Slide04ProductionEvidenceEvidenceLab = Uhm2024Slide04ProductionEvidenceRecoveryLab;
