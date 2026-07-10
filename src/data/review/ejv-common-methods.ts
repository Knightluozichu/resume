import type { ReviewQuestion } from "./types";

export const ejvCommonMethodsQuestions: ReviewQuestion[] = [
  {
    id: "ejv-cm-1",
    chapter: "ejv-common-methods",
    level: 2,
    question: `equals 方法的五条契约是什么？为什么继承添加字段会破坏对称性？`,
    answer:
      `equals 五条契约：①自反性——\`x.equals(x)\` 必须为 true；②对称性——\`a.equals(b)\` 为 true 则 \`b.equals(a)\` 必须为 true；③传递性——\`a.equals(b)\` 且 \`b.equals(c)\` 为 true 则 \`a.equals(c)\` 必须为 true；④一致性——多次调用结果不变（对象未被修改）；⑤非空性——\`x.equals(null)\` 必须为 false。继承添加字段破坏对称性的经典案例：\`Point\` 有 equals 比较坐标，\`ColorPoint extends Point\` 添加颜色字段并重写 equals。如果 \`ColorPoint.equals(Point)\` 比较颜色（发现 Point 无颜色返回 false），而 \`Point.equals(ColorPoint)\` 不比较颜色（坐标相同返回 true），就破坏了对称性。Joshua Bloch 的结论是：无法在继承可实例化类并添加值字段的同时保持 equals 契约。解决方案是用组合替代继承——\`ColorPoint\` 持有一个 \`Point\` 字段而非继承 \`Point\`。`,
    tags: ["equals", "契约"],
  },
  {
    id: "ejv-cm-2",
    chapter: "ejv-common-methods",
    level: 2,
    question: `为什么重写了 equals 就必须重写 hashCode？hashCode 的经典算法是什么？`,
    answer:
      `必须同时重写的原因：hashCode 契约要求「equals 相等的两个对象必须有相同的 hashCode」。如果重写了 equals 但不重写 hashCode，两个 equals 相等的对象可能有不同的 hashCode（因为默认 hashCode 基于对象地址），这会导致 HashMap/HashSet 中「相等的对象被分到不同的桶」，从而无法正确查找——明明 equals 相等的对象却查不到。经典算法：\`int result = 17; result = 31 * result + f1.hashCode(); result = 31 * result + f2.hashCode(); ...\` 其中 17 是非零初始值（避免哈希冲突），31 是奇质数（乘以 31 可被 JVM 优化为 \`(i << 5) - i\` 位运算）。Objects.hash(f1, f2, ...) 封装了这个算法。注意：可变字段不应参与 hashCode 计算，否则对象放入 HashSet 后修改字段会导致找不到。`,
    tags: ["hashCode", "HashMap"],
  },
  {
    id: "ejv-cm-3",
    chapter: "ejv-common-methods",
    level: 3,
    question: `compareTo 方法的契约与 equals 有什么关系？为什么推荐它们保持一致？`,
    answer:
      `compareTo 是 Comparable 接口的唯一方法，返回 int（负/零/正分别表示小于/等于/大于）。它的契约与 equals 类似：自反性（\`x.compareTo(x) == 0\`）、对称性（\`sgn(x.compareTo(y)) == -sgn(y.compareTo(x))\`）、传递性（\`x<y && y<z\` 则 \`x<z\`）。与 equals 的关系：compareTo 不要求与 equals 一致——\`new BigDecimal(\"1.0\").compareTo(new BigDecimal(\"1.00\"))\` 返回 0（值相等），但 \`equals\` 返回 false（精度不同）。但 Joshua Bloch 强烈推荐保持一致：\`x.compareTo(y) == 0\` 当且仅当 \`x.equals(y)\`。原因：如果 compareTo 说两个对象相等但 equals 说不等（或反过来），TreeSet/TreeMap（用 compareTo 去重）和 HashSet/HashMap（用 equals 去重）的行为会产生不一致——同一个元素在 TreeSet 中只保留一个，在 HashSet 中却保留两个，造成混淆。`,
    tags: ["compareTo", "Comparable"],
  },
  {
    id: "ejv-cm-4",
    chapter: "ejv-common-methods",
    level: 4,
    question: `覆盖 toString 时有哪些最佳实践？为什么不建议依赖 toString 的格式？`,
    answer:
      `最佳实践：①覆盖 toString——Object 的默认实现是 \`ClassName@hashCode\`，对调试无意义；好的 toString 应包含对象的所有关键信息，如 \`PhoneNumber{area=02, number=1234}\`；②在文档中明确是否指定格式——如果指定了精确格式（如 JSON），就承诺不变；如果不指定（如 \`PhoneNumber{...}\`），就保留灵活性。不建议依赖 toString 格式的原因：①如果调用方依赖解析 toString 的输出来获取数据，就形成了隐式的 API 耦合——一旦 toString 格式改变，调用方就会崩溃；②格式化逻辑可能改变——不同版本可能调整分隔符、字段顺序；③toString 的本意是给人看的调试信息，不是编程式访问的接口。正确做法：提供明确的 accessor 方法（如 \`getArea()\`、\`getNumber()\`），让调用方通过这些方法获取数据，toString 仅用于日志和调试。`,
    tags: ["toString", "API设计"],
  },
];
