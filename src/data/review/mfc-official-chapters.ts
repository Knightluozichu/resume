import type { ReviewQuestion } from "./types";

const units: Array<{
  slug: ReviewQuestion["chapter"];
  title: string;
  thesis: string;
  invariant: string;
  terms: string[];
  chain: readonly string[];
}> = [
  {
    slug: "mfc-official-learning-map",
    title: "《深入浅出MFC（第二版）》权威学习地图",
    thesis:
      "以侯捷开放电子版与完整公开目录交叉核对版本身份，把第0章、四篇16章和附录A-D组织成可执行的MFC学习路线。",
    invariant:
      "21个正式单元、313个目录层级都有唯一教学归属；Visual C++ 5.0与MFC 4.2的历史语境不会被现代框架悄悄替换。",
    terms: [
      "版本身份",
      "四篇结构",
      "六大关键技术",
      "Scribble主线",
      "附录证据",
      "第一篇基础",
    ],
    chain: [
      "核对版本",
      "补齐目录",
      "建立Win32底座",
      "追踪框架生命线",
      "推进Scribble",
      "综合附录证据",
    ],
  },
  {
    slug: "mfc-00-reading-guide",
    title: "第0章 你一定要知道（导读）",
    thesis:
      "明确读者基础、Visual C++ 5.0/MFC 4.2环境、符号约定、例程取得方式和第二版新增内容，避免用错误版本解释代码。",
    invariant:
      "读者前置知识、工具版本、例程来源、符号含义和版本差异全部显式登记，后续实验可以复现。",
    terms: [
      "读者边界",
      "技术基础",
      "软硬件环境",
      "符号约定",
      "第二版差异",
      "这本书适合谁",
    ],
    chain: [
      "确认目标读者",
      "盘点技术基础",
      "冻结工具版本",
      "统一符号语言",
      "取得验证例程",
      "记录版本差异",
    ],
  },
  {
    slug: "mfc-01-win32-program-concepts",
    title: "第1章 Win32程序基本概念",
    thesis:
      "从WinMain、窗口类、消息循环和窗口函数建立事件驱动模型，再扩展到资源、对话框、Console、进程与线程。",
    invariant:
      "模块实例、窗口对象、消息队列和窗口函数的责任边界清楚；线程只处理属于自身队列与共享状态的工作。",
    terms: [
      "WinMain",
      "窗口类",
      "消息循环",
      "窗口函数",
      "进程与线程",
      "Win32程序开发流程",
    ],
    chain: [
      "进入WinMain",
      "注册窗口类",
      "创建显示窗口",
      "提取分派消息",
      "处理窗口回调",
      "退出并回收资源",
    ],
  },
  {
    slug: "mfc-02-cpp-essential-properties",
    title: "第2章 C++的重要性质",
    thesis:
      "用封装、继承、this、虚函数、对象生存期、RTTI、动态创建、异常和模板解释MFC宏背后的C++机制。",
    invariant:
      "动态类型、对象所有权、虚调用目标和模板实例来源可解释；切片、悬空对象与跨模块实例化不会被隐藏。",
    terms: [
      "对象布局",
      "虚函数",
      "对象生存期",
      "RTTI",
      "模板实例化",
      "类及其成员——谈封装（encapsulation）",
    ],
    chain: [
      "定义类契约",
      "构造对象",
      "绑定this",
      "执行虚分派",
      "识别动态类型",
      "析构并释放",
    ],
  },
  {
    slug: "mfc-03-six-key-techniques-simulation",
    title: "第3章 MFC六大关键技术之仿真",
    thesis:
      "用Frame系列Console例程拆开RTTI、动态创建、永久保存、消息映射与命令传递，并把宏还原为表和函数指针。",
    invariant:
      "CRuntimeClass链、创建函数、序列化架构号、消息表和命令目标链彼此一致，宏展开后仍能逐步追踪。",
    terms: [
      "CRuntimeClass",
      "动态创建",
      "Serialization",
      "消息映射",
      "命令传递",
      "MFC类层次结构",
    ],
    chain: [
      "登记运行时类",
      "沿基类链识别",
      "调用创建函数",
      "读写对象状态",
      "查找消息表",
      "沿目标链传命令",
    ],
  },
  {
    slug: "mfc-04-visual-cpp-ide",
    title: "第4章 Visual C++集成开发环境",
    thesis:
      "把Project、调试器、Source Browser、AppWizard和各类资源编辑器视为可审计的构建输入，而不是黑箱按钮。",
    invariant:
      "项目选项、库、头文件、资源ID、生成代码和调试符号都能追溯到磁盘文件及构建命令。",
    terms: [
      "Project",
      "调试器",
      "AppWizard",
      "资源编辑器",
      "Console项目",
      "安装与组成",
    ],
    chain: [
      "建立Project",
      "配置工具选项",
      "生成骨干代码",
      "编辑资源",
      "编译链接",
      "断点检查产物",
    ],
  },
  {
    slug: "mfc-05-application-framework-overview",
    title: "第5章 总观Application Framework",
    thesis:
      "从Application Framework的控制反转进入MFC类族、CObject、集合、异常、Windows API封装、Afx函数、宏与数据类型。",
    invariant:
      "框架负责主控制流，应用通过继承和回调填入策略；通用类与Windows封装类不混淆所有权和线程亲和性。",
    terms: [
      "Application Framework",
      "CObject",
      "Collection Classes",
      "Afx函数",
      "MFC宏",
      "什么是Application Framework？",
    ],
    chain: [
      "识别框架入口",
      "定位类层次",
      "选择通用类",
      "接入Windows封装",
      "调用Afx服务",
      "核对宏与类型",
    ],
  },
  {
    slug: "mfc-06-program-lifecycle",
    title: "第6章 MFC程序的生死因果",
    thesis:
      "沿隐藏WinMain、AfxWinInit、CWinApp初始化、InitInstance、CFrameWnd::Create与Run恢复MFC程序的完整生命线。",
    invariant:
      "Application对象在入口前可用，初始化顺序、主窗口指针、消息泵和退出码一致；失败不会留下半初始化窗口。",
    terms: [
      "Application object",
      "AfxWinInit",
      "InitInstance",
      "CFrameWnd::Create",
      "CWinApp::Run",
      "不二法门：熟记MFC类的层次结构",
    ],
    chain: [
      "构造Application对象",
      "进入隐藏WinMain",
      "执行AFX初始化",
      "运行InitInstance",
      "创建显示主窗口",
      "进入Run消息泵",
    ],
  },
  {
    slug: "mfc-07-framework-skeleton",
    title: "第7章 简单而完整：MFC骨干程序",
    thesis:
      "解剖AppWizard生成的Scribble step0，串起Document Template、主框架、工具栏、状态栏、拖放、消息映射、菜单与View。",
    invariant:
      "Document、View、Frame和Document Template注册成闭合对象图，资源命令ID与消息处理函数一一对应。",
    terms: [
      "Scribble step0",
      "Document Template",
      "主框架",
      "消息映射",
      "CEditView",
      "不二法门：熟记MFC类层次结构",
    ],
    chain: [
      "生成骨干项目",
      "注册Document Template",
      "创建Frame与View",
      "装载菜单工具栏",
      "连接消息映射",
      "验证文档交互",
    ],
  },
  {
    slug: "mfc-08-document-view",
    title: "第8章 Document-View深入探讨",
    thesis:
      "围绕Scribble Step1展开Document、View、Frame、Template、集合与线条模型，再深入Serialize、CArchive和运行时类宏。",
    invariant:
      "Document独占持久数据，View只呈现和编辑；序列化读写对称，运行时类与架构版本足以重建真实对象类型。",
    terms: [
      "CDocTemplate",
      "CScribbleDoc",
      "CScribbleView",
      "CArchive",
      "SERIAL宏",
      "为什么需要Document-View（形而上）",
    ],
    chain: [
      "创建文档模板",
      "建立数据模型",
      "接收View编辑",
      "触发OnDraw重绘",
      "Serialize写档",
      "动态创建并读档",
    ],
  },
  {
    slug: "mfc-09-message-map-command-routing",
    title: "第9章 消息映射与命令传递",
    thesis:
      "把DECLARE/BEGIN/ON/END宏展开为消息表，区分普通Windows消息直线上溯与WM_COMMAND在命令目标间拐弯传递。",
    invariant:
      "消息类别决定查找入口与函数签名；每次分派沿确定类链或命令目标链前进，未处理才继续上溯。",
    terms: [
      "CCmdTarget",
      "Message Map",
      "Command Routing",
      "AfxSig_xx",
      "UPDATE_COMMAND_UI",
      "到底要解决什么",
    ],
    chain: [
      "分类输入消息",
      "定位消息表",
      "匹配签名条目",
      "调用处理函数",
      "沿目标链续传",
      "更新命令UI",
    ],
  },
  {
    slug: "mfc-10-dialogs",
    title: "第10章 MFC与对话盒",
    thesis:
      "从对话框资源与专用类连接消息处理、DDX/DDV和模态/非模态唤起，建立界面控件与领域状态的同步边界。",
    invariant:
      "资源ID、控件成员、DDX方向和DDV规则一致；取消不会提交状态，非模态对象生存期覆盖窗口生存期。",
    terms: [
      "Dialog资源",
      "ClassWizard",
      "DDX",
      "DDV",
      "DoModal",
      "对话框编辑器",
    ],
    chain: [
      "设计对话框资源",
      "生成专用类",
      "绑定控件数据",
      "执行校验",
      "处理消息",
      "提交或取消",
    ],
  },
  {
    slug: "mfc-11-view-and-redraw",
    title: "第11章 View功能的加强与重绘效率的提高",
    thesis:
      "用UpdateAllViews、hint、CScrollView和Splitter控制多View同步、局部失效区、滚动坐标与切分窗口创建。",
    invariant:
      "所有View最终看到同一Document版本；hint只优化范围不改变语义，坐标转换与Splitter对象所有权保持一致。",
    terms: [
      "UpdateAllViews",
      "OnUpdate",
      "hint",
      "CScrollView",
      "Splitter",
      "同时修改多个Views：UpdateAllViews和OnUpdate",
    ],
    chain: [
      "修改Document",
      "生成hint",
      "广播View更新",
      "计算失效区域",
      "滚动坐标变换",
      "创建切分窗格",
    ],
  },
  {
    slug: "mfc-12-print-preview",
    title: "第12章 打印与预览",
    thesis:
      "从Windows打印后台和MFC默认机制进入Scribble增强、设备页/逻辑页、映射模式、分页、页眉页脚、页码与预览。",
    invariant:
      "屏幕、打印与预览共享文档语义；设备上下文、映射模式、页范围和资源成对建立释放，分页结果可预测。",
    terms: [
      "打印后台",
      "CPrintInfo",
      "映射方式",
      "分页",
      "Print Preview",
      "概述",
    ],
    chain: [
      "准备打印任务",
      "查询设备能力",
      "设置映射方式",
      "计算分页",
      "绘制页眉正文",
      "预览并结束",
    ],
  },
  {
    slug: "mfc-13-multiple-documents-views",
    title: "第13章 多重文件与多重显示",
    thesis:
      "比较SDI/MDI、动态与静态Splitter、同源子窗口、Graph/Text多View以及多Document Template和各自UI/文件格式。",
    invariant:
      "每个Frame绑定正确Document与View，每类Document使用匹配Template、资源和序列化逻辑；关闭一个窗口不误销毁共享文档。",
    terms: [
      "SDI与MDI",
      "Multiple Views",
      "CSplitterWnd",
      "Document Template",
      "多文件",
      "MDI和SDI",
    ],
    chain: [
      "选择SDI或MDI",
      "注册多个Template",
      "创建Document",
      "装配Frame与View",
      "切分或新建窗口",
      "保存关闭对象图",
    ],
  },
  {
    slug: "mfc-14-multithreading",
    title: "第14章 MFC多线程程序设计",
    thesis:
      "从模块、进程、线程、优先级、调度和Context进入Worker/UI Thread、CWinThread、创建、结束与同步。",
    invariant:
      "窗口只由所属UI线程操作；共享数据有明确同步协议，线程对象与句柄生存期覆盖执行期，退出可等待。",
    terms: [
      "Thread Context",
      "Worker Thread",
      "UI Thread",
      "CWinThread",
      "同步控制",
      "从操作系统层面看线程",
    ],
    chain: [
      "划分线程职责",
      "创建CWinThread",
      "传递不可变输入",
      "同步共享状态",
      "投递UI结果",
      "请求停止并等待",
    ],
  },
  {
    slug: "mfc-15-custom-appwizard",
    title: "第15章 定制一个AppWizard",
    thesis:
      "解剖Custom AppWizard Components、Dialog Templates/classes、Macros、Directives与text template，并修改Top Studio向导。",
    invariant:
      "向导输入宏经过校验，Directive选择确定模板分支，生成文件可重复且不覆盖用户已编辑区域。",
    terms: [
      "Custom AppWizard",
      "Dialog Templates",
      "Macros",
      "Directives",
      "text template",
      "到底Wizard是什么？",
    ],
    chain: [
      "定义向导需求",
      "设计输入对话框",
      "写入Macros",
      "执行Directives",
      "展开text template",
      "编译验收产物",
    ],
  },
  {
    slug: "mfc-16-components-activex",
    title: "第16章 站上众人的肩膀——使用Components&activeX Controls",
    thesis:
      "从Component Gallery复用Splash、System Info和Tip组件，再按Properties、Methods、Events五步接入ActiveX Control。",
    invariant:
      "引入组件的文件、资源ID、初始化入口和卸载路径可追溯；ActiveX属性、方法与事件绑定到正确控件实例。",
    terms: [
      "Component Gallery",
      "Components",
      "ActiveX Control",
      "Properties/Methods/Events",
      "OcxTest",
      "什么是Component Gallery",
    ],
    chain: [
      "选择Gallery组件",
      "审查生成改动",
      "集成ComTest",
      "插入ActiveX控件",
      "绑定属性方法事件",
      "验证注册与卸载",
    ],
  },
  {
    slug: "mfc-appendix-a-learning-roadmap",
    title: "附录A 无责任书评：从摇篮到坟墓Windows的完全学习",
    thesis:
      "把Windows学习从语言、SDK、MFC、系统机制到高级专题组织成证据路线，并以MFC四大天王书评建立资料选择标准。",
    invariant:
      "每项推荐资料对应明确阶段、前置知识和可验证产出；书名声望不能替代目录覆盖与动手证据。",
    terms: [
      "Windows学习路线",
      "SDK基础",
      "MFC进阶",
      "系统机制",
      "MFC四大天王",
      "无责任书评：MFC四大天王",
    ],
    chain: [
      "盘点前置知识",
      "补齐Win32 SDK",
      "掌握C++对象模型",
      "深入MFC框架",
      "进入系统专题",
      "用项目验证资料",
    ],
  },
  {
    slug: "mfc-appendix-b-scribble-step5-source",
    title: "附录B Scribble Step 5完整原始码",
    thesis:
      "把Scribble Step5完整源码视为跨章集成基线，核对Document/View、序列化、消息路由、打印与资源的真实连接。",
    invariant:
      "源码、资源、工程选项和生成产物来自同一版本；从新建、绘制、保存、重开到打印的轨迹可重放。",
    terms: [
      "Scribble Step5",
      "完整源码",
      "对象图",
      "资源映射",
      "回归基线",
      "附录B Scribble Step 5完整原始码",
    ],
    chain: [
      "建立干净工程",
      "装配Document/View",
      "核对消息资源",
      "绘制并序列化",
      "预览打印",
      "重放回归",
    ],
  },
  {
    slug: "mfc-appendix-c-sample-catalog",
    title: "附录C Visual C++5.0MFC范例程序一览",
    thesis:
      "把Visual C++ 5.0随附MFC范例按类库机制、UI、文档、数据库、OLE/ActiveX和系统主题建立检索与验证目录。",
    invariant:
      "每个范例记录工具版本、展示机制、关键入口和可观察结果；范例代码只作机制证据，不被当成通用架构模板。",
    terms: [
      "MFC范例",
      "机制索引",
      "关键入口",
      "可观察结果",
      "版本限制",
      "附录C Visual C++5.0MFC范例程序一览",
    ],
    chain: [
      "按主题筛选范例",
      "冻结工具版本",
      "定位入口类",
      "追踪关键消息",
      "运行边界样本",
      "记录可迁移结论",
    ],
  },
  {
    slug: "mfc-appendix-d-dbwin",
    title: "附录D 以MFC重建DBWIN",
    thesis:
      "用MFC重建Debug Window，贯通命名共享内存、同步事件、调试字符串捕获、UI线程转交和安全清理。",
    invariant:
      "生产者与DBWIN监听器遵守事件握手和共享缓冲协议；捕获线程不直接操作窗口，关闭可解除阻塞并释放句柄。",
    terms: [
      "DBWIN",
      "共享内存",
      "同步事件",
      "OutputDebugString",
      "线程转交",
      "附录D 以MFC重建DBWIN",
    ],
    chain: [
      "创建命名对象",
      "等待数据事件",
      "读取共享缓冲",
      "通知缓冲可用",
      "投递UI消息",
      "停止并清理句柄",
    ],
  },
  {
    slug: "mfc-official-final-review",
    title: "《深入浅出MFC（第二版）》全书总复习",
    thesis:
      "以可运行Scribble与DBWIN实验串联Win32、C++对象模型、MFC生命线、六大关键技术、文档视图、UI、打印、线程和组件。",
    invariant:
      "版本、对象图、消息轨迹、持久化字节、UI状态和线程清理都可追溯；313个目录层级均能落到实验或解释证据。",
    terms: [
      "Win32底座",
      "六大关键技术",
      "Document/View",
      "命令路由",
      "综合回归",
      "运行时类与动态创建",
    ],
    chain: [
      "重建Win32基线",
      "验证框架生命线",
      "运行Scribble主线",
      "注入消息持久化故障",
      "加入线程与组件",
      "审计附录项目",
    ],
  },
];

export const mfcOfficialQuestions: ReviewQuestion[] = units.flatMap((unit) =>
  unit.terms.map(
    (term, index): ReviewQuestion => ({
      id: unit.slug + "-" + (index + 1),
      chapter: unit.slug,
      level: index < 2 ? 2 : index < 4 ? 3 : 4,
      question:
        unit.title +
        "：如何用“" +
        term +
        "”定位“" +
        unit.chain[index % unit.chain.length] +
        "”阶段的首个MFC机制分叉？",
      answer:
        unit.thesis +
        " 先固定Visual C++ 5.0/MFC 4.2环境、工程、资源和输入，预测“" +
        term +
        "”在“" +
        unit.chain[index % unit.chain.length] +
        "”涉及的对象、宏展开、消息或文件状态；只改变一个条件并停在首错。通过条件是：" +
        unit.invariant +
        " 恢复后以同一输入重放并比较对象图、消息路由、持久化、线程或资源状态。",
      tags: [term, unit.chain[index % unit.chain.length], "深入浅出MFC"],
    }),
  ),
);
