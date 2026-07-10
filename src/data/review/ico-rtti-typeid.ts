/** 复习题库 · RTTI 与 typeid（ico-rtti-typeid）。《深度探索 C++ 对象模型》RTTI 章改编。 */

import type { ReviewQuestion } from "./types";

export const icoRttiTypeidQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ico-rt-1",
    chapter: "ico-rtti-typeid",
    level: 1,
    question: `RTTI 依赖什么机制？\`type_info\` 存在哪里？\`typeid\` 和 \`dynamic_cast\` 各做什么？`,
    answer:
      `RTTI（运行期类型信息）依赖虚函数体系——type_info 挂在每个类的虚表上（通常在虚函数槽之前）。typeid(e) 返回表达式所属类型的 type_info 引用，用于类型相等比较和取类型名。dynamic_cast<T*>(p) 做安全的下行转换：运行期取 p 所指对象的 type_info，沿继承链比对 T，成功返回调整后的指针、失败返回 nullptr。`,
    tags: ["RTTI", "type_info", "typeid", "dynamic_cast"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "ico-rt-2",
    chapter: "ico-rtti-typeid",
    level: 2,
    question: `为什么 RTTI 必须依赖虚函数？一个没有虚函数的类，能用 dynamic_cast 做多态下行转换吗？`,
    answer:
      `因为运行期类型信息靠 vptr 找到 type_info——没有虚函数就没有 vptr，对象里没有任何标记能告诉运行期「我实际是什么类型」。所以对没有虚函数的类做多态下行转换（dynamic_cast 把基类指针转派生类指针）会编译失败。dynamic_cast 也可以做非多态类型的转换，但那只相当于 static_cast，没有运行期检查、不查 type_info。真正的安全下行转换只对多态类型（有虚函数）才有意义。`,
    tags: ["RTTI 依赖虚函数", "dynamic_cast"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "ico-rt-3",
    chapter: "ico-rtti-typeid",
    level: 3,
    question:
      `\`dynamic_cast<Derived*>(basePtr)\` 总返回 nullptr，但 basePtr 确实指向一个 Derived 对象。可能原因有哪些？`,
    answer:
      `可能原因：① 基类没有虚函数——多态下行转换要求基类是多态类型（至少有一个虚函数），否则连编译都过；若只是没虚函数却用了 static_cast 那不算。② 访问权限：继承方式是 private/protected，或转换到的基类不可访问——dynamic_cast 沿继承链比对时受访问权限限制。③ basePtr 实际并不指向 Derived，或类型判断有误（如指向的是另一个兄弟派生类）。④ 转换目标不在同一条多态继承路径上。最常见的是 ①——忘了给基类加虚函数（包括虚析构）。`,
    tags: ["dynamic_cast 排错", "多态类型"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "ico-rt-4",
    chapter: "ico-rtti-typeid",
    level: 4,
    question:
      `「能用 dynamic_cast 就别用 static_cast，更安全」——这话在工程上对吗？从开销与设计两个角度反驳。`,
    answer:
      `不完全对。开销角度：dynamic_cast 做运行期 type_info 比对、沿继承链搜索，比 static_cast 贵得多，热点路径频繁 dynamic_cast 会拖性能。设计角度：大量 dynamic_cast 往往是设计气味——说明你该用多态（虚函数把行为下放到派生类）而不是在调用点反复「问类型再分支」。正确做法：能用虚函数表达的多态就用虚函数；只有确实需要在多态对象上做类型分支且无法重构为多态时，才用 dynamic_cast，并尽量在初始化或边界处做一次、缓存结果，而不是每次调用都转。static_cast 用于「我确知类型」的场景，零开销但无安全网。`,
    tags: ["dynamic_cast", "设计气味", "综合", "陷阱"],
  },
];

export default icoRttiTypeidQuestions;
