/**
 * <CraEventHandlingDiagram>：事件处理机制图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 560;

export function CraEventHandlingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android事件处理机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android事件处理：基于监听 与 基于回调
          </text>

          {/* 上方：两种事件处理模型对比 */}
          <text x="205" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">基于监听的事件处理模型</text>
          <rect x="50" y="64" width="310" height="180" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          <rect x="70" y="80" width="100" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="120" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">EventSource</text>
          <text x="120" y="112" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">事件源（Button等）</text>

          <text x="185" y="104" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="185" y="118" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">触发</text>

          <rect x="200" y="80" width="140" height="40" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="270" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Event对象</text>
          <text x="270" y="112" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">MotionEvent/KeyEvent</text>

          <text x="270" y="138" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="270" y="150" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">传递</text>

          <rect x="120" y="158" width="200" height="40" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="220" y="176" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">EventListener</text>
          <text x="220" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">OnClickListener等监听器</text>

          <text x="220" y="214" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="220" y="226" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">回调处理</text>
          <text x="220" y="238" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onClick / onTouch 中写业务逻辑</text>

          {/* 右侧：基于回调 */}
          <text x="555" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">基于回调的事件处理模型</text>
          <rect x="400" y="64" width="310" height="180" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          <rect x="440" y="84" width="230" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="555" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">继承View子类</text>
          <text x="555" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">class MyView extends View</text>

          <text x="555" y="142" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="440" y="152" width="230" height="40" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="555" y="170" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">重写回调方法</text>
          <text x="555" y="184" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onKeyDown / onTouchEvent / onTrackballEvent</text>

          <text x="555" y="210" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="440" y="220" width="230" height="18" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="555" y="233" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">事件在View自身方法内处理，返回true消费</text>

          {/* 下方：事件类型矩阵 */}
          <text x={VIEW_W / 2} y="276" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Android事件类型全景</text>

          <rect x="50" y="290" width="150" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="125" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">触摸事件</text>
          <text x="125" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onTouchEvent</text>
          <text x="125" y="346" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ACTION_DOWN/MOVE/UP</text>
          <text x="125" y="362" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">VelocityTracker测速</text>
          <text x="125" y="378" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">GestureDetector手势</text>

          <rect x="210" y="290" width="150" height="100" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="285" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">按键事件</text>
          <text x="285" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onKeyDown / onKeyUp</text>
          <text x="285" y="346" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">KEYCODE_BACK</text>
          <text x="285" y="362" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">KEYCODE_MENU</text>
          <text x="285" y="378" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">KEYCODE_VOLUME_UP</text>

          <rect x="370" y="290" width="150" height="100" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="445" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">点击事件</text>
          <text x="445" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">setOnClickListener</text>
          <text x="445" y="346" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">setOnLongClickListener</text>
          <text x="445" y="362" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">CheckBox onChange</text>
          <text x="445" y="378" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">SeekBar onProgressChanged</text>

          <rect x="530" y="290" width="150" height="100" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="605" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">手势检测</text>
          <text x="605" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">GestureDetector</text>
          <text x="605" y="346" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onSingleTapUp</text>
          <text x="605" y="362" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onFling（快速滑动）</text>
          <text x="605" y="378" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onScroll / onLongPress</text>

          {/* 底部：Handler异步消息 */}
          <rect x="50" y="410" width="640" height="120" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="432" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Handler异步消息处理机制</text>
          <text x="70" y="456" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">子线程sendMessage() &rarr; MessageQueue入队 &rarr; Looper轮询取出</text>
          <text x="70" y="474" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">&rarr; 分发给Handler &rarr; handleMessage()在主线程回调 &rarr; 更新UI</text>
          <text x="70" y="498" fontSize="11" fill="var(--danger)">主线程不可做耗时操作（网络/数据库），否则ANR；用Handler切换到主线程更新UI</text>
          <text x="70" y="516" fontSize="11" fill="var(--text-secondary)">Looper.prepare() 创建Looper &rarr; Looper.loop() 进入消息循环；主线程默认已有Looper</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android事件处理两种模型（基于监听与基于回调）及事件类型全景，Handler实现线程间通信
      </figcaption>
    </figure>
  );
}
