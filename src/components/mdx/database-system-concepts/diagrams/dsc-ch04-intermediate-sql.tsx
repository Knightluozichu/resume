import { OfficialDatabaseSystemConceptsLab } from "./official-database-system-concepts-lab";

export function DscCh04IntermediateSqlArchitectureLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="architecture"
      unitTitle="第4章 中级SQL"
      part="第一部分 关系语言"
      medium="纸书正文"
      focus="把连接、视图、事务、约束、索引与授权组合成可维护的数据接口"
      invariant="视图不泄漏不该暴露的数据，约束在所有写路径生效，事务边界与授权边界一致"
      artifact="受控视图、约束反例集、事务脚本和最小权限矩阵"
      nodes={[
        "4.1 连接表达式",
        "4.2 视图",
        "4.3 事务",
        "4.4 完整性约束",
        "4.5 SQL数据类型与模式",
        "4.6 SQL中的索引定义",
        "4.7 授权",
        "4.8 小结",
      ]}
    />
  );
}

export function DscCh04IntermediateSqlExperimentLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="experiment"
      unitTitle="第4章 中级SQL"
      part="第一部分 关系语言"
      medium="纸书正文"
      focus="把连接、视图、事务、约束、索引与授权组合成可维护的数据接口"
      invariant="视图不泄漏不该暴露的数据，约束在所有写路径生效，事务边界与授权边界一致"
      artifact="受控视图、约束反例集、事务脚本和最小权限矩阵"
      nodes={[
        "4.1 连接表达式",
        "4.2 视图",
        "4.3 事务",
        "4.4 完整性约束",
        "4.5 SQL数据类型与模式",
        "4.6 SQL中的索引定义",
        "4.7 授权",
        "4.8 小结",
      ]}
    />
  );
}

export function DscCh04IntermediateSqlEvidenceLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="evidence"
      unitTitle="第4章 中级SQL"
      part="第一部分 关系语言"
      medium="纸书正文"
      focus="把连接、视图、事务、约束、索引与授权组合成可维护的数据接口"
      invariant="视图不泄漏不该暴露的数据，约束在所有写路径生效，事务边界与授权边界一致"
      artifact="受控视图、约束反例集、事务脚本和最小权限矩阵"
      nodes={[
        "4.1 连接表达式",
        "4.2 视图",
        "4.3 事务",
        "4.4 完整性约束",
        "4.5 SQL数据类型与模式",
        "4.6 SQL中的索引定义",
        "4.7 授权",
        "4.8 小结",
      ]}
    />
  );
}
