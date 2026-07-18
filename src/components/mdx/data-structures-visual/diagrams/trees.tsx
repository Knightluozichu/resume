"use client";

import { DsvOfficialLab } from "./official-lab";

const propertyCases = [
  { label: "普通树", fields: [["关系", "除根外每结点唯一父结点，可有任意多个孩子"], ["度/深度", "结点孩子数为度；最大层次为深度"], ["表示", "双亲数组、孩子表、孩子兄弟"]] },
  { label: "二叉树", fields: [["关系", "每结点至多有左、右两个有序子树"], ["区别", "只有一个孩子也必须区分左或右"], ["表示", "顺序索引或left/right二叉链表"]] },
  { label: "满二叉树", fields: [["形状", "每层达到最大结点数"], ["深度k结点", "2^k - 1"], ["叶子", "全部位于同一最深层"]] },
  { label: "完全二叉树", fields: [["形状", "按满树层序编号，结点占据前n个位置"], ["优势", "父子可用数组下标计算"], ["应用", "堆和优先队列"]], alert: "满二叉树一定完全；完全二叉树不一定满。左/右子树有序，不能把单孩子随意换边。" },
] as const;

const traversalCases = [
  { label: "前序", fields: [["顺序", "Root -> Left -> Right"], ["用途", "复制结构、前缀表达、序列化带空标记"], ["示例", "A B D E C F"]] },
  { label: "中序", fields: [["顺序", "Left -> Root -> Right"], ["用途", "二叉搜索树得到有序key"], ["示例", "D B E A F C"]] },
  { label: "后序", fields: [["顺序", "Left -> Right -> Root"], ["用途", "先处理孩子再释放/汇总父结点"], ["示例", "D E B F C A"]] },
  { label: "层序", fields: [["顺序", "按深度从浅到深、同层从左到右"], ["结构", "使用FIFO队列"], ["示例", "A B C D E F"]], alert: "遍历顺序是访问Root相对Left/Right子树的位置；递归代码只差visit所在位置，但输出语义完全不同。" },
] as const;

const advancedCases = [
  { label: "线索化", fields: [["复用", "空left/right改存前驱/后继"], ["标记", "ltag/rtag区分child与thread"], ["收益", "中序遍历可不递归/不显式栈"]] },
  { label: "树→二叉树", fields: [["规则", "first child作left，next sibling作right"], ["含义", "孩子兄弟表示天然成为二叉树"], ["验证", "还原后父子和兄弟顺序不变"]] },
  { label: "森林→二叉树", fields: [["规则", "每棵树先转换，根之间按right连接"], ["逆变换", "断开根right链并恢复孩子兄弟"], ["遍历", "森林先根/后根对应二叉前/中序关系"]] },
  { label: "哈夫曼", fields: [["构建", "反复合并两个最小权结点"], ["目标", "最小化WPL = sum(weight * depth)"], ["编码", "左右边标0/1，叶路径形成前缀码"]], alert: "哈夫曼编码的符号必须放在叶结点；没有任何码字是另一个码字前缀，才能无分隔解码。" },
] as const;

export function DsvTreePropertyLab() {
  return <DsvOfficialLab cases={propertyCases} caption="普通树、二叉树、满二叉树和完全二叉树具有不同形状约束。" tone="cyan" />;
}

export function DsvTraversalOrderLab() {
  return <DsvOfficialLab cases={traversalCases} caption="前序、中序、后序与层序改变访问根结点的时机和所需控制结构。" tone="violet" />;
}

export function DsvTreeAdvancedLab() {
  return <DsvOfficialLab cases={advancedCases} caption="线索化、树/森林转换与哈夫曼编码复用树结构解决导航和压缩问题。" tone="emerald" />;
}
