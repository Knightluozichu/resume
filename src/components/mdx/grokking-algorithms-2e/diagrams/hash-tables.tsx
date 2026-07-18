"use client";

import { GrokkingAlgorithmsLab } from "./official-lab";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const useCaseCases = [
  {
    label: "商品价格",
    fields: [
      ["键", "商品名apple"],
      ["值", "价格0.67"],
      ["操作", "按键查值"],
      ["收益", "避免逐行搜索价目表"],
    ],
  },
  {
    label: "防重复",
    fields: [
      ["键", "投票者ID"],
      ["值", "已投票标记"],
      ["操作", "先查成员资格再写入"],
      ["边界", "并发时还需原子性约束"],
    ],
  },
  {
    label: "缓存",
    fields: [
      ["键", "请求URL或查询参数"],
      ["值", "已计算响应"],
      ["命中", "直接返回缓存值"],
      ["未命中", "计算后写入并设置失效策略"],
    ],
  },
  {
    label: "DNS查找",
    fields: [
      ["输入", "域名example.com"],
      ["输出", "一个或多个资源记录"],
      ["抽象", "名称到记录的查找"],
      ["注意", "真实DNS还含层级、缓存和网络协议"],
    ],
  },
] as const;

const collisionCases = [
  {
    label: "链地址法",
    fields: [
      ["槽位", "保存多个键值对的桶"],
      ["冲突", "追加或更新桶内条目"],
      ["查找", "先定位槽位，再比较键"],
      ["装载因子", "可以大于1"],
    ],
  },
  {
    label: "开放寻址",
    fields: [
      ["槽位", "每格直接保存条目"],
      ["冲突", "按探测序列寻找其他格"],
      ["删除", "常需墓碑等特殊标记"],
      ["装载因子", "必须小于1"],
    ],
  },
  {
    label: "同键更新",
    fields: [
      ["输入", "已有键apple"],
      ["必要动作", "比较完整键而非只比哈希"],
      ["结果", "更新原值，不新增重复键"],
      ["原因", "不同键可能共享哈希或槽位"],
    ],
  },
  {
    label: "最坏冲突",
    fields: [
      ["分布", "n个键集中到同一桶"],
      ["查找", "最多比较n个键"],
      ["复杂度", "Theta(n)"],
      ["防护", "更好散列、扩容、随机化或树化桶"],
    ],
    alert: "冲突不可避免；正确性靠保存并比较原始键，性能靠控制冲突分布。",
  },
] as const;

const performanceCases = [
  {
    label: "稀疏均匀",
    fields: [
      ["元素数n", "6"],
      ["槽位数m", "12"],
      ["装载因子", "alpha=n/m=0.5"],
      ["期望", "短桶或短探测序列"],
    ],
  },
  {
    label: "逐渐拥挤",
    fields: [
      ["元素数n", "12"],
      ["槽位数m", "12"],
      ["装载因子", "alpha=1"],
      ["影响", "冲突概率和比较数上升"],
    ],
  },
  {
    label: "扩容重散列",
    fields: [
      ["动作", "申请更大槽位数组"],
      ["迁移", "按新容量重新定位全部键"],
      ["单次成本", "Theta(n)"],
      ["长期分析", "可摊还到多次插入"],
    ],
  },
  {
    label: "复杂度边界",
    fields: [
      ["平均查找", "期望O(1)"],
      ["平均插入", "摊还期望O(1)"],
      ["最坏查找", "O(n)"],
      ["前提", "散列分布、容量策略与冲突处理良好"],
    ],
    alert: "装载阈值由实现和冲突策略决定，0.7不是跨语言、跨实现的统一常数。",
  },
] as const;

export function HashFunctionArrayDiagram() {
  const rows = [
    { key: "apple", value: "$0.67", slot: 1, tone: success },
    { key: "milk", value: "$1.49", slot: 4, tone: accent },
    { key: "avocado", value: "$1.20", slot: 1, tone: warning },
  ];
  const slots = Array.from({ length: 6 }, (_, index) => index);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 390"
          role="img"
          aria-label="散列函数把apple映射到槽位1、milk映射到槽位4、avocado也映射到槽位1。槽位1用桶保存两个不同键值对，展示冲突处理。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="hash-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={accent} />
            </marker>
          </defs>
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>散列函数 + 数组 = 按键定位</text>
          <text x="380" y="50" textAnchor="middle" fontSize="10.5" fill={secondary}>相同键在同一表状态下走向同一槽位；不同键仍可能发生冲突</text>

          {rows.map((row, index) => {
            const y = 90 + index * 78;
            const targetY = 88 + row.slot * 44;
            return (
              <g key={row.key}>
                <rect x="35" y={y} width="116" height="44" rx="4" fill={row.tone} fillOpacity="0.1" stroke={row.tone} />
                <text x="93" y={y + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{row.key}</text>
                <text x="93" y={y + 34} textAnchor="middle" fontSize="9.5" fill={secondary}>{row.value}</text>
                <rect x="195" y={y + 3} width="120" height="38" rx="4" fill="var(--bg)" stroke={border} />
                <text x="255" y={y + 27} textAnchor="middle" fontSize="10.5" fill={primary}>hash(key) → {row.slot}</text>
                <line x1="151" y1={y + 22} x2="193" y2={y + 22} stroke={accent} markerEnd="url(#hash-arrow)" />
                <path d={`M315 ${y + 22} C390 ${y + 22}, 400 ${targetY}, 470 ${targetY}`} fill="none" stroke={row.tone} strokeWidth="1.4" markerEnd="url(#hash-arrow)" />
              </g>
            );
          })}

          <text x="590" y="69" textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>槽位数组</text>
          {slots.map((slot) => {
            const y = 72 + slot * 44;
            const occupied = slot === 1 || slot === 4;
            return (
              <g key={slot}>
                <rect x="480" y={y} width="220" height="36" rx="3" fill={occupied ? accent : "var(--bg)"} fillOpacity={occupied ? 0.07 : 1} stroke={occupied ? accent : border} />
                <text x="497" y={y + 23} fontSize="10" fontWeight="700" fill={secondary}>{slot}</text>
                {slot === 1 ? (
                  <text x="520" y={y + 23} fontSize="10.5" fill={primary}>apple:$0.67 → avocado:$1.20</text>
                ) : slot === 4 ? (
                  <text x="520" y={y + 23} fontSize="10.5" fill={primary}>milk:$1.49</text>
                ) : (
                  <text x="590" y={y + 23} textAnchor="middle" fontSize="9.5" fill={secondary}>空</text>
                )}
              </g>
            );
          })}
          <rect x="480" y="349" width="220" height="25" rx="4" fill={danger} fillOpacity="0.05" stroke={danger} strokeOpacity="0.45" />
          <text x="590" y="366" textAnchor="middle" fontSize="9.5" fill={primary}>只比槽位不够：桶内还要比较完整键。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        散列表由散列函数和数组组成；冲突发生后，同一槽位必须保存并区分多个键值对。
      </figcaption>
    </figure>
  );
}

export function HashUseCasesLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={useCaseCases}
      caption="价格表、成员去重、缓存和DNS都可抽象为从键到值或成员状态的查找。"
      tone="emerald"
    />
  );
}

export function CollisionResolutionLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={collisionCases}
      caption="链地址和开放寻址以不同方式保存冲突条目，但都必须比较原始键保证正确性。"
      tone="cyan"
    />
  );
}

export function HashPerformanceLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={performanceCases}
      caption="装载因子、散列分布和扩容策略共同决定平均常数时间能否维持。"
      tone="violet"
    />
  );
}
