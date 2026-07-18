"use client";

import { DsvOfficialLab } from "./official-lab";

const methodCases = [
  { label: "顺序", fields: [["前置", "无序也可"], ["成本", "最坏Theta(n)，首命中可早停"], ["适用", "小表、一次查询、昂贵预处理不划算"]] },
  { label: "折半", fields: [["前置", "按同一比较器有序且支持随机访问"], ["成本", "Theta(log n)"], ["适用", "静态有序数组与lower_bound"]] },
  { label: "插值", fields: [["前置", "numeric key近似均匀分布"], ["成本", "分布好时快，最坏Theta(n)"], ["风险", "重复/极端分布、除零与算术溢出"]] },
  { label: "斐波那契", fields: [["前置", "有序随机访问"], ["策略", "按Fibonacci分割，只用加减比较索引"], ["现实", "理论折半变体，需基准证明收益"]], alert: "有序性、随机访问和key分布是算法契约；不验证前置条件会得到快速但错误的结果。" },
] as const;

const treeCases = [
  { label: "BST", fields: [["不变量", "左key小于根，右key大于根（重复策略另定）"], ["高度", "平均可好，最坏斜树Theta(n)"], ["删除", "叶/单孩子/双孩子三类"]] },
  { label: "AVL", fields: [["不变量", "BST + 每结点balance factor为-1/0/1"], ["修复", "LL/RR单旋，LR/RL双旋"], ["收益", "高度Theta(log n)，更新维护height"]] },
  { label: "B树", fields: [["不变量", "多路平衡，key与child数量有上下界"], ["修复", "插入split，删除borrow/merge"], ["收益", "高fanout降低外存I/O层数"]] },
  { label: "B+树", fields: [["不变量", "记录/指针在叶，内部key作导航，叶有序相连"], ["收益", "范围扫描顺序，fanout更高"], ["验证", "separator、leaf chain与层高一致"]], alert: "AVL优化内存比较次数，B/B+树优化块I/O；它们的node容量和成本模型不同。" },
] as const;

const hashCases = [
  { label: "直接定址", fields: [["映射", "address = key或简单线性变换"], ["优势", "无冲突、真正常数访问"], ["限制", "key universe需小且稠密"]] },
  { label: "开放定址", fields: [["映射", "冲突后按probe sequence找其它slot"], ["删除", "使用tombstone，不能直接EMPTY断链"], ["限制", "load factor接近1时probe急剧增长"]] },
  { label: "再散列", fields: [["映射", "第二hash产生probe step"], ["要求", "step与capacity互素以覆盖全部slot"], ["收益", "减轻primary clustering"]] },
  { label: "链地址", fields: [["映射", "每bucket保存冲突key列表"], ["删除", "链内删除不需tombstone"], ["限制", "分配/指针开销与恶意碰撞"]], alert: "平均O(1)依赖hash分布、load factor、扩容与攻击模型；最坏冲突仍可退化到Theta(n)。" },
] as const;

export function DsvSearchMethodLab() {
  return <DsvOfficialLab cases={methodCases} caption="顺序、折半、插值与斐波那契查找依赖不同输入前提。" tone="cyan" />;
}

export function DsvSearchTreeLab() {
  return <DsvOfficialLab cases={treeCases} caption="BST、AVL、B树与B+树以不同平衡和存储模型支持动态查找。" tone="violet" />;
}

export function DsvHashConflictLab() {
  return <DsvOfficialLab cases={hashCases} caption="直接定址、开放定址、再散列与链地址展示映射和冲突策略。" tone="emerald" />;
}
