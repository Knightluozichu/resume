/** 复习题库 · 数据成员布局（ico-data-members）。《深度探索 C++ 对象模型》第 3 章改编。 */

import type { ReviewQuestion } from "./types";

export const icoDataMembersQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ico-dm-1",
    chapter: "ico-data-members",
    level: 1,
    question: "什么是「对齐（alignment）」和「padding」？空类 `struct Empty {}` 的 sizeof 是多少？",
    answer:
      "对齐指每个成员要落在自身大小（或系统对齐值）的整数倍地址上，编译器为此在成员之间插入的空白字节叫 padding。空类 `Empty` 的 sizeof 通常是 1——虽然它没有任何成员，但 C++ 要保证同一类型的两个不同对象地址不同，所以给 1 字节占位。",
    tags: ["对齐", "padding", "空类"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "ico-dm-2",
    chapter: "ico-data-members",
    level: 2,
    question: "为什么 `struct { char c; double d; int i; }` 的 sizeof 可能是 24，而把成员顺序调成 `double d; int i; char c;` 后可能缩到 16？",
    answer:
      "对齐导致 padding。原顺序：char(1B) 后要让 double 落在 8 字节边界，插 7B padding，再 double(8B)，再 int(4B)，末尾还要补 4B 让整体对齐到 8——合计 24B。调序后：double(8B) 先放，int(4B) 紧跟，char(1B) 再跟，末尾补 3B 对齐到 8——合计 16B。规律：把大对齐成员放前面、小的放后面，能压缩 padding。所以成员声明顺序直接影响 sizeof。",
    tags: ["对齐", "成员顺序", "sizeof"],
  },

  // ── L3 应用：读代码 / 推断 ──
  {
    id: "ico-dm-3",
    chapter: "ico-data-members",
    level: 3,
    question:
      "类 `A` 有一个普通 int 成员和一个 `static int s;`。`sizeof(A)` 算不算上 s？为什么？位域 `int a:3; int b:3; int c:2;` 合在一起占多少？",
    answer:
      "不算 static 成员 s。静态成员存于全局数据段，所有对象共享一份，不属于任何单个对象，所以不计入 sizeof(A)——sizeof 只反映一个对象实例的非静成员布局。位域 `a:3 + b:3 + c:2` 共 8 位，正好压进 1 个字节（若底层类型是 int，通常占 4B 容纳这些位，但具体由实现定义）。位域的意义就是把多个小字段压进尽量少的存储单元。",
    tags: ["静态成员", "位域", "推断"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "ico-dm-4",
    chapter: "ico-data-members",
    level: 4,
    question:
      "你在做性能敏感的缓存行优化，发现一组小对象数组缓存命中率差。从数据成员布局角度，你会怎么排查和优化？",
    answer:
      "先看 sizeof：成员声明顺序不佳会让 padding 撑大对象，一个本该 12B 的对象变成 24B，数组里一半是空气，缓存行能装的有效数据减半。优化：① 按对齐值从大到小排列成员，压缩 padding；② 把「热」数据聚在一起、「冷」数据（如调试字段、罕见属性）拆到独立结构或用指针间接，避免冷字段污染缓存行；③ 注意虚函数会塞进 vptr 占一个指针大小并改变对齐；④ 位域可把多个 bool/小枚举压进一个字。这些都是在不改变逻辑的前提下、靠布局重排换缓存友好度。",
    tags: ["缓存优化", "布局重排", "综合"],
  },
];

export default icoDataMembersQuestions;
