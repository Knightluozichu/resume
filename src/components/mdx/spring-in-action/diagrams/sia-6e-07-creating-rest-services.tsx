import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "7 Creating REST services",
  "7.1 Writing RESTful controllers",
  "7.1.1 Retrieving data from the server",
  "7.1.2 Sending data to the server",
  "7.1.3 Updating data on the server",
  "7.1.4 Deleting data from the server",
  "7.2 Enabling data-backed services",
  "7.2.1 Adjusting resource paths and relation names",
  "7.2.2 Paging and sorting",
  "7.3 Consuming REST services",
  "7.3.1 GETting resources",
  "7.3.2 PUTting resources",
  "7.3.3 DELETEing resources",
  "7.3.4 POSTing resource data",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第7章 创建REST服务" focus="设计资源、HTTP语义、状态码、分页、关系名和客户端错误处理，而不把控制器方法当RPC" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第7章 创建REST服务" focus="重放重复POST、过期版本PUT、删除不存在资源和超大分页，验证幂等与错误表示" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第7章 创建REST服务" focus="资源状态机、OpenAPI合同、条件请求测试、分页预算和客户端故障矩阵" nodes={nodes} />;
}
