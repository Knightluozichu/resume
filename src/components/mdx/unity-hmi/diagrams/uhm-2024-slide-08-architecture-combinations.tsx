import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-08-architecture-combinations",
  "title": "第8页 多种架构组合",
  "concepts": [
    "8155：Linux或QNX加Android",
    "8295：Linux或QNX加Android",
    "8155加AliOS",
    "双8155：Linux或QNX加Android",
    "芯驰X9HP：Linux或QNX加Android",
    "芯擎双E04加Flyme",
    "8155与8295加OpenHarmony",
    "更多SoC与OS架构组合"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "座舱部署拓扑台",
    "boundary": "SoC/VM → OS域 → 进程 → Surface → 合成显示",
    "axisA": {
      "label": "部署拓扑",
      "levels": [
        "单域",
        "多域",
        "双SoC"
      ]
    },
    "axisB": {
      "label": "跨域通道",
      "levels": [
        "信号",
        "图像",
        "输入"
      ]
    },
    "fault": "只画方框，不登记进程死亡和跨域超时语义",
    "invariant": "每条显示与输入路径都有所有者、时限、降级和重连规则",
    "probe": "nodes: soc+os+process+surface\nedges: signal+frame+input\nfaults: process-exit+link-timeout",
    "signal": "端到端延迟与故障传播边界",
    "artifact": "可执行部署拓扑",
    "trap": "架构组合数量不是隔离能力或资源效率的证明",
    "practiceMode": "design"
  }
} as const;

export function Uhm2024Slide08ArchitectureCombinationsScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide08ArchitectureCombinationsDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide08ArchitectureCombinationsRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide08ArchitectureCombinationsMapLab = Uhm2024Slide08ArchitectureCombinationsScopeLab;
export const Uhm24Slide08ArchitectureCombinationsExperimentLab = Uhm2024Slide08ArchitectureCombinationsDecisionLab;
export const Uhm24Slide08ArchitectureCombinationsEvidenceLab = Uhm2024Slide08ArchitectureCombinationsRecoveryLab;
