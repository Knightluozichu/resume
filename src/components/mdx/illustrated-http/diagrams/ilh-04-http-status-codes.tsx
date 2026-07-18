"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "第4章 返回结果的HTTP状态码",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "按2XX成功、3XX重定向、4XX客户端错误和5XX服务器错误解释原书列出的14个代表状态码",
  nodes: [
    "4.1 状态码告知从服务器端返回的请求结果",
    "4.2 2XX成功",
    "4.2.1 200 OK",
    "4.2.2 204 No Content",
    "4.2.3 206 Partial Content",
    "4.3 3XX重定向",
    "4.3.1 301 Moved Permanently",
    "4.3.2 302 Found",
    "4.3.3 303 See Other",
    "4.3.4 304 Not Modified",
    "4.3.5 307 Temporary Redirect",
    "4.4 4XX客户端错误",
    "4.4.1 400 Bad Request",
    "4.4.2 401 Unauthorized",
    "4.4.3 403 Forbidden",
    "4.4.4 404 Not Found",
    "4.5 5XX服务器错误",
    "4.5.1 500 Internal Server Error",
    "4.5.2 503 Service Unavailable",
  ],
  invariant:
    "只看状态码和相关首部就能判断请求是否完成、是否需要新请求、责任在客户端还是服务器，以及主体是否存在",
  failure:
    "只按百位背分类而忽略304无响应主体、401认证挑战、206范围和重定向方法变化，会让客户端做出错误后续动作",
  links: [
    {
      label: "状态码",
      mechanism: "服务器对请求处理结果给出的三位数字分类标记",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "成功",
      mechanism:
        "2XX类，表示请求被正常接收、理解和处理，但主体与语义仍因具体代码而异",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "重定向",
      mechanism: "3XX类，要求客户端结合Location或缓存验证器采取附加动作",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "客户端错误",
      mechanism: "4XX类，表示请求语法、认证、权限或目标资源存在问题",
      evidence: "缓存、会话或安全边界复核",
    },
  ],
  gates: [
    "首版目录节点与2014年技术边界",
    "原始请求行、状态行与首部",
    "主体边界、编码和表示元数据",
    "连接、中介、缓存或会话状态",
    "单变量失败与无副作用证明",
    "恢复、限制、责任人与复核人",
  ],
} as const;

export function Ilh04HttpStatusCodesFlowLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="flow"
    />
  );
}

export function Ilh04HttpStatusCodesExperimentLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="experiment"
    />
  );
}

export function Ilh04HttpStatusCodesEvidenceLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
