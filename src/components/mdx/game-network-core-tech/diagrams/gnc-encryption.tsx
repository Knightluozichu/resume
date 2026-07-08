/**
 * <GncEncryptionDiagram>：加密与安全通信——三大威胁防御与 AES-GCM/ECDHE 流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GncEncryptionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="加密与安全通信三大威胁防御图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            加密与安全通信：三大威胁 + 三层防御
          </text>

          {/* 上方：三大威胁 */}
          <rect x="20" y="48" width="220" height="70" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="130" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">窃听</text>
          <text x="130" y="86" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">抓包读取明文内容</text>
          <text x="130" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">密码/道具/坐标暴露</text>
          <text x="130" y="114" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">→ 加密（AES-GCM）</text>

          <rect x="260" y="48" width="220" height="70" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">篡改</text>
          <text x="370" y="86" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">修改传输中的数据包</text>
          <text x="370" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">移动 1m → 100m</text>
          <text x="370" y="114" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">→ 认证标签（AEAD）</text>

          <rect x="500" y="48" width="220" height="70" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="610" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">重放</text>
          <text x="610" y="86" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">录下旧包反复发送</text>
          <text x="610" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">重复拾取装备</text>
          <text x="610" y="114" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">→ 序号 + 时间戳</text>

          {/* 中间：AES-GCM 加解密流程 */}
          <rect x="20" y="134" width="340" height="170" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="190" y="154" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">AES-GCM 对称加密（AEAD）</text>

          {/* 加密流程 */}
          <rect x="40" y="168" width="80" height="30" rx="5" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="80" y="187" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">明文</text>

          <text x="130" y="187" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="145" y="168" width="90" height="30" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="190" y="183" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">AES-GCM</text>
          <text x="190" y="194" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">key + nonce</text>

          <text x="245" y="187" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="260" y="168" width="60" height="30" rx="5" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="290" y="183" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">密文</text>
          <rect x="260" y="200" width="60" height="16" rx="3" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="290" y="211" textAnchor="middle" fontSize="7" fill="var(--warning)">tag[16]</text>

          <text x="190" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">加密 + 认证一步完成</text>
          <text x="190" y="250" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">nonce = 固定前缀 + 序号（每包递增）</text>
          <text x="190" y="266" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">解密时先验 tag → 不匹配则丢弃</text>
          <text x="190" y="282" textAnchor="middle" fontSize="9" fill="var(--success)">AES-NI 硬件指令：100B 包 &lt; 1μs</text>
          <text x="190" y="296" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">每包独立加密，适合 UDP 无序</text>

          {/* 右侧：ECDHE 密钥交换 */}
          <rect x="380" y="134" width="340" height="170" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="550" y="154" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">ECDHE 密钥交换（前向保密）</text>

          <rect x="400" y="170" width="120" height="30" rx="5" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="460" y="189" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">客户端</text>
          <text x="460" y="200" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">私钥 a + 公钥 A</text>

          <rect x="580" y="170" width="120" height="30" rx="5" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="640" y="189" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">服务器</text>
          <text x="640" y="200" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">私钥 b + 公钥 B</text>

          {/* 交换公钥 */}
          <text x="540" y="210" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">← 交换公钥 A / B →</text>

          <text x="550" y="230" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">各自计算共享密钥</text>
          <rect x="410" y="238" width="130" height="22" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="475" y="253" textAnchor="middle" fontSize="8" fill="var(--success)">a × B = 共享密钥</text>
          <rect x="560" y="238" width="130" height="22" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="625" y="253" textAnchor="middle" fontSize="8" fill="var(--success)">b × A = 相同密钥</text>

          <text x="550" y="278" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">攻击者截获 A、B 也算不出密钥</text>
          <text x="550" y="292" textAnchor="middle" fontSize="9" fill="var(--warning)">临时密钥对，连接结束即销毁</text>
          <text x="550" y="306" textAnchor="middle" fontSize="9" fill="var(--warning)">→ 长期私钥泄露也无法解密历史</text>

          {/* 下方：DTLS */}
          <rect x="20" y="320" width="700" height="100" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="340" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">DTLS：UDP 的 TLS</text>

          <rect x="50" y="354" width="200" height="28" rx="5" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="150" y="372" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">握手包加序号 + 重传</text>

          <rect x="270" y="354" width="200" height="28" rx="5" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="372" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">每包独立加密 + 认证</text>

          <rect x="490" y="354" width="200" height="28" rx="5" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="590" y="372" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">序号窗口防重放</text>

          <text x="370" y="400" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">把 TLS 的加密+认证+完整性搬到 UDP 上，一个包丢不影响其他包</text>
          <text x="370" y="416" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">游戏可直接用 DTLS，或借鉴其设计实现更轻量的包加密</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        加密与安全通信——三大威胁（窃听/篡改/重放）的三层防御与 AES-GCM/ECDHE/DTLS 机制
      </figcaption>
    </figure>
  );
}
