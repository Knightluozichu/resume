import { OfficialAca18BookLab } from "./official-aca18-book-lab";

const nodes = [
  "第5章 组件化分发",
  "5.1 Activity分发",
  "5.1.1 Activity的生命周期",
  "5.1.2 Activity分发技术",
  "5.2 Fragment分发",
  "5.2.1 Fragment的生命周期",
  "5.2.2 Fragment分发技术",
  "5.3 View分发",
  "5.3.1 View的生命周期",
  "5.3.2 View分发技术",
  "5.4 依赖倒置",
  "5.4.1 依赖倒置原则",
  "5.4.2 依赖倒置分发",
  "5.5 组件化列表配置",
  "5.5.1 JavaPoet语法基础",
  "5.5.2 编译时注解配置",
  "5.5.3 集成配置列表",
  "5.6 加载优化",
  "5.6.1 线程加载",
  "5.6.2 模块懒加载",
  "5.7 层级限制",
  "5.8 多模板设计",
  "5.8.1 多模板注解",
  "5.8.2 脚本配置",
  "5.8.3 动态配置",
  "5.9 小结"
];

export function Aca18BoundaryLab() { return <OfficialAca18BookLab mode="boundary" unitTitle="第5章 组件化分发" focus="把Activity、Fragment与View生命周期分发连接到依赖倒置、JavaPoet列表、加载优化、层级限制和多模板配置" nodes={nodes} />; }
export function Aca18FailureLab() { return <OfficialAca18BookLab mode="failure" unitTitle="第5章 组件化分发" focus="用反射扫描或全局回调无界分发，让组件在错误生命周期、线程或依赖层级执行初始化与释放" nodes={nodes} />; }
export function Aca18EvidenceLab() { return <OfficialAca18BookLab mode="evidence" unitTitle="第5章 组件化分发" focus="生命周期时序、分发注册表、生成源码、线程与懒加载记录、层级违规测试和模板产物" nodes={nodes} />; }
