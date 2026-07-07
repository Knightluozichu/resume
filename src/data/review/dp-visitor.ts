import type { ReviewQuestion } from "./types";

/** 访问者模式章复习题 */
export const dpVisitorQuestions: ReviewQuestion[] = [
  {
    id: "dp-visitor-01",
    chapter: "dp-visitor",
    level: 1,
    question: "访问者模式的意图是什么？",
    answer: "访问者模式表示一个作用于某对象结构中各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。\n\n核心意图：把「对一组对象的操作」从对象类中抽离出来，封装成独立的访问者对象。当对象结构（如一棵 AST、一组形状）相对稳定，但要频繁新增「针对这些对象的操作」（如类型检查、代码生成、格式化、序列化）时，把操作放进访问者，新增操作只需加一个新访问者，不用改元素类。这是「数据结构稳定、操作多变」场景下的开闭原则实现。",
    tags: ["意图", "基础概念", "操作抽离"],
  },
  {
    id: "dp-visitor-02",
    chapter: "dp-visitor",
    level: 2,
    question: "什么是「双重分派」？访问者如何实现它？",
    answer: "双重分派：方法的执行同时取决于「两个对象的运行时类型」——调用者（被访问的元素）和参数（访问者），而不是只由调用者的类型决定（单分派）。\n\n访问者用两次方法调用实现双重分派：\n1. 第一次分派（客户端调元素）：`element.accept(visitor)`。`accept` 是元素的方法，由于元素的具体类型在运行时才确定（如 `IfNode` vs `WhileNode`），这次调用会进入对应子类的 `accept`——这是第一次按「元素类型」分派。\n2. 第二次分派（元素回调访问者）：在 `IfNode.accept(visitor)` 内部，调用 `visitor.visitIfNode(this)`。由于 `visitor` 的具体类型在运行时才确定，这次调用会进入对应访问者子类的 `visitIfNode`——这是第二次按「访问者类型」分派。\n\n最终执行的方法由「元素类型 × 访问者类型」共同决定。如果没有双重分派，`visitor.visit(element)` 只能按访问者类型单分派，元素类型会在 `visit` 里退化成 `if-else instanceof` 判断；双重分派让每种元素有独立的 `visitXxx` 方法，编译器静态分发，避免类型判断。",
    tags: ["双重分派", "分派机制", "结构"],
  },
  {
    id: "dp-visitor-03",
    chapter: "dp-visitor",
    level: 3,
    question: "编译器场景：AST 节点（IfNode、WhileNode、AssignNode），用访问者模式实现类型检查。",
    answer: "1. 定义元素接口 `AstNode`，声明 `accept(visitor: NodeVisitor)`。各节点实现：\n- `IfNode`：`accept(v)` 调 `v.visitIfNode(this)`。\n- `WhileNode`：`accept(v)` 调 `v.visitWhileNode(this)`。\n- `AssignNode`：`accept(v)` 调 `v.visitAssignNode(this)`。\n2. 定义访问者接口 `NodeVisitor`，声明 `visitIfNode` / `visitWhileNode` / `visitAssignNode`。\n3. 实现类型检查访问者 `TypeChecker implements NodeVisitor`：\n- `visitIfNode(node)`：检查条件表达式是否为布尔类型，再递归访问 then/else 分支（`node.cond.accept(this)` 等）。\n- `visitWhileNode(node)`：检查条件为布尔，递归访问循环体。\n- `visitAssignNode(node)`：检查右值类型与左值变量声明类型兼容，更新符号表。\n4. 客户端：遍历 AST 节点列表，对每个节点调 `node.accept(typeChecker)`。\n\n效果：节点类只负责「把自己交给访问者」，不含任何类型检查逻辑；类型检查规则全部集中在 `TypeChecker`。之后要加「代码生成」只需新建 `CodeGenVisitor`，要加「格式化」只需新建 `FormatVisitor`，节点类一行都不用改。这正是访问者针对「节点结构稳定、操作频繁新增」的价值。",
    tags: ["应用", "编译器", "AST", "类型检查"],
  },
  {
    id: "dp-visitor-04",
    chapter: "dp-visitor",
    level: 4,
    question: "访问者模式为什么违反 OCP？什么场景值得用？",
    answer: "为什么违反 OCP：\n\n访问者对「新增操作」友好（加一个新 Visitor 即可，不改元素类），但对「新增元素类型」不友好。一旦要新增一种元素（如 `ForNode`），必须：\n- 在 `NodeVisitor` 接口加 `visitForNode`。\n- 所有已有访问者（TypeChecker、CodeGen、Format...）都要实现这个新方法，否则编译不过。\n\n也就是说，加元素要同时改接口和所有访问者——违反了「对扩展开放、对修改封闭」。这是访问者的固有代价：它在「操作维度」实现 OCP，就在「元素维度」牺牲 OCP，二者不可兼得。\n\n值得用的场景：\n1. 元素结构稳定、很少新增元素类型，但操作频繁增加（编译器 AST、文档对象模型、报表系统）。AST 节点种类有限且固定，但要在上面跑无数遍操作（类型检查、优化、代码生成、序列化、lint...），访问者完美匹配。\n2. 需要对一组异构对象做「同类操作」且操作逻辑复杂、不想污染对象类本身（如对不同形状算面积、对不同税目算税）。\n3. 对象结构跨多个类，想把相关操作集中到一处而非散落在各元素类中（提升内聚）。\n\n不值得用的场景：元素类型频繁变化、操作很少变化——此时访问者的维护成本（每加元素改所有访问者）远大于收益，直接在元素类里加方法更简单。一句话：结构稳、操作多变才用访问者；结构多变则别用。",
    tags: ["OCP", "缺点", "适用场景"],
  },
];
