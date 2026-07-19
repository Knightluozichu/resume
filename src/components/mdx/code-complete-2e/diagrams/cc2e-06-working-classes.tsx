import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-06-working-classes",
  title: "第6章：可以工作的类",
  nodes: ["领域概念", "ADT契约", "类接口", "实现封装", "使用验证"],
  concepts: [
    "第6章 可以工作的类",
    "6.1 类的基础：抽象数据类型",
    "需要用到ADT的例子",
    "使用ADT的益处",
    "更多的ADT示例",
    "在非面向对象环境中用ADT处理多份数据实例",
    "ADT和类",
    "6.2 良好的类接口",
    "好的抽象",
    "良好的封装",
    "6.3 有关设计和实现的问题",
    "包含（“有一个……”的关系）",
    "继承（“是一个……”关系）",
    "成员函数和数据成员",
    "构造函数",
    "6.4 创建类的原因",
    "应该避免的类",
    "总结：创建类的理由",
    "与具体编程语言相关的问题",
    "6.6 超越类：包",
    "更多资源",
    "关键点",
  ],
  mechanism:
    "可工作的类用不变量约束状态，以最小接口暴露稳定能力，通过封装、组合或受控继承管理变化",
  success: "第6章：可以工作的类 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第6章：可以工作的类 在“公开可变字段或半初始化对象让调用者绕过不变量”处拒绝",
  model: {
    primaryLabel: "抽象质量",
    primaryUnit: "项",
    primaryInitial: 9,
    primaryMax: 45,
    primaryWeight: 2.1,
    secondaryLabel: "封装边界",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 21,
    secondaryWeight: 9,
    basePressure: 8,
    boundaryPenalty: 14,
    faultPenalty: 19,
    limit: 60,
    metricLabel: "组合压力",
  },
} as const;

export function Cc2e06WorkingClassesMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
