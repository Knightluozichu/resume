import type { ReviewQuestion } from "./types";

/** 抽象工厂模式章复习题 */
export const dpAbstractFactoryQuestions: ReviewQuestion[] = [
  {
    id: "dp-abstract-factory-01",
    chapter: "dp-abstract-factory",
    level: 1,
    question: "抽象工厂模式的意图是什么？",
    answer:
      "提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。\n\n关键词是「一系列」：抽象工厂一次创建一整套配套的产品（产品族），保证这些产品之间是匹配的、可协同工作的。",
    tags: ["意图", "基础概念", "产品族"],
  },
  {
    id: "dp-abstract-factory-02",
    chapter: "dp-abstract-factory",
    level: 2,
    question: "抽象工厂和工厂方法有什么区别？",
    answer:
      "工厂方法：创建「单个」产品，一个工厂方法对应一种产品，通过子类化决定具体产品类型。\n\n抽象工厂：创建「一族」相关产品，一个工厂接口里有多个创建方法（每种产品一个），通过切换具体工厂来切换整套产品族。\n\n维度差异：\n① 工厂方法关注「同一产品等级结构」的扩展（加新品牌/新变体）；\n② 抽象工厂关注「产品族」的整体切换，强调产品间的配套约束。\n\n举例：工厂方法是「一个日志工厂造一种日志」；抽象工厂是「一个 UI 工厂同时造 Button + Checkbox + TextBox 一整套风格」。",
    tags: ["对比", "工厂方法", "产品族"],
  },
  {
    id: "dp-abstract-factory-03",
    chapter: "dp-abstract-factory",
    level: 3,
    question: "跨平台 UI 库需要支持 Windows 和 Mac 两种风格，各有 Button、Checkbox，用抽象工厂设计。",
    answer:
      "抽象产品族 + 具体工厂：\n\n```\n// 抽象产品\ninterface Button { render(): void; }\ninterface Checkbox { render(): void; }\n// Windows 风格产品\nclass WinButton implements Button {\n  render() { /* Windows 风格按钮 */ }\n}\nclass WinCheckbox implements Checkbox {\n  render() { /* Windows 风格复选框 */ }\n}\n// Mac 风格产品\nclass MacButton implements Button {\n  render() { /* Mac 风格按钮 */ }\n}\nclass MacCheckbox implements Checkbox {\n  render() { /* Mac 风格复选框 */ }\n}\n// 抽象工厂\ninterface UIFactory {\n  createButton(): Button;\n  createCheckbox(): Checkbox;\n}\n// 具体工厂\nclass WinFactory implements UIFactory {\n  createButton() { return new WinButton(); }\n  createCheckbox() { return new WinCheckbox(); }\n}\nclass MacFactory implements UIFactory {\n  createButton() { return new MacButton(); }\n  createCheckbox() { return new MacCheckbox(); }\n}\n// 客户端只依赖抽象工厂，切换风格只需换工厂实例\nfunction renderUI(factory: UIFactory) {\n  factory.createButton().render();\n  factory.createCheckbox().render();\n}\nrenderUI(new WinFactory());\n```\n\n关键：客户端一次拿到的是配套的一整套组件，绝不会出现 Win 按钮配 Mac 复选框的错搭。",
    tags: ["应用", "跨平台 UI", "代码设计"],
  },
  {
    id: "dp-abstract-factory-04",
    chapter: "dp-abstract-factory",
    level: 4,
    question: "抽象工厂模式为什么难以扩展新的产品类型？",
    answer:
      "因为抽象工厂接口里固定了要创建的产品种类（如 `createButton()`、`createCheckbox()`）。如果要新增一种产品类型（比如 `createScrollbar()`），必须：\n① 改抽象工厂接口 `UIFactory`，加新方法；\n② 改每一个具体工厂（`WinFactory`、`MacFactory`……）都实现新方法；\n③ 新增对应的产品抽象和各风格的具体产品。\n\n这违反了开闭原则（OCP）——加新产品类型要修改所有已有工厂。\n\n反之，新增一个产品族（如加 Linux 风格）是容易的：只需新增 `LinuxFactory` 及对应产品，不动接口。所以抽象工厂「易于增加产品族，难于增加产品类型」，这是它最核心的权衡。如果产品类型会频繁增加，应考虑用工厂方法 + 配置的方式，或直接用组合替代。",
    tags: ["缺点", "扩展性", "OCP", "权衡"],
  },
];
