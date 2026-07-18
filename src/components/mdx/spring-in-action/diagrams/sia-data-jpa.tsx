/**
 * <SiaDataJpaDiagram>：Spring Data JPA 数据访问层次图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function SiaDataJpaDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Spring Data JPA数据访问层次图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="28"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Spring Data JPA——从Repository到数据库
          </text>

          {/* 分层架构 */}
          <rect
            x="120"
            y="55"
            width="500"
            height="44"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.10"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="370"
            y="74"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            Service 层
          </text>
          <text
            x="370"
            y="90"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            业务逻辑，调用 Repository
          </text>

          <text
            x="370"
            y="112"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>

          <rect
            x="120"
            y="120"
            width="500"
            height="44"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="370"
            y="139"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            Repository 接口（你只写接口，Spring 生成实现）
          </text>
          <text
            x="370"
            y="155"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            extends JpaRepository&lt;Entity, ID&gt;
          </text>

          <text
            x="370"
            y="177"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>

          <rect
            x="120"
            y="185"
            width="500"
            height="44"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.10"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="370"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            Spring Data JPA 运行时（动态代理生成实现类）
          </text>
          <text
            x="370"
            y="220"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            方法名解析 → JPQL → SQL
          </text>

          <text
            x="370"
            y="242"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>

          <rect
            x="120"
            y="250"
            width="500"
            height="44"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.10"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="370"
            y="269"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--danger)"
          >
            Hibernate（JPA 实现者）
          </text>
          <text
            x="370"
            y="285"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            实体 ↔ 表 映射，一级/二级缓存，脏检查
          </text>

          <text
            x="370"
            y="307"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>

          <rect
            x="120"
            y="315"
            width="500"
            height="44"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.08"
            stroke="var(--text-primary)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="370"
            y="334"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            数据库（MySQL / PostgreSQL）
          </text>
          <text
            x="370"
            y="350"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            表 / 行 / 外键
          </text>

          {/* 三种查询方式 */}
          <text
            x="370"
            y="390"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            三种查询定义方式
          </text>

          <rect
            x="30"
            y="405"
            width="215"
            height="95"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1"
          />
          <text
            x="137"
            y="425"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            方法名派生查询
          </text>
          <text
            x="137"
            y="443"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            findByEmailAndAge
          </text>
          <text
            x="137"
            y="461"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            findByOrderByDesc
          </text>
          <text
            x="137"
            y="481"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            简单查询零SQL
          </text>

          <rect
            x="262"
            y="405"
            width="215"
            height="95"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="370"
            y="425"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            @Query 自定义
          </text>
          <text
            x="370"
            y="443"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            @Query(&quot;JPQL&quot;)
          </text>
          <text
            x="370"
            y="461"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            nativeQuery=true
          </text>
          <text
            x="370"
            y="481"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            复杂查询/联表
          </text>

          <rect
            x="494"
            y="405"
            width="215"
            height="95"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="602"
            y="425"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            Specification
          </text>
          <text
            x="602"
            y="443"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            动态查询条件
          </text>
          <text
            x="602"
            y="461"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            Criteria API
          </text>
          <text
            x="602"
            y="481"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            运行时拼接条件
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Spring Data JPA——从Repository接口到数据库的五层架构，三种查询定义方式
      </figcaption>
    </figure>
  );
}
