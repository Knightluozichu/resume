import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-15-spring-boot-actuator",
  "title": "第15章 Spring Boot Actuator",
  "concepts": [
    "15 Working with Spring Boot Actuator",
    "15.1 Introducing Actuator",
    "15.1.1 Configuring Actuator’s base path",
    "15.1.2 Enabling and disabling Actuator endpoints",
    "15.2 Consuming Actuator endpoints",
    "15.2.1 Fetching essential application information",
    "15.2.2 Viewing configuration details",
    "15.2.3 Viewing application activity",
    "15.2.4 Tapping runtime metrics",
    "15.3 Customizing Actuator",
    "15.3.1 Contributing information to the /info endpoint",
    "15.3.2 Defining custom health indicators",
    "15.3.3 Registering custom metrics",
    "15.3.4 Creating custom endpoints",
    "15.4 Securing Actuator",
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
    "studio": "Actuator端点与指标台",
    "boundary": "application state → endpoint/metric → secured exposure",
    "axisA": {
      "label": "端点暴露",
      "levels": [
        "health",
        "metrics",
        "custom"
      ]
    },
    "axisB": {
      "label": "调用身份",
      "levels": [
        "匿名",
        "运维",
        "管理员"
      ]
    },
    "fault": "暴露env或heapdump等敏感端点，或用高基数用户ID作为指标标签",
    "invariant": "只暴露必要端点，健康分组与指标标签稳定且不泄露敏感数据",
    "signal": "端点清单、tag基数与授权结果",
    "practiceMode": "code",
    "metric": "Actuator端点与指标台合同命中率",
    "risk": "调用身份暴露风险",
    "task": "把Actuator端点暴露、健康、信息、活动、指标和自定义端点纳入最小暴露与可观测性设计；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "端点清单、管理面访问策略、健康状态机、指标基数预算和告警验证"
  }
} as const;

export function Sia615SpringBootActuatorMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia615SpringBootActuatorExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia615SpringBootActuatorEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
