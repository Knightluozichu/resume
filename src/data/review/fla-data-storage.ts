import type { ReviewQuestion } from "./types";

export const flaDataStorageQuestions: ReviewQuestion[] = [
  {
    id: "fla-ds-1",
    chapter: "fla-data-storage",
    level: 2,
    question: "Android五种数据存储方案各自的适用场景和优缺点是什么？",
    answer:
      "五种存储方案对比：①SharedPreferences——轻量级键值对存储（底层XML文件），适合少量简单数据（设置项/记住密码/标记位）。优点：API简单（edit().putString().apply()）、异步写入不阻塞。缺点：不适合大量数据、不支持复杂查询、全量读取到内存。apply()异步写入（不返回结果），commit()同步写入（返回boolean）。②文件存储——openFileOutput/openFileInput操作内部存储（私有，卸载删除），外部存储需权限（Android 10+用SAF）。适合日志/缓存/大文件。优点：无大小限制。缺点：无结构化查询。③SQLite数据库——关系型数据库，SQLiteOpenHelper管理创建和升级。适合大量结构化关系数据。优点：支持SQL查询/事务/外键。缺点：手写SQL易错、需手动管理Cursor关闭和数据库版本迁移。④LitePal——ORM框架，继承DataSupport用save()/findAll()等面向对象API操作。优点：简化SQL操作。缺点：项目维护不活跃、性能不如Room。⑤Room（推荐）——Jetpack官方ORM，@Entity定义表/@Dao定义操作/@Database定义数据库。优点：编译期SQL检查（写错SQL编译报错）、类型安全（返回值自动映射对象）、支持LiveData/Flow响应式查询、自动管理Cursor。缺点：学习成本略高。选型：少量键值对→SharedPreferences；大量关系数据→Room；大文件→文件存储；跨App共享→ContentProvider。现代项目首选Room替代手写SQLite。",
    tags: ["数据存储", "SharedPreferences", "SQLite", "Room", "选型"],
  },
  {
    id: "fla-ds-2",
    chapter: "fla-data-storage",
    level: 3,
    question: "Room的三大核心注解（@Entity/@Dao/@Database）如何使用？相比手写SQLite有什么优势？",
    answer:
      "Room三大注解使用：①@Entity(tableName=\"users\")——定义数据库表，类名映射表名，字段映射列。@PrimaryKey标注主键（autoGenerate=true自增），@ColumnInfo(name=\"user_name\")自定义列名，@Ignore标注不映射的字段。②@Dao——定义数据访问接口，方法用注解声明SQL：@Insert(onConflict=REPLACE)插入、@Delete删除、@Update更新、@Query(\"SELECT * FROM users WHERE age > :minAge\")查询（编译期检查SQL语法和表名字段名）。查询方法可返回LiveData<List<User>>或Flow<List<User>>实现响应式，数据变化自动通知。③@Database(entities=[User::class], version=1)——定义数据库持有者，abstract类继承RoomDatabase。entities列出所有表类，version数据库版本号。通过Room.databaseBuilder(context, AppDatabase::class.java, \"app.db\").build()构建实例，建议单例。获取Dao：database.userDao()。相比手写SQLite的优势：①编译期检查——SQL语法错误/表名不存在/字段名拼写错误在编译时报错，而非运行时崩溃。②类型安全——查询结果自动映射为对象，不需要手动从Cursor逐字段读取和类型转换。③样板代码消除——不需要写SQLiteOpenHelper的onCreate/onUpgrade、不需要管理Cursor关闭、不需要手动beginTransaction/setTransactionSuccessful/endTransaction。④响应式查询——返回LiveData/Flow，数据库变化自动触发UI更新。⑤数据库迁移——提供Migration类管理版本升级，结构化且不易出错。",
    tags: ["Room", "@Entity", "@Dao", "@Database", "ORM"],
  },
  {
    id: "fla-ds-3",
    chapter: "fla-data-storage",
    level: 2,
    question: "SQLiteOpenHelper的onCreate和onUpgrade分别在何时调用？如何管理数据库版本迁移？",
    answer:
      "SQLiteOpenHelper的两个关键回调：①onCreate(SQLiteDatabase db)——数据库首次创建时调用（文件不存在时），执行建表SQL（db.execSQL(\"CREATE TABLE...\")）。只调用一次。②onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion)——数据库版本号递增时调用（已存在数据库的版本号 < 构造函数传入的版本号）。执行迁移SQL（ALTER TABLE/CREATE TABLE等），从oldVersion升级到newVersion。版本迁移策略：①递增版本号——每次修改表结构（加列/加表/改类型）时，version+1，在onUpgrade中添加对应的ALTER/CREATE语句。②逐步迁移——onUpgrade中用switch或if(oldVersion < 2) {升级到v2} if(oldVersion < 3) {升级到v3}，确保从任何旧版本都能逐步升级到最新版（不能只写oldVersion==1的else，因为可能从v1跳到v3）。③数据保留——ALTER TABLE ADD COLUMN保留数据，删列需创建新表+复制数据+删旧表+重命名。④降级处理——onDowngrade处理版本降级（罕见，可忽略或清空重建）。事务使用：db.beginTransaction()开始事务，执行多条SQL，setTransactionSuccessful()标记成功，endTransaction()结束（成功时提交，失败时回滚）。事务保证原子性——要么全部成功要么全部回滚，避免中间状态。Room的Migration类是对onUpgrade的结构化封装，每个Migration定义从N到N+1的迁移逻辑。",
    tags: ["SQLite", "SQLiteOpenHelper", "onUpgrade", "版本迁移", "事务"],
  },
  {
    id: "fla-ds-4",
    chapter: "fla-data-storage",
    level: 1,
    question: "SharedPreferences的apply()和commit()有什么区别？内部存储和外部存储的区别是什么？",
    answer:
      "SharedPreferences的apply() vs commit()：①apply()——异步写入（提交到后台线程执行磁盘IO），不阻塞主线程，无返回值。推荐使用。缺点：无法知道写入是否成功；在Activity onStop时可能还未写完（但系统保证最终写入）。②commit()——同步写入（直接在当前线程执行磁盘IO），返回boolean表示是否成功。会阻塞主线程（磁盘IO慢），不推荐在主线程使用。适用：必须立即确认写入成功的场景。两者都先更新内存缓存（立即生效），区别在于磁盘持久化的时机。最佳实践：常规用apply()，关键数据需确认写入成功时用commit()（但应在子线程）。内部存储 vs外部存储：①内部存储——应用私有目录（/data/data/包名/files/），不需权限，卸载App自动删除，空间有限。通过openFileOutput/openFileInput或context.filesDir访问。适合App私有文件。②外部存储——共享存储（/sdcard/），空间大但Android 6.0+需运行时申请READ/WRITE_EXTERNAL_STORAGE权限，Android 10+引入Scoped Storage限制（需用MediaStore/SAF/应用专属目录context.getExternalFilesDir）。卸载App时应用专属目录下的文件删除，公共目录下不删除。适合：大文件/多媒体/与其他App共享的文件。现代做法：应用私有文件用内部存储或getExternalFilesDir，共享媒体用MediaStore，用户选择文件用SAF（Storage Access Framework）。",
    tags: ["SharedPreferences", "apply", "commit", "内部存储", "外部存储"],
  },
];
