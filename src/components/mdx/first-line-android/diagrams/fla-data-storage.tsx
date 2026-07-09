/**
 * <FlaDataStorageDiagram>：数据存储——五种存储方案对比图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function FlaDataStorageDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
         aria-label="Android五种数据存储方案对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android 五种数据存储方案
          </text>

          {/* 第一行：SharedPreferences / 文件存储 */}
          <rect x="30" y="50" width="330" height="90" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="195" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">SharedPreferences</text>
          <text x="195" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">轻量级键值对存储（XML文件）</text>
          <text x="195" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">getSharedPreferences() / PreferenceManager</text>
          <text x="195" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">edit().putString().apply() 异步写入</text>
          <text x="195" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合：设置项/记住密码/简单标记</text>

          <rect x="380" y="50" width="330" height="90" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">文件存储</text>
          <text x="545" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">openFileOutput() / openFileInput()</text>
          <text x="545" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">内部存储（私有，卸载删除）</text>
          <text x="545" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">外部存储（需权限/SAF）</text>
          <text x="545" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合：日志文件/缓存/大文件</text>

          {/* 第二行：SQLite / LitePal */}
          <rect x="30" y="158" width="330" height="90" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="180" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">SQLite 数据库</text>
          <text x="195" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SQLiteOpenHelper: onCreate/onUpgrade</text>
          <text x="195" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">db.execSQL() / query() / rawQuery()</text>
          <text x="195" y="224" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Cursor 遍历结果集</text>
          <text x="195" y="238" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合：结构化关系数据</text>

          <rect x="380" y="158" width="330" height="90" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="545" y="180" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">LitePal（ORM框架）</text>
          <text x="545" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">继承 DataSupport / LitePalSupport</text>
          <text x="545" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">save() / delete() / findAll()</text>
          <text x="545" y="224" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">litepal.xml 配置数据库版本</text>
          <text x="545" y="238" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合：面向对象的数据库操作</text>

          {/* 第三行：Room / ContentProvider */}
          <rect x="30" y="266" width="330" height="90" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Room（Jetpack官方ORM，推荐）</text>
          <text x="195" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">@Entity / @Dao / @Database 三件套</text>
          <text x="195" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编译期SQL检查，类型安全</text>
          <text x="195" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">支持 LiveData/Flow 响应式查询</text>
          <text x="195" y="346" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合：现代架构首选方案</text>

          <rect x="380" y="266" width="330" height="90" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">ContentProvider 跨应用共享</text>
          <text x="545" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">query/insert/update/delete</text>
          <text x="545" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Uri 匹配（UriMatcher）</text>
          <text x="545" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ContentResolver 客户端访问</text>
          <text x="545" y="346" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合：跨进程/跨应用数据共享</text>

          {/* 底部：选型决策 */}
          <rect x="30" y="376" width="680" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="398" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">存储选型决策</text>
          <text x="130" y="422" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">几条键值对 → SharedPreferences</text>
          <text x="130" y="436" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">apply() 异步 / commit() 同步</text>
          <text x="320" y="422" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">大量关系数据 → Room</text>
          <text x="320" y="436" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编译期检查+响应式查询</text>
          <text x="510" y="422" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">大文件 → 文件存储</text>
          <text x="510" y="436" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">内部私有 / 外部共享</text>
          <text x="660" y="422" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">跨App共享 →</text>
          <text x="660" y="436" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ContentProvider</text>

          <text x="370" y="486" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">SQLiteOpenHelper管理数据库版本：版本号递增触发 onUpgrade() 迁移</text>
          <text x="370" y="504" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">事务操作：db.beginTransaction() / setTransactionSuccessful() / endTransaction()</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android五种数据存储方案（SharedPreferences/文件/SQLite/LitePal/Room）与ContentProvider跨应用共享
      </figcaption>
    </figure>
  );
}
