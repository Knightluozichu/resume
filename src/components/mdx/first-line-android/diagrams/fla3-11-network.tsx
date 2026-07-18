import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第11章 看看精彩的世界，使用网络技术",
  "11.1 WebView的用法",
  "11.2 使用HTTP访问网络",
  "11.3 解析XML格式数据",
  "11.4 解析JSON格式数据",
  "11.5 网络请求回调的实现方式",
  "11.6 最好用的网络库：Retrofit",
  "11.7 Kotlin课堂：使用协程编写高效的并发程序",
  "11.8 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第11章 看看精彩的世界，使用网络技术" focus="从WebView、HTTP、XML/JSON、回调、Retrofit到协程建立网络安全、取消、解析、错误和生命周期闭环" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第11章 看看精彩的世界，使用网络技术" focus="用同一API分别实现回调与协程请求，注入超时、断网、错误码、畸形数据和页面销毁验证取消与错误呈现" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第11章 看看精彩的世界，使用网络技术" focus="请求状态机、DTO与领域模型边界、超时重试策略、协程取消与生命周期测试" nodes={nodes} />; }
