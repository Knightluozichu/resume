/**
 * <LadVectorSpacesDiagram>：向量空间公理、基与维数图解
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function LadVectorSpacesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="向量空间：公理、基与维数图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">向量空间：公理、基与维数</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">八条公理定义一切，基给出坐标系，维数是基的长度</text>
    <rect x="40" y="70" width="300" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">向量空间公理（8 条）</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">加法：交换律、结合律</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">零元 0：v + 0 = v</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">负元 -v：v + (-v) = 0</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">标量乘：1v = v，分配律</text>
    <text x="54" y="182" fontSize="11" fill="var(--text-primary)">→ 抽象出“可线性组合”的结构</text>
    <rect x="380" y="70" width="300" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="394" y="92" fontSize="12" fontWeight="700" fill="var(--success)">基 = 极大线性无关组</text>
    <text x="394" y="114" fontSize="11" fill="var(--text-primary)">张成 span(v1..vn) = 全空间</text>
    <text x="394" y="131" fontSize="11" fill="var(--text-primary)">线性无关：只有平凡组合为 0</text>
    <text x="394" y="148" fontSize="11" fill="var(--text-primary)">基 = 张成 + 线性无关</text>
    <text x="394" y="165" fontSize="11" fill="var(--text-primary)">坐标：v = a1v1 + ... + anvn</text>
    <rect x="40" y="240" width="640" height="70" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">维数定理</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">有限维空间任意两个基长度相同 → 维数 dim V</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">线性无关组长度 ≤ 张成组长度 ≤ dim V</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">dim R^n = n</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">R^2 的标准基 (1,0),(0,1)；多项式空间 P_n 维数为 n+1</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">八条公理定义一切，基给出坐标系，维数是基的长度</figcaption>
    </figure>
  );
}
