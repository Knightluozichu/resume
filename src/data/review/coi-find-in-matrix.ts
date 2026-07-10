import type { ReviewQuestion } from "./types";

export const coiFindInMatrixQuestions: ReviewQuestion[] = [
  {
    id: "coi-fim-1",
    chapter: "coi-find-in-matrix",
    level: 1,
    question: `二维数组中的查找（面试题4）解决的核心问题和直觉模型是什么？`,
    answer:
      `核心问题是在行列递增的二维数组中判断目标值是否存在。直觉模型是『鞍点消去法』，通过定位同时具备最大和最小单调特性的拐角（右上角或左下角），每一步比较都能排除一行或一列。`,
    tags: ["核心直觉", "双指针"],
  },
  {
    id: "coi-fim-2",
    chapter: "coi-find-in-matrix",
    level: 1,
    question: `进行二维数组查找时，为什么不能从左上角或右下角开始查找？`,
    answer:
      `左上角是全局最小值，若目标值大于左上角，向右和向下都会使值变大，产生查找分叉；同理，右下角是最大值，目标值小时向左和向上都会变小。而右上角和左下角一侧变大、另一侧变小，无二义性。`,
    tags: ["寻找起点", "单调性"],
  },
  {
    id: "coi-fim-3",
    chapter: "coi-find-in-matrix",
    level: 1,
    question:
      `在 M x N 的有序矩阵中，使用边界消去法进行查找的最坏时间复杂度和空间复杂度是多少？`,
    answer:
      `时间复杂度为 O(M + N)，因为每次比较最少可以排除一行或一列，指针最多移动 M + N 次。空间复杂度为 O(1)，只需维护两个指针坐标，不需要额外内存。`,
    tags: ["时间复杂度", "空间复杂度"],
  },
  {
    id: "coi-fim-4",
    chapter: "coi-find-in-matrix",
    level: 2,
    question:
      `如何用右上角元素 (row, col) 的大小关系来缩减查找范围？写出具体的比较逻辑。`,
    answer:
      `设当前格为 num = matrix[row][col]：若 num > target，因当前列下方都比 num 大，故 target 不在当前列，排除当前列（col--）；若 num < target，因当前行左侧都比 num 小，排除当前行（row++）；相等则命中。`,
    tags: ["决策规则", "双指针"],
  },
  {
    id: "coi-fim-5",
    chapter: "coi-find-in-matrix",
    level: 2,
    question: `在编写二维数组查找算法时，最容易遗漏的致命边界情况是什么？`,
    answer:
      `输入矩阵为空（如 matrix 为空数组）或矩阵内无元素（如 matrix[0] 为空数组）。如果直接读取 matrix[0].length 或访问 matrix[0][cols-1]，会导致空指针异常或数组越界崩溃。`,
    tags: ["边界条件", "鲁棒性"],
  },
  {
    id: "coi-fim-6",
    chapter: "coi-find-in-matrix",
    level: 3,
    question:
      `如何严密地证明右上角『边界消去法』的正确性，确保不会漏掉目标值？`,
    answer:
      `使用区间不变式：在任何一步，未搜索区域始终是一个子矩阵 matrix[row..rows-1][0..col]。当比较 matrix[row][col] 与 target 时，若 > 则排除列 col（此列剩余元素均大于 target），若 < 则排除行 row（此行剩余元素均小于 target）。因此排除的行 and 列绝对不可能包含目标值，保证了查找的完备性。`,
    tags: ["正确性证明", "区间不变式"],
  },
  {
    id: "coi-fim-7",
    chapter: "coi-find-in-matrix",
    level: 3,
    question: `如果面试官要求从矩阵中心点开始进行查找，会发生什么情况？`,
    answer:
      `如果目标值大于中心点，只能排除左上象限（元素都比中心小），但右上、左下、右下三个象限都可能包含目标值。此时算法无法实现一维的行/列消去，必须进行多路分治或递归，编写极其复杂且难以实现 O(M+N) 复杂度。`,
    tags: ["中心查找", "分治陷阱"],
  },
  {
    id: "coi-fim-8",
    chapter: "coi-find-in-matrix",
    level: 3,
    question:
      `请写出包含完整边界防护的『二维数组查找』核心 TypeScript 函数代码。`,
    answer:
      `function find(matrix: number[][], target: number): boolean {\n  if (!matrix || !matrix.length || !matrix[0].length) return false;\n  let r = 0, c = matrix[0].length - 1;\n  while (r < matrix.length && c >= 0) {\n    const v = matrix[r][c];\n    if (v === target) return true;\n    else if (v > target) c--;\n    else r++;\n  }\n  return false;\n}`,
    tags: ["代码实现", "TypeScript"],
  },
  {
    id: "coi-fim-9",
    chapter: "coi-find-in-matrix",
    level: 4,
    question:
      `如果一个二维数组满足：每一行从左到右递增，且每一行的第一个数大于上一行的最后一个数，与本题的矩阵查找有什么区别？`,
    answer:
      `如果行与行之间也完全单调，整个矩阵在逻辑上等价于一个一维有序数组。此时应使用二分查找，将一维索引 mid 映射为二维坐标 (mid / cols, mid % cols)，时间复杂度可降低至 O(log(M * N))。而本题每行和每列独立单调，无法做全局二分。`,
    tags: ["二分查找", "矩阵变体"],
  },
  {
    id: "coi-fim-10",
    chapter: "coi-find-in-matrix",
    level: 4,
    question:
      `对于仅行列分别递增的 N x N 矩阵，双指针 O(N) 是下界吗？是否存在其他优化手段？`,
    answer:
      `对于行列分别有序的矩阵，最坏情况下查找的时间复杂度下界确实是 O(N)（因为可能需要扫描对角线附近元素）。但在特殊场景（如 M 远大于 N）下，可以通过在每一行内部进行二分查找来加速，其时间复杂度为 O(N log M)，效率会高于 O(M+N)。`,
    tags: ["算法下界", "混合查找"],
  },
];
