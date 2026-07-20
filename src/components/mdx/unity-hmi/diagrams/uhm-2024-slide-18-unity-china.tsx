import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-18-unity-china",
  "title": "第18页 Unity中国",
  "concepts": [
    "Unity中国",
    "第18页 Unity中国的不能推出项",
    "第18页 Unity中国的恢复证据"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "组织主张责任台",
    "boundary": "组织节点 → 产品责任 → 项目责任 → 支持升级路径",
    "axisA": {
      "label": "责任主体",
      "levels": [
        "供应商",
        "集成方",
        "车企"
      ]
    },
    "axisB": {
      "label": "证据类型",
      "levels": [
        "组织事实",
        "服务承诺",
        "项目交付"
      ]
    },
    "fault": "把组织介绍当作产品SLA或项目验收承诺",
    "invariant": "每项能力陈述都映射到合同责任人、交付物和升级路径",
    "probe": "owners: vendor+integrator+oem\nartifacts: contract+support-plan+acceptance\nescalation: named",
    "signal": "责任空洞与升级闭环",
    "artifact": "责任分配矩阵",
    "trap": "组织存在不能自动推出支持范围、响应时限或交付质量",
    "practiceMode": "design"
  }
} as const;

export function Uhm2024Slide18UnityChinaScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide18UnityChinaDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide18UnityChinaRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide18UnityChinaMapLab = Uhm2024Slide18UnityChinaScopeLab;
export const Uhm24Slide18UnityChinaExperimentLab = Uhm2024Slide18UnityChinaDecisionLab;
export const Uhm24Slide18UnityChinaEvidenceLab = Uhm2024Slide18UnityChinaRecoveryLab;
