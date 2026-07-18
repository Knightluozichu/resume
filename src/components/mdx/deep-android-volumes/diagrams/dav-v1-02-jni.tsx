"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷I 第2章 深入理解JNI",focus:"以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界",nodes:["第2章 深入理解JNI","2.1 JNI概述","2.2 学习JNI的实例：MediaScanner","2.3 Java层的MediaScanner分析","2.3.1 加载JNI库","2.3.2 Java的native函数和总结","2.4 JNI层MediaScanner的分析","2.4.1 注册JNI函数","2.4.2 数据类型转换","2.4.3 JNIEnv介绍","2.4.4 通过JNIEnv操作jobject","2.4.5 jstring介绍","2.4.6 JNI类型签名介绍","2.4.7 垃圾回收","2.4.8 JNI中的异常处理","2.5 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
