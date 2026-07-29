"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷II 第4章 深入理解PackageManagerService";
const focus = "追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态";
const nodes = [
  {
    label: "第4章 深入理解PackageManagerService",
    stage: "锁定历史基线",
    mechanism:
      "第4章 深入理解PackageManagerService在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查第4章 深入理解PackageManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.1 概述",
    stage: "复现正常轨迹",
    mechanism:
      "4.1 概述在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录排除只凭类名或流程图得出的结论。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.2 初识PackageManagerService",
    stage: "注入单一故障",
    mechanism:
      "4.2 初识PackageManagerService在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录排除只凭类名或流程图得出的结论。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.2 初识PackageManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3 PKMS的main函数分析",
    stage: "定位首个分叉",
    mechanism:
      "4.3 PKMS的main函数分析在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.3 PKMS的main函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3.1 构造函数分析之前期准备工作",
    stage: "恢复同输入重放",
    mechanism:
      "4.3.1 构造函数分析之前期准备工作在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.3.1 构造函数分析之前期准备工作的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3.2 构造函数分析之扫描Package",
    stage: "锁定历史基线",
    mechanism:
      "4.3.2 构造函数分析之扫描Package在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.3.2 构造函数分析之扫描Package的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3.3 构造函数分析之扫尾工作",
    stage: "复现正常轨迹",
    mechanism:
      "4.3.3 构造函数分析之扫尾工作在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.3.3 构造函数分析之扫尾工作的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.3.4 PKMS构造函数总结",
    stage: "注入单一故障",
    mechanism:
      "4.3.4 PKMS构造函数总结在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录排除只凭类名或流程图得出的结论。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.3.4 PKMS构造函数总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4 APK Installation分析",
    stage: "定位首个分叉",
    mechanism:
      "4.4 APK Installation分析在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.4 APK Installation分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.1 adb install分析",
    stage: "恢复同输入重放",
    mechanism:
      "4.4.1 adb install分析在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.4.1 adb install分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.2 pm分析",
    stage: "锁定历史基线",
    mechanism:
      "4.4.2 pm分析在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.4.2 pm分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.3 installPackageWithVerification函数分析",
    stage: "复现正常轨迹",
    mechanism:
      "4.4.3 installPackageWithVerification函数分析在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.4.3 installPackageWithVerification函数分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.4 APK安装流程总结",
    stage: "注入单一故障",
    mechanism:
      "4.4.4 APK安装流程总结在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录排除只凭类名或流程图得出的结论。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.4.4 APK安装流程总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.4.5 Verification介绍",
    stage: "定位首个分叉",
    mechanism:
      "4.4.5 Verification介绍在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.4.5 Verification介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5 queryIntentActivities分析",
    stage: "恢复同输入重放",
    mechanism:
      "4.5 queryIntentActivities分析在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.5 queryIntentActivities分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.1 Intent及IntentFilter介绍",
    stage: "锁定历史基线",
    mechanism:
      "4.5.1 Intent及IntentFilter介绍在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.5.1 Intent及IntentFilter介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.2 Activity信息的管理",
    stage: "复现正常轨迹",
    mechanism:
      "4.5.2 Activity信息的管理在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.5.2 Activity信息的管理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.3 Intent匹配查询分析",
    stage: "注入单一故障",
    mechanism:
      "4.5.3 Intent匹配查询分析在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.5.3 Intent匹配查询分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.5.4 queryIntentActivities总结",
    stage: "定位首个分叉",
    mechanism:
      "4.5.4 queryIntentActivities总结在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录排除只凭类名或流程图得出的结论。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.5.4 queryIntentActivities总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.6 installd及UserManager介绍",
    stage: "恢复同输入重放",
    mechanism:
      "4.6 installd及UserManager介绍在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.6 installd及UserManager介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.6.1 installd介绍",
    stage: "锁定历史基线",
    mechanism:
      "4.6.1 installd介绍在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.6.1 installd介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.6.2 UserManager介绍",
    stage: "复现正常轨迹",
    mechanism:
      "4.6.2 UserManager介绍在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.6.2 UserManager介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.7 本章学习指导",
    stage: "注入单一故障",
    mechanism:
      "4.7 本章学习指导在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.7 本章学习指导的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "4.8 本章小结",
    stage: "定位首个分叉",
    mechanism:
      "4.8 本章小结在“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录排除只凭类名或流程图得出的结论。",
    probe:
      "使用扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录检查4.8 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷II / Android 4.0.1 / API 14"];
const stages = [
  "锁定历史基线",
  "复现正常轨迹",
  "注入单一故障",
  "定位首个分叉",
  "恢复同输入重放",
];
const model = {
  sourceTag: "android-4.0.1_r1",
  sourcePath: "platform/frameworks/base @ android-4.0.1_r1",
  invariant:
    "在android-4.0.1_r1固定输入下，追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "把安装简化为复制APK，忽略扫描次序、验证、持久状态和更新身份",
  evidence:
    "扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录",
  boundary:
    "追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态的第一个线程、进程、Binder、JNI或持久状态边界",
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
