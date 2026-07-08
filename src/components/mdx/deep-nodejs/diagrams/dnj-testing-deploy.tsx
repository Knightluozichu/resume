/**
 * <DnjTestingDeployDiagram>：测试与部署图解（测试金字塔 / PM2 / Docker）。
 * 纯静态展示，无交互。Server Component。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DnjTestingDeployDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="测试金字塔与部署架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            测试与部署：测试金字塔 + PM2 + Docker
          </text>

          {/* 测试金字塔 */}
          <text x="185" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">测试金字塔</text>

          <polygon points="80,80 290,80 260,120 110,120" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="185" y="106" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">E2E 测试（少）</text>

          <polygon points="110,124 260,124 230,164 140,164" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="185" y="150" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">集成测试（中）</text>

          <polygon points="140,168 230,168 200,208 170,208" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="185" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">单元测试（多）</text>

          <text x="185" y="228" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">底层多快省，顶层少慢贵</text>

          <rect x="40" y="244" width="290" height="90" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="185" y="264" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">测试框架对比</text>
          <text x="185" y="282" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Mocha：describe/it + 断言库</text>
          <text x="185" y="296" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Jest：零配置 + 内置 mock/coverage</text>
          <text x="185" y="310" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">断言：assert / chai expect</text>
          <text x="185" y="324" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">覆盖率：nyc / c8（V8 原生）</text>

          {/* PM2 */}
          <text x="540" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">PM2 进程管理</text>

          <rect x="380" y="70" width="320" height="120" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />

          <rect x="400" y="84" width="100" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="450" y="106" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">Worker 0</text>

          <rect x="510" y="84" width="100" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="560" y="106" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">Worker 1</text>

          <rect x="620" y="84" width="70" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="655" y="106" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">W2…N</text>

          <text x="540" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">cluster 模式：fork N 个进程</text>
          <text x="540" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">自动重启：进程崩溃 0 秒重启</text>
          <text x="540" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">零停机重载：pm2 reload</text>
          <text x="540" y="180" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">日志管理 / 监控仪表盘</text>

          <rect x="380" y="200" width="320" height="56" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="540" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">PM2 ecosystem.config.js</text>
          <text x="540" y="236" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">instances: "max" / exec_mode: "cluster"</text>
          <text x="540" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">max_memory_restart: "1G"</text>

          {/* Docker */}
          <text x={VIEW_W / 2} y="292" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Docker 容器化部署</text>

          <rect x="40" y="306" width="660" height="80" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" />

          <rect x="60" y="320" width="180" height="52" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="150" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">Dockerfile</text>
          <text x="150" y="356" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">FROM node:18-alpine</text>
          <text x="150" y="368" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">多阶段构建 + .dockerignore</text>

          <rect x="260" y="320" width="180" height="52" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="350" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">镜像优化</text>
          <text x="350" y="356" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">alpine 瘦身 ~50MB</text>
          <text x="350" y="368" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">生产依赖 --omit=dev</text>

          <rect x="460" y="320" width="220" height="52" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="570" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">运行与编排</text>
          <text x="570" y="356" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">非 root 用户运行</text>
          <text x="570" y="368" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">docker-compose / K8s 编排</text>

          {/* 底部 */}
          <rect x="40" y="404" width="660" height="56" rx="6" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="424" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            CI/CD：GitHub Actions → 自动测试 → 构建镜像 → 推送 Registry → 滚动部署
          </text>
          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            优雅关闭：SIGTERM → 停止接受新请求 → 清理连接 → 退出（配合 PM2/Docker 健康检查）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        测试与部署——测试金字塔、Mocha/Jest 框架、PM2 集群管理、Docker 容器化与 CI/CD
      </figcaption>
    </figure>
  );
}
