import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "第6章 中间代码生成",
  label: "第6章 中间代码生成",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "构造表达式DAG",
    "发射三地址码",
    "检查并转换类型",
    "翻译布尔控制流",
    "回填跳转目标",
    "核对过程边界",
  ],
  concepts: [
    "第6章 中间代码生成",
    "6.1 语法树的变体",
    "6.1.1 表达式的DAG",
    "6.1.2 构造DAG的值编码方法",
    "6.2 三地址代码",
    "6.2.1 地址和指令",
    "6.2.2 四元式",
    "6.2.3 三元式",
    "6.2.4 静态单赋值形式",
    "6.3 类型和声明",
    "6.3.1 类型表达式",
    "6.3.2 类型等价",
    "6.3.3 声明",
    "6.3.4 局部名字的存储布局",
    "6.3.5 声明的序列",
    "6.3.6 记录和类中的字段",
    "6.4 表达式的翻译",
    "6.4.1 表达式中的运算",
    "6.4.2 增量翻译",
    "6.4.3 数组元素的寻址",
    "6.4.4 数组引用的翻译",
    "6.5 类型检查",
    "6.5.1 类型检查规则",
    "6.5.2 类型转换",
    "6.5.3 函数和运算符的重载",
    "6.5.4 类型推导和多态函数",
    "6.5.5 一个合一算法",
    "6.6 控制流",
    "6.6.1 布尔表达式",
    "6.6.2 短路代码",
    "6.6.3 控制流语句",
    "6.6.4 布尔表达式的控制流翻译",
    "6.6.5 避免冗余的goto指令",
    "6.6.6 布尔值和跳转代码",
    "6.7 回填",
    "6.7.1 使用回填的一趟式代码生成",
    "6.7.2 布尔表达式的回填",
    "6.7.3 控制转移语句",
    "6.7.4 break、continue和goto语句",
    "6.8 switch语句",
    "6.8.1 switch语句的翻译",
    "6.8.2 switch语句的语法制导翻译",
    "6.9 过程的中间代码",
  ],
} as const;

export function Dbc06IntermediateCodeGenerationMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function Dbc06IntermediateCodeGenerationExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function Dbc06IntermediateCodeGenerationEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
