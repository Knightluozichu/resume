import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第4章 深入理解Activity与Fragment",
  "4.1 建立、配置和使用Activity",
  "4.1.1 高级Activity",
  "实例：用LauncherActivity开发启动Activity的列表",
  "实例：使用ExpandableListActivity实现可展开的Activity",
  "实例：PreferenceActivity结合PreferenceFragment实现参数设置界面",
  "4.1.2 配置Activity",
  "4.1.3 启动、关闭Activity",
  "4.1.4 使用Bundle在Activity之间交换数据",
  "实例：用第二个Activity处理注册信息",
  "4.1.5 启动其他Activity并返回结果",
  "实例：用第二个Activity让用户选择信息",
  "4.2 Activity的回调机制",
  "4.3 Activity的生命周期",
  "4.3.1 Activity的生命周期演示",
  "4.3.2 Activity与Servlet的相似性和区别",
  "4.4 Activity的4种加载模式",
  "4.4.1 standard模式",
  "4.4.2 singleTop模式",
  "4.4.3 singleTask模式",
  "4.4.4 singleInstance模式",
  "4.5 Android 9升级的Fragment",
  "4.5.1 Fragment概述及其设计初衷",
  "4.5.2 创建Fragment",
  "实例：开发显示图书详情的Fragment",
  "实例：创建ListFragment",
  "4.5.3 Fragment与Activity通信",
  "4.5.4 Fragment管理与Fragment事务",
  "实例：开发兼顾屏幕分辨率的应用",
  "4.6 Fragment的生命周期",
  "4.7 管理Fragment导航",
  "实例：结合ViewPager实现分页导航",
  "实例：结合TabLayout实现Tab导航",
  "4.7 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第4章 深入理解Activity与Fragment" focus="把Activity、Fragment、Intent结果、加载模式、事务、生命周期和导航组织成可恢复页面流" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第4章 深入理解Activity与Fragment" focus="把Activity、Fragment、Intent结果、加载模式、事务、生命周期和导航组织成可恢复页面流" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第4章 深入理解Activity与Fragment" focus="生命周期图、任务栈、Fragment事务日志、旋转与进程恢复测试" nodes={nodes} />; }
