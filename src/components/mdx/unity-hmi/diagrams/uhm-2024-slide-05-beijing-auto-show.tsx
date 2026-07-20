import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-05-beijing-auto-show",
  "title": "第5页 搭载Unity HMI技术的量产车型汇聚北京车展",
  "concepts": [
    "搭载Unity HMI技术",
    "量产车型",
    "汇聚北京车展"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "量产车型样本矩阵",
    "boundary": "车展展示 → 车型身份 → SoC/OS → 显示拓扑 → 可验证样本",
    "axisA": {
      "label": "样本粒度",
      "levels": [
        "车型名",
        "配置版本",
        "屏幕场景"
      ]
    },
    "axisB": {
      "label": "证据环境",
      "levels": [
        "展车",
        "工程样车",
        "量产车"
      ]
    },
    "fault": "把同名车型或展台画面当成目标配置证据",
    "invariant": "每个案例都标明车型、配置、数据来源和不能从展示推导的边界",
    "probe": "sample_id: vehicle+trim+build\nplatform: soc+bsp+os\ndisplays: resolution+role",
    "signal": "车型配置差异与证据来源",
    "artifact": "车展样本矩阵",
    "trap": "现场可见效果无法证明冷启动、休眠恢复和长时稳定性",
    "practiceMode": "design",
    "metric": "量产车型样本矩阵可信度",
    "risk": "样本粒度误判风险",
    "task": "围绕第5页 搭载Unity HMI技术的量产车型汇聚北京车展固定输入与目标配置；只改变样本粒度或证据环境，保存基线、故障、恢复和复位证据。"
  }
} as const;

export function Uhm2024Slide05BeijingAutoShowScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide05BeijingAutoShowDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide05BeijingAutoShowRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide05BeijingAutoShowMapLab = Uhm2024Slide05BeijingAutoShowScopeLab;
export const Uhm24Slide05BeijingAutoShowExperimentLab = Uhm2024Slide05BeijingAutoShowDecisionLab;
export const Uhm24Slide05BeijingAutoShowEvidenceLab = Uhm2024Slide05BeijingAutoShowRecoveryLab;
