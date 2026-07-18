"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷I 第3章 深入理解init",focus:"从PID 1解析init.rc、启动service并建立属性服务",nodes:["第3章 深入理解init","3.1 概述","3.2 init分析","3.2.1 解析配置文件","3.2.2 解析service","3.2.3 init控制service","3.2.4 属性服务","3.3 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
