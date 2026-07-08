/**
 * <JfsExpressKoaDiagram>：Express 回调中间件 vs Koa 洋葱模型 vs Fastify 图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function JfsExpressKoaDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Express Koa Fastify 中间件模型对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Web 框架中间件模型对比
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Express 回调单向链 / Koa 洋葱双向 / Fastify schema 预编译
          </text>

          {/* Express 单向链 */}
          <rect x="30" y="68" width="210" height="300" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="135" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Express</text>
          <text x="135" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">回调单向链</text>

          <rect x="50" y="120" width="170" height="40" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="144" textAnchor="middle" fontSize="11" fill="var(--text-primary)">日志 next()</text>
          <text x="135" y="170" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="180" width="170" height="40" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="204" textAnchor="middle" fontSize="11" fill="var(--text-primary)">认证 next()</text>
          <text x="135" y="230" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="240" width="170" height="40" rx="6" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="264" textAnchor="middle" fontSize="11" fill="var(--text-primary)">路由 handler</text>
          <text x="135" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">响应后无法回溯</text>
          <text x="135" y="314" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">异步错误 next(err)</text>
          <text x="135" y="348" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">(req, res, next)</text>

          {/* Koa 洋葱 */}
          <rect x="255" y="68" width="210" height="300" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Koa</text>
          <text x="360" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">洋葱模型（双向）</text>

          <rect x="280" y="120" width="160" height="40" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="360" y="144" textAnchor="middle" fontSize="11" fill="var(--text-primary)">日志 await next()</text>
          <rect x="300" y="170" width="120" height="40" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1" />
          <text x="360" y="194" textAnchor="middle" fontSize="11" fill="var(--text-primary)">认证 await next()</text>
          <rect x="320" y="220" width="80" height="40" rx="6" fill="var(--accent)" fillOpacity="0.20" stroke="var(--accent)" strokeWidth="1" />
          <text x="360" y="244" textAnchor="middle" fontSize="11" fill="var(--text-primary)">路由</text>
          <text x="360" y="280" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">前置 &rarr; 核心 &rarr; 后续</text>
          <text x="360" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">try/catch 统一捕获</text>
          <text x="360" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可做响应后处理</text>
          <text x="360" y="348" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">async (ctx, next)</text>

          {/* Fastify */}
          <rect x="480" y="68" width="230" height="300" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="595" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Fastify</text>
          <text x="595" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">schema 驱动预编译</text>

          <rect x="500" y="120" width="190" height="44" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1" />
          <text x="595" y="140" textAnchor="middle" fontSize="11" fill="var(--text-primary)">启动期编译</text>
          <text x="595" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">schema → 校验+序列化函数</text>

          <rect x="500" y="180" width="190" height="44" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1" />
          <text x="595" y="200" textAnchor="middle" fontSize="11" fill="var(--text-primary)">运行期零反射</text>
          <text x="595" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">直接调编译产物</text>

          <rect x="500" y="240" width="190" height="44" rx="6" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="1" />
          <text x="595" y="260" textAnchor="middle" fontSize="11" fill="var(--text-primary)">自动 OpenAPI</text>
          <text x="595" y="276" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">契约 + 文档</text>

          <text x="595" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">性能最高</text>
          <text x="595" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">代价：维护 schema</text>
          <text x="595" y="348" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">handler(req, reply)</text>

          <text x={VIEW_W / 2} y="396" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            选型：快速原型 Express / 优雅中间件 Koa / 高性能 Fastify
          </text>
          <text x={VIEW_W / 2} y="416" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            三者中间件签名与执行模型不同，不可混用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Web框架中间件对比——Express单向链、Koa洋葱双向、Fastify schema预编译
      </figcaption>
    </figure>
  );
}
