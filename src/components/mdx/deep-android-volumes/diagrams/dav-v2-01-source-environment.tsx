"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷II 第1章 搭建Android源码工作环境",focus:"在Android 4.0.1上建立源码下载、编译与system_process调试基线",nodes:["第1章 搭建Android源码工作环境","1.1 Android系统架构","1.2 搭建开发环境","1.2.1 下载源码","1.2.2 编译源码","1.2.3 利用Eclipse调试system_process","1.3 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
