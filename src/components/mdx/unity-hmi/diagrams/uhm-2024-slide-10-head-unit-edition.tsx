import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-10-head-unit-edition",
  "title": "第10页 车机版",
  "concepts": [
    "车机版",
    "第10页 车机版的不能推出项",
    "第10页 车机版的恢复证据"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "车机版进入条件板",
    "boundary": "产品名 → 目标团队 → 支持平台 → 车辆信号 → 发布约束",
    "axisA": {
      "label": "需求主体",
      "levels": [
        "产品",
        "设计",
        "研发"
      ]
    },
    "axisB": {
      "label": "入口状态",
      "levels": [
        "概念说明",
        "平台确认",
        "项目基线"
      ]
    },
    "fault": "只因存在车机版名称就跳过目标平台商务与技术确认",
    "invariant": "进入实现前冻结授权、运行时版本、目标平台、信号和显示合同",
    "probe": "owners: product+design+engineering\nplatform_confirmation: required\nsignal_contract: required",
    "signal": "进入条件完成度与责任缺口",
    "artifact": "车机版立项门",
    "trap": "产品名称不等于特定项目已获得运行时、平台或支持承诺",
    "practiceMode": "design",
    "metric": "车机版进入条件板可信度",
    "risk": "需求主体误判风险",
    "task": "围绕第10页 车机版固定输入与目标配置；只改变需求主体或入口状态，保存基线、故障、恢复和复位证据。"
  }
} as const;

export function Uhm2024Slide10HeadUnitEditionScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide10HeadUnitEditionDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide10HeadUnitEditionRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide10HeadUnitEditionMapLab = Uhm2024Slide10HeadUnitEditionScopeLab;
export const Uhm24Slide10HeadUnitEditionExperimentLab = Uhm2024Slide10HeadUnitEditionDecisionLab;
export const Uhm24Slide10HeadUnitEditionEvidenceLab = Uhm2024Slide10HeadUnitEditionRecoveryLab;
