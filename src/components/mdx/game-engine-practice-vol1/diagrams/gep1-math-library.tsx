/**
 * <Gep1MathLibraryDiagram>：数学库类型体系与 SIMD 设计图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 430;

export function Gep1MathLibraryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数学库类型体系与 SIMD 设计图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            数学库类型体系：向量 / 矩阵 / 四元数
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            底层用 SIMD 寄存器，上层提供值类型语义
          </text>

          {/* 向量 */}
          <rect x="40" y="72" width="200" height="250" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">向量 Vector</text>
          <rect x="56" y="108" width="42" height="42" rx="4" fill="var(--success)" fillOpacity="0.25" />
          <text x="77" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">x</text>
          <rect x="102" y="108" width="42" height="42" rx="4" fill="var(--success)" fillOpacity="0.18" />
          <text x="123" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">y</text>
          <rect x="148" y="108" width="42" height="42" rx="4" fill="var(--success)" fillOpacity="0.12" />
          <text x="169" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">z</text>
          <text x="140" y="176" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Vec2 / Vec3 / Vec4</text>
          <text x="140" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">点乘 · 叉乘 ×</text>
          <text x="140" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">归一化 / 长度</text>
          <text x="140" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">线性插值 lerp</text>
          <text x="140" y="262" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">表示方向与位置</text>
          <text x="140" y="286" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">16 字节对齐</text>
          <text x="140" y="306" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">__m128 单条指令算 4 float</text>

          {/* 矩阵 */}
          <rect x="260" y="72" width="200" height="250" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">矩阵 Matrix</text>
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 4 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={278 + c * 36} y={108 + r * 30} width="32" height="26" rx="3" fill="var(--accent)" fillOpacity={r === c ? 0.28 : 0.12} stroke="var(--accent)" strokeWidth="0.6" />
            ))
          )}
          <text x="360" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Mat4x4（4×4 齐次）</text>
          <text x="360" y="268" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">乘法 / 转置 / 求逆</text>
          <text x="360" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">表示线性变换</text>
          <text x="360" y="310" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">列主序存储，匹配 GPU 约定</text>

          {/* 四元数 */}
          <rect x="480" y="72" width="200" height="250" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="580" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">四元数 Quaternion</text>
          <rect x="498" y="108" width="42" height="42" rx="4" fill="var(--warning)" fillOpacity="0.3" />
          <text x="519" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">w</text>
          <rect x="544" y="108" width="42" height="42" rx="4" fill="var(--warning)" fillOpacity="0.18" />
          <text x="565" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">x</text>
          <rect x="590" y="108" width="42" height="42" rx="4" fill="var(--warning)" fillOpacity="0.14" />
          <text x="611" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">y</text>
          <rect x="636" y="108" width="28" height="42" rx="4" fill="var(--warning)" fillOpacity="0.1" />
          <text x="650" y="133" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">z</text>
          <text x="580" y="176" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">(w, x, y, z)，|q|=1</text>
          <text x="580" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">乘法 = 复合旋转</text>
          <text x="580" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">球面插值 slerp</text>
          <text x="580" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无万向锁</text>
          <text x="580" y="262" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">表示旋转</text>
          <text x="580" y="286" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">4 分量 vs 欧拉角 3 分量</text>
          <text x="580" y="306" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">存储小、插值平滑</text>

          {/* 底部：SIMD 层 */}
          <rect x="40" y="340" width="640" height="70" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="362" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            SIMD 底层：一条指令处理 4 个 float
          </text>
          <text x="360" y="382" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            Vec3 点乘 = 1 条 __m128 指令（而非 3 次标量乘 + 2 次加）
          </text>
          <text x="360" y="398" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            设计要点：16 字节对齐 / 值语义 / 不虚函数 / 平台分支隔离在底层
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数学库类型体系——向量表示方向、矩阵表示变换、四元数表示旋转，底层统一用 SIMD 加速
      </figcaption>
    </figure>
  );
}
