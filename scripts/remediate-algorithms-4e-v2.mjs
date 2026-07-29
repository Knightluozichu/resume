#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "algorithms-4e";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/algorithms-4e-v2-profiles.json");
const OFFICIAL_HOME = "https://algs4.cs.princeton.edu/home/";
const OFFICIAL_CODE = "https://algs4.cs.princeton.edu/code/";
const OFFICIAL_ERRATA = "https://algs4.cs.princeton.edu/errata/";
const EXTRA_IMPORTS = {
  "directed-graphs":
    'import { Algs4DirectedGraphModelMap } from "@/components/mdx/algorithms-4e/diagrams/directed-graphs";',
  "minimum-spanning-trees":
    'import { Algs4WeightedGraphModelMap } from "@/components/mdx/algorithms-4e/diagrams/minimum-spanning-trees";',
  "shortest-paths":
    'import { Algs4WeightedDigraphModelMap } from "@/components/mdx/algorithms-4e/diagrams/shortest-paths";',
  "undirected-graphs":
    'import { Algs4UndirectedGraphModelMap, Algs4DfsApplicationMap } from "@/components/mdx/algorithms-4e/diagrams/undirected-graphs";',
  reductions:
    'import { Algs4ReductionMap } from "@/components/mdx/algorithms-4e/diagrams/reductions";',
};

function p(
  id,
  pagePath,
  focus,
  formula,
  invariant,
  fault,
  evidence,
  trace,
  scenarios,
) {
  return {
    id,
    path: pagePath,
    focus,
    formula,
    invariant,
    fault,
    evidence,
    trace,
    scenarios,
  };
}

const PAGES = [
  p(
    "algs4-1.1",
    "01-fundamentals/basic-programming-model",
    "把 Java 表达式、数组、静态方法、API、输入输出与二分查找连成可执行程序合同",
    "remaining = hi - lo + 1；下一轮 remaining ≤ floor(上一轮 remaining / 2)",
    "若 key 存在，它始终位于闭区间 a[lo..hi]；区间为空时才能报告未找到",
    "不验证数组已有序，或用可能溢出的 (lo + hi) / 2 计算中点",
    "输入类型、数组快照、lo/mid/hi、比较结果、退出原因与线性扫描预言机",
    [
      "解析输入类型",
      "验证数组有序",
      "计算安全中点",
      "收缩候选区间",
      "返回索引证书",
    ],
    [
      {
        label: "表达式边界",
        input: "比较 7 / 2、7 / 2.0 与 (double) (7 / 2)",
        expected: "先由操作数类型决定除法语义，再谈结果值",
      },
      {
        label: "查找边界",
        input: "在 [2, 4, 7, 9] 中查找 7 与 8",
        expected: "每轮保存闭区间，命中返回索引，空区间返回 -1",
      },
    ],
  ),
  p(
    "algs4-1.2",
    "01-fundamentals/data-abstraction",
    "用 API、客户端与表示不变量隔离抽象数据类型的语义和实现",
    "distance(p, q) = sqrt((px-qx)^2 + (py-qy)^2)",
    "所有公开操作都保持表示不变量；客户端只依赖 API，不读取实现字段",
    "把对象引用相等当成值相等，或让可变内部数组从构造器和访问器逃逸",
    "构造参数、对象状态、API 调用序列、返回值、异常与表示检查结果",
    [
      "声明抽象值",
      "写出 API 合同",
      "选择内部表示",
      "执行客户端调用",
      "检查表示不变量",
    ],
    [
      {
        label: "不可变值",
        input: "用两个坐标相同但引用不同的 Point 表示同一点",
        expected: "值语义由 API 与 equals 合同决定，不由引用地址决定",
      },
      {
        label: "表示泄漏",
        input: "构造器直接保存调用方传入的可变数组",
        expected: "防御性复制阻断调用方绕过 API 修改内部状态",
      },
    ],
  ),
  p(
    "algs4-1.3",
    "01-fundamentals/bags-queues-stacks",
    "从访问顺序、迭代合同与表示成本选择背包、队列、栈及其数组或链表实现",
    "动态数组扩容采用 2N、缩容采用 N/2 且低水位为 1/4，可得摊还常数操作",
    "栈保持后进先出，队列保持先进先出，背包迭代不承诺删除或特定顺序",
    "出队后不清除失效引用造成对象游离，或在 1/2 负载时反复扩缩产生抖动",
    "操作序列、头尾索引、容量、元素次序、失效引用与摊还复制次数",
    [
      "选择访问合同",
      "执行插入操作",
      "触发扩容或链接",
      "执行删除操作",
      "核对迭代次序",
    ],
    [
      {
        label: "括号匹配",
        input: "依次读取 [ ( ) ] 并在遇到右括号时弹栈",
        expected: "栈顶必须是最近尚未配对的左括号",
      },
      {
        label: "广度队列",
        input: "按 A、B、C 入队，再连续出队",
        expected: "输出 A、B、C，并在移除后清理槽位引用",
      },
    ],
  ),
  p(
    "algs4-1.4",
    "01-fundamentals/analysis-of-algorithms",
    "把计时实验、数学模型、增长数量级、内存模型和更快算法放进同一可证伪预测",
    "T(N) ≈ aN^b；doubling ratio ≈ 2^b；ThreeSum 暴力模型约为 N^3 / 6 次三元检查",
    "比较实现时必须固定输入分布、机器、JVM、预热、计数单位与正确性预言机",
    "只取最快一次墙钟时间，或在扩大 N 时同时改变数据分布与实现版本",
    "数据集哈希、N、基本操作计数、预热轮次、时间分布、拟合残差与输出校验",
    [
      "提出增长假设",
      "选择基本操作",
      "做倍增实验",
      "拟合幂律模型",
      "检查残差与反例",
    ],
    [
      {
        label: "倍增实验",
        input: "固定生成器，把 N 从 1k 依次翻倍到 8k",
        expected: "比值趋近 2、4、8 时分别提示线性、平方、立方主导项",
      },
      {
        label: "成本计数",
        input: "对同一 ThreeSum 输入同时记录三元组检查数和墙钟时间",
        expected: "先核对操作计数模型，再解释计时中的常数与系统噪声",
      },
    ],
  ),
  p(
    "algs4-1.5",
    "01-fundamentals/union-find",
    "在动态连通问题中比较 quick-find、quick-union、加权合并与路径压缩",
    "加权 quick-union 树高 ≤ floor(log2 N)；加路径压缩后 M 次操作为近线性成本",
    "connected(p,q) 当且仅当 root(p)=root(q)，每次 union 只连接两个不同根",
    "把非根节点接到另一棵树，或按节点编号而不是树大小决定连接方向",
    "id/parent 数组、size、root 路径、component count、访问次数与朴素图连通预言机",
    [
      "读取节点对",
      "寻找两个根",
      "比较树大小",
      "连接较小根",
      "压缩路径并核对分量",
    ],
    [
      {
        label: "链式退化",
        input: "按 0-1、1-2、2-3、3-4 合并",
        expected: "quick-union 可能形成长链，加权策略限制树高",
      },
      {
        label: "重复合并",
        input: "先 union(1,2)，再重复 union(1,2)",
        expected: "第二次不得再次减少 component count",
      },
    ],
  ),
  p(
    "algs4-2.1",
    "02-sorting/elementary-sorts",
    "用选择、插入和希尔排序的交换轨迹解释局部有序度、成本与适用输入",
    "选择排序比较约 N^2/2 次；插入排序交换数等于输入逆序对数",
    "每轮结束后声明的前缀、后缀或 h-子序列必须有序，元素多重集保持不变",
    "插入时把比较边界写成 j > 0 却读取 a[j-1] 之外的位置，或遗漏最后一个 h=1",
    "原数组、h 序列、比较/交换计数、每轮数组快照、稳定性标签与排序预言机",
    [
      "选择算法与 h",
      "定位局部逆序",
      "移动或交换元素",
      "扩大有序区域",
      "核对全序和多重集",
    ],
    [
      {
        label: "近乎有序",
        input: "[1, 2, 4, 3, 5] 上比较选择排序与插入排序",
        expected: "插入排序只修复少量逆序，选择排序仍完成固定数量比较",
      },
      {
        label: "希尔间隔",
        input: "先做 h=4、h=1 两轮 h-sort",
        expected: "每轮保持 h-有序，最后 h=1 才得到全序",
      },
    ],
  ),
  p(
    "algs4-2.2",
    "02-sorting/mergesort",
    "从稳定归并合同推导自顶向下和自底向上的调度、比较界与辅助空间",
    "T(N) = 2T(N/2) + Θ(N) = Θ(N log N)",
    "归并前左右半区分别有序；归并后区间有序、稳定且元素多重集不变",
    "未先复制辅助数组就覆盖尚未读取的左半区，或相等键时优先取右侧破坏稳定性",
    "lo/mid/hi、aux 快照、左右游标、比较次数、原始序号与全排序预言机",
    [
      "划分有序子段",
      "复制到辅助区",
      "比较两侧首项",
      "写回目标区间",
      "核对稳定全序",
    ],
    [
      {
        label: "稳定归并",
        input: "归并 [(2,a),(4,a)] 与 [(2,b),(3,b)]",
        expected: "相等键先取左侧，原始相对次序 a 在 b 前",
      },
      {
        label: "调度对照",
        input: "N=7 时对照递归划分与 1、2、4 长度的自底向上归并",
        expected: "调度不同，但每次都只合并两个已排序区间",
      },
    ],
  ),
  p(
    "algs4-2.3",
    "02-sorting/quicksort",
    "用随机打乱、切分不变量和三向切分解释快速排序的平均性能与重复键边界",
    "随机排列下比较次数约 2N ln N；三向切分把等值区一次固定",
    "切分结束时 a[lo..j-1]≤v、a[j]=v、a[j+1..hi]≥v，元素多重集不变",
    "省略随机打乱却固定取首元素为 pivot，使已有序输入递归深度达到 N",
    "随机种子、lo/i/j/hi、pivot、交换轨迹、递归深度、比较数与排序预言机",
    [
      "随机打乱输入",
      "选择切分元素",
      "推进左右指针",
      "固定切分位置",
      "递归并核对结果",
    ],
    [
      {
        label: "有序输入",
        input: "[1,2,3,4,5] 固定首元素切分，再与随机打乱比较",
        expected: "未打乱时产生极不平衡子问题，随机化恢复期望对数深度",
      },
      {
        label: "大量重复",
        input: "[A,B,A,A,C,A] 使用二向与三向切分",
        expected: "三向切分一次跳过等于 pivot 的整段",
      },
    ],
  ),
  p(
    "algs4-2.4",
    "02-sorting/priority-queues",
    "以二叉堆的形状和次序不变量连接动态极值、上浮下沉与堆排序",
    "parent(k)=floor(k/2)，children(k)=2k,2k+1；插入与删除最大值均为 O(log N)",
    "对每个 k>1 都有 heap[parent(k)]≥heap[k]，有效元素仅位于 1..N",
    "sink 时仍访问已经缩短后的 N+1 槽位，或在两个孩子中选择较小者交换",
    "heap 数组、N、父子索引、比较/交换轨迹、删除序列与最大值预言机",
    [
      "把新键放到末尾",
      "沿父链上浮",
      "交换根与末项",
      "沿较大孩子下沉",
      "核对堆序与输出",
    ],
    [
      {
        label: "插入极值",
        input: "向 [9,7,8,2,3] 依次插入 10",
        expected: "10 沿父链上浮到根，完全树形状不变",
      },
      {
        label: "删除根",
        input: "删除最大值后让末项补到根",
        expected: "N 先减一，再只在有效堆范围内沿较大孩子下沉",
      },
    ],
  ),
  p(
    "algs4-2.5",
    "02-sorting/sorting-applications",
    "依据数据类型、稳定性、内存、输入分布与归约目标选择排序实现",
    "比较排序最坏比较下界为 ceil(log2(N!)) = Θ(N log N)",
    "输出必须全序且保持输入多重集；若合同要求稳定，相等键的原始次序也必须保持",
    "比较器违反传递性，或把 equals 与 compareTo 不一致的数据交给依赖全序的客户端",
    "数据类型、比较器、原始序号、排序结果、稳定性、峰值空间与归约后的答案",
    [
      "声明排序合同",
      "选择比较器",
      "选择排序实现",
      "执行应用归约",
      "核对全序与稳定性",
    ],
    [
      {
        label: "稳定多键",
        input: "先按姓名排序，再稳定地按部门排序",
        expected: "部门相同记录仍保持姓名顺序，形成多键结果",
      },
      {
        label: "交集归约",
        input: "将两个点集排序后扫描检测共同点",
        expected: "排序把成对比较归约为两个有序游标的线性扫描",
      },
    ],
  ),
  p(
    "algs4-3.1",
    "03-searching/symbol-tables",
    "用键值 API、顺序查找和有序数组二分建立符号表的语义与成本基线",
    "有序数组查询 O(log N)，插入最坏 O(N)；无序链表查询和插入最坏 O(N)",
    "每个键至多关联一个当前值，put 已有键只更新值而不增加 size",
    "用 null 同时表示缺失和值，或二分 rank 的返回语义与插入位置语义混淆",
    "键值序列、比较器、rank、size、数组移动、命中状态与朴素 Map 预言机",
    [
      "解析键值操作",
      "查找已有键",
      "决定更新或插入",
      "维护有序表示",
      "核对 size 与返回值",
    ],
    [
      {
        label: "更新已有键",
        input: "put(A,1) 后再 put(A,2)",
        expected: "size 保持 1，get(A) 返回 2",
      },
      {
        label: "有序插入",
        input: "在 [A,C,E] 中 rank(D)",
        expected: "返回插入位置 2，并只移动 D 右侧元素",
      },
    ],
  ),
  p(
    "algs4-3.2",
    "03-searching/binary-search-trees",
    "沿根到键的路径实现查找、插入、有序操作、范围查询与 Hibbard 删除",
    "rank(x)=size(left(x))+rank(x.right,key)（当 key>x.key）",
    "每个节点左子树键更小、右子树键更大，size=1+size(left)+size(right)",
    "Hibbard 删除后只修复局部链接却没有自底向上重算 size",
    "搜索路径、节点键值、左右链接、子树 size、中序序列与有序数组预言机",
    [
      "从根比较键",
      "选择左或右子树",
      "执行更新或删除",
      "重算子树大小",
      "核对中序与 rank",
    ],
    [
      {
        label: "路径查找",
        input: "在键 [S,E,X,A,R,C,H] 构成的 BST 中查找 R",
        expected: "每次比较只排除一侧子树，轨迹可由根到 R 重放",
      },
      {
        label: "双子删除",
        input: "删除同时有左右孩子的节点 E",
        expected: "用右子树最小节点接替，并保持两侧链接和 size",
      },
    ],
  ),
  p(
    "algs4-3.3",
    "03-searching/balanced-search-trees",
    "把 2-3 树等价表示为左倾红黑树，并用旋转与颜色翻转维持对数高度",
    "含 N 个节点的左倾红黑树高度不超过 2 log2 N",
    "红链接左倾、任一路径不连续两条红链接、根到空链接的黑链接数相同",
    "旋转时漏掉颜色或子树 size 转移，导致局部次序看似正确但黑高和 rank 已损坏",
    "键序列、链接颜色、旋转/翻色轨迹、每路黑高、树高、size 与中序预言机",
    [
      "按 BST 插入",
      "修复右倾红链接",
      "拆分连续红链接",
      "向上传播颜色",
      "核对黑高与中序",
    ],
    [
      {
        label: "递增插入",
        input: "依次插入 A、B、C",
        expected: "旋转和翻色把临时 4-node 拆分，避免退化为长度 3 的链",
      },
      {
        label: "删除准备",
        input: "沿路径下行删除最小键",
        expected: "在进入 2-node 前先移动红链接，保证底部可安全删除",
      },
    ],
  ),
  p(
    "algs4-3.4",
    "03-searching/hash-tables",
    "从 hashCode/equals 合同、均匀散列假设、拉链法与线性探测推导负载控制",
    "拉链平均链长 α=N/M；线性探测命中/未命中成本随 α→1 急剧上升",
    "equals 相等的键必须有相同 hashCode；所有键可由当前表容量和探测规则重新找到",
    "键入表后发生可影响 hashCode 的变更，或删除线性探测槽位却不重建后续簇",
    "键及哈希值、M/N/α、桶或探测轨迹、resize 前后位置、命中结果与 Map 预言机",
    [
      "计算一致哈希",
      "映射到桶或槽",
      "处理碰撞",
      "按负载扩缩容",
      "核对全部键值",
    ],
    [
      {
        label: "拉链碰撞",
        input: "让 A、K、U 映射到同一桶",
        expected: "桶内仍用 equals 区分键，碰撞不会覆盖不同键",
      },
      {
        label: "探测删除",
        input: "删除线性探测簇中间的键",
        expected: "重插后续簇元素，不能留下使查找提前停止的空洞",
      },
    ],
  ),
  p(
    "algs4-3.5",
    "03-searching/searching-applications",
    "把集合、字典、倒排索引、稀疏向量与系统符号表归结为键值操作组合",
    "稀疏向量点积可按较小非零集合迭代，成本 O(nnz_small × lookup)",
    "应用结果必须与所选 Set/Map 语义一致，缺失键与显式零值不得混淆",
    "在遍历索引时原地修改同一符号表，或把重复词频误压成集合存在性",
    "输入记录、规范化键、索引 postings、非零坐标、查询轨迹与朴素扫描结果",
    [
      "选择集合或映射",
      "规范化输入键",
      "构建正向或倒排索引",
      "执行查询组合",
      "核对应用语义",
    ],
    [
      {
        label: "倒排索引",
        input: "文档 d1=[A,B]、d2=[B,C]，查询 B",
        expected: "返回 postings d1 与 d2，并保持文档标识去重规则",
      },
      {
        label: "稀疏点积",
        input: "只在共同非零坐标 2 和 9 上相乘",
        expected: "跳过其余零项，结果与完整向量点积一致",
      },
    ],
  ),
  p(
    "algs4-4.1",
    "04-graphs/undirected-graphs",
    "从邻接表表示出发，用 DFS、BFS、连通分量与符号图回答无向图查询",
    "邻接表空间 Θ(V+E)；DFS/BFS 单次搜索时间 Θ(V+E)",
    "marked 只表示已发现顶点；edgeTo 链必须回到源点，BFS 首次发现给出最少边路径",
    "递归 DFS 在标记前访问邻居造成环上重复递归，或 BFS 出队时才标记导致重复入队",
    "V/E、邻接表、marked、edgeTo、队列/栈轨迹、component id 与路径预言机",
    [
      "建立双向邻接",
      "发现并标记顶点",
      "记录来源边",
      "展开前沿",
      "重建路径或分量",
    ],
    [
      {
        label: "路径对照",
        input: "在含环图中从 0 到 5 同时运行 DFS 与 BFS",
        expected: "两者都证明可达，只有 BFS 保证边数最少",
      },
      {
        label: "多个分量",
        input: "图由 0/1/2 与 3/4 两个分量组成",
        expected: "外层扫描从每个未标记顶点启动一次搜索并分配 component id",
      },
    ],
  ),
  p(
    "algs4-4.2",
    "04-graphs/directed-graphs",
    "用有向可达、环检测、拓扑序与强连通分量区分方向性结构问题",
    "DFS/BFS、拓扑排序与 Kosaraju-Sharir SCC 都可在线性 Θ(V+E) 时间完成",
    "拓扑序要求每条边 v→w 都满足 order(v) 小于 order(w)；同一 SCC 内顶点两两可达",
    "检测有向环时递归返回后未清除 onStack，或 SCC 第一遍没有在反向图上取逆后序",
    "原图/反向图、marked、onStack、edgeTo、逆后序、component id 与可达矩阵预言机",
    [
      "建立有向邻接",
      "执行可达搜索",
      "检测回边或生成逆后序",
      "分配 SCC",
      "验证拓扑或互达",
    ],
    [
      {
        label: "拓扑前提",
        input: "加入边 0→1、1→2、2→0",
        expected: "检测到有向环后拒绝输出拓扑序",
      },
      {
        label: "强连通",
        input: "0↔1、1→2、2↔3",
        expected: "得到 0/1 与 2/3 两个 SCC，并保留缩点图方向",
      },
    ],
  ),
  p(
    "algs4-4.3",
    "04-graphs/minimum-spanning-trees",
    "用切分定理统一 Lazy/Eager Prim 与 Kruskal，并给出最优性可检查证书",
    "Kruskal 时间 O(E log E)；带索引堆的 Eager Prim 时间 O(E log V)",
    "已选边始终无环；对每个选择步骤，所取边是某个尊重当前森林切分的最轻跨边",
    "没有处理相同权重的合法多解，或 Eager Prim 保留过期 crossing edge 却未 decreaseKey",
    "加权边集、切分、候选队列、森林分量、总权重、环检查与逐边 cut optimality",
    [
      "建立加权无向图",
      "形成尊重森林的切分",
      "选择最轻跨边",
      "合并分量",
      "验证树与总权重",
    ],
    [
      {
        label: "切分安全边",
        input: "切分 A/B 与 C/D 的跨边权重为 2、5、7",
        expected: "权重 2 的最轻跨边可安全加入某棵 MST",
      },
      {
        label: "环边拒绝",
        input: "Kruskal 已连接 A-B-C，随后遇到边 A-C",
        expected: "并查集发现端点已连通，拒绝形成环的边",
      },
    ],
  ),
  p(
    "algs4-4.4",
    "04-graphs/shortest-paths",
    "以松弛为统一操作，按非负权、DAG 或一般权重前提选择 Dijkstra、拓扑序或 Bellman-Ford",
    "relax(v→w)：若 dist[w] > dist[v]+weight(v,w)，同时更新 dist[w] 与 edgeTo[w]",
    "所有边满足三角不等式，edgeTo 紧边链从可达顶点回到源点且路径权重等于 dist",
    "在存在可达负权边时仍把 Dijkstra 出队顶点永久 settle，或只更新 dist 不更新 edgeTo",
    "图与源点、distTo、edgeTo、松弛次序、优先队列、负环证书与全边校验器",
    [
      "初始化源点标签",
      "选择待松弛顶点",
      "计算候选距离",
      "更新标签与前驱",
      "验证路径或负环",
    ],
    [
      {
        label: "非负权图",
        input: "s→a=2、s→b=5、a→b=1",
        expected: "Dijkstra 先 settle a，再把 b 从 5 改进为 3",
      },
      {
        label: "负权边界",
        input: "加入 b→a=-4 并检查可达负环",
        expected: "先拒绝 Dijkstra 前提，再由 Bellman-Ford 给出距离或负环证书",
      },
    ],
  ),
  p(
    "algs4-5.1",
    "05-strings/string-sorts",
    "利用字符表规模与公共前缀，在键索引计数、LSD、MSD 和三向字符串快排间选择",
    "LSD 固定宽字符串排序时间 Θ(WN)；MSD/三向快排成本取决于被检查字符数",
    "每次分配或切分后，已完成的字符位次序正确，元素多重集和所需稳定性保持不变",
    "没有为字符串结束设置小于所有字符的哨兵值，导致前缀字符串排在其扩展之后",
    "alphabet/R、字符索引、count 前缀和、桶边界、递归区间、字符探测数与比较排序预言机",
    [
      "声明字符表与宽度",
      "读取当前字符",
      "计数或三向切分",
      "递归未决区间",
      "核对字典序",
    ],
    [
      {
        label: "固定宽键",
        input: "对等长日期键按日、月、年做 LSD",
        expected: "从最低有效位开始稳定排序，最后得到完整键序",
      },
      {
        label: "公共前缀",
        input: "排序 shell、shore、short、she",
        expected: "MSD 或三向字符串快排跳过已经确认相等的前缀",
      },
    ],
  ),
  p(
    "algs4-5.2",
    "05-strings/tries",
    "用 R 向单词查找树和三向单词查找树支持字符串符号表、前缀与通配查询",
    "查找长度为 W 的键访问 O(W) 个字符位置；空间由节点数与分支表示共同决定",
    "从根沿键字符可到达且终点携带值才算命中；内部节点也可以同时代表完整键",
    "删除前缀键时把仍有孩子的节点一并剪掉，或用 null 值混淆键缺失与显式空值",
    "键字符、节点链接、value 标记、prefix frontier、通配分支、节点数与 Map 预言机",
    [
      "读取下一个字符",
      "选择 R 向或三向分支",
      "创建或复用节点",
      "标记键值终点",
      "执行前缀/通配核对",
    ],
    [
      {
        label: "前缀键",
        input: "同时插入 she 与 shells，再删除 she",
        expected: "只清除 she 的值，保留通向 shells 的后继节点",
      },
      {
        label: "最长前缀",
        input: "键 she、shell、shore；查询 shellsort",
        expected: "沿字符前进并记住最近有值节点，返回 shell",
      },
    ],
  ),
  p(
    "algs4-5.3",
    "05-strings/substring-search",
    "比较暴力、KMP、Boyer-Moore 与 Rabin-Karp 如何复用失败信息减少文本回退",
    "KMP 在 DFA/前缀函数预处理后搜索 Θ(N)；Rabin-Karp 以滚动散列常数时间更新窗口",
    "任一时刻 j 表示模式前 j 个字符已与当前文本后缀匹配；报告位置必须通过字符验证",
    "KMP 失配后错误地把文本指针和模式指针都回退，或 Rabin-Karp 命中哈希后不验字符",
    "pattern/text、i/j、DFA 或前缀表、bad-character skip、窗口哈希、候选位置与朴素预言机",
    [
      "预处理模式",
      "扫描文本字符",
      "命中或计算失配跳转",
      "验证候选窗口",
      "返回位置或 N",
    ],
    [
      {
        label: "重叠模式",
        input: "在 ABABABAC 中查找 ABABAC",
        expected: "KMP 用已知前后缀继续，不重新比较已经确认的文本前缀",
      },
      {
        label: "散列碰撞",
        input: "构造与模式哈希相同但字符不同的窗口",
        expected: "Las Vegas 版本做逐字符校验后拒绝伪命中",
      },
    ],
  ),
  p(
    "algs4-5.4",
    "05-strings/regular-expressions",
    "把正则表达式编译为 Thompson NFA，并以 epsilon 闭包和字符转换执行识别",
    "NFA 模拟对长度 M 的正则和长度 N 的文本最坏时间 O(MN)，空间 O(M)",
    "每轮状态集恰为读完当前文本前缀后可达的 NFA 状态 epsilon 闭包",
    "构造交替或闭包时操作符栈配对错误，或字符转换后没有再次求 epsilon 闭包",
    "正则 token、操作符栈、epsilon 边、当前状态集、字符步、接受状态与小型枚举预言机",
    [
      "解析正则 token",
      "建立 epsilon 转换",
      "求初始闭包",
      "消费一个文本字符",
      "再闭包并判断接受",
    ],
    [
      {
        label: "闭包路径",
        input: "正则 A*B，文本 AAAB",
        expected: "每次 A 后都可经 epsilon 返回闭包，最终 B 到达接受状态",
      },
      {
        label: "交替分支",
        input: "正则 (A|BC)D，分别输入 AD 与 BCD",
        expected: "两条分支都由 epsilon 边进入，并在 D 前汇合",
      },
    ],
  ),
  p(
    "algs4-5.5",
    "05-strings/data-compression",
    "以可逆性为主线比较二进制 I/O、游程编码、Huffman 与 LZW 的模型和码流",
    "Huffman 平均码长满足 H ≤ L < H+1；压缩是否有效还取决于模型和元数据成本",
    "decode(encode(bytes)) 必须逐字节等于原输入，码流边界和 EOF 约定必须唯一",
    "Huffman 单字符输入没有生成可消费码字，或 LZW 编解码器的字典新增时点不同步",
    "输入哈希、频数/Trie、码表、bit offset、LZW 字典、压缩字节数与 round-trip",
    [
      "读取二进制输入",
      "建立频率或字典模型",
      "发射码字",
      "按同一模型解码",
      "逐字节核对",
    ],
    [
      {
        label: "偏斜频率",
        input: "AAAAABBC 的字符频数",
        expected: "Huffman 给高频 A 较短码，并保留无前缀歧义",
      },
      {
        label: "字典同步",
        input: "对 ABABABA 逐步执行 LZW 编码和解码",
        expected: "两端在相同边界新增短语，特殊前向引用仍可恢复",
      },
    ],
  ),
  p(
    "algs4-6.1",
    "06-context/event-driven-simulation",
    "用未来事件优先队列、碰撞预测和失效检测推进硬盘粒子系统",
    "每次有效碰撞更新 O(1) 粒子并安排 O(N) 新预测；队列操作为 O(log Q)",
    "模拟时钟单调前进；只有参与粒子的碰撞计数仍与预测时一致的事件才有效",
    "粒子发生一次碰撞后仍执行队列中基于旧速度预测的后续事件",
    "粒子位置/速度、模拟时钟、事件时间、碰撞计数、有效标记、能量动量与重放轨迹",
    [
      "预测未来碰撞",
      "插入最早事件",
      "移动全部粒子",
      "验证并响应碰撞",
      "作废旧事件并重预测",
    ],
    [
      {
        label: "失效事件",
        input: "粒子 A 先与 B 碰撞，队列里仍有旧预测 A-C",
        expected: "A 的碰撞计数变化使旧 A-C 事件失效",
      },
      {
        label: "墙面碰撞",
        input: "粒子到达竖直墙且水平速度为正",
        expected: "只反转水平速度，时间、位置和动能保持可核对",
      },
    ],
  ),
  p(
    "algs4-6.2",
    "06-context/b-trees",
    "以磁盘页为成本单位，用多路节点、查找、插入与分裂控制外存访问",
    "M 阶 B 树高度为 O(log_M N)，一次查找读取从根到叶的一页序列",
    "除根外节点保持规定的最小/最大占用，所有叶位于同一深度，键分隔子树范围",
    "满节点分裂时提升了错误中位键，或只更新兄弟页而漏写父页的子指针",
    "页 id、页内键、child 指针、占用率、split WAL 顺序、页读取次数与有序扫描预言机",
    [
      "读取根页",
      "页内定位区间",
      "下降到子页",
      "插入并检测溢出",
      "分裂提升并核对叶深",
    ],
    [
      {
        label: "页访问",
        input: "每页容纳 4 个分支，在三层树中查找键 K",
        expected: "成本按读取的页数计，不按页内每次比较等同于一次磁盘 I/O",
      },
      {
        label: "根分裂",
        input: "向已满根页插入新键",
        expected: "生成新根并提升中位键，树高只在根分裂时增加",
      },
    ],
  ),
  p(
    "algs4-6.3",
    "06-context/suffix-arrays",
    "以排序后缀与 LCP 支持最长重复子串、上下文关键词和最长公共前缀查询",
    "二分后缀数组定位长度 M 模式需 O(M log N) 字符比较，匹配输出另计",
    "suffix array 是 0..N-1 的全排列且对应后缀字典序递增；LCP 与相邻后缀一致",
    "后缀比较器把 substring 分配成本藏在常数里，或 LCP 索引偏移一位越过文本末端",
    "文本哈希、SA 排列、相邻后缀、LCP、二分区间、匹配位置与朴素后缀排序预言机",
    [
      "生成后缀索引",
      "按字符比较后缀",
      "形成有序 SA",
      "计算相邻 LCP",
      "执行 LRS/KWIC 查询",
    ],
    [
      {
        label: "最长重复",
        input: "文本 banana",
        expected: "相邻后缀的最大 LCP 为 ana，并能返回对应两个起点",
      },
      {
        label: "关键词上下文",
        input: "在有序后缀中二分模式 ana",
        expected: "定位连续匹配区间，再回到原文截取上下文",
      },
    ],
  ),
  p(
    "algs4-6.4",
    "06-context/maxflow",
    "用容量、流量、残量网络与增广路径建立最大流和最小割的双向证书",
    "残量 r(e)=capacity-flow（正向）或 flow（反向）；增广量为路径最小残量",
    "每条边满足 0≤flow≤capacity，非源汇点流量守恒，最终残量图中汇点不可达",
    "只保留正向剩余容量而遗漏反向残量边，使早期错误选择无法撤销",
    "容量/流量、残量边、增广路径、瓶颈、守恒差、最终 s-cut 与 cut capacity",
    [
      "初始化零流",
      "在残量图找 s-t 路径",
      "计算瓶颈",
      "更新正反向残量",
      "验证守恒与最小割",
    ],
    [
      {
        label: "撤销旧流",
        input: "早期增广占用了后续更优路径需要的边",
        expected: "反向残量边允许减少旧流并重新路由",
      },
      {
        label: "最小割证书",
        input: "算法结束后从 s 在残量图做可达搜索",
        expected: "不可到达 t，跨割容量等于当前流值",
      },
    ],
  ),
  p(
    "algs4-6.5",
    "06-context/reductions",
    "把上界、下界、线性规划、单纯形、指派和零和博弈放进问题变换与答案恢复合同",
    "T_A(n)=T_transform(n)+T_B(f(n))+T_decode(n)",
    "A 的每个合法实例都映射到 B，B 的解可恢复为 A 的解，并保持可行性与目标值关系",
    "只展示一个样例映射就宣称完成归约，或把 A≤B 的方向反过来推导 A 的困难性",
    "原实例、变换实例、规模膨胀、可行解映射、目标值、失败样例与逆向恢复结果",
    [
      "声明源问题和目标问题",
      "构造实例变换",
      "求解目标实例",
      "解码回原问题",
      "证明双向正确与成本",
    ],
    [
      {
        label: "排序归约",
        input: "把元素唯一性问题归约为排序后扫描相邻项",
        expected: "排序加线性扫描给出上界，并明确比较模型成本",
      },
      {
        label: "线性规划",
        input: "把零和博弈策略约束写成 LP",
        expected: "可行解对应混合策略，目标值对应可保证收益",
      },
    ],
  ),
  p(
    "algs4-6.6",
    "06-context/intractability",
    "区分 P、NP、NP-hard 与 NP-complete，并用多项式归约和证书验证指导工程取舍",
    "若 A ≤p B 且 B 有多项式算法，则 A 也有多项式算法；困难性证明使用相反推论方向",
    "NP 结论必须给出多项式长度证书和多项式验证器；NP-hard 必须保持归约方向",
    "从目标难题归约到已知难题却声称目标 NP-hard，或把尚未证明的 P≠NP 当作定理",
    "实例编码长度、证书、验证步骤、归约函数、规模界、yes/no 保持与小规模穷举预言机",
    [
      "定义判定问题",
      "写出证书验证器",
      "选择已知困难源问题",
      "构造多项式归约",
      "核对方向与工程策略",
    ],
    [
      {
        label: "证书验证",
        input: "给定 Hamilton 回路候选顶点序列",
        expected: "在线性或多项式时间检查每点一次及相邻边存在",
      },
      {
        label: "归约方向",
        input: "要证明新问题 X 困难，选择已知 NP-hard 问题 Y",
        expected: "必须构造 Y≤pX，而不是 X≤pY",
      },
    ],
  ),
];

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function flattenConcepts(unit) {
  return [
    ...new Set(
      unit.concepts
        .flatMap((alternatives) => alternatives)
        .map((value) => String(value).trim())
        .filter(Boolean),
    ),
  ];
}

function displayConcepts(unit) {
  return unit.concepts.map((alternatives) => {
    const chinese = alternatives.find((value) =>
      /[\u3400-\u9fff]/u.test(value),
    );
    return chinese ?? alternatives[0];
  });
}

function objectives(profile) {
  return `<Objectives>

- 能解释“${profile.officialTitle}”如何${profile.focus}
- 能逐项核对 ${profile.displayConcepts.join("、")}，并区分作者站内容与本页独立补充
- 能按“${profile.formula}”手算一个最小输入，逐步检查“${profile.invariant}”
- 能注入“${profile.fault}”，保存基线、首个分叉、恢复和同输入重放证据

</Objectives>`;
}

function sourceMapping(profile) {
  const sectionLabel = profile.officialTitle.replaceAll(".", "·");
  const nodes = profile.displayConcepts
    .map(
      (concept, index) =>
        `- **${index + 1}. ${concept}**：在本页通过“${profile.trace[index % profile.trace.length]}”连接解释、交互状态和练习验收。`,
    )
    .join("\n");

  return `## 来源、版次与独立重写边界

“${sectionLabel}”对应 Robert Sedgewick 与 Kevin Wayne 的 *Algorithms, Fourth Edition*（Addison-Wesley Professional，2011）。对这一节，[作者维护的本节页面](${profile.sourceUrl})提供与教材协同的浓缩正文、Java 实现、图示、习题和部分答案；[全书作者站](${OFFICIAL_HOME})给出 6 章、30 节的完整结构，并明确区分在线资料与纸质教材的学习用途。

“${sectionLabel}”的作者页公开经授权的在线节选和配套资源，但不是整本教材全文。因此“${sectionLabel}”采用 **independent-rewrite / authorized-sample**：中文讲解、推导与实验独立组织，不声称逐段翻译；算法名称、API 和示例边界以作者页、[官方代码索引](${OFFICIAL_CODE})及[官方勘误](${OFFICIAL_ERRATA})交叉核对。

### 作者站章节坐标：${profile.officialTitle}

${nodes}`;
}

function experimentBlock(profile, componentBase) {
  const conceptChecklist = profile.displayConcepts
    .map(
      (concept, index) =>
        `- **${concept}**：在实验 ${1 + (index % 3)} 中指出对应状态，并写出一个通过条件。`,
    )
    .join("\n");

  return `## 先预测，再操作三个本节实验

<Stepper>
  <Step title="1. 对象、操作与成本模型">
    先在“${profile.officialTitle}”的两个最小情境间切换，再逐项选择正式概念。预测“${profile.formula}”在哪个前提下成立，并解释输入、操作和证书之间的关系。

    <${componentBase}ModelLab />

  </Step>
  <Step title="2. 逐状态执行">
    按真实控制顺序推进，不跳过中间状态。每一步都要保存${profile.evidence}，并检查“${profile.invariant}”仍然成立。

    <${componentBase}TraceLab />

  </Step>
  <Step title="3. 反例、拒绝与恢复">
    固定同一输入，注入“${profile.fault}”。先定位首个分叉，再撤销故障并重放；最终结果相同但中间证据不同，仍不能判定恢复完成。

    <${componentBase}CounterexampleLab />

  </Step>
</Stepper>

## 本节易错边界与可重放合同

<Callout type="trap" title="${profile.officialTitle} 的首要反例">
  ${profile.fault}。它会破坏“${profile.invariant}”；应从${profile.evidence}中找首个不一致状态，而不是只看最终输出。
</Callout>

<Callout type="trap" title="复杂度结论必须带前提">
  “${profile.formula}”只对本节声明的输入表示、操作单位和算法版本成立。若字符表、图权、比较器、随机化、存储层次或预处理边界改变，必须重新推导，不能沿用旧数字。
</Callout>

<Callout type="trap" title="实现互比不等于独立正确">
  对“${profile.officialTitle}”而言，两个实现可能共享同一边界错误。交付前既要比较作者代码合同，也要用小规模朴素预言机或数学证书独立核对${profile.evidence}。
</Callout>

## 练习与答案

<Exercises>

**问题 1：目录与状态映射。** 对下列正式概念逐项指出正文解释、交互状态和练习证据：

${conceptChecklist}

<Answer>
  先以“${profile.officialTitle}”作者页为分母，逐项定位 ${profile.displayConcepts.join("、")}。每项都必须同时出现在解释段、组件模型与本题清单中；缺任一层就不能把该概念记为完整覆盖。
</Answer>

**问题 2：最小推演。** 怎样证明“${profile.formula}”不是孤立结论？

<Answer>
  选择“${profile.scenarios[0].label}”的输入：${profile.scenarios[0].input}。按 ${profile.trace.join(" → ")} 保存状态，并用“${profile.scenarios[0].expected}”核对方向；随后只改变一个变量，检查公式的前提和边界是否仍成立。
</Answer>

**问题 3：故障恢复。** 怎样证明“${profile.fault}”已经修复？

<Answer>
  保存${profile.evidence}作为正常基线；注入该故障并标记第一个违反“${profile.invariant}”的状态；撤销后用完全相同的输入、版本和随机种子重放。只有全部状态与独立预言机重新一致，才可发布修复结论。
</Answer>

</Exercises>`;
}

function wrapperSource(profile, componentBase) {
  const model = {
    unitId: profile.id,
    title: profile.officialTitle,
    focus: profile.focus,
    formula: profile.formula,
    invariant: profile.invariant,
    fault: profile.fault,
    evidence: profile.evidence,
    concepts: profile.concepts,
    trace: profile.trace,
    scenarios: profile.scenarios,
  };
  return `"use client";

import {
  Algs4SectionLab,
  type Algs4SectionModel,
} from "./official-algs4-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies Algs4SectionModel;

export function ${componentBase}ModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function ${componentBase}TraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function ${componentBase}CounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
`;
}

function cleanOriginal(body) {
  return body
    .replace(/^import\s+.*$/gmu, "")
    .replaceAll("（，", "（")
    .replaceAll("（）", "")
    .replace(/\n## 名词解释\s*$/u, "")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function remediatePage(profile) {
  const filePath = path.join(CONTENT_DIR, `${profile.path}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${profile.path}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  const componentImport = `import { ${componentBase}ModelLab, ${componentBase}TraceLab, ${componentBase}CounterexampleLab } from "@/components/mdx/${BOOK}/v2/${slug}";`;
  const sharedImport = `import {
  Objectives,
  Callout,
  Exercises,
  Answer,
  Stepper,
  Step,
  Attribution,
} from "@/components/mdx/mdx-components";`;
  const extraImport = EXTRA_IMPORTS[slug] ?? "";
  let body = parsed.content.trim();

  if (!body.includes("ALGORITHMS_4E_QUALITY_V2")) {
    const original = cleanOriginal(body);
    const reviewMatch = original.match(
      /\n## (?:本章回顾|小结|总结|回顾)\s*\n/u,
    );
    if (!reviewMatch?.index) throw new Error(`缺少总结插入点：${profile.path}`);
    const insertion = experimentBlock(profile, componentBase);
    const enrichedOriginal = `${original.slice(0, reviewMatch.index)}

${insertion}
${original.slice(reviewMatch.index)}`;
    body = `${componentImport}
${sharedImport}
${extraImport}

${objectives(profile)}

{/* ALGORITHMS_4E_QUALITY_V2 */}

${sourceMapping(profile)}

${enrichedOriginal}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle="Algorithms, Fourth Edition"
  adaptedUrl="${profile.sourceUrl}"
/>`;
  } else {
    body = body
      .replace(/<Objectives>[\s\S]*?<\/Objectives>/u, objectives(profile))
      .replace(
        /## 来源、版次与独立重写边界[\s\S]*?(?=\n## 从)/u,
        `${sourceMapping(profile)}\n`,
      )
      .replace(
        /## 先预测，再操作三个本节实验[\s\S]*?<\/Exercises>/u,
        experimentBlock(profile, componentBase),
      );
    if (
      extraImport &&
      !body.includes(extraImport.match(/from "([^"]+)"/u)?.[1] ?? extraImport)
    ) {
      body = body.replace(
        '} from "@/components/mdx/mdx-components";',
        `} from "@/components/mdx/mdx-components";\n${extraImport}`,
      );
    }
  }

  const data = {
    ...parsed.data,
    description: `${profile.officialTitle}覆盖 ${profile.displayConcepts.length} 个作者站正式主题，以章专属状态模型、逐步轨迹、反例恢复和独立预言机验收。`,
    sourceUrl: profile.sourceUrl,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
    officialUnitId: profile.id,
  };
  fs.writeFileSync(filePath, matter.stringify(body, data));
  fs.writeFileSync(
    path.join(COMPONENT_DIR, `${slug}.tsx`),
    wrapperSource(profile, componentBase),
  );
}

function updateManifest(document, manifest, profiles) {
  manifest.status = "verified-outline";
  manifest.sourceUrl = OFFICIAL_HOME;
  manifest.sourceKind =
    "official-author-booksite-condensed-excerpts-java-code-exercises-and-complete-section-map";
  manifest.sourceAccess = "authorized-sample";
  manifest.sourceMode = "independent-rewrite";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.verifiedAt = "2026-07-30";
  manifest.disclosureNote =
    "作者站公开浓缩正文、Java代码、图示与习题，但明确不是纸质教材全文；本课程为独立中文重写，不声称逐段翻译。";
  manifest.unitMappingEvidence = "quality/algorithms-4e-v2-profiles.json";
  manifest.factSourcePolicy =
    "章节边界、算法名称、API和配套实现以作者站、官方代码与勘误为准；推导和实验必须由最小输入、独立预言机与状态证书复核。";
  manifest.factSources = [
    {
      id: "algs4-home",
      title: "Algorithms, 4th Edition official author booksite",
      url: OFFICIAL_HOME,
    },
    {
      id: "algs4-code",
      title: "Algorithms, 4th Edition official Java code",
      url: OFFICIAL_CODE,
    },
    {
      id: "algs4-errata",
      title: "Algorithms, 4th Edition official errata",
      url: OFFICIAL_ERRATA,
    },
  ];
  manifest.coverage = {
    formalUnits: manifest.units.length,
    mappedUnits: profiles.length,
    ratio: profiles.length / manifest.units.length,
    platformPages: profiles.length,
  };
  manifest.metrics = {
    officialChapters: 6,
    officialSections: 30,
    platformPages: profiles.length,
    interactiveViews: profiles.length * 3,
  };
  manifest.visualImplementation = {
    viewsPerPage: 3,
    modes: ["model", "trace", "counterexample"],
    sharedComponent:
      "src/components/mdx/algorithms-4e/v2/official-algs4-lab.tsx",
  };
  const byId = new Map(profiles.map((profile) => [profile.id, profile]));
  for (const unit of manifest.units) {
    const profile = byId.get(unit.id);
    if (!profile) throw new Error(`正式单元缺少页面：${unit.id}`);
    unit.sourceUnitId = unit.id;
    unit.chapterPath = profile.path;
    unit.sourceMode = "independent-rewrite";
    unit.sourceAccess = "authorized-sample";
    unit.factSourceIds = ["algs4-home", "algs4-code", "algs4-errata"];
  }
  document.books[BOOK] = manifest;
}

const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = document.books?.[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
if (manifest.units.length !== 30)
  throw new Error(`应有 30 个正式单元，实际 ${manifest.units.length}`);
const unitById = new Map(manifest.units.map((unit) => [unit.id, unit]));

const profiles = PAGES.map((profile) => {
  const unit = unitById.get(profile.id);
  if (!unit) throw new Error(`manifest 缺少正式单元：${profile.id}`);
  const filePath = path.join(CONTENT_DIR, `${profile.path}.mdx`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const sourceUrl = String(parsed.data.sourceUrl ?? "").trim();
  if (!sourceUrl.startsWith("https://algs4.cs.princeton.edu/"))
    throw new Error(`章节来源不是官方作者站：${profile.path}`);
  return {
    ...profile,
    officialTitle: unit.title,
    sourceUrl,
    concepts: flattenConcepts(unit),
    displayConcepts: displayConcepts(unit),
  };
});

if (profiles.length !== 30)
  throw new Error(`应有 30 页，实际 ${profiles.length}`);

fs.mkdirSync(COMPONENT_DIR, { recursive: true });
for (const profile of profiles) remediatePage(profile);
updateManifest(document, manifest, profiles);
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(document, null, 2)}\n`);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sourceAccess: "authorized-sample",
      sourceMode: "independent-rewrite",
      officialChapters: 6,
      officialSections: 30,
      pages: profiles,
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify(
    {
      book: BOOK,
      pages: profiles.length,
      formalUnits: manifest.units.length,
      formalConceptGroups: manifest.units.reduce(
        (sum, unit) => sum + unit.concepts.length,
        0,
      ),
      visualViews: profiles.length * 3,
    },
    null,
    2,
  ),
);
