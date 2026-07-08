/**
 * <CapLearningMapDiagram>：深入理解计算机系统 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CapLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="深入理解计算机系统 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            深入理解计算机系统（CSAPP 第3版）全书学习地图
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            信息与机器表示 → 处理器与存储 → 构建与运行 → 资源管理 → 总复习
          </text>

          <rect x="30" y="64" width="680" height="386" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：信息与机器表示 */}
          <rect x="50" y="82" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">信息与机器表示</text>
          <text x="205" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第2章 信息表示（补码/IEEE 754）</text>
          <text x="205" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3章 机器级表示（x86-64 汇编）</text>

          <rect x="380" y="82" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">阶段目标</text>
          <text x="535" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能表示：二进制编码一切数值</text>
          <text x="535" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能翻译：C 代码变机器指令</text>

          <text x="205" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：处理器与存储 */}
          <rect x="50" y="174" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">处理器与存储</text>
          <text x="205" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第4章 处理器架构（流水线/冒险）</text>
          <text x="205" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5章 存储器层次（缓存/局部性）</text>

          <rect x="380" y="174" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">阶段目标</text>
          <text x="535" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能执行：流水线并行提吞吐</text>
          <text x="535" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能加速：缓存掩盖速度差距</text>

          <text x="205" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：构建与运行 */}
          <rect x="50" y="266" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">构建与运行</text>
          <text x="205" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第6章 链接加载（ELF/符号解析）</text>
          <text x="205" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7章 异常控制流（进程/信号）</text>

          <rect x="380" y="266" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阶段目标</text>
          <text x="535" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能拼装：多文件合并成映像</text>
          <text x="535" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能切换：进程并发与控制流</text>

          <text x="205" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：资源管理 + 总复习 */}
          <rect x="50" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">资源管理</text>
          <text x="205" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第8章 虚拟内存（页表/TLB）</text>
          <text x="205" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第9章 系统级 I/O（fd/管道）</text>

          <rect x="380" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="535" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">hello 程序的一生串八章</text>
          <text x="535" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">系统视角定位真实问题</text>

          <text x={VIEW_W / 2} y="446" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「会用 C」到「懂计算机系统」的五层进阶
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CSAPP 全书学习地图——信息表示、机器级表示、处理器、存储、链接、异常控制流、虚拟内存、I/O 五阶段递进路径
      </figcaption>
    </figure>
  );
}
