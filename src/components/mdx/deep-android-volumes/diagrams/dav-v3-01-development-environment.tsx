"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷III 第1章 开发环境部署",focus:"建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境",nodes:["第1章 开发环境部署","1.1 获取Android源代码","1.2 Android的编译","1.3 在IDE中导入Android源代码","1.3.1 将Android源代码导入Eclipse","1.3.2 将Android源代码导入SourceInsight","1.4 调试Android源代码","1.4.1 使用Eclipse调试Android Java源代码","1.4.2 使用gdb调试Android C/C++源代码","1.5 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
