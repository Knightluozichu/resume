import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "类型提示进阶", input: "输入1：类型提示进阶", mechanism: "类型提示进阶关注API不同输入与输出之间的关系，而非堆叠复杂语法", evidence: "检查返回、状态与失败路径 1", invariant: "重载签名用多个overload声明描述同一运行函数的调用形态，最后只有一个实现。" },
  { label: "重载签名", input: "输入2：重载签名", mechanism: "重载签名用多个overload声明描述同一运行函数的调用形态，最后只有一个实现", evidence: "检查返回、状态与失败路径 2", invariant: "TypedDict、类型转换与运行时注解分别描述字典键结构、告诉检查器已知事实和提供可反射元数据。" },
  { label: "TypedDict、", input: "输入3：TypedDict、类型转换与运行时注解", mechanism: "TypedDict、类型转换与运行时注解分别描述字典键结构、告诉检查器已知事实和提供可反射元数据", evidence: "检查返回、状态与失败路径 3", invariant: "泛型类与型变描述容器对类型替换的行为。" },
  { label: "泛型类与型变", input: "输入4：泛型类与型变", mechanism: "泛型类与型变描述容器对类型替换的行为", evidence: "检查返回、状态与失败路径 4", invariant: "泛型静态协议把类型变量和结构能力结合，让算法保留输入输出相关性。" },
];

export function FlpMoreTypeHintsModelLab() {
  return <FluentPythonOfficialLab title="类型提示进阶：模型" caption="第15章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpMoreTypeHintsBoundaryLab() {
  return <FluentPythonOfficialLab title="类型提示进阶：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpMoreTypeHintsEvidenceLab() {
  return <FluentPythonOfficialLab title="类型提示进阶：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
