import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "创建型模式与Singleton", input: "需求与输入", action: "原书比较Singleton和Borg共享状态", evidence: "创建型模式与Singleton的测试与迁移记录", invariant: "原书比较Singleton和Borg共享状态；Python模块常已提供单实例命名空间，显式依赖注入通常比隐藏全局对象更易测试。" },
  { label: "Adapter与接口", input: "创建型模式与Singleton", action: "Adapter把既有对象转换为调用者期望的协议，接口定义最小能力", evidence: "Adapter与接口的测试与迁移记录", invariant: "Adapter把既有对象转换为调用者期望的协议，接口定义最小能力；动态类型不取消契约，只是可通过鸭子类型或Protocol表达。" },
  { label: "Proxy与Facade", input: "Adapter与接口", action: "Proxy在同一接口前控制访问、缓存或远程调用，Facade为复杂子系统提供较小入口", evidence: "Proxy与Facade的测试与迁移记录", invariant: "Proxy在同一接口前控制访问、缓存或远程调用，Facade为复杂子系统提供较小入口；两者都不应改变调用者无法察觉的错误语义。" },
  { label: "Observer与Visitor", input: "Proxy与Facade", action: "Observer把事件生产者与订阅者解耦，但需要退订、顺序和失败隔离", evidence: "Observer与Visitor的测试与迁移记录", invariant: "Observer把事件生产者与订阅者解耦，但需要退订、顺序和失败隔离；Visitor集中不同操作，代价是新增元素类型时要更新访问者。" },
  { label: "Template模式", input: "Observer与Visitor", action: "模板方法固定算法骨架并让步骤可替换", evidence: "Template模式的测试与迁移记录", invariant: "模板方法固定算法骨架并让步骤可替换；Python也可用高阶函数和组合避免深继承，选择依据是扩展轴与状态共享。" },
];
export function PyaUsefulDesignPatternsModelLab(){return <PythonAdvancedOfficialLab title="Python中的实用设计模式：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaUsefulDesignPatternsBoundaryLab(){return <PythonAdvancedOfficialLab title="Python中的实用设计模式：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaUsefulDesignPatternsEvidenceLab(){return <PythonAdvancedOfficialLab title="Python中的实用设计模式：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
