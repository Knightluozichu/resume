/**
 * <CraServiceBroadcastDiagram>：Service与Broadcast图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function CraServiceBroadcastDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android Service生命周期与Broadcast广播机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Service生命周期 与 Broadcast广播机制
          </text>

          {/* 左侧：Service两种启动模式 */}
          <text x="205" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Service两种启动模式</text>

          {/* 启动式Service */}
          <rect x="50" y="64" width="310" height="200" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="84" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">启动式 Service（startService）</text>

          <rect x="66" y="96" width="278" height="24" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="205" y="112" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">startService(intent) &rarr; onCreate &rarr; onStartCommand</text>

          <text x="205" y="138" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">调用者退出后Service继续运行</text>
          <text x="205" y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">需手动 stopSelf() 或 stopService() 停止</text>
          <text x="205" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">适合后台音乐播放/下载等独立任务</text>

          <rect x="66" y="190" width="278" height="60" rx="4" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="205" y="210" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">前台Service（Android 8.0+）</text>
          <text x="205" y="226" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">startForeground(id, Notification)</text>
          <text x="205" y="240" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">显示通知栏，避免被系统杀掉</text>

          {/* 绑定式Service */}
          <rect x="50" y="274" width="310" height="120" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">绑定式 Service（bindService）</text>

          <rect x="66" y="306" width="278" height="24" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="205" y="322" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">bindService &rarr; onCreate &rarr; onBind(返回IBinder)</text>

          <text x="205" y="348" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">调用者通过IBinder与Service交互</text>
          <text x="205" y="366" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">所有绑定者unbind后Service自动销毁</text>
          <text x="205" y="384" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onRebind / onUnbind 回调</text>

          {/* 右侧：Broadcast广播机制 */}
          <text x="555" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Broadcast广播机制</text>
          <rect x="400" y="64" width="310" height="330" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          <text x="555" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">广播流模型</text>

          <rect x="430" y="96" width="100" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="480" y="113" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">发送方</text>
          <text x="480" y="127" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">sendBroadcast</text>

          <text x="540" y="116" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="555" y="96" width="50" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="580" y="113" textAnchor="middle" fontSize="11" fill="var(--accent)">Intent</text>
          <text x="580" y="125" textAnchor="middle" fontSize="11" fill="var(--accent)">action</text>

          <text x="613" y="116" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="625" y="96" width="70" height="36" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="660" y="113" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">接收方</text>
          <text x="660" y="127" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Receiver</text>

          <rect x="416" y="144" width="278" height="28" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="555" y="162" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">标准广播（Normal）— 异步同时送达所有接收者</text>

          <rect x="416" y="178" width="278" height="28" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="555" y="196" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">有序广播（Ordered）— 按优先级链式传递，可截断</text>

          <text x="416" y="226" fontSize="11" fontWeight="600" fill="var(--accent)">两种注册方式</text>

          <rect x="416" y="238" width="135" height="56" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="483" y="256" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">动态注册</text>
          <text x="483" y="270" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">registerReceiver</text>
          <text x="483" y="282" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">跟随组件生命周期</text>
          <text x="483" y="292" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">必须unregister</text>

          <rect x="559" y="238" width="135" height="56" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="626" y="256" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">静态注册</text>
          <text x="626" y="270" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">AndroidManifest</text>
          <text x="626" y="282" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">&lt;receiver&gt; 标签</text>
          <text x="626" y="292" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">App未启动也能收</text>

          <rect x="416" y="306" width="278" height="78" rx="4" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="555" y="326" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">系统广播示例</text>
          <text x="426" y="344" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">BOOT_COMPLETED / BATTERY_CHANGED</text>
          <text x="426" y="360" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">CONNECTIVITY_CHANGE / SMS_RECEIVED</text>
          <text x="426" y="376" fontSize="11" fill="var(--danger)">Android 8.0+ 大部分系统广播只能动态注册</text>

          {/* 底部：电话短信 */}
          <rect x="50" y="410" width="640" height="138" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="432" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">电话与短信（Telephony &amp; SMS）</text>
          <text x="70" y="456" fontSize="11" fontWeight="600" fill="var(--warning)">电话：</text>
          <text x="120" y="456" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">TelephonyManager — 获取设备信息/网络状态</text>
          <text x="70" y="474" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">PhoneStateListener — 监听来电状态  |  SmsManager — 发送短信</text>
          <text x="70" y="496" fontSize="11" fontWeight="600" fill="var(--accent)">短信：</text>
          <text x="120" y="496" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">sendTextMessage(destAddr, scAddr, text, sentIntent, deliverIntent)</text>
          <text x="70" y="514" fontSize="11" fill="var(--text-secondary)">接收短信：广播 SMS_RECEIVED + BroadcastReceiver + pdu解析</text>
          <text x="70" y="534" fontSize="11" fill="var(--danger)">需声明权限：READ_PHONE_STATE / SEND_SMS / RECEIVE_SMS</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Service两种启动模式（startService/bindService）生命周期，Broadcast标准/有序广播与动态/静态注册，电话短信API
      </figcaption>
    </figure>
  );
}
