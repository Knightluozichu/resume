/**
 * <SiaSpringMvcDiagram>：Spring MVC 请求处理流程图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function SiaSpringMvcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Spring MVC请求处理流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Spring MVC——一次请求的完整旅程
          </text>

          {/* 流程：客户端 → DispatcherServlet → ... → 响应 */}
          <rect x="20" y="60" width="110" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="75" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">客户端</text>
          <text x="75" y="98" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">HTTP请求</text>

          <text x="140" y="90" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="155" y="60" width="140" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="225" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">DispatcherServlet</text>
          <text x="225" y="98" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">前端控制器（核心）</text>

          <text x="305" y="90" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="320" y="60" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="380" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">HandlerMapping</text>
          <text x="380" y="98" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">找哪个控制器</text>

          <text x="450" y="90" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="465" y="60" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="525" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">HandlerAdapter</text>
          <text x="525" y="98" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">执行控制器</text>

          <text x="595" y="90" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="610" y="60" width="115" height="50" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="667" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Controller</text>
          <text x="667" y="98" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@GetMapping等</text>

          {/* 第二行：返回流程 */}
          <text x="667" y="135" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">返回 ModelAndView / ResponseEntity</text>
          <text x="667" y="155" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="540" y="165" width="185" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="632" y="187" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">ViewResolver</text>
          <text x="632" y="203" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">视图名 → 模板（Thymeleaf）</text>

          <text x="530" y="195" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&larr;</text>

          <rect x="340" y="165" width="185" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="432" y="187" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">DispatcherServlet</text>
          <text x="432" y="203" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">渲染/组装响应</text>

          <text x="330" y="195" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&larr;</text>

          <rect x="155" y="165" width="170" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="240" y="187" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">客户端</text>
          <text x="240" y="203" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">HTTP响应（JSON/HTML）</text>

          {/* 注解分组 */}
          <text x="370" y="255" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">控制器常用注解</text>

          <rect x="30" y="270" width="160" height="100" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="110" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">请求映射</text>
          <text x="110" y="308" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@Controller</text>
          <text x="110" y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@RestController</text>
          <text x="110" y="336" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@RequestMapping</text>
          <text x="110" y="350" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@GetMapping/@PostMapping</text>

          <rect x="205" y="270" width="160" height="100" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="285" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">参数绑定</text>
          <text x="285" y="308" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@RequestParam</text>
          <text x="285" y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@PathVariable</text>
          <text x="285" y="336" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@RequestBody</text>
          <text x="285" y="350" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@RequestHeader</text>

          <rect x="380" y="270" width="160" height="100" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="460" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">响应处理</text>
          <text x="460" y="308" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@ResponseBody</text>
          <text x="460" y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ResponseEntity</text>
          <text x="460" y="336" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@ResponseStatus</text>
          <text x="460" y="350" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@ExceptionHandler</text>

          <rect x="555" y="270" width="160" height="100" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="635" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">跨域/校验</text>
          <text x="635" y="308" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@CrossOrigin</text>
          <text x="635" y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@Valid / @Validated</text>
          <text x="635" y="336" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@ControllerAdvice</text>
          <text x="635" y="350" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">全局异常处理</text>

          {/* RESTful 风格 */}
          <rect x="30" y="395" width="680" height="100" rx="8" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="418" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">RESTful 端点设计（HTTP方法语义化）</text>
          <text x="60" y="440" fontSize="11" fill="var(--success)">GET    /orders        </text>
          <text x="260" y="440" fontSize="11" fill="var(--text-secondary)">→ 查询订单列表</text>
          <text x="60" y="458" fontSize="11" fill="var(--warning)">POST   /orders        </text>
          <text x="260" y="458" fontSize="11" fill="var(--text-secondary)">→ 新建订单</text>
          <text x="60" y="476" fontSize="11" fill="var(--accent)">PUT    /orders/123    </text>
          <text x="260" y="476" fontSize="11" fill="var(--text-secondary)">→ 更新订单（整体替换）</text>
          <text x="430" y="440" fontSize="11" fill="var(--accent)">PATCH  /orders/123    </text>
          <text x="620" y="440" fontSize="11" fill="var(--text-secondary)">→ 部分更新</text>
          <text x="430" y="458" fontSize="11" fill="var(--danger)">DELETE /orders/123    </text>
          <text x="620" y="458" fontSize="11" fill="var(--text-secondary)">→ 删除订单</text>
          <text x="430" y="476" fontSize="11" fill="var(--text-primary)">GET    /orders/123    </text>
          <text x="620" y="476" fontSize="11" fill="var(--text-secondary)">→ 查询单个订单</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Spring MVC——DispatcherServlet为核心的请求处理流程，含控制器注解分组与RESTful端点设计
      </figcaption>
    </figure>
  );
}
