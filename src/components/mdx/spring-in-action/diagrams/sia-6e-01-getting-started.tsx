import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
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
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第1章 Spring起步" focus="从Initializr生成项目，沿请求到视图走通第一个垂直切片，并识别Spring生态各项目的责任" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第1章 Spring起步" focus="移除Web starter、控制器注解、模板或测试切片中的任一条件，预测并记录启动或请求失败的位置" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第1章 Spring起步" focus="项目结构注释、条件评估报告、控制器切片测试和生态责任表" nodes={nodes} />;
}
