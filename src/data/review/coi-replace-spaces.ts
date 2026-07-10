import type { ReviewQuestion } from "./types";

export const coiReplaceSpacesQuestions: ReviewQuestion[] = [
  {
    id: "coi-rs-1",
    chapter: "coi-replace-spaces",
    level: 1,
    question: `替换空格（面试题5）解决的核心问题和优化思路是什么？`,
    answer:
      `核心问题是把字符串中的空格替换为转义字符 '%20'。优化思路是将传统的从前往后移动字符（O(n^2) 复杂度）优化为从后往前的逆序双指针复制（O(n) 复杂度），彻底避免字符的多次重复搬运与重叠覆盖冲突。`,
    tags: ["核心直觉", "双指针"],
  },
  {
    id: "coi-rs-2",
    chapter: "coi-replace-spaces",
    level: 1,
    question: `在 C++ 原地替换空格算法中，原字符串被扩容后的新长度计算公式是什么？`,
    answer:
      `新长度为 \`originalLength + spaceCount * 2\`。因为每个原空格 ' '（占 1 字符）被替换为 '%20'（占 3 字符），长度净增 2 个字符位置，因此需要乘以 2 而非 3。`,
    tags: ["扩容计算", "内存布局"],
  },
  {
    id: "coi-rs-3",
    chapter: "coi-replace-spaces",
    level: 1,
    question: `原地替换空格算法的最坏时间复杂度和空间复杂度分别是多少？`,
    answer:
      `时间复杂度为 O(n)，因为每个字符最多只需读取和移动两次。空间复杂度为 O(1)，如果在原字符串上进行原地修改，只需要常数级别的辅助变量指针，不需要分配额外空间。`,
    tags: ["时间复杂度", "空间复杂度"],
  },
  {
    id: "coi-rs-4",
    chapter: "coi-replace-spaces",
    level: 2,
    question: `双指针 P1 和 P2 分别初始化指向什么位置？复制的推进方向是怎样的？`,
    answer:
      `P1 初始化指向原字符串的末尾（即扩容前的最后一个字符），P2 初始化指向扩容后的新末尾。复制推进方向是从后往前（自右向左），以保证在写入新元素时不会覆盖 P1 尚未读取的有效源数据。`,
    tags: ["指针定位", "复制顺序"],
  },
  {
    id: "coi-rs-5",
    chapter: "coi-replace-spaces",
    level: 2,
    question: `当 P1 扫描到空格字符时，双指针 P1 和 P2 应该如何移动和写入？`,
    answer:
      `当 P1 遇到空格时，P2 处需要依次向前写入字符 '0'、'2'、'%'（即逆序写入 '%20'）。写入完成后，P1 向左移动 1 格，P2 向左移动 3 格，以便留出下一次写入的空位。`,
    tags: ["填充逻辑", "指针控制"],
  },
  {
    id: "coi-rs-6",
    chapter: "coi-replace-spaces",
    level: 2,
    question: `为什么在 JS/TS 中无法实现底层的『原地修改』？在 TS 中如何模拟该算法的核心思想？`,
    answer:
      `因为 JavaScript/TypeScript 中的字符串是不可变的（Immutable），任何对字符串的修改都会产生新的字符串。在 TS 中，我们通常将字符串转成字符数组（\`split('')\`），建立一个新长度的空数组，然后同样用双指针 P1 和 P2 从后往前填充新数组，最后使用 \`join('')\` 组合成新字符串来模拟原地复制的逻辑。`,
    tags: ["语言特性", "数据结构"],
  },
  {
    id: "coi-rs-7",
    chapter: "coi-replace-spaces",
    level: 3,
    question: `请写出包含完整边界防护的原位替换空格算法 C++ 核心代码。`,
    answer:
      `\`\`\`cpp\nvoid replaceSpace(string& s) {\n  if (s.empty()) return;\n  int oldLen = s.length(), spaces = 0;\n  for (char c : s) if (c == ' ') spaces++;\n  s.resize(oldLen + spaces * 2);\n  int p1 = oldLen - 1, p2 = s.length() - 1;\n  while (p1 >= 0 && p2 > p1) {\n    if (s[p1] == ' ') {\n      s[p2--] = '0'; s[p2--] = '2'; s[p2--] = '%';\n    } else {\n      s[p2--] = s[p1];\n    }\n    p1--;\n  }\n}\n\`\`\``,
    tags: ["代码实现", "C++"],
  },
  {
    id: "coi-rs-8",
    chapter: "coi-replace-spaces",
    level: 3,
    question: `双指针原位替换算法的循环终止条件为什么可以写为 \`p2 > p1\` 而不仅仅是 \`p1 >= 0\`？这是一种什么样的优化？`,
    answer:
      `这是一种『剪枝优化』。当双指针 P1 和 P2 重合（\`p1 == p2\`）时，说明前面已经没有空格需要进行替换了。此时 P1 前面的所有剩余字符在复制时都会被复制到它自己当前所在的原位置，属于无意义的自我拷贝。通过限制 \`p2 > p1\`，可以让算法在前面的空格都替换完毕时提前退出，减少不必要的字符复制操作。`,
    tags: ["剪枝优化", "指针重合"],
  },
  {
    id: "coi-rs-9",
    chapter: "coi-replace-spaces",
    level: 4,
    question: `如果把空格替换成 '%20' 的操作改为『在字符串中删除所有的空格』，同样要求原地修改，应该如何使用双指针进行 O(n) 时间复杂度的实现？`,
    answer:
      `可以使用『快慢双指针（同向移动）』。快指针 \`fast\` 负责从左往右遍历整个原字符串，慢指针 \`slow\` 负责记录非空格字符的写入位置。从前往后遍历：若 \`s[fast]\` 不是空格，则 \`s[slow] = s[fast]\` 并 \`slow++\`；若是空格则快指针继续前进。遍历完成后，将字符串大小缩小（resize）为 \`slow\` 的长度即可。`,
    tags: ["双指针", "算法变体"],
  },
  {
    id: "coi-rs-10",
    chapter: "coi-replace-spaces",
    level: 4,
    question: `如果有两个有序的数组 A1 和 A2，A1 末尾有足够空闲空间容纳 A2，要求原地合并这两个数组且保持有序。这个场景与本题的替换空格有什么相通之处？`,
    answer:
      `这两个场景的核心思想完全一致：在有限的原空间进行带扩容的修改时，如果从前往后操作，合并/插入新元素会导致后面已有元素被频繁向后移动，退化为 O(n^2) 复杂度且存在覆盖冲突。而如果先计算好最终合并后的总长度，利用双指针从后往前比较并移动放置元素，就可以在 O(n) 复杂度内实现零碰撞的原地安全合并。`,
    tags: ["合并数组", "逆序思路"],
  },
];
