import type { ReviewQuestion } from "./types";

export const cntWirelessMobileQuestions: ReviewQuestion[] = [
  {
    id: "cnt-wm-1",
    chapter: "cnt-wireless-mobile",
    level: 1,
    question: "WiFi为什么使用CSMA/CA而不是CSMA/CD？",
    answer: "WiFi使用CSMA/CA而非CSMA/CD的两个原因：①无法边发边听——WiFi发射信号强度远大于接收信号强度，发送时无法同时侦听碰撞 ②隐藏终端问题——A和C互相听不到但都能向B发送，即使载波侦听认为信道空闲仍会在B处碰撞，CSMA/CD无法检测。CSMA/CA通过碰撞避免（发送前等待DIFS、ACK确认丢失则重传）和RTS/CTS握手解决。SIFS比DIFS短，确保ACK和RTS/CTS等控制帧优先发送。",
    tags: ["CSMA/CA", "WiFi", "隐藏终端"],
  },
  {
    id: "cnt-wm-2",
    chapter: "cnt-wireless-mobile",
    level: 2,
    question: "隐藏终端和暴露终端问题是什么？RTS/CTS如何解决隐藏终端？",
    answer: "隐藏终端：A和C都能与B通信但互相听不到，当A和C同时向B发送时在B处碰撞但A和C无法检测，CSMA/CD失效。暴露终端：B能听到A发送（A→某人），B想向C发送但其实不影响A的接收，却不必要地等待，浪费频谱。RTS/CTS解决隐藏终端：发送方先发RTS（小帧）给AP，AP回复CTS广播给所有节点。隐藏终端C听到CTS后知道即将有传输，保持沉默。RTS/CTS是小帧，即使碰撞代价也小，后续数据帧无碰撞传输。暴露终端可通过RTS/CTS交互解决——B听到A的RTS但没听到对应的CTS，说明B发送不影响A。",
    tags: ["隐藏终端", "暴露终端", "RTS/CTS"],
  },
  {
    id: "cnt-wm-3",
    chapter: "cnt-wireless-mobile",
    level: 2,
    question: "移动IP的归属代理和转交地址是什么？三角路由问题是什么？",
    answer: "归属代理(HA)是移动节点归属网络中的路由器，维护移动节点的当前位置信息。转交地址是移动节点在外地网络中获得的临时IP地址，标识其当前位置。移动IP工作流程：移动节点在外地网络获得转交地址后向归属代理注册，通信对端发往永久地址的数据到达HA，HA通过隧道转发到转交地址再交付移动节点。三角路由问题：间接路由中即使通信对端就在移动节点附近，数据也必须先到HA再绕回来——直接路径是「对端→移动节点」，实际路径是「对端→HA→移动节点」。直接路由解决方案由对端直接隧道到当前位置，但需要对端支持移动性协议。",
    tags: ["移动IP", "归属代理", "转交地址", "三角路由"],
  },
  {
    id: "cnt-wm-4",
    chapter: "cnt-wireless-mobile",
    level: 3,
    question: "4G LTE相比3G有哪些架构改进？5G的关键技术是什么？",
    answer: "4G LTE相比3G的架构改进：①全IP扁平架构——取消电路交换，所有通信基于IP，减少网络层级 ②简化核心网——EPC（MME做移动管理、S-GW做数据锚点、P-GW连接外部网络） ③eNodeB直接互联——取消基站控制器层，降低延迟 ④OFDMA技术——提高频谱效率。5G的关键技术：①毫米波（mmWave）——高频段提供超大带宽 ②大规模MIMO——多天线提高容量和覆盖 ③网络切片——在同一基础设施上为不同应用（eMBB/URLLC/mMTC）提供定制化网络 ④边缘计算——将计算能力下沉到网络边缘降低延迟。",
    tags: ["4G LTE", "5G", "全IP架构", "网络切片"],
  },
];
