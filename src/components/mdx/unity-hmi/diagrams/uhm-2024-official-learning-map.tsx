import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-official-learning-map",
  "title": "《Unity for HMI》2024官方演讲学习地图",
  "concepts": [
    "第1页 Unity for HMI",
    "第2页 未来已来：Unity开启3D座舱新篇章",
    "第3页 Made with Unity",
    "第4页 量产采用证据",
    "第5页 搭载Unity HMI技术的量产车型汇聚北京车展",
    "第6页 模型预算与性能优化",
    "第7页 主流SoC与操作系统适配",
    "第8页 多种架构组合",
    "第9页 地图方案与合作伙伴生态",
    "第10页 车机版",
    "第11页 团结引擎车机版",
    "第12页 QNX平台支持与优化",
    "第13页 Embedded Linux平台支持与优化",
    "第14页 团结引擎",
    "第15页 专有架构：URAS渲染方案",
    "第16页 URAS统一后台渲染服务",
    "第17页 URAS View组件与隔离工程",
    "第18页 Unity中国",
    "第19页 Unity与Unity中国时间线",
    "第20页 车载HMI能力底座",
    "第21页 创新、实施与迭代服务模式",
    "第22页 六大HMI创新场景",
    "第23页 Thank you与证据闭环"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "23页量产证据路线台",
    "boundary": "演讲页 → 可验证主张 → 目标机试验 → 发布判断",
    "axisA": {
      "label": "证据层次",
      "levels": [
        "原页",
        "官方交叉资料",
        "目标机记录"
      ]
    },
    "axisB": {
      "label": "审查跨度",
      "levels": [
        "单页",
        "跨页依赖",
        "整车配置"
      ]
    },
    "fault": "把产品能力演讲直接视为本项目量产通过",
    "invariant": "23页主张都保留页码、2024时点、适用配置和可推翻的目标机证据",
    "probe": "deck_pages: 1-23\nplatform_lock: soc+bsp+os+driver+runtime\nrelease_gate: correctness+latency+resources+recovery",
    "signal": "页码覆盖、配置指纹与发布门",
    "artifact": "页码—主张—试验—结论账本",
    "trap": "把支持清单误读为无条件兼容矩阵",
    "practiceMode": "design",
    "metric": "23页量产证据路线台可信度",
    "risk": "证据层次误判风险",
    "task": "围绕《Unity for HMI》2024官方演讲学习地图固定输入与目标配置；只改变证据层次或审查跨度，保存基线、故障、恢复和复位证据。"
  }
} as const;

export function Uhm2024OfficialLearningMapScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024OfficialLearningMapDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024OfficialLearningMapRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24OfficialLearningMapMapLab = Uhm2024OfficialLearningMapScopeLab;
export const Uhm24OfficialLearningMapExperimentLab = Uhm2024OfficialLearningMapDecisionLab;
export const Uhm24OfficialLearningMapEvidenceLab = Uhm2024OfficialLearningMapRecoveryLab;
