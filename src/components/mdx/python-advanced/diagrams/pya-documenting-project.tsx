import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "技术写作七原则", input: "需求与输入", action: "先写结构再润色，面向明确读者，使用简单风格，限制主题范围，示例真实且最小，信息轻量但充分，并用模板保持一致。", evidence: "技术写作七原则的测试与迁移记录", invariant: "先写结构再润色，面向明确读者，使用简单风格，限制主题范围，示例真实且最小，信息轻量但充分，并用模板保持一致。" },
  { label: "reStructuredText", input: "技术写作七原则", action: "原书用reStructuredText表达标题、列表、内联标记、代码块和链接", evidence: "reStructuredText的测试与迁移记录", invariant: "原书用reStructuredText表达标题、列表、内联标记、代码块和链接；标记语法服务于语义结构，不能用视觉缩进替代可解析层级。" },
  { label: "Sphinx构建", input: "reStructuredText", action: "Sphinx把源文档、自动API和交叉引用构建成可发布站点", evidence: "Sphinx构建的测试与迁移记录", invariant: "Sphinx把源文档、自动API和交叉引用构建成可发布站点；构建必须在CI中把断链和严重警告作为失败。" },
  { label: "文档组合与受众", input: "Sphinx构建", action: "设计、使用和运维文档回答不同问题，生产者与消费者需要不同入口", evidence: "文档组合与受众的测试与迁移记录", invariant: "设计、使用和运维文档回答不同问题，生产者与消费者需要不同入口；一个超长README不能替代可导航的信息架构。" },
  { label: "文档验收", input: "文档组合与受众", action: "代码示例应可执行，版本与配置要明确，发布时文档和制品同版本", evidence: "文档验收的测试与迁移记录", invariant: "代码示例应可执行，版本与配置要明确，发布时文档和制品同版本；过期页面应删除或标明适用范围，而不是长期保留冲突答案。" },
];
export function PyaDocumentingProjectModelLab(){return <PythonAdvancedOfficialLab title="编写项目文档：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaDocumentingProjectBoundaryLab(){return <PythonAdvancedOfficialLab title="编写项目文档：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaDocumentingProjectEvidenceLab(){return <PythonAdvancedOfficialLab title="编写项目文档：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
