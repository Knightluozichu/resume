"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷III 第8章 深入理解Android壁纸",focus:"连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略",nodes:["第8章 深入理解Android壁纸","8.1 初识Android壁纸","8.2 深入理解动态壁纸","8.2.1 启动动态壁纸的方法","8.2.2 壁纸服务的启动原理","8.2.3 理解updateSurface()方法","8.2.4 壁纸的销毁","8.2.5 理解Engine的回调","8.3 深入理解静态壁纸——ImageWallpaper","8.3.1 获取用作静态壁纸的位图","8.3.2 静态壁纸位图的设置","8.3.3 连接静态壁纸的设置与获取——WallpaperObserver","8.4 WMS对壁纸窗口的特殊处理","8.4.1 壁纸窗口Z序的确定","8.4.2 壁纸窗口的可见性","8.4.3 壁纸窗口的动画","8.4.4 壁纸窗口总结","8.5 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
