import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-02-new-chapter",
  "title": "第2页 未来已来：Unity开启3D座舱新篇章",
  "concepts": [
    "未来已来",
    "Unity开启3D座舱新篇章",
    "Unity中国 肖蓓蓓"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "演讲坐标冻结台",
    "boundary": "题名 → 讲者 → UNITE 2024 → 生成日期 → 版本注记",
    "axisA": {
      "label": "时间坐标",
      "levels": [
        "演讲当日",
        "项目立项",
        "当前复核"
      ]
    },
    "axisB": {
      "label": "主张类型",
      "levels": [
        "事实",
        "产品宣称",
        "工程假设"
      ]
    },
    "fault": "用2026年的产品页面无标记改写2024演讲",
    "invariant": "每个后来更新都与演讲原始主张并列，时间和责任主体不混用",
    "probe": "event: UNITE-2024\nspeaker: 肖蓓蓓\npdf_created: 2024-08-01",
    "signal": "日期、讲者与主张版本",
    "artifact": "材料身份卡与变更记录",
    "trap": "标题页只界定主题和主体，不能替代技术证据",
    "practiceMode": "design"
  }
} as const;

export function Uhm2024Slide02NewChapterScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide02NewChapterDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide02NewChapterRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide02NewChapterMapLab = Uhm2024Slide02NewChapterScopeLab;
export const Uhm24Slide02NewChapterExperimentLab = Uhm2024Slide02NewChapterDecisionLab;
export const Uhm24Slide02NewChapterEvidenceLab = Uhm2024Slide02NewChapterRecoveryLab;
