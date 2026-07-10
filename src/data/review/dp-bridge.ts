import type { ReviewQuestion } from "./types";

/** 桥接模式章复习题 */
export const dpBridgeQuestions: ReviewQuestion[] = [
  {
    id: "dp-bridge-01",
    chapter: "dp-bridge",
    level: 1,
    question: `桥接模式的意图是什么？`,
    answer: `桥接模式将抽象部分与它的实现部分分离，使它们都可以独立地变化。\n\n核心意图：把「两个独立变化的维度」拆成两个独立的类层次，通过组合（而非继承）连接它们，避免多维变化导致的类爆炸。抽象层持有一个实现层接口的引用，二者通过这座「桥」解耦，各自扩展互不影响。`,
    tags: ["意图", "基础概念"],
  },
  {
    id: "dp-bridge-02",
    chapter: "dp-bridge",
    level: 2,
    question: `桥接模式是如何解决「继承爆炸」问题的？`,
    answer: `不用桥接时：假设有形状（圆/方/三角）× 渲染方式（OpenGL/DirectX/Vulkan）两个变化维度，用继承实现就需要 3×3=9 个子类（\`CircleOpenGL\`、\`CircleDirectX\`、\`CircleVulkan\`、\`SquareOpenGL\`...）。每加一个形状或一个渲染器，子类数量呈乘积增长，这就是「继承爆炸」。\n\n用桥接后：把「形状」和「渲染器」拆成两个独立的类层次。\`Shape\` 持有一个 \`Renderer\` 引用，\`Shape\` 的子类只管形状逻辑，\`Renderer\` 的子类只管渲染细节。形状通过调用 \`renderer.renderCircle()\` 等方法把渲染委托出去。\n\n效果：类数量从 M×N 降到 M+N。新增形状只加一个 \`Shape\` 子类，新增渲染器只加一个 \`Renderer\` 子类，两者正交扩展、互不干扰。这座「桥」就是 \`Shape\` 持有的那个 \`Renderer\` 引用。`,
    tags: ["继承爆炸", "多维度变化", "组合"],
  },
  {
    id: "dp-bridge-03",
    chapter: "dp-bridge",
    level: 3,
    question: `图形渲染场景：不同形状（圆/方）× 不同渲染器（OpenGL/DirectX），如何用桥接模式设计？`,
    answer: `1. 定义实现层接口 \`Renderer\`，声明 \`renderCircle(radius)\` 和 \`renderSquare(side)\`。\n2. 具体实现：\`OpenGLRenderer\`、\`DirectXRenderer\`，各自用对应图形 API 实现绘制方法。\n3. 定义抽象层 \`Shape\`，内部持有一个 \`Renderer\` 引用（这是「桥」），构造时注入；声明 \`draw()\` 方法。\n4. 具体形状：\n- \`Circle extends Shape\`：\`draw()\` 调用 \`renderer.renderCircle(radius)\`。\n- \`Square extends Shape\`：\`draw()\` 调用 \`renderer.renderSquare(side)\`。\n5. 使用：\`new Circle(new OpenGLRenderer()).draw()\` 画一个 OpenGL 圆；换成 \`new Circle(new DirectXRenderer()).draw()\` 就是 DirectX 圆。\n\n关键点：换渲染器只换注入的 \`Renderer\` 实例，换形状只换 \`Shape\` 子类，两个维度独立变化。形状层次不关心渲染细节，渲染层次不关心形状语义，通过桥接点（\`Shape\` 持有的 \`Renderer\`）协作。`,
    tags: ["应用", "图形渲染", "多维度"],
  },
  {
    id: "dp-bridge-04",
    chapter: "dp-bridge",
    level: 4,
    question: `桥接模式和策略模式结构上都很像（都持有另一个对象的引用做委托），它们有什么本质区别？`,
    answer: `相似点：都是「持有另一个对象的引用」把调用委托出去，UML 上都很像。\n\n本质区别：\n- 解决的问题不同：桥接用于「两个正交维度都需要独立扩展」，目的是把多维变化拆开；策略用于「同一维度的多种算法可替换」，目的是让算法变化不影响调用方。\n- 生命周期不同：桥接中的实现层通常在构造时就绑定，且与抽象层长期共存、共同演化；策略可以在运行时动态切换，Context 不关心策略何时被替换。\n- 数量关系不同：桥接是两个层次各自有多个实现，组合出 M×N 种能力；策略是一个 Context 配一个策略，是 1 对 1 的替换。\n- 语义不同：桥接强调「分离抽象与实现」，策略强调「封装可替换的算法」。\n- 演化方向不同：桥接的两个层次都会持续新增子类；策略的策略族虽会新增，但 Context 通常稳定。\n\n一句话：桥接是「拆维度」，策略是「换算法」。`,
    tags: ["对比", "桥接", "策略"],
  },
];
