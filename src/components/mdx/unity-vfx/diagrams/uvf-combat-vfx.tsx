/**
 * <UvfCombatVfxDiagram>：战斗特效综合（技能特效、打击感、连击）图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function UvfCombatVfxDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 战斗特效综合技能打击感连击图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">战斗特效综合：技能 &middot; 打击感 &middot; 连击</text>

          {/* 技能特效时间线 */}
          <text x="360" y="60" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">技能特效时间线</text>
          <line x1="40" y1="80" x2="680" y2="80" stroke="var(--text-tertiary)" strokeWidth="2" />

          {/* 蓄力 */}
          <rect x="50" y="70" width="100" height="24" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="100" y="87" textAnchor="middle" fontSize="10" fill="var(--success)">蓄力 Charge</text>

          <text x="165" y="87" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 释放 */}
          <rect x="180" y="70" width="100" height="24" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="230" y="87" textAnchor="middle" fontSize="10" fill="var(--accent)">释放 Cast</text>

          <text x="295" y="87" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 命中 */}
          <rect x="310" y="70" width="100" height="24" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="360" y="87" textAnchor="middle" fontSize="10" fill="var(--warning)">命中 Impact</text>

          <text x="425" y="87" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 余波 */}
          <rect x="440" y="70" width="100" height="24" rx="6" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="490" y="87" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">余波 Aftermath</text>

          <text x="555" y="87" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 结束 */}
          <rect x="570" y="70" width="100" height="24" rx="6" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3,2" />
          <text x="620" y="87" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">结束 End</text>

          {/* 打击感四要素 */}
          <text x="360" y="125" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">打击感四要素</text>

          <rect x="40" y="140" width="150" height="80" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="165" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">1. 顿帧 Hit Stop</text>
          <text x="115" y="185" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Time.timeScale = 0</text>
          <text x="115" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">持续 0.05-0.1s</text>
          <text x="115" y="215" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">&rarr; 恢复</text>

          <rect x="210" y="140" width="150" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="285" y="165" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">2. 屏幕震屏</text>
          <text x="285" y="185" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Camera Shake</text>
          <text x="285" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">强度 &times; 衰减</text>
          <text x="285" y="215" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">PerlinNoise</text>

          <rect x="380" y="140" width="150" height="80" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="455" y="165" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">3. 特效爆发</text>
          <text x="455" y="185" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">粒子 + 光效</text>
          <text x="455" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Burst 发射</text>
          <text x="455" y="215" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Emission +50</text>

          <rect x="550" y="140" width="130" height="80" rx="8" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="615" y="165" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">4. 音效</text>
          <text x="615" y="185" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">命中音 + 低频</text>
          <text x="615" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">+ 屏幕闪白</text>
          <text x="615" y="215" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">同步爆发</text>

          {/* 连击系统 */}
          <text x="360" y="255" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">连击 Combo 系统</text>

          <rect x="80" y="270" width="120" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="297" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Hit 1: 100 dmg</text>

          <text x="215" y="297" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="230" y="270" width="120" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="290" y="297" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Hit 2: &times;1.2</text>

          <text x="365" y="297" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="380" y="270" width="120" height="44" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="440" y="297" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Hit 3: &times;1.5</text>

          <text x="515" y="297" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="530" y="270" width="120" height="44" rx="6" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="590" y="297" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Combo Break!</text>

          {/* 底部总结 */}
          <rect x="40" y="335" width="640" height="44" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="363" textAnchor="middle" fontSize="11" fill="var(--text-primary)">战斗特效 = 技能时间线 + 打击感四要素 + 连击递进，三者缺一不可</text>
          <text x="360" y="395" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">顿帧 &lt; 0.1s &middot; 震屏强度递增 &middot; 粒子 Burst 同步音效 &middot; 连击倍率曲线驱动伤害飘字</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        战斗特效综合——Unity 3D 游戏特效制作典型实例
      </figcaption>
    </figure>
  );
}
