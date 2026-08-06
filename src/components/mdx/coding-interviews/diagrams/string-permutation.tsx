"use client";

const officialCases = [
  { label: "nullptr", fields: [["输入", "nullptr"], ["外层", "直接return"], ["输出行", "0"], ["覆盖", "空指针"]] },
  { label: "空串", fields: [["输入", '可写数组""'], ["基例", "首字符就是终止符"], ["输出行", "1个空排列"], ["表现", "打印一个空行"]] },
  { label: "a", fields: [["输入", "a"], ["固定", "a"], ["输出", "a"], ["数量", "1"]] },
  { label: "ab", fields: [["分支", "首位a / 首位b"], ["输出", "ab，ba"], ["数量", "2"], ["回溯", "每支后恢复"]] },
  { label: "abc", fields: [["输出前四", "abc，acb，bac，bca"], ["输出后二", "cba，cab"], ["数量", "6"], ["覆盖", "三层交换树"]] },
] as const;

export function PermutationSwapTreeDiagram() {
  const Node = ({ x, y, label, tone }: { x: number; y: number; label: string; tone: string }) => (
    <g>
      <rect x={x - 40} y={y - 18} width={80} height={36} rx="6" fill={tone} fillOpacity="0.12" stroke={tone} strokeWidth="1.4" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="monospace" fill={tone}>{label}</text>
    </g>
  );
  const Edge = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--border)" strokeWidth="1.3" />
  );
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 400"
          role="img"
          aria-label="字符串排列图。以 abc 为例，用交换递归生成全排列：每一层把 begin 到末尾的每个字符轮流交换到固定位置，再递归排列剩余后缀。第一层固定首位：固定 a（abc）、交换 a,b 固定 b（bac）、交换 a,c 固定 c（cba）；第二层排列后缀各得 2 个叶子：abc、acb、bac、bca、cba、cab，共 3! = 6 个。每次交换后递归返回要再交换回来（回溯），保证后续分支看到原始字符串。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">交换递归树：逐层固定首位，后缀继续排列（abc → 6 个）</text>
          {/* 根 */}
          <Node x={410} y={70} label="abc" tone="var(--accent)" />
          <text x={470} y={66} fontSize="11" fill="var(--text-secondary)">begin=0</text>
          {/* 第一层 */}
          <Edge x1={410} y1={88} x2={180} y2={142} />
          <Edge x1={410} y1={88} x2={410} y2={142} />
          <Edge x1={410} y1={88} x2={640} y2={142} />
          <Node x={180} y={160} label="abc" tone="var(--accent)" />
          <Node x={410} y={160} label="bac" tone="var(--accent)" />
          <Node x={640} y={160} label="cba" tone="var(--accent)" />
          <text x={180} y={192} textAnchor="middle" fontSize="11" fill="var(--accent)">固定 a</text>
          <text x={410} y={192} textAnchor="middle" fontSize="11" fill="var(--accent)">swap(0,1) 固定 b</text>
          <text x={640} y={192} textAnchor="middle" fontSize="11" fill="var(--accent)">swap(0,2) 固定 c</text>
          {/* 叶子 */}
          <Edge x1={180} y1={178} x2={120} y2={232} />
          <Edge x1={180} y1={178} x2={240} y2={232} />
          <Edge x1={410} y1={178} x2={350} y2={232} />
          <Edge x1={410} y1={178} x2={470} y2={232} />
          <Edge x1={640} y1={178} x2={580} y2={232} />
          <Edge x1={640} y1={178} x2={700} y2={232} />
          <Node x={120} y={250} label="abc" tone="var(--success)" />
          <Node x={240} y={250} label="acb" tone="var(--success)" />
          <Node x={350} y={250} label="bac" tone="var(--success)" />
          <Node x={470} y={250} label="bca" tone="var(--success)" />
          <Node x={580} y={250} label="cba" tone="var(--success)" />
          <Node x={700} y={250} label="cab" tone="var(--success)" />
          <text x={410} y={306} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">叶子共 3! = 6 个全排列</text>
          <text x="410" y="336" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">每层把 begin 到末尾的字符轮流换到固定位，递归排列后缀；n 个字符共 n! 个叶子。</text>
          <text x="410" y="362" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">回溯：每次交换后递归返回要再交换回来，保证后续兄弟分支看到原串；含重复字符需同层去重。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">每一层把begin到末尾的每个字符轮流交换到固定位置，再递归排列剩余后缀。</figcaption>
    </figure>
  );
}

export function PermutationSwapBackMap() {
  const rows = [
    ["进入首位b分支", "abc", "swap(0,1)", "bac"],
    ["固定b递归", "bac", "排列后缀a,c", "输出bac、bca"],
    ["子递归返回", "bac", "后缀已恢复", "可撤销首位交换"],
    ["顶层回溯", "bac", "swap(0,1)", "abc"],
    ["进入首位c分支", "abc", "swap(0,2)", "cba"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[850px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["时刻", "交换前/当前", "动作", "状态"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">同一对位置交换两次即可恢复；回溯后父层和后续兄弟都看见进入分支前的字符串。</figcaption>
    </figure>
  );
}

export function PermutationDuplicatePolicyDiagram() {
  const rows = [
    ["作者原版，输入aab", "按位置选择3!个叶子", "aab,aab,aba,aba,baa,baa", "不去重"],
    ["同层字符集合", "每层相同字符只作为首位一次", "aab,aba,baa", "去重扩展"],
    ["先生成后set", "仍走6个叶子再去重", "3个结果", "计算未剪枝"],
    ["排序+used", "跳过同层等值位置", "3个结果", "另一正确扩展"],
    ["原书测试", "无重复字符用例", 'nullptr,"",a,ab,abc', "不能声称已验证去重"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["策略", "搜索", "aab输出", "语义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">去重是可选扩展，不是作者源码行为；必须先定义结果按字符值还是按位置身份计数。</figcaption>
    </figure>
  );
}
