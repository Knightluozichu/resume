import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-appendix-bootstrapping",
  "title": "附录A 启动Spring应用",
  "concepts": [
    "Appendix. Bootstrapping Spring applications",
    "A.1 Initializing a project with Spring Tool Suite",
    "A.2 Initializing a project with IntelliJ IDEA",
    "A.3 Initializing a project with NetBeans",
    "A.4 Initializing a project at start.spring.io",
    "A.5 Initializing a project from the command line",
    "curl and the Initializr API",
    "Spring Boot command-line interface",
    "A.6 Building and running projects"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "Initializr启动矩阵台",
    "boundary": "metadata → generated build → test → executable artifact",
    "axisA": {
      "label": "生成入口",
      "levels": [
        "IDE",
        "start.spring.io",
        "CLI"
      ]
    },
    "axisB": {
      "label": "构建工具",
      "levels": [
        "Maven",
        "Gradle",
        "包装器"
      ]
    },
    "fault": "不同入口生成不同Java与Boot版本，却被误当同一基线比较",
    "invariant": "相同元数据通过不同入口生成等价依赖、工具链与可运行测试",
    "signal": "metadata、依赖树与wrapper版本",
    "practiceMode": "code",
    "metric": "Initializr启动矩阵台合同命中率",
    "risk": "构建工具暴露风险",
    "task": "用IDE、网页Initializr、HTTP API与CLI生成等价项目，并验证构建和运行结果；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "初始化请求、依赖清单、Wrapper校验、无IDE构建脚本与首次启动证据"
  }
} as const;

export function Sia6AppendixBootstrappingMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia6AppendixBootstrappingExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia6AppendixBootstrappingEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
