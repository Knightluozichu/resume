import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-11-tuanjie-head-unit",
  "title": "第11页 团结引擎车机版",
  "concepts": [
    "团结引擎车机版",
    "车机系统专属HMI引擎",
    "面向车企HMI产品、设计及研发团队",
    "Android平台",
    "QNX平台",
    "Embedded Linux平台",
    "OpenHarmony平台",
    "一次开发多平台部署",
    "基于Unity 2022 LTS",
    "面向用户需求持续迭代"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "团结引擎车机基线台",
    "boundary": "2022 LTS基线 → 平台模块 → 项目定制 → 签名构建 → 目标机",
    "axisA": {
      "label": "运行平台",
      "levels": [
        "Android",
        "QNX/Linux",
        "OpenHarmony"
      ]
    },
    "axisB": {
      "label": "版本约束",
      "levels": [
        "引擎",
        "平台包",
        "BSP/驱动"
      ]
    },
    "fault": "把一次开发多平台部署理解为无需平台差异处理",
    "invariant": "共享内容基线之外，每个平台的构建、图层、输入、诊断与回滚均单独验收",
    "probe": "engine_baseline: Unity-2022-LTS\nplatform_modules: locked\nartifacts: signed-build+symbols+rollback",
    "signal": "跨平台差异与构建可追溯性",
    "artifact": "车机运行时基线包",
    "trap": "跨平台复用降低重复工作，但不会消除OS和驱动差异",
    "practiceMode": "design"
  }
} as const;

export function Uhm2024Slide11TuanjieHeadUnitScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide11TuanjieHeadUnitDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide11TuanjieHeadUnitRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide11TuanjieHeadUnitMapLab = Uhm2024Slide11TuanjieHeadUnitScopeLab;
export const Uhm24Slide11TuanjieHeadUnitExperimentLab = Uhm2024Slide11TuanjieHeadUnitDecisionLab;
export const Uhm24Slide11TuanjieHeadUnitEvidenceLab = Uhm2024Slide11TuanjieHeadUnitRecoveryLab;
