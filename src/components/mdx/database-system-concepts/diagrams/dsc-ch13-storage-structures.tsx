import { OfficialDatabaseSystemConceptsLab } from "./official-database-system-concepts-lab";

export function DscCh13StorageStructuresArchitectureLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="architecture"
      unitTitle="第13章 数据存储结构"
      part="第五部分 存储管理与索引"
      medium="纸书正文"
      focus="从记录布局、文件组织、目录和缓冲替换解释一行数据如何落页与被重新访问"
      invariant="记录边界与页指针在更新后有效，缓冲脏页遵守日志先行，列式与行式选择匹配工作负载"
      artifact="页剖面图、槽目录实验、缓冲命中轨迹和行列存储对照"
      nodes={[
        "13.1 数据库存储体系结构",
        "13.2 文件组织",
        "13.3 文件中的记录组织",
        "13.4 数据字典存储",
        "13.5 数据库缓冲区",
        "13.6 列式存储",
        "13.7 内存数据库的存储组织",
        "13.8 小结",
      ]}
    />
  );
}

export function DscCh13StorageStructuresExperimentLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="experiment"
      unitTitle="第13章 数据存储结构"
      part="第五部分 存储管理与索引"
      medium="纸书正文"
      focus="从记录布局、文件组织、目录和缓冲替换解释一行数据如何落页与被重新访问"
      invariant="记录边界与页指针在更新后有效，缓冲脏页遵守日志先行，列式与行式选择匹配工作负载"
      artifact="页剖面图、槽目录实验、缓冲命中轨迹和行列存储对照"
      nodes={[
        "13.1 数据库存储体系结构",
        "13.2 文件组织",
        "13.3 文件中的记录组织",
        "13.4 数据字典存储",
        "13.5 数据库缓冲区",
        "13.6 列式存储",
        "13.7 内存数据库的存储组织",
        "13.8 小结",
      ]}
    />
  );
}

export function DscCh13StorageStructuresEvidenceLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="evidence"
      unitTitle="第13章 数据存储结构"
      part="第五部分 存储管理与索引"
      medium="纸书正文"
      focus="从记录布局、文件组织、目录和缓冲替换解释一行数据如何落页与被重新访问"
      invariant="记录边界与页指针在更新后有效，缓冲脏页遵守日志先行，列式与行式选择匹配工作负载"
      artifact="页剖面图、槽目录实验、缓冲命中轨迹和行列存储对照"
      nodes={[
        "13.1 数据库存储体系结构",
        "13.2 文件组织",
        "13.3 文件中的记录组织",
        "13.4 数据字典存储",
        "13.5 数据库缓冲区",
        "13.6 列式存储",
        "13.7 内存数据库的存储组织",
        "13.8 小结",
      ]}
    />
  );
}
