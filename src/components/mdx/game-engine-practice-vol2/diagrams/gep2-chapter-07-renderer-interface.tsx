import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第7章 渲染器接口";
const focus = "能力查询 / 资源句柄 / 状态对象 / 命令提交 / 延迟销毁";
const stages = [
  "描述设备能力",
  "创建渲染资源",
  "绑定不可变状态",
  "提交绘制命令",
  "延迟销毁资源",
];

export function Gep2Chapter07RendererInterfaceMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter07RendererInterfaceExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter07RendererInterfaceEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
