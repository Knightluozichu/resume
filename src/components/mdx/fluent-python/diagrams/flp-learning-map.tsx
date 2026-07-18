import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";
const cases: FluentPythonCase[] = [
  { label: "五Part学习地图", input: "五Part学习地图按官方24章建立前后依赖，每章都以模型、边界、证据和复习题闭环。", mechanism: "阶段1：建立依赖与边界", evidence: "完成实现、反例与复述 1", invariant: "数据结构主线从数据模型、序列、映射、Unicode、数据类走到引用语义，回答对象怎样保存和表现。" },
  { label: "数据结构主线", input: "数据结构主线从数据模型、序列、映射、Unicode、数据类走到引用语义，回答对象怎样保存和表现。", mechanism: "阶段2：建立依赖与边界", evidence: "完成实现、反例与复述 2", invariant: "函数作为对象主线连接类型提示、闭包装饰器和函数式设计模式，回答行为怎样被传递与组合。" },
  { label: "函数作为对象主线", input: "函数作为对象主线连接类型提示、闭包装饰器和函数式设计模式，回答行为怎样被传递与组合。", mechanism: "阶段3：建立依赖与边界", evidence: "完成实现、反例与复述 3", invariant: "类与协议主线用值对象、序列协议、ABC、继承、泛型和运算符建立可替换的对象协作。" },
  { label: "类与协议主线", input: "类与协议主线用值对象、序列协议、ABC、继承、泛型和运算符建立可替换的对象协作。", mechanism: "阶段4：建立依赖与边界", evidence: "完成实现、反例与复述 4", invariant: "控制流主线从迭代生成器走到上下文、线程进程、Future和asyncio，回答工作怎样暂停、恢复和取消。" },
];
export function FlpLearningMapModelLab(){return <FluentPythonOfficialLab title="《流畅的 Python》第2版全书导览：结构" caption="按依赖定位学习任务。" cases={cases} tone="cyan" />;}
export function FlpLearningMapBoundaryLab(){return <FluentPythonOfficialLab title="《流畅的 Python》第2版全书导览：边界" caption="把语法放回协议与失败路径。" cases={cases} tone="amber" initial={1} />;}
export function FlpLearningMapEvidenceLab(){return <FluentPythonOfficialLab title="《流畅的 Python》第2版全书导览：证据" caption="以实现、反例和复述验收。" cases={cases} tone="emerald" initial={2} />;}
