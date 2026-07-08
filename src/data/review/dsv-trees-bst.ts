import type { ReviewQuestion } from "./types";

/** 树与二叉搜索树 复习题 */
export const dsvTreesBstQuestions: ReviewQuestion[] = [
  {
    id: "dsv-trees-bst-1",
    chapter: "dsv-trees-bst",
    level: 1,
    question: "对二叉搜索树做中序遍历，得到的序列有什么特点？",
    answer: "升序排列。中序遍历「左→根→右」+ BST「左<根<右」= 天然升序。这是 BST 最重要的特性。",
    tags: ["BST", "中序遍历"],
  },
  {
    id: "dsv-trees-bst-2",
    chapter: "dsv-trees-bst",
    level: 2,
    question: "按顺序 1,2,3,4,5 插入 BST，树会退化成什么？",
    answer: "向右倾斜的链。每次插入都比根大，只能往右走，最终退化为向右的链，查找 O(n)。需要平衡树解决。",
    tags: ["BST", "退化"],
  },
  {
    id: "dsv-trees-bst-3",
    chapter: "dsv-trees-bst",
    level: 3,
    question: "BST 删除有两个子节点的节点时，用什么值替换？",
    answer: "右子树的最小值（后继）。用右子树的最小值（或左子树的最大值）替换被删节点的值，然后删除那个后继节点，BST 性质不变。",
    tags: ["BST", "删除操作"],
  },
  {
    id: "dsv-trees-bst-4",
    chapter: "dsv-trees-bst",
    level: 4,
    question: "前序遍历的第一个节点是什么？",
    answer: "根节点。前序遍历顺序是「根→左→右」，所以第一个访问的总是根节点。",
    tags: ["前序遍历", "根节点"],
  },
];
