import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e09ConstructorsGcMapLab() {
  return (
    <HfjReferenceMapLab
      title="第9章 对象的生与死：构造器与垃圾回收 · 对象/执行图"
      focus="追踪栈帧、堆对象、构造链和可达性，解释初始化顺序与对象何时具备回收资格"
      stages={stages}
    />
  );
}

export function Hfj3e09ConstructorsGcExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第9章 对象的生与死：构造器与垃圾回收 · 执行实验"
      focus="栈/堆时序图、构造链日志与可达性判定表"
      stages={stages}
    />
  );
}

export function Hfj3e09ConstructorsGcEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第9章 对象的生与死：构造器与垃圾回收 · 失败证据"
      focus="把局部引用的寿命当作对象寿命，或假设编译器总会补无参构造器"
      stages={stages}
    />
  );
}
