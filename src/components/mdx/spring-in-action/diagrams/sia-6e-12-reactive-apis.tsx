import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
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
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第12章 开发响应式API" focus="贯通WebFlux注解控制器、函数式路由、WebTestClient、WebClient和响应式SecurityContext" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第12章 开发响应式API" focus="在高并发下分别注入阻塞调用、慢客户端、取消和401，观察事件循环、需求信号与资源释放" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第12章 开发响应式API" focus="事件循环图、阻塞扫描、WebTestClient合同、WebClient错误策略和身份传播测试" nodes={nodes} />;
}
