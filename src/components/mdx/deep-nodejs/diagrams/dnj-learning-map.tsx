/**
 * <DnjLearningMapDiagram>：深入浅出Node.js 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function DnjLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="深入浅出Node.js全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            深入浅出 Node.js 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            引擎核心 → 事件循环 → 异步编程 → 流 → 网络 → 生态 → 工程化
          </text>

          <rect x="30" y="62" width="680" height="388" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：学习地图 + V8引擎 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">入门导览</text>
          <text x="205" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第1章 全书学习地图（十主题递进总览）</text>
          <text x="205" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Node.js 运行时全景认知</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">引擎核心层</text>
          <text x="535" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第2章 V8 引擎（JIT/隐藏类/GC）</text>
          <text x="535" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3章 事件循环进阶（六阶段/微任务）</text>

          <text x="205" y="158" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="158" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：异步编程 + 流 */}
          <rect x="50" y="172" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="194" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">异步编程层</text>
          <text x="205" y="212" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第4章 异步编程演进（callback→async/await）</text>
          <text x="205" y="224" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Promise 链 / 错误传播 / 控制流</text>

          <rect x="380" y="172" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="194" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">流与 I/O 层</text>
          <text x="535" y="212" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5章 Stream 实现（背压/编码/自定义流）</text>
          <text x="535" y="224" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Readable/Writable/Transform/Duplex</text>

          <text x="205" y="250" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="250" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：网络通信 */}
          <rect x="50" y="264" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="286" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">网络通信层</text>
          <text x="205" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第6章 TCP 与 HTTP（连接池/Keep-Alive）</text>
          <text x="205" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7章 WebSocket 与实时通信</text>

          <rect x="380" y="264" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="286" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">网络层目标</text>
          <text x="535" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能连：HTTP 请求响应 + 连接复用</text>
          <text x="535" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能推：WebSocket 双向实时通信</text>

          <text x="205" y="342" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="342" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：生态与工程化 + 总复习 */}
          <rect x="50" y="356" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="378" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">生态与工程化</text>
          <text x="205" y="396" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第8章 NPM 与模块生态（semver/peer deps）</text>
          <text x="205" y="408" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第9章 测试与部署（Jest/PM2/Docker）</text>

          <rect x="380" y="356" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="378" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="535" y="396" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第10章 十主题知识图谱串联</text>
          <text x="535" y="408" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Node.js 运行时工程判断力</text>

          <text x={VIEW_W / 2} y="446" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「会用 API」到「懂运行时内核」的七层进阶
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        深入浅出 Node.js 全书学习地图——引擎、异步、流、网络、生态、工程化七层递进路径
      </figcaption>
    </figure>
  );
}
