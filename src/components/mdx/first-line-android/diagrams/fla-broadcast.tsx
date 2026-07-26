/**
 * <FlaBroadcastDiagram>：广播机制——标准广播与有序广播图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function FlaBroadcastDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android广播机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="28"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            广播机制：标准广播 vs 有序广播
          </text>

          {/* 左侧：标准广播 */}
          <text
            x="185"
            y="54"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            标准广播（Normal Broadcast）
          </text>

          <rect
            x="60"
            y="66"
            width="250"
            height="40"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.12"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="185"
            y="91"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            sendBroadcast(intent)
          </text>

          <text
            x="185"
            y="122"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-tertiary)"
          >
            &darr; 异步同时送达
          </text>

          <rect
            x="60"
            y="134"
            width="75"
            height="34"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.12"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="97"
            y="156"
            textAnchor="middle"
            fontSize="11"
            fill="var(--success)"
          >
            接收者A
          </text>

          <rect
            x="145"
            y="134"
            width="75"
            height="34"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.12"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="182"
            y="156"
            textAnchor="middle"
            fontSize="11"
            fill="var(--success)"
          >
            接收者B
          </text>

          <rect
            x="230"
            y="134"
            width="75"
            height="34"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.12"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="267"
            y="156"
            textAnchor="middle"
            fontSize="11"
            fill="var(--success)"
          >
            接收者C
          </text>

          <text
            x="185"
            y="194"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            特点：完全异步，几乎所有接收者
          </text>
          <text
            x="185"
            y="210"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            同时收到，无法截断/排序
          </text>
          <text
            x="185"
            y="226"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            效率高，但不可控
          </text>

          {/* 右侧：有序广播 */}
          <text
            x="545"
            y="54"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            有序广播（Ordered Broadcast）
          </text>

          <rect
            x="420"
            y="66"
            width="250"
            height="40"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.12"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="545"
            y="91"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            sendOrderedBroadcast(intent)
          </text>

          <text
            x="545"
            y="122"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-tertiary)"
          >
            &darr; 按优先级顺序送达
          </text>

          <rect
            x="420"
            y="134"
            width="250"
            height="34"
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.12"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="545"
            y="156"
            textAnchor="middle"
            fontSize="11"
            fill="var(--danger)"
          >
            接收者A（priority=100）
          </text>

          <text
            x="545"
            y="180"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &darr; 可截断 abortBroadcast()
          </text>

          <rect
            x="420"
            y="190"
            width="250"
            height="34"
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.12"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="545"
            y="212"
            textAnchor="middle"
            fontSize="11"
            fill="var(--danger)"
          >
            接收者B（priority=50）
          </text>

          <text
            x="545"
            y="236"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>

          <rect
            x="420"
            y="246"
            width="250"
            height="34"
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.12"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="545"
            y="268"
            textAnchor="middle"
            fontSize="11"
            fill="var(--danger)"
          >
            接收者C（priority=10）
          </text>

          <text
            x="545"
            y="294"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            特点：按 priority 递减传递
          </text>
          <text
            x="545"
            y="310"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            高优先级可截断/修改数据
          </text>

          {/* 底部：注册方式 */}
          <rect
            x="30"
            y="330"
            width="680"
            height="80"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />
          <text
            x="370"
            y="352"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            两种注册方式
          </text>
          <text
            x="195"
            y="376"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            动态注册（代码注册）
          </text>
          <text
            x="195"
            y="392"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            registerReceiver() / unregisterReceiver()
          </text>
          <text
            x="195"
            y="406"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            跟随组件生命周期，灵活但需手动注销
          </text>

          <text
            x="545"
            y="376"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            静态注册（清单文件注册）
          </text>
          <text
            x="545"
            y="392"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            &lt;receiver android:name=&quot;.MyReceiver&quot;&gt;
          </text>
          <text
            x="545"
            y="406"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            App未启动也能收到（Android 8.0+受限）
          </text>

          {/* 底部：常见系统广播 */}
          <text
            x="370"
            y="436"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            常见系统广播
          </text>
          <text
            x="160"
            y="458"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            BOOT_COMPLETED 开机
          </text>
          <text
            x="320"
            y="458"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            CONNECTIVITY_CHANGE 网络
          </text>
          <text
            x="470"
            y="458"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            BATTERY_LOW 电量低
          </text>
          <text
            x="620"
            y="458"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            SCREEN_ON/OFF 屏幕亮灭
          </text>
          <text
            x="370"
            y="482"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            本地广播 LocalBroadcastManager（仅App内传递，更安全高效）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        广播机制：标准广播（异步同时送达）与有序广播（按优先级链式传递可截断），动态注册与静态注册两种方式
      </figcaption>
    </figure>
  );
}
