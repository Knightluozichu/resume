import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-01-getting-started",
  "title": "第1章 Spring起步",
  "concepts": [
    "1 Getting started with Spring",
    "1.1 What is Spring?",
    "1.2 Initializing a Spring application",
    "1.2.1 Initializing a Spring project with Spring Tool Suite",
    "1.2.2 Examining the Spring project structure",
    "1.3 Writing a Spring application",
    "1.3.1 Handling web requests",
    "1.3.2 Defining the view",
    "1.3.3 Testing the controller",
    "1.3.4 Building and running the application",
    "1.3.5 Getting to know Spring Boot DevTools",
    "1.3.6 Let’s review",
    "1.4 Surveying the Spring landscape",
    "1.4.1 The core Spring Framework",
    "1.4.2 Spring Boot",
    "1.4.3 Spring Data",
    "1.4.4 Spring Security",
    "1.4.5 Spring Integration and Spring Batch",
    "1.4.6 Spring Cloud",
    "1.4.7 Spring Native",
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
    "studio": "自动配置与首个请求台",
    "boundary": "classpath → condition → bean → handler → view",
    "axisA": {
      "label": "启动条件",
      "levels": [
        "缺starter",
        "完整",
        "冲突Bean"
      ]
    },
    "axisB": {
      "label": "测试边界",
      "levels": [
        "纯单元",
        "MockMvc",
        "随机端口"
      ]
    },
    "fault": "控制器可编译但条件装配未创建所需Bean",
    "invariant": "条件报告能够解释Bean来源，MockMvc能证明请求到视图的最小合同",
    "signal": "ConditionEvaluationReport与HTTP断言",
    "practiceMode": "code",
    "metric": "自动配置与首个请求台合同命中率",
    "risk": "测试边界暴露风险",
    "task": "从Initializr生成项目，沿请求到视图走通第一个垂直切片，并识别Spring生态各项目的责任；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "项目结构注释、条件评估报告、控制器切片测试和生态责任表"
  }
} as const;

export function Sia601GettingStartedMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia601GettingStartedExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia601GettingStartedEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
