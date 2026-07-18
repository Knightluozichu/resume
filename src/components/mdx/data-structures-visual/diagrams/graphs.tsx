"use client";

import { DsvOfficialLab } from "./official-lab";

const representationCases = [
  { label: "邻接矩阵", fields: [["空间", "Theta(V^2)"], ["优势", "判边Theta(1)，稠密图与Floyd友好"], ["边界", "无边sentinel不能和合法权值混淆"]] },
  { label: "邻接表", fields: [["空间", "Theta(V+E)"], ["优势", "枚举邻边高效，稀疏图常用"], ["边界", "判特定边依赖degree，需定义重复边顺序"]] },
  { label: "十字/多重表", fields: [["有向图", "十字链表同时串入边与出边"], ["无向图", "邻接多重表让一条边对象挂到两端"], ["优势", "边更新与双向枚举更直接"]] },
  { label: "边集数组", fields: [["表示", "连续保存(u,v,w)边记录"], ["优势", "Kruskal排序/扫描简单，局部性好"], ["边界", "邻接查询需索引或扫描"]], alert: "Representation由主要操作和密度选择；同一图可同时维护边集与邻接索引，但更新必须原子保持一致。" },
] as const;

const traversalCases = [
  { label: "DFS", fields: [["frontier", "递归调用栈或显式LIFO栈"], ["行为", "沿一条未访问邻边深入再回溯"], ["用途", "连通分量、环、拓扑/桥等基础"]] },
  { label: "BFS", fields: [["frontier", "FIFO队列"], ["行为", "按无权距离层次扩展"], ["用途", "无权最短边数、层序与传播"]] },
  { label: "Disconnected", fields: [["外层", "按固定顶点顺序启动未访问顶点"], ["结果", "生成DFS/BFS森林与component id"], ["证据", "每个顶点恰访问一次"]] },
  { label: "Determinism", fields: [["问题", "邻接枚举顺序改变合法遍历序列"], ["策略", "固定插入顺序或排序邻接项"], ["测试", "验证覆盖/父子/距离，不锁死未声明顺序"]], alert: "Visited必须在入frontier时标记；若出队/出栈才标记，顶点可能被重复加入并放大空间。" },
] as const;

const algorithmCases = [
  { label: "MST", fields: [["目标", "连通无向带权图中选V-1边且总权最小"], ["Prim", "从一个树集合反复选跨cut最轻边"], ["Kruskal", "全局按权排序，用DSU拒绝成环"]] },
  { label: "Shortest", fields: [["Dijkstra", "单源、边权非负，逐次settle最小暂定距离"], ["Floyd", "全源，动态规划允许中间顶点集合"], ["拒绝", "Dijkstra不能静默接受负边"]] },
  { label: "Topo", fields: [["目标", "DAG顶点线性序满足每条u->v中u在v前"], ["Kahn", "反复取入度0顶点并删除出边"], ["失败", "输出少于V说明存在有向环"]] },
  { label: "Critical", fields: [["模型", "AOE网中边是活动、顶点是事件"], ["计算", "ve正向最大，vl逆向最小，e==l为关键活动"], ["结果", "项目最短工期与零余量路径"]], alert: "MST最小化连接总成本，shortest path最小化指定路径，critical path寻找决定工期的最长依赖链；三者目标不能互换。" },
] as const;

export function DsvGraphRepresentationLab() {
  return <DsvOfficialLab cases={representationCases} caption="邻接矩阵、邻接表、十字/多重表与边集数组服务不同图操作。" tone="cyan" />;
}

export function DsvGraphTraversalLab() {
  return <DsvOfficialLab cases={traversalCases} caption="DFS、BFS、非连通外层与确定性策略共同定义完整遍历。" tone="violet" />;
}

export function DsvGraphAlgorithmLab() {
  return <DsvOfficialLab cases={algorithmCases} caption="生成树、最短路、拓扑序与关键路径解决四类不同优化/约束问题。" tone="emerald" />;
}
