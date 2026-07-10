import type { ReviewQuestion } from "./types";

export const craDataPersistenceQuestions: ReviewQuestion[] = [
  {
    id: "cra-dp-1",
    chapter: "cra-data-persistence",
    level: 1,
    question: `Android数据持久化有哪些方案？各自的适用场景是什么？`,
    answer:
      `Android数据持久化五大方案：①SharedPreferences——轻量键值对存储，底层XML文件，存放在/data/data/包名/shared_prefs/。适合少量简单配置（用户设置、登录状态、主题偏好）。API：getSharedPreferences(name, MODE_PRIVATE).edit().putString(k,v).commit()写入，getString(k, default)读取。②文件IO——通过openFileInput/openFileOutput读写内部存储（/data/data/包名/files/），或getExternalStorageDirectory访问外部存储（SD卡）。适合缓存文件、下载的图片、日志。③SQLite数据库——SQLiteOpenHelper管理数据库创建和版本升级，execSQL执行建表/增删改，rawQuery查询返回Cursor。适合大量结构化数据（用户记录、聊天消息、商品列表），支持事务和复杂查询。④ContentProvider——跨应用/跨进程数据共享，提供query/insert/update/delete统一接口，通过Uri标识数据。适合通讯录共享、媒体库访问等跨App数据交换。⑤CursorAdapter——将SQLite查询结果Cursor直接绑定到ListView展示，实现数据与列表联动。选型决策：少量键值对用SP，文件用IO，大量结构化用SQLite，跨App共享用ContentProvider。`,
    tags: ["数据持久化", "SharedPreferences", "文件IO", "SQLite", "ContentProvider", "选型"],
  },
  {
    id: "cra-dp-2",
    chapter: "cra-data-persistence",
    level: 2,
    question: `SQLiteOpenHelper的工作原理是什么？onCreate和onUpgrade分别在什么时候调用？`,
    answer:
      `SQLiteOpenHelper是SQLite数据库管理的辅助类，工作原理：①创建子类继承SQLiteOpenHelper，构造函数传入context/dataBaseName/factory/version。②首次调用getReadableDatabase()或getWritableDatabase()时，系统检测数据库文件是否存在——不存在则调用onCreate(db)，在其中执行execSQL建表语句创建数据库表结构。③数据库已存在但version号增大时（升级），调用onUpgrade(db, oldVersion, newVersion)，在其中执行ALTER TABLE或DROP+CREATE迁移表结构。④数据库已存在且version不变时，直接返回SQLiteDatabase实例，不调用onCreate/onUpgrade。⑤getReadableDatabase返回只读数据库（磁盘满时降级），getWritableDatabase返回可读写数据库（磁盘满时抛异常）。⑥onDowngrade在version减小时调用（降级，较少用）。关键点：onCreate只在数据库首次创建时调用一次，onUpgrade在版本号增大时调用。数据库升级应做增量迁移（ALTER TABLE添加列），而非DROP重建（会丢数据）。`,
    tags: ["SQLiteOpenHelper", "onCreate", "onUpgrade", "数据库版本", "SQLite"],
  },
  {
    id: "cra-dp-3",
    chapter: "cra-data-persistence",
    level: 3,
    question: `如何使用SQLite进行增删改查操作？如何防止SQL注入？事务的作用是什么？`,
    answer:
      `SQLite增删改查操作：①增——\`db.execSQL(\"INSERT INTO table(col1,col2) VALUES(?,?)\", new Object[]{v1,v2})\`或\`db.insert(table, nullColumnHack, contentValues)\`。②删——\`db.execSQL(\"DELETE FROM table WHERE id=?\", new Object[]{id})\`或\`db.delete(table, \"id=?\", new String[]{id})\`。③改——\`db.execSQL(\"UPDATE table SET col=? WHERE id=?\", new Object[]{v,id})\`或\`db.update(table, contentValues, \"id=?\", new String[]{id})\`。④查——\`Cursor cursor = db.rawQuery(\"SELECT * FROM table WHERE col=?\", new String[]{v})\`或\`db.query(table, columns, selection, selectionArgs, groupBy, having, orderBy)\`，通过cursor.moveToFirst()/moveToNext()遍历，cursor.getString(cursor.getColumnIndex(\"col\"))取值。防止SQL注入：始终使用?占位符 + 参数数组，让SQLite自动转义参数值，绝不拼接SQL字符串。事务：\`db.beginTransaction()\`开启，操作完成后\`db.setTransactionSuccessful()\`标记成功，最后\`db.endTransaction()\`结束（try-finally保证endTransaction一定执行）。事务保证一组操作原子性——全部成功才提交，任一失败回滚。批量操作用事务大幅提升性能（减少磁盘IO次数）。`,
    tags: ["SQLite", "增删改查", "SQL注入", "事务", "Cursor", "execSQL"],
  },
  {
    id: "cra-dp-4",
    chapter: "cra-data-persistence",
    level: 2,
    question: `ContentProvider如何实现跨应用数据共享？Uri的结构是什么？`,
    answer:
      `ContentProvider实现跨应用共享：①在数据提供方App中创建ContentProvider子类，重写六个方法：query/insert/update/delete（CRUD操作）、getType（返回MIME类型）、call（自定义调用）。②在AndroidManifest中用\`<provider android:name android:authorities>\`注册，authorities是唯一标识。③在数据访问方App中通过ContentResolver（\`getContentResolver()\`）调用query/insert/update/delete，传入Uri指定操作的数据。Uri结构：\`content://authority/path/id\`——scheme固定content://，authority对应注册的authorities值（如com.example.provider），path标识数据表或集合（如/user），id可选标识具体记录（如/user/1表示id=1的用户）。UriMatcher用于在ContentProvider内匹配不同Uri路径（集合Uri vs 单条Uri），返回不同code区分操作类型。ContentObserver可监听数据变化（registerContentObserver + notifyChange通知）。ContentProvider在清单文件注册时可设android:exported控制是否允许外部访问，android:permission设置访问权限，实现安全控制。`,
    tags: ["ContentProvider", "ContentResolver", "Uri", "UriMatcher", "跨应用共享", "权限控制"],
  },
];
