import type { ReviewQuestion } from "./types";

export const coiReorderArrayQuestions: ReviewQuestion[] = [
  {
    id: "coi-reorder-1",
    chapter: "coi-reorder-array",
    level: 1,
    question: "『调整数组顺序使奇数位于偶数前面』这一问题的主要目标是什么？根据对『稳定性』的要求，通常有哪两类解法？",
    answer:
      "主要目标是将一个整数数组进行重新排列，使得所有的奇数都位于偶数的前面。\n根据是否保留奇数之间、偶数之间的相对顺序（即**稳定性**，Stability），解法通常分为：\n1. **非稳定分区解法**：允许打乱奇数与奇数、偶数与偶数之间的原有相对顺序。可以通过**双指针原位双向扫描**实现，时间复杂度 $O(N)$，空间复杂度 $O(1)$。\n2. **稳定分区解法**：必须保持奇数之间、偶数之间的原有相对顺序。通常需要借助**辅助空间（如额外数组）**或采用特定的稳定划分算法，时间复杂度 $O(N)$，空间复杂度 $O(N)$。",
    tags: ["核心概念", "稳定性"],
  },
  {
    id: "coi-reorder-2",
    chapter: "coi-reorder-array",
    level: 1,
    question: "在非稳定的原位调整中，『相向双指针』方法的基本指针配置是怎样的？",
    answer:
      "『相向双指针』方法初始化两个指针：\n1. **头指针 `left`**：初始化指向数组的第一个元素（索引 `0`），从左向右扫描，用于寻找偶数；\n2. **尾指针 `right`**：初始化指向数组的最后一个元素（索引 `len - 1`），从右向左扫描，用于寻找奇数。\n两指针逐步向中间逼近，直到 `left >= right` 时结束扫描。",
    tags: ["双指针", "算法初始化"],
  },
  {
    id: "coi-reorder-3",
    chapter: "coi-reorder-array",
    level: 2,
    question: "请详细描述『相向双指针』原位调整的扫描与交换机制。什么情况下指针停止？什么情况下发生交换？",
    answer:
      "在每一步循环中：\n1. **左指针 `left` 前进**：如果 `left` 指向奇数（满足 `(array[left] & 1) !== 0`），说明它已经在正确位置，`left` 向右移动，直到指向偶数时停下；\n2. **右指针 `right` 后退**：如果 `right` 指向偶数（满足 `(array[right] & 1) === 0`），说明它已经在正确位置，`right` 向左移动，直到指向奇数时停下；\n3. **条件交换**：如果此时 `left < right`，说明找到了一个左侧的偶数和一个右侧的奇数，将两者进行位置对调，随后 `left++` 并且 `right--` 继续下一轮扫描。\n当 `left >= right` 时，说明所有奇数已被移到偶数左侧，算法终止。",
    tags: ["双指针", "执行过程"],
  },
  {
    id: "coi-reorder-4",
    chapter: "coi-reorder-array",
    level: 2,
    question: "对比『相向双指针』与『快慢双指针』在划分奇偶数时的异同点与适用场景。",
    answer:
      "**相同点**：两者都用于在 $O(N)$ 时间、$O(1)$ 空间内将数组分区（Partition），且都是非稳定的。\n\n**不同点**：\n- **相向双指针**：一个从前往后，一个从后往前。当找到不合规的偶数和奇数时进行对调。它的交换次数较少，通常性能略好，但完全破坏了顺序。\n- **快慢双指针**：两个指针都从前往后移动。慢指针 `slow` 维护已处理的奇数边界，快指针 `fast` 寻找奇数。当 `fast` 扫到奇数时，与 `slow` 指向的元素交换，然后 `slow` 递增。其结构与快速排序的单向 Partition 一致。它同样是不稳定的，但适用于单向链表的分区（因为链表无法反向遍历）。",
    tags: ["算法对比", "相向双指针", "快慢双指针"],
  },
  {
    id: "coi-reorder-5",
    chapter: "coi-reorder-array",
    level: 2,
    question: "如果题目要求『稳定划分』（保留奇数与奇数、偶数与偶数之间的相对顺序），为什么原位的相向/快慢双指针均无法满足？",
    answer:
      "因为这两种原位算法在进行元素对调时，其物理跨度是任意的：\n- **相向双指针** 会直接跨越中间的多个元素，将极左端的偶数与极右端的奇数交换，这必然破坏它们与夹在中间的其他同类元素的相对顺序；\n- **快慢双指针** 也会将快指针找到的奇数，直接扔到慢指针（指向的偶数）处，同样会使跨度内的其他偶数相对顺序错乱。\n要在 $O(N)$ 时间内保证稳定性，通常需要以空间换时间，将奇数和偶数分别提取到两个独立的辅助容器中，最后拼接输出；或者在原位使用类似归并排序的分治策略（需要 $O(N \log N)$ 时间）。",
    tags: ["稳定性", "局限性分析"],
  },
  {
    id: "coi-reorder-6",
    chapter: "coi-reorder-array",
    level: 2,
    question: "对于调整数组顺序问题，有哪些关键的边界和角落情况（Corner Cases）需要特殊验证？",
    answer:
      "需要考虑并验证以下角落情况以保证代码鲁棒性：\n1. **输入数组为空或长度为 1**：无需任何调整，直接返回原数组；\n2. **数组全为奇数或全为偶数**：指针扫描时，一个指针会一路走到底，需要确保不会发生索引越界错误；\n3. **数组已按奇前偶后排好序**（例如 `[1, 3, 5, 2, 4]`）：指针扫描时不应发生任何不必要的交换操作，且能正常退出；\n4. **奇偶交替或偶前奇后的数组**（例如 `[2, 4, 1, 3]`）：必须正确完成所有匹配交换。",
    tags: ["边界条件", "鲁棒性"],
  },
  {
    id: "coi-reorder-7",
    chapter: "coi-reorder-array",
    level: 3,
    question: "请给出在 TS 中实现原位相向双指针调整数组顺序的完整函数实现，并说明如何通过位运算优化奇偶判断。",
    answer:
      "```typescript\nfunction reorderArray(nums: number[]): number[] {\n  if (!nums || nums.length <= 1) return nums;\n\n  let left = 0;\n  let right = nums.length - 1;\n\n  while (left < right) {\n    // 从左往右找偶数。使用位运算 (val & 1) === 0 判断是否为偶数\n    // 必须加上 left < right 条件防止越界\n    while (left < right && (nums[left] & 1) !== 0) {\n      left++;\n    }\n    // 从右往左找奇数。使用位运算 (val & 1) !== 0 判断是否为奇数\n    while (left < right && (nums[right] & 1) === 0) {\n      right--;\n    }\n\n    if (left < right) {\n      // 交换左右指针指向的元素\n      const temp = nums[left];\n      nums[left] = nums[right];\n      nums[right] = temp;\n      left++;\n      right--;\n    }\n  }\n  return nums;\n}\n```\n**位运算优化**：相比 `nums[i] % 2 === 0`，使用 `(nums[i] & 1) === 0` 可以直接判断整数的二进制最低位。由于计算机中偶数的最低位必为 0，奇数必为 1，直接进行按位与操作不依赖除法器，因此执行效率更高。",
    tags: ["代码实现", "TypeScript", "位运算"],
  },
  {
    id: "coi-reorder-8",
    chapter: "coi-reorder-array",
    level: 3,
    question: "在实现相向双指针扫描时，极易写出死循环或索引越界的 bug，应该如何防范？",
    answer:
      "主要有以下两条防范规则：\n1. **嵌套循环越界防护**：在内部移动 `left` 或 `right` 指针的 `while` 循环里，**必须再次检查 `left < right`**。例如 `while (left < right && isOdd(nums[left]))`。如果不加限制，当数组全为奇数时，`left` 会一路自增超出数组的最大边界，导致空指针或数组越界错误。\n2. **死循环防护**：在发生交换后，必须手动使 `left` 递增且 `right` 递减（即 `left++; right--;`）。如果遗漏了这一步，当遇到 `nums[left]` 为偶数且 `nums[right]` 为奇数时，完成交换后两者性质互换，但因为指针没变，下一轮循环会重复判定并交换同一对数字，从而陷入死循环。",
    tags: ["易错点", "越界防护", "死循环"],
  },
  {
    id: "coi-reorder-9",
    chapter: "coi-reorder-array",
    level: 4,
    question: "请实现一个 TS 函数，能够以 $O(N)$ 时间复杂度、并且在保证『稳定性』的前提下调整数组顺序。并分析其空间复杂度。",
    answer:
      "```typescript\nfunction reorderArrayStable(nums: number[]): number[] {\n  if (!nums || nums.length <= 1) return nums;\n\n  const odds: number[] = [];\n  const evens: number[] = [];\n\n  // 单次遍历，按顺序收集奇数和偶数\n  for (const num of nums) {\n    if ((num & 1) !== 0) {\n      odds.push(num);\n    } else {\n      evens.push(num);\n    }\n  }\n\n  // 合并回原数组或返回新数组\n  return odds.concat(evens);\n}\n```\n**复杂度分析**：\n- **时间复杂度**：$O(N)$。仅对原数组进行了一次线性扫描，以及一次合并拷贝操作。\n- **空间复杂度**：$O(N)$。由于创建了额外的 `odds` 和 `evens` 数组来分别暂存奇数和偶数，其占用的总辅助空间与输入数组的长度 $N$ 呈线性关系。",
    tags: ["稳定性", "代码实现", "空间换时间"],
  },
  {
    id: "coi-reorder-10",
    chapter: "coi-reorder-array",
    level: 4,
    question: "是否可以通过重写数组的排序比较器（如 C++ 中的 `std::stable_sort` 或 TS 中的 `Array.prototype.sort`）来一行实现稳定的奇偶排序？这在实际工程中有什么利弊？",
    answer:
      "可以通过将奇数视为“较小”、偶数视为“较大”的自定义比较规则来实现。例如在 C++ 中：\n```cpp\nstd::stable_sort(nums.begin(), nums.end(), [](int a, int b) {\n    return (a & 1) > (b & 1); // 奇数返回 true（排前面）\n});\n```\n**利**：\n- 代码极其简洁，利用了语言标准库的高度优化实现；\n- `stable_sort` 保证了原有的相对顺序不变。\n\n**弊**：\n- **时间复杂度劣化**：标准稳定排序算法（如归并排序或 TimSort）的时间复杂度为 $O(N \log N)$，而专门的稳定划分（使用辅助空间）可以在 $O(N)$ 内完成。\n- **空间开销**：`stable_sort` 内部仍然需要 $O(N)$ 的辅助内存空间。在有性能瓶颈的工业场景下，对于线性可分问题使用 $O(N \log N)$ 的排序会造成不必要的 CPU 开销。",
    tags: ["自定义排序", "标准库", "算法开销"],
  },
];
