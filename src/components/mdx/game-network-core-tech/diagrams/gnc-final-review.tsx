/**
 * <GncFinalReviewDiagram>：全书总复习——一次开火的完整网络旅程四层流水线图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GncFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书总复习 一次开火的完整网络旅程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书总复习：一次开火的完整网络旅程
          </text>

          {/* 玩家 A 开火 */}
          <rect x="20" y="50" width="120" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="80" y="74" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">玩家 A 开火</text>

          <text x="155" y="74" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 传输层 */}
          <rect x="175" y="44" width="150" height="52" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="250" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">① 传输层</text>
          <text x="250" y="76" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可靠 UDP 封包+序号</text>
          <text x="250" y="88" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">拥塞控制限速/重传</text>

          <text x="340" y="74" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 安全层（服务器侧） */}
          <rect x="360" y="44" width="150" height="52" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="435" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">② 安全层</text>
          <text x="435" y="76" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">AES-GCM 解密+验签</text>
          <text x="435" y="88" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">反作弊校验输入</text>

          <text x="525" y="74" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 同步层 */}
          <rect x="545" y="44" width="175" height="52" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="632" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">③ 同步层</text>
          <text x="632" y="76" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">帧同步: 广播输入各端演算</text>
          <text x="632" y="88" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">状态同步: 权威演算+回退判定</text>

          {/* 向下箭头 */}
          <text x="632" y="116" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 优化层 */}
          <rect x="470" y="126" width="250" height="52" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="595" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">④ 优化层</text>
          <text x="595" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Delta 压缩 + 位打包 + 量化</text>
          <text x="595" y="170" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">插值渲染 + 前移预测补偿延迟</text>

          <text x="460" y="156" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 玩家 B 看到 */}
          <rect x="280" y="132" width="170" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="365" y="156" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">玩家 B 屏幕显示</text>

          {/* 四层跨层影响 */}
          <rect x="20" y="196" width="700" height="226" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="216" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">四层跨层设计：决策跨层传递</text>

          {/* 跨层例子 1 */}
          <rect x="40" y="230" width="320" height="80" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="200" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">例 1：包序号跨三层复用</text>
          <text x="200" y="268" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">传输层序号 → 安全层防重放依据</text>
          <text x="200" y="282" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ 回退判定时间戳索引</text>
          <text x="200" y="300" textAnchor="middle" fontSize="9" fill="var(--success)">一个序号三层受益</text>

          {/* 跨层例子 2 */}
          <rect x="380" y="230" width="320" height="80" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="540" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">例 2：量化精度影响判定</text>
          <text x="540" y="268" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">优化层量化到厘米 → 客户端与</text>
          <text x="540" y="282" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">服务器有厘米级偏差 → 命中箱留容差</text>
          <text x="540" y="300" textAnchor="middle" fontSize="9" fill="var(--warning)">否则正常射击被判未命中</text>

          {/* 跨层例子 3 */}
          <rect x="40" y="320" width="320" height="80" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="200" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">例 3：同步策略影响带宽</text>
          <text x="200" y="358" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">帧同步只传输入 → 天然省带宽</text>
          <text x="200" y="372" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">状态同步必须配 Delta 压缩</text>
          <text x="200" y="390" textAnchor="middle" fontSize="9" fill="var(--danger)">同步层选择决定优化层需求</text>

          {/* 跨层例子 4 */}
          <rect x="380" y="320" width="320" height="80" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="540" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">例 4：系统级权衡</text>
          <text x="540" y="358" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">带宽不够 → 降同步频率比压缩有效</text>
          <text x="540" y="372" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">延迟高 → 降插值延迟比优化算法直接</text>
          <text x="540" y="390" textAnchor="middle" fontSize="9" fill="var(--accent)">找真正瓶颈，非盲目局部优化</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习——一次开火走完传输→安全→同步→优化四层，及四层跨层设计影响
      </figcaption>
    </figure>
  );
}
