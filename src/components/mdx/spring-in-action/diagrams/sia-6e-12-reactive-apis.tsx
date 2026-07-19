import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-12-reactive-apis",
  "title": "第12章 开发响应式API",
  "concepts": [
    "12 Developing reactive APIs",
    "12.1 Working with Spring WebFlux",
    "12.1.1 Introducing Spring WebFlux",
    "12.1.2 Writing reactive controllers",
    "12.2 Defining functional request handlers",
    "12.3 Testing reactive controllers",
    "12.3.1 Testing GET requests",
    "12.3.2 Testing POST requests",
    "12.3.3 Testing with a live server",
    "12.4 Consuming REST APIs reactively",
    "12.4.1 GETting resources",
    "12.4.2 Sending resources",
    "12.4.3 Deleting resources",
    "12.4.4 Handling errors",
    "12.4.5 Exchanging requests",
    "12.5 Securing reactive web APIs",
    "12.5.1 Configuring reactive web security",
    "12.5.2 Configuring a reactive user details service",
    "12.6 Summary"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "WebFlux合同与客户端台",
    "boundary": "request → WebFlux handler → Publisher → WebTestClient",
    "axisA": {
      "label": "端点风格",
      "levels": [
        "注解式",
        "函数式",
        "代理客户端"
      ]
    },
    "axisB": {
      "label": "响应场景",
      "levels": [
        "正常",
        "4xx",
        "上游超时"
      ]
    },
    "fault": "控制器返回Flux却在内部block，压力下事件循环停止推进",
    "invariant": "WebFlux端点不在事件循环阻塞，错误映射与取消能够被客户端断言",
    "signal": "WebTestClient、线程与取消日志",
    "practiceMode": "code",
    "metric": "WebFlux合同与客户端台合同命中率",
    "risk": "响应场景暴露风险",
    "task": "贯通WebFlux注解控制器、函数式路由、WebTestClient、WebClient和响应式SecurityContext；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "事件循环图、阻塞扫描、WebTestClient合同、WebClient错误策略和身份传播测试"
  }
} as const;

export function Sia612ReactiveApisMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia612ReactiveApisExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia612ReactiveApisEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
