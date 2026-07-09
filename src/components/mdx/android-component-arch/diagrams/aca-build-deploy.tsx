/**
 * <AcaBuildDeployDiagram>：构建与部署——多模块构建图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function AcaBuildDeployDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="多模块构建与部署流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            多模块构建与部署流程
          </text>

          {/* 上层：模块结构 */}
          <rect x="30" y="50" width="680" height="160" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Gradle 多模块结构</text>

          <rect x="50" y="88" width="100" height="44" rx="6" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1" />
          <text x="100" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">app</text>
          <text x="100" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">壳工程</text>

          <rect x="165" y="88" width="100" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="215" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">module-home</text>
          <text x="215" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">业务组件</text>

          <rect x="280" y="88" width="100" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="330" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">module-order</text>
          <text x="330" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">业务组件</text>

          <rect x="395" y="88" width="100" height="44" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="445" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">common-biz</text>
          <text x="445" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">公共业务</text>

          <rect x="510" y="88" width="100" height="44" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="560" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">common-core</text>
          <text x="560" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">基础架构</text>

          <rect x="625" y="88" width="70" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="660" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">sdk</text>
          <text x="660" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">第三方</text>

          <text x="370" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">isRunAlone = true &rarr; 独立运行（debug） / false &rarr; 作为依赖（release）</text>
          <text x="370" y="180" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">build.gradle 通过 isRunAlone 切换 application/com library 插件</text>

          {/* 中层：构建流程 */}
          <rect x="30" y="230" width="680" height="130" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="254" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">构建流程</text>

          <rect x="50" y="268" width="120" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="110" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Gradle 配置</text>

          <text x="180" y="290" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="195" y="268" width="120" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="255" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">APT 处理</text>

          <text x="325" y="290" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="340" y="268" width="120" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="400" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编译打包</text>

          <text x="470" y="290" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="485" y="268" width="120" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">签名混淆</text>

          <text x="615" y="290" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="630" y="268" width="70" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="665" y="290" textAnchor="middle" fontSize="10" fill="var(--success)">APK</text>

          <text x="370" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">productFlavors: dev / staging / prod（多渠道打包）</text>
          <text x="370" y="350" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">buildTypes: debug（可独立运行）/ release（合并为库）</text>

          {/* 下层：部署模式 */}
          <rect x="30" y="380" width="330" height="100" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="404" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">集成模式</text>
          <text x="50" y="428" fontSize="10" fill="var(--text-secondary)">&#x2022; 所有组件作为 library 依赖</text>
          <text x="50" y="448" fontSize="10" fill="var(--text-secondary)">&#x2022; 壳工程整合所有组件</text>
          <text x="50" y="468" fontSize="9" fill="var(--text-tertiary)">完整 App 打包发布</text>

          <rect x="380" y="380" width="330" height="100" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="404" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">独立模式</text>
          <text x="400" y="428" fontSize="10" fill="var(--text-secondary)">&#x2022; 单组件作为 application 独立运行</text>
          <text x="400" y="448" fontSize="10" fill="var(--text-secondary)">&#x2022; 组件可单独编译调试</text>
          <text x="400" y="468" fontSize="9" fill="var(--text-tertiary)">开发期快速调试单个组件</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        多模块构建与部署——Gradle多模块结构、构建流程、集成/独立模式切换
      </figcaption>
    </figure>
  );
}
