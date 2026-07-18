import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "列表推导与生成器表达式", input: "需求与输入", action: "推导式适合单一、可读的映射或过滤，生成器表达式把结果惰性传给消费者", evidence: "列表推导与生成器表达式的测试与迁移记录", invariant: "推导式适合单一、可读的映射或过滤，生成器表达式把结果惰性传给消费者；当副作用、分支或异常复杂时应改回显式循环。" },
  { label: "迭代器与生成器", input: "列表推导与生成器表达式", action: "迭代协议由iter与next协作，生成器保存暂停点与局部状态", evidence: "迭代器与生成器的测试与迁移记录", invariant: "迭代协议由iter与next协作，生成器保存暂停点与局部状态；惰性只降低同时驻留的元素，不会自动限制上游无限生产。" },
  { label: "协程", input: "迭代器与生成器", action: "原书基于生成器send讨论协程，把数据推入暂停的执行体", evidence: "协程的测试与迁移记录", invariant: "原书基于生成器send讨论协程，把数据推入暂停的执行体；现代async协程语法不同，但消息输入、取消、关闭和异常传播仍是同一类协议问题。" },
  { label: "装饰器", input: "协程", action: "装饰器在定义阶段替换可调用对象，适合横切契约", evidence: "装饰器的测试与迁移记录", invariant: "装饰器在定义阶段替换可调用对象，适合横切契约；包装器要保留元数据、参数与异常语义，不能把业务控制流藏进不可见全局状态。" },
  { label: "with与contextlib", input: "装饰器", action: "上下文管理器把获取和释放绑成词法作用域，即使异常也执行清理", evidence: "with与contextlib的测试与迁移记录", invariant: "上下文管理器把获取和释放绑成词法作用域，即使异常也执行清理；它适合文件、锁、事务和临时资源，但退出方法必须明确是否吞掉异常。" },
];
export function PyaSyntaxBelowClassModelLab(){return <PythonAdvancedOfficialLab title="类以下层级的语法最佳实践：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaSyntaxBelowClassBoundaryLab(){return <PythonAdvancedOfficialLab title="类以下层级的语法最佳实践：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaSyntaxBelowClassEvidenceLab(){return <PythonAdvancedOfficialLab title="类以下层级的语法最佳实践：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
