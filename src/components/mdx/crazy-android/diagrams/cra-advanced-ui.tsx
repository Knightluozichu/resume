/**
 * <CraAdvancedUiDiagram>：高级UI（对话框/菜单/滚动）图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function CraAdvancedUiDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android高级UI图解：对话框、菜单、通知、滚动"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            高级UI：对话框 / 菜单 / 通知 / 滚动视图 / ActionBar
          </text>

          {/* 第一行：对话框 与 菜单 */}
          <text x="185" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">对话框体系</text>
          <rect x="50" y="64" width="310" height="200" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          <rect x="66" y="80" width="278" height="26" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="80" y="97" fontSize="11" fontWeight="600" fill="var(--warning)">AlertDialog</text>
          <text x="200" y="97" fontSize="11" fill="var(--text-secondary)">setMessage/setItems/setMultiChoiceItems</text>

          <rect x="66" y="112" width="278" height="26" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="80" y="129" fontSize="11" fontWeight="600" fill="var(--accent)">DatePickerDialog / TimePickerDialog</text>
          <text x="280" y="129" fontSize="11" fill="var(--text-secondary)">日期/时间选择</text>

          <rect x="66" y="144" width="278" height="26" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="80" y="161" fontSize="11" fontWeight="600" fill="var(--danger)">ProgressDialog</text>
          <text x="220" y="161" fontSize="11" fill="var(--text-secondary)">进度对话框（已废弃）</text>

          <rect x="66" y="176" width="278" height="26" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="80" y="193" fontSize="11" fontWeight="600" fill="var(--success)">自定义Dialog</text>
          <text x="220" y="193" fontSize="11" fill="var(--text-secondary)">setView载入自定义布局</text>

          <rect x="66" y="208" width="278" height="44" rx="4" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="80" y="226" fontSize="11" fontWeight="600" fill="var(--accent)">DialogFragment（推荐）</text>
          <text x="80" y="244" fontSize="11" fill="var(--text-secondary)">屏幕旋转不丢失状态，生命周期由Fragment管理</text>

          <text x="555" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">菜单体系</text>
          <rect x="400" y="64" width="310" height="200" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          <rect x="416" y="80" width="278" height="36" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="430" y="97" fontSize="11" fontWeight="600" fill="var(--warning)">OptionsMenu（选项菜单）</text>
          <text x="430" y="111" fontSize="11" fill="var(--text-secondary)">onCreateOptionsMenu / 菜单键或ActionBar溢出</text>

          <rect x="416" y="122" width="278" height="36" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="430" y="139" fontSize="11" fontWeight="600" fill="var(--accent)">ContextMenu（上下文菜单）</text>
          <text x="430" y="153" fontSize="11" fill="var(--text-secondary)">长按View触发 registerForContextMenu + onCreateContextMenu</text>

          <rect x="416" y="164" width="278" height="36" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="430" y="181" fontSize="11" fontWeight="600" fill="var(--danger)">SubMenu（子菜单）</text>
          <text x="430" y="195" fontSize="11" fill="var(--text-secondary)">addSubMenu嵌套子菜单项</text>

          <rect x="416" y="206" width="278" height="48" rx="4" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="430" y="224" fontSize="11" fontWeight="600" fill="var(--accent)">XML定义菜单（推荐）</text>
          <text x="430" y="240" fontSize="11" fill="var(--text-secondary)">res/menu/*.xml + MenuInflater.inflate</text>
          <text x="430" y="252" fontSize="11" fill="var(--text-secondary)">onOptionsItemSelected处理点击</text>

          {/* 第二行：通知 与 滚动视图 */}
          <text x="185" y="290" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">通知 Notification</text>
          <rect x="50" y="302" width="310" height="140" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          <text x="66" y="322" fontSize="11" fill="var(--text-secondary)">NotificationManager 发送通知</text>
          <text x="66" y="340" fontSize="11" fontFamily="monospace" fill="var(--accent)">Builder.setSmallIcon / setContentTitle</text>
          <text x="66" y="356" fontSize="11" fontFamily="monospace" fill="var(--accent)">.setContentText / setTicker / setSound</text>
          <text x="66" y="372" fontSize="11" fontFamily="monospace" fill="var(--accent)">.setVibrate / setLights / setAutoCancel</text>
          <text x="66" y="392" fontSize="11" fill="var(--danger)">Android 8.0+ 必须创建 NotificationChannel</text>
          <text x="66" y="408" fontSize="11" fill="var(--text-secondary)">PendingIntent：延迟Intent，点击跳转Activity</text>
          <text x="66" y="424" fontSize="11" fill="var(--text-secondary)">RemoteViews：自定义通知布局</text>

          <text x="555" y="290" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">滚动视图体系</text>
          <rect x="400" y="302" width="310" height="140" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          <rect x="416" y="318" width="138" height="36" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="485" y="335" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">ScrollView</text>
          <text x="485" y="349" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">垂直滚动，含一个子View</text>

          <rect x="562" y="318" width="138" height="36" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="631" y="335" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">HorizontalScrollView</text>
          <text x="631" y="349" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">水平滚动</text>

          <rect x="416" y="362" width="278" height="36" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="555" y="379" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">ListView / GridView</text>
          <text x="555" y="393" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">自带滚动 + Adapter数据绑定</text>

          <rect x="416" y="404" width="278" height="30" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="555" y="422" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">View复用（convertView）是列表性能关键</text>

          {/* 底部：ActionBar */}
          <rect x="50" y="456" width="640" height="90" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="478" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">ActionBar（操作栏）</text>
          <text x="70" y="500" fontSize="11" fill="var(--text-secondary)">顶部标题栏，提供：应用图标/标题 + Action按钮 + 溢出菜单 + Tab导航 + 搜索框SearchView</text>
          <text x="70" y="518" fontSize="11" fontFamily="monospace" fill="var(--accent)">setDisplayHomeAsUpEnabled / setNavigationMode / setCustomView</text>
          <text x="70" y="536" fontSize="11" fill="var(--danger)">Android 5.0+ 推荐使用 Toolbar 替代 ActionBar（更灵活、Material Design支持）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android高级UI：AlertDialog/DatePickerDialog对话框、三种菜单、Notification通知、滚动视图与ActionBar
      </figcaption>
    </figure>
  );
}
