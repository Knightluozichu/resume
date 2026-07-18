import type { ReviewQuestion } from "./types";
/** Tarek Ziadé《Expert Python Programming》官方14章复习题。 */
export const pyaOfficialChapterQuestions: ReviewQuestion[] = [
  {
    "id": "pya-getting-started-1",
    "chapter": "pya-getting-started",
    "level": 1,
    "question": "第1章中，Python实现与工具链解决什么问题？",
    "answer": "原书从CPython、Jython、IronPython与PyPy说明实现差异；现代项目仍要记录解释器实现、版本、ABI和平台，不能把Python语言与某个运行时完全等同。",
    "tags": [
      "第1章",
      "Python实现与工具链"
    ]
  },
  {
    "id": "pya-getting-started-2",
    "chapter": "pya-getting-started",
    "level": 2,
    "question": "可复现安装与交互提示符怎样协作？",
    "answer": "系统包、源码编译和Windows工具链会改变头文件、动态库与扩展构建结果；当前实践应使用受支持解释器和隔离环境，并在干净机器验证创建与安装。 提示符适合探索对象、验证表达式和缩小故障，但会话历史不是可复现程序；有效实验要转成脚本、测试或文档示例。",
    "tags": [
      "第1章",
      "机制"
    ]
  },
  {
    "id": "pya-getting-started-3",
    "chapter": "pya-getting-started",
    "level": 3,
    "question": "如何验证包管理迁移的失败边界？",
    "answer": "原书的setuptools与EasyInstall建立依赖安装意识；现代项目用pip、venv和pyproject声明构建边界，旧命令只作为迁移背景。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第1章",
      "实验"
    ]
  },
  {
    "id": "pya-getting-started-4",
    "chapter": "pya-getting-started",
    "level": 4,
    "question": "怎样用编辑器与IDE完成现代迁移？",
    "answer": "编辑器、调试器、格式与静态检查共同构成反馈环；工具选择可以变化，但项目配置应进版本库，并能从命令行复现同一检查。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第1章",
      "迁移"
    ]
  },
  {
    "id": "pya-syntax-below-class-1",
    "chapter": "pya-syntax-below-class",
    "level": 1,
    "question": "第2章中，列表推导与生成器表达式解决什么问题？",
    "answer": "推导式适合单一、可读的映射或过滤，生成器表达式把结果惰性传给消费者；当副作用、分支或异常复杂时应改回显式循环。",
    "tags": [
      "第2章",
      "列表推导与生成器表达式"
    ]
  },
  {
    "id": "pya-syntax-below-class-2",
    "chapter": "pya-syntax-below-class",
    "level": 2,
    "question": "迭代器与生成器与协程怎样协作？",
    "answer": "迭代协议由iter与next协作，生成器保存暂停点与局部状态；惰性只降低同时驻留的元素，不会自动限制上游无限生产。 原书基于生成器send讨论协程，把数据推入暂停的执行体；现代async协程语法不同，但消息输入、取消、关闭和异常传播仍是同一类协议问题。",
    "tags": [
      "第2章",
      "机制"
    ]
  },
  {
    "id": "pya-syntax-below-class-3",
    "chapter": "pya-syntax-below-class",
    "level": 3,
    "question": "如何验证装饰器的失败边界？",
    "answer": "装饰器在定义阶段替换可调用对象，适合横切契约；包装器要保留元数据、参数与异常语义，不能把业务控制流藏进不可见全局状态。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第2章",
      "实验"
    ]
  },
  {
    "id": "pya-syntax-below-class-4",
    "chapter": "pya-syntax-below-class",
    "level": 4,
    "question": "怎样用with与contextlib完成现代迁移？",
    "answer": "上下文管理器把获取和释放绑成词法作用域，即使异常也执行清理；它适合文件、锁、事务和临时资源，但退出方法必须明确是否吞掉异常。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第2章",
      "迁移"
    ]
  },
  {
    "id": "pya-syntax-above-class-1",
    "chapter": "pya-syntax-above-class",
    "level": 1,
    "question": "第3章中，内置类型子类化解决什么问题？",
    "answer": "直接继承list或dict时部分C级操作可能绕过重写方法；先确认需要的是名义子类型、协议实现还是组合包装，避免只为复用存储而继承。",
    "tags": [
      "第3章",
      "内置类型子类化"
    ]
  },
  {
    "id": "pya-syntax-above-class-2",
    "chapter": "pya-syntax-above-class",
    "level": 2,
    "question": "super与MRO与描述符与property怎样协作？",
    "answer": "super沿方法解析顺序继续协作调用，不等同于固定父类；多重继承中的每个实现要使用兼容签名并继续链条，才能保持菱形结构只执行一次。 描述符把属性读取、写入和删除委托给类属性对象，property是常用封装；数据描述符、实例字典与非数据描述符有确定查找优先级。",
    "tags": [
      "第3章",
      "机制"
    ]
  },
  {
    "id": "pya-syntax-above-class-3",
    "chapter": "pya-syntax-above-class",
    "level": 3,
    "question": "如何验证slots与对象布局的失败边界？",
    "answer": "slots声明固定属性槽并可减少实例字典开销，但会影响弱引用、继承和动态属性；只有测量大量实例后才应为内存使用它。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第3章",
      "实验"
    ]
  },
  {
    "id": "pya-syntax-above-class-4",
    "chapter": "pya-syntax-above-class",
    "level": 4,
    "question": "怎样用元编程完成现代迁移？",
    "answer": "原书通过new和metaclass展示类创建钩子；现代代码优先类装饰器或init_subclass，只有必须控制类对象创建时才引入元类。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第3章",
      "迁移"
    ]
  },
  {
    "id": "pya-choosing-good-names-1",
    "chapter": "pya-choosing-good-names",
    "level": 1,
    "question": "第4章中，PEP 8与命名风格解决什么问题？",
    "answer": "名字应按变量、常量、函数、类和模块的角色保持一致；风格检查能发现形式偏差，但语义是否准确仍需领域评审。",
    "tags": [
      "第4章",
      "PEP 8与命名风格"
    ]
  },
  {
    "id": "pya-choosing-good-names-2",
    "chapter": "pya-choosing-good-names",
    "level": 2,
    "question": "参数设计与名称指南怎样协作？",
    "answer": "参数从真实用例迭代出来，必需项、默认值和关键字边界共同形成API；任意参数能扩展接口，也可能吞掉拼写错误和破坏可发现性。 布尔名称表达判断，序列用复数，映射说明键值含义，并避免data、manager等泛称；名称应让读者无需展开实现即可预测单位和失败。",
    "tags": [
      "第4章",
      "机制"
    ]
  },
  {
    "id": "pya-choosing-good-names-3",
    "chapter": "pya-choosing-good-names",
    "level": 3,
    "question": "如何验证命名空间与API的失败边界？",
    "answer": "模块树决定用户导入路径，公共API要小而稳定；内部重排通过显式导出隔离，不能把所有实现细节暴露为偶然契约。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第4章",
      "实验"
    ]
  },
  {
    "id": "pya-choosing-good-names-4",
    "chapter": "pya-choosing-good-names",
    "level": 4,
    "question": "怎样用弃用与质量工具完成现代迁移？",
    "answer": "弃用要给替代路径、告警、期限和兼容窗口，再在主版本删除；静态检查与重复检测提供线索，最终变更仍需测试真实调用者。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第4章",
      "迁移"
    ]
  },
  {
    "id": "pya-writing-package-1",
    "chapter": "pya-writing-package",
    "level": 1,
    "question": "第5章中，统一包结构解决什么问题？",
    "answer": "源码、测试、文档、许可证和构建元数据应有稳定位置；src布局可避免测试意外导入工作区源码，安装后的包才是验收对象。",
    "tags": [
      "第5章",
      "统一包结构"
    ]
  },
  {
    "id": "pya-writing-package-2",
    "chapter": "pya-writing-package",
    "level": 2,
    "question": "构建与分发命令与包元数据怎样协作？",
    "answer": "原书围绕setup.py的sdist、bdist、install和develop讲生命周期；当前PyPA流程由pyproject声明后端，用build产出sdist与wheel并用pip安装。 名称、版本、Python要求、依赖、入口点和许可证影响解析与安装；元数据应来自单一来源，在构建制品中复查而不是只看配置文件。",
    "tags": [
      "第5章",
      "机制"
    ]
  },
  {
    "id": "pya-writing-package-3",
    "chapter": "pya-writing-package",
    "level": 3,
    "question": "如何验证模板化创建的失败边界？",
    "answer": "原书用Python Paste模板统一项目骨架；现代脚手架仍有价值，但模板必须版本化、可升级并保持最小，避免复制长期无人维护的配置。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第5章",
      "实验"
    ]
  },
  {
    "id": "pya-writing-package-4",
    "chapter": "pya-writing-package",
    "level": 4,
    "question": "怎样用开发与发布周期完成现代迁移？",
    "answer": "编辑安装、测试、构建、检查、测试索引和正式发布组成流水线；每个版本从干净标签构建，同一制品经过验证后再提升。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第5章",
      "迁移"
    ]
  },
  {
    "id": "pya-writing-application-1",
    "chapter": "pya-writing-application",
    "level": 1,
    "question": "第6章中，Atomisator案例解决什么问题？",
    "answer": "原书用Atomisator聚合订阅源，展示应用不是一个大脚本，而是解析、存储、生成和编排等可独立测试的包。",
    "tags": [
      "第6章",
      "Atomisator案例"
    ]
  },
  {
    "id": "pya-writing-application-2",
    "chapter": "pya-writing-application",
    "level": 2,
    "question": "整体架构与工作环境与测试运行器与包结构怎样协作？",
    "answer": "先画输入源、解析器、数据库、输出feed和主程序的依赖方向，再配置隔离环境；基础设施只能依赖接口，不反向污染领域模型。 测试入口和包结构在写业务前建立反馈环；单元测试隔离解析与存储，集成测试再连接临时数据库和真实格式样本。",
    "tags": [
      "第6章",
      "机制"
    ]
  },
  {
    "id": "pya-writing-application-3",
    "chapter": "pya-writing-application",
    "level": 3,
    "question": "如何验证parser、db与feed API的失败边界？",
    "answer": "解析器输出稳定记录，数据库负责事务，feed只渲染查询结果；跨包API传领域值与显式错误，不泄漏ORM会话或全局连接。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第6章",
      "实验"
    ]
  },
  {
    "id": "pya-writing-application-4",
    "chapter": "pya-writing-application",
    "level": 4,
    "question": "怎样用应用分发与依赖完成现代迁移？",
    "answer": "应用由多个包组成时要区分库依赖和部署配置，锁定完整运行环境并验证入口点；分发成功还要证明迁移、启动和关闭。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第6章",
      "迁移"
    ]
  },
  {
    "id": "pya-zc-buildout-1",
    "chapter": "pya-zc-buildout",
    "level": 1,
    "question": "第7章中，zc.buildout哲学解决什么问题？",
    "answer": "buildout把环境拆成声明式part并由recipe生成结果，历史价值在于可重复组装应用；今天阅读重点是输入、解析、产物和可重建性，而非默认采用旧工具。",
    "tags": [
      "第7章",
      "zc.buildout哲学"
    ]
  },
  {
    "id": "pya-zc-buildout-2",
    "chapter": "pya-zc-buildout",
    "level": 2,
    "question": "配置结构与命令与recipe机制怎样协作？",
    "answer": "buildout节定义parts、下载源和版本，其他节配置recipe；配置继承会增强复用也会隐藏来源，验收要输出最终解析配置。 recipe把配置转换为文件、脚本或服务定义，必须声明输入并实现幂等更新与卸载；任意网络下载会破坏可复现和供应链审计。",
    "tags": [
      "第7章",
      "机制"
    ]
  },
  {
    "id": "pya-zc-buildout-3",
    "chapter": "pya-zc-buildout",
    "level": 3,
    "question": "如何验证Atomisator环境的失败边界？",
    "answer": "案例把应用包、数据库和入口脚本装配成一套环境；现代迁移可用锁定依赖、容器或部署清单重建，但仍需保持组件边界。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第7章",
      "实验"
    ]
  },
  {
    "id": "pya-zc-buildout-4",
    "chapter": "pya-zc-buildout",
    "level": 4,
    "question": "怎样用发布与分发完成现代迁移？",
    "answer": "发布配置把开发依赖与生产依赖分开，并从版本化输入构建；秘密不进入配置模板，制品摘要和回滚版本必须可查。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第7章",
      "迁移"
    ]
  },
  {
    "id": "pya-managing-code-1",
    "chapter": "pya-managing-code",
    "level": 1,
    "question": "第8章中，版本控制模型解决什么问题？",
    "answer": "集中式与分布式系统对历史、离线提交和协作拓扑取舍不同；无论工具如何，提交应原子、可评审，并把生成制品与秘密排除在源码历史之外。",
    "tags": [
      "第8章",
      "版本控制模型"
    ]
  },
  {
    "id": "pya-managing-code-2",
    "chapter": "pya-managing-code",
    "level": 2,
    "question": "Mercurial工作流与持续集成原则怎样协作？",
    "answer": "原书用Mercurial、hgwebdir和Apache展示托管、授权与客户端协作；迁移到Git平台时仍要保留受保护分支、身份、审查和最小写权限。 每次变更在干净环境自动构建、测试并报告，失败阻断合并；CI不能依赖开发机缓存，也不能让外部服务偶发失败被当作成功。",
    "tags": [
      "第8章",
      "机制"
    ]
  },
  {
    "id": "pya-managing-code-3",
    "chapter": "pya-managing-code",
    "level": 3,
    "question": "如何验证Buildbot流水线的失败边界？",
    "answer": "Buildbot把代码变更触发到worker步骤和结果；现代CI语法可以不同，但触发、矩阵、超时、日志、制品和取消语义必须明确。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第8章",
      "实验"
    ]
  },
  {
    "id": "pya-managing-code-4",
    "chapter": "pya-managing-code",
    "level": 4,
    "question": "怎样用代码管理证据完成现代迁移？",
    "answer": "一次合并应能追到提交、审查、测试运行、环境和制品摘要；只保留绿色徽章无法重放失败或证明发布内容。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第8章",
      "迁移"
    ]
  },
  {
    "id": "pya-managing-life-cycle-1",
    "chapter": "pya-managing-life-cycle",
    "level": 1,
    "question": "第9章中，生命周期模型解决什么问题？",
    "answer": "瀑布、螺旋和迭代模型对反馈时机与风险暴露方式不同；选择应由不确定性、法规和交付成本决定，而不是把某种流程当成仪式。",
    "tags": [
      "第9章",
      "生命周期模型"
    ]
  },
  {
    "id": "pya-managing-life-cycle-2",
    "chapter": "pya-managing-life-cycle",
    "level": 2,
    "question": "迭代式计划与开发与全局调试与发布怎样协作？",
    "answer": "把目标拆成可验收增量，每次迭代包含设计、实现、测试和反馈；任务完成定义必须包含文档、迁移与运行证据。 集成阶段检查跨模块契约、性能和部署环境，发布使用冻结输入与候选制品；在发布当天首次组合系统会把未知风险集中爆发。",
    "tags": [
      "第9章",
      "机制"
    ]
  },
  {
    "id": "pya-managing-life-cycle-3",
    "chapter": "pya-managing-life-cycle",
    "level": 3,
    "question": "如何验证Trac跟踪系统的失败边界？",
    "answer": "原书用Trac串联ticket、里程碑、版本库和Wiki；现代平台可以替代工具，但需求、变更、决策和证据的双向链接不可丢失。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第9章",
      "实验"
    ]
  },
  {
    "id": "pya-managing-life-cycle-4",
    "chapter": "pya-managing-life-cycle",
    "level": 4,
    "question": "怎样用关闭与复盘完成现代迁移？",
    "answer": "迭代结束要关闭或重排未完成项、记录偏差和行动负责人；复盘关注系统条件而非个人归罪，并验证改进是否在下一迭代执行。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第9章",
      "迁移"
    ]
  },
  {
    "id": "pya-documenting-project-1",
    "chapter": "pya-documenting-project",
    "level": 1,
    "question": "第10章中，技术写作七原则解决什么问题？",
    "answer": "先写结构再润色，面向明确读者，使用简单风格，限制主题范围，示例真实且最小，信息轻量但充分，并用模板保持一致。",
    "tags": [
      "第10章",
      "技术写作七原则"
    ]
  },
  {
    "id": "pya-documenting-project-2",
    "chapter": "pya-documenting-project",
    "level": 2,
    "question": "reStructuredText与Sphinx构建怎样协作？",
    "answer": "原书用reStructuredText表达标题、列表、内联标记、代码块和链接；标记语法服务于语义结构，不能用视觉缩进替代可解析层级。 Sphinx把源文档、自动API和交叉引用构建成可发布站点；构建必须在CI中把断链和严重警告作为失败。",
    "tags": [
      "第10章",
      "机制"
    ]
  },
  {
    "id": "pya-documenting-project-3",
    "chapter": "pya-documenting-project",
    "level": 3,
    "question": "如何验证文档组合与受众的失败边界？",
    "answer": "设计、使用和运维文档回答不同问题，生产者与消费者需要不同入口；一个超长README不能替代可导航的信息架构。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第10章",
      "实验"
    ]
  },
  {
    "id": "pya-documenting-project-4",
    "chapter": "pya-documenting-project",
    "level": 4,
    "question": "怎样用文档验收完成现代迁移？",
    "answer": "代码示例应可执行，版本与配置要明确，发布时文档和制品同版本；过期页面应删除或标明适用范围，而不是长期保留冲突答案。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第10章",
      "迁移"
    ]
  },
  {
    "id": "pya-test-driven-development-1",
    "chapter": "pya-test-driven-development",
    "level": 1,
    "question": "第11章中，TDD原则解决什么问题？",
    "answer": "先写会失败的行为示例，再写最小实现并重构；测试驱动的是接口与反馈，不是追求每行实现都先有一个脆弱断言。",
    "tags": [
      "第11章",
      "TDD原则"
    ]
  },
  {
    "id": "pya-test-driven-development-2",
    "chapter": "pya-test-driven-development",
    "level": 2,
    "question": "验收测试与单元测试与标准测试工具怎样协作？",
    "answer": "验收测试从用户边界证明能力，单元测试快速验证局部规则；两者之间还需要集成测试覆盖数据库、文件与网络适配。 unittest、doctest和测试发现提供标准反馈环；原书的nose与早期py.test展示替代入口，现代迁移时要统一fixture、参数化和失败报告。",
    "tags": [
      "第11章",
      "机制"
    ]
  },
  {
    "id": "pya-test-driven-development-3",
    "chapter": "pya-test-driven-development",
    "level": 3,
    "question": "如何验证Fake与Mock的失败边界？",
    "answer": "fake提供简化但可工作的实现，mock验证特定交互；优先断言可见结果，只有协议本身重要时才锁定调用次数和顺序。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第11章",
      "实验"
    ]
  },
  {
    "id": "pya-test-driven-development-4",
    "chapter": "pya-test-driven-development",
    "level": 4,
    "question": "怎样用文档驱动开发完成现代迁移？",
    "answer": "故事和doctest把可读示例变成执行证据，适合稳定的小接口；复杂环境应移到测试模块，避免文档被大量搭建代码淹没。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第11章",
      "迁移"
    ]
  },
  {
    "id": "pya-optimization-profiling-1",
    "chapter": "pya-optimization-profiling",
    "level": 1,
    "question": "第12章中，优化三原则解决什么问题？",
    "answer": "先让程序正确，从用户可感知目标出发，并保持代码可读可维护；没有性能预算和基线的优化只是猜测。",
    "tags": [
      "第12章",
      "优化三原则"
    ]
  },
  {
    "id": "pya-optimization-profiling-2",
    "chapter": "pya-optimization-profiling",
    "level": 2,
    "question": "优化策略与CPU剖析怎样协作？",
    "answer": "先确认瓶颈是否在本服务，再考虑硬件、算法或缓存，最后写速度回归测试；局部变快若让端到端更慢就不算优化。 宏观剖析定位高耗时路径，微基准隔离小函数；采样与插桩有不同扰动，报告要包含输入、调用次数和累计时间。",
    "tags": [
      "第12章",
      "机制"
    ]
  },
  {
    "id": "pya-optimization-profiling-3",
    "chapter": "pya-optimization-profiling",
    "level": 3,
    "question": "如何验证内存剖析的失败边界？",
    "answer": "理解对象分配、引用生命周期和峰值驻留后再定位泄漏；单看最终内存会漏掉处理中间峰值，优化也要防止复用可变对象造成错误。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第12章",
      "实验"
    ]
  },
  {
    "id": "pya-optimization-profiling-4",
    "chapter": "pya-optimization-profiling",
    "level": 4,
    "question": "怎样用网络剖析完成现代迁移？",
    "answer": "网络性能分解为DNS、连接、握手、服务处理和传输，并同时观察请求数与字节量；平均时延会掩盖尾部与重试放大。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第12章",
      "迁移"
    ]
  },
  {
    "id": "pya-optimization-solutions-1",
    "chapter": "pya-optimization-solutions",
    "level": 1,
    "question": "第13章中，复杂度与简化解决什么问题？",
    "answer": "圈复杂度提示分支测试成本，Big-O描述规模增长；先删掉重复工作和不必要状态，再决定是否换算法，常数优化不能挽救错误增长阶。",
    "tags": [
      "第13章",
      "复杂度与简化"
    ]
  },
  {
    "id": "pya-optimization-solutions-2",
    "chapter": "pya-optimization-solutions",
    "level": 2,
    "question": "集合与数据结构与减少外部调用怎样协作？",
    "answer": "成员查询从列表换到集合可改变复杂度，collections提供更贴合语义的容器；建立结构本身也有时间和内存成本，应按查询次数衡量。 批处理、连接复用和请求合并可降低往返，但会增加延迟、内存与部分失败复杂度；批大小和重试必须有上限。",
    "tags": [
      "第13章",
      "机制"
    ]
  },
  {
    "id": "pya-optimization-solutions-3",
    "chapter": "pya-optimization-solutions",
    "level": 3,
    "question": "如何验证线程与多进程的失败边界？",
    "answer": "线程适合等待型任务，多进程隔离解释器并行CPU工作；传输、序列化、启动、取消和汇总成本决定实际收益。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第13章",
      "实验"
    ]
  },
  {
    "id": "pya-optimization-solutions-4",
    "chapter": "pya-optimization-solutions",
    "level": 4,
    "question": "怎样用缓存策略完成现代迁移？",
    "answer": "确定性、非确定性和主动缓存需要不同失效规则；键必须包含影响结果的输入，缓存命中率、陈旧窗口和击穿保护都要测量。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第13章",
      "迁移"
    ]
  },
  {
    "id": "pya-useful-design-patterns-1",
    "chapter": "pya-useful-design-patterns",
    "level": 1,
    "question": "第14章中，创建型模式与Singleton解决什么问题？",
    "answer": "原书比较Singleton和Borg共享状态；Python模块常已提供单实例命名空间，显式依赖注入通常比隐藏全局对象更易测试。",
    "tags": [
      "第14章",
      "创建型模式与Singleton"
    ]
  },
  {
    "id": "pya-useful-design-patterns-2",
    "chapter": "pya-useful-design-patterns",
    "level": 2,
    "question": "Adapter与接口与Proxy与Facade怎样协作？",
    "answer": "Adapter把既有对象转换为调用者期望的协议，接口定义最小能力；动态类型不取消契约，只是可通过鸭子类型或Protocol表达。 Proxy在同一接口前控制访问、缓存或远程调用，Facade为复杂子系统提供较小入口；两者都不应改变调用者无法察觉的错误语义。",
    "tags": [
      "第14章",
      "机制"
    ]
  },
  {
    "id": "pya-useful-design-patterns-3",
    "chapter": "pya-useful-design-patterns",
    "level": 3,
    "question": "如何验证Observer与Visitor的失败边界？",
    "answer": "Observer把事件生产者与订阅者解耦，但需要退订、顺序和失败隔离；Visitor集中不同操作，代价是新增元素类型时要更新访问者。 加入空输入、依赖失败、重复执行和干净环境重建。",
    "tags": [
      "第14章",
      "实验"
    ]
  },
  {
    "id": "pya-useful-design-patterns-4",
    "chapter": "pya-useful-design-patterns",
    "level": 4,
    "question": "怎样用Template模式完成现代迁移？",
    "answer": "模板方法固定算法骨架并让步骤可替换；Python也可用高阶函数和组合避免深继承，选择依据是扩展轴与状态共享。 保留架构不变量，按当前维护接口重写并保存测试与制品证据。",
    "tags": [
      "第14章",
      "迁移"
    ]
  }
];
