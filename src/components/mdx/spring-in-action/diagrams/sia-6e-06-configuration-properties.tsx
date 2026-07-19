import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-06-configuration-properties",
  "title": "第6章 使用配置属性",
  "concepts": [
    "6 Working with configuration properties",
    "6.1 Fine-tuning autoconfiguration",
    "6.1.1 Understanding Spring’s environment abstraction",
    "6.1.2 Configuring a data source",
    "6.1.3 Configuring the embedded server",
    "6.1.4 Configuring logging",
    "6.1.5 Using special property values",
    "6.2 Creating your own configuration properties",
    "6.2.1 Defining configuration property holders",
    "6.2.2 Declaring configuration property metadata",
    "6.3 Configuring with profiles",
    "6.3.1 Defining profile-specific properties",
    "6.3.2 Activating profiles",
    "6.3.3 Conditionally creating beans with profiles",
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
    "studio": "配置优先级与绑定台",
    "boundary": "property sources → Environment → typed binding → bean",
    "axisA": {
      "label": "属性来源",
      "levels": [
        "默认文件",
        "profile",
        "环境变量"
      ]
    },
    "axisB": {
      "label": "绑定结果",
      "levels": [
        "合法",
        "缺失",
        "格式错误"
      ]
    },
    "fault": "生产环境变量覆盖配置却没有记录来源，或非法值静默落到默认值",
    "invariant": "同一属性的胜出来源、类型转换、校验失败和敏感值遮蔽均可解释",
    "signal": "Environment来源、绑定错误与脱敏快照",
    "practiceMode": "code",
    "metric": "配置优先级与绑定台合同命中率",
    "risk": "绑定结果暴露风险",
    "task": "建立Environment属性源优先级、类型安全绑定、配置元数据与Profile条件装配模型；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "属性来源链、配置契约、元数据、环境差异表和启动失败测试"
  }
} as const;

export function Sia606ConfigurationPropertiesMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia606ConfigurationPropertiesExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia606ConfigurationPropertiesEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
