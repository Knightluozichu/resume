import type { ReviewQuestion } from "./types";

export const coiSpiralMatrixQuestions: ReviewQuestion[] = [
  {
    id: "coi-sm-1",
    chapter: "coi-spiral-matrix",
    level: 1,
    question: "顺时针打印矩阵的核心算法思路是什么？",
    answer:
      "核心思路是『边界缩减法』：维护 top、bottom、left、right 四个边界指针，每一轮按顺时针依次遍历上边（从左到右）、右边（从上到下）、下边（从右到左）、左边（从下到上），每遍历完一条边就向内收缩对应的边界，直到所有边界交叉（top > bottom 或 left > right）为止。",
    tags: ["核心直觉", "边界缩减"],
  },
  {
    id: "coi-sm-2",
    chapter: "coi-spiral-matrix",
    level: 1,
    question: "顺时针打印矩阵的时间复杂度和空间复杂度分别是多少？",
    answer:
      "时间复杂度为 O(M × N)，其中 M 和 N 分别是矩阵的行数和列数，因为每个元素恰好被访问一次。辅助空间复杂度为 O(1)（仅用四个边界指针），但输出结果数组本身需要 O(M × N) 的空间。",
    tags: ["时间复杂度", "空间复杂度"],
  },
  {
    id: "coi-sm-3",
    chapter: "coi-spiral-matrix",
    level: 2,
    question:
      "在每条边遍历完成后，为什么必须检查边界是否交叉（如 top > bottom 或 left > right）？",
    answer:
      "如果不检查，在非方阵或单行/单列的情况下，前面的边遍历已经让边界交叉，但后续的边仍然会继续遍历，导致已经打印过的元素被重复打印。例如，一个单行矩阵在遍历完上边后 top > bottom，如果不检查就继续遍历下边，会反向重复打印同一行的元素。",
    tags: ["边界碰撞", "重复打印"],
  },
  {
    id: "coi-sm-4",
    chapter: "coi-spiral-matrix",
    level: 2,
    question:
      "在四个遍历方向中，哪些方向之后需要进行边界交叉检查？为什么不是全部四个方向？",
    answer:
      "需要在遍历完上边（左→右）后检查 top > bottom，以及遍历完右边（上→下）后检查 left > right。因为上边和右边遍历完之后分别将 top++ 和 right--，可能导致与对侧边界交叉。而下边和左边的遍历在进入时若前两个检查已经通过，则保证仍有有效的行列可遍历，到循环外层条件判断即可终止。当然也可以在每条边后都检查，只是前两个检查是最低必要防护。",
    tags: ["边界安全", "防御式检查"],
  },
  {
    id: "coi-sm-5",
    chapter: "coi-spiral-matrix",
    level: 2,
    question: "列举顺时针打印矩阵中需要特殊处理的边界情况。",
    answer:
      "主要边界情况包括：\n1. 空矩阵（matrix 为空或行列为 0）→ 直接返回空数组。\n2. 1×1 矩阵 → 只输出单个元素。\n3. 单行矩阵（1×N）→ 只走一次上边遍历（左→右），无需下边遍历。\n4. 单列矩阵（M×1）→ 上边只走一格后 right 缩减，接着右边遍历完（上→下），无需左边遍历。\n5. 宽矩阵/高矩阵 → 中间可能退化为单行或单列，靠边界检查正确终止。",
    tags: ["边界条件", "鲁棒性"],
  },
  {
    id: "coi-sm-6",
    chapter: "coi-spiral-matrix",
    level: 3,
    question: "请写出顺时针打印矩阵的完整 TypeScript 实现代码。",
    answer:
      "function spiralOrder(matrix: number[][]): number[] {\n  if (!matrix.length || !matrix[0].length) return [];\n  const result: number[] = [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let i = left; i <= right; i++) result.push(matrix[top][i]);\n    top++;\n    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);\n    right--;\n    if (top <= bottom) {\n      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);\n      left++;\n    }\n  }\n  return result;\n}",
    tags: ["代码实现", "TypeScript"],
  },
  {
    id: "coi-sm-7",
    chapter: "coi-spiral-matrix",
    level: 3,
    question: "请写出顺时针打印矩阵的 C++ 实现代码。",
    answer:
      "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        vector<int> result;\n        if (matrix.empty() || matrix[0].empty()) return result;\n        int top = 0, bottom = matrix.size() - 1;\n        int left = 0, right = matrix[0].size() - 1;\n        while (top <= bottom && left <= right) {\n            for (int i = left; i <= right; ++i)\n                result.push_back(matrix[top][i]);\n            ++top;\n            for (int i = top; i <= bottom; ++i)\n                result.push_back(matrix[i][right]);\n            --right;\n            if (top <= bottom) {\n                for (int i = right; i >= left; --i)\n                    result.push_back(matrix[bottom][i]);\n                --bottom;\n            }\n            if (left <= right) {\n                for (int i = bottom; i >= top; --i)\n                    result.push_back(matrix[i][left]);\n                ++left;\n            }\n        }\n        return result;\n    }\n};",
    tags: ["代码实现", "C++"],
  },
  {
    id: "coi-sm-8",
    chapter: "coi-spiral-matrix",
    level: 3,
    question: "如果忘记在遍历完上边后将 top++ 会导致什么问题？",
    answer:
      "如果遍历完上边后忘记 top++，下一步遍历右边时 for 循环的起点 i = top 仍指向已遍历的行，导致右上角元素被重复打印。更严重的是，进入下一轮大循环时 top 仍未更新，上边会被再次完整遍历，造成无限循环。类似地，任何一条边遍历后忘记收缩对应边界，都会导致重复打印或死循环。",
    tags: ["调试陷阱", "指针更新"],
  },
  {
    id: "coi-sm-9",
    chapter: "coi-spiral-matrix",
    level: 4,
    question: "如果面试官要求按逆时针顺序打印矩阵，算法需要怎样修改？",
    answer:
      "只需要改变四条边的遍历顺序。逆时针顺序为：上边（左→右改为上→下，即先遍历左列从上到下）→ 下边（左→右）→ 右列（从下到上）→ 上行（右→左）。具体实现上，将四个 for 循环改为：\n1. 左列从 top 到 bottom（left 列），然后 left++。\n2. 下行从 left 到 right（bottom 行），然后 bottom--。\n3. 检查 left <= right 后，右列从 bottom 到 top，然后 right--。\n4. 检查 top <= bottom 后，上行从 right 到 left，然后 top++。\n本质上只是调换了四个方向的遍历轮次和对应的边界收缩，算法框架完全不变。",
    tags: ["变体扩展", "逆时针"],
  },
  {
    id: "coi-sm-10",
    chapter: "coi-spiral-matrix",
    level: 4,
    question:
      "如何用该算法生成一个 N×N 的螺旋矩阵（即把 1~N² 填入矩阵形成顺时针螺旋）？",
    answer:
      "思路完全一致：先创建 N×N 的空矩阵，维护 top/bottom/left/right 四个边界，然后用一个从 1 开始递增的计数器 num，按与打印相同的顺时针四方向循环往矩阵格子里填值（而不是读值）。每填一个格子 num++，每条边填完后收缩边界并做交叉检查。循环结束时 num 恰好等于 N²+1，矩阵即为目标螺旋矩阵。时间和空间复杂度均为 O(N²)。",
    tags: ["逆向构造", "螺旋矩阵生成"],
  },
];
