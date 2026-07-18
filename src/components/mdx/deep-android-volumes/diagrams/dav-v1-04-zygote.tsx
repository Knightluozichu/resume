"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷I 第4章 深入理解zygote",focus:"追踪app_process进入Java世界、SystemServer诞生与应用进程fork",nodes:["第4章 深入理解zygote","4.1 概述","4.2 zygote分析","4.2.1 AppRuntime分析","4.2.2 Welcome to Java World","4.2.3 关于zygote的总结","4.3 SystemServer分析","4.3.1 SystemServer的诞生","4.3.2 SystemServer的重要使命","4.3.3 关于SystemServer的总结","4.4 zygote的分裂","4.4.1 ActivityManagerService发送请求","4.4.2 有求必应之响应请求","4.4.3 关于zygote分裂的总结","4.5 拓展思考","4.5.1 虚拟机heapsize的限制","4.5.2 开机速度优化","4.5.3 Watchdog分析","4.6 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
