import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "数据类构建器", input: "输入1：数据类构建器", mechanism: "数据类构建器减少保存字段、比较和表示对象的样板，但不会替你设计领域不变量", evidence: "检查返回、状态与失败路径 1", invariant: "命名元组、类型化命名元组与dataclass的共同点是从字段声明生成方法，差异在运行模型。" },
  { label: "命名元组、类型化命名", input: "输入2：命名元组、类型化命名元组与dataclass", mechanism: "命名元组、类型化命名元组与dataclass的共同点是从字段声明生成方法，差异在运行模型", evidence: "检查返回、状态与失败路径 2", invariant: "变量注解与字段选项控制默认值、默认工厂、repr、compare和init。" },
  { label: "变量注解与字段选项", input: "输入3：变量注解与字段选项", mechanism: "变量注解与字段选项控制默认值、默认工厂、repr、compare和init", evidence: "检查返回、状态与失败路径 3", invariant: "post-init、类变量与初始化变量把构造后验证、非实例配置和只在初始化阶段使用的数据分开。" },
  { label: "post-init、", input: "输入4：post-init、类变量与初始化变量", mechanism: "post-init、类变量与初始化变量把构造后验证、非实例配置和只在初始化阶段使用的数据分开", evidence: "检查返回、状态与失败路径 4", invariant: "类实例模式匹配依据match_args映射位置模式，也可直接用关键字字段。" },
];

export function FlpDataClassBuildersModelLab() {
  return <FluentPythonOfficialLab title="数据类构建器：模型" caption="第5章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpDataClassBuildersBoundaryLab() {
  return <FluentPythonOfficialLab title="数据类构建器：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpDataClassBuildersEvidenceLab() {
  return <FluentPythonOfficialLab title="数据类构建器：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
