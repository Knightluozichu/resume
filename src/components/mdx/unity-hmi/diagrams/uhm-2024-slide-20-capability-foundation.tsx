import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-20-capability-foundation",
  "title": "第20页 车载HMI能力底座",
  "concepts": [
    "面向多应用的定制化编辑器",
    "4D实况桌面",
    "AD HMI",
    "高级视觉效果资产库",
    "多模态交互",
    "情景引擎",
    "直观易用的3D车控",
    "3D地图",
    "手机即车机",
    "AR HUD",
    "超过50个应用创新方向",
    "本地化AI能力",
    "影视级渲染能力",
    "引擎侧多模态交互",
    "URAS渲染架构",
    "音乐座舱",
    "灵活视窗",
    "信息安全",
    "定制化视觉效果",
    "3D仪表",
    "超过30个引擎创新方向",
    "团结引擎车机版与按需定制版",
    "场景编辑",
    "灯光烘焙",
    "自动化打包",
    "脚本开发",
    "物理仿真",
    "动画系统",
    "AI系统",
    "特效系统",
    "UI编辑器",
    "美术资产库",
    "地形系统",
    "后期效果",
    "光线追踪",
    "配置字模型替换",
    "低代码工具",
    "性能分析",
    "所有主流OS",
    "所有主流芯片",
    "所有主流图商",
    "所有显示设备",
    "持续适配新OS和新芯片"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "HMI能力分层台",
    "boundary": "应用创新 → 引擎创新 → 制作工具 → 平台适配 → 项目验收",
    "axisA": {
      "label": "能力层",
      "levels": [
        "应用",
        "引擎/工具",
        "平台"
      ]
    },
    "axisB": {
      "label": "成熟度",
      "levels": [
        "概念",
        "可集成",
        "目标机通过"
      ]
    },
    "fault": "把43个能力标签全部标成已量产",
    "invariant": "每项能力都有层级、依赖、成熟度、负责人和目标机验收证据",
    "probe": "capability_record: name+layer+owner\nmaturity: concept+integrated+validated\ndependencies: explicit",
    "signal": "能力成熟度与依赖缺口",
    "artifact": "43项能力分层矩阵",
    "trap": "能力地图表达范围，不表达每项能力的版本、许可和成熟度",
    "practiceMode": "design",
    "metric": "HMI能力分层台可信度",
    "risk": "能力层误判风险",
    "task": "围绕第20页 车载HMI能力底座固定输入与目标配置；只改变能力层或成熟度，保存基线、故障、恢复和复位证据。"
  }
} as const;

export function Uhm2024Slide20CapabilityFoundationScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide20CapabilityFoundationDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide20CapabilityFoundationRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide20CapabilityFoundationMapLab = Uhm2024Slide20CapabilityFoundationScopeLab;
export const Uhm24Slide20CapabilityFoundationExperimentLab = Uhm2024Slide20CapabilityFoundationDecisionLab;
export const Uhm24Slide20CapabilityFoundationEvidenceLab = Uhm2024Slide20CapabilityFoundationRecoveryLab;
