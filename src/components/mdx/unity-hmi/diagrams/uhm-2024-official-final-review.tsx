import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-official-final-review",
  "title": "《Unity for HMI》2024官方演讲综合验收",
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
    "核对来源",
    "冻结平台",
    "复现实验",
    "注入故障",
    "签署发布"
  ],
  "model": {
    "studio": "全材料量产答辩台",
    "boundary": "23页主张 → 平台锁 → 场景预算 → 故障恢复 → 发布/回滚",
    "axisA": {
      "label": "答辩域",
      "levels": [
        "来源",
        "架构性能",
        "韧性交付"
      ]
    },
    "axisB": {
      "label": "决定",
      "levels": [
        "通过",
        "有条件通过",
        "退回"
      ]
    },
    "fault": "拼接不同构建的最好截图形成通过报告",
    "invariant": "同一构建ID和配置下，260节点、性能长尾、故障恢复和责任签署完整",
    "probe": "bundle: source-map+platform-lock+captures\nfaults: signal+client+surface+memory\ndecision: pass+conditional+rollback",
    "signal": "构建一致性、证据完整度与回滚条件",
    "artifact": "全材料发布证据包",
    "trap": "平均帧率、演示录像和无错误日志都不能单独构成量产通过",
    "practiceMode": "diagnosis"
  }
} as const;

export function Uhm2024OfficialFinalReviewScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024OfficialFinalReviewDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024OfficialFinalReviewRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24OfficialFinalReviewMapLab = Uhm2024OfficialFinalReviewScopeLab;
export const Uhm24OfficialFinalReviewExperimentLab = Uhm2024OfficialFinalReviewDecisionLab;
export const Uhm24OfficialFinalReviewEvidenceLab = Uhm2024OfficialFinalReviewRecoveryLab;
