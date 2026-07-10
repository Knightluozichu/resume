import type { ReviewQuestion } from "./types";

export const ejvLambdasStreamsQuestions: ReviewQuestion[] = [
  {
    id: "ejv-ls-1",
    chapter: "ejv-lambdas-streams",
    level: 2,
    question: `Lambda 表达式相比匿名内部类有哪些优势和限制？什么时候不应该用 Lambda？`,
    answer:
      `Lambda 的优势：①代码简洁——\`words.sort((s1, s2) -> Integer.compare(s1.length(), s2.length()))\` 比匿名 Comparator 的 5 行代码简洁得多；②可读性强——关注「做什么」而非「怎么做」；③类型推导——编译器自动推导参数类型，无需声明。Lambda 的限制：①只能用于函数式接口（只有一个抽象方法的接口）——有多个抽象方法的接口仍需匿名类；②Lambda 中 this 指向外部类实例（匿名类的 this 指向匿名类实例本身）；③Lambda 无法在自身内部引用自己（匿名类可以通过 \`this\`）；④Lambda 无法实例化字段（匿名类可以有实例字段和构造器）；⑤Lambda 无法实现多个接口（匿名类可以实现多个接口或继承类+实现接口）。不应该用 Lambda 的场景：①需要多个抽象方法的接口；②需要实例字段或构造器的场景；③Lambda 体过长（超过几行就应该提取为方法）；④需要可读性高的控制流——复杂的 for/while 循环用 Stream 反而更难读。`,
    tags: ["Lambda", "匿名类"],
  },
  {
    id: "ejv-ls-2",
    chapter: "ejv-lambdas-streams",
    level: 3,
    question: `Stream 管道的三部分是什么？中间操作和终端操作有什么区别？`,
    answer:
      `Stream 管道由三部分组成：①源——\`list.stream()\`、\`Arrays.stream(arr)\`、\`Stream.of(...)\` 等；②零或多个中间操作——\`filter\`、\`map\`、\`flatMap\`、\`sorted\`、\`limit\`、\`distinct\` 等；③一个终端操作——\`collect\`、\`forEach\`、\`count\`、\`reduce\`、\`findFirst\`、\`anyMatch\` 等。中间操作和终端操作的区别：①惰性 vs 急切——中间操作是惰性的（lazy），在终端操作执行前不会做任何计算；终端操作触发整个管道的执行；②返回类型——中间操作返回 Stream（可以链式调用），终端操作返回非 Stream 类型（集合、值或 void）；③流消费——终端操作会「消费」流，流只能被消费一次。惰性的好处：\`Stream.iterate(1, n -> n + 1).filter(n -> isPrime(n)).limit(10).collect(toList())\` ——filter 不需要先处理无限流的所有元素，limit(10) 让它找到 10 个素数就停止。Stream 还分为顺序流和并行流（\`parallelStream()\`），但并行流要谨慎使用。`,
    tags: ["Stream", "中间操作", "终端操作"],
  },
  {
    id: "ejv-ls-3",
    chapter: "ejv-lambdas-streams",
    level: 3,
    question: `为什么方法引用优于 Lambda？有哪些类型的方法引用？`,
    answer:
      `方法引用优于 Lambda 的原因：更简洁、更可读。\`service::execute\` 比 \`() -> service.execute()\` 更短且更清晰——方法引用直接表达了「调用这个方法」的意图，而 Lambda 需要读者自己看出来这是一个方法调用的包装。当 Lambda 体只是调用一个已存在的方法时，就应该用方法引用。四种方法引用类型：①静态方法引用——\`Integer::parseInt\`（等价于 \`s -> Integer.parseInt(s)\`）；②特定对象的实例方法引用——\`System.out::println\`（等价于 \`x -> System.out.println(x)\`）；③特定类型的任意对象的实例方法引用——\`String::length\`（等价于 \`s -> s.length()\`，第一个参数成为接收者）；④构造器引用——\`TreeMap::new\`（等价于 \`() -> new TreeMap()\`）。注意：如果方法引用比 Lambda 更长或更难读（如泛型类型参数需要显式指定），就用 Lambda。\`map.keySet().stream().collect(toList())\` 中的 \`toList()\` 就是方法引用（静态方法引用 \`Collectors::toList\` 的简写）。`,
    tags: ["方法引用", "Lambda"],
  },
  {
    id: "ejv-ls-4",
    chapter: "ejv-lambdas-streams",
    level: 4,
    question: `为什么 Stream 操作应该无副作用？有副作用的 Stream 代码会导致什么问题？`,
    answer:
      `无副作用原则：Stream 操作（特别是 forEach 和 map 中的 Lambda）不应该修改可变状态——包括修改集合元素、修改外部变量、做 I/O 等。有副作用的 Stream 代码的问题：①正确性问题——Stream 的惰性执行意味着中间操作的 Lambda 在终端操作触发前不会执行；如果 Lambda 有副作用（如 \`list.stream().map(x -> { results.add(x); return x; })\`），results 在终端操作前是空的；并行流中副作用导致竞态条件——\`list.parallelStream().forEach(x -> results.add(x))\` 中 results 不是线程安全的，会丢失元素或抛 ConcurrentModificationException。②可读性下降——有副作用的 Stream 代码不如传统循环直观，难以推理执行顺序。③破坏优化——Stream 的惰性和融合优化依赖操作的无副作用性，有副作用的代码阻止了这些优化。正确做法：用 collect 做聚合（\`collect(toList())\` 而非 forEach+add）；用 reduce 做归约；forEach 只用于展示结果（如打印），不用于修改状态。`,
    tags: ["Stream", "副作用", "无状态"],
  },
];
