/**
 * <JfsTestingDeployDiagram>：测试金字塔、Docker 多阶段构建与 CI/CD 流水线图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JfsTestingDeployDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="测试金字塔 Docker多阶段构建 CI/CD流水线图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            测试与部署：金字塔 + Docker + CI/CD
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            底宽顶窄的测试分层 → 多阶段镜像 → 自动化流水线
          </text>

          {/* 测试金字塔 */}
          <text x="135" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">测试金字塔</text>
          <polygon points="60,260 210,260 180,200 90,200" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="135" y="234" textAnchor="middle" fontSize="11" fill="var(--success)">单元测试（多/快）</text>
          <polygon points="90,200 180,200 155,150 115,150" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="135" y="178" textAnchor="middle" fontSize="10" fill="var(--warning)">集成测试</text>
          <polygon points="115,150 155,150 135,110" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="135" y="134" textAnchor="middle" fontSize="9" fill="var(--danger)">E2E（少/慢）</text>
          <text x="135" y="284" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">底宽顶窄</text>
          <text x="135" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">倒置=冰淇淋反模式</text>

          {/* Docker 多阶段 */}
          <text x="430" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">Docker 多阶段构建</text>

          <rect x="280" y="92" width="160" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="114" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">构建阶段</text>
          <text x="360" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全量镜像 + 编译产物</text>

          <text x="360" y="162" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="360" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">COPY 产物</text>

          <rect x="280" y="188" width="160" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="210" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">运行阶段</text>
          <text x="360" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">slim 镜像，无源码</text>

          <rect x="460" y="92" width="220" height="152" rx="8" fill="var(--text-tertiary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1" />
          <text x="570" y="114" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">收益</text>
          <text x="570" y="136" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">镜像小（几百MB）</text>
          <text x="570" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无构建工具（安全）</text>
          <text x="570" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">层缓存友好</text>
          <text x="570" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">拉取启动快</text>
          <text x="570" y="212" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">构建与运行分离</text>

          {/* CI/CD 流水线 */}
          <text x={VIEW_W / 2} y="276" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">CI/CD 流水线（测试不绿禁止部署）</text>

          <rect x="40" y="292" width="120" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">push 提交</text>
          <text x="100" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">触发流水线</text>

          <text x="168" y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="180" y="292" width="120" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="240" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">npm ci</text>
          <text x="240" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">安装依赖</text>

          <text x="308" y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="320" y="292" width="120" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="380" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">npm test</text>
          <text x="380" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单元+集成</text>

          <text x="448" y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="460" y="292" width="120" height="48" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="520" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">docker build</text>
          <text x="520" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">构建镜像</text>

          <text x="588" y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="600" y="292" width="100" height="48" rx="8" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.2" />
          <text x="650" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">部署</text>
          <text x="650" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自动发布</text>

          <rect x="40" y="360" width="660" height="64" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="382" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">核心原则</text>
          <text x="370" y="400" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每次提交都经自动化验证；测试红 = 阻断合并/部署</text>
          <text x="370" y="416" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">快速失败：lint → 单元 → 构建 → 集成 → 部署，越早失败越省成本</text>

          <text x={VIEW_W / 2} y="444" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            手动绕过测试部署是 CI/CD 最大反模式
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        测试金字塔底宽顶窄、Docker多阶段构建、CI/CD流水线测试不绿禁止部署
      </figcaption>
    </figure>
  );
}
