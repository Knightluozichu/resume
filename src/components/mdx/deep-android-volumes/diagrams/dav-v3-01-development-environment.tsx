"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷III 第1章 开发环境部署";
const focus = "建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境";
const nodes = [
  {
    label: "第1章 开发环境部署",
    stage: "锁定工具链",
    mechanism:
      "第1章 开发环境部署在“建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-4.2.2_r1，否则立即停止比较。",
    probe:
      "使用android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点检查第1章 开发环境部署的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.1 获取Android源代码",
    stage: "定位源码入口",
    mechanism:
      "1.1 获取Android源代码在“建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点复核。",
    probe:
      "使用android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点检查1.1 获取Android源代码的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.2 Android的编译",
    stage: "运行最小切片",
    mechanism:
      "1.2 Android的编译在“建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-4.2.2_r1，否则立即停止比较。",
    probe:
      "使用android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点检查1.2 Android的编译的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.3 在IDE中导入Android源代码",
    stage: "保存构建诊断",
    mechanism:
      "1.3 在IDE中导入Android源代码在“建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点复核。",
    probe:
      "使用android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点检查1.3 在IDE中导入Android源代码的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.3.1 将Android源代码导入Eclipse",
    stage: "回归重放",
    mechanism:
      "1.3.1 将Android源代码导入Eclipse在“建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-4.2.2_r1，否则立即停止比较。",
    probe:
      "使用android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点检查1.3.1 将Android源代码导入Eclipse的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.3.2 将Android源代码导入SourceInsight",
    stage: "锁定工具链",
    mechanism:
      "1.3.2 将Android源代码导入SourceInsight在“建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点复核。",
    probe:
      "使用android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点检查1.3.2 将Android源代码导入SourceInsight的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.4 调试Android源代码",
    stage: "定位源码入口",
    mechanism:
      "1.4 调试Android源代码在“建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点复核。",
    probe:
      "使用android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点检查1.4 调试Android源代码的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.4.1 使用Eclipse调试Android Java源代码",
    stage: "运行最小切片",
    mechanism:
      "1.4.1 使用Eclipse调试Android Java源代码在“建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-4.2.2_r1，否则立即停止比较。",
    probe:
      "使用android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点检查1.4.1 使用Eclipse调试Android Java源代码的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.4.2 使用gdb调试Android C/C++源代码",
    stage: "保存构建诊断",
    mechanism:
      "1.4.2 使用gdb调试Android C/C++源代码在“建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点复核。",
    probe:
      "使用android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点检查1.4.2 使用gdb调试Android C/C++源代码的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.5 本章小结",
    stage: "回归重放",
    mechanism:
      "1.5 本章小结在“建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点排除只凭类名或流程图得出的结论。",
    probe:
      "使用android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点检查1.5 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷III / Android 4.2.2 / API 17"];
const stages = [
  "锁定工具链",
  "定位源码入口",
  "运行最小切片",
  "保存构建诊断",
  "回归重放",
];
const model = {
  sourceTag: "android-4.2.2_r1",
  sourcePath: "platform/manifest @ android-4.2.2_r1",
  invariant:
    "在android-4.2.2_r1固定输入下，建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "用Android 5以上迁移后的目录解释4.2.2源码位置",
  evidence:
    "android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点",
  boundary:
    "建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境的第一个线程、进程、Binder、JNI或持久状态边界",
} satisfies DavCausalModel;
const props = { unitTitle, focus, nodes, versions, stages, model };

export function DavSeriesPipelineLab() {
  return <OfficialDavSeriesLab mode="pipeline" {...props} />;
}

export function DavSeriesExperimentLab() {
  return <OfficialDavSeriesLab mode="experiment" {...props} />;
}

export function DavSeriesEvidenceLab() {
  return <OfficialDavSeriesLab mode="evidence" {...props} />;
}
