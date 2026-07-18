import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "动态属性与特性", input: "输入1：动态属性与特性", mechanism: "动态属性与特性把点号访问连接到计算逻辑，但公开接口应像普通属性一样稳定", evidence: "检查返回、状态与失败路径 1", invariant: "使用动态属性处理JSON数据可把映射键包装成属性并递归转换嵌套结构。" },
  { label: "使用动态属性处理JS", input: "输入2：使用动态属性处理JSON数据", mechanism: "使用动态属性处理JSON数据可把映射键包装成属性并递归转换嵌套结构", evidence: "检查返回、状态与失败路径 2", invariant: "使用new灵活创建对象发生在init之前，可根据原始数据返回不同类型或完成不可变基类构造。" },
  { label: "使用new灵活创建对", input: "输入3：使用new灵活创建对象", mechanism: "使用new灵活创建对象发生在init之前，可根据原始数据返回不同类型或完成不可变基类构造", evidence: "检查返回、状态与失败路径 3", invariant: "计算特性与缓存特性把派生值放在property或cached_property后。" },
  { label: "计算特性与缓存特性", input: "输入4：计算特性与缓存特性", mechanism: "计算特性与缓存特性把派生值放在property或cached_property后", evidence: "检查返回、状态与失败路径 4", invariant: "属性验证与处理由getter、setter和deleter维护不变量。" },
];

export function FlpDynamicAttributesModelLab() {
  return <FluentPythonOfficialLab title="动态属性与特性：模型" caption="第22章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpDynamicAttributesBoundaryLab() {
  return <FluentPythonOfficialLab title="动态属性与特性：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpDynamicAttributesEvidenceLab() {
  return <FluentPythonOfficialLab title="动态属性与特性：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
