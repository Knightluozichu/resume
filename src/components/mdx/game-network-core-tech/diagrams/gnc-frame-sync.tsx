/**
 * <GncFrameSyncDiagram>：帧同步（Lockstep）——输入收集、广播、确定性演算流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GncFrameSyncDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="帧同步 Lockstep 流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            帧同步（Lockstep）：只传输入，各自演算
          </text>

          {/* 三个客户端 */}
          <rect x="30" y="54" width="150" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="105" y="76" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">客户端 A</text>
          <text x="105" y="94" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">输入: 向前移动</text>

          <rect x="30" y="120" width="150" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="105" y="142" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">客户端 B</text>
          <text x="105" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">输入: 向左转</text>

          <rect x="30" y="186" width="150" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="105" y="208" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">客户端 C</text>
          <text x="105" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">输入: 开火</text>

          {/* 箭头到服务器 */}
          <text x="210" y="90" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="210" y="156" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="210" y="222" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 服务器：帧锁定收集 */}
          <rect x="240" y="100" width="200" height="96" rx="10" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="340" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">服务器</text>
          <text x="340" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">帧锁定：收集第 N 帧</text>
          <text x="340" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">所有玩家输入到齐</text>
          <text x="340" y="176" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">才推进 → 广播</text>
          <text x="340" y="190" textAnchor="middle" fontSize="10" fill="var(--danger)">最慢玩家拖住全员</text>

          {/* 广播箭头 */}
          <text x="465" y="90" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="465" y="156" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="465" y="222" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 三个客户端各自演算 */}
          <rect x="500" y="54" width="210" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="605" y="76" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">客户端 A 本地演算</text>
          <text x="605" y="94" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">确定性模拟：A 前 + B 转 + C 射</text>

          <rect x="500" y="120" width="210" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="605" y="142" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">客户端 B 本地演算</text>
          <text x="605" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">相同输入 → 相同结果</text>

          <rect x="500" y="186" width="210" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="605" y="208" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">客户端 C 本地演算</text>
          <text x="605" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">相同输入 → 相同结果</text>

          {/* 确定性要求 */}
          <rect x="30" y="268" width="680" height="146" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">确定性模拟：帧同步的生命线</text>

          <rect x="50" y="300" width="150" height="40" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="125" y="316" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">禁止浮点数</text>
          <text x="125" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">用定点数</text>

          <rect x="215" y="300" width="150" height="40" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="290" y="316" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">随机数同步</text>
          <text x="290" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">相同种子 + 调用序</text>

          <rect x="380" y="300" width="150" height="40" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="455" y="316" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">固定遍历顺序</text>
          <text x="455" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">禁用哈希表遍历</text>

          <rect x="545" y="300" width="150" height="40" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="620" y="316" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">固定帧步长</text>
          <text x="620" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不依赖 deltaTime</text>

          <text x="370" y="370" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">一个 ULP 浮点误差经万帧积累 → 状态分叉 → 不同客户端看到不同世界</text>
          <text x="370" y="392" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">帧锁定代价：延迟取决于最慢玩家 → 适合 2-8 人低延迟对战</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        帧同步 Lockstep——只传输入、各自确定性演算，帧锁定保证多端一致
      </figcaption>
    </figure>
  );
}
