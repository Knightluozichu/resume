import { ReviewQuestion } from "../types";

export const twsArraysHashQuestions: ReviewQuestion[] = [
  {
    id: "tws-arrays-hash-1",
    chapter: "tws-arrays-hash",
    level: 1,
    question: "Stone 中如何创建和访问数组？数组底层用什么实现？",
    answer:
      "创建数组用方括号语法：`a = [10, 20, 30]`。访问元素用整数索引：`a[0]` 返回 10。修改元素：`a[1] = 99`。数组底层用 Java 的 ArrayList<Object> 实现，有序、可变长度。数组元素可以是任意 Stone 值（Integer、String、Function、StoneObject 等），支持混合类型存储。索引从 0 开始，越界访问抛出运行时异常。",
    tags: ["数组", "ArrayList", "索引访问", "创建"],
  },
  {
    id: "tws-arrays-hash-2",
    chapter: "tws-arrays-hash",
    level: 2,
    question: "Stone 中如何创建和访问哈希表？哈希表底层用什么实现？",
    answer:
      "创建哈希表用花括号语法：`h = {\"name\": \"Stone\", \"ver\": 1}`，键和值用冒号分隔。访问值用方括号加键：`h[\"name\"]` 返回 \"Stone\"。新增键值对：`h[\"x\"] = 99`。哈希表底层用 Java 的 HashMap<Object, Object> 实现，键可以是任意类型（通常用 String），值也可以是任意类型。哈希表是无序的键值映射，平均查找复杂度 O(1)。",
    tags: ["哈希表", "HashMap", "键值对", "创建"],
  },
  {
    id: "tws-arrays-hash-3",
    chapter: "tws-arrays-hash",
    level: 3,
    question: "索引表达式 `a[i]` 在 AST 中如何表示？求值器如何处理数组索引和哈希索引？",
    answer:
      "索引表达式在 AST 中表示为 IndexExpr 节点，包含两个子节点：目标表达式（a）和索引表达式（i）。求值器处理 IndexExpr 的流程：①递归求值目标表达式得到集合对象 ②递归求值索引表达式得到索引值 ③用 instanceof 判断集合对象类型：如果是 ArrayList 则用整数索引调用 get/put；如果是 HashMap 则用键对象调用 get/put ④类型不匹配（如用字符串索引数组）抛出异常。Array 和 Hash 共用同一种语法 `a[i]`，通过运行时类型分发到不同操作。",
    tags: ["IndexExpr", "索引表达式", "类型分发", "求值"],
  },
  {
    id: "tws-arrays-hash-4",
    chapter: "tws-arrays-hash",
    level: 2,
    question: "数组和哈希表在索引类型、有序性、底层实现上有什么区别？",
    answer:
      "三方面区别：①索引类型——数组用整数索引（从 0 开始），哈希表用任意类型键（通常 String）②有序性——数组有序（按插入顺序存储），哈希表无序（基于 hash 函数定位）③底层实现——数组用 ArrayList<Object>（基于动态数组，O(1) 随机访问），哈希表用 HashMap<Object, Object>（基于哈希桶，O(1) 平均查找）。两者都用 `[]` 语法访问，但语义不同——数组是位置访问，哈希表是键查找。",
    tags: ["数组vs哈希", "索引类型", "有序性", "底层实现"],
  },
];
