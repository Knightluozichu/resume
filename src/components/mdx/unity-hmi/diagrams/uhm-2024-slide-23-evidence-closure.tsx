import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-23-evidence-closure",
  "title": "第23页 Thank you与证据闭环",
  "concepts": [
    "Thank you",
    "23页演讲稿结束",
    "逐页证据闭环"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "演讲证据出口台",
    "boundary": "Thank you → 页码索引 → 未决问题 → 目标机证据 → 决策签署",
    "axisA": {
      "label": "关闭状态",
      "levels": [
        "已核对",
        "待验证",
        "不适用"
      ]
    },
    "axisB": {
      "label": "签署角色",
      "levels": [
        "产品",
        "平台",
        "质量"
      ]
    },
    "fault": "结束页之后仍保留无责任人的待验证主张",
    "invariant": "全部主张有状态、证据、责任人和截止条件，不能验证者明确阻塞",
    "probe": "claims_total: 260\nstatus: verified+pending+not-applicable\nsignoff: product+platform+quality",
    "signal": "未决主张、阻塞责任与签署",
    "artifact": "演讲证据关闭清单",
    "trap": "Thank you只结束材料，不会自动关闭工程证据",
    "practiceMode": "diagnosis"
  }
} as const;

export function Uhm2024Slide23EvidenceClosureScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide23EvidenceClosureDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide23EvidenceClosureRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide23EvidenceClosureMapLab = Uhm2024Slide23EvidenceClosureScopeLab;
export const Uhm24Slide23EvidenceClosureExperimentLab = Uhm2024Slide23EvidenceClosureDecisionLab;
export const Uhm24Slide23EvidenceClosureEvidenceLab = Uhm2024Slide23EvidenceClosureRecoveryLab;
