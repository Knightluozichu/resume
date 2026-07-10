/**
 * <CraDataPersistenceDiagram>：数据持久化图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function CraDataPersistenceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android数据持久化方案对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{`
            Android数据持久化五大方案
          `}</text>

          {/* 三列对比卡片 */}
          <rect x="50" y="50" width="200" height="170" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="150" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">{`SharedPreferences`}</text>
          <text x="150" y="90" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{`轻量键值对存储`}</text>
          <text x="60" y="112" fontSize="9" fill="var(--text-secondary)">{`getSharedPreferences(name, mode)`}</text>
          <text x="60" y="128" fontSize="9" fontFamily="monospace" fill="var(--accent)">{`.edit().putString(k, v).commit()`}</text>
          <text x="60" y="144" fontSize="9" fontFamily="monospace" fill="var(--accent)">{`.getString(k, default)`}</text>
          <text x="60" y="166" fontSize="9" fill="var(--text-secondary)">{`存：设置项/小配置/登录状态`}</text>
          <text x="60" y="182" fontSize="9" fill="var(--text-secondary)">{`底层XML文件 / data/data/pkg`}</text>
          <text x="60" y="200" fontSize="9" fill="var(--danger)">{`不适合大量结构化数据`}</text>

          <rect x="260" y="50" width="200" height="170" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">{`文件IO存储`}</text>
          <text x="360" y="90" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{`原始文件读写`}</text>
          <text x="270" y="112" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">{`openFileInput / openFileOutput`}</text>
          <text x="270" y="128" fontSize="9" fontFamily="monospace" fill="var(--accent)">{`Context.MODE_PRIVATE`}</text>
          <text x="270" y="144" fontSize="9" fontFamily="monospace" fill="var(--accent)">{`Context.MODE_APPEND`}</text>
          <text x="270" y="166" fontSize="9" fill="var(--text-secondary)">{`内部存储 /data/data/pkg/files`}</text>
          <text x="270" y="182" fontSize="9" fill="var(--text-secondary)">{`外部存储 getExternalStorage`}</text>
          <text x="270" y="200" fontSize="9" fill="var(--danger)">{`需读写权限 Environment检查`}</text>

          <rect x="470" y="50" width="220" height="170" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="580" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">{`SQLite数据库`}</text>
          <text x="580" y="90" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{`结构化数据存储`}</text>
          <text x="480" y="112" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">{`SQLiteOpenHelper`}</text>
          <text x="480" y="128" fontSize="9" fontFamily="monospace" fill="var(--accent)">{`onCreate / onUpgrade`}</text>
          <text x="480" y="144" fontSize="9" fontFamily="monospace" fill="var(--accent)">{`execSQL / rawQuery`}</text>
          <text x="480" y="166" fontSize="9" fill="var(--text-secondary)">{`事务：beginTransaction/setTransaction`}</text>
          <text x="480" y="182" fontSize="9" fill="var(--text-secondary)">{`Cursor遍历结果集`}</text>
          <text x="480" y="200" fontSize="9" fill="var(--danger)">{`SQL注入风险 用?占位符`}</text>

          {/* 下方左：SQLite操作流程 */}
          <text x="205" y="250" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">{`SQLite操作流程`}</text>
          <rect x="50" y="262" width="310" height="200" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />

          <rect x="66" y="278" width="278" height="28" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="205" y="296" textAnchor="middle" fontSize="10" fill="var(--warning)">{`1. 继承 SQLiteOpenHelper，建表SQL写onCreate`}</text>

          <rect x="66" y="312" width="278" height="28" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="205" y="330" textAnchor="middle" fontSize="10" fill="var(--warning)">{`2. getReadableDatabase/getWritableDatabase`}</text>

          <rect x="66" y="346" width="278" height="28" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="205" y="364" textAnchor="middle" fontSize="10" fill="var(--accent)">{`3. execSQL增删改 / rawQuery查询`}</text>

          <rect x="66" y="380" width="278" height="28" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="205" y="398" textAnchor="middle" fontSize="10" fill="var(--accent)">{`4. Cursor.moveToFirst/next遍历结果`}</text>

          <rect x="66" y="414" width="278" height="28" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="205" y="432" textAnchor="middle" fontSize="10" fill="var(--danger)">{`5. Cursor.close / db.close 释放资源`}</text>

          <text x="205" y="454" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{`onUpgrade中处理版本升级迁移`}</text>

          {/* 下方右：ContentProvider跨应用共享 */}
          <text x="555" y="250" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">{`ContentProvider 跨应用数据共享`}</text>
          <rect x="400" y="262" width="290" height="200" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />

          <rect x="420" y="280" width="120" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="480" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">{`App A`}</text>
          <text x="480" y="312" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{`ContentResolver`}</text>

          <text x="550" y="300" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">{`&rarr;`}</text>
          <text x="550" y="312" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">{`Uri`}</text>

          <rect x="570" y="280" width="110" height="36" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="625" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">{`App B`}</text>
          <text x="625" y="312" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{`ContentProvider`}</text>

          <text x="555" y="334" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--accent)">{`content://authority/path/id`}</text>

          <text x="416" y="358" fontSize="10" fontWeight="600" fill="var(--accent)">{`六大方法：`}</text>
          <text x="416" y="376" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">{`query / insert / update / delete`}</text>
          <text x="416" y="392" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">{`getType / call`}</text>

          <text x="416" y="414" fontSize="10" fill="var(--text-secondary)">{`UriMatcher匹配不同Uri路径`}</text>
          <text x="416" y="432" fontSize="10" fill="var(--text-secondary)">{`ContentObserver监听数据变化`}</text>
          <text x="416" y="450" fontSize="10" fill="var(--danger)">{`清单文件注册 + 权限控制`}</text>

          {/* 底部选型 */}
          <rect x="50" y="480" width="640" height="68" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="502" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">{`选型决策`}</text>
          <text x="70" y="522" fontSize="10" fill="var(--text-secondary)">{`少量键值对 &rarr; SharedPreferences  |  文件/图片 &rarr; 文件IO  |  大量结构化 &rarr; SQLite`}</text>
          <text x="70" y="538" fontSize="10" fill="var(--text-secondary)">{`跨App共享 &rarr; ContentProvider  |  需要事务/查询/关系 &rarr; SQLite  |  数据+列表展示 &rarr; SQLite + CursorAdapter`}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android五大持久化方案对比：SharedPreferences、文件IO、SQLite数据库、ContentProvider跨应用共享
      </figcaption>
    </figure>
  );
}
