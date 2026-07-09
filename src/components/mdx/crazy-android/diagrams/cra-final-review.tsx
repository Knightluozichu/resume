/**
 * <CraFinalReviewDiagram>：全书复习知识图谱图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function CraFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="疯狂Android讲义全书知识图谱与选型矩阵图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            疯狂Android讲义——全书知识图谱与选型矩阵
          </text>

          {/* 中心：Android核心 */}
          <ellipse cx="370" cy="120" rx="120" ry="30" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">Android开发核心</text>
          <text x="370" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">系统架构 + 四大组件 + 数据持久化 + 网络</text>

          {/* 四大分支 */}
          <text x="185" y="180" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">UI与交互</text>
          <rect x="50" y="192" width="270" height="180" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="66" y="214" fontSize="10" fontWeight="600" fill="var(--warning)">布局体系</text>
          <text x="66" y="230" fontSize="9" fill="var(--text-secondary)">LinearLayout / RelativeLayout / TableLayout</text>
          <text x="66" y="244" fontSize="9" fill="var(--text-secondary)">FrameLayout / GridLayout</text>
          <text x="66" y="264" fontSize="10" fontWeight="600" fill="var(--warning)">组件</text>
          <text x="66" y="280" fontSize="9" fill="var(--text-secondary)">TextView/EditText/Button/ImageView</text>
          <text x="66" y="294" fontSize="9" fill="var(--text-secondary)">AdapterView + Adapter（ListView/GridView）</text>
          <text x="66" y="314" fontSize="10" fontWeight="600" fill="var(--warning)">事件处理</text>
          <text x="66" y="330" fontSize="9" fill="var(--text-secondary)">基于监听 / 基于回调 / Handler异步</text>
          <text x="66" y="344" fontSize="9" fill="var(--text-secondary)">触摸/按键/手势检测</text>
          <text x="66" y="360" fontSize="10" fontWeight="600" fill="var(--warning)">高级UI</text>
          <text x="196" y="360" fontSize="9" fill="var(--text-secondary)">对话框/菜单/通知/ActionBar</text>

          <text x="555" y="180" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">四大组件</text>
          <rect x="420" y="192" width="270" height="180" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="436" y="214" fontSize="10" fontWeight="600" fill="var(--danger)">Activity</text>
          <text x="436" y="230" fontSize="9" fill="var(--text-secondary)">UI载体/生命周期/Intent跳转传参</text>
          <text x="436" y="250" fontSize="10" fontWeight="600" fill="var(--danger)">Service</text>
          <text x="436" y="266" fontSize="9" fill="var(--text-secondary)">startService/bindService/前台Service</text>
          <text x="436" y="286" fontSize="10" fontWeight="600" fill="var(--danger)">BroadcastReceiver</text>
          <text x="436" y="302" fontSize="9" fill="var(--text-secondary)">标准/有序广播 动态/静态注册</text>
          <text x="436" y="322" fontSize="10" fontWeight="600" fill="var(--danger)">ContentProvider</text>
          <text x="436" y="338" fontSize="9" fill="var(--text-secondary)">跨App数据共享 Uri+ContentResolver</text>
          <text x="436" y="358" fontSize="9" fill="var(--text-secondary)">电话短信 TelephonyManager/SmsManager</text>

          <text x="185" y="398" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">数据持久化</text>
          <rect x="50" y="410" width="270" height="120" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="66" y="432" fontSize="10" fontWeight="600" fill="var(--success)">SharedPreferences</text>
          <text x="186" y="432" fontSize="9" fill="var(--text-secondary)">键值对/小配置</text>
          <text x="66" y="452" fontSize="10" fontWeight="600" fill="var(--success)">文件IO</text>
          <text x="186" y="452" fontSize="9" fill="var(--text-secondary)">内部/外部存储</text>
          <text x="66" y="472" fontSize="10" fontWeight="600" fill="var(--success)">SQLite</text>
          <text x="186" y="472" fontSize="9" fill="var(--text-secondary)">结构化/事务/Cursor</text>
          <text x="66" y="492" fontSize="10" fontWeight="600" fill="var(--success)">选型</text>
          <text x="120" y="492" fontSize="9" fill="var(--text-secondary)">少量&raquo;SP 文件&raquo;IO 结构化&raquo;SQLite 共享&raquo;Provider</text>
          <text x="66" y="516" fontSize="9" fill="var(--text-secondary)">CursorAdapter绑定SQLite数据到ListView</text>

          <text x="555" y="398" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">网络与多媒体</text>
          <rect x="420" y="410" width="270" height="120" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="436" y="432" fontSize="10" fontWeight="600" fill="var(--accent)">WebView</text>
          <text x="556" y="432" fontSize="9" fill="var(--text-secondary)">内嵌浏览器/JS互调</text>
          <text x="436" y="452" fontSize="10" fontWeight="600" fill="var(--accent)">HTTP</text>
          <text x="556" y="452" fontSize="9" fill="var(--text-secondary)">HttpURLConnection子线程</text>
          <text x="436" y="472" fontSize="10" fontWeight="600" fill="var(--accent)">Socket</text>
          <text x="556" y="472" fontSize="9" fill="var(--text-secondary)">TCP可靠/UDP无连接</text>
          <text x="436" y="492" fontSize="10" fontWeight="600" fill="var(--accent)">解析</text>
          <text x="486" y="492" fontSize="9" fill="var(--text-secondary)">JSON(Gson) / XML(SAX/DOM/PULL)</text>
          <text x="436" y="516" fontSize="10" fontWeight="600" fill="var(--accent)">多媒体</text>
          <text x="500" y="516" fontSize="9" fill="var(--text-secondary)">MediaPlayer/Canvas绘图/动画/传感器</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        疯狂Android讲义全书知识图谱——UI与交互、四大组件、数据持久化、网络与多媒体四大领域选型矩阵
      </figcaption>
    </figure>
  );
}
