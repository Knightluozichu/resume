import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "内置类型子类化", input: "需求与输入", action: "直接继承list或dict时部分C级操作可能绕过重写方法", evidence: "内置类型子类化的测试与迁移记录", invariant: "直接继承list或dict时部分C级操作可能绕过重写方法；先确认需要的是名义子类型、协议实现还是组合包装，避免只为复用存储而继承。" },
  { label: "super与MRO", input: "内置类型子类化", action: "super沿方法解析顺序继续协作调用，不等同于固定父类", evidence: "super与MRO的测试与迁移记录", invariant: "super沿方法解析顺序继续协作调用，不等同于固定父类；多重继承中的每个实现要使用兼容签名并继续链条，才能保持菱形结构只执行一次。" },
  { label: "描述符与property", input: "super与MRO", action: "描述符把属性读取、写入和删除委托给类属性对象，property是常用封装", evidence: "描述符与property的测试与迁移记录", invariant: "描述符把属性读取、写入和删除委托给类属性对象，property是常用封装；数据描述符、实例字典与非数据描述符有确定查找优先级。" },
  { label: "slots与对象布局", input: "描述符与property", action: "slots声明固定属性槽并可减少实例字典开销，但会影响弱引用、继承和动态属性", evidence: "slots与对象布局的测试与迁移记录", invariant: "slots声明固定属性槽并可减少实例字典开销，但会影响弱引用、继承和动态属性；只有测量大量实例后才应为内存使用它。" },
  { label: "元编程", input: "slots与对象布局", action: "原书通过new和metaclass展示类创建钩子", evidence: "元编程的测试与迁移记录", invariant: "原书通过new和metaclass展示类创建钩子；现代代码优先类装饰器或init_subclass，只有必须控制类对象创建时才引入元类。" },
];
export function PyaSyntaxAboveClassModelLab(){return <PythonAdvancedOfficialLab title="类以上层级的语法最佳实践：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaSyntaxAboveClassBoundaryLab(){return <PythonAdvancedOfficialLab title="类以上层级的语法最佳实践：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaSyntaxAboveClassEvidenceLab(){return <PythonAdvancedOfficialLab title="类以上层级的语法最佳实践：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
