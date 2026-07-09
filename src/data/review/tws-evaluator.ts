import { ReviewQuestion } from "../types";

export const twsEvaluatorQuestions: ReviewQuestion[] = [
  {
    id: "tws-evaluator-1",
    chapter: "tws-evaluator",
    level: 1,
    question: "求值器（Evaluator）的作用是什么？它如何遍历 AST？",
    answer:
      "求值器的作用是遍历 AST 并执行计算，将程序逻辑转化为实际效果。它通过访问者模式（Visitor Pattern）遍历 AST：从根节点开始，对每个节点调用 accept(visitor)，visitor 为每种节点类型实现对应的 eval 方法。表达式节点 eval 返回计算值（Integer/String/Object），语句节点 eval 执行副作用（如变量赋值）并返回 null。递归地对子节点求值，直到叶子节点。",
    tags: ["Evaluator", "树遍历", "访问者模式", "求值"],
  },
  {
    id: "tws-evaluator-2",
    chapter: "tws-evaluator",
    level: 2,
    question: "环境（Environment）是什么？变量的 get 和 put 操作如何工作？",
    answer:
      "环境是变量绑定的容器，存储变量名到值的映射。每个 Environment 持有 values（Map）和 outer（外层环境引用）。get 操作：先在当前环境的 values 中查找变量名，找到则返回值；未找到则递归到 outer 环境查找，直到全局环境。put 操作：直接将变量名和值写入当前环境的 values 中。这种链式查找机制实现了词法作用域——内层代码可以访问外层变量，但外层不能访问内层变量。",
    tags: ["Environment", "变量绑定", "get", "put", "作用域"],
  },
  {
    id: "tws-evaluator-3",
    chapter: "tws-evaluator",
    level: 3,
    question: "BinaryExpr 节点是如何求值的？以 `x + y * 2` 为例说明完整求值过程。",
    answer:
      "BinaryExpr 求值步骤：①先递归求值左子树得到左操作数值 ②递归求值右子树得到右操作数值 ③根据运算符 Token 执行对应运算（+、-、*、/ 等），返回结果。以 `x + y * 2` 为例：AST 根为 BinaryExpr(+)，左子树 Name(x)，右子树 BinaryExpr(*)。求值时先求 Name(x) → env.get(\"x\") 得到 x 的值（如 3），再求 BinaryExpr(*)：求 Name(y) → 4，求 NumberLiteral(2) → 2，执行 4*2=8。最后执行 3+8=11，返回 11。",
    tags: ["BinaryExpr", "求值过程", "递归求值", "运算符"],
  },
  {
    id: "tws-evaluator-4",
    chapter: "tws-evaluator",
    level: 2,
    question: "IfStmnt 和 WhileStmnt 的求值逻辑分别是什么？",
    answer:
      "IfStmnt 求值：先递归求值条件表达式得到布尔值，如果为 true 则求值 then 分支的语句块并返回结果，否则求值 else 分支（如果存在）。WhileStmnt 求值：循环执行——先求值条件表达式，如果为 true 则求值循环体语句块，然后再次求值条件，如此循环直到条件为 false。循环体求值结果被丢弃，WhileStmnt 最终返回 null。两者都依赖条件表达式的求值结果来控制流程，条件非零整数视为 true，零视为 false。",
    tags: ["IfStmnt", "WhileStmnt", "条件求值", "循环"],
  },
];
