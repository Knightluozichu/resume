import type { ReviewQuestion } from "./types";

export const coiRegularExpressionsMatchingQuestions: ReviewQuestion[] = [
  {
    id: "coi-regex-1",
    chapter: "coi-regular-expressions-matching",
    level: 1,
    question: "在『正则表达式匹配』问题中，动态规划（DP）的状态如何定义？每个维度的物理意义是什么？",
    answer:
      "状态定义为二维布尔数组 `dp[i][j]`。\n- 其物理意义是：**源字符串 `s` 的前 `i` 个字符（即 `s[0..i-1]`）与模式串 `p` 的前 `j` 个字符（即 `p[0..j-1]`）是否能够完全匹配**。\n- 数组的维度大小通常设为 `(M+1) * (N+1)`，其中 `M` 和 `N` 分别是字符串 `s` 和 `p` 的长度，因为需要考虑空字符串（长度为 0）的边界情况。",
    tags: ["状态定义", "动态规划"],
  },
  {
    id: "coi-regex-2",
    chapter: "coi-regular-expressions-matching",
    level: 1,
    question: "动态规划初始化时，边界状态 `dp[0][0]` 代表什么？为什么它的值必须为 `true`？",
    answer:
      "`dp[0][0]` 代表**空字符串 `s`（长度为 0）与空模式串 `p`（长度为 0）的匹配结果**。\n- 它的值必须为 `true`，因为根据匹配规则，空字符串与空的正则表达式模式串天然匹配。这是整个动态规划递推关系的基石（Base Case），所有其他状态的转移都依赖于这个初始真值。",
    tags: ["边界初始化", "基石状态"],
  },
  {
    id: "coi-regex-3",
    chapter: "coi-regular-expressions-matching",
    level: 2,
    question: "当模式串的当前字符 `p[j-1] != '*'` 时，`dp[i][j]` 的状态转移方程是什么？需要满足什么条件？",
    answer:
      "当 `p[j-1] != '*'` 时，只能进行单字符的硬性匹配。状态转移方程为：\n$$dp[i][j] = dp[i-1][j-1] \\quad \\text{if } matches(s[i-1], p[j-1])$$\n其中 `matches(s[i-1], p[j-1])` 满足的条件 is：`s[i-1] == p[j-1]` 或者 `p[j-1] == '.'`（点号匹配任意单个字符）。如果当前字符匹配成功，则当前的匹配结果取决于它们各自前缀的匹配结果 `dp[i-1][j-1]`；若不匹配，则 `dp[i][j] = false`。",
    tags: ["状态转移", "字符匹配"],
  },
  {
    id: "coi-regex-4",
    chapter: "coi-regular-expressions-matching",
    level: 2,
    question: "当 `p[j-1] == '*'` 时，代表前一个字符 `p[j-2]` 可以出现 0 次或多次。如果选择让该字符出现 **0 次**，其状态转移方程是什么？如何理解？",
    answer:
      "当选择让字符 `p[j-2]` 出现 0 次时，意味着我们将模式串中的 `p[j-2]` 和 `*`（即最后两个字符组合）直接丢弃不用。状态转移方程为：\n$$dp[i][j] = dp[i][j-2]$$\n- **理解**：我们将当前 `s` 的前 `i` 个字符直接与模式串 `p` 的前 `j-2` 个字符进行匹配。如果 `dp[i][j-2]` 为 `true`，说明该星号组合被忽略后依然匹配成功，故 `dp[i][j]` 亦为 `true`。",
    tags: ["状态转移", "星号通配符", "0次匹配"],
  },
  {
    id: "coi-regex-5",
    chapter: "coi-regular-expressions-matching",
    level: 3,
    question: "当 `p[j-1] == '*'` 且选择让前驱字符 `p[j-2]` 匹配 **1 次或多次** 时，转移方程是什么？需要满足什么前置条件？",
    answer:
      "选择匹配 1 次或多次时，前置条件是：**当前源字符 `s[i-1]` 必须与星号前驱字符 `p[j-2]` 匹配**（即 `s[i-1] == p[j-2]` 或 `p[j-2] == '.'`）。\n在满足该前置条件的前提下，转移方程为：\n$$dp[i][j] = dp[i-1][j]$$\n- **理解**：因为 `*` 可以表示多个字符，我们在匹配掉当前 `s[i-1]` 之后，模式串中的整个 `p[j-2]*` 依然有效，可以继续用于匹配 `s` 剩下的前驱部分。因此我们去查看 `s` 缩短一个字符后的匹配状态 `dp[i-1][j]`。",
    tags: ["状态转移", "星号通配符", "多次匹配"],
  },
  {
    id: "coi-regex-6",
    chapter: "coi-regular-expressions-matching",
    level: 2,
    question: "综合来看，当 `p[j-1] == '*'` 时的完整状态转移逻辑是什么？请用布尔表达式表达。",
    answer:
      "当 `p[j-1] == '*'` 时，`dp[i][j]` 的结果取决于『匹配 0 次』与『匹配 1 次及以上』的逻辑或（OR）：\n$$dp[i][j] = dp[i][j-2] \\lor (matches(s[i-1], p[j-2]) \\land dp[i-1][j])$$\n其中 `matches(s[i-1], p[j-2])` 指 `s[i-1]` 与 `p[j-2]` 相同或 `p[j-2] == '.'`。只要这两种决策（丢弃星号组合，或者保留星号组合并消去源串当前匹配字符）中有一种能成功匹配，`dp[i][j]` 就为 `true`。",
    tags: ["逻辑合并", "状态转移"],
  },
  {
    id: "coi-regex-7",
    chapter: "coi-regular-expressions-matching",
    level: 3,
    question: "在源串 `s` 为空串（`i = 0`）时，`dp[0][j]` 还会可能为 `true` 吗？如果可能，需要模式串 `p` 满足什么特殊结构？",
    answer:
      "**可能**。当源串为空，但模式串 `p` 不为空时，如果 `p` 的奇数位置都是字符、偶数位置全部是 `*`（形如 `a*b*c*.*`），它们可以全部匹配 0 次，从而消除整个模式串匹配空串。\n- **计算规则**：由于 `i = 0`，当 `p[j-1] == '*'` 时，`dp[0][j] = dp[0][j-2]`。我们可以通过递推检查模式串的偶数索引位置是否全部由 `*` 组成，来决定哪些 `dp[0][j]` 为 `true`。",
    tags: ["边界条件", "空串匹配"],
  },
  {
    id: "coi-regex-8",
    chapter: "coi-regular-expressions-matching",
    level: 3,
    question: "在实现此算法时，如果模式串 `p` 包含连续的星号（如 `a**`）或首字符就是星号（如 `*a`），这会带来什么问题？如何处理？",
    answer:
      "按照正则表达式的规范：\n1. **首字符是星号（`p[0] == '*'`）**：是不合法的，因为星号必须有前驱字符才能起效。在代码实现中，如果直接访问 `p[j-2]` 会导致数组越界，因此应当直接抛出异常或返回不匹配；\n2. **连续的星号（`a**`）**：在标准正则中是没有实际意义且非法的。我们在处理状态转移时，由于星号的转移依赖于 `dp[i][j-2]`，连续星号可能导致代码逻辑回退时发生混乱，通常在输入阶段就应该校验模式串的合法性，确保星号不会连续出现。",
    tags: ["异常处理", "输入校验", "边界条件"],
  },
  {
    id: "coi-regex-9",
    chapter: "coi-regular-expressions-matching",
    level: 3,
    question: "请分析正则表达式匹配动态规划算法的时间复杂度和空间复杂度，并说明原因。",
    answer:
      "设源串 `s` 的长度为 $M$，模式串 `p` 的长度为 $N$：\n- **时间复杂度为 $O(M \\times N)$**：因为状态总数有 $(M+1) \\times (N+1)$ 个，而每个状态的计算只依赖常数个已知的状态（`dp[i-1][j-1]`、`dp[i][j-2]` 或 `dp[i-1][j]`），在单个状态转移中只涉及常数次布尔和字符比较操作（$O(1)$），故总时间复杂度为 $O(M \\times N)$；\n- **空间复杂度为 $O(M \\times N)$**：由于我们需要创建一个二维的布尔型 DP 矩阵来存储所有的状态以避免重复计算，故辅助空间复杂度为 $O(M \\times N)$。可以通过滚动数组（一维 DP）将空间复杂度优化到 $O(N)$。",
    tags: ["复杂度分析", "时间复杂度", "空间复杂度"],
  },
  {
    id: "coi-regex-10",
    chapter: "coi-regular-expressions-matching",
    level: 4,
    question: "请给出在 TypeScript 中，使用动态规划实现正则表达式匹配（支持 `.` 和 `*`）的完整规范代码，包含空串边界处理。",
    answer:
      "```typescript\nfunction isMatch(s: string, p: string): boolean {\n  const m = s.length;\n  const n = p.length;\n  // dp[i][j] 表示 s 的前 i 个字符与 p 的前 j 个字符是否匹配\n  const dp: boolean[][] = Array.from({ length: m + 1 }, () => \n    Array(n + 1).fill(false)\n  );\n\n  // Base cases\n  dp[0][0] = true; // 空串与空模式匹配\n\n  // 初始化 dp[0][j]：处理源串为空，但模式串有 * 的情况\n  for (let j = 2; j <= n; j++) {\n    if (p[j - 1] === '*') {\n      dp[0][j] = dp[0][j - 2];\n    }\n  }\n\n  // 状态转移\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (p[j - 1] === '*') {\n        // 匹配 0 次\n        const noMatch = dp[i][j - 2];\n        // 匹配 1 次及以上：当前字符必须匹配，且缩短源串依然能与当前模式匹配\n        const charMatch = p[j - 2] === '.' || s[i - 1] === p[j - 2];\n        const multipleMatch = charMatch && dp[i - 1][j];\n        dp[i][j] = noMatch || multipleMatch;\n      } else {\n        // 正常单字符匹配\n        const charMatch = p[j - 1] === '.' || s[i - 1] === p[j - 1];\n        dp[i][j] = charMatch && dp[i - 1][j - 1];\n      }\n    }\n  }\n\n  return dp[m][n];\n}\n```",
    tags: ["代码实现", "TypeScript", "动态规划"],
  },
];
