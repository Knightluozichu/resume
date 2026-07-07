/**
 * <HfdObserverDiagram>：观察者模式 UML 类图（Head First 设计模式 · 观察者模式章）。
 *
 * 以气象站为例：
 *   WeatherData（Subject）维护观察者列表，数据更新时调用 notifyObservers()。
 *   CurrentConditionsDisplay、StatisticsDisplay、ForecastDisplay（Observers）注册订阅。
 *   左侧 Subject 结构，右侧 Observer 结构，中间用注册/通知箭头连接。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function HfdObserverDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="观察者模式 UML 类图。Subject 接口定义 registerObserver、removeObserver、notifyObservers 三个方法。WeatherData 实现 Subject，维护 observers 列表，数据变化时调用 notifyObservers 遍历通知。Observer 接口定义 update 方法。CurrentConditionsDisplay、StatisticsDisplay、ForecastDisplay 实现 Observer 接口并注册到 WeatherData。推模式 Subject 把数据推给 Observer，拉模式 Observer 从 Subject 拉取所需数据。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            观察者模式 · 气象站示例
          </text>
          <text x={VIEW_W / 2} y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Subject 维护订阅列表，数据变化时通知所有 Observer；Observer 注册后自动接收更新
          </text>

          {/* ===== 左侧：Subject 接口 ===== */}
          <rect x="40" y="78" width="200" height="72" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="4 3" />
          <rect x="40" y="78" width="200" height="24" rx="8" fill="var(--accent)" fillOpacity="0.12" />
          <text x="140" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">«interface» Subject</text>
          <text x="50" y="120" fontSize="11" fill="var(--text-primary)">+ registerObserver(o)</text>
          <text x="50" y="136" fontSize="11" fill="var(--text-primary)">+ removeObserver(o)</text>

          {/* ===== 左侧：WeatherData（ConcreteSubject） ===== */}
          <rect x="40" y="178" width="200" height="100" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <rect x="40" y="178" width="200" height="24" rx="8" fill="var(--accent)" fillOpacity="0.12" />
          <text x="140" y="195" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">WeatherData</text>
          <text x="50" y="220" fontSize="11" fill="var(--text-primary)">- observers: List</text>
          <line x1="50" y1="226" x2="230" y2="226" stroke="var(--border)" strokeWidth="1" />
          <text x="50" y="242" fontSize="11" fill="var(--text-primary)">+ notifyObservers()</text>
          <text x="50" y="258" fontSize="11" fill="var(--text-primary)">+ measurementsChanged()</text>
          <text x="50" y="272" fontSize="11" fill="var(--text-secondary)">→ 遍历调用 update()</text>

          {/* 实现箭头：WeatherData → Subject */}
          <line x1="140" y1="178" x2="140" y2="150" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="4 3" />
          <polygon points="140,150 137,156 143,156" fill="var(--accent)" />

          {/* ===== 右侧：Observer 接口 ===== */}
          <rect x="480" y="78" width="200" height="60" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.4" strokeDasharray="4 3" />
          <rect x="480" y="78" width="200" height="24" rx="8" fill="var(--success)" fillOpacity="0.12" />
          <text x="580" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">«interface» Observer</text>
          <text x="580" y="122" textAnchor="middle" fontSize="11" fill="var(--text-primary)">+ update(temp, hum, pres)</text>

          {/* ===== 右侧：三个具体 Observer ===== */}
          <rect x="480" y="158" width="200" height="28" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />
          <text x="580" y="177" textAnchor="middle" fontSize="11" fill="var(--text-primary)">CurrentConditionsDisplay</text>

          <rect x="480" y="194" width="200" height="28" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />
          <text x="580" y="213" textAnchor="middle" fontSize="11" fill="var(--text-primary)">StatisticsDisplay</text>

          <rect x="480" y="230" width="200" height="28" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />
          <text x="580" y="249" textAnchor="middle" fontSize="11" fill="var(--text-primary)">ForecastDisplay</text>

          {/* 实现箭头：Observer ← 具体类 */}
          <line x1="580" y1="138" x2="580" y2="158" stroke="var(--success)" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="560" y1="138" x2="540" y2="194" stroke="var(--success)" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="600" y1="138" x2="620" y2="230" stroke="var(--success)" strokeWidth="1.2" strokeDasharray="4 3" />

          {/* ===== 中间：注册与通知箭头 ===== */}
          {/* 注册箭头：Observer → Subject */}
          <line x1="480" y1="100" x2="240" y2="100" stroke="var(--text-secondary)" strokeWidth="1.2" strokeDasharray="3 3" />
          <polygon points="240,100 246,97 246,103" fill="var(--text-secondary)" />
          <text x="360" y="94" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">registerObserver() 注册订阅</text>

          {/* 通知箭头：Subject → Observer */}
          <line x1="240" y1="210" x2="480" y2="172" stroke="var(--accent)" strokeWidth="1.6" />
          <polygon points="480,172 472,168 473,176" fill="var(--accent)" />
          <text x="360" y="200" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">notifyObservers() → update()</text>
          <text x="360" y="216" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数据变化时通知所有订阅者</text>

          {/* ===== 底部推拉对比 ===== */}
          <rect x="40" y="316" width="310" height="78" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="338" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">推模式（Push）</text>
          <text x="50" y="358" fontSize="11" fill="var(--text-primary)">Subject 把所有数据推给 Observer，</text>
          <text x="50" y="374" fontSize="11" fill="var(--text-primary)">不管 Observer 是否需要。简单直接，</text>
          <text x="50" y="390" fontSize="11" fill="var(--text-primary)">但 Observer 被迫接收不需要的字段。</text>

          <rect x="370" y="316" width="310" height="78" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="525" y="338" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">拉模式（Pull）</text>
          <text x="380" y="358" fontSize="11" fill="var(--text-primary)">notify 只传 Subject 自身引用，</text>
          <text x="380" y="374" fontSize="11" fill="var(--text-primary)">Observer 按需调用 getter 拉取数据。</text>
          <text x="380" y="390" fontSize="11" fill="var(--text-primary)">更灵活，未来加字段不改 update 签名。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Subject 维护观察者列表，数据变化时遍历通知。观察者通过注册获得更新，解除耦合——Subject 不需要知道观察者的具体类型。推模式简单但不够灵活，拉模式让观察者按需取数据。
      </figcaption>
    </figure>
  );
}
