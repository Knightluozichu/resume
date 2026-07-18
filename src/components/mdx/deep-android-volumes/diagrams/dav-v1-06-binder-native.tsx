"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷I 第6章 深入理解Binder",focus:"从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端",nodes:["第6章 深入理解Binder","6.1 概述","6.2 庖丁解MediaServer","6.2.1 MediaServer的入口函数","6.2.2 独一无二的ProcessState","6.2.3 时空穿越魔术——defaultServiceManager","6.2.4 注册MediaPlayerService","6.2.5 StartThreadPool和joinThreadPool分析","6.2.6 你彻底明白了吗","6.3 服务总管ServiceManager","6.3.1 ServiceManager的原理","6.3.2 服务的注册","6.3.3 ServiceManager存在的意义","6.4 MediaPlayerService和它的Client","6.4.1 查询ServiceManager","6.4.2 子承父业","6.5 拓展思考","6.5.1 Binder和线程的关系","6.5.2 死亡通知","6.5.3 匿名Service","6.6 学以致用","6.6.1 纯Native的Service","6.6.2 AIDL","6.7 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
