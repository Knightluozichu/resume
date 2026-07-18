import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "29. Browsing the Web and WebView",
  "One Last Bit of Flickr Data",
  "The Easy Way: Implicit Intents",
  "The Harder Way: WebView",
  "Proper Rotation with WebView",
  "WebView vs a Custom UI",
  "For the More Curious: Injecting JavaScript Objects",
  "For the More Curious: WebView Updates",
  "For the More Curious: Chrome Custom Tabs (Another Easy Way)",
  "Challenge: Using the Back Button for Browser History"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第29章 Browsing the Web and WebView" focus="在隐式浏览器、WebView、自定义UI和Custom Tabs间按信任边界选择，并处理旋转与历史" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第29章 Browsing the Web and WebView" focus="在隐式浏览器、WebView、自定义UI和Custom Tabs间按信任边界选择，并处理旋转与历史" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第29章 Browsing the Web and WebView" focus="URL策略、WebViewClient/WebChromeClient边界、旋转状态、后退历史和注入风险测试" nodes={nodes} />; }
