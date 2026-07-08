/**
 * <MgaCsModelDiagram>：C/S 架构模型对比图解（专服/世界服/大厅服）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgaCsModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C/S 架构模型对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            三种 C/S 架构模型对比
          </text>

          {/* 专服架构 */}
          <rect x="30" y="50" width="210" height="360" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="135" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">专服架构</text>
          <text x="135" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">数据隔离 / 选服登录</text>

          <rect x="50" y="110" width="170" height="36" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="133" textAnchor="middle" fontSize="11" fill="var(--success)">客户端 → 选服</text>

          <rect x="50" y="158" width="80" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="90" y="181" textAnchor="middle" fontSize="10" fill="var(--accent)">一区</text>
          <rect x="140" y="158" width="80" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="180" y="181" textAnchor="middle" fontSize="10" fill="var(--accent)">二区</text>

          <text x="135" y="218" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">数据互不相通</text>
          <text x="135" y="236" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">好友不能跨服</text>

          <text x="135" y="270" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">适合</text>
          <text x="135" y="288" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">RPG / SLG</text>
          <text x="135" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">传统 MMO</text>

          <text x="135" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">优点</text>
          <text x="135" y="358" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">隔离性好</text>
          <text x="135" y="372" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">运维简单</text>
          <text x="135" y="392" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">缺点</text>
          <text x="135" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">无法跨服</text>

          {/* 世界服架构 */}
          <rect x="265" y="50" width="210" height="360" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">世界服架构</text>
          <text x="370" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">共享世界 / 网关接入</text>

          <rect x="285" y="110" width="170" height="36" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="133" textAnchor="middle" fontSize="11" fill="var(--warning)">客户端 → 网关</text>

          <rect x="285" y="158" width="170" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="181" textAnchor="middle" fontSize="10" fill="var(--accent)">统一大世界</text>

          <rect x="295" y="200" width="45" height="28" rx="4" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="317" y="218" textAnchor="middle" fontSize="9" fill="var(--warning)">分片A</text>
          <rect x="345" y="200" width="45" height="28" rx="4" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="367" y="218" textAnchor="middle" fontSize="9" fill="var(--warning)">分片B</text>
          <rect x="395" y="200" width="45" height="28" rx="4" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="417" y="218" textAnchor="middle" fontSize="9" fill="var(--warning)">分片C</text>

          <text x="370" y="252" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">所有玩家同一个世界</text>
          <text x="370" y="270" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">无缝大世界体验</text>

          <text x="370" y="300" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">适合</text>
          <text x="370" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">大世界 MMO</text>
          <text x="370" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">元宇宙</text>

          <text x="370" y="365" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">优点</text>
          <text x="370" y="383" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">无缝体验</text>
          <text x="370" y="397" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">跨服社交</text>
          <text x="370" y="406" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">缺点: 架构复杂</text>

          {/* 大厅服架构 */}
          <rect x="500" y="50" width="210" height="360" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="605" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">大厅服架构</text>
          <text x="605" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">匹配 + 对战分离</text>

          <rect x="520" y="110" width="170" height="36" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="605" y="133" textAnchor="middle" fontSize="11" fill="var(--accent)">客户端 → 大厅</text>

          <rect x="520" y="158" width="170" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="605" y="181" textAnchor="middle" fontSize="10" fill="var(--warning)">大厅匹配</text>

          <rect x="530" y="200" width="45" height="28" rx="4" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="552" y="218" textAnchor="middle" fontSize="9" fill="var(--accent)">对战1</text>
          <rect x="580" y="200" width="45" height="28" rx="4" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="602" y="218" textAnchor="middle" fontSize="9" fill="var(--accent)">对战2</text>
          <rect x="630" y="200" width="45" height="28" rx="4" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="652" y="218" textAnchor="middle" fontSize="9" fill="var(--accent)">对战N</text>

          <text x="605" y="252" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">对战服无状态</text>
          <text x="605" y="270" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">打完回大厅</text>

          <text x="605" y="300" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">适合</text>
          <text x="605" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MOBA / FPS</text>
          <text x="605" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">吃鸡 / 竞技</text>

          <text x="605" y="365" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">优点</text>
          <text x="605" y="383" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">易扩缩容</text>
          <text x="605" y="397" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">对战隔离</text>
          <text x="605" y="406" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">缺点: 大厅单点</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种 C/S 架构模型对比——专服隔离、世界服共享、大厅服分离
      </figcaption>
    </figure>
  );
}
