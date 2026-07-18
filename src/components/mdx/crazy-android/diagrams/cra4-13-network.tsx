import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第13章 Android网络应用",
  "13.1 基于TCP协议的网络通信",
  "13.1.1 TCP协议基础",
  "13.1.2 使用ServerSocket创建TCP服务器端",
  "13.1.3 使用Socket进行通信",
  "13.1.4 加入多线程",
  "13.2 使用URL访问网络资源",
  "13.2.1 Android 9安全增强的URL",
  "13.2.2 使用URLConnection提交请求",
  "13.3 使用HTTP访问网络",
  "13.3.1 使用HttpURLConnection",
  "实例：多线程下载",
  "13.3.2 使用OkHttp",
  "实例：访问被保护资源",
  "13.4 使用WebView进行混合开发",
  "13.4.1 使用WebView浏览网页",
  "实例：迷你浏览器",
  "13.4.2 使用WebView加载HTML代码",
  "13.4.3 使用WebView中的JavaScript调用Android方法",
  "13.5 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第13章 Android网络应用" focus="比较TCP、URL、URLConnection、HTTP、OkHttp与WebView，处理线程、超时、证书和JavaScript边界" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第13章 Android网络应用" focus="比较TCP、URL、URLConnection、HTTP、OkHttp与WebView，处理线程、超时、证书和JavaScript边界" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第13章 Android网络应用" focus="协议合同、请求响应样本、超时取消、TLS/WebView安全测试和线程收敛记录" nodes={nodes} />; }
