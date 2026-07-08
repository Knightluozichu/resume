/**
 * <GpgGpuComputingDiagram>：GPU Gems GPU 通用计算图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpgGpuComputingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GPU 通用计算：图形管线 vs 通用计算管线"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            GPU 通用计算：从图形管线到通用并行
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            GPGPU 把 GPU 从「画三角形」变成「算任意数据」
          </text>

          {/* 图形管线 */}
          <rect x="40" y="80" width="310" height="150" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="195" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">图形管线</text>

          <rect x="60" y="120" width="270" height="26" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="195" y="138" textAnchor="middle" fontSize="10" fill="var(--text-primary)">顶点 → 光栅化 → 像素</text>

          <rect x="60" y="154" width="270" height="26" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="195" y="172" textAnchor="middle" fontSize="10" fill="var(--text-primary)">输入是几何，输出是像素</text>

          <text x="195" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">受限：必须走图形 API</text>
          <text x="195" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">数据伪装成纹理</text>

          {/* 通用计算 */}
          <rect x="370" y="80" width="310" height="150" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="525" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">通用计算（CUDA/Compute Shader）</text>

          <rect x="390" y="120" width="270" height="26" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="525" y="138" textAnchor="middle" fontSize="10" fill="var(--text-primary)">线程组 → 共享内存 → 写回</text>

          <rect x="390" y="154" width="270" height="26" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="525" y="172" textAnchor="middle" fontSize="10" fill="var(--text-primary)">输入是任意数据，输出任意数据</text>

          <text x="525" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自由：直接读写显存</text>
          <text x="525" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">线程同步与原子操作</text>

          {/* 底部应用场景 */}
          <rect x="40" y="250" width="640" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">GPGPU 的典型应用</text>

          <rect x="70" y="290" width="130" height="32" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="135" y="310" textAnchor="middle" fontSize="10" fill="var(--text-primary)">物理模拟</text>

          <rect x="215" y="290" width="130" height="32" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="280" y="310" textAnchor="middle" fontSize="10" fill="var(--text-primary)">图像模糊/卷积</text>

          <rect x="360" y="290" width="130" height="32" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="425" y="310" textAnchor="middle" fontSize="10" fill="var(--text-primary)">排序/归约</text>

          <rect x="505" y="290" width="130" height="32" rx="6" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="570" y="310" textAnchor="middle" fontSize="10" fill="var(--text-primary)">光线追踪</text>

          <text x={VIEW_W / 2} y="348" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">洞察：GPU 有数千个核心，适合「同一段代码处理大量独立数据」的数据并行任务</text>
          <text x={VIEW_W / 2} y="364" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">SIMT 模型：同指令多线程，分支会降低利用率</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        图形管线与通用计算管线的对比及典型应用
      </figcaption>
    </figure>
  );
}
