import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-13-embedded-linux-support",
  "title": "第13页 Embedded Linux平台支持与优化",
  "concepts": [
    "主线程、渲染线程与Job线程优先级",
    "启动参数自定义输出图层大小和位置",
    "透明图层",
    "CPU Affinity设置",
    "面向车机的Embedded Linux专门支持与优化"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "Embedded Linux集成台",
    "boundary": "服务启动 → Wayland/显示层 → CPU亲和 → 看门狗 → 恢复",
    "axisA": {
      "label": "Linux集成层",
      "levels": [
        "进程服务",
        "显示合成",
        "调度诊断"
      ]
    },
    "axisB": {
      "label": "系统状态",
      "levels": [
        "冷启动",
        "压力",
        "重启恢复"
      ]
    },
    "fault": "用开发PC的Linux结果外推ARM目标板",
    "invariant": "目标镜像上服务顺序、图层、线程、资源限制、日志和看门狗共同闭环",
    "probe": "image_id: os+bsp+graphics-stack\nservice: hmi-player\nchecks: boot+layer+affinity+watchdog",
    "signal": "启动时序、合成状态与系统日志",
    "artifact": "Embedded Linux系统证据包",
    "trap": "同为Linux不代表ABI、窗口系统、驱动和实时行为一致",
    "practiceMode": "diagnosis"
  }
} as const;

export function Uhm2024Slide13EmbeddedLinuxSupportScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide13EmbeddedLinuxSupportDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide13EmbeddedLinuxSupportRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide13EmbeddedLinuxSupportMapLab = Uhm2024Slide13EmbeddedLinuxSupportScopeLab;
export const Uhm24Slide13EmbeddedLinuxSupportExperimentLab = Uhm2024Slide13EmbeddedLinuxSupportDecisionLab;
export const Uhm24Slide13EmbeddedLinuxSupportEvidenceLab = Uhm2024Slide13EmbeddedLinuxSupportRecoveryLab;
