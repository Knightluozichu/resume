import type { ReviewQuestion } from "./types";

/** Effective C# 属性优先复习题 */
export const ecsPropertyPreferQuestions: ReviewQuestion[] = [
  {
    id: "ecs-property-prefer-1",
    chapter: "ecs-property-prefer",
    level: 1,
    question: `为什么对外暴露的数据成员应该用属性而不是公共字段？`,
    answer:
      `属性相比公共字段有四项核心优势：\n\n1. 封装校验：set 访问器可以拒绝非法值，字段做不到。\n2. 数据绑定：WPF/MAUI 等框架依赖属性通知机制，字段无法参与。\n3. 接口契约：接口只能声明属性，不能声明字段。\n4. 虚成员：属性可声明 virtual 供派生类 override，字段不能。\n\nEffective C# 条款 1 的核心：对外暴露的数据成员一律用属性，字段永远是 private。`,
    tags: ["属性", "字段", "封装", "条款1"],
  },
  {
    id: "ecs-property-prefer-2",
    chapter: "ecs-property-prefer",
    level: 2,
    question:
      `把 public 字段改成属性为什么会破坏二进制兼容？源码兼容吗？`,
    answer:
      `字段访问编译成 ldfld/stfld 指令直接读写内存偏移；属性访问编译成 call get_X/set_X 方法调用。两者的 IL 元数据和指令完全不同。\n\n源码兼容：是的，C# 源码里 \`obj.X = 5\` 对字段和属性都合法，源码不用改。\n\n二进制不兼容：调用方按字段编译的二进制（含 ldfld 指令和字段元数据），在属性版本里找不到对应字段元数据，运行时抛 MissingFieldException。\n\n结论：一旦用 public 字段发布 API，就再也无法无痛改成属性。所以一开始就用属性发布（即使初版只是自动属性 { get; set; }），未来加校验也不破坏 ABI。`,
    tags: ["二进制兼容", "IL指令", "版本兼容", "ABI"],
  },
  {
    id: "ecs-property-prefer-3",
    chapter: "ecs-property-prefer",
    level: 3,
    question:
      `属性 get 的设计约束是什么？如果 get 里做昂贵计算会有什么问题？`,
    answer:
      `属性 get 应廉价且无副作用。\n\n问题：属性语法像字段，调用方会按字段预期频繁访问（如循环里反复读属性）。如果 get 做昂贵计算（IO、复杂数学）或有副作用（改状态），调用方的性能预期和正确性都会被破坏——他们以为只是读字段，实际每次都是一次方法调用加昂贵操作。\n\n修法：get 保持廉价无副作用。昂贵的计算用方法命名（如 ComputeX()）来暗示代价，让调用方知道这不是一次简单读取。计算属性（如 IsMinor => Age < 18）可以接受，因为计算本身廉价。`,
    tags: ["属性设计", "get访问器", "性能", "副作用"],
  },
  {
    id: "ecs-property-prefer-4",
    chapter: "ecs-property-prefer",
    level: 4,
    question:
      `接口为什么只能声明属性而不能声明字段？这背后反映了 C# 怎样的设计哲学？`,
    answer:
      `接口定义的是行为契约（方法、属性、事件、索引器），不是实现细节。字段是存储实现，属于类的内部状态，放进接口会把实现细节泄漏到契约层。属性本质是一对 get/set 方法，符合「契约描述行为」的语义。\n\n这反映了 C# 的设计哲学：契约与实现分离。接口是「能做什么」的承诺，类是「怎么存」的实现。属性正好处于两者之间——对外是行为（读写访问），对内委托给存储（backing field）。\n\n条款 1 把属性优先放第一条，正是确立这个哲学：对外暴露行为契约（属性），对内隐藏存储实现（private 字段）。这样接口可以多态、实现可以演化、版本可以兼容，三者统一在「属性即契约」这一基础上。`,
    tags: ["接口契约", "设计哲学", "契约与实现", "综合"],
  },
];
