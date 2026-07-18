import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "Parse", input: "模板文本", boundary: "template.Parse", output: "语法树", invariant: "启动期解析失败应阻止服务启动。" },
  { label: "Pipeline", input: "dot、变量与函数", boundary: "action pipeline", output: "格式化值", invariant: "模板函数无隐藏I/O和不可控副作用。" },
  { label: "Escape", input: "不可信数据", boundary: "html/template上下文", output: "安全HTML、URL或JS片段", invariant: "不要把外部字符串强制标记为安全类型。" },
  { label: "Layout", input: "base、block与页面模板", boundary: "嵌套模板执行", output: "完整页面", invariant: "模板名和数据契约在组合前确定。" },
];
export function GwpTemplatePipelineLab(){return <GoWebOfficialLab title="模板解析执行流" caption="先解析成程序，再以数据执行生成内容。" cases={cases}/>;}
export function GwpContextEscapeLab(){return <GoWebOfficialLab title="上下文感知转义" caption="同一数据在HTML、属性、URL和JS位置产生不同输出。" cases={cases} tone="rose" initial={2}/>;}
export function GwpLayoutLab(){return <GoWebOfficialLab title="嵌套模板与布局" caption="define、template和block组成可替换页面骨架。" cases={cases} tone="emerald" initial={3}/>;}
