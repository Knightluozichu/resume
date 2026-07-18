"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷III 第5章 深入理解Android输入系统",focus:"贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈",nodes:["第5章 深入理解Android输入系统","5.1 初识Android输入系统","5.1.1 getevent与sendevent工具","5.1.2 Android输入系统简介","5.1.3 IMS的构成","5.2 原始事件的读取与加工","5.2.1 基础知识：INotify与Epoll","5.2.2 InputReader的总体流程","5.2.3 深入理解EventHub","5.2.4 深入理解InputReader","5.2.5 原始事件的读取与加工总结","5.3 输入事件的派发","5.3.1 通用事件派发流程","5.3.2 按键事件的派发","5.3.3 DispatcherPolicy与InputFilter","5.3.4 输入事件的派发总结","5.4 输入事件的发送、接收与反馈","5.4.1 深入理解InputChannel","5.4.2 连接InputDispatcher和窗口","5.4.3 事件的发送","5.4.4 事件的接收","5.4.5 事件的反馈与发送循环","5.4.6 输入事件的发送、接收与反馈总结","5.5 关于输入系统的其他重要话题","5.5.1 输入事件ANR的产生","5.5.2 焦点窗口的确定","5.5.3 以软件方式模拟用户操作","5.6 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
