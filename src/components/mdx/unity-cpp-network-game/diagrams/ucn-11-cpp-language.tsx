import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "声明类型和值",
  "限定存储期",
  "组合函数与容器",
  "明确指针引用",
  "封装类与多态",
  "文件和STL回归",
] as const;

export function Ucn11CppLanguageMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第11章 C++语言基础"
      label="第3篇 C++网络开发基础（服务器）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn11CppLanguageExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第11章 C++语言基础"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn11CppLanguageEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第11章 C++语言基础"
      nodes={nodes}
      mode="evidence"
    />
  );
}
