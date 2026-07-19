"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷II 第1章 搭建Android源码工作环境";
const focus = "在Android 4.0.1上建立源码下载、编译与system_process调试基线";
const nodes = [
  {
    label: "第1章 搭建Android源码工作环境",
    stage: "锁定工具链",
    mechanism:
      "第1章 搭建Android源码工作环境在“在Android 4.0.1上建立源码下载、编译与system_process调试基线”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-4.0.1_r1，否则立即停止比较。",
    probe:
      "使用manifest标签、编译目标、framework产物、Eclipse符号、调试端口与断点线程检查第1章 搭建Android源码工作环境的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.1 Android系统架构",
    stage: "定位源码入口",
    mechanism:
      "1.1 Android系统架构在“在Android 4.0.1上建立源码下载、编译与system_process调试基线”中的责任要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由manifest标签、编译目标、framework产物、Eclipse符号、调试端口与断点线程复核。",
    probe:
      "使用manifest标签、编译目标、framework产物、Eclipse符号、调试端口与断点线程检查1.1 Android系统架构的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.2 搭建开发环境",
    stage: "运行最小切片",
    mechanism:
      "1.2 搭建开发环境在“在Android 4.0.1上建立源码下载、编译与system_process调试基线”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-4.0.1_r1，否则立即停止比较。",
    probe:
      "使用manifest标签、编译目标、framework产物、Eclipse符号、调试端口与断点线程检查1.2 搭建开发环境的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.2.1 下载源码",
    stage: "保存构建诊断",
    mechanism:
      "1.2.1 下载源码在“在Android 4.0.1上建立源码下载、编译与system_process调试基线”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-4.0.1_r1，否则立即停止比较。",
    probe:
      "使用manifest标签、编译目标、framework产物、Eclipse符号、调试端口与断点线程检查1.2.1 下载源码的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.2.2 编译源码",
    stage: "回归重放",
    mechanism:
      "1.2.2 编译源码在“在Android 4.0.1上建立源码下载、编译与system_process调试基线”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-4.0.1_r1，否则立即停止比较。",
    probe:
      "使用manifest标签、编译目标、framework产物、Eclipse符号、调试端口与断点线程检查1.2.2 编译源码的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.2.3 利用Eclipse调试system_process",
    stage: "锁定工具链",
    mechanism:
      "1.2.3 利用Eclipse调试system_process在“在Android 4.0.1上建立源码下载、编译与system_process调试基线”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-4.0.1_r1，否则立即停止比较。",
    probe:
      "使用manifest标签、编译目标、framework产物、Eclipse符号、调试端口与断点线程检查1.2.3 利用Eclipse调试system_process的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "1.3 本章小结",
    stage: "定位源码入口",
    mechanism:
      "1.3 本章小结在“在Android 4.0.1上建立源码下载、编译与system_process调试基线”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用manifest标签、编译目标、framework产物、Eclipse符号、调试端口与断点线程排除只凭类名或流程图得出的结论。",
    probe:
      "使用manifest标签、编译目标、framework产物、Eclipse符号、调试端口与断点线程检查1.3 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷II / Android 4.0.1 / API 14"];
const stages = [
  "锁定工具链",
  "定位源码入口",
  "运行最小切片",
  "保存构建诊断",
  "回归重放",
];
const model = {
  sourceTag: "android-4.0.1_r1",
  sourcePath: "platform/manifest @ android-4.0.1_r1",
  invariant:
    "在android-4.0.1_r1固定输入下，在Android 4.0.1上建立源码下载、编译与system_process调试基线的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "沿用卷I 2.2路径或用现代IDE截图代替4.0.1可运行证据",
  evidence:
    "manifest标签、编译目标、framework产物、Eclipse符号、调试端口与断点线程",
  boundary:
    "在Android 4.0.1上建立源码下载、编译与system_process调试基线的第一个线程、进程、Binder、JNI或持久状态边界",
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
