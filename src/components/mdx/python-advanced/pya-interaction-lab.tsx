"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type NodeSpec = {
  id: string;
  label: string;
  title: string;
  content: string;
  failure?: { title: string; desc: string };
};

type ChapterSpec = {
  title: string;
  subtitle: string;
  nodes: NodeSpec[];
};

const CHAPTERS: Record<string, ChapterSpec> = {
  "learning-map": {
    title: "Expert Python Programming · 全书导览",
    subtitle: "五条主线：语言API → 包应用 → 生命周期 → 性能设计 → 工具迁移",
    nodes: [
      { id: "s1", label: "语言与API", title: "第1-4章 · 语言与API", content: "从开发环境、函数级语法、类级机制到命名与API设计。先写公共契约和失败类型，再选语法或工具。", failure: { title: "跳过契约", desc: "现象→只背API名→原因→没有可验证接口→修法→先写失败测试再实现" } },
      { id: "s2", label: "包与应用", title: "第5-7章 · 包与应用", content: "包结构、Atomisator应用和zc.buildout把脚本提升为可安装系统。模块边界决定用户导入路径。", failure: { title: "全暴露API", desc: "现象→内部重排破坏外部→原因→无__all__隔离→修法→白名单导出" } },
      { id: "s3", label: "生命周期", title: "第8-11章 · 生命周期", content: "代码管理、生命周期、文档与TDD把需求到发布串成可重放链。CI每次变更在干净环境构建。", failure: { title: "CI缓存依赖", desc: "现象→开发机过CI挂→原因→依赖缓存→修法→干净环境重跑" } },
      { id: "s4", label: "性能与设计", title: "第12-14章 · 性能与设计", content: "剖析定位瓶颈，优化策略改变复杂度，设计模式让扩展有据。先测量再优化。", failure: { title: "猜测优化", desc: "现象→优化无效→原因→无基线→修法→先剖析再动手" } },
      { id: "s5", label: "工具迁移", title: "工具迁移 · 不变量", content: "历史工具迁移保留声明式配置、隔离、持续反馈和可回滚发布等不变量，用维护中接口重写。", failure: { title: "机械替换", desc: "现象→迁移后更乱→原因→保留隐式环境→修法→提取不变量再重写" } },
    ],
  },
  "getting-started": {
    title: "搭建专业开发环境",
    subtitle: "Python实现、可复现安装、交互提示符、包管理迁移、编辑器与IDE",
    nodes: [
      { id: "impl", label: "解释器", title: "Python实现与工具链", content: "CPython、Jython、IronPython与PyPy有不同ABI。记录解释器实现、版本和平台，不把Python语言等同于某个运行时。", failure: { title: "实现等同", desc: "现象→换解释器报ABI错→原因→假设语言=运行时→修法→记录实现与版本" } },
      { id: "venv", label: "隔离环境", title: "可复现安装", content: "venv创建隔离环境，pyproject声明构建边界。在干净机器验证创建与安装，不依赖工作区残留。", failure: { title: "全局安装", desc: "现象→依赖冲突→原因→无隔离→修法→venv+pyproject锁定" } },
      { id: "repl", label: "REPL", title: "交互提示符", content: "REPL适合探索对象、验证表达式。会话历史不是可复现程序，有效实验须转脚本或测试。", failure: { title: "REPL当程序", desc: "现象→结果不可复现→原因→会话非脚本→修法→转测试文件" } },
      { id: "pip", label: "包管理", title: "包管理迁移", content: "从setuptools/EasyInstall迁到pip+pyproject。保留声明式配置不变量，不把旧命令当新项目默认。", failure: { title: "旧命令默认", desc: "现象→新项目用EasyInstall→原因→未迁移→修法→pip+pyproject" } },
      { id: "ide", label: "工具链", title: "编辑器与IDE", content: "工具选择可变化，但项目配置应进版本库，能从命令行复现同一检查。", failure: { title: "配置不入库", desc: "现象→换机器缺配置→原因→配置在IDE本地→修法→进版本库" } },
    ],
  },
  "syntax-below-class": {
    title: "类以下层级的语法最佳实践",
    subtitle: "推导式、生成器、迭代器、装饰器、with与contextlib",
    nodes: [
      { id: "comp", label: "推导式", title: "列表推导与生成器表达式", content: "推导式适合单一可读的映射或过滤，生成器表达式惰性传给消费者。复杂副作用时改回显式循环。", failure: { title: "推导嵌套", desc: "现象→可读性差→原因→多层嵌套→修法→改回显式循环" } },
      { id: "iter", label: "迭代器", title: "迭代器与生成器", content: "iter与next协作，生成器保存暂停点与局部状态。惰性只降低驻留元素数，不自动限制上游无限生产。", failure: { title: "生成器当列表", desc: "现象→取下标报错→原因→迭代器无__getitem__→修法→list()物化" } },
      { id: "coro", label: "协程", title: "协程", content: "原书用send推入值到暂停的执行体；现代async协程由事件循环调度，协议不同不可混用。", failure: { title: "send与async混", desc: "现象→运行报错→原因→协议不同→修法→async/await统一" } },
      { id: "deco", label: "装饰器", title: "装饰器", content: "装饰器在定义阶段替换可调用对象。@wraps保留__name__/__doc__元数据，包装器须透传参数与异常。", failure: { title: "丢元数据", desc: "现象→help显示wrapper→原因→无@wraps→修法→functools.wraps" } },
      { id: "with", label: "上下文", title: "with与contextlib", content: "上下文管理器把获取和释放绑成词法作用域，即使异常也执行清理。@contextmanager用yield交接控制。", failure: { title: "异常吞掉", desc: "现象→资源没释放→原因→except吞异常→修法→finally只释放不捕获" } },
    ],
  },
  "syntax-above-class": {
    title: "类以上层级的语法最佳实践",
    subtitle: "内置类型子类化、super与MRO、描述符、slots、元编程",
    nodes: [
      { id: "subclass", label: "子类化", title: "内置类型子类化", content: "直接继承list或dict时C级操作可能绕过重写方法。优先用collections.UserList/UserDict。", failure: { title: "C级绕过", desc: "现象→重写不生效→原因→C操作跳过Python层→修法→UserList" } },
      { id: "super", label: "super", title: "super与MRO", content: "super沿方法解析顺序继续协作调用，不等同于固定父类。所有层用**kwargs透传保持菱形只执行一次。", failure: { title: "签名不兼容", desc: "现象→super报参数错→原因→各层签名不同→修法→**kwargs透传" } },
      { id: "desc", label: "描述符", title: "描述符与property", content: "数据描述符（有__set__）优先级高于实例字典，非数据描述符反之。__set_name__自动绑定属主。", failure: { title: "property被遮蔽", desc: "现象→验证被绕过→原因→property非数据描述符→修法→定义__set__" } },
      { id: "slots", label: "slots", title: "slots与对象布局", content: "__slots__固定属性槽减少实例字典开销，但影响弱引用与动态属性。先测量大量实例再决定。", failure: { title: "滥用slots", desc: "现象→无法加属性→原因→slots固定槽→修法→先测瓶颈再用" } },
      { id: "meta", label: "元编程", title: "元编程", content: "现代代码优先__init_subclass__和类装饰器，只有必须控制类对象创建时才引入元类。", failure: { title: "滥用元类", desc: "现象→调试困难→原因→元类改变创建流程→修法→用__init_subclass__" } },
    ],
  },
  "choosing-good-names": {
    title: "选择好名字与设计API",
    subtitle: "PEP 8命名、参数设计、名称指南、命名空间与API、弃用与质量工具",
    nodes: [
      { id: "pep8", label: "PEP 8", title: "PEP 8与命名风格", content: "布尔名称表达判断，序列用复数，映射说明键值含义。风格检查发现形式偏差，语义准确仍需领域评审。", failure: { title: "泛称命名", desc: "现象→读者不懂含义→原因→用data/manager→修法→含领域语义" } },
      { id: "params", label: "参数", title: "参数设计", content: "必需项位置参数，可选项关键字参数，*分隔符阻止位置穿透。**kwargs会吞掉拼写错误。", failure: { title: "kwargs吞参", desc: "现象→拼错不报错→原因→**kwargs静默→修法→关键字限定*" } },
      { id: "ns", label: "命名空间", title: "命名空间与API", content: "模块树决定导入路径，公共API要小而稳定。__all__白名单隔离内部重排，不把所有实现暴露为偶然契约。", failure: { title: "全暴露", desc: "现象→改动牵连广→原因→无__all__→修法→白名单导出" } },
      { id: "deprec", label: "弃用", title: "弃用与质量工具", content: "弃用须给替代路径、DeprecationWarning、stacklevel和期限。静态检查提供线索，最终变更仍需测试。", failure: { title: "只注释不告警", desc: "现象→调用方不知→原因→无warn→修法→warnings.warn+stacklevel" } },
    ],
  },
  "writing-package": {
    title: "编写与分发包",
    subtitle: "统一包结构、构建分发、包元数据、模板化、发布周期",
    nodes: [
      { id: "src", label: "src布局", title: "统一包结构", content: "src布局隔离源码，安装后的包才是验收对象。避免测试意外导入工作区源码。", failure: { title: "非src布局", desc: "现象→测试导入错误源→原因→无src隔离→修法→src/布局" } },
      { id: "build", label: "构建", title: "构建与分发命令", content: "pyproject声明构建后端，build产出sdist与wheel，pip安装。不把distutils命令当新项目默认。", failure: { title: "setup.py硬编码", desc: "现象→构建不一致→原因→命令式配置→修法→pyproject声明式" } },
      { id: "meta", label: "元数据", title: "包元数据", content: "名称、版本、Python要求、依赖和许可证影响解析与安装。元数据来自单一来源，在构建制品中复查。", failure: { title: "元数据分散", desc: "现象→版本不一致→原因→多处声明→修法→pyproject单一来源" } },
      { id: "release", label: "发布", title: "开发与发布周期", content: "每个版本从干净标签构建，同一制品验证后再提升。锁定完整运行环境并验证入口点。", failure: { title: "脏构建", desc: "现象→制品不可复现→原因→非干净环境→修法→从标签构建" } },
    ],
  },
  "writing-application": {
    title: "编写模块化应用",
    subtitle: "Atomisator案例、架构、测试、parser/db/feed、分发",
    nodes: [
      { id: "atom", label: "Atomisator", title: "Atomisator案例", content: "应用不是大脚本，而是解析、存储、生成和编排等可独立测试的包。先画依赖方向再配置隔离环境。", failure: { title: "大脚本", desc: "现象→无法测试→原因→全耦合→修法→拆成独立包" } },
      { id: "arch", label: "架构", title: "整体架构与工作环境", content: "基础设施只能依赖接口，不反向污染领域模型。解析器输出稳定记录，数据库负责事务。", failure: { title: "领域反向依赖", desc: "现象→换存储改模型→原因→模型import ORM→修法→领域用Protocol" } },
      { id: "test", label: "测试", title: "测试运行器与包结构", content: "单元测试隔离解析与存储，集成测试连接临时数据库和真实样本。两层分开运行。", failure: { title: "单元连DB", desc: "现象→CI慢→原因→无分层→修法→单元用内存桩" } },
      { id: "dist", label: "分发", title: "应用分发与依赖", content: "区分库依赖和部署配置，锁定完整运行环境。分发成功要证明迁移、启动和关闭。", failure: { title: "依赖未锁", desc: "现象→部署启动失败→原因→版本漂移→修法→lock锁定" } },
    ],
  },
  "zc-buildout": {
    title: "使用 zc.buildout 管理环境",
    subtitle: "buildout哲学、配置结构、recipe、环境、发布",
    nodes: [
      { id: "phil", label: "哲学", title: "zc.buildout哲学", content: "buildout把环境拆成声明式part并由recipe生成结果。阅读重点是输入、解析、产物和可重建性。", failure: { title: "默认采用旧工具", desc: "现象→新项目用buildout→原因→未迁移→修法→pip+pyproject" } },
      { id: "config", label: "配置", title: "配置结构与命令", content: "buildout节定义parts、下载源和版本。配置继承增强复用也会隐藏来源，验收要输出最终解析配置。", failure: { title: "继承隐藏", desc: "现象→配置来源不清→原因→继承覆盖→修法→输出解析结果" } },
      { id: "recipe", label: "recipe", title: "recipe机制", content: "recipe把配置转换为文件、脚本或服务定义，必须声明输入并实现幂等更新与卸载。", failure: { title: "非幂等", desc: "现象→重复构建出错→原因→recipe不幂等→修法→声明输入+幂等" } },
      { id: "migrate", label: "迁移", title: "现代迁移", content: "现代迁移用锁定依赖、容器或部署清单重建环境，保留可重复组装应用的不变量。", failure: { title: "机械替换", desc: "现象→迁移后更乱→原因→保留隐式环境→修法→提取不变量" } },
    ],
  },
  "managing-code": {
    title: "管理代码与持续集成",
    subtitle: "版本控制、Mercurial工作流、CI原则、Buildbot、证据",
    nodes: [
      { id: "vcs", label: "版本控制", title: "版本控制模型", content: "提交应原子、可评审，把生成制品与秘密排除在源码历史之外。迁移到Git仍要保留受保护分支与审查。", failure: { title: "提交非原子", desc: "现象→回滚困难→原因→混合变更→修法→一提交一变更" } },
      { id: "ci", label: "CI", title: "持续集成原则", content: "每次变更在干净环境自动构建、测试并报告，失败阻断合并。CI不能依赖开发机缓存。", failure: { title: "CI缓存依赖", desc: "现象→开发机过CI挂→原因→隐式状态→修法→干净环境" } },
      { id: "bot", label: "Buildbot", title: "Buildbot流水线", content: "Buildbot把代码变更触发到worker步骤和结果。触发、矩阵、超时、日志、制品和取消语义必须明确。", failure: { title: "语义不明", desc: "现象→失败原因不清→原因→无日志→修法→明确取消语义" } },
      { id: "evid", label: "证据", title: "代码管理证据", content: "一次合并应能追到提交、审查、测试运行、环境和制品摘要。只保留绿色徽章无法重放失败。", failure: { title: "只看徽章", desc: "现象→无法复现→原因→无证据链→修法→保存制品摘要" } },
    ],
  },
  "managing-life-cycle": {
    title: "管理软件生命周期",
    subtitle: "生命周期模型、迭代开发、调试发布、Trac、复盘",
    nodes: [
      { id: "model", label: "模型", title: "生命周期模型", content: "瀑布、螺旋和迭代对反馈时机不同。选择由不确定性、法规和交付成本决定，不是把流程当仪式。", failure: { title: "流程仪式化", desc: "现象→走流程无价值→原因→盲目套模型→修法→按不确定性选" } },
      { id: "iter", label: "迭代", title: "迭代式计划与开发", content: "把目标拆成可验收增量，每次迭代含设计、实现、测试和反馈。完成定义须含文档、迁移与运行证据。", failure: { title: "完成定义模糊", desc: "现象→交付不完整→原因→无验收条件→修法→含文档迁移证据" } },
      { id: "release", label: "发布", title: "全局调试与发布", content: "集成阶段检查跨模块契约，发布用冻结输入与候选制品。在发布当天首次组合系统会把未知风险集中爆发。", failure: { title: "发布日首组合", desc: "现象→风险爆发→原因→未预集成→修法→候选制品先验证" } },
      { id: "trac", label: "Trac", title: "Trac跟踪系统", content: "需求、变更、决策和证据须双向链接。现代平台可替代工具，但链接不可丢失。", failure: { title: "链接断裂", desc: "现象→需求无追踪→原因→工具无链接→修法→双向链接" } },
      { id: "retro", label: "复盘", title: "关闭与复盘", content: "迭代结束关闭未完成项，复盘关注系统条件而非个人归罪，验证改进是否在下一迭代执行。", failure: { title: "归罪个人", desc: "现象→团队恐惧→原因→复盘变追责→修法→关注系统条件" } },
    ],
  },
  "documenting-project": {
    title: "编写项目文档",
    subtitle: "技术写作七原则、reStructuredText、Sphinx、受众、验收",
    nodes: [
      { id: "principles", label: "七原则", title: "技术写作七原则", content: "先写结构再润色，面向明确读者，示例真实且最小，用模板保持一致。信息轻量但充分。", failure: { title: "先润色后结构", desc: "现象→文档混乱→原因→无结构→修法→先结构再润色" } },
      { id: "rst", label: "reST", title: "reStructuredText", content: "标记语法服务于语义结构，不能用视觉缩进替代可解析层级。标题、列表、代码块有明确语义。", failure: { title: "视觉代语义", desc: "现象→Sphinx解析错→原因→缩进不对→修法→用语义标记" } },
      { id: "sphinx", label: "Sphinx", title: "Sphinx构建", content: "Sphinx把源文档、自动API和交叉引用构建成可发布站点。构建在CI中把断链和严重警告作为失败。", failure: { title: "警告忽略", desc: "现象→断链无人理→原因→CI未阻断→修法→-W --keep-going" } },
      { id: "audience", label: "受众", title: "文档组合与受众", content: "设计、使用和运维文档回答不同问题，生产者与消费者需不同入口。一个超长README不能替代信息架构。", failure: { title: "全塞README", desc: "现象→读者迷路→原因→无分层→修法→按受众分入口" } },
      { id: "verify", label: "验收", title: "文档验收", content: "代码示例应可执行，版本与配置明确，发布时文档和制品同版本。过期页面应删除或标明适用范围。", failure: { title: "示例不可执行", desc: "现象→文档过时→原因→无验证→修法→doctest纳入CI" } },
    ],
  },
  "test-driven-development": {
    title: "测试驱动开发",
    subtitle: "TDD原则、验收与单元测试、测试工具、Fake与Mock、文档驱动",
    nodes: [
      { id: "tdd", label: "TDD", title: "TDD原则", content: "先写会失败的行为示例，再写最小实现并重构。RED→GREEN→REFACTOR三阶段循环。", failure: { title: "跳过RED", desc: "现象→测试无效→原因→先实现后补测→修法→先失败再实现" } },
      { id: "levels", label: "测试层级", title: "验收测试与单元测试", content: "验收测试从用户边界证明能力，单元测试快速验证局部规则。两者间还需集成测试覆盖适配层。", failure: { title: "只测快乐路径", desc: "现象→覆盖率100%仍出bug→原因→无边界→修法→含空输入上限" } },
      { id: "tools", label: "测试工具", title: "标准测试工具", content: "unittest、doctest和测试发现提供标准反馈环。迁移时统一fixture、参数化和失败报告。", failure: { title: "工具碎片化", desc: "现象→报告不一→原因→多工具混用→修法→统一fixture" } },
      { id: "fake", label: "Fake与Mock", title: "Fake与Mock", content: "fake提供简化但可工作的实现，mock验证特定交互。优先断言可见结果，只有协议本身重要时才锁定交互。", failure: { title: "过度mock", desc: "现象→重构即断裂→原因→锁定调用细节→修法→先断言结果" } },
      { id: "doctest", label: "文档驱动", title: "文档驱动开发", content: "doctest把可读示例变成执行证据，适合稳定小接口。复杂环境应移到测试模块，避免文档被淹没。", failure: { title: "doctest漂移", desc: "现象→示例失败无人理→原因→未入CI→修法→纳入构建" } },
    ],
  },
  "optimization-profiling": {
    title: "优化原则与性能剖析",
    subtitle: "优化三原则、策略、CPU剖析、内存剖析、网络剖析",
    nodes: [
      { id: "principles", label: "三原则", title: "优化三原则", content: "先让程序正确，有性能预算和基线再优化。没有基线的优化只是猜测。", failure: { title: "无基线优化", desc: "现象→优化无效→原因→无基线→修法→先建基线" } },
      { id: "strategy", label: "策略", title: "优化策略", content: "先确认瓶颈是否在本服务，再考虑算法或缓存。局部变快若让端到端更慢就不算优化。", failure: { title: "局部≠全局", desc: "现象→优化反慢→原因→缓存锁竞争→修法→端到端回归测试" } },
      { id: "cpu", label: "CPU剖析", title: "CPU剖析", content: "cProfile采样插桩记录调用耗时与次数。sort cumulative定位最热调用链，再隔离验证。", failure: { title: "微基准误导", desc: "现象→线上无改善→原因→瓶颈在IO→修法→先宏观剖析" } },
      { id: "mem", label: "内存剖析", title: "内存剖析", content: "tracemalloc同时记录current和peak。单看最终内存会漏掉处理中间峰值，优化也要防复用可变对象造成错误。", failure: { title: "只看最终", desc: "现象→高峰OOM→原因→漏掉peak→修法→同时看current+peak" } },
      { id: "net", label: "网络剖析", title: "网络剖析", content: "网络分解为DNS、连接、握手、服务处理和传输。平均时延掩盖尾部与重试放大。", failure: { title: "只看平均", desc: "现象→用户仍抱怨→原因→掩盖P99→修法→看P50/P95/P99" } },
    ],
  },
  "optimization-solutions": {
    title: "优化解法",
    subtitle: "复杂度与简化、集合与数据结构、减少外部调用、线程与多进程、缓存",
    nodes: [
      { id: "complexity", label: "复杂度", title: "复杂度与简化", content: "先删掉重复工作和不必要状态，再决定是否换算法。常数优化不能挽救错误增长阶。", failure: { title: "常数优化", desc: "现象→优化无效→原因→增长阶错误→修法→先简化再换算法" } },
      { id: "struct", label: "数据结构", title: "集合与数据结构", content: "成员查询从list换到set可改变复杂度。建结构本身有成本，按查询次数衡量是否值得。", failure: { title: "盲目换set", desc: "现象→反而更慢→原因→查询少→修法→查询>>m才换" } },
      { id: "batch", label: "减少调用", title: "减少外部调用", content: "批处理、连接复用和请求合并降低往返，但增加延迟、内存与部分失败复杂度。批大小和重试须有上限。", failure: { title: "无上限批", desc: "现象→内存溢出→原因→批太大→修法→设上限和重试" } },
      { id: "parallel", label: "并行", title: "线程与多进程", content: "线程适合等待型任务，多进程隔离解释器并行CPU工作。传输、序列化和启动成本决定实际收益。", failure: { title: "轻量并行", desc: "现象→比串行还慢→原因→启动>计算→修法→增大粒度" } },
      { id: "cache", label: "缓存", title: "缓存策略", content: "缓存键必须包含影响结果的全部输入。测量命中率、陈旧窗口和击穿保护，命中率低则移除。", failure: { title: "键不含版本", desc: "现象→命中旧数据→原因→键缺policy_version→修法→版本纳入键" } },
    ],
  },
  "useful-design-patterns": {
    title: "Python中的实用设计模式",
    subtitle: "Singleton、Adapter、Proxy与Facade、Observer与Visitor、Template",
    nodes: [
      { id: "singleton", label: "Singleton", title: "创建型模式与Singleton", content: "Python模块常已提供单实例命名空间。显式依赖注入通常比隐藏全局对象更易测试。", failure: { title: "全局状态污染", desc: "现象→测试互相污染→原因→Singleton隐藏状态→修法→依赖注入" } },
      { id: "adapter", label: "Adapter", title: "Adapter与接口", content: "Adapter把既有对象转换为调用者期望的协议。适配器只做接口转换，不夹带业务逻辑。", failure: { title: "适配器膨胀", desc: "现象→调试不知在哪层→原因→夹带业务→修法→只做转换" } },
      { id: "proxy", label: "Proxy", title: "Proxy与Facade", content: "Proxy在同一接口前控制访问或缓存，Facade为复杂子系统提供较小入口。两者不改变错误语义。", failure: { title: "改变错误语义", desc: "现象→异常被吞→原因→Proxy捕获→修法→透传异常" } },
      { id: "observer", label: "Observer", title: "Observer与Visitor", content: "Observer解耦生产者与订阅者，需退订、顺序和失败隔离。Visitor集中操作，代价是新增类型要更新访问者。", failure: { title: "一个失败中断全链", desc: "现象→后续handler不执行→原因→无隔离→修法→try/except隔离" } },
      { id: "template", label: "Template", title: "Template模式", content: "模板方法固定算法骨架并让步骤可替换。Python可用高阶函数和组合避免深继承，选择依据是扩展轴与状态共享。", failure: { title: "深继承", desc: "现象→扩展困难→原因→继承链耦合→修法→高阶函数组合" } },
    ],
  },
  "final-review": {
    title: "全书总复习",
    subtitle: "可读语法、可分发系统、可追踪生命周期、测量后优化、Python化设计",
    nodes: [
      { id: "syntax", label: "可读语法", title: "可读语法", content: "迭代器、装饰器、上下文管理器和类机制让资源与协议更清楚，而非追求技巧密度。", failure: { title: "技巧密度", desc: "现象→代码难读→原因→炫技→修法→让协议更清楚" } },
      { id: "distrib", label: "可分发", title: "可分发系统", content: "包元数据、模块边界、可重建环境和发布制品把脚本提升为可安装系统。", failure: { title: "脚本非系统", desc: "现象→无法安装→原因→无包结构→修法→pyproject+src" } },
      { id: "lifecycle", label: "生命周期", title: "可追踪生命周期", content: "版本、任务、CI、文档和测试把需求到发布证据串成可重放链。", failure: { title: "链断裂", desc: "现象→无法重放→原因→证据缺失→修法→制品摘要+提交链" } },
      { id: "perf", label: "优化", title: "测量后优化", content: "用户目标、基线、剖析和回归测试先于数据结构、并发与缓存方案。", failure: { title: "先优化后测量", desc: "现象→方向错误→原因→无基线→修法→先测量" } },
      { id: "pythonic", label: "Python化", title: "Python化设计", content: "协议、组合和函数是一等选择，只有扩展轴确实稳定时才引入更重的模式。", failure: { title: "过度模式", desc: "现象→过度设计→原因→Java式模式→修法→组合优先" } },
    ],
  },
};

export function PyaInteractionLab({ chapter }: { chapter: string }) {
  const spec = CHAPTERS[chapter] ?? CHAPTERS["learning-map"];
  const [selected, setSelected] = useState(spec.nodes[0].id);
  const [injectFaults, setInjectFaults] = useState(false);
  const reset = useCallback(() => {
    setSelected(spec.nodes[0].id);
    setInjectFaults(false);
  }, [spec]);

  const stage = spec.nodes.find((n) => n.id === selected) ?? spec.nodes[0];
  const nodeW = 140;
  const gap = 16;
  const totalW = spec.nodes.length * nodeW + (spec.nodes.length - 1) * gap;
  const startX = (900 - totalW) / 2;
  const NODE_Y = 140;
  const NODE_H = 60;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ {spec.title}</span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>
      <div className="p-4">
        <svg viewBox="0 0 900 360" className="w-full" role="img" aria-label={spec.title} style={{ minHeight: 140 }}>
          <text x={450} y={40} textAnchor="middle" fontSize={14} fontWeight={600} fill={C.primary}>
            {spec.subtitle}
          </text>
          {spec.nodes.map((n, i) => {
            const cx = startX + i * (nodeW + gap) + nodeW / 2;
            const x = startX + i * (nodeW + gap);
            const isSelected = n.id === selected;
            const isFail = injectFaults && n.failure;
            return (
              <g key={n.id} className="cursor-pointer" onClick={() => setSelected(n.id)}>
                <rect
                  x={x}
                  y={NODE_Y}
                  width={nodeW}
                  height={NODE_H}
                  rx={8}
                  fill={isSelected ? C.elevated : C.bg}
                  stroke={isFail ? C.danger : isSelected ? C.accent : C.border}
                  strokeWidth={isSelected || isFail ? 2 : 1}
                />
                <text x={cx} y={NODE_Y + 26} textAnchor="middle" fontSize={12} fontWeight={500} fill={C.primary}>
                  {n.label}
                </text>
                <text x={cx} y={NODE_Y + 44} textAnchor="middle" fontSize={11} fill={C.secondary}>
                  {n.title.length > 12 ? n.title.slice(0, 11) + "…" : n.title}
                </text>
                {i < spec.nodes.length - 1 && (
                  <g>
                    <line x1={x + nodeW} y1={NODE_Y + NODE_H / 2} x2={x + nodeW + gap} y2={NODE_Y + NODE_H / 2} stroke={C.border} strokeWidth={1} />
                    <polygon points={`${x + nodeW + gap},${NODE_Y + NODE_H / 2 - 4} ${x + nodeW + gap},${NODE_Y + NODE_H / 2 + 4} ${x + nodeW + gap + 6},${NODE_Y + NODE_H / 2}`} fill={C.border} />
                  </g>
                )}
                {isFail && (
                  <text x={cx} y={NODE_Y + NODE_H + 18} textAnchor="middle" fontSize={11} fontWeight={500} fill={C.danger}>
                    {n.failure!.title}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="mt-4 rounded-control border border-border p-4" style={{ background: C.bg }}>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: C.accent }} />
            <span className="text-sm font-medium" style={{ color: C.primary }}>{stage.title}</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.secondary }}>{stage.content}</p>
          {injectFaults && stage.failure && (
            <div className="mt-3 rounded-control border p-3" style={{ background: C.elevated, borderColor: C.danger }}>
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: C.danger }} />
                <span className="text-xs font-semibold" style={{ color: C.danger }}>故障注入 · {stage.failure.title}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: C.secondary }}>{stage.failure.desc}</p>
            </div>
          )}
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-3">
          <button
            onClick={() => setInjectFaults(!injectFaults)}
            className="relative h-5 w-9 rounded-full border border-border transition-colors"
            style={{ background: injectFaults ? C.accent : C.elevated }}
            aria-label="注入常见故障"
          >
            <span className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform" style={{ transform: injectFaults ? "translateX(16px)" : "translateX(0)" }} />
          </button>
          <span className="text-sm" style={{ color: C.secondary }}>注入常见故障（高亮各环节的失败模式）</span>
        </label>
      </div>
    </div>
  );
}
