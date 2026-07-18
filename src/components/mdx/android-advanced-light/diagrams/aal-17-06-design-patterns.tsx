import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第6章 设计模式",
  "6.1 设计模式六大原则",
  "6.2 设计模式分类",
  "6.3 创建型设计模式",
  "6.3.1 单例模式",
  "6.3.2 简单工厂模式",
  "6.3.3 工厂方法模式",
  "6.3.4 建造者模式",
  "6.4 结构型设计模式",
  "6.4.1 代理模式",
  "6.4.2 装饰模式",
  "6.4.3 外观模式",
  "6.4.4 享元模式",
  "6.5 行为型设计模式",
  "6.5.1 策略模式",
  "6.5.2 模板方法模式",
  "6.5.3 观察者模式",
  "6.6 本章小结"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="第6章 设计模式" focus="以六大原则约束创建型、结构型和行为型模式，并落地单例、工厂、建造者、代理、装饰、外观、享元、策略、模板和观察者" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="第6章 设计模式" focus="按模式名称堆类而不指出变化原因、所有权和测试收益，最终让简单流程变成间接调用迷宫" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="第6章 设计模式" focus="变化轴、依赖方向、对象生命周期、替换测试、并发安全、内存共享与模式移除后的复杂度对照" nodes={nodes} />; }
