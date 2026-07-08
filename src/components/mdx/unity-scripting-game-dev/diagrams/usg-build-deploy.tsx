/**
 * <UsgBuildDeployDiagram>: 构建与发布
 *
 * 构建管线：场景配置 -> 平台选择 -> Build Settings -> 发布
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function UsgBuildDeployDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="构建与发布流程。从场景配置、平台选择、Build Settings 到各平台发布的完整管线。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            构建与发布管线
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            场景配置 -&gt; 平台选择 -&gt; Build -&gt; 发布
          </text>
          {/* 流程步骤 */}
          <g>
            <rect x={36} y={78} width={140} height={64} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" />
            <text x={106} y={102} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>1 场景配置</text>
            <text x={106} y={120} textAnchor="middle" fontSize="10" fill={secondary}>Scenes In Build</text>
            <text x={106} y={134} textAnchor="middle" fontSize="10" fill={secondary}>勾选/排序</text>
          </g>
          <line x1={176} y1={110} x2={196} y2={110} stroke={border} strokeWidth="1.2" />
          <g>
            <rect x={196} y={78} width={140} height={64} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.2" />
            <text x={266} y={102} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>2 平台选择</text>
            <text x={266} y={120} textAnchor="middle" fontSize="10" fill={secondary}>Windows/Android</text>
            <text x={266} y={134} textAnchor="middle" fontSize="10" fill={secondary}>iOS/WebGL</text>
          </g>
          <line x1={336} y1={110} x2={356} y2={110} stroke={border} strokeWidth="1.2" />
          <g>
            <rect x={356} y={78} width={140} height={64} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.2" />
            <text x={426} y={102} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>3 Player Settings</text>
            <text x={426} y={120} textAnchor="middle" fontSize="10" fill={secondary}>包名/图标/版本</text>
            <text x={426} y={134} textAnchor="middle" fontSize="10" fill={secondary}>画质/脚本后端</text>
          </g>
          <line x1={496} y1={110} x2={516} y2={110} stroke={border} strokeWidth="1.2" />
          <g>
            <rect x={516} y={78} width={168} height={64} rx="8" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1.2" />
            <text x={600} y={102} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>4 Build</text>
            <text x={600} y={120} textAnchor="middle" fontSize="10" fill={secondary}>生成可执行包</text>
            <text x={600} y={134} textAnchor="middle" fontSize="10" fill={secondary}>.exe / .apk / .aab</text>
          </g>
          {/* 平台发布 */}
          <text x={360} y={172} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>目标平台发布</text>
          <g>
            <rect x={36} y={186} width={130} height={70} rx="8" fill={elevated} stroke={accent} strokeWidth="1.2" />
            <text x={101} y={208} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Windows/Mac</text>
            <text x={101} y={226} textAnchor="middle" fontSize="10" fill={secondary}>Steam / 独立分发</text>
            <text x={101} y={242} textAnchor="middle" fontSize="10" fill={secondary}>.exe / .app</text>
          </g>
          <g>
            <rect x={186} y={186} width={130} height={70} rx="8" fill={elevated} stroke={success} strokeWidth="1.2" />
            <text x={251} y={208} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>Android</text>
            <text x={251} y={226} textAnchor="middle" fontSize="10" fill={secondary}>Google Play</text>
            <text x={251} y={242} textAnchor="middle" fontSize="10" fill={secondary}>.apk / .aab</text>
          </g>
          <g>
            <rect x={336} y={186} width={130} height={70} rx="8" fill={elevated} stroke={warning} strokeWidth="1.2" />
            <text x={401} y={208} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>iOS</text>
            <text x={401} y={226} textAnchor="middle" fontSize="10" fill={secondary}>App Store</text>
            <text x={401} y={242} textAnchor="middle" fontSize="10" fill={secondary}>Xcode 导出</text>
          </g>
          <g>
            <rect x={486} y={186} width={198} height={70} rx="8" fill={elevated} stroke={danger} strokeWidth="1.2" />
            <text x={585} y={208} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>WebGL</text>
            <text x={585} y={226} textAnchor="middle" fontSize="10" fill={secondary}>浏览器即开即玩</text>
            <text x={585} y={242} textAnchor="middle" fontSize="10" fill={secondary}>无安装、需压缩</text>
          </g>
          {/* 检查清单 */}
          <g>
            <rect x={36} y={276} width={648} height={90} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={52} y={296} fontSize="12" fontWeight="700" fill={primary}>发布前检查清单</text>
            <text x={52} y={314} fontSize="10" fill={secondary}>关闭 Development Build / 开启 Strip Engine Code / 设置 Scripting Backend 为 IL2CPP</text>
            <text x={52} y={330} fontSize="10" fill={secondary}>纹理压缩格式匹配平台（ASTC/ETC2/DXT）/ 音频编码匹配 / 图标与启动屏</text>
            <text x={52} y={346} fontSize="10" fill={secondary}>版本号递增 / Keystore 签名（Android）/ Provisioning Profile（iOS）</text>
            <text x={52} y={362} fontSize="10" fill={secondary}>先在目标设备真机测试，再用 Profiler 验证发布包性能</text>
          </g>
          <text x={360} y={388} textAnchor="middle" fontSize="11" fill={secondary}>Command Line Build / CI 自动化构建可集成到流水线</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        构建管线四步：场景配置→平台选择→Player Settings→Build，再分发到各平台商店。
      </figcaption>
    </figure>
  );
}
