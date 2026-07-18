"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷I 第1章 阅读前的准备工作",focus:"建立Android 2.2四层架构、源码构建与阅读工具的统一坐标",nodes:["第1章 阅读前的准备工作","1.1 系统架构","1.1.1 Android系统架构","1.1.2 本书的架构","1.2 搭建开发环境","1.2.1 下载源码","1.2.2 编译源码","1.3 工具介绍","1.3.1 Source Insight介绍","1.3.2 Busybox的使用（部分印次正文误标1.3.3）","1.4 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
