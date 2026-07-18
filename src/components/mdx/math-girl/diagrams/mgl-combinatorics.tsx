"use client";

import { MathGirlOfficialLab } from "./official-lab";

/**
 * <MglCombinatoricsDiagram>：组合计数核心概念图解（mgl-combinatorics 章）。
 *
 * 左侧：排列 vs 组合的对比示意。
 * 右侧：帕斯卡三角形 + 容斥原理图解。
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

const countingCases = [
  {
    label: "先定义对象",
    fields: [
      ["选择对象", "元素、位置、路径或结构"],
      ["相同标准", "哪些结果视为同一个"],
      ["约束", "顺序、重复、边界与合法性"],
      ["输出", "有限集合的基数"],
    ],
  },
  {
    label: "加法原理",
    fields: [
      ["结构", "互斥分类"],
      ["形式", "|A∪B|=|A|+|B|"],
      ["前提", "A与B不相交"],
      ["不互斥", "转用容斥"],
    ],
  },
  {
    label: "乘法原理",
    fields: [
      ["结构", "分阶段选择"],
      ["形式", "各步选择数相乘"],
      ["前提", "每个前缀下后续数需明确"],
      ["变化", "依赖前缀时用求和树"],
    ],
  },
  {
    label: "排列与组合",
    fields: [
      ["排列", "选择并排序，顺序重要"],
      ["组合", "只选子集，顺序不重要"],
      ["关系", "P(n,k)=C(n,k)k!"],
      ["测试", "交换两元素是否得到新结果"],
    ],
    alert:
      "公式之前必须先说明结果的同一性标准；同一个故事换一种“视为相同”规则，计数答案就会改变。",
  },
] as const;

const structureCases = [
  {
    label: "二项式系数",
    fields: [
      ["对象", "n个位置中选择k个"],
      ["递推", "C(n,k)=C(n-1,k-1)+C(n-1,k)"],
      ["边界", "C(n,0)=C(n,n)=1"],
      ["对称", "C(n,k)=C(n,n-k)"],
    ],
  },
  {
    label: "格路径",
    fields: [
      ["路径", "r步右移与u步上移"],
      ["总步数", "r+u"],
      ["计数", "C(r+u,r)"],
      ["受限路径", "反射原理或动态规划"],
    ],
  },
  {
    label: "卡特兰结构",
    fields: [
      ["对象", "合法括号、满二叉树、不过界路径"],
      ["递推", "Cn+1=ΣCiCn-i"],
      ["闭式", "C(2n,n)/(n+1)"],
      ["关键", "先证明对象间双射"],
    ],
  },
  {
    label: "卷积与分拆",
    fields: [
      ["卷积", "按总规模n枚举拆分i与n-i"],
      ["生成函数", "乘法系数自动完成卷积"],
      ["分拆", "整数写成正整数和且忽略顺序"],
      ["区别", "组合、组成与分拆不可混同"],
    ],
    alert:
      "多个对象拥有同一个卡特兰公式，不代表可以直接套用；必须先给出递推、双射或生成函数证明。",
  },
] as const;

const verifyCases = [
  {
    label: "容斥",
    fields: [
      ["两集合", "|A∪B|=|A|+|B|-|A∩B|"],
      ["多集合", "按交集阶数交替加减"],
      ["目的", "纠正重复计数"],
      ["风险", "漏掉高阶交集"],
    ],
  },
  {
    label: "动态规划",
    fields: [
      ["状态", "规模与剩余约束"],
      ["转移", "按最后一步分类"],
      ["初值", "最小合法结构"],
      ["验收", "与小规模穷举对照"],
    ],
  },
  {
    label: "概率桥梁",
    fields: [
      ["等可能", "概率=有利结果数/总结果数"],
      ["路径概率", "路径数还要乘每步概率"],
      ["非均匀", "不能只比较数量"],
      ["第4卷", "随机漫步与3-SAT路径下界"],
    ],
  },
  {
    label: "复杂度桥梁",
    fields: [
      ["元素对", "C(n,2)=Θ(n²)"],
      ["子集", "2ⁿ"],
      ["全排列", "n!"],
      ["注意", "候选数不自动等于实际运行时间"],
    ],
    alert:
      "组合数量给出搜索空间规模；算法是否访问全部候选、每个候选花多少时间，还要单独分析。",
  },
] as const;

export function MglCombinatoricsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="组合计数图解。左侧排列 vs 组合：从 ABCDE 中选 3 个，排列 P(5,3)=60（顺序重要），组合 C(5,3)=10（顺序不重要）。右上帕斯卡三角形前 5 行，标注递推关系 C(n,k)=C(n-1,k-1)+C(n-1,k)。右下容斥原理：|A∪B|=|A|+|B|-|A∩B|。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>排列、组合与容斥</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>顺序重要→排列　顺序不重要→组合</text>

          <line x1="320" y1="74" x2="320" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：排列 vs 组合 ===== */}
          <text x="160" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>从 5 人选 3 人</text>

          {/* 排列 */}
          <rect x="48" y="108" width="256" height="68" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="128" fontSize="12" fontWeight="700" fill={accent}>排列 P(5,3) = 60</text>
          <text x="64" y="148" fontSize="11" fill={primary}>排成一排（顺序重要）</text>
          <text x="64" y="166" fontSize="11" fontFamily="monospace" fill={secondary}>ABC ≠ BAC → 5×4×3 = 60</text>

          {/* 组合 */}
          <rect x="48" y="188" width="256" height="68" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="208" fontSize="12" fontWeight="700" fill={success}>组合 C(5,3) = 10</text>
          <text x="64" y="228" fontSize="11" fill={primary}>组成一组（顺序不重要）</text>
          <text x="64" y="246" fontSize="11" fontFamily="monospace" fill={secondary}>{'{A,B,C}'} = {'{B,C,A}'} → 60/3! = 10</text>

          {/* 关系 */}
          <text x="176" y="280" textAnchor="middle" fontSize="11" fill={warning}>P(n,k) = C(n,k) × k!</text>

          {/* ===== 右上：帕斯卡三角形 ===== */}
          <text x="520" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>帕斯卡三角形</text>
          {[
            { row: [1], y: 112 },
            { row: [1, 1], y: 130 },
            { row: [1, 2, 1], y: 148 },
            { row: [1, 3, 3, 1], y: 166 },
            { row: [1, 4, 6, 4, 1], y: 184 },
          ].map((r, ri) => (
            r.row.map((val, ci) => (
              <g key={`${ri}-${ci}`}>
                <text x={520 + (ci - (r.row.length - 1) / 2) * 28} y={r.y} textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="600" fill={val === 6 ? accent : primary}>{val}</text>
              </g>
            ))
          ))}
          <text x="520" y="208" textAnchor="middle" fontSize="10" fill={secondary}>C(n,k) = C(n-1,k-1) + C(n-1,k)</text>

          {/* ===== 右下：容斥原理 ===== */}
          <rect x="340" y="224" width="332" height="120" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="506" y="244" textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>容斥原理</text>

          {/* 两个重叠圆 */}
          <circle cx="440" cy="296" r="36" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" />
          <circle cx="500" cy="296" r="36" fill={danger} fillOpacity="0.15" stroke={danger} strokeWidth="1.5" />
          <text x="420" y="300" textAnchor="middle" fontSize="11" fill={accent}>|A|</text>
          <text x="520" y="300" textAnchor="middle" fontSize="11" fill={danger}>|B|</text>
          <text x="470" y="300" textAnchor="middle" fontSize="10" fill={primary}>∩</text>

          <text x="506" y="338" textAnchor="middle" fontSize="12" fontFamily="monospace" fill={primary}>|A∪B| = |A| + |B| - |A∩B|</text>

          {/* 底部 */}
          <rect x="48" y="360" width="624" height="36" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="383" textAnchor="middle" fontSize="11" fill={secondary}>
            搜索空间尺度：C(n,2)=Θ(n²)　2ⁿ=全部子集　n!=全部排列
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        排列顺序重要 P(n,k)=n!/(n-k)!，组合顺序不重要 C(n,k)=n!/(k!(n-k)!)。帕斯卡三角形展示二项式系数的递推关系。容斥原理交替加减交集计算并集大小。
      </figcaption>
    </figure>
  );
}

export function MglCountingPrincipleLab() {
  return (
    <MathGirlOfficialLab
      cases={countingCases}
      caption="计数先定义对象与同一性标准，再选择互斥分类、分步选择、排列或组合。"
      tone="cyan"
    />
  );
}

export function MglCombinatorialStructuresLab() {
  return (
    <MathGirlOfficialLab
      cases={structureCases}
      caption="二项式系数、格路径、卡特兰结构、卷积与分拆在第1卷形成一条从递推到生成函数的主线。"
      tone="amber"
    />
  );
}

export function MglCountingVerificationLab() {
  return (
    <MathGirlOfficialLab
      cases={verifyCases}
      caption="容斥纠正重复，动态规划按状态复用计数；概率与复杂度都必须在计数结果上再补一层假设。"
      tone="violet"
    />
  );
}
