"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷I 第1章 阅读前的准备工作";
const focus = "建立Android 2.2四层架构、源码构建与阅读工具的统一坐标";
const nodes = [
  {
    label: "第1章 阅读前的准备工作",
    stage: "锁定工具链",
    mechanism:
      "第1章 阅读前的准备工作在“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果复核。",
    probe:
      "使用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果检查第1章 阅读前的准备工作的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.1 系统架构",
    stage: "定位源码入口",
    mechanism:
      "1.1 系统架构在“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果复核。",
    probe:
      "使用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果检查1.1 系统架构的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.1.1 Android系统架构",
    stage: "运行最小切片",
    mechanism:
      "1.1.1 Android系统架构在“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果复核。",
    probe:
      "使用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果检查1.1.1 Android系统架构的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.1.2 本书的架构",
    stage: "保存构建诊断",
    mechanism:
      "1.1.2 本书的架构在“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果复核。",
    probe:
      "使用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果检查1.1.2 本书的架构的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.2 搭建开发环境",
    stage: "回归重放",
    mechanism:
      "1.2 搭建开发环境在“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-2.2_r1，否则立即停止比较。",
    probe:
      "使用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果检查1.2 搭建开发环境的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.2.1 下载源码",
    stage: "锁定工具链",
    mechanism:
      "1.2.1 下载源码在“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-2.2_r1，否则立即停止比较。",
    probe:
      "使用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果检查1.2.1 下载源码的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.2.2 编译源码",
    stage: "定位源码入口",
    mechanism:
      "1.2.2 编译源码在“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-2.2_r1，否则立即停止比较。",
    probe:
      "使用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果检查1.2.2 编译源码的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.3 工具介绍",
    stage: "运行最小切片",
    mechanism:
      "1.3 工具介绍在“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-2.2_r1，否则立即停止比较。",
    probe:
      "使用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果检查1.3 工具介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.3.1 Source Insight介绍",
    stage: "保存构建诊断",
    mechanism:
      "1.3.1 Source Insight介绍在“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-2.2_r1，否则立即停止比较。",
    probe:
      "使用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果检查1.3.1 Source Insight介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.3.2 Busybox的使用（部分印次正文误标1.3.3）",
    stage: "回归重放",
    mechanism:
      "1.3.2 Busybox的使用（部分印次正文误标1.3.3）在“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-2.2_r1，否则立即停止比较。",
    probe:
      "使用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果检查1.3.2 Busybox的使用（部分印次正文误标1.3.3）的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.4 本章小结",
    stage: "锁定工具链",
    mechanism:
      "1.4 本章小结在“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果排除只凭类名或流程图得出的结论。",
    probe:
      "使用android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果检查1.4 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷I / Android 2.2 / API 8"];
const stages = [
  "锁定工具链",
  "定位源码入口",
  "运行最小切片",
  "保存构建诊断",
  "回归重放",
];
const model = {
  sourceTag: "android-2.2_r1",
  sourcePath: "platform/manifest @ android-2.2_r1",
  invariant:
    "在android-2.2_r1固定输入下，建立Android 2.2四层架构、源码构建与阅读工具的统一坐标的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "把现代Android Studio、Soong与ART行为倒填到Froyo源码",
  evidence: "android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果",
  boundary:
    "建立Android 2.2四层架构、源码构建与阅读工具的统一坐标的第一个线程、进程、Binder、JNI或持久状态边界",
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
