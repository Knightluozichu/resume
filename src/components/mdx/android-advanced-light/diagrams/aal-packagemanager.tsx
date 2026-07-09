/**
 * <AalPackagemanagerDiagram>：PackageManager APK解析流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function AalPackagemanagerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="PackageManager APK解析流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            PackageManager APK 解析与安装流程
          </text>

          {/* APK 文件结构 */}
          <rect x="30" y="50" width="200" height="280" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <rect x="30" y="50" width="200" height="34" rx="10" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="130" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">APK 文件结构</text>
          <rect x="50" y="94" width="160" height="32" rx="5" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="115" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">AndroidManifest.xml</text>
          <rect x="50" y="132" width="160" height="32" rx="5" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="153" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">classes.dex</text>
          <rect x="50" y="170" width="160" height="32" rx="5" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="191" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">res/ 资源文件</text>
          <rect x="50" y="208" width="160" height="32" rx="5" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="229" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">assets/ 原始资源</text>
          <rect x="50" y="246" width="160" height="32" rx="5" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="267" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">resources.arsc</text>
          <rect x="50" y="284" width="160" height="32" rx="5" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="305" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">META-INF/ 签名</text>

          {/* 解析流程箭头 */}
          <text x="245" y="190" textAnchor="middle" fontSize="24" fill="var(--text-tertiary)">&rarr;</text>

          {/* PMS 解析步骤 */}
          <rect x="270" y="50" width="220" height="280" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <rect x="270" y="50" width="220" height="34" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="380" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">PMS 解析步骤</text>

          <rect x="290" y="94" width="180" height="44" rx="5" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="380" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">1. 解压APK</text>
          <text x="380" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">提取文件到临时目录</text>

          <rect x="290" y="146" width="180" height="44" rx="5" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="380" y="164" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">2. 解析Manifest</text>
          <text x="380" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PackageParser 解析XML</text>

          <rect x="290" y="198" width="180" height="44" rx="5" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="380" y="216" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">3. 签名校验</text>
          <text x="380" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">验证 APK 签名完整性</text>

          <rect x="290" y="250" width="180" height="44" rx="5" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="380" y="268" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">4. 生成odex/vdex</text>
          <text x="380" y="284" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">dex2oat 编译优化</text>

          <rect x="290" y="302" width="180" height="24" rx="5" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="380" y="319" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">5. 更新PMS缓存</text>

          {/* 箭头 */}
          <text x="505" y="190" textAnchor="middle" fontSize="24" fill="var(--text-tertiary)">&rarr;</text>

          {/* PackageInfo 结果 */}
          <rect x="530" y="50" width="180" height="280" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <rect x="530" y="50" width="180" height="34" rx="10" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="620" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">PackageInfo 结果</text>

          <rect x="550" y="94" width="140" height="32" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="115" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">packageName</text>
          <rect x="550" y="132" width="140" height="32" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="153" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">versionName/Code</text>
          <rect x="550" y="170" width="140" height="32" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="191" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">activities[]</text>
          <rect x="550" y="208" width="140" height="32" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="229" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">services[]</text>
          <rect x="550" y="246" width="140" height="32" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="267" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">receivers[]</text>
          <rect x="550" y="284" width="140" height="32" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="305" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">permissions[]</text>

          {/* 底部 API 调用 */}
          <rect x="30" y="350" width="680" height="150" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="374" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">PackageManager 常用 API</text>
          <text x="50" y="396" textAnchor="start" fontSize="10" fill="var(--text-secondary)">getPackageInfo(name, flags) — 获取 PackageInfo（含组件信息）</text>
          <text x="50" y="414" textAnchor="start" fontSize="10" fill="var(--text-secondary)">getApplicationInfo(name, flags) — 获取 ApplicationInfo</text>
          <text x="50" y="432" textAnchor="start" fontSize="10" fill="var(--text-secondary)">getInstalledPackages(flags) — 获取已安装包列表</text>
          <text x="50" y="450" textAnchor="start" fontSize="10" fill="var(--text-secondary)">queryIntentActivities(intent, flags) — 查询匹配Intent的Activity</text>
          <text x="50" y="468" textAnchor="start" fontSize="10" fill="var(--text-secondary)">resolveActivity(intent, flags) — 解析最佳匹配Activity</text>
          <text x="50" y="486" textAnchor="start" fontSize="10" fill="var(--text-secondary)">getInstalledApplications(flags) — 获取所有ApplicationInfo</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        PackageManager APK解析与安装流程——APK结构、PMS解析步骤、PackageInfo结果
      </figcaption>
    </figure>
  );
}
