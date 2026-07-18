import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第14章 Intent的匹配规则",
  "14.1 Intent属性",
  "14.2 Intent的匹配规则",
  "14.3 Intent匹配源码简析"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第14章 Intent的匹配规则" focus="从Intent属性、匹配规则进入PackageManager解析路径" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第14章 Intent的匹配规则" focus="只测试显式Intent，或分别理解action/category/data却不验证它们的联合匹配" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第14章 Intent的匹配规则" focus="action/category/data组合、默认类别、MIME与URI、候选集、优先级和失败样本" nodes={nodes}/>;}
