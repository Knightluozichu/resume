import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-18-deploying-spring",
  "title": "第18章 部署Spring",
  "concepts": [
    "18 Deploying Spring",
    "18.1 Weighing deployment options",
    "18.2 Building executable JAR files",
    "18.3 Building container images",
    "18.3.1 Deploying to Kubernetes",
    "18.3.2 Enabling graceful shutdown",
    "18.3.3 Working with application liveness and readiness",
    "18.4 Building and deploying WAR files",
    "18.5 The end is where we begin",
    "Summary"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "JAR、镜像与K8s探针台",
    "boundary": "build → image → startup/liveness/readiness → traffic",
    "axisA": {
      "label": "制品形态",
      "levels": [
        "JAR",
        "OCI镜像",
        "WAR"
      ]
    },
    "axisB": {
      "label": "关闭阶段",
      "levels": [
        "接流量",
        "排空",
        "终止"
      ]
    },
    "fault": "liveness依赖外部数据库导致级联重启，或终止前没有排空连接",
    "invariant": "不可变制品可追溯，探针语义分离，优雅关闭在预算内完成",
    "signal": "镜像摘要、探针事件与排空时长",
    "practiceMode": "code",
    "metric": "JAR、镜像与K8s探针台合同命中率",
    "risk": "关闭阶段暴露风险",
    "task": "比较可执行JAR、OCI镜像、Kubernetes与WAR的运行合同，并设计就绪、存活和优雅退出；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "制品校验和、镜像SBOM、探针状态机、关闭时间线、发布与回滚演练"
  }
} as const;

export function Sia618DeployingSpringMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia618DeployingSpringExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia618DeployingSpringEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
