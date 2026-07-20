import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-19-timeline",
  "title": "第19页 Unity与Unity中国时间线",
  "concepts": [
    "2004年Unity成立",
    "2012年进入中国",
    "2020年Unity上市",
    "2022年Unity中国成立"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "组织时间线核对台",
    "boundary": "成立 → 进入中国 → 上市 → Unity中国成立 → 当前复核",
    "axisA": {
      "label": "时间节点",
      "levels": [
        "2004",
        "2012/2020",
        "2022"
      ]
    },
    "axisB": {
      "label": "事实类别",
      "levels": [
        "组织",
        "资本",
        "产品"
      ]
    },
    "fault": "把公司事件日期当成引擎功能发布日期",
    "invariant": "四个组织节点保留原页语境，并与产品版本和技术发布分账",
    "probe": "timeline: [2004,2012,2020,2022]\ncategory: organization-or-capital\nproduct_dates: separate",
    "signal": "时间来源与类别冲突",
    "artifact": "双轨时间线",
    "trap": "组织史只能解释主体变化，不能证明某时点已有具体HMI能力",
    "practiceMode": "design"
  }
} as const;

export function Uhm2024Slide19TimelineScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide19TimelineDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide19TimelineRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide19TimelineMapLab = Uhm2024Slide19TimelineScopeLab;
export const Uhm24Slide19TimelineExperimentLab = Uhm2024Slide19TimelineDecisionLab;
export const Uhm24Slide19TimelineEvidenceLab = Uhm2024Slide19TimelineRecoveryLab;
