"use client";

import { DsvOfficialLab } from "./official-lab";

const representationCases = [
  { label: "按位读取", fields: [["顺序表", "address = base + i * element_size，Theta(1)"], ["单链表", "从head沿next走i步，Theta(n)"], ["选择", "随机访问频繁优先连续表示"]] },
  { label: "中间插入", fields: [["顺序表", "先扩容/检查容量，再移动后缀，Theta(n)"], ["单链表", "定位Theta(n)，已持有前驱时改两条链接Theta(1)"], ["选择", "定位成本不能从插入成本中偷掉"]] },
  { label: "内存局部性", fields: [["顺序表", "元素连续，cache和批量遍历友好"], ["单链表", "结点分散且每项带链接开销"], ["选择", "遍历密集常由顺序表胜出"]] },
  { label: "容量/稳定性", fields: [["顺序表", "固定容量会满，动态扩容可能移动全部元素"], ["单链表", "逐结点分配，已有结点地址通常稳定"], ["选择", "同时考虑分配失败与引用有效期"]], alert: "“链表插入O(1)”只在已持有正确前驱且不计分配时成立；按位置插入通常仍需线性定位。" },
] as const;

const mutationCases = [
  { label: "Locate", fields: [["前置", "0 <= index <= length"], ["动作", "从头结点/首元结点走到目标前驱"], ["证据", "步数、目标前驱与未修改状态"]] },
  { label: "Insert", fields: [["前置", "新结点已成功分配且前驱有效"], ["动作", "node->next = prev->next; prev->next = node"], ["证据", "length+1，相对顺序保持，可达结点无环"]] },
  { label: "Erase", fields: [["前置", "index < length且目标可达"], ["动作", "victim=prev->next; prev->next=victim->next"], ["证据", "length-1，返回/释放victim策略明确"]] },
  { label: "Destroy", fields: [["前置", "list拥有所有结点或有明确借用策略"], ["动作", "保存next后逐结点释放，最后重置head/length"], ["证据", "0个可达结点，重复destroy安全"]], alert: "指针更新顺序是契约的一部分。先覆盖prev->next再保存victim/next会丢失后缀并造成泄漏。" },
] as const;

const variantCases = [
  { label: "静态链表", fields: [["链接", "数组下标cursor代替原生指针"], ["优势", "固定池、可序列化、无指针环境可用"], ["风险", "free-list与used-list必须互斥且无环"]] },
  { label: "循环单链表", fields: [["链接", "tail->next指向head/头结点"], ["优势", "从任意结点循环遍历，tail可O(1)接首尾"], ["风险", "遍历终止按回到起点，不按NULL"]] },
  { label: "双向链表", fields: [["链接", "每结点同时有prev与next"], ["优势", "已知结点可双向移动和O(1)删除"], ["风险", "四条邻接关系必须成对更新"]] },
  { label: "循环双链表", fields: [["链接", "sentinel首尾相接，空表也有稳定边界"], ["优势", "插入删除可统一，无NULL端点分支"], ["风险", "sentinel不计入length且永不作为数据返回"]], alert: "变体改变的是表示与操作成本，不改变线性表的有限有序序列语义。" },
] as const;

export function DsvLinearRepresentationLab() {
  return <DsvOfficialLab cases={representationCases} caption="顺序表与单链表在读取、插入、局部性和容量上的成本不同。" tone="cyan" />;
}

export function DsvLinkMutationLab() {
  return <DsvOfficialLab cases={mutationCases} caption="定位、插入、删除和销毁必须保持可达性、顺序、长度与owner不变量。" tone="rose" />;
}

export function DsvListVariantLab() {
  return <DsvOfficialLab cases={variantCases} caption="静态、循环、双向与循环双向表示解决不同边界和导航问题。" tone="emerald" />;
}
