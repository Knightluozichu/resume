"use client";

import { MathGirlOfficialLab } from "./official-lab";

/**
 * <MglGraphTheoryDiagram>：图论核心概念图解（mgl-graph-theory 章）。
 *
 * 左侧：欧拉路径判定条件 + 哥尼斯堡七桥。
 * 右侧：哈密顿回路 + 树/生成树。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const modelCases = [
  {
    label: "选择图模型",
    fields: [
      ["顶点", "对象或状态"],
      ["边", "关系、转移或可达动作"],
      ["方向", "关系是否对称"],
      ["重边/自环", "问题是否允许"],
    ],
  },
  {
    label: "度与握手",
    fields: [
      ["无向度", "与顶点关联的边端数量"],
      ["自环", "对度贡献2"],
      ["握手定理", "Σdeg(v)=2|E|"],
      ["推论", "奇度顶点数必为偶数"],
    ],
  },
  {
    label: "连通性",
    fields: [
      ["路径", "相邻边连接的顶点序列"],
      ["连通分量", "互相可达的最大顶点集合"],
      ["孤立点", "度为0"],
      ["欧拉条件", "只要求非零度顶点同分量"],
    ],
  },
  {
    label: "表示合同",
    fields: [
      ["邻接表", "适合稀疏图"],
      ["邻接矩阵", "适合稠密图和矩阵运算"],
      ["重边", "需边ID或计数，不能用集合丢失"],
      ["修改", "算法是否允许破坏输入图"],
    ],
    alert:
      "数据结构必须能表达问题允许的重边、自环和方向；错误表示会在算法运行前就丢失信息。",
  },
] as const;

const traversalCases = [
  {
    label: "BFS",
    fields: [
      ["容器", "队列"],
      ["层次", "按距起点边数递增访问"],
      ["无权最短路", "首次发现即最短"],
      ["证据", "距离与父节点"],
    ],
  },
  {
    label: "DFS",
    fields: [
      ["容器", "递归栈或显式栈"],
      ["动作", "沿一条路深入再回退"],
      ["用途", "连通分量、环、拓扑结构"],
      ["证据", "发现/完成时刻与父边"],
    ],
  },
  {
    label: "树",
    fields: [
      ["等价一", "连通且无环"],
      ["等价二", "任意两点路径唯一"],
      ["等价三", "连通且边数n-1"],
      ["注意", "需在有限无向简单图语境"],
    ],
  },
  {
    label: "前四卷桥梁",
    fields: [
      ["第1卷", "二叉树与卡特兰递推"],
      ["第4卷", "比较决策树与随机漫步状态图"],
      ["SAT", "分配超立方体上的局部翻转"],
      ["矩阵", "邻接/转移矩阵记录一步关系"],
    ],
    alert:
      "“有n-1条边”本身不能推出是树；还要加连通或无环条件中的一个。",
  },
] as const;

const routeCases = [
  {
    label: "欧拉路径",
    fields: [
      ["目标", "每条边恰好一次"],
      ["连通", "所有非零度顶点同分量"],
      ["开路径", "恰有2个奇度顶点"],
      ["回路", "奇度顶点为0"],
    ],
  },
  {
    label: "哈密顿回路",
    fields: [
      ["目标", "每个顶点恰好一次并回起点"],
      ["一般判定", "NP完全"],
      ["区别", "不能用顶点度奇偶直接判定"],
      ["证据", "给出顶点排列并检查边"],
    ],
  },
  {
    label: "最小生成树",
    fields: [
      ["目标", "连接全部顶点且总边权最小"],
      ["Kruskal", "按边权并用并查集避环"],
      ["Prim", "从已选集合跨割扩展"],
      ["基础", "割性质与环性质"],
    ],
  },
  {
    label: "TSP边界",
    fields: [
      ["目标", "最短哈密顿回路"],
      ["一般情况", "NP困难"],
      ["Christofides", "仅度量对称TSP有1.5近似保证"],
      ["启发式", "可能好用但没有同等最坏保证"],
    ],
    alert:
      "近似比必须连同问题条件一起声明；Christofides的1.5保证不能用于任意非度量或非对称TSP。",
  },
] as const;

export function MglGraphTheoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="图论核心概念图解。左侧欧拉路径：哥尼斯堡七桥的 4 个顶点度数 3,3,3,5 全是奇数，4 个奇度顶点不满足条件（需 0 或 2 个），故不存在欧拉路径。右侧上方哈密顿回路：经过每个顶点一次（NP 完全问题）。右侧下方树：n 个顶点 n-1 条边的连通无环图。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>图论：欧拉、哈密顿与树</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>欧拉过边　哈密顿过点　树是无环连通图</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：欧拉路径 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>欧拉路径（过每条边一次）</text>

          {/* 哥尼斯堡简化图 */}
          <circle cx="120" cy="130" r="16" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x="120" y="134" textAnchor="middle" fontSize="11" fill={accent}>A</text>
          <circle cx="240" cy="130" r="16" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x="240" y="134" textAnchor="middle" fontSize="11" fill={accent}>B</text>
          <circle cx="120" cy="200" r="16" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x="120" y="204" textAnchor="middle" fontSize="11" fill={accent}>C</text>
          <circle cx="240" cy="200" r="16" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1.5" />
          <text x="240" y="204" textAnchor="middle" fontSize="11" fill={danger}>D</text>

          {/* 边 */}
          <line x1="136" y1="130" x2="224" y2="130" stroke={border} strokeWidth="1.2" />
          <line x1="136" y1="125" x2="224" y2="125" stroke={border} strokeWidth="1.2" />
          <line x1="120" y1="146" x2="120" y2="184" stroke={border} strokeWidth="1.2" />
          <line x1="240" y1="146" x2="240" y2="184" stroke={border} strokeWidth="1.2" />
          <line x1="240" y1="146" x2="136" y2="184" stroke={border} strokeWidth="1.2" />
          <line x1="240" y1="146" x2="136" y2="190" stroke={border} strokeWidth="1.2" />
          <line x1="240" y1="146" x2="136" y2="196" stroke={border} strokeWidth="1.2" />

          <text x="60" y="250" fontSize="11" fontWeight="700" fill={danger}>哥尼斯堡七桥</text>
          <text x="60" y="268" fontSize="11" fill={primary}>度数: A=3, B=3, C=3, D=5</text>
          <text x="60" y="286" fontSize="11" fill={danger}>4 个奇度顶点 → 不存在！</text>

          <rect x="48" y="302" width="256" height="60" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="322" fontSize="11" fontWeight="700" fill={success}>非零度顶点连通，并且</text>
          <text x="64" y="340" fontSize="11" fill={primary}>0 个奇度 → 欧拉回路</text>
          <text x="64" y="356" fontSize="11" fill={primary}>2 个奇度 → 欧拉开路径</text>

          {/* ===== 右侧：哈密顿 + 树 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>哈密顿回路（过每点一次）</text>

          {/* 五边形 */}
          <polygon points="500,130 560,130 580,170 530,200 480,170" fill="none" stroke={warning} strokeWidth="1.5" />
          {[{x:500,y:130},{x:560,y:130},{x:580,y:170},{x:530,y:200},{x:480,y:170}].map((v, i) => (
            <g key={i}>
              <circle cx={v.x} cy={v.y} r="10" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.5" />
              <text x={v.x} y={v.y + 4} textAnchor="middle" fontSize="11" fill={warning}>{i+1}</text>
            </g>
          ))}
          <text x="530" y="226" textAnchor="middle" fontSize="11" fill={secondary}>判定 NP 完全 · TSP 是优化版</text>

          {/* 树 */}
          <text x="530" y="252" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>树（无环连通图）</text>

          <line x1="530" y1="268" x2="500" y2="292" stroke={border} strokeWidth="1.2" />
          <line x1="530" y1="268" x2="560" y2="292" stroke={border} strokeWidth="1.2" />
          <line x1="500" y1="292" x2="480" y2="320" stroke={border} strokeWidth="1.2" />
          <line x1="500" y1="292" x2="520" y2="320" stroke={border} strokeWidth="1.2" />

          <circle cx="530" cy="268" r="12" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <circle cx="500" cy="292" r="12" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <circle cx="560" cy="292" r="12" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <circle cx="480" cy="320" r="10" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <circle cx="520" cy="320" r="10" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />

          <text x="530" y="348" textAnchor="middle" fontSize="11" fill={primary}>n 个顶点 → n-1 条边</text>
          <text x="530" y="366" textAnchor="middle" fontSize="11" fill={secondary}>任意两点路径唯一</text>

          <rect x="360" y="380" width="312" height="22" rx="6" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x="516" y="395" textAnchor="middle" fontSize="11" fill={secondary}>MST: Kruskal/Prim 求最小生成树</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        欧拉路径过每条边一次，要求所有非零度顶点连通且奇度顶点为0或2个；哈密顿回路过每点一次。树是连通无环图。
      </figcaption>
    </figure>
  );
}

export function MglGraphModelLab() {
  return (
    <MathGirlOfficialLab
      cases={modelCases}
      caption="建图先决定顶点、边、方向、重边和自环；握手定理与连通分量随后才能在正确模型上成立。"
      tone="cyan"
    />
  );
}

export function MglTraversalTreeLab() {
  return (
    <MathGirlOfficialLab
      cases={traversalCases}
      caption="BFS与DFS交付不同遍历证据；树的多个等价刻画还连接第1卷卡特兰结构与第4卷决策树。"
      tone="amber"
    />
  );
}

export function MglEulerHamiltonMstLab() {
  return (
    <MathGirlOfficialLab
      cases={routeCases}
      caption="欧拉问题过边、哈密顿问题过点、生成树连接全体；三者的判定难度和证明工具完全不同。"
      tone="violet"
    />
  );
}
