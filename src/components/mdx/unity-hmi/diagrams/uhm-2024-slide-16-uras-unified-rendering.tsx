import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-16-uras-unified-rendering",
  "title": "第16页 URAS统一后台渲染服务",
  "concepts": [
    "URAS：Unity后台渲染方案",
    "把多份引擎整合到一份",
    "统一后台渲染服务",
    "节省系统资源占用",
    "适合多应用一镜到底",
    "车模车控应用",
    "ADAS应用",
    "APA应用",
    "音乐应用",
    "地图应用",
    "其他应用"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "统一渲染调度台",
    "boundary": "多应用请求 → 单引擎调度 → 渲染目标 → 多屏合成",
    "axisA": {
      "label": "并发View数",
      "levels": [
        "1",
        "3",
        "6"
      ]
    },
    "axisB": {
      "label": "资源策略",
      "levels": [
        "平均共享",
        "优先级",
        "超限降级"
      ]
    },
    "fault": "一个客户端突发加载拖垮所有共享View",
    "invariant": "共享服务在资源压力下维持关键View时限并隔离故障客户端",
    "probe": "clients: vehicle+adas+apa+music+map\npolicy: priority+quota\nfault: client-memory-spike",
    "signal": "各View帧时、配额、丢帧与恢复",
    "artifact": "统一渲染调度记录",
    "trap": "减少引擎实例可能节省资源，但收益和耦合风险都需测量",
    "practiceMode": "simulation",
    "metric": "统一渲染调度台可信度",
    "risk": "并发View数误判风险",
    "task": "围绕第16页 URAS统一后台渲染服务固定输入与目标配置；只改变并发View数或资源策略，保存基线、故障、恢复和复位证据。"
  }
} as const;

export function Uhm2024Slide16UrasUnifiedRenderingScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide16UrasUnifiedRenderingDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide16UrasUnifiedRenderingRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide16UrasUnifiedRenderingMapLab = Uhm2024Slide16UrasUnifiedRenderingScopeLab;
export const Uhm24Slide16UrasUnifiedRenderingExperimentLab = Uhm2024Slide16UrasUnifiedRenderingDecisionLab;
export const Uhm24Slide16UrasUnifiedRenderingEvidenceLab = Uhm2024Slide16UrasUnifiedRenderingRecoveryLab;
