import { OfficialLaeLab } from "./official-lae-lab";

const concepts = ["动态提示词","智能体","工具合同","记忆","嵌入","插件清单"] as const;

export function Lae05LangchainPluginsPipelineLab() { return <OfficialLaeLab title="第5章 使用LangChain框架和插件增强LLM的功能" concepts={concepts} accent="#b45309" view="pipeline" />; }
export function Lae05LangchainPluginsRequestLab() { return <OfficialLaeLab title="第5章 使用LangChain框架和插件增强LLM的功能" concepts={concepts} accent="#b45309" view="request" />; }
export function Lae05LangchainPluginsRiskLab() { return <OfficialLaeLab title="第5章 使用LangChain框架和插件增强LLM的功能" concepts={concepts} accent="#b45309" view="risk" />; }
