/**
 * <MgpUdpTcpDiagram>：UDP vs TCP 选型分析图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgpUdpTcpDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="UDP vs TCP 选型分析图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            UDP vs TCP：丢包场景行为对比
          </text>

          {/* 左侧：TCP 队头阻塞 */}
          <rect x="30" y="50" width="335" height="200" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="197" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">TCP：队头阻塞</text>

          <text x="50" y="94" fontSize="10" fill="var(--text-secondary)">服务器发送:</text>
          <rect x="120" y="82" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="135" y="96" textAnchor="middle" fontSize="9" fill="var(--success)">1</text>
          <rect x="152" y="82" width="30" height="20" rx="3" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="167" y="96" textAnchor="middle" fontSize="9" fill="var(--danger)">2</text>
          <rect x="184" y="82" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="199" y="96" textAnchor="middle" fontSize="9" fill="var(--success)">3</text>
          <rect x="216" y="82" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="231" y="96" textAnchor="middle" fontSize="9" fill="var(--success)">4</text>
          <rect x="248" y="82" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="263" y="96" textAnchor="middle" fontSize="9" fill="var(--success)">5</text>

          <text x="50" y="122" fontSize="10" fill="var(--text-secondary)">包 2 丢失:</text>
          <rect x="120" y="110" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="135" y="124" textAnchor="middle" fontSize="9" fill="var(--success)">1</text>
          <text x="167" y="124" textAnchor="middle" fontSize="9" fill="var(--danger)">X</text>
          <rect x="184" y="110" width="30" height="20" rx="3" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" strokeDasharray="3" />
          <text x="199" y="124" textAnchor="middle" fontSize="9" fill="var(--warning)">3</text>
          <rect x="216" y="110" width="30" height="20" rx="3" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" strokeDasharray="3" />
          <text x="231" y="124" textAnchor="middle" fontSize="9" fill="var(--warning)">4</text>
          <rect x="248" y="110" width="30" height="20" rx="3" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" strokeDasharray="3" />
          <text x="263" y="124" textAnchor="middle" fontSize="9" fill="var(--warning)">5</text>

          <text x="50" y="152" fontSize="10" fill="var(--text-secondary)">交付应用:</text>
          <rect x="120" y="140" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="135" y="154" textAnchor="middle" fontSize="9" fill="var(--success)">1</text>
          <text x="167" y="154" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">...</text>
          <text x="200" y="154" textAnchor="middle" fontSize="8" fill="var(--danger)">等待 2 重传</text>

          <text x="50" y="184" fontSize="10" fill="var(--danger)">全部阻塞!</text>
          <text x="50" y="200" fontSize="9" fill="var(--text-tertiary)">3,4,5 已到达但不交付</text>
          <text x="50" y="216" fontSize="9" fill="var(--text-tertiary)">额外延迟 = 1 RTT</text>
          <text x="50" y="232" fontSize="9" fill="var(--text-tertiary)">帧 2 已过时，重传无意义</text>

          {/* 右侧：UDP 无阻塞 */}
          <rect x="385" y="50" width="325" height="200" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="547" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">UDP：无队头阻塞</text>

          <text x="405" y="94" fontSize="10" fill="var(--text-secondary)">服务器发送:</text>
          <rect x="475" y="82" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="490" y="96" textAnchor="middle" fontSize="9" fill="var(--success)">1</text>
          <rect x="507" y="82" width="30" height="20" rx="3" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="522" y="96" textAnchor="middle" fontSize="9" fill="var(--danger)">2</text>
          <rect x="539" y="82" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="554" y="96" textAnchor="middle" fontSize="9" fill="var(--success)">3</text>
          <rect x="571" y="82" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="586" y="96" textAnchor="middle" fontSize="9" fill="var(--success)">4</text>
          <rect x="603" y="82" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="618" y="96" textAnchor="middle" fontSize="9" fill="var(--success)">5</text>

          <text x="405" y="122" fontSize="10" fill="var(--text-secondary)">包 2 丢失:</text>
          <rect x="475" y="110" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="490" y="124" textAnchor="middle" fontSize="9" fill="var(--success)">1</text>
          <text x="522" y="124" textAnchor="middle" fontSize="9" fill="var(--danger)">X</text>
          <rect x="539" y="110" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="554" y="124" textAnchor="middle" fontSize="9" fill="var(--success)">3</text>
          <rect x="571" y="110" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="586" y="124" textAnchor="middle" fontSize="9" fill="var(--success)">4</text>
          <rect x="603" y="110" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="618" y="124" textAnchor="middle" fontSize="9" fill="var(--success)">5</text>

          <text x="405" y="152" fontSize="10" fill="var(--text-secondary)">交付应用:</text>
          <rect x="475" y="140" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="490" y="154" textAnchor="middle" fontSize="9" fill="var(--success)">1</text>
          <rect x="539" y="140" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="554" y="154" textAnchor="middle" fontSize="9" fill="var(--success)">3</text>
          <rect x="571" y="140" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="586" y="154" textAnchor="middle" fontSize="9" fill="var(--success)">4</text>
          <rect x="603" y="140" width="30" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="618" y="154" textAnchor="middle" fontSize="9" fill="var(--success)">5</text>

          <text x="405" y="184" fontSize="10" fill="var(--success)">立即交付!</text>
          <text x="405" y="200" fontSize="9" fill="var(--text-tertiary)">3,4,5 不等 2 重传</text>
          <text x="405" y="216" fontSize="9" fill="var(--text-tertiary)">无额外延迟</text>
          <text x="405" y="232" fontSize="9" fill="var(--text-tertiary)">帧 3 已是最新状态</text>

          {/* 下方：选型决策表 */}
          <rect x="30" y="270" width="680" height="120" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="292" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">选型决策</text>

          <text x="60" y="314" fontSize="10" fontWeight="600" fill="var(--text-secondary)">UDP 适合:</text>
          <text x="60" y="330" fontSize="9" fill="var(--text-tertiary)">实时游戏 / VoIP / 视频流</text>
          <text x="60" y="344" fontSize="9" fill="var(--text-tertiary)">低延迟 &gt; 可靠性</text>
          <text x="60" y="358" fontSize="9" fill="var(--text-tertiary)">可容忍丢包的数据</text>
          <text x="60" y="372" fontSize="9" fill="var(--text-tertiary)">按需可靠（自建 ACK）</text>

          <text x="400" y="314" fontSize="10" fontWeight="600" fill="var(--text-secondary)">TCP 适合:</text>
          <text x="400" y="330" fontSize="9" fill="var(--text-tertiary)">登录 / 聊天 / 文件传输 / HTTP</text>
          <text x="400" y="344" fontSize="9" fill="var(--text-tertiary)">可靠性 &gt; 延迟</text>
          <text x="400" y="358" fontSize="9" fill="var(--text-tertiary)">不能丢任何数据</text>
          <text x="400" y="372" fontSize="9" fill="var(--text-tertiary)">顺序重要</text>

          <text x={VIEW_W / 2} y="416" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：TCP_NODELAY 只解决 Nagle，不解决队头阻塞——实时游戏必须用 UDP
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        UDP vs TCP 选型分析——丢包场景行为对比与选型决策
      </figcaption>
    </figure>
  );
}
