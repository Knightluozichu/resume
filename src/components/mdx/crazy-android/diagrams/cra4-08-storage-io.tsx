import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第8章 Android数据存储与IO",
  "8.1 使用SharedPreferences",
  "8.1.1 SharedPreferences与Editor简介",
  "8.1.2 SharedPreferences的存储位置和格式",
  "实例：记录应用程序的使用次数",
  "8.2 File存储",
  "8.2.1 openFileOutput和openFileInput",
  "8.2.2 读写SD卡上的文件",
  "实例：SD卡文件浏览器",
  "8.3 SQLite数据库",
  "8.3.1 SQLiteDatabase简介",
  "8.3.2 创建数据库和表",
  "8.3.3 SQLiteOpenHelper类",
  "8.3.4 使用SQL语句操作SQLite数据库",
  "8.3.5 使用sqlite3工具",
  "8.3.6 使用特定方法操作SQLite数据库",
  "8.3.7 事务",
  "8.3.8 SQLite数据库最佳实践建议",
  "8.4 手势（Gesture）",
  "8.4.1 手势检测",
  "实例：通过手势缩放图片",
  "实例：通过多点触碰缩放TextView",
  "实例：通过多点触碰缩放图片",
  "实例：通过手势实现翻页效果",
  "8.4.2 增加手势",
  "8.4.3 识别用户手势",
  "8.5 让应用说话（TTS）",
  "8.6 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第8章 Android数据存储与IO" focus="按SharedPreferences、内部/外部文件、SQLite事务、手势与TTS建立本地状态和输入输出边界" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第8章 Android数据存储与IO" focus="按SharedPreferences、内部/外部文件、SQLite事务、手势与TTS建立本地状态和输入输出边界" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第8章 Android数据存储与IO" focus="数据模型、文件权限、SQLite schema与事务测试、手势样本和TTS释放记录" nodes={nodes} />; }
