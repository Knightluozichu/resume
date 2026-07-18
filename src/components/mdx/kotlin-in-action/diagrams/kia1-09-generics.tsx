import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第9章 泛型",
  "9.1 泛型类型参数",
  "9.1.1 泛型函数和属性",
  "9.1.2 声明泛型类",
  "9.1.3 类型参数约束",
  "9.1.4 让类型形参非空",
  "9.2 运行时的泛型：擦除和实化类型参数",
  "9.2.1 运行时的泛型：类型检查和转换",
  "9.2.2 声明带实化类型参数的函数",
  "9.2.3 使用实化类型参数代替类引用",
  "9.2.4 实化类型参数的限制",
  "9.3 变型：泛型和子类型化",
  "9.3.1 为什么存在变型：给函数传递实参",
  "9.3.2 类、类型和子类型",
  "9.3.3 协变：保留子类型化关系",
  "9.3.4 逆变：反转子类型化关系",
  "9.3.5 使用点变型：在类型出现的地方指定变型",
  "9.3.6 星号投影：使用*代替类型参数",
  "9.4 小结"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第9章 泛型" focus="从约束、擦除、实化、协变、逆变、使用点变型和星号投影证明泛型API的读写安全" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第9章 泛型" focus="把声明点与使用点变型混用，或认为reified能突破所有JVM擦除并在任意位置取得类型实参" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第9章 泛型" focus="类型约束样例、擦除反例、实化字节码边界、生产者消费者表和星号投影测试" nodes={nodes} />; }
