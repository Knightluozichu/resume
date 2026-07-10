import type { ReviewQuestion } from "./types";

/** 生命周期 复习题 */
export const rswLifetimesQuestions: ReviewQuestion[] = [
  {
    id: "rsw-lifetimes-1",
    chapter: "rsw-lifetimes",
    level: 1,
    question: `生命周期 'a 是什么？它会改变运行时行为吗？`,
    answer: `生命周期 'a 是编译期标注，描述引用的有效范围。它不会改变任何运行时行为——纯粹帮助借用检查器验证引用不悬垂。编译通过后生命周期信息被擦除，运行时零开销。`,
    tags: ["生命周期", "编译期标注"],
  },
  {
    id: "rsw-lifetimes-2",
    chapter: "rsw-lifetimes",
    level: 2,
    question: `生命周期省略规则有哪三条？什么时候需要显式标注？`,
    answer: `规则 1：每个引用参数获得独立生命周期 'a。规则 2：若只有一个输入生命周期参数，输出赋同寿。规则 3：若有 &self/&mut self，输出的生命周期取 self 的。三条规则都套不上时编译器报错要求显式标注——典型场景是多个引用参数且返回引用的函数，如 fn longest(x: &str, y: &str) -> &str。`,
    tags: ["省略规则", "显式标注"],
  },
  {
    id: "rsw-lifetimes-3",
    chapter: "rsw-lifetimes",
    level: 3,
    question: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str 中 'a 表示什么含义？`,
    answer: `'a 表示 x 和 y 寿命的交集，返回引用在这个交集内有效。即返回引用的寿命不超过任一输入引用——保证返回的引用绝不会比它指向的数据活得更久，从而防止悬垂引用。这是保守的最小约束：编译器取两个输入中较短的生命周期作为输出的上限。`,
    tags: ["生命周期标注", "交集约束"],
  },
  {
    id: "rsw-lifetimes-4",
    chapter: "rsw-lifetimes",
    level: 4,
    question: `结构体持有引用会导致「生命周期传染」，如何判断该用 &'a str 还是 String？`,
    answer: `若数据本应由结构体拥有（独立生命周期、需要跨函数传递），用 String 避免 'a 传染——否则所有使用该结构体的函数和结构体都要带上 'a，造成「生命周期病毒式传播」。只有在确有性能需求且数据寿命明确比结构体长寿时才用引用持有 &'a。判断标准：结构体是否需要独立拥有数据副本？是→String；否（只是借用更大数据的切片，且调用方保证数据长寿）→&'a。优先 String 牺牲少量性能换取 API 简洁。`,
    tags: ["结构体生命周期", "生命周期传染", "综合"],
  },
];
