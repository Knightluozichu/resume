import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第4章 类、对象和接口",
  "4.1 定义类继承结构",
  "4.1.1 Kotlin中的接口",
  "4.1.2 open、final和abstract修饰符：默认为final",
  "4.1.3 可见性修饰符：默认为public",
  "4.1.4 内部类和嵌套类：默认是嵌套类",
  "4.1.5 密封类：定义受限的类继承结构",
  "4.2 声明一个带非默认构造方法或属性的类",
  "4.2.1 初始化类：主构造方法和初始化语句块",
  "4.2.2 构造方法：用不同的方式来初始化父类",
  "4.2.3 实现在接口中声明的属性",
  "4.2.4 通过getter或setter访问支持字段",
  "4.2.5 修改访问器的可见性",
  "4.3 编译器生成的方法：数据类和类委托",
  "4.3.1 通用对象方法",
  "4.3.2 数据类：自动生成通用方法的实现",
  "4.3.3 类委托：使用by关键字",
  "4.4 object关键字：将声明一个类与创建一个实例结合起来",
  "4.4.1 对象声明：创建单例易如反掌",
  "4.4.2 伴生对象：工厂方法和静态成员的地盘",
  "4.4.3 作为普通对象使用的伴生对象",
  "4.4.4 对象表达式：改变写法的匿名内部类",
  "4.5 小结"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第4章 类、对象和接口" focus="从默认final、可见性、嵌套类、密封类、构造、数据类、委托和对象声明建立类型设计模型" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第4章 类、对象和接口" focus="沿用Java默认可继承和内部类语义，或把data class、object和companion object视为纯语法糖" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第4章 类、对象和接口" focus="继承许可表、构造顺序、数据类方法快照、委托转发记录和对象身份测试" nodes={nodes} />; }
