/**
 * <UhmDeploymentDiagram>：部署发布与平台适配图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UhmDeploymentDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="部署发布与平台适配图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            HMI 部署发布流程
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            构建配置 → 平台测试 → OTA 集成
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="180" height="80" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">构建配置</text>
          <text x="160" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Player Settings</text>
          <text x="160" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">IL2CPP + Addressables</text>
          <text x="160" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">目标平台/分辨率</text>

          <text x="275" y="140" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="300" y="100" width="180" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="390" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">平台测试</text>
          <text x="390" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">目标硬件验证</text>
          <text x="390" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">冷启动 &lt;2s</text>
          <text x="390" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">帧率/内存/温度</text>

          <text x="505" y="140" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="530" y="100" width="140" height="80" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">OTA 集成</text>
          <text x="600" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">远程更新</text>
          <text x="600" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">差分/签名/回滚</text>
          <text x="600" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">行驶中不黑屏</text>

          <text x={VIEW_W / 2} y="210" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            HMI vs 普通 App 部署
          </text>

          <rect x="80" y="222" width="260" height="60" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="210" y="244" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">HMI 部署</text>
          <text x="210" y="260" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">冷启动 2s / 7x24 稳定</text>
          <text x="210" y="274" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">安全认证 + OTA 回滚</text>

          <rect x="380" y="222" width="260" height="60" rx="8" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="510" y="244" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">普通 App 部署</text>
          <text x="510" y="260" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">启动容忍度高</text>
          <text x="510" y="274" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">应用商店更新</text>

          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            启动优化：首屏预加载（2s 内显示） → 后台加载其他资源
          </text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            OTA：版本检查 → 差分下载 → 校验安装 → 失败回滚
          </text>
          <text x={VIEW_W / 2} y="348" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            IL2CPP：C# → C++ → 原生代码（性能好 + 安全性高）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        HMI 部署发布——构建配置、平台测试与 OTA 集成
      </figcaption>
    </figure>
  );
}
