import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-part-4-deployed-spring",
  "title": "Part 4 部署Spring",
  "concepts": [
    "Part 4. Deployed Spring"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "可运维交付门禁台",
    "boundary": "artifact → runtime → health/readiness → traffic → rollback",
    "axisA": {
      "label": "发布阶段",
      "levels": [
        "构建",
        "候选",
        "生产"
      ]
    },
    "axisB": {
      "label": "运行信号",
      "levels": [
        "健康",
        "降级",
        "不可用"
      ]
    },
    "fault": "把进程存活当业务就绪，依赖未连接就接收流量",
    "invariant": "构建物可追溯，启动与就绪分离，失败能停止流量并回滚",
    "signal": "构建摘要、探针与回滚事件",
    "practiceMode": "design",
    "metric": "可运维交付门禁台合同命中率",
    "risk": "运行信号暴露风险",
    "task": "把运行时端点、管理面、JMX、制品、容器和Kubernetes探针组成生产反馈回路；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "运行手册、SLO指标、管理面威胁模型、部署清单与回滚演练"
  }
} as const;

export function Sia6Part4DeployedSpringMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia6Part4DeployedSpringExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia6Part4DeployedSpringEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
