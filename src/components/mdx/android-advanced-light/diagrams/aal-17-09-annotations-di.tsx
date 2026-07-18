import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第9章 注解与依赖注入框架",
  "9.1 注解",
  "9.1.1 注解分类",
  "9.1.2 定义注解",
  "9.1.3 注解处理器",
  "9.2 依赖注入的原理",
  "9.2.1 控制反转与依赖注入",
  "9.2.2 依赖注入的实现方式",
  "9.3 依赖注入框架",
  "9.3.1 为何使用依赖注入框架",
  "9.3.2 解析ButterKnife",
  "9.3.3 解析Dagger2",
  "9.4 本章小结"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="第9章 注解与依赖注入框架" focus="从注解分类、定义和处理器进入IoC与依赖注入实现，并解析ButterKnife和Dagger 2" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="第9章 注解与依赖注入框架" focus="把依赖注入等同于隐藏new，未定义对象图所有者、作用域与生成代码的可检查边界" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="第9章 注解与依赖注入框架" focus="注解保留策略、处理器输入输出、生成源码、对象图、作用域、循环依赖和编译失败样例" nodes={nodes} />; }
