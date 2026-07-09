/**
 * <DakPmsPackageDiagram>：PMS包管理与APK安装流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function DakPmsPackageDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="PMS包管理与APK安装流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            PMS——APK解析与包安装流程
          </text>

          {/* APK 文件结构 */}
          <text x="370" y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">APK 文件结构</text>
          <rect x="40" y="62" width="660" height="76" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <rect x="55" y="74" width="100" height="52" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="105" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">AndroidManifest</text>
          <text x="105" y="112" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">组件声明</text>
          <text x="105" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">权限声明</text>

          <rect x="165" y="74" width="100" height="52" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="215" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">classes.dex</text>
          <text x="215" y="112" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">字节码</text>
          <text x="215" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可执行代码</text>

          <rect x="275" y="74" width="100" height="52" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="325" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">res/</text>
          <text x="325" y="112" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">资源文件</text>
          <text x="325" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">布局/图片</text>

          <rect x="385" y="74" width="100" height="52" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="435" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">resources.arsc</text>
          <text x="435" y="112" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">资源索引表</text>
          <text x="435" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ID映射</text>

          <rect x="495" y="74" width="100" height="52" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="545" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">lib/</text>
          <text x="545" y="112" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SO库</text>
          <text x="545" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">native代码</text>

          <rect x="605" y="74" width="80" height="52" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="645" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">META-INF</text>
          <text x="645" y="112" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">签名信息</text>
          <text x="645" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CERT.RSA/.SF</text>

          {/* 安装流程 */}
          <text x="370" y="166" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">APK 安装流程（PMS）</text>

          <rect x="40" y="180" width="200" height="44" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="140" y="198" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">① 拷贝APK</text>
          <text x="140" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">/data/app/包名/</text>

          <text x="250" y="206" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="270" y="180" width="200" height="44" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="198" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">② 解析Manifest</text>
          <text x="370" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PackageParser 解析</text>

          <text x="480" y="206" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="500" y="180" width="200" height="44" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="600" y="198" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">③ 签名校验</text>
          <text x="600" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">验证 CERT 签名</text>

          <rect x="40" y="240" width="200" height="44" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="140" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">④ 权限处理</text>
          <text x="140" y="274" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">声明→授予/拒绝</text>

          <text x="250" y="266" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="270" y="240" width="200" height="44" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">⑤ dex2oat编译</text>
          <text x="370" y="274" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">dex → OAT 机器码</text>

          <text x="480" y="266" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="500" y="240" width="200" height="44" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="600" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">⑥ 注册组件</text>
          <text x="600" y="274" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">写入 packages.xml</text>

          {/* PMS 职责 */}
          <rect x="40" y="310" width="660" height="190" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="332" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">PMS 核心职责</text>

          <text x="60" y="356" fontSize="11" fill="var(--text-secondary)">&bull; 包扫描：系统启动时扫描 /data/app 和 /system/app，解析所有已安装 APK 的 Manifest</text>
          <text x="60" y="374" fontSize="11" fill="var(--text-secondary)">&bull; 包查询：getPackageInfo / getInstalledPackages / queryIntentActivities 供其他组件查询</text>
          <text x="60" y="392" fontSize="11" fill="var(--text-secondary)">&bull; 权限管理：权限声明校验、运行时权限授予、权限组映射、权限继承</text>
          <text x="60" y="410" fontSize="11" fill="var(--text-secondary)">&bull; 签名校验：v1(JAR)/v2(APK签名块)/v3(支持密钥轮换) 三代签名方案</text>
          <text x="60" y="428" fontSize="11" fill="var(--text-secondary)">&bull; 安装卸载：APK 拷贝、dex 优化、组件注册到 packages.xml、卸载清理</text>
          <text x="60" y="446" fontSize="11" fill="var(--text-secondary)">&bull; 共享UID：相同 sharedUserId 的应用可共享进程和数据目录</text>
          <text x="60" y="464" fontSize="11" fill="var(--text-secondary)">&bull; 组件解析：Activity/Service/Receiver/Provider 信息注册到 PMS，供 AMS 调度查询</text>
          <text x="60" y="482" fontSize="11" fill="var(--text-secondary)">&bull; dex2oat：安装时将 DEX 编译为 OAT（AOT），提升运行时启动速度</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        PMS包管理——APK结构解析、六步安装流程（拷贝/解析/签名/权限/dex2oat/注册）、权限与签名校验
      </figcaption>
    </figure>
  );
}
