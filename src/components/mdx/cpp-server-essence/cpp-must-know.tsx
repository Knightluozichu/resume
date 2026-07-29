"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "建立 owner",
    mechanism: "RAII 把资源取得和对象生命周期绑定，unique_ptr 表达唯一所有权。",
    failure: "裸 new/delete 分散在多个退出路径，异常时泄漏。",
    evidence: "构造/析构计数、sanitizer 与 owner graph。",
  },
  {
    label: "暴露接口",
    mechanism:
      "pimpl 隔离 layout 和重依赖，override/delete 让意图可被编译器检查。",
    failure: "头文件泄漏实现细节，错误重载静默创建新成员。",
    evidence: "ABI diff、依赖构建时间与编译诊断。",
  },
  {
    label: "共享与回调",
    mechanism: "shared_ptr 只用于真实共享，weak_ptr 打断非所有权回边。",
    failure: "循环引用或从 this 临时创建第二个 control block。",
    evidence: "use_count 只作诊断、heap path 与析构断言。",
  },
];

export function CppOwnershipContractLab() {
  return (
    <ChapterDecisionLab
      title="服务器对象的 owner、接口与销毁顺序"
      prompt="沿对象生命周期检查 RAII、pimpl、智能指针和现代 C++ 语法是否表达同一份责任。"
      stages={STAGES}
      conclusion="服务器 C++ 的首要问题不是语法新旧，而是资源责任能否从构造、共享、回调一直证明到析构。"
    />
  );
}

export function CppOwnershipContractMechanismMap() {
  return (
    <ChapterMechanismMap
      title="服务器对象的 owner、接口与销毁顺序"
      stages={STAGES}
    />
  );
}

export function CppOwnershipContractFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="服务器对象的 owner、接口与销毁顺序"
      stages={STAGES}
    />
  );
}
