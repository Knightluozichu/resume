/**
 * <RubGemsBundlerDiagram>：Ruby Gems 与 Bundler——包管理与依赖。
 *
 * 展示 Gem 安装、Gemfile 依赖管理、Bundler 工作流。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function RubGemsBundlerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img" aria-label="Ruby Gems 与 Bundler。Gem 是 Ruby 包，Bundler 通过 Gemfile 管理项目依赖和版本锁定。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Ruby Gems 与 Bundler
          </text>
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize="11" fill={secondary}>
            Gem = Ruby 包 · Gemfile = 依赖声明 · Bundler = 版本锁定与隔离
          </text>

          {/* 左半：Gem 命令 */}
          <text x={170} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            Gem 常用命令
          </text>

          <rect x={32} y={86} width={300} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={108} fontSize="11" fill={primary}>gem install rails</text>
          <text x={200} y={108} fontSize="10" fill={secondary}># 安装 gem</text>

          <rect x={32} y={128} width={300} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={150} fontSize="11" fill={primary}>gem uninstall rails</text>
          <text x={200} y={150} fontSize="10" fill={secondary}># 卸载</text>

          <rect x={32} y={170} width={300} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={192} fontSize="11" fill={primary}>gem list</text>
          <text x={120} y={192} fontSize="10" fill={secondary}># 列出已安装</text>

          <rect x={32} y={212} width={300} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={234} fontSize="11" fill={primary}>gem sources</text>
          <text x={140} y={234} fontSize="10" fill={secondary}># 镜像源管理</text>

          <rect x={32} y={254} width={300} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={276} fontSize="11" fill={primary}>gem build mygem.gemspec</text>
          <text x={220} y={276} fontSize="10" fill={secondary}># 打包</text>

          <rect x={32} y={296} width={300} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={318} fontSize="11" fill={primary}>gem push mygem-1.0.gem</text>
          <text x={220} y={318} fontSize="10" fill={secondary}># 发布到 RubyGems</text>

          {/* 右半：Bundler 工作流 */}
          <line x1={336} y1={64} x2={336} y2={360} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <text x={524} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            Bundler 依赖管理流程
          </text>

          {/* Gemfile */}
          <rect x={360} y={86} width={320} height={92} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={372} y={106} fontSize="12" fontWeight="700" fill={success}>Gemfile（声明依赖）</text>
          <text x={372} y={126} fontSize="11" fill={primary}>source "https://rubygems.org"</text>
          <text x={372} y={142} fontSize="11" fill={primary}>gem "rails", "~&gt; 7.0"</text>
          <text x={372} y={158} fontSize="11" fill={primary}>gem "pg", "&gt;= 1.3"</text>
          <text x={372} y={174} fontSize="11" fill={primary}>gem "rspec", group: :test</text>

          {/* bundle install */}
          <rect x={360} y={188} width={320} height={40} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x={520} y={212} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>bundle install</text>

          <line x1={520} y1={228} x2={520} y2={242} stroke={secondary} strokeWidth="1.2" markerEnd="url(#rub-gb-arrow)" />

          {/* Gemfile.lock */}
          <rect x={360} y={242} width={320} height={72} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={372} y={262} fontSize="12" fontWeight="700" fill={warning}>Gemfile.lock（版本锁定）</text>
          <text x={372} y={282} fontSize="11" fill={primary}>rails (= 7.0.4)</text>
          <text x={372} y={298} fontSize="11" fill={primary}>actionpack (= 7.0.4)</text>
          <text x={372} y={312} fontSize="10" fill={secondary}># 精确版本，团队一致</text>

          {/* 底部说明 */}
          <line x1={32} y1={344} x2={VIEW_W - 32} y2={344} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={366} textAnchor="middle" fontSize="11" fill={secondary}>
            bundle exec 确保用项目锁定的 gem 版本运行命令
          </text>
          <text x={VIEW_W / 2} y={384} textAnchor="middle" fontSize="11" fill={secondary}>
            "~&gt; 7.0" = &gt;= 7.0 且 &lt; 8.0（允许小版本升级）· Gemfile.lock 保证可重现构建
          </text>

          <defs>
            <marker id="rub-gb-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Gem 是 Ruby 包的标准格式，Bundler 通过 Gemfile 和 Gemfile.lock 管理项目依赖与版本一致性。
      </figcaption>
    </figure>
  );
}
