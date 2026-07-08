import type { ReviewQuestion } from "./types";

/** 有向图 复习题 */
export const al4GraphsDirectedQuestions: ReviewQuestion[] = [
  {
    id: "al4-graphs-directed-1",
    chapter: "al4-graphs-directed",
    level: 1,
    question: "拓扑排序的两种实现方法？",
    answer: "DFS后序逆序：DFS遍历后序逆序即拓扑序。Kahn算法：反复找入度0的顶点输出并删除出边。",
    tags: ["拓扑排序"],
  },
  {
    id: "al4-graphs-directed-2",
    chapter: "al4-graphs-directed",
    level: 2,
    question: "如何判断有向图是否有环？",
    answer: "DFS遇到递归栈中节点说明有环。或Kahn算法最后有顶点剩余则有环。有环不能拓扑排序。",
    tags: ["环检测"],
  },
  {
    id: "al4-graphs-directed-3",
    chapter: "al4-graphs-directed",
    level: 3,
    question: "Kosaraju算法求SCC的步骤？",
    answer: "1）对反向图G^R做DFS记后序；2）按后序逆序对G做DFS，每棵DFS树是一个SCC。两遍DFS O(V+E)。",
    tags: ["Kosaraju", "SCC"],
  },
  {
    id: "al4-graphs-directed-4",
    chapter: "al4-graphs-directed",
    level: 4,
    question: "用有向图算法设计编译器依赖分析系统。",
    answer: "源文件=顶点，import=有向边。拓扑排序定编译顺序；环检测找循环依赖；SCC找互相依赖的模块；反向图可达性做增量编译。",
    tags: ["综合", "有向图", "编译器"],
  },
];
