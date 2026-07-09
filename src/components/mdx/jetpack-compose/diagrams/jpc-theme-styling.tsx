/**
 * <JpcThemeStylingDiagram>：Compose 主题体系（MaterialTheme）结构图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function JpcThemeStylingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Compose主题体系MaterialTheme结构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            主题体系——MaterialTheme 三大支柱
          </text>

          {/* 中心：MaterialTheme */}
          <rect x="270" y="50" width="200" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">MaterialTheme</text>
          <text x="370" y="90" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@Composable 作用域提供</text>

          <text x="140" y="120" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="120" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="600" y="120" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 三大支柱 */}
          {/* ColorScheme */}
          <rect x="30" y="130" width="200" height="220" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="130" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">ColorScheme</text>

          <rect x="50" y="168" width="160" height="28" rx="5" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="0.8" />
          <text x="130" y="186" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">primary / onPrimary</text>

          <rect x="50" y="202" width="160" height="28" rx="5" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="0.8" />
          <text x="130" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">secondary / onSecondary</text>

          <rect x="50" y="236" width="160" height="28" rx="5" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="0.8" />
          <text x="130" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">surface / onSurface</text>

          <rect x="50" y="270" width="160" height="28" rx="5" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="0.8" />
          <text x="130" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">error / background</text>

          <text x="130" y="318" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">lightColorScheme()</text>
          <text x="130" y="336" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">darkColorScheme()</text>

          {/* Typography */}
          <rect x="270" y="130" width="200" height="220" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Typography</text>

          <rect x="290" y="168" width="160" height="28" rx="5" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="370" y="186" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">displayLarge - displaySmall</text>

          <rect x="290" y="202" width="160" height="28" rx="5" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="370" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">headlineLarge - Small</text>

          <rect x="290" y="236" width="160" height="28" rx="5" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="370" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">titleLarge - Small</text>

          <rect x="290" y="270" width="160" height="28" rx="5" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="370" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">bodyLarge - labelSmall</text>

          <text x="370" y="318" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">TextStyle: fontSize</text>
          <text x="370" y="336" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">fontWeight / lineHeight</text>

          {/* Shapes */}
          <rect x="510" y="130" width="200" height="220" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="610" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">Shapes</text>

          <rect x="530" y="168" width="160" height="28" rx="5" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="610" y="186" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">small (Button)</text>

          <rect x="530" y="202" width="160" height="28" rx="5" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="610" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">medium (Card)</text>

          <rect x="530" y="236" width="160" height="28" rx="5" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="610" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">large (Sheet)</text>

          <rect x="530" y="270" width="160" height="28" rx="5" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="610" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">RoundedCornerShape</text>

          <text x="610" y="318" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">CutCornerShape</text>
          <text x="610" y="336" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">CircleShape</text>

          {/* 底部：使用方式 */}
          <rect x="30" y="370" width="680" height="120" rx="10" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="392" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">消费方式</text>

          <text x="50" y="414" textAnchor="start" fontSize="11" fill="var(--text-secondary)">MaterialTheme &lbrace; ... &rbrace; 包裹根组件</text>
          <text x="50" y="432" textAnchor="start" fontSize="11" fill="var(--text-secondary)">子组件中：MaterialTheme.colorScheme.primary</text>
          <text x="50" y="450" textAnchor="start" fontSize="11" fill="var(--text-secondary)">子组件中：MaterialTheme.typography.bodyLarge</text>
          <text x="50" y="468" textAnchor="start" fontSize="11" fill="var(--text-secondary)">子组件中：MaterialTheme.shapes.medium</text>
          <text x="50" y="486" textAnchor="start" fontSize="11" fill="var(--text-secondary)">isSystemInDarkTheme() 切换深浅色方案</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compose主题体系——MaterialTheme的ColorScheme/Typography/Shapes三大支柱与消费方式
      </figcaption>
    </figure>
  );
}
