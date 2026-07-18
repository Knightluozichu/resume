"use client";

import { CodingInterviewLab } from "./official-lab";

const officialCases = [
  { label: "nullptr", fields: [["输入", "nullptr"], ["外层", "直接return"], ["输出行", "0"], ["覆盖", "空指针"]] },
  { label: "空串", fields: [["输入", '可写数组""'], ["基例", "首字符就是终止符"], ["输出行", "1个空排列"], ["表现", "打印一个空行"]] },
  { label: "a", fields: [["输入", "a"], ["固定", "a"], ["输出", "a"], ["数量", "1"]] },
  { label: "ab", fields: [["分支", "首位a / 首位b"], ["输出", "ab，ba"], ["数量", "2"], ["回溯", "每支后恢复"]] },
  { label: "abc", fields: [["输出前四", "abc，acb，bac，bca"], ["输出后二", "cba，cab"], ["数量", "6"], ["覆盖", "三层交换树"]] },
] as const;

export function PermutationSwapTreeDiagram() {
  const rows = [
    ["固定a", "剩余b,c", "abc / acb", "2"],
    ["固定b", "交换a,b后剩余a,c", "bac / bca", "2"],
    ["固定c", "交换a,c后剩余b,a", "cba / cab", "2"],
    ["合计", "首位3种×尾部2种", "源码打印顺序", "6"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["首位分支", "递归剩余区间", "叶子输出", "数量"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
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
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
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
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">去重是可选扩展，不是作者源码行为；必须先定义结果按字符值还是按位置身份计数。</figcaption>
    </figure>
  );
}

export function StringPermutationOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者5组打印测试，核对空指针、空排列、单字符、双字符与abc的实际输出顺序。" />;
}
