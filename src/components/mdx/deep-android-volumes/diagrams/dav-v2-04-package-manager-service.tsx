"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷II 第4章 深入理解PackageManagerService",focus:"追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态",nodes:["第4章 深入理解PackageManagerService","4.1 概述","4.2 初识PackageManagerService","4.3 PKMS的main函数分析","4.3.1 构造函数分析之前期准备工作","4.3.2 构造函数分析之扫描Package","4.3.3 构造函数分析之扫尾工作","4.3.4 PKMS构造函数总结","4.4 APK Installation分析","4.4.1 adb install分析","4.4.2 pm分析","4.4.3 installPackageWithVerification函数分析","4.4.4 APK安装流程总结","4.4.5 Verification介绍","4.5 queryIntentActivities分析","4.5.1 Intent及IntentFilter介绍","4.5.2 Activity信息的管理","4.5.3 Intent匹配查询分析","4.5.4 queryIntentActivities总结","4.6 installd及UserManager介绍","4.6.1 installd介绍","4.6.2 UserManager介绍","4.7 本章学习指导","4.8 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
