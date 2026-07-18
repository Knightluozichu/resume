import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第2章 数据模型与查询语言",
  focus:
    "从业务关系与访问模式比较关系、文档和图模型，并理解声明式查询如何分离意图与执行",
  invariant:
    "数据模型忠实表达关系与约束，查询接口允许实现演进，迁移后结果集合和业务语义一致",
  artifact: "领域关系图、查询工作负载、模型对照、迁移计划与结果对账",
  nodes: [
    "关系模型与文档模型",
    "NoSQL的诞生",
    "对象-关系不匹配",
    "多对一和多对多关系",
    "文档数据库是否重演历史",
    "当今关系型与文档数据库比较",
    "数据查询语言",
    "Web上的声明式查询",
    "MapReduce查询",
    "图状数据模型",
    "属性图",
    "Cypher查询语言",
    "SQL中的图查询",
    "三元组存储和SPARQL",
    "Datalog基础",
    "小结",
  ],
};

export function Ddi02DataModelsQueryLanguagesArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi02DataModelsQueryLanguagesFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi02DataModelsQueryLanguagesEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
