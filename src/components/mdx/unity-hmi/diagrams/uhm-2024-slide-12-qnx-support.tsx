import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-12-qnx-support",
  "title": "第12页 QNX平台支持与优化",
  "concepts": [
    "Stacktrace支持",
    "日志输出到Slogger2",
    "主线程、渲染线程与Job线程优先级",
    "启动参数自定义输出图层大小和位置",
    "透明图层",
    "CPU Affinity设置",
    "多点触控",
    "QNX IDE Profiler",
    "面向车机的QNX专门支持与优化"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "QNX目标机诊断台",
    "boundary": "启动参数 → Screen图层 → 线程调度 → 触控 → slogger2/Profiler",
    "axisA": {
      "label": "QNX能力",
      "levels": [
        "日志",
        "图层输入",
        "线程与分析"
      ]
    },
    "axisB": {
      "label": "故障注入",
      "levels": [
        "错误参数",
        "Surface重建",
        "高负载"
      ]
    },
    "fault": "只在编辑器验证透明图层和多点触控",
    "invariant": "目标QNX镜像上图层几何、输入坐标、线程策略、日志和恢复可复现",
    "probe": "capture: slogger2+target-profiler\nchecks: layer-rect+alpha+multitouch\nfaults: bad-args+surface-recreate",
    "signal": "QNX日志、线程、图层与触控记录",
    "artifact": "QNX平台验收包",
    "trap": "功能清单不能替代目标镜像、图形栈和硬件组合测试",
    "practiceMode": "diagnosis"
  }
} as const;

export function Uhm2024Slide12QnxSupportScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide12QnxSupportDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide12QnxSupportRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide12QnxSupportMapLab = Uhm2024Slide12QnxSupportScopeLab;
export const Uhm24Slide12QnxSupportExperimentLab = Uhm2024Slide12QnxSupportDecisionLab;
export const Uhm24Slide12QnxSupportEvidenceLab = Uhm2024Slide12QnxSupportRecoveryLab;
