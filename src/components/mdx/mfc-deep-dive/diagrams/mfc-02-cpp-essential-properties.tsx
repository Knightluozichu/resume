import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第2章 C++的重要性质",
  label: "第一篇 · C++对象模型",
  color: "#6d28d9",
  soft: "#f5f3ff",
  chain: [
    "定义类契约",
    "构造对象",
    "绑定this",
    "执行虚分派",
    "识别动态类型",
    "析构并释放",
  ],
  concepts: [
    "第2章 C++的重要性质",
    "类及其成员——谈封装（encapsulation）",
    "基类与派生类：谈继承（Inheritance）",
    "this指针",
    "虚拟函数与多态（Polymorphism）",
    "类与对象大解剖",
    "Object slicing与虚拟函数",
    "静态成员（变量与函数）",
    "C++程序的生与死：兼谈构造函数与解构函数",
    "四种不同的对象生存方式（in stack、in heap、global、local static）",
    "执行期类型信息（RTTI）",
    "动态生成（Dynamic Creation）",
    "异常处理（Exception Handling）",
    "Template",
    "Template Functions",
    "Template Classes",
    "Template的编译与链接",
  ],
} as const;

export function Mfc02CppEssentialPropertiesMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc02CppEssentialPropertiesExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc02CppEssentialPropertiesEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
