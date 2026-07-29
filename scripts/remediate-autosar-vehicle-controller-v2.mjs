#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import prettier from "prettier";

const ROOT = process.cwd();
const BOOK = "autosar-vehicle-controller";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/autosar-vehicle-controller-v2-profiles.json",
);

const SOURCES = {
  bookToc: "https://www.mycnbook.com/product/1201788824",
  standards: "https://www.autosar.org/standards",
  classic: "https://www.autosar.org/standards/classic-platform/",
  classicRelease:
    "https://www.autosar.org/fileadmin/standards/R25-11/CP/AUTOSAR_CP_TR_ReleaseOverview.pdf",
  layered:
    "https://www.autosar.org/fileadmin/standards/R24-11/CP/AUTOSAR_CP_EXP_LayeredSoftwareArchitecture.pdf",
  rte: "https://www.autosar.org/fileadmin/standards/R25-11/CP/AUTOSAR_CP_RS_RTE.pdf",
  vfb: "https://www.autosar.org/fileadmin/standards/R25-11/CP/AUTOSAR_CP_TR_VFB.pdf",
  interfaces:
    "https://www.autosar.org/standards/classic-platform/application-interfaces",
  release:
    "https://www.autosar.org/news-events/detail/release-r25-11-is-now-available",
  releaseEvent: "https://www.autosar.org/news-events/release-event",
  etas: "https://www.etas.com/ww/en/products-services/vehicle-software-platform/autosar-classic-profile-rta-car/rta-car-details-integration/",
  mathworks:
    "https://www.mathworks.com/help/autosar/software-component-modeling.html",
  mathworksCreate:
    "https://www.mathworks.com/help/autosar/ug/create-an-autosar-software-component-in-simulink.html",
  mathworksComposition:
    "https://www.mathworks.com/help/autosar/ug/autosar-software-components-and-compositions.html",
  nxpMcal:
    "https://www.nxp.com/support/developer-resources/run-time-software/professional-services-software-technology/autosar-mcal-for-i.mx6%3AAUTOSAR",
  dio: "https://www.autosar.org/fileadmin/standards/R25-11/CP/AUTOSAR_CP_SWS_DIODriver.pdf",
  iso26262: "https://www.iso.org/publication/PUB200262.html",
  safety:
    "https://www.autosar.org/fileadmin/standards/R25-11/CP/AUTOSAR_CP_EXP_FunctionalSafetyMeasures.pdf",
  e2eRequirements:
    "https://www.autosar.org/fileadmin/standards/R25-11/FO/AUTOSAR_FO_RS_E2E.pdf",
  e2eProtocol:
    "https://www.autosar.org/fileadmin/standards/R25-11/FO/AUTOSAR_FO_PRS_E2EProtocol.pdf",
  adaptive: "https://www.autosar.org/standards/adaptive-platform/",
  adaptiveArchitecture:
    "https://www.autosar.org/fileadmin/standards/R25-11/AP/AUTOSAR_AP_EXP_SWArchitecture.pdf",
};

const FACT_SOURCES = [
  {
    id: "book-toc",
    title: "《AUTOSAR规范与车用控制器软件开发》2018 年版目录",
    url: SOURCES.bookToc,
    use: "只核对原书版次、十章与参考文献的目录边界，不把零售目录当作可访问的原书正文",
  },
  {
    id: "autosar-standards",
    title: "AUTOSAR Standards",
    url: SOURCES.standards,
    use: "区分 Classic、Adaptive 与 Foundation 的现行职责，不把 2018 年的工具步骤误写为跨平台通则",
  },
  {
    id: "autosar-classic",
    title: "AUTOSAR Classic Platform",
    url: SOURCES.classic,
    use: "核对应用层、RTE、BSW、VFB、方法论和 Classic Platform 当前发布版本",
  },
  {
    id: "classic-release",
    title: "AUTOSAR Classic Platform R25-11 Release Overview",
    url: SOURCES.classicRelease,
    use: "给当前 Classic 规范主张绑定 R25-11 版本，避免无版本地引用会继续变化的标准",
  },
  {
    id: "layered-architecture",
    title: "AUTOSAR Classic Layered Software Architecture",
    url: SOURCES.layered,
    use: "核对应用、RTE、服务、ECU 抽象、MCAL 与复杂驱动的责任分层",
  },
  {
    id: "rte",
    title: "AUTOSAR R25-11 RTE Requirements",
    url: SOURCES.rte,
    use: "核对 RTE 的接口、生成阶段和应用软件到基础软件之间的合同边界",
  },
  {
    id: "vfb",
    title: "AUTOSAR R25-11 Virtual Functional Bus",
    url: SOURCES.vfb,
    use: "核对部署无关的软件组件通信与系统映射语义",
  },
  {
    id: "application-interfaces",
    title: "AUTOSAR Classic Application Interfaces",
    url: SOURCES.interfaces,
    use: "核对标准化应用接口的范围及其与项目自定义合同的区别",
  },
  {
    id: "r25-11-release",
    title: "AUTOSAR Release R25-11",
    url: SOURCES.release,
    use: "核对 R25-11 于 2025 年 12 月发布这一当前版本事实",
  },
  {
    id: "release-event",
    title: "AUTOSAR Release Event",
    url: SOURCES.releaseEvent,
    use: "核对 R26-11 仍是 2026 年 12 月计划发布版本，不能提前当作已发布规范",
  },
  {
    id: "etas-rta-car",
    title: "ETAS RTA-CAR Integration",
    url: SOURCES.etas,
    use: "核对 ISOLAR-A、ISOLAR-B、RTA-RTE、RTA-BSW 与 RTA-OS 的当前产品职责，不复刻旧版菜单",
  },
  {
    id: "mathworks-autosar",
    title: "MathWorks AUTOSAR Software Component Modeling",
    url: SOURCES.mathworks,
    use: "核对 Simulink 中的 AUTOSAR 建模、映射、导入与代码生成边界",
  },
  {
    id: "mathworks-create",
    title: "MathWorks Create an AUTOSAR Software Component",
    url: SOURCES.mathworksCreate,
    use: "核对从组件模型到 AUTOSAR 映射、代码与 ARXML 工件的工作流",
  },
  {
    id: "mathworks-composition",
    title: "MathWorks AUTOSAR Components and Compositions",
    url: SOURCES.mathworksComposition,
    use: "核对组件、端口连接与组合层级在模型工作流中的关系",
  },
  {
    id: "nxp-mcal",
    title: "NXP AUTOSAR MCAL",
    url: SOURCES.nxpMcal,
    use: "核对 MCU、GPT、Port、DIO、ADC、PWM、ICU、CAN 等 MCAL 驱动的硬件职责",
  },
  {
    id: "dio-driver",
    title: "AUTOSAR R25-11 DIO Driver",
    url: SOURCES.dio,
    use: "以一个当前 MCAL 模块规格核对配置、通道访问、错误与生成接口的证据边界",
  },
  {
    id: "iso-26262",
    title: "ISO 26262:2018 Road vehicles — Functional safety",
    url: SOURCES.iso26262,
    use: "核对功能安全标准的生命周期范围；明确采用 AUTOSAR 不自动等于 ISO 26262 合规或认证",
  },
  {
    id: "functional-safety",
    title: "AUTOSAR R25-11 Functional Safety Measures",
    url: SOURCES.safety,
    use: "核对内存分区、保护、程序流监控等机制及限制，避免把机制名称写成安全论证",
  },
  {
    id: "e2e-requirements",
    title: "AUTOSAR R25-11 End-to-End Protection Requirements",
    url: SOURCES.e2eRequirements,
    use: "核对端到端通信保护的故障模型、责任边界和验证要求",
  },
  {
    id: "e2e-protocol",
    title: "AUTOSAR R25-11 E2E Protocol",
    url: SOURCES.e2eProtocol,
    use: "核对计数器、数据标识、CRC 与状态处理的协议证据",
  },
  {
    id: "autosar-adaptive",
    title: "AUTOSAR Adaptive Platform",
    url: SOURCES.adaptive,
    use: "核对 ARA、功能集群、服务发现与动态绑定，不把 Adaptive 当作 Classic 的简单升级版",
  },
  {
    id: "adaptive-architecture",
    title: "AUTOSAR R25-11 Adaptive Platform Software Architecture",
    url: SOURCES.adaptiveArchitecture,
    use: "核对 Adaptive 应用、功能集群、执行与服务通信的当前架构",
  },
];

function page(value) {
  return value;
}

function pipeline(...items) {
  return items.map(([label, artifact]) => ({ label, artifact }));
}

function scenarios(...items) {
  return items.map(([label, input, expected]) => ({ label, input, expected }));
}

const PAGES = [
  page({
    role: "learning-map",
    path: "00-map/avc2-official-learning-map",
    concepts: ["需求闭环", "SWC 合同", "系统映射", "ECU 实现", "验证与发布"],
    decision:
      "把十章内容组织成需求、组件、系统、ECU、证据五个连续工件域，并在每次工具转换处保留可复核输入输出",
    invariant: "任一生成物都能追溯到上一层已批准工件、固定规范版本和责任所有者",
    fault:
      "跳过系统映射，直接把软件组件端口手工接到 ECU 实现并声称全书链路闭合",
    evidence:
      "需求基线、ARXML 版本、映射报告、生成日志、二进制标识、测试轨迹和发布签核",
    pipeline: pipeline(
      ["需求", "A/B 车灯行为、时序与故障反应"],
      ["SWC", "端口、接口、内部行为与 runnable"],
      ["系统", "Composition、通信与 ECU 映射"],
      ["ECU", "RTE、BSW、OS、MCAL 与可执行文件"],
      ["证据", "重放、故障注入、版本与发布清单"],
    ),
    scenarios: scenarios(
      [
        "正向学习路线",
        "从车灯需求开始，逐章冻结工件后再进入下一层",
        "十章和参考文献均落到可追溯工件，最终可从需求重放到硬件输出",
      ],
      [
        "已有工具经验",
        "保留需求与版本门禁，跳过界面熟悉但不跳过工件验证",
        "学习者可压缩操作训练，却仍提交系统映射、生成和验证证据",
      ],
    ),
    sourceIds: [
      "book-toc",
      "autosar-standards",
      "autosar-classic",
      "r25-11-release",
      "release-event",
    ],
  }),
  page({
    unitId: "avc2-01-automotive-electronics",
    path: "01-01-automotive-electronics/avc2-01-automotive-electronics",
    decision:
      "把汽车电子从器件清单还原成传感输入、控制意图、ECU 软件、驱动输出和物理反馈的闭环",
    invariant:
      "控制输出只能由版本化需求、有效输入和显式降级状态共同决定，反馈必须能关联到同一次控制周期",
    fault: "传感器输入失效后继续沿用旧值驱动车灯，却没有质量位、超时或降级记录",
    evidence:
      "需求编号、输入有效性、控制周期、状态迁移、驱动命令、反馈值与诊断事件",
    pipeline: pipeline(
      ["感知输入", "开关、总线信号与传感器质量"],
      ["控制意图", "A/B 车灯需求、优先级与降级"],
      ["ECU 软件", "应用算法、状态机与接口合同"],
      ["驱动输出", "I/O 抽象、MCAL 命令与执行器"],
      ["物理反馈", "灯态、电气测量与诊断记录"],
    ),
    scenarios: scenarios(
      [
        "正常点灯",
        "有效开关请求在规定周期进入 ECU，硬件条件满足",
        "车灯按需求点亮，命令、反馈和时间戳属于同一追踪链",
      ],
      [
        "输入超时",
        "车灯请求超过允许的新鲜度窗口且没有新样本",
        "控制器进入定义的安全或降级状态并留下诊断证据",
      ],
    ),
    sourceIds: [
      "book-toc",
      "autosar-standards",
      "autosar-classic",
      "classic-release",
    ],
  }),
  page({
    unitId: "avc2-02-autosar-foundations",
    path: "02-02-autosar-foundations/avc2-02-autosar-foundations",
    decision:
      "用软件组件合同、VFB、部署映射、RTE 和 BSW 五层关系解释 Classic Platform，而不是背诵缩写",
    invariant:
      "应用组件不依赖具体 ECU 通信实现，部署变化由映射、RTE 与 BSW 配置吸收且端口语义保持一致",
    fault:
      "在 SWC 内直接读写某个 CAN 控制器寄存器，使 VFB 合同与部署独立性同时失效",
    evidence:
      "组件类型、端口接口、内部行为、VFB 连接、系统映射、RTE API 与 BSW 配置引用",
    pipeline: pipeline(
      ["SWC 合同", "数据类型、端口、接口与内部行为"],
      ["VFB", "部署无关的逻辑通信关系"],
      ["系统映射", "实例、通信与 ECU 分配"],
      ["RTE", "组件到组件及基础软件的生成接口"],
      ["BSW", "服务、ECU 抽象、MCAL 与复杂驱动"],
    ),
    scenarios: scenarios(
      [
        "部署迁移",
        "保持 SWC 端口合同不变，把接收组件迁到另一 ECU",
        "系统通信和 RTE/BSW 配置变化，应用行为合同不变",
      ],
      [
        "越层访问",
        "让应用 runnable 直接调用硬件寄存器地址",
        "架构门禁拒绝该依赖，并要求经标准服务或明确复杂驱动边界",
      ],
    ),
    sourceIds: [
      "book-toc",
      "autosar-classic",
      "layered-architecture",
      "vfb",
      "rte",
      "application-interfaces",
    ],
  }),
  page({
    unitId: "avc2-03-example-solutions",
    path: "03-03-example-solutions/avc2-03-example-solutions",
    decision:
      "把 A/B 型车灯示例写成需求变体、组合结构、ECU 映射、生成栈和输出轨迹，而不是只展示工具截图",
    invariant:
      "A 型与 B 型差异必须在需求或变体配置中显式出现，共享组件合同不得被隐式复制成两套不一致实现",
    fault: "为 B 型车灯临时改写生成代码，导致模型、ARXML 与 ECU 二进制无法追溯",
    evidence:
      "变体需求、Composition 连接、ECU 分配、ARXML 差异、生成哈希与两型输出轨迹",
    pipeline: pipeline(
      ["需求变体", "A/B 型车灯输入、输出与时序差异"],
      ["组合设计", "共享 SWC、变体点与端口连接"],
      ["ECU 映射", "实例、通信信号与控制器分配"],
      ["生成栈", "RTE、BSW、OS、MCAL 配置与代码"],
      ["输出轨迹", "两型灯态、诊断与测量对比"],
    ),
    scenarios: scenarios(
      [
        "A 型基线",
        "选择 A 型需求与对应配置，从冻结输入生成并运行",
        "灯态轨迹符合 A 型预期且每个输出可回溯到共享合同",
      ],
      [
        "B 型变体",
        "只切换批准的 B 型变体工件，禁止手改生成代码",
        "差异限定在声明的变体点，公共行为和证据链保持一致",
      ],
    ),
    sourceIds: [
      "book-toc",
      "autosar-classic",
      "etas-rta-car",
      "classic-release",
    ],
  }),
  page({
    unitId: "avc2-04-swc-development",
    path: "04-04-swc-development/avc2-04-swc-development",
    decision:
      "把 Simulink 行为、AUTOSAR 类型接口、runnable 事件、映射和 C/ARXML 生成组织成可往返核对的软件组件流水线",
    invariant:
      "模型、AUTOSAR 映射、生成代码和 ARXML 对同一端口、数据类型、runnable 周期与初始化值给出一致定义",
    fault:
      "修改生成后的 C 文件修复行为，却不回写模型或映射，下一次生成覆盖修复",
    evidence:
      "模型版本、求解器设置、端口映射、runnable 事件、生成报告、C 代码与 ARXML 差异",
    pipeline: pipeline(
      ["行为模型", "Simulink 逻辑、状态与测试向量"],
      ["AUTOSAR 合同", "类型、接口、端口与服务调用"],
      ["执行语义", "runnable、事件、周期与初始化"],
      ["模型映射", "Simulink 元素到 AUTOSAR 属性"],
      ["生成工件", "C 源码、头文件、ARXML 与报告"],
    ),
    scenarios: scenarios(
      [
        "自下而上创建",
        "从新模型定义算法并完成 AUTOSAR 映射和测试",
        "生成代码与 ARXML 通过接口和行为一致性核对",
      ],
      [
        "自上而下导入",
        "导入既有组件 ARXML 后补充内部行为并往返导出",
        "外部合同不被悄然改写，差异报告只包含批准变更",
      ],
    ),
    sourceIds: [
      "book-toc",
      "mathworks-autosar",
      "mathworks-create",
      "mathworks-composition",
      "rte",
    ],
  }),
  page({
    unitId: "avc2-05-system-design-configuration",
    path: "05-05-system-design-configuration/avc2-05-system-design-configuration",
    decision:
      "从共享数据类型和端口接口建立 SWC 与 Composition，再完成系统通信、ECU 映射和 ECU Extract",
    invariant:
      "系统级每条连接的两端类型兼容、实例唯一、通信映射闭合，ECU Extract 只包含目标 ECU 所需且可追溯的系统信息",
    fault:
      "两个团队分别定义同名但不兼容的数据类型，直到 RTE 生成阶段才发现端口无法连接",
    evidence:
      "类型字典、端口接口、SWC 原型、Composition 连接、系统信号、ECU 映射和 ECU Extract 差异",
    pipeline: pipeline(
      ["共享类型", "应用与实现数据类型、约束和单位"],
      ["端口与 SWC", "接口、端口原型、组件类型与模板"],
      ["Composition", "组件原型、连接器与层级边界"],
      ["系统映射", "通信、实例与 ECU 分配"],
      ["ECU Extract", "目标 ECU 的系统配置输入"],
    ),
    scenarios: scenarios(
      [
        "完整系统映射",
        "导入批准类型与组件，建立车灯 Composition 并映射目标 ECU",
        "连接检查通过且 ECU Extract 可独立供 ECU 配置使用",
      ],
      [
        "类型冲突",
        "发送端与接收端使用不同范围或单位的同名数据类型",
        "系统门禁在生成前报告不兼容引用并阻止 Extract 发布",
      ],
    ),
    sourceIds: ["book-toc", "etas-rta-car", "autosar-classic", "vfb", "rte"],
  }),
  page({
    unitId: "avc2-06-rte-bsw",
    path: "06-06-rte-bsw/avc2-06-rte-bsw",
    decision:
      "从 ECU Extract 驱动 CAN、EcuM、BswM、RTE 与 OS 配置，把合同阶段和生成阶段分开验收",
    invariant:
      "通信周期、模式、runnable 事件、任务映射和生成 API 对同一系统工件保持引用闭合，启动顺序不读未初始化服务",
    fault:
      "先生成 RTE，再修改端口与任务映射却继续链接旧 RTE 源码，得到表面可编译的混合版本",
    evidence:
      "ECU Extract 哈希、BSW 配置引用、RTE contract 头文件、任务事件表、生成日志与链接映射",
    pipeline: pipeline(
      ["ECU Extract", "目标 ECU 的组件、通信与资源输入"],
      ["BSW 配置", "CAN、EcuM、BswM 和服务模块"],
      ["RTE Contract", "应用可编译的接口合同"],
      ["RTE Generation", "完成映射后的 RTE 实现代码"],
      ["OS 构建", "任务、事件、资源、优先级与可执行文件"],
    ),
    scenarios: scenarios(
      [
        "一致生成",
        "冻结 ECU Extract 后依次配置 BSW、生成 contract、映射 OS 再生成 RTE",
        "API、任务和通信引用闭合，冷启动轨迹符合模式设计",
      ],
      [
        "混合版本",
        "在 contract 后修改端口映射但复用旧生成目录",
        "版本门禁识别输入哈希变化并要求清理后重新生成",
      ],
    ),
    sourceIds: [
      "book-toc",
      "etas-rta-car",
      "autosar-classic",
      "rte",
      "classic-release",
    ],
  }),
  page({
    unitId: "avc2-07-mcal",
    path: "07-07-mcal/avc2-07-mcal",
    decision:
      "把时钟、引脚、定时器、I/O、采样、波形、捕获和 CAN 配置约束到同一硬件资源图，再生成初始化代码并实测",
    invariant:
      "每个外设时钟、引脚复用、中断与 DMA 资源只有一个批准所有者，配置值可由芯片手册和板级测量复算",
    fault:
      "PWM 与 DIO 同时占用同一引脚复用，两个模块各自生成成功但集成后灯态不确定",
    evidence:
      "芯片变体、时钟树、引脚复用表、中断/DMA 分配、MCAL 配置、生成代码与示波器或总线测量",
    pipeline: pipeline(
      ["硬件基线", "芯片变体、时钟、封装与板级连接"],
      ["资源配置", "Mcu、Port、Base 与共享资源所有权"],
      ["驱动模块", "Gpt、Dio、Adc、Pwm、Icu、Can"],
      ["生成初始化", "配置校验、初始化顺序与驱动代码"],
      ["硬件测量", "引脚电平、周期、捕获值与 CAN 帧"],
    ),
    scenarios: scenarios(
      [
        "车灯 PWM",
        "配置时钟、Port 与 Pwm 通道，以固定占空比驱动车灯",
        "生成值可复算且测得频率、占空比和极性符合配置",
      ],
      [
        "引脚冲突",
        "让同一物理引脚同时分配给 Dio 输出与 Pwm 通道",
        "资源门禁在生成或集成前拒绝双重所有权",
      ],
    ),
    sourceIds: [
      "book-toc",
      "nxp-mcal",
      "dio-driver",
      "layered-architecture",
      "classic-release",
    ],
  }),
  page({
    unitId: "avc2-08-integration-debugging",
    path: "08-08-integration-debugging/avc2-08-integration-debugging",
    decision:
      "把各层生成源文件、编译链接、下载、A/B 型车灯调试和证据归档组成可重复集成闭环",
    invariant:
      "下载到控制器的二进制、map 文件、配置输入和源码提交属于同一次构建，调试修改必须回到受控源工件",
    fault:
      "调试器内临时改内存让车灯正常后直接截图结项，却没有把修正写回模型、配置或源码",
    evidence:
      "干净构建日志、编译选项、链接 map、二进制哈希、下载记录、断点轨迹、A/B 测量与修复提交",
    pipeline: pipeline(
      ["集成输入", "应用、RTE、BSW、OS、MCAL 生成源"],
      ["编译链接", "工具链、选项、内存布局与 map 文件"],
      ["下载启动", "目标连接、镜像哈希、复位与启动轨迹"],
      ["车灯调试", "A/B 型断点、信号、端口和硬件现象"],
      ["证据归档", "故障、修复、重放与发布制品"],
    ),
    scenarios: scenarios(
      [
        "A 型干净构建",
        "清空生成与构建目录，以冻结输入重新生成、编译、下载",
        "目标二进制与记录哈希一致，A 型车灯轨迹可重放",
      ],
      [
        "B 型无输出",
        "B 型需求有效但目标引脚没有预期波形",
        "沿 runnable、RTE、BSW、MCAL、引脚顺序找到首个分岔并回写修正",
      ],
    ),
    sourceIds: ["book-toc", "etas-rta-car", "autosar-classic", "nxp-mcal"],
  }),
  page({
    unitId: "avc2-09-functional-safety",
    path: "09-09-functional-safety/avc2-09-functional-safety",
    decision:
      "把安全要求映射到分区与 MPU、程序流监控、E2E 和故障证据，同时明确 AUTOSAR 机制不等于 ISO 26262 合规结论",
    invariant:
      "每个安全机制都对应明确故障假设、检测覆盖、反应、残余风险和验证证据，不能以模块存在替代安全论证",
    fault:
      "启用内存保护后宣称已满足 FFI，却没有验证共享资源、特权代码、配置错误和故障反应",
    evidence:
      "安全需求、分区映射、MPU 区域、任务与看门狗轨迹、E2E 状态、故障注入、覆盖与残余风险",
    pipeline: pipeline(
      ["安全要求", "危害、故障假设、ASIL 与技术安全需求"],
      ["隔离机制", "分区、OS 应用、MPU 与访问控制"],
      ["流监控", "alive、deadline、logical supervision"],
      ["E2E", "数据 ID、计数器、CRC、新鲜度与状态"],
      ["安全证据", "故障注入、覆盖、反应与残余风险"],
    ),
    scenarios: scenarios(
      [
        "受控分区故障",
        "低完整性任务越界写入受保护区域",
        "保护机制阻止或捕获访问，并按安全概念执行可追踪反应",
      ],
      [
        "通信重复帧",
        "接收端得到 CRC 正确但计数器重复的受保护数据",
        "E2E 状态报告序列异常，应用按定义处理而不是静默采用",
      ],
    ),
    sourceIds: [
      "book-toc",
      "iso-26262",
      "functional-safety",
      "e2e-requirements",
      "e2e-protocol",
    ],
  }),
  page({
    unitId: "avc2-10-outlook",
    path: "10-10-outlook/avc2-10-outlook",
    decision:
      "从威胁模型、密码与安全通信进入 Classic/Adaptive 选型、服务部署和生命周期，并给所有展望绑定当前版本",
    invariant:
      "平台、通信安全与部署方案由实时性、故障运行、硬件、更新和威胁需求驱动，不能按新旧标签替代工程论证",
    fault:
      "把 Adaptive 当作 Classic 的新版本，直接迁移硬实时车灯控制而没有任务时序、服务失效和平台资源分析",
    evidence:
      "威胁模型、密钥与新鲜度策略、SecOC 配置、CP/AP 需求矩阵、服务清单、部署与更新失败轨迹",
    pipeline: pipeline(
      ["威胁模型", "资产、攻击面、信任边界与失效后果"],
      ["安全通信", "密码服务、密钥、新鲜度与 SecOC"],
      ["平台选择", "Classic 硬实时与 Adaptive 高性能需求"],
      ["服务部署", "ARA、功能集群、服务发现与动态绑定"],
      ["生命周期", "版本、更新、回滚、监控与退役"],
    ),
    scenarios: scenarios(
      [
        "Classic 保留",
        "车灯控制要求受限资源上的确定性周期与成熟 BSW 集成",
        "保留 Classic，并把安全通信与更新作为显式扩展需求",
      ],
      [
        "Adaptive 服务",
        "高性能计算节点需要动态发现的更新服务与故障运行能力",
        "基于 Adaptive 功能集群设计服务，同时隔离硬实时控制边界",
      ],
    ),
    sourceIds: [
      "book-toc",
      "autosar-standards",
      "autosar-classic",
      "autosar-adaptive",
      "adaptive-architecture",
      "r25-11-release",
      "release-event",
    ],
  }),
  page({
    unitId: "avc2-references",
    path: "11-references/avc2-references",
    decision:
      "建立书目目录、版本化 AUTOSAR 规范、ISO 标准、工具文档与芯片资料的证据等级，拒绝把不同来源混成一个权威层级",
    invariant:
      "每条可变技术事实都有发布日期或版本、直接来源、适用范围和访问边界，二手目录只承担目录证据",
    fault: "用 2018 年零售目录证明 R25-11 的 RTE、安全或 Adaptive 机制细节",
    evidence:
      "来源 ID、标题、URL、发布日期、适用章节、主张摘录位置、版本差异与访问限制",
    pipeline: pipeline(
      ["书目边界", "2018 中文版元数据与正式目录"],
      ["规范事实", "AUTOSAR R25-11 版本化规范与发布页"],
      ["安全标准", "ISO 26262 生命周期与 AUTOSAR 措施"],
      ["工具硬件", "ETAS、MathWorks、NXP 官方文档"],
      ["主张登记", "事实、范围、版本、引用和复核日期"],
    ),
    scenarios: scenarios(
      [
        "核验 RTE 主张",
        "课程声称 RTE 连接应用组件与基础软件",
        "引用当前 RTE 或 Classic 官方资料，并记录 R25-11 适用边界",
      ],
      [
        "核验原书目录",
        "课程声称原书第 7 章覆盖九类 MCAL 条目",
        "只用 2018 目录核对章节节点，不由此推断当前接口细节",
      ],
    ),
    sourceIds: [
      "book-toc",
      "autosar-standards",
      "classic-release",
      "iso-26262",
      "etas-rta-car",
      "mathworks-autosar",
      "nxp-mcal",
    ],
  }),
  page({
    role: "final-review",
    path: "12-review/avc2-official-final-review",
    concepts: [
      "需求与变体",
      "SWC 与系统",
      "RTE/BSW/OS",
      "MCAL 与集成",
      "安全与生命周期",
    ],
    decision:
      "从 A/B 型车灯需求一路重建 SWC、系统映射、ECU 栈、硬件输出、安全机制和发布证据",
    invariant:
      "最终演示的每个灯态、诊断和安全反应都能双向追溯到批准需求、版本化配置、同一次构建和可重放测试",
    fault:
      "只保留能工作的目标板和演示视频，丢失 ARXML、生成输入、构建哈希与故障轨迹",
    evidence:
      "需求—组件—系统—ECU—硬件追踪矩阵、冻结输入、干净构建、二进制哈希、故障注入和独立复核",
    pipeline: pipeline(
      ["需求与变体", "A/B 型车灯功能、时序、诊断与安全反应"],
      ["SWC 与系统", "合同、Composition、通信与 ECU 映射"],
      ["ECU 实现", "RTE、BSW、OS、MCAL 配置和生成代码"],
      ["目标验证", "编译、下载、灯态测量与故障注入"],
      ["发布证据", "版本、追踪、残余风险、回滚与签核"],
    ),
    scenarios: scenarios(
      [
        "全链干净重建",
        "从冻结需求和 ARXML 清空生成目录，重新生成、构建、下载并重放",
        "A/B 场景与原验收一致，所有输出可双向追溯",
      ],
      [
        "单点故障复核",
        "分别注入输入超时、端口错配、引脚冲突或重复通信帧",
        "门禁在声明层捕获故障，恢复后同输入轨迹回到基线",
      ],
    ),
    sourceIds: [
      "book-toc",
      "autosar-classic",
      "rte",
      "nxp-mcal",
      "functional-safety",
      "autosar-adaptive",
    ],
  }),
];

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

async function writeFormatted(filePath, source) {
  fs.writeFileSync(
    filePath,
    await prettier.format(source, { filepath: filePath }),
  );
}

function conceptLabel(group) {
  return String(
    group.find((value) => /[\u3400-\u9fff]/.test(value)) ?? group[0],
  );
}

function sourceById(id) {
  const source = FACT_SOURCES.find((item) => item.id === id);
  if (!source) throw new Error(`未知事实来源：${id}`);
  return source;
}

function moduleDuty(concept) {
  const duties = [
    ["Mcu模块", "时钟、复位与低功耗硬件基线"],
    ["Gpt模块", "通用定时器通道、周期与回调"],
    ["Port模块", "引脚方向、复用与初始化属性"],
    ["Dio模块", "数字通道、端口和组的离散读写"],
    ["Adc模块", "模拟采样组、触发与结果缓冲"],
    ["Pwm模块", "周期、占空比、极性与通知"],
    ["Icu模块", "边沿捕获、测量模式与时间戳"],
    ["Can模块", "控制器、硬件对象、波特率与帧收发"],
    ["Base与Resource模块", "跨模块共享的芯片资源与排他所有权"],
  ];
  return duties.find(([keyword]) => concept.includes(keyword))?.[1];
}

function conceptMechanism(concept, profile, index) {
  const lower = concept.toLowerCase();
  const stage = profile.pipeline[index % profile.pipeline.length];
  const duty = moduleDuty(concept);
  if (duty) {
    return `“${concept}”承担${duty}。它必须从${profile.pipeline[0].artifact}取得硬件前提，把通道、时钟、引脚和中断引用写入可审查配置，并以${profile.evidence}核对生成值；模块配置成功不代表与其他驱动不存在资源冲突。`;
  }
  if (/历史|由来|发展|现状|展望|缘起|介绍|小结/.test(concept)) {
    return `“${concept}”首先是版本与范围节点。阅读它时应把原书 2018 年的工具链实践、当前 R25-11 已发布规范和 R26-11 计划版本分开记录，再判断“${profile.decision}”中的哪些责任稳定、哪些界面会随版本变化。`;
  }
  if (/分层|架构|基本构成|基础理论|基本概念/.test(concept)) {
    return `“${concept}”用于划定责任而不是画装饰框图。本页把它放在“${stage.label}”阶段，要求为${stage.artifact}标出输入、输出、所有者和禁止越层访问，并用“${profile.invariant}”检查架构是否真的吸收部署与硬件变化。`;
  }
  if (/数据类型|端口|接口|连接|composition|组件/.test(lower)) {
    return `“${concept}”属于可生成合同：数据语义、方向、初始值、更新方式、错误与调用关系都要在“${stage.label}”工件中显式化。验收不只看名称相同，还要用${profile.evidence}证明提供端与需要端的类型和生命周期兼容。`;
  }
  if (/内部行为|runnable|事件|操作系统|rta-os|os工程|os配置/.test(lower)) {
    return `“${concept}”决定行为何时执行以及由谁调度。应冻结 runnable 或任务的触发事件、周期、优先级、资源和最坏响应假设，再沿${profile.pipeline.map((item) => item.label).join(" → ")}追踪一次执行，不能从生成成功反推时序正确。`;
  }
  if (/虚拟功能总线|vfb/.test(lower)) {
    return `“${concept}”表达部署无关的逻辑通信：组件先依据端口合同协作，系统映射再决定本地 RTE 调用或跨 ECU 通信。若发生“${profile.fault}”，就说明硬件或部署细节泄漏进了逻辑合同。`;
  }
  if (/方法论|系统配置|ecu信息抽取|ecu extract|系统级设计/.test(lower)) {
    return `“${concept}”是工件转换与引用闭合问题。它必须声明输入版本、选择规则、输出 ARXML 范围和责任人；在“${stage.label}”完成后，用${profile.evidence}确认没有悬空引用、隐式默认值或目标 ECU 之外的数据泄漏。`;
  }
  if (/安装|界面|工具入门|工具简介|工程创建|isolar|rta系列/.test(lower)) {
    return `“${concept}”只承担可复现工具入口，不把 2018 年菜单路径当成永久知识。学习者需要记录工具名称与版本、插件、许可证、输入工件和生成日志，并以“${profile.invariant}”验收结果；界面截图只能辅助定位，不能代替工件差异。`;
  }
  if (
    /matlab|simulink|embedded coder|求解器|模型|mapping|代码及描述文件|导入软件组件/.test(
      lower,
    )
  ) {
    return `“${concept}”位于模型—AUTOSAR 合同—代码生成的往返边界。应同时核对行为测试、求解器和周期假设、Simulink-AUTOSAR 映射、生成 C 与 ARXML；任何手工修正都必须回到受控源工件，避免下一次生成覆盖。`;
  }
  if (/can|通信|pdu|e2e|安全车载通信/.test(lower)) {
    return `“${concept}”需要把逻辑信号、PDU、帧和驱动层分开，并记录长度、周期、超时、新鲜度、计数器、数据标识与 CRC 的适用位置。对“${profile.scenarios[1].label}”的判断必须来自状态和故障模型，不能只看总线上出现了数据。`;
  }
  if (/ecum|bswm|模式/.test(lower)) {
    return `“${concept}”控制 ECU 与基础软件模式迁移。应列出前置状态、触发源、守卫、动作、失败回退和通知对象，再用${profile.evidence}证明启动与关闭过程中没有服务在初始化前被使用。`;
  }
  if (/rte|运行时环境/.test(lower)) {
    return `“${concept}”连接应用合同与 ECU 实现，但 contract 阶段和 generation 阶段的输入并不相同。本页要求保存两阶段输入哈希、API 差异和任务映射，并在“${stage.label}”拒绝新 ARXML 搭配旧生成目录。`;
  }
  if (/编译|链接|下载|调试|车灯|代码集成/.test(lower)) {
    return `“${concept}”必须产生可追溯的目标证据：构建输入、编译选项、链接布局、二进制哈希、下载目标和观测轨迹属于同一次运行。调试器中的临时修改只有回写并从干净目录重建后，才算修复“${profile.fault}”。`;
  }
  if (/iso 26262|安全|ffi|存储空间|程序流|编码风格|硬件验证/.test(lower)) {
    return `“${concept}”只能作为安全论证中的一项机制或要求。必须写出故障假设、独立性、检测覆盖、反应、限制与残余风险；采用 AUTOSAR 或启用模块不会自动产生 ISO 26262 合规、ASIL 分解或认证结论。`;
  }
  if (/密码|信息安全|secure|secoc/.test(lower)) {
    return `“${concept}”从资产和威胁开始，而不是从算法名称开始。应定义密钥所有者、新鲜度来源、重放窗口、认证失败反应、更新与撤销路径，再用“${profile.scenarios[1].label}”验证安全失败不会被当作普通通信成功。`;
  }
  if (/adaptive|ap和cp|ap和cp|新概念/.test(lower)) {
    return `“${concept}”要求基于实时性、算力、故障运行、动态服务、更新和硬件约束比较 Classic 与 Adaptive。Adaptive 的 ARA、功能集群和服务绑定不是 Classic BSW 模块的改名，平台选择必须回到“${profile.decision}”的需求证据。`;
  }
  return `“${concept}”在本页落到“${stage.label}”工件：${stage.artifact}。学习者要先写出该节点的输入、输出、所有者和失败条件，再用${index % 2 === 0 ? profile.evidence : profile.invariant}核对它是否真正参与“${profile.decision}”。`;
}

function objectives(profile) {
  return `<Objectives>

- 能解释“${profile.title}”为何要${profile.decision}
- 能逐项把 ${profile.concepts.join("、")} 映射到五段工件链，并指出每段的输入、输出和所有者
- 能从“${profile.scenarios[0].label}”追踪到可观察结果，持续验证“${profile.invariant}”
- 能注入“${profile.fault}”，保存首个分岔，用同一输入回退并提交${profile.evidence}

</Objectives>`;
}

function sourceSection(profile) {
  return profile.sourceIds
    .map((id) => {
      const source = sourceById(id);
      return `- [${source.title}](${source.url})：针对“${profile.title}”，${source.use}。`;
    })
    .join("\n");
}

function conceptSection(profile) {
  return profile.concepts
    .map(
      (concept, index) => `### ${concept}

${conceptMechanism(concept, profile, index)}`,
    )
    .join("\n\n");
}

function exerciseConceptList(profile) {
  return profile.concepts
    .map((concept, index) => {
      const stage = profile.pipeline[index % profile.pipeline.length];
      return `${index + 1}. ${concept}：在“${stage.label}”核对${stage.artifact}，证据进入${profile.evidence}。`;
    })
    .join("\n");
}

function glossary(profile) {
  return `<Glossary>
  <GlossaryItem term=${JSON.stringify(profile.pipeline[0].label)}>${profile.pipeline[0].artifact}。</GlossaryItem>
  <GlossaryItem term=${JSON.stringify(profile.pipeline[1].label)}>${profile.pipeline[1].artifact}。</GlossaryItem>
  <GlossaryItem term=${JSON.stringify(profile.pipeline[2].label)}>${profile.pipeline[2].artifact}。</GlossaryItem>
  <GlossaryItem term=${JSON.stringify(profile.pipeline[3].label)}>${profile.pipeline[3].artifact}。</GlossaryItem>
  <GlossaryItem term=${JSON.stringify(profile.pipeline[4].label)}>${profile.pipeline[4].artifact}。</GlossaryItem>
</Glossary>`;
}

function makePage(profile) {
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  const sourceBullets = sourceSection(profile);
  const concepts = conceptSection(profile);
  const terms = JSON.stringify(
    profile.pipeline.map((item) => ({
      term: item.label,
      def: `${profile.title}中的${item.artifact}`,
    })),
  );
  return `import {
  Answer,
  Attribution,
  Callout,
  Exercises,
  Glossary,
  GlossaryItem,
  Objectives,
  Step,
  Stepper,
  TermSequence,
} from "@/components/mdx/mdx-components";
import {
  ${componentBase}ArtifactLab,
  ${componentBase}TraceLab,
  ${componentBase}FaultLab,
} from "@/components/mdx/${BOOK}/v2/${slug}";

# ${profile.title}

${objectives(profile)}

## 为什么“${profile.pipeline[0].label}”不能绕过“${profile.pipeline[1].label}”

“${profile.title}”的核心决策是：${profile.decision}。本页先冻结场景、输入工件、AUTOSAR 版本和所有者，再运行转换；每一步都必须回答“改了什么、由谁生成、如何回退”。只要无法证明“${profile.invariant}”，就不能用编译成功、目标板亮灯或工具无报错替代验收。

<Callout type="info" title="当前版本边界：R25-11">
  原书出版于 2018
  年，本课程保留其 Classic Platform、车灯示例与当时工具链的教学范围；规范事实以截至
  2026 年 7 月已发布的 R25-11 核对。R26-11 计划于 2026 年 12
  月发布，本页不把计划版本提前写成现行规范。
</Callout>

## 来源、版次与独立重写边界

本站只能访问原书的公开书目信息和目录，不能把目录页当作原版全文。“${profile.title}”的中文解释、工件模型、交互实验、故障、练习与答案均为独立教学重写；AUTOSAR、ISO、ETAS、MathWorks 与 NXP 的官方页面只用于核对各自直接承担的技术事实。

${sourceBullets}

## 五段工件链与观察语言

<TermSequence items={${terms}} suffix="。" />

| 阶段 | 可交付工件 |
| --- | --- |
${profile.pipeline.map((item) => `| ${item.label} | ${item.artifact} |`).join("\n")}

这条链不是固定工具菜单，而是“${profile.title}”的追踪骨架。正常场景输入为“${profile.scenarios[0].input}”；边界场景输入为“${profile.scenarios[1].input}”。二者都要从相同冻结条件开始，并以“${profile.evidence}”判断结果。

## 正式目录逐项深读

${concepts}

## 三个可重放实验

<Callout type="info" title="先写预测，再点击">
  先预测“${profile.scenarios[0].label}”经过五段工件后的预期输出，再选择正式目录节点。若运行与预测不一致，保留差异并缩小主张，不允许移动输入边界。
</Callout>

<Stepper>
  <Step title="1. 目录节点与工件定位">
    切换“${profile.scenarios[0].label}”与“${profile.scenarios[1].label}”，再选择目录节点，确认它映射到哪个工件阶段。

    <${componentBase}ArtifactLab />
  </Step>
  <Step title="2. 逐工件追踪">
    依次检查 ${profile.pipeline.map((item) => item.label).join(" → ")}，每一步只接受能维持“${profile.invariant}”的转换。

    <${componentBase}TraceLab />
  </Step>
  <Step title="3. 单一故障、回退与同输入重放">
    注入“${profile.fault}”，定位第一个不一致工件；撤销故障后用完全相同的输入重放，确认中间状态与结果一起恢复。

    <${componentBase}FaultLab />
  </Step>
</Stepper>

## 工程验收矩阵

| 场景 | 输入 | 预期 | 拒绝条件 |
| --- | --- | --- | --- |
| ${profile.scenarios[0].label} | ${profile.scenarios[0].input} | ${profile.scenarios[0].expected} | 工件版本或所有者不可追溯 |
| ${profile.scenarios[1].label} | ${profile.scenarios[1].input} | ${profile.scenarios[1].expected} | 只展示最终现象，没有首个分岔 |
| 故障恢复 | ${profile.fault} | 回退后同输入轨迹恢复 | 重置只清界面，没有恢复工件与状态 |

<Callout type="trap" title="误区：把工具成功当作系统正确">
  “${profile.title}”中任何一个工具的绿色状态都只说明局部检查通过。跨工具的类型、引用、时序和硬件资源仍要用${profile.evidence}闭合。
</Callout>

<Callout type="trap" title="误区：把 2018 步骤当作当前规范">
  原书操作路径有明确时代边界。课程保留原始学习范围，但当前事实绑定 R25-11；若工具菜单或生成选项变化，应迁移工件合同，而不是伪造旧界面。
</Callout>

<Callout type="trap" title="误区：采用 AUTOSAR 就等于功能安全">
  AUTOSAR 提供架构与可选安全机制，不自动证明 ISO 26262
  合规、ASIL 分解、独立性或诊断覆盖。涉及安全的结论必须另有安全需求、验证和残余风险证据。
</Callout>

## 本章小结

“${profile.title}”的掌握标准不是记住 ${profile.concepts.length} 个目录标题，而是能解释“${profile.decision}”，保持“${profile.invariant}”，并在“${profile.fault}”发生时用${profile.evidence}定位、回退和重放。

${glossary(profile)}

<Exercises>

1. 怎样为“${profile.title}”建立不依赖工具界面的最小正常基线？

<Answer>
  冻结“${profile.scenarios[0].input}”、规范和工具版本、五段工件及所有者；逐段记录输入输出，最后以“${profile.scenarios[0].expected}”和${profile.evidence}验收。任何一步无法复算时停止向后生成。
</Answer>

2. 正式目录中的每个节点怎样进入工件、可视化与练习证据？

<Answer>
${exerciseConceptList(profile)}
</Answer>

3. 注入“${profile.fault}”后，怎样证明修复不是偶然？

<Answer>
  保存故障前的冻结输入和基线轨迹，定位首个偏离“${profile.invariant}”的工件；修正受控源而非生成结果，清理下游工件后重新生成，再以同一输入重放“${profile.scenarios[1].label}”。只有中间状态、最终结果和${profile.evidence}全部恢复才接受修复。
</Answer>

</Exercises>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="宋珂、王民、单忠伟、谭杨《AUTOSAR规范与车用控制器软件开发》（2018）公开目录"
  adaptedUrl="${SOURCES.bookToc}"
/>
`;
}

function wrapperSource(profile) {
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  const model = {
    unitId: profile.unitId ?? profile.role,
    title: profile.title,
    decision: profile.decision,
    invariant: profile.invariant,
    fault: profile.fault,
    evidence: profile.evidence,
    concepts: profile.concepts,
    pipeline: profile.pipeline,
    scenarios: profile.scenarios,
  };
  return `"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies AutosarArtifactModel;

export function ${componentBase}ArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function ${componentBase}TraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function ${componentBase}FaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
`;
}

function replaceBookManifest(source, bookSlug, value) {
  const marker = `    ${JSON.stringify(bookSlug)}: `;
  const markerStart = source.indexOf(marker);
  if (markerStart < 0) throw new Error(`manifest 缺少书籍：${bookSlug}`);
  const objectStart = source.indexOf("{", markerStart + marker.length);
  let depth = 0;
  let inString = false;
  let escaped = false;
  let objectEnd = -1;
  for (let index = objectStart; index < source.length; index += 1) {
    const character = source[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{") depth += 1;
    else if (character === "}" && --depth === 0) {
      objectEnd = index;
      break;
    }
  }
  if (objectEnd < 0) throw new Error(`manifest 对象未闭合：${bookSlug}`);
  const serialized = JSON.stringify(value, null, 2)
    .split("\n")
    .map((line, index) => (index === 0 ? line : `    ${line}`))
    .join("\n");
  return `${source.slice(0, objectStart)}${serialized}${source.slice(objectEnd + 1)}`;
}

function updateManifest(document, profiles) {
  const manifest = document.books?.[BOOK];
  if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
  const formalPages = profiles.filter((profile) => profile.unitId);
  if (formalPages.length !== 11) {
    throw new Error(`正式单元应为 11，实际 ${formalPages.length}`);
  }
  const formalNodes = manifest.units.reduce(
    (total, unit) => total + unit.concepts.length,
    0,
  );
  if (formalNodes !== 140) {
    throw new Error(`正式目录节点应为 140，实际 ${formalNodes}`);
  }

  manifest.edition =
    "宋珂、王民、单忠伟、谭杨编著《AUTOSAR规范与车用控制器软件开发》，化学工业出版社，2018年11月，226页，ISBN 9787122329837；课程以 AUTOSAR R25-11 核对当前规范事实";
  manifest.status = "verified-outline";
  manifest.sourceUrl = SOURCES.bookToc;
  manifest.secondarySourceUrls = [
    SOURCES.standards,
    SOURCES.classic,
    SOURCES.classicRelease,
    SOURCES.rte,
    SOURCES.vfb,
    SOURCES.safety,
    SOURCES.adaptive,
  ];
  manifest.sourceKind =
    "retailer-outline-plus-versioned-autosar-iso-tool-and-hardware-primary-sources";
  manifest.verifiedAt = "2026-07-30";
  manifest.disclosureNote =
    "课程按 2018 年中文版 10 章与参考文献目录独立中文重写，不是原书翻译。公开目录只限定版次与节点；当前规范事实以截至 2026 年 7 月已发布的 AUTOSAR R25-11 核对，R26-11 仍是 2026 年 12 月计划版本。采用 AUTOSAR 不自动等于 ISO 26262 合规或认证。";
  manifest.sourceAccess = "outline-only";
  manifest.sourceMode = "independent-rewrite";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.unitMappingEvidence = PROFILE_PATH.replace(`${ROOT}/`, "");
  manifest.factSourcePolicy =
    "零售目录只核对原书版次与正式节点；版本化 AUTOSAR 文件承担架构、RTE、VFB、安全与平台事实；ISO、ETAS、MathWorks、NXP 官方资料只承担各自标准、工具或硬件职责。课程工件链、故障实验、图示、练习与答案为本站原创。";
  manifest.factSources = FACT_SOURCES.map(({ id, title, url }) => ({
    id,
    title,
    url,
  }));
  const profileByUnit = new Map(
    formalPages.map((profile) => [profile.unitId, profile]),
  );
  manifest.units = manifest.units.map((unit) => {
    const profile = profileByUnit.get(unit.id);
    if (!profile) throw new Error(`正式单元缺少页面：${unit.id}`);
    return {
      ...unit,
      sourceUnitId: unit.id,
      chapterPath: profile.path,
      sourceMode: "independent-rewrite",
      sourceAccess: "outline-only",
      factSourceIds: profile.sourceIds,
    };
  });
  manifest.coverage = {
    formalUnits: 11,
    mappedUnits: 11,
    ratio: 1,
    platformPages: profiles.length,
  };
  manifest.metrics = {
    formalUnits: 11,
    formalNodes,
    coursePages: profiles.length,
    interactiveViews: profiles.length * 3,
  };
  manifest.visualImplementation = {
    viewsPerPage: 3,
    modes: ["artifact", "trace", "fault"],
    sharedComponent:
      "src/components/mdx/autosar-vehicle-controller/v2/autosar-artifact-lab.tsx",
    retainedStaticDiagrams: 0,
  };
}

const manifestSource = fs.readFileSync(MANIFEST_PATH, "utf8");
const document = JSON.parse(manifestSource);
const manifest = document.books?.[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
const unitById = new Map(manifest.units.map((unit) => [unit.id, unit]));

fs.mkdirSync(COMPONENT_DIR, { recursive: true });

for (const profile of PAGES) {
  const filePath = path.join(CONTENT_DIR, `${profile.path}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${profile.path}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  profile.title = String(parsed.data.title);
  if (profile.unitId) {
    const unit = unitById.get(profile.unitId);
    if (!unit) throw new Error(`缺少正式单元：${profile.unitId}`);
    profile.concepts = unit.concepts.map(conceptLabel);
  }
  const data = {
    ...parsed.data,
    description: `${profile.title}：以五段 AUTOSAR 工件链、逐节点解释、故障回退和同输入重放完成版本化工程验收。`,
    demo: true,
    draft: false,
    sourceUrl: SOURCES.bookToc,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  delete data.officialUnitId;
  if (profile.unitId) data.officialUnitId = profile.unitId;

  await writeFormatted(filePath, matter.stringify(makePage(profile), data));
  await writeFormatted(
    path.join(COMPONENT_DIR, `${path.basename(profile.path)}.tsx`),
    wrapperSource(profile),
  );
}

updateManifest(document, PAGES);
fs.writeFileSync(
  MANIFEST_PATH,
  replaceBookManifest(manifestSource, BOOK, document.books[BOOK]),
);
await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      edition: document.books[BOOK].edition,
      sourceBoundary:
        "2018 Chinese retail outline for edition and TOC only; AUTOSAR R25-11, ISO, ETAS, MathWorks and NXP primary sources for current technical facts; independent Chinese rewrite.",
      currentReleaseBoundary:
        "R25-11 is the latest released AUTOSAR version as of 2026-07-30. R26-11 is scheduled for 2026-12 and is not treated as released.",
      safetyBoundary:
        "Using AUTOSAR or an AUTOSAR safety mechanism does not by itself establish ISO 26262 compliance, ASIL decomposition, independence or certification.",
      sources: FACT_SOURCES,
      coverage: document.books[BOOK].coverage,
      metrics: document.books[BOOK].metrics,
      pages: PAGES.map((profile) => ({
        role: profile.role,
        unitId: profile.unitId,
        path: profile.path,
        title: profile.title,
        concepts: profile.concepts,
        sourceIds: profile.sourceIds,
        decision: profile.decision,
        invariant: profile.invariant,
        fault: profile.fault,
        evidence: profile.evidence,
        model: {
          pipeline: profile.pipeline,
          scenarios: profile.scenarios,
        },
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(
  `已治理 ${PAGES.length} 页、${PAGES.filter((page) => page.unitId).length} 个正式单元、${document.books[BOOK].metrics.formalNodes} 个正式目录节点和 ${document.books[BOOK].metrics.interactiveViews} 个交互视图。`,
);
