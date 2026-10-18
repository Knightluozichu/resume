"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline } from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
type Protocol = "tcp" | "udp" | "sctp" | "ports";
type Fault = "none" | "first" | "last-ack" | "stream" | "path" | "collision";
type Service = "dns-udp" | "dns-tcp" | "http";
type Params = {
  protocol: Protocol;
  fault: Fault;
  bytes: number;
  capacity: number;
  wrap: boolean;
  service?: Service;
};
type Frame = {
  label: string;
  caption: string;
  left: string;
  right: string;
  packet?: string;
  detail?: string;
  direction?: "right" | "left";
  lost?: boolean;
  delivered?: boolean;
  wait?: number;
  path?: number;
  streamBlocked?: boolean;
};
const DEFAULT: Params = {
  protocol: "tcp",
  fault: "none",
  bytes: 6,
  capacity: 4,
  wrap: false,
  service: "dns-udp",
};
const NAMES: Record<Protocol, string> = {
  tcp: "TCP 字节流",
  udp: "UDP 数据报",
  sctp: "SCTP 多流",
  ports: "端点与分流",
};
const FAULTS: Record<Protocol, [Fault, string][]> = {
  tcp: [
    ["none", "无故障"],
    ["first", "首个 SYN 丢失"],
    ["last-ack", "最终 ACK 丢失"],
  ],
  udp: [
    ["none", "无故障"],
    ["first", "首个数据报丢失"],
  ],
  sctp: [
    ["none", "无故障"],
    ["stream", "流 0 消息丢失"],
    ["path", "主路径失效"],
  ],
  ports: [
    ["none", "不同远端端口"],
    ["collision", "重复四元组"],
  ],
};
const seq = (n: number) => n >>> 0;

/** Explicit application presets, not a probe of installed/listening services. */
export function transportServiceRoute(service: Service = "dns-udp") {
  return service === "http"
    ? { application: "HTTP/1.1", transport: "TCP", port: 80 }
    : {
        application: "DNS",
        transport: service === "dns-tcp" ? "TCP" : "UDP",
        port: 53,
      };
}

/** Visible reading coordinates are tied to actual geometry and events, not hidden tags. */
export function transportLesson(p: Params, frame: Frame) {
  const lessons: { title: string; observation: string }[] = [];
  if (p.protocol === "ports") {
    if (frame.label === "layer")
      lessons.push(
        {
          title: "2.1 概述",
          observation:
            "沿应用→socket→传输→IP 的纵向路径，指出 API 请求在哪里变成协议责任。socket 不是网卡，也不是远端处理成功的凭证。对应练习 3。",
        },
        {
          title: "2.2 总图",
          observation:
            "对照左右端点泳道与下方分层路径：IP 负责送向主机，传输端点负责分用，应用自己定义业务确认；不要把一个箭头读成全部责任。对应练习 3。",
        },
      );
    if (frame.label === "listener")
      lessons.push({
        title: "2.9 端口号",
        observation:
          "观察两个源端口与同一个 B:443。16 位字段只是端点的一部分；保留端口 0 和服务端口约定都不能替代连接身份。对应练习 3。",
      });
    if (frame.label === "demux")
      lessons.push({
        title: "2.10 TCP端口号与并发服务器",
        observation:
          "两条边进入不同已连接 socket，监听端点仍存在；切换重复四元组使第二条边冲突，而不是凭空创建第二条同身份连接。对应练习 3。",
      });
    if (frame.label === "service")
      lessons.push({
        title: "2.12 标准因特网服务",
        observation:
          "选择两个 DNS 预设：端口均为 53，高亮却经过不同协议空间。服务数据库的查询键包含协议；此图不是本机监听或身份认证证据。对应练习 3。",
      });
    if (frame.label === "application")
      lessons.push({
        title: "2.13 常见因特网应用的协议使用",
        observation:
          "从 DNS/UDP 切到 DNS/TCP，再切 HTTP/1.1/TCP：观察通道与目的端口分别变化。该 HTTP 预设是明文 TCP:80，不代表 HTTPS、HTTP/3 或所有部署。对应练习 3。",
      });
  } else if (p.protocol === "tcp") {
    if (["data", "data-ack", "reply", "reply-ack"].includes(frame.label))
      lessons.push({
        title: "2.4 传输控制协议（TCP）",
        observation:
          "每个数据格是一字节，ACK 指向下一个期望位置；切换回绕或字节数，核对 SYN/FIN 各消耗一个序号。短读留下尾部，不保留 write 的边界。对应练习 1、2。",
      });
    else if (frame.left === "TIME_WAIT")
      lessons.push({
        title: "2.7 TIME_WAIT状态",
        observation:
          "观察等待条长度与两端状态：最后 ACK 丢失时右端仍 LAST_ACK；重传 FIN 使左端重新等待 2×MSL。条长是模型余量，不是机器上的实时时钟。对应练习 1。",
      });
    else if (frame.label !== "closed")
      lessons.push({
        title: "2.6 TCP连接的建立和终止",
        observation:
          "沿报文方向核对两个端点：首个 SYN 丢失时右端仍 LISTEN；半关闭后左端 FIN_WAIT_2 与右端 CLOSE_WAIT 仍允许右向左的数据。对应练习 1。",
      });
  } else if (p.protocol === "udp") {
    lessons.push({
      title: "2.3 用户数据报协议（UDP）",
      observation:
        "外框是一条数据报。比较丢失、接收与下一条边界：发送不产生 UDP ACK，空数据报也不是 EOF；把读取容量缩小不会把尾部变成下一条消息。对应练习 2。",
    });
  } else if (["streams", "recovery"].includes(frame.label))
    lessons.push({
      title: "2.5 流控制传输协议（SCTP）",
      observation:
        "流 0 的 A/B 与流 1 的 C 分别排序；切换流内丢失和主路径失效，观察排队位置与路由连线的不同变化，多流不等于多宿主。对应练习 2。",
    });
  else
    lessons.push({
      title: "2.8 SCTP关联的建立和终止",
      observation:
        "按 INIT、Cookie 回显、确认逐步核对关联状态；关闭轨迹假设待发数据已确认，不允许把未排空数据跳成正常结束，也没有 TCP 式半关闭。对应练习 2。",
    });
  if (
    (p.protocol === "tcp" && frame.label === "data-ack") ||
    (p.protocol === "udp" && frame.label === "receive")
  )
    lessons.push({
      title: "2.11 缓冲区大小及限制",
      observation:
        "同样 6 B 输入、4 B 容量，数已复制格和剩余格：TCP 保留 2 B，UDP 丢弃 2 B。容量是单次用户空间大小，不是接收窗口或路径 MTU。对应练习 2。",
    });
  if (["closed", "next", "complete", "application"].includes(frame.label))
    lessons.push({
      title: "2.14 小结",
      observation:
        "保留末帧作反例：连接关闭不证明业务提交，消息边界不证明可靠，多流不证明备用路径可达。回到另一视图，用几何证据推翻一个错误推论。对应练习 3 的综合选型。",
    });
  return lessons;
}

/** Teaching trace, not a network stack. Frames report state AFTER each named event. */
export function buildTransportFrames(p: Params): Frame[] {
  const { protocol, fault, bytes } = p;
  if (protocol === "tcp") {
    const x = p.wrap ? 4294967294 : 1000;
    const next = seq(x + 1 + bytes);
    const f: Frame[] = [
      {
        label: "ready",
        caption: "初态：左端尚未主动打开；右端仅监听。",
        left: "CLOSED",
        right: "LISTEN",
      },
    ];
    f.push({
      label: "syn",
      caption:
        fault === "first"
          ? "SYN 在途中丢失：接收端仍 LISTEN，不会凭空进入 SYN_RCVD。"
          : "服务端收到 SYN 并发出 SYN+ACK，进入 SYN_RCVD。",
      left: "SYN_SENT",
      right: fault === "first" ? "LISTEN" : "SYN_RCVD",
      packet: "SYN",
      detail: `seq=${x}`,
      direction: "right",
      lost: fault === "first",
    });
    if (fault === "first")
      f.push({
        label: "retry",
        caption:
          "假设仅丢一次，重传定时器到期后重发相同 SYN；持续丢包仍可能连接失败。",
        left: "SYN_SENT",
        right: "SYN_RCVD",
        packet: "SYN 重传",
        detail: `seq=${x}`,
        direction: "right",
      });
    f.push(
      {
        label: "synack",
        caption:
          "左端收到 SYN+ACK 后进入 ESTABLISHED，并发出第三次 ACK；右端仍等它到达。",
        left: "ESTABLISHED",
        right: "SYN_RCVD",
        packet: "SYN + ACK",
        detail: `seq=5000 / ack=${seq(x + 1)}`,
        direction: "left",
      },
      {
        label: "established",
        caption: "第三次 ACK 到达右端，两端建立；纯 ACK 不消耗序号。",
        left: "ESTABLISHED",
        right: "ESTABLISHED",
        packet: "ACK",
        detail: `seq=${seq(x + 1)} / ack=5001`,
        direction: "right",
      },
      {
        label: "data",
        caption: bytes
          ? `发送 ${bytes} 字节后，累计 ACK=${next}。下方按应用读取容量取前缀；未读字节留在 TCP 队列，不丢弃。`
          : "长度为零：没有数据字节推进序号，图中不虚构数据报文。",
        left: "ESTABLISHED",
        right: "ESTABLISHED",
        packet: bytes ? `DATA ${bytes} B` : undefined,
        detail: bytes ? `seq=${seq(x + 1)} → ${seq(next - 1)}` : undefined,
        direction: "right",
        delivered: true,
      },
      {
        label: "data-ack",
        caption: `接收 TCP 确认到 ${next}，并不证明应用已读取这些字节。`,
        left: "ESTABLISHED",
        right: "ESTABLISHED",
        packet: bytes ? "ACK" : undefined,
        detail: `ack=${next}`,
        direction: "left",
        delivered: true,
      },
      {
        label: "fin",
        caption:
          "左端 shutdown(SHUT_WR) 发 FIN；右端收到后进入 CLOSE_WAIT。FIN 占一个序号。",
        left: "FIN_WAIT_1",
        right: "CLOSE_WAIT",
        packet: "FIN + ACK",
        detail: `seq=${next} / ack=5001`,
        direction: "right",
        delivered: true,
      },
      {
        label: "half-close",
        caption:
          "右端 ACK 到达：左端 FIN_WAIT_2，仍可接收右端数据；CLOSE_WAIT 等本地应用结束发送。",
        left: "FIN_WAIT_2",
        right: "CLOSE_WAIT",
        packet: "ACK",
        detail: `ack=${seq(next + 1)}`,
        direction: "left",
        delivered: true,
      },
      {
        label: "reply",
        caption: "半关闭期间右端仍发 3 字节响应；左端可读取，并确认至 5004。",
        left: "FIN_WAIT_2",
        right: "CLOSE_WAIT",
        packet: "DATA 3 B",
        detail: "seq=5001..5003",
        direction: "left",
        delivered: true,
      },
      {
        label: "reply-ack",
        caption: "左端只停止发送新应用数据，仍会发送协议 ACK。",
        left: "FIN_WAIT_2",
        right: "CLOSE_WAIT",
        packet: "ACK",
        detail: "ack=5004",
        direction: "right",
        delivered: true,
      },
      {
        label: "peer-fin",
        caption:
          "右端结束发送并发 FIN，进入 LAST_ACK；左端收到 FIN，发最终 ACK 并进入 TIME_WAIT。",
        left: "TIME_WAIT",
        right: "LAST_ACK",
        packet: "FIN + ACK",
        detail: "seq=5004",
        direction: "left",
        wait: 60,
      },
      {
        label: "final-ack",
        caption:
          fault === "last-ack"
            ? "最终 ACK 丢失：右端仍 LAST_ACK，不能标成 CLOSED。"
            : "最终 ACK 到达后右端 CLOSED，左端继续等待。",
        left: "TIME_WAIT",
        right: fault === "last-ack" ? "LAST_ACK" : "CLOSED",
        packet: "ACK",
        detail: "ack=5005",
        direction: "right",
        lost: fault === "last-ack",
        wait: 60,
      },
    );
    if (fault === "last-ack")
      f.push(
        {
          label: "fin-retry",
          caption: "右端超时重传同一个 FIN；左端重答 ACK，并重启 2×MSL 等待。",
          left: "TIME_WAIT",
          right: "LAST_ACK",
          packet: "FIN 重传",
          detail: "seq=5004",
          direction: "left",
          wait: 60,
        },
        {
          label: "ack-retry",
          caption:
            "这次 ACK 到达，右端才 CLOSED。计时条是教学模型，非操作系统实测。",
          left: "TIME_WAIT",
          right: "CLOSED",
          packet: "ACK",
          detail: "ack=5005",
          direction: "right",
          wait: 60,
        },
      );
    f.push(
      {
        label: "timewait",
        caption:
          "仅为算例设 MSL=30 秒：初始 60 秒；经过 30 秒后剩 30 秒。实际系统并非统一 60 秒。",
        left: "TIME_WAIT",
        right: "CLOSED",
        wait: 30,
      },
      {
        label: "closed",
        caption:
          "模型等待期届满，左端释放连接状态。图中省略了复位、同时打开/关闭及实现特有的复用规则。",
        left: "CLOSED",
        right: "CLOSED",
        wait: 0,
      },
    );
    return f;
  }
  if (protocol === "udp")
    return [
      {
        label: "ready",
        caption:
          "UDP 没有协议握手；本地 socket 仍有绑定、队列等状态，不是内核完全无状态。",
        left: "sendto",
        right: "recvfrom",
      },
      {
        label: "datagram",
        caption:
          fault === "first"
            ? "只模拟静默丢失：没有到达接收队列。UDP 不重传；其他错误可能通过 ICMP/本地 API 报告。"
            : `一个 ${bytes} 字节数据报到达；即使长度为零，也是一个有边界的数据报。`,
        left: "发送端",
        right: "接收队列",
        packet: `DATAGRAM ${bytes} B`,
        direction: "right",
        lost: fault === "first",
      },
      {
        label: "receive",
        caption:
          fault === "first"
            ? "此次丢失没有 UDP ACK。等待应由应用超时结束，不能推断下一条也丢失。"
            : `接收容量 ${p.capacity} B：复制 ${Math.min(bytes, p.capacity)} B，多出的 ${Math.max(0, bytes - p.capacity)} B 丢弃，不会留给下一次 recvfrom。`,
        left: "无协议 ACK",
        right: "一次接收",
        delivered: fault !== "first",
        lost: fault === "first",
      },
      {
        label: "next",
        caption:
          "下一次接收等待下一条数据报，而不是上一条的尾巴。零长度成功返回不等同 TCP EOF；close 没有 UDP 挥手。",
        left: "close 本地",
        right: "下一条边界",
        delivered: fault !== "first",
        lost: fault === "first",
      },
    ];
  if (protocol === "sctp")
    return [
      {
        label: "init",
        caption: "主动端 INIT；被动端不必立即为未验证对端分配完整关联状态。",
        left: "COOKIE_WAIT",
        right: "等待 Cookie",
        packet: "INIT",
        direction: "right",
        path: 1,
      },
      {
        label: "init-ack",
        caption: "INIT ACK 携带状态 Cookie；主动端回显后进入 COOKIE_ECHOED。",
        left: "COOKIE_ECHOED",
        right: "等待 Cookie",
        packet: "INIT ACK",
        direction: "left",
        path: 1,
      },
      {
        label: "cookie",
        caption: "有效 COOKIE ECHO 到达，被动端建立关联并发送 COOKIE ACK。",
        left: "COOKIE_ECHOED",
        right: "ESTABLISHED",
        packet: "COOKIE ECHO",
        direction: "right",
        path: 1,
      },
      {
        label: "cookie-ack",
        caption: "COOKIE ACK 到达主动端，两端建立。Cookie 不等于应用用户认证。",
        left: "ESTABLISHED",
        right: "ESTABLISHED",
        packet: "COOKIE ACK",
        direction: "left",
        path: 1,
      },
      {
        label: "streams",
        caption:
          fault === "stream"
            ? "流 0 的 A 丢失：同流的 B 等待 A；流 1 的 C 可独立交付。仍共享拥塞/接收资源，不保证零阻塞。"
            : fault === "path"
              ? "主路径失效：检测与重传后可走备用路径。本图省略检测时长，不承诺瞬时切换或并行复制。"
              : "A、B 属于流 0 的顺序，C 属于流 1；保留消息边界，不是一条 TCP 字节流。",
        left: "ESTABLISHED",
        right: "ESTABLISHED",
        packet: "DATA chunks",
        direction: "right",
        streamBlocked: fault === "stream",
        path: fault === "path" ? 2 : 1,
        delivered: true,
      },
      {
        label: "recovery",
        caption:
          "假设故障已恢复且有可用路径：缺失数据重传后，流内消息按序交付。多宿主改善可达性，不等于吞吐翻倍。",
        left: "ESTABLISHED",
        right: "ESTABLISHED",
        packet: "DATA / SACK",
        direction: "right",
        path: fault === "path" ? 2 : 1,
        delivered: true,
      },
      {
        label: "shutdown",
        caption:
          "假设两端待发数据已确认：发 SHUTDOWN。SCTP 不提供 TCP 式半关闭。",
        left: "SHUTDOWN_SENT",
        right: "SHUTDOWN_ACK_SENT",
        packet: "SHUTDOWN",
        direction: "right",
        path: 1,
      },
      {
        label: "shutdown-ack",
        caption: "SHUTDOWN ACK 到达，主动关闭端发送 SHUTDOWN COMPLETE。",
        left: "CLOSED",
        right: "SHUTDOWN_ACK_SENT",
        packet: "SHUTDOWN ACK",
        direction: "left",
        path: 1,
      },
      {
        label: "complete",
        caption:
          "SHUTDOWN COMPLETE 到达，被动端关闭；未确认数据需先排空，ABORT 属于另一条路径。",
        left: "CLOSED",
        right: "CLOSED",
        packet: "SHUTDOWN COMPLETE",
        direction: "right",
        path: 1,
      },
    ];
  return [
    {
      label: "layer",
      caption:
        "从应用到 socket，再到传输端点，最后由 IP 转发；路由器不需要维护这条 TCP 连接状态。",
      left: "应用",
      right: "IP 网络",
    },
    {
      label: "listener",
      caption:
        "服务端 B:443 监听；客户端 A:50000 与 A:50001 可共用服务端端口。端口不是连接唯一编号。",
      left: "A:50000",
      right: "B:443",
    },
    {
      label: "demux",
      caption:
        fault === "collision"
          ? "同一协议、同一命名空间内两个完全相同的四元组不能作为两条独立现存 TCP 连接；不能按进程名分流。"
          : "accept 得到不同已连接 socket；监听 socket 继续存在。远端端口不同足以区分这里的两条连接。",
      left: fault === "collision" ? "A:50000 ×2" : "A:50000/1",
      right: "B:443",
      lost: fault === "collision",
    },
    {
      label: "service",
      caption:
        "DNS 的 TCP 与 UDP 服务约定都使用端口 53，但分属不同协议空间；下方实线跟随所选预设，未选通道不表示正在监听。服务名与注册端口不认证内容。",
      left: "服务约定",
      right: `${transportServiceRoute(p.service).transport}:${transportServiceRoute(p.service).port}`,
    },
    {
      label: "application",
      caption: `${transportServiceRoute(p.service).application} 预设选择 ${transportServiceRoute(p.service).transport}:${transportServiceRoute(p.service).port}。不同应用版本或部署可采用其他协议与端口；这里只呈现明确选择，不推断现场服务。`,
      left: transportServiceRoute(p.service).application,
      right: `${transportServiceRoute(p.service).transport}:${transportServiceRoute(p.service).port}`,
    },
  ];
}

function Bytes({ p, frame }: { p: Params; frame: Frame }) {
  const visible = frame.delivered && !frame.lost;
  const copied = visible ? Math.min(p.bytes, p.capacity) : 0;
  return (
    <svg
      viewBox="0 0 320 330"
      role="img"
      aria-label={`独立固定读取边界算例：${p.protocol}，输入 ${p.bytes} 字节，容量 ${p.capacity} 字节；${visible ? `算例复制 ${copied} 字节，${p.protocol === "udp" ? "丢弃" : "未读"} ${p.bytes - copied} 字节` : "本帧未展示读取算例，不能据此判断接收队列为空"}。非持久接收队列；重复呈现不表示再次读取，也不表示反向 3 字节响应。`}
    >
      <text x="12" y="28">
        {p.protocol === "tcp" ? "TCP 固定读取算例" : "UDP 固定读取算例"}
      </text>
      <rect
        x="8"
        y="46"
        width="304"
        height="130"
        rx="8"
        fill="none"
        stroke={C.border}
      />
      {Array.from({ length: p.bytes }, (_, i) => (
        <rect
          key={i}
          x={16 + (i % 8) * 37}
          y={56 + Math.floor(i / 8) * 38}
          width="30"
          height="28"
          rx="3"
          fill={
            visible
              ? i < copied
                ? C.accent
                : p.protocol === "udp"
                  ? C.danger
                  : C.border
              : C.bg
          }
          stroke={C.border}
        />
      ))}
      <text x="12" y="210">
        算例 {p.bytes} B · 容量 {p.capacity} B
      </text>
      <rect
        x="12"
        y="230"
        width="288"
        height="18"
        fill="none"
        stroke={C.border}
      />
      <rect
        x="12"
        y="230"
        width={(copied / 24) * 288}
        height="18"
        fill={C.accent}
      />
      <text x="12" y="278">
        {visible ? `算例复制 ${copied} B` : "本帧未展示读取算例"}
      </text>
      <text x="12" y="310">
        {!visible
          ? "不能据此判断队列为空"
          : p.protocol === "udp"
            ? `算例丢弃 ${p.bytes - copied} B`
            : `算例未读 ${p.bytes - copied} B`}
      </text>
    </svg>
  );
}

function ServicePaths({ service }: { service?: Service }) {
  const route = transportServiceRoute(service);
  return (
    <svg
      viewBox="0 0 320 380"
      role="img"
      data-testid="transport-service-paths"
      data-transport={route.transport}
      data-port={route.port}
      aria-label={`${route.application} 通过 ${route.transport} 协议空间访问端口 ${route.port}；不是现场探测结果`}
    >
      <text x="160" y="25" textAnchor="middle">
        应用 → 协议空间 → 端点
      </text>
      <rect
        x="42"
        y="42"
        width="236"
        height="44"
        rx="6"
        fill="none"
        stroke={C.border}
      />
      <text x="160" y="70" textAnchor="middle">
        {route.application}
      </text>
      {(["TCP", "UDP"] as const).map((transport, i) => {
        const active = route.transport === transport;
        const x = i ? 238 : 82;
        const port = transport === "TCP" && service === "http" ? 80 : 53;
        return (
          <g key={transport}>
            <path
              d={`M160 86 L${x} 147 V247`}
              fill="none"
              stroke={active ? C.accent : C.border}
              strokeWidth={active ? 5 : 2}
              strokeDasharray={active ? undefined : "4 5"}
            />
            <rect
              x={x - 64}
              y="147"
              width="128"
              height="52"
              rx="6"
              fill={C.bg}
              stroke={active ? C.accent : C.border}
            />
            <text x={x} y="179" textAnchor="middle">
              {transport} 空间
            </text>
            <rect
              x={x - 64}
              y="247"
              width="128"
              height="64"
              rx="6"
              fill={C.bg}
              stroke={active ? C.accent : C.border}
            />
            <text x={x} y="272" textAnchor="middle">
              服务器 B
            </text>
            <text x={x} y="298" textAnchor="middle">
              端口 {port}
            </text>
            {active && (
              <path
                d={`M${x - 5} 236 l5 8 l5 -8`}
                fill="none"
                stroke={C.accent}
                strokeWidth="3"
              />
            )}
          </g>
        );
      })}
      <text x="12" y="343">
        实线：所选配置的路径
      </text>
      <text x="12" y="374">
        协议不同，同号也不合并
      </text>
    </svg>
  );
}

function Structure({ p, frame }: { p: Params; frame: Frame }) {
  if (
    p.protocol === "ports" &&
    ["service", "application"].includes(frame.label)
  )
    return <ServicePaths service={p.service} />;
  if (p.protocol === "sctp")
    return (
      <svg
        viewBox="0 0 320 380"
        role="img"
        aria-label="SCTP 两条消息流及主备路径；叉号表示故障或顺序等待"
      >
        <text x="12" y="26">
          消息流：各自维护顺序
        </text>
        {[0, 1].map((s) => (
          <g key={s}>
            <text x="12" y={68 + s * 62}>
              流{s}
            </text>
            <line
              x1="62"
              y1={64 + s * 62}
              x2="300"
              y2={64 + s * 62}
              stroke={C.border}
            />
          </g>
        ))}
        {[
          [90, 0, "A"],
          [200, 0, "B"],
          [90, 1, "C"],
        ].map(([x, s, label]) => (
          <g key={label}>
            <rect
              x={Number(x)}
              y={44 + Number(s) * 62}
              width="62"
              height="36"
              rx="5"
              fill={
                frame.delivered
                  ? frame.streamBlocked && s === 0
                    ? C.border
                    : C.accent
                  : C.bg
              }
              stroke={frame.streamBlocked && s === 0 ? C.danger : C.border}
            />
            <text
              x={Number(x) + 31}
              y={69 + Number(s) * 62}
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        ))}
        {frame.streamBlocked && (
          <text x="12" y="174" fill={C.danger}>
            A 丢失 → B 等待；C 可交付
          </text>
        )}
        <text x="12" y="210">
          多宿主：选择可用目的地址
        </text>
        <circle cx="45" cy="278" r="22" fill="none" stroke={C.border} />
        {[1, 2].map((n) => (
          <g key={n}>
            <line
              x1="67"
              y1="278"
              x2="245"
              y2={n === 1 ? 250 : 326}
              stroke={frame.path === n ? C.accent : C.border}
              strokeWidth={frame.path === n ? 5 : 2}
              strokeDasharray={
                p.fault === "path" && frame.path === 2 && n === 1
                  ? "5 5"
                  : undefined
              }
            />
            <circle
              cx="266"
              cy={n === 1 ? 250 : 326}
              r="22"
              fill="none"
              stroke={C.border}
            />
            <text x="266" y={n === 1 ? 256 : 332} textAnchor="middle">
              {n}
            </text>
          </g>
        ))}
        <text x="12" y="374">
          1 主路径 / 2 备用路径
        </text>
      </svg>
    );
  if (p.protocol === "ports")
    return (
      <svg
        viewBox="0 0 320 380"
        role="img"
        aria-label="应用/socket/传输/IP 层次与监听 socket、两条 TCP 四元组的分流关系"
      >
        {["应用", "socket", "TCP / UDP", "IP 转发"].map((s, i) => (
          <g key={s}>
            <rect
              x="86"
              y={12 + i * 51}
              width="148"
              height="36"
              rx="5"
              fill={frame.label === "layer" ? C.bg : C.border}
              stroke={C.border}
            />
            <text x="160" y={37 + i * 51} textAnchor="middle">
              {s}
            </text>
            {i < 3 && (
              <path
                d={`M160 ${48 + i * 51} v15 l-4 -5 m4 5 l4 -5`}
                fill="none"
                stroke={C.accent}
              />
            )}
          </g>
        ))}
        <text x="12" y="238">
          监听 B:443 保持存在
        </text>
        {[0, 1].map((i) => (
          <g key={i}>
            <text x="12" y={278 + i * 65}>
              A:{i === 1 && p.fault !== "collision" ? 50001 : 50000}
            </text>
            <line
              x1="112"
              y1={273 + i * 65}
              x2="215"
              y2={273 + i * 65}
              stroke={i && frame.lost ? C.danger : C.accent}
              strokeWidth="3"
            />
            <rect
              x="215"
              y={253 + i * 65}
              width="92"
              height="36"
              fill="none"
              stroke={C.border}
            />
            <text x="261" y={278 + i * 65} textAnchor="middle">
              {i && frame.lost ? "冲突" : `连接${i + 1}`}
            </text>
          </g>
        ))}
      </svg>
    );
  return <Bytes p={p} frame={frame} />;
}

function Scenario({ p, reset }: { p: Params; reset: () => void }) {
  const frames = useMemo(() => buildTransportFrames(p), [p]);
  const steps = useMemo(
    () => frames.map(({ label, caption }) => ({ label, caption })),
    [frames],
  );
  const clock = useRef({ value: 0 });
  const id = useId().replace(/:/g, "");
  const controls = useRef<HTMLDivElement>(null);
  const timeline = useTeachingTimeline({
    steps,
    build(tl) {
      frames.forEach((f, i) => {
        tl.label(f.label, i * TEACHING_BEAT_MS * 2);
        tl.add(
          clock.current,
          { value: [i, i + 1], duration: TEACHING_BEAT_MS * 2 },
          i * TEACHING_BEAT_MS * 2,
        );
      });
    },
  });
  // Shared controls hide their step list with aria-hidden. Repair only this instance.
  useEffect(() => {
    controls.current?.querySelector("ol")?.removeAttribute("aria-hidden");
  }, []);
  useEffect(() => {
    if (timeline.reducedMotion && timeline.isPlaying) timeline.pause();
  }, [timeline]);
  const f = frames[timeline.currentStep] ?? frames[0];
  const color = f.lost ? C.danger : C.accent;
  return (
    <div
      data-testid="transport-scene"
      data-step={f.label}
      data-step-index={timeline.currentStep}
      data-step-count={frames.length}
      data-playing={timeline.isPlaying}
      data-progress={timeline.progress}
      data-client-state={f.left}
      data-server-state={f.right}
      data-wait-seconds={f.wait ?? 0}
      data-timewait-msl-units={f.left === "TIME_WAIT" ? 2 : 0}
    >
      <aside
        className="transport-lesson"
        aria-label="当前几何对应的章节概念"
        data-testid="transport-lesson"
      >
        {transportLesson(p, f).map((lesson) => (
          <div key={lesson.title}>
            <h4>{lesson.title}</h4>
            <p>{lesson.observation}</p>
          </div>
        ))}
      </aside>
      <div className="transport-diagrams">
        <svg
          data-testid="transport-diagram"
          viewBox="0 0 320 380"
          role="img"
          aria-label={`${NAMES[p.protocol]}：${f.left} / ${f.right}；${f.caption}`}
        >
          <defs>
            <marker
              id={id}
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L7 3.5 L0 7Z" fill={color} />
            </marker>
          </defs>
          <text x="12" y="28">
            左端：主动连接/关闭
          </text>
          <text x="12" y="58">
            {f.left}
          </text>
          <text x="12" y="97">
            右端：被动端
          </text>
          <text x="12" y="127">
            {f.right}
          </text>
          <line x1="28" y1="150" x2="28" y2="275" stroke={C.border} />
          <line x1="292" y1="150" x2="292" y2="275" stroke={C.border} />
          {f.packet && (
            <g>
              <text x="160" y="180" textAnchor="middle">
                {f.packet}
              </text>
              <line
                x1={f.direction === "left" ? 284 : 36}
                y1="210"
                x2={f.lost ? 160 : f.direction === "left" ? 36 : 284}
                y2="240"
                stroke={color}
                strokeWidth="3"
                strokeDasharray={f.lost ? "6 5" : undefined}
                markerEnd={f.lost ? undefined : `url(#${id})`}
              />
              {f.lost && (
                <path
                  d="M150 230l20 20m0-20l-20 20"
                  stroke={C.danger}
                  strokeWidth="3"
                />
              )}
            </g>
          )}
          {f.wait !== undefined && (
            <g>
              <text x="12" y="304">
                等待模型：剩 {f.wait} 秒
              </text>
              <rect
                x="12"
                y="322"
                width="288"
                height="20"
                fill="none"
                stroke={C.border}
              />
              <rect
                x="12"
                y="322"
                width={(f.wait / 60) * 288}
                height="20"
                fill={C.accent}
              />
              <text x="12" y="370">
                假设 MSL=30s；非实测
              </text>
            </g>
          )}
          {f.wait === undefined && (
            <text x="12" y="324">
              一步 = 一个事件后的状态
            </text>
          )}
        </svg>
        <Structure p={p} frame={f} />
      </div>
      {f.detail && (
        <p className="transport-numbers" data-testid="transport-sequence">
          {f.detail}
        </p>
      )}
      <p role="status" className="transport-caption">
        {f.caption}
      </p>
      <div
        ref={controls}
        data-testid="transport-timeline-controls"
        className="transport-timeline"
      >
        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(
            frames.map((f) => [f.label, f.caption]),
          )}
          reset={{ label: "重置", onClick: reset }}
          caption="两端状态按事件推进；字节图是独立的固定输入、单次读取边界算例，非持久接收队列。重复呈现不表示再次读取，也不表示反向 3 B 响应；未展示算例不代表此前未读字节消失。播放时间不代表网络时间；减弱动态效果时可手动单步或拖动。"
        />
      </div>
    </div>
  );
}

export function UnpTransportHandshakeLab() {
  const [p, setP] = useState<Params>(DEFAULT);
  const [epoch, setEpoch] = useState(0);
  function update(patch: Partial<Params>) {
    setP((old) => ({ ...old, ...patch }));
  }
  function reset() {
    setP({ ...DEFAULT });
    setEpoch((e) => e + 1);
  }
  return (
    <figure
      data-testid="transport-lab"
      data-protocol={p.protocol}
      data-fault={p.fault}
      data-bytes={p.bytes}
      data-capacity={p.capacity}
      data-wrap={p.wrap}
      data-service={p.service}
      className="unp-transport-lab not-prose my-8 rounded-card border border-border"
    >
      <figcaption>
        <strong>传输层实验：序号、边界、消息流与端点</strong>
        <p>
          先预测：丢哪个报文会让谁停在哪个状态？先改变参数，再单步对照几何与状态。参数变化立即停止旧播放并回到新场景首帧。
        </p>
      </figcaption>
      <div
        className="transport-options"
        role="group"
        aria-label="传输协议与端点视图"
      >
        {(Object.keys(NAMES) as Protocol[]).map((protocol) => (
          <button
            key={protocol}
            type="button"
            aria-pressed={protocol === p.protocol}
            onClick={() => update({ protocol, fault: "none" })}
          >
            {NAMES[protocol]}
          </button>
        ))}
      </div>
      <label>
        故障/边界
        <select
          aria-label="故障/边界"
          value={p.fault}
          onChange={(e) => update({ fault: e.target.value as Fault })}
        >
          {FAULTS[p.protocol].map(([value, name]) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </label>
      {(p.protocol === "tcp" || p.protocol === "udp") && (
        <div className="transport-options">
          {(
            [
              ["bytes", "发送字节"],
              ["capacity", "应用读取容量"],
            ] as const
          ).map(([key, name]) => (
            <label key={key}>
              {name}（0–24）
              <input
                type="number"
                min="0"
                max="24"
                step="1"
                aria-label={name}
                value={p[key]}
                onChange={(e) =>
                  update({
                    [key]: Math.max(
                      0,
                      Math.min(24, Math.floor(Number(e.target.value) || 0)),
                    ),
                  })
                }
              />
            </label>
          ))}
          {p.protocol === "tcp" && (
            <button
              type="button"
              aria-pressed={p.wrap}
              onClick={() => update({ wrap: !p.wrap })}
            >
              序号回绕：{p.wrap ? "开" : "关"}
            </button>
          )}
        </div>
      )}
      {p.protocol === "ports" && (
        <div
          className="transport-options"
          role="group"
          aria-label="应用与服务预设"
        >
          {(
            [
              ["dns-udp", "DNS / UDP"],
              ["dns-tcp", "DNS / TCP"],
              ["http", "HTTP/1.1 / TCP"],
            ] as const
          ).map(([service, label]) => (
            <button
              key={service}
              type="button"
              aria-pressed={p.service === service}
              onClick={() => update({ service })}
            >
              {label}
            </button>
          ))}
          <p>
            选择预设后单步到 service /
            application，比较协议路径与端口；不是查询当前主机。
          </p>
        </div>
      )}
      <Scenario
        key={`${epoch}:${p.protocol}:${p.fault}:${p.bytes}:${p.capacity}:${p.wrap}:${p.service}`}
        p={p}
        reset={reset}
      />
      <p>
        边界说明：不模拟完整 TCP/SCTP 栈、拥塞算法或真实内核定时器。SCTP API
        是否可用取决于平台；有序流也不承诺跨流完全无阻塞。
      </p>
      <style jsx global>{`
        .unp-transport-lab {
          padding: 12px;
          min-width: 0;
          color: var(--text-primary);
        }
        .unp-transport-lab p {
          font-size: 14px;
          line-height: 1.65;
          overflow-wrap: anywhere;
        }
        .unp-transport-lab .transport-lesson {
          border-left: 3px solid var(--accent);
          padding-left: 12px;
          margin-top: 16px;
        }
        .unp-transport-lab .transport-lesson h4 {
          font-size: 16px;
          line-height: 1.5;
          margin: 12px 0 4px;
          overflow-wrap: anywhere;
        }
        .unp-transport-lab label {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 14px;
          min-width: 0;
        }
        .unp-transport-lab button,
        .unp-transport-lab input,
        .unp-transport-lab select {
          min-width: 44px;
          min-height: 44px;
          box-sizing: border-box;
        }
        .unp-transport-lab button,
        .unp-transport-lab select,
        .unp-transport-lab input[type="number"] {
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--bg);
          color: var(--text-primary);
          padding: 8px;
          max-width: 100%;
        }
        .unp-transport-lab button[aria-pressed="true"] {
          border-color: var(--accent);
          color: var(--accent);
        }
        .unp-transport-lab :focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .unp-transport-lab .transport-options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: end;
          margin: 12px 0;
        }
        .unp-transport-lab input[type="number"] {
          width: 120px;
        }
        .unp-transport-lab .transport-diagrams {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 12px;
          margin-top: 16px;
        }
        .unp-transport-lab svg {
          width: 100%;
          max-width: 420px;
          height: auto;
          display: block;
          margin: auto;
        }
        .unp-transport-lab svg text {
          font-size: 18px;
          fill: var(--text-primary);
        }
        .unp-transport-lab .transport-numbers {
          font-family: monospace;
          font-size: 14px;
        }
        .unp-transport-lab .transport-timeline ol button {
          width: 44px;
          height: 44px;
          padding: 0;
        }
        .unp-transport-lab .transport-timeline input[type="range"] {
          height: 44px;
          min-height: 44px;
          touch-action: pan-y;
        }
        .unp-transport-lab .transport-timeline > div > div {
          flex-wrap: wrap;
        }
        @media (min-width: 768px) {
          .unp-transport-lab .transport-diagrams {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </figure>
  );
}
