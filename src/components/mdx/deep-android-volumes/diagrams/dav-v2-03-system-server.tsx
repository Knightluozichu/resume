"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷II 第3章 深入理解SystemServer",focus:"从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务",nodes:["第3章 深入理解SystemServer","3.1 概述","3.2 SystemServer分析","3.2.1 main函数分析","3.2.2 Service群英会","3.3 EntropyService分析","3.4 DropBoxManagerService分析","3.4.1 DBMS构造函数分析","3.4.2 dropbox日志文件的添加","3.4.3 DBMS和settings数据库","3.5 DiskStatsService和DeviceStorageMonitorService分析","3.5.1 DiskStatsService分析","3.5.2 DeviceStorageMonitorService分析","3.6 SamplingProfilerService分析","3.6.1 SamplingProfilerService构造函数分析","3.6.2 SamplingProfilerIntegration分析","3.7 ClipboardService分析","3.7.1 复制数据到剪贴板","3.7.2 从剪贴板粘贴数据","3.7.3 ClipboardService中的权限管理","3.8 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
