import type { ReviewQuestion } from "./types";

/** 字典与集合 复习题 */
export const flpDictSetsQuestions: ReviewQuestion[] = [
  {
    id: "flp-dict-sets-1",
    chapter: "flp-dict-sets",
    level: 1,
    question: "字典和集合在底层实现上有什么共同点？为什么它们的查找都是 O(1) 均摊？",
    answer:
      "字典（dict）和集合（set）底层都是**哈希表**。字典存键值对，集合相当于「只有键、值为占位」的字典。\n\n查找 O(1) 均摊的原因：访问 `d[k]` 或 `k in s` 时，先对 key 求 `hash(k)`，再对桶数取模直接定位到目标桶，无需逐个比较。只要哈希函数质量好、装填因子（元素数/桶数）控制在阈值以下，冲突很少，定位+探测的步数是常数级，故均摊 O(1)。\n\n「均摊」是因为偶尔扩容（rehash 全部元素）是 O(n)，但平摊到 n 次操作后单次仍为 O(1)。",
    tags: ["哈希表", "字典", "集合", "O(1)"],
  },
  {
    id: "flp-dict-sets-2",
    chapter: "flp-dict-sets",
    level: 2,
    question: "为什么字典的键必须是「可哈希」对象？list 不能做键而 tuple 能，根本原因是什么？",
    answer:
      "字典靠 `hash(key)` 定位桶、靠 `key == other` 处理冲突。可哈希对象的哈希值在其生命周期内必须不变，且 `a == b` 蕴含 `hash(a) == hash(b)`。否则键存进去后哈希变了，就再也找不到它——哈希表的不变量被破坏。\n\nlist 不可哈希的根本原因：list 是可变对象，内容可变→哈希值会变，所以 Python 把 `list.__hash__` 设为 `None`，禁止做键。\n\ntuple 可哈希的前提是其元素也都可哈希：tuple 本身不可变，`hash((1,2))` 稳定；但 `t = ([1],)` 内含 list，`hash(t)` 会抛 `TypeError`，因为元素 list 不可哈希。所以「可哈希」要求对象不可变且元素也可哈希——这是递归的。",
    tags: ["可哈希", "字典键", "tuple", "可变对象"],
  },
  {
    id: "flp-dict-sets-3",
    chapter: "flp-dict-sets",
    level: 3,
    question: "请说明 `dict.setdefault` 与 `collections.defaultdict` 各自解决什么问题，并写出用 `defaultdict(list)` 分组列表的代码。",
    answer:
      "`dict.setdefault(key, default)`：访问键不存在时，把 `default` 存入字典并返回，避免「先 in 判断再赋值」的两次哈希查找。但每次调用都要构造 default 值（即使键已存在），且写法仍显啰嗦。\n\n`collections.defaultdict`：在创建时传入工厂函数（如 `list`、`int`），访问缺失键时自动调用工厂生成默认值并存入。语义更清晰，适合分组、计数等场景。\n\n分组代码：\n```python\nfrom collections import defaultdict\npairs = [('a', 1), ('b', 2), ('a', 3)]\ngrouped = defaultdict(list)\nfor k, v in pairs:\n    grouped[k].append(v)   # 缺失键自动创建空 list\n# grouped == {'a': [1, 3], 'b': [2]}\n```\n\n如果用普通 dict：`grouped = {}; for k,v in pairs: grouped.setdefault(k, []).append(v)`，功能等价但可读性差。`defaultdict` 的工厂只在缺失时触发，比 `setdefault` 每次都构造默认值更高效（尤其默认值构造昂贵时）。",
    tags: ["setdefault", "defaultdict", "分组", "工厂函数"],
  },
  {
    id: "flp-dict-sets-4",
    chapter: "flp-dict-sets",
    level: 4,
    question: "Python 3.7 起字典保证插入顺序。这一保证在实现上如何做到？它和「字典是哈希表」矛盾吗？请综合分析其代价与收益。",
    answer:
      "实现方式：Python 3.6+ 的 dict 采用「紧凑哈希表」——用两个数组：一个稀疏的索引数组（按哈希定位桶，存指向 entries 的下标），一个紧凑的 entries 数组按**插入顺序**存放键值对。哈希定位后通过索引数组跳到 entries 数组的对应项，而 entries 数组保持插入顺序，所以遍历时按插入顺序输出。\n\n不矛盾：哈希表负责 O(1) 定位（通过索引数组），entries 数组负责保序。两者各司其职，定位仍是哈希查找，遍历则沿 entries 数组顺序。\n\n代价：\n1. 多维护一个 entries 数组和一个索引数组，结构比纯开放寻址略复杂。\n2. 删除键时为保序采用「墓碑标记」而非立即压缩，长期增删可能留空洞，需在扩容时清理。\n\n收益：\n1. 可预测的迭代顺序，序列化（JSON）稳定，便于测试和调试。\n2. 内存比旧实现少约 20%（entries 紧凑存放，索引数组用更窄的整型）。\n3. 让 dict 能兼任有序映射，减少对 `OrderedDict` 的依赖（除非需要 `move_to_end` 等额外操作）。\n\n所以这是用一点实现复杂度换来了保序、省内存、可预测三重收益，是 Python 3.6+ 的重要优化。",
    tags: ["插入顺序", "紧凑哈希表", "实现", "代价收益"],
  },
];
