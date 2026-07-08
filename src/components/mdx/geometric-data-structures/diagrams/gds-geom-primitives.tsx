/**
 * <GdsGeomPrimitivesDiagram>：几何图元：点、向量、射线与平面的空间关系
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdsGeomPrimitivesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="几何图元：点、向量、射线与平面图解" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">几何图元：点、向量、射线与平面</text>
    <text x="360.0" y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">图形学的基本积木与空间关系判定</text>
    <rect x="40" y="70" width="310" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="92" fontSize="12" fontWeight="700" fill="var(--accent)">基本图元</text>
    <text x="54" y="114" fontSize="11" fill="var(--text-primary)">点 P=(x,y,z)：空间位置</text>
    <text x="54" y="131" fontSize="11" fill="var(--text-primary)">向量 v=(dx,dy,dz)：方向+长度</text>
    <text x="54" y="148" fontSize="11" fill="var(--text-primary)">射线 Ray=P+t·v (t≥0)</text>
    <text x="54" y="165" fontSize="11" fill="var(--text-primary)">平面 Plane：N·X+d=0（N 法向量）</text>
    <rect x="370" y="70" width="310" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="384" y="92" fontSize="12" fontWeight="700" fill="var(--success)">空间关系</text>
    <text x="384" y="114" fontSize="11" fill="var(--text-primary)">点到面距离 = |N·P+d|/|N|</text>
    <text x="384" y="131" fontSize="11" fill="var(--text-primary)">射线与面交点 t=-(N·P+d)/(N·v)</text>
    <text x="384" y="148" fontSize="11" fill="var(--text-primary)">点在面正向/负向/面上</text>
    <text x="384" y="165" fontSize="11" fill="var(--text-primary)">AABB 轴对齐包围盒：min/max</text>
    <rect x="40" y="240" width="640" height="75" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
    <text x="54" y="262" fontSize="12" fontWeight="700" fill="var(--warning)">核心运算</text>
    <text x="54" y="284" fontSize="11" fill="var(--text-primary)">点积 a·b=|a||b|cosθ → 投影、夹角</text>
    <text x="54" y="301" fontSize="11" fill="var(--text-primary)">叉积 a×b → 法向量、面积</text>
    <text x="54" y="318" fontSize="11" fill="var(--text-primary)">重心坐标：三角形内点 = αA+βB+γC (α+β+γ=1)</text>
    <rect x="48" y="342" width="624" height="42" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">所有几何算法的原子操作：点积判方向、叉积求法向、参数方程求交</text>
    <text x="360.0" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">图元是构建复杂空间数据结构的乐高积木</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">图形学的基本积木与空间关系判定</figcaption>
    </figure>
  );
}
