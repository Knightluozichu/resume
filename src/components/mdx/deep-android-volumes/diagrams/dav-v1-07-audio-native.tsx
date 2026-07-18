"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷I 第7章 深入理解Audio系统",focus:"追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策",nodes:["第7章 深入理解Audio系统","7.1 概述","7.2 AudioTrack的破解","7.2.1 用例介绍","7.2.2 AudioTrack（Java空间）分析","7.2.3 AudioTrack（Native空间）分析","7.2.4 关于AudioTrack的总结","7.3 AudioFlinger的破解","7.3.1 AudioFlinger的诞生","7.3.2 通过流程分析AudioFlinger","7.3.3 audio_track_cblk_t分析","7.3.4 关于AudioFlinger的总结","7.4 AudioPolicyService的破解","7.4.1 AudioPolicyService的创建","7.4.2 重回AudioTrack","7.4.3 声音路由切换实例分析","7.4.4 关于AudioPolicy的总结","7.5 拓展思考","7.5.1 DuplicatingThread破解","7.5.2 单元测试、ALSA与Desktop check","7.6 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
