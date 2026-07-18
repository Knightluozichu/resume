import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第5章 网络编程与网络框架",
  "5.1 网络分层",
  "5.2 TCP的三次握手与四次挥手",
  "5.3 HTTP协议原理",
  "5.3.1 HTTP简介",
  "5.3.2 HTTP请求报文",
  "5.3.3 HTTP响应报文",
  "5.3.4 HTTP的消息报头",
  "5.3.5 抓包应用举例",
  "5.4 HttpClient与HttpURLConnection",
  "5.4.1 HttpClient",
  "5.4.2 HttpURLConnection",
  "5.5 解析Volley",
  "5.5.1 Volley基本用法",
  "5.5.2 源码解析Volley",
  "5.6 解析OkHttp",
  "5.6.1 OkHttp基本用法",
  "5.6.2 源码解析OkHttp",
  "5.7 解析Retrofit",
  "5.7.1 Retrofit基本用法",
  "5.7.2 源码解析Retrofit",
  "5.8 本章小结"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="第5章 网络编程与网络框架" focus="从分层、TCP握手挥手和HTTP报文，走到HttpClient、HttpURLConnection、Volley、OkHttp与Retrofit的用法和源码链" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="第5章 网络编程与网络框架" focus="只比较网络库API是否简洁，不定义超时、取消、重试幂等、证书、错误体和生命周期所有权" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="第5章 网络编程与网络框架" focus="抓包、请求响应报文、超时与取消、重试边界、连接复用、缓存、转换器和调用链日志" nodes={nodes} />; }
