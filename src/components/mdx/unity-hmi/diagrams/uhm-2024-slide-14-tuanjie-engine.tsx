import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-14-tuanjie-engine",
  "title": "第14页 团结引擎",
  "concepts": [
    "团结引擎",
    "第14页 团结引擎的不能推出项",
    "第14页 团结引擎的恢复证据"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "专有能力边界板",
    "boundary": "团结引擎产品 → 公开材料 → 项目可见接口 → 未公开实现",
    "axisA": {
      "label": "信息层次",
      "levels": [
        "演讲主张",
        "可用接口",
        "目标机行为"
      ]
    },
    "axisB": {
      "label": "推理范围",
      "levels": [
        "名称",
        "合同",
        "实测"
      ]
    },
    "fault": "根据分隔页臆造团结引擎内部实现",
    "invariant": "只描述公开可核对能力；内部机制未知时转为接口与行为测试",
    "probe": "public_claims: deck\ninternal_design: not-assumed\nverification: interface+behavior",
    "signal": "可知边界与未证实假设",
    "artifact": "产品能力边界卡",
    "trap": "分隔页建立叙事章节，不提供内部架构细节",
    "practiceMode": "design"
  }
} as const;

export function Uhm2024Slide14TuanjieEngineScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide14TuanjieEngineDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide14TuanjieEngineRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide14TuanjieEngineMapLab = Uhm2024Slide14TuanjieEngineScopeLab;
export const Uhm24Slide14TuanjieEngineExperimentLab = Uhm2024Slide14TuanjieEngineDecisionLab;
export const Uhm24Slide14TuanjieEngineEvidenceLab = Uhm2024Slide14TuanjieEngineRecoveryLab;
