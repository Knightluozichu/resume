/**
 * <MgaMicroserviceDiagram>：微服务拆分与通信图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function MgaMicroserviceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="微服务拆分与通信图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏服务端微服务拆分与通信
          </text>

          {/* 服务注册中心 */}
          <rect x="290" y="48" width="160" height="40" rx="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="73" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">服务注册中心 (Consul/etcd)</text>

          {/* 注册连线 */}
          <line x1="150" y1="120" x2="310" y2="88" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4,3" />
          <line x1="370" y1="120" x2="370" y2="88" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4,3" />
          <line x1="590" y1="120" x2="430" y2="88" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4,3" />

          {/* 战斗服 */}
          <rect x="50" y="120" width="200" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="142" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">战斗服</text>
          <text x="150" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">技能 / 伤害 / 碰撞</text>

          {/* 经济服 */}
          <rect x="270" y="120" width="200" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="142" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">经济服</text>
          <text x="370" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">背包 / 交易 / 充值</text>

          {/* 社交服 */}
          <rect x="490" y="120" width="200" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="590" y="142" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">社交服</text>
          <text x="590" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">好友 / 公会 / 聊天</text>

          {/* gRPC 同步调用 */}
          <line x1="250" y1="148" x2="270" y2="148" stroke="var(--success)" strokeWidth="2" />
          <polygon points="268,145 274,148 268,151" fill="var(--success)" />
          <text x="260" y="138" textAnchor="middle" fontSize="9" fill="var(--success)">gRPC</text>

          <line x1="470" y1="148" x2="490" y2="148" stroke="var(--success)" strokeWidth="2" />
          <polygon points="488,145 494,148 488,151" fill="var(--success)" />
          <text x="480" y="138" textAnchor="middle" fontSize="9" fill="var(--success)">gRPC</text>

          {/* 消息队列 */}
          <rect x="150" y="210" width="440" height="50" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="5,3" />
          <text x="370" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">消息队列 (Kafka / Redis Stream)</text>
          <text x="370" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">异步通信：日志上报 / 广播通知 / 削峰填谷</text>

          {/* 异步连线 */}
          <line x1="150" y1="176" x2="200" y2="210" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4,3" />
          <line x1="370" y1="176" x2="370" y2="210" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4,3" />
          <line x1="590" y1="176" x2="540" y2="210" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4,3" />

          {/* 日志服 */}
          <rect x="100" y="290" width="160" height="48" rx="8" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="180" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">日志服</text>
          <text x="180" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">异步消费</text>

          {/* 排行榜服 */}
          <rect x="290" y="290" width="160" height="48" rx="8" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="370" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">排行榜服</text>
          <text x="370" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">异步聚合</text>

          {/* 告警服 */}
          <rect x="480" y="290" width="160" height="48" rx="8" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="560" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">告警服</text>
          <text x="560" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">异步通知</text>

          {/* 消费连线 */}
          <line x1="200" y1="260" x2="180" y2="290" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="370" y1="260" x2="370" y2="290" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="540" y1="260" x2="560" y2="290" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 底部说明 */}
          <text x="150" y="372" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">同步 gRPC</text>
          <text x="150" y="388" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">阻塞等待 / 延迟敏感</text>
          <text x="150" y="402" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">需要返回结果</text>

          <text x="590" y="372" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">异步消息队列</text>
          <text x="590" y="388" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不阻塞 / 削峰填谷</text>
          <text x="590" y="402" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">只需通知/记录</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏服务端微服务拆分与通信——gRPC 同步调用 + 消息队列异步通信 + 服务注册与发现
      </figcaption>
    </figure>
  );
}
