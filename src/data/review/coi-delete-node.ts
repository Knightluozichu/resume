import type { ReviewQuestion } from "./types";

export const coiDeleteNodeQuestions: ReviewQuestion[] = [
  {
    id: "coi-dn-1",
    chapter: "coi-delete-node",
    level: 1,
    question: `在只给定单向链表中某个待删除节点指针 \`node\` 时，如何以 $O(1)$ 的时间复杂度将其删除？其核心思路是什么？`,
    answer:
      `其核心思路是**『值复制法』**（偷梁换柱）。因为是单向链表且没有给头节点指针，我们无法直接获取待删除节点的前驱节点，也就无法直接将前驱指向后继。但我们可以把待删除节点的后继节点（\`node.next\`）的值复制到当前节点中，然后让当前节点的 \`next\` 指向后继节点的后继节点（\`node.next.next\`）。这样在物理上其实删除的是原来的后继节点，但在逻辑上相当于删除了当前节点，从而绕过了对前驱节点的寻找。`,
    tags: ["核心思路", "链表特性"],
  },
  {
    id: "coi-dn-2",
    chapter: "coi-delete-node",
    level: 1,
    question: `使用『值复制法』以 $O(1)$ 时间复杂度删除链表节点时，有哪些局限性和边界条件？`,
    answer:
      `主要有以下三个局限性和边界条件：\n1. **待删除节点是尾节点**：由于尾节点没有后继节点，我们无法复制后继节点的值。此时必须回退为传统方法，从头节点开始遍历找到该节点的前驱节点并完成删除，时间复杂度为 $O(n)$；\n2. **链表只有一个节点（既是头又是尾）**：若删除此节点，需将链表的头指针置为 \`null\`；\n3. **安全性限制**：如果待删除节点的指针在外部其他地方仍被引用，值复制改变了节点的值，可能会导致外部引用逻辑混乱。此外，若要被删的节点是其他地方持有的“唯一性标识”节点，复制值也会带来语义问题。`,
    tags: ["边界条件", "局限性"],
  },
  {
    id: "coi-dn-3",
    chapter: "coi-delete-node",
    level: 2,
    question: `既然删除尾节点需要 $O(n)$ 时间，为什么我们仍宣称该方法的平均时间复杂度是 $O(1)$？`,
    answer:
      `这可以通过**『摊还分析』（Amortized Analysis）**来证明。假设单向链表长度为 $n$，我们在已知节点指针的前提下随机删除其中任意一个节点。其中，有 $n-1$ 个节点是非尾节点，可以通过值复制法在 $O(1)$ 时间内删除；只有 1 个尾节点需要从头遍历，耗费 $O(n)$ 时间。因此，平均时间复杂度为：\n$$\\frac{(n-1) \\times O(1) + 1 \\times O(n)}{n} = O(1)$$\n由于摊销后每次操作的平均开销是常数级别，所以平均时间复杂度仍然是 $O(1)$。`,
    tags: ["时间复杂度", "摊还分析"],
  },
  {
    id: "coi-dn-4",
    chapter: "coi-delete-node",
    level: 2,
    question: `在删除链表重复节点的问题中，为什么引入『哨兵虚拟头节点（Sentinel Dummy Node）』非常关键？`,
    answer:
      `在删除链表重复节点（特别是彻底删除重复节点，如 \`1->1->2\` 变成 \`2\`）时，**头节点本身可能就是重复的且需要被删除**。如果没有虚拟头节点，我们需要写大量的条件分支来特殊处理头节点被删除、重新指定头节点以及链表变为空等边界情况。引入哨兵虚拟头节点（其 \`next\` 指向原头节点）后，原本的头节点就变成了哨兵的后继节点，使得**所有节点的删除操作逻辑完全一致**，即通过修改前驱节点的 \`next\` 指针实现，从而大大简化了代码结构，避免了指针悬空与空指针解引用错误。`,
    tags: ["哨兵节点", "边界处理"],
  },
  {
    id: "coi-dn-5",
    chapter: "coi-delete-node",
    level: 2,
    question: `在 C++ 手动内存管理与 JS/TS 自动垃圾回收（GC）中，执行链表节点删除在内存层面有何不同？`,
    answer:
      `主要区别在内存释放的责任上：\n- **C++**：使用 \`new\` 分配的链表节点必须手动 \`delete\`。当用『值复制法』删除节点时，我们把 \`node->next\` 的内容复制给 \`node\`，并将 \`node->next\` 指向 \`next->next\`。此时，原来的 \`node->next\` 节点在链表中已经脱落，如果不调用 \`delete nextNode\`，该节点占用的内存就会发生泄漏（Memory Leak）；\n- **JS/TS**：依靠垃圾回收器。当我们将节点在链表中脱开且外部没有任何变量引用它时，该节点就变成了不可达对象。垃圾回收器（如 V8 的 GC）会自动检测并释放其内存，开发者无需手动干预。`,
    tags: ["内存管理", "C++", "JavaScript"],
  },
  {
    id: "coi-dn-6",
    chapter: "coi-delete-node",
    level: 2,
    question: `为什么在双向链表（Doubly Linked List）中，删除给定的任意节点天生就能做到真正的全场景 $O(1)$ 时间复杂度？`,
    answer:
      `因为在双向链表中，每个节点都保存了指向前驱的 \`prev\` 和指向后继的 \`next\` 指针。这意味着，对于给定的任意待删除节点 \`node\`，我们不需要头节点指针，就可以直接通过 \`node->prev\` 获取它的前驱节点，也可以通过 \`node->next\` 获取它的后继节点。删除时，只需将 \`node->prev->next\` 指向 \`node->next\`，并将 \`node->next->prev\` 指向 \`node->prev\` 即可（注意判断边界，如头/尾节点）。这一过程仅涉及常数个指针指向的修改，不需要进行任何遍历，因此能做到真正的全场景 $O(1)$。`,
    tags: ["双向链表", "链表特性"],
  },
  {
    id: "coi-dn-7",
    chapter: "coi-delete-node",
    level: 3,
    question: `在一个已排序的单向链表中彻底删除所有重复节点（如 \`1->2->2->3\` 变为 \`1->3\`），其最优的时间和空间复杂度是多少？`,
    answer:
      `最优的**时间复杂度为 $O(n)$，空间复杂度为 $O(1)$**。由于链表已经排好序，所有具有相同数值的重复节点在物理上必然是相邻的。我们可以使用双指针（\`pre\` 和 \`cur\`）对链表进行一次正向遍历：\n- \`cur\` 负责扫描和跳过连续相同值的节点区间；\n- \`pre\` 负责重新连接那些不重复的节点（即指向下一个不重复的节点）。\n因为只对链表进行了一次线性扫描，且仅使用了若干个指针变量，故能实现 $O(n)$ 时间和 $O(1)$ 辅助空间。`,
    tags: ["时间复杂度", "空间复杂度", "双指针"],
  },
  {
    id: "coi-dn-8",
    chapter: "coi-delete-node",
    level: 3,
    question: `对于一个无序的单向链表，如果需要去重（保留重复节点的第一个，如 \`3->1->3->2\` 变为 \`3->1->2\`），通常有两种什么折中策略？`,
    answer:
      `针对无序链表去重，通常可以在时空复杂度之间做以下折中选择：\n1. **时间优先（哈希表法）**：使用一个哈希集合（\`Set\`）存储已遍历过的节点值。遍历链表时，如果当前节点的值在集合中已存在，则将该节点删除；否则将其值存入集合。时间复杂度为 $O(n)$，空间复杂度为 $O(n)$。\n2. **空间优先（双重循环法）**：外层循环遍历每个节点，内层循环从外层节点的下一个节点开始向后搜索，删除所有值与外层节点相同的后续节点。时间复杂度为 $O(n^2)$，空间复杂度为 $O(1)$。`,
    tags: ["无序去重", "哈希表", "双重循环"],
  },
  {
    id: "coi-dn-9",
    chapter: "coi-delete-node",
    level: 4,
    question: `请给出在 TypeScript 中实现 $O(1)$ 删除链表指定节点的函数代码，并妥善处理尾节点等边界条件。`,
    answer:
      `\`\`\`typescript\nclass ListNode {\n  val: number;\n  next: ListNode | null = null;\n  constructor(val: number) { this.val = val; }\n}\n\nfunction deleteNode(head: ListNode | null, toBeDeleted: ListNode | null): ListNode | null {\n  if (!head || !toBeDeleted) return head;\n\n  // 1. 待删除节点不是尾节点：使用 O(1) 的值复制法\n  if (toBeDeleted.next !== null) {\n    const nextNode = toBeDeleted.next;\n    toBeDeleted.val = nextNode.val;\n    toBeDeleted.next = nextNode.next;\n    nextNode.next = null; // 断开旧连接\n  } \n  // 2. 链表只有一个节点，且该节点即为待删除节点\n  else if (head === toBeDeleted) {\n    head = null;\n  } \n  // 3. 待删除节点是尾节点且链表有多个节点：退化为 O(n) 的前驱搜索\n  else {\n    let curr = head;\n    while (curr.next !== null && curr.next !== toBeDeleted) {\n      curr = curr.next;\n    }\n    if (curr.next === toBeDeleted) {\n      curr.next = null;\n    }\n  }\n  return head;\n}\n\`\`\``,
    tags: ["代码实现", "TypeScript", "双指针"],
  },
  {
    id: "coi-dn-10",
    chapter: "coi-delete-node",
    level: 4,
    question: `请给出在 TypeScript 中彻底删除已排序链表中所有重复节点（不保留任何重复值，如 \`1->2->2->3\` 变为 \`1->3\`）的完整实现，并使用哨兵节点处理头节点被删除的情形。`,
    answer:
      `\`\`\`typescript\nfunction deleteDuplication(head: ListNode | null): ListNode | null {\n  if (!head) return null;\n\n  // 引入哨兵虚拟头节点\n  const dummy = new ListNode(-1);\n  dummy.next = head;\n\n  let pre = dummy;\n  let cur = head;\n\n  while (cur !== null) {\n    // 判断当前节点是否与其后继节点值相同\n    if (cur.next !== null && cur.val === cur.next.val) {\n      const duplicateVal = cur.val;\n      // 循环跳过所有值等于 duplicateVal 的节点\n      while (cur !== null && cur.val === duplicateVal) {\n        cur = cur.next;\n      }\n      // 将前驱节点的 next 指向第一个不重复的节点\n      pre.next = cur;\n    } else {\n      // 当前节点没有重复，pre 和 cur 同步后移\n      pre = cur;\n      cur = cur.next;\n    }\n  }\n\n  return dummy.next;\n}\n\`\`\``,
    tags: ["代码实现", "TypeScript", "排序链表去重"],
  },
];
