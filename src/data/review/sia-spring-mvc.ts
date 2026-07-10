import type { ReviewQuestion } from "./types";

export const siaSpringMvcQuestions: ReviewQuestion[] = [
  {
    id: "sia-mvc-1",
    chapter: "sia-spring-mvc",
    level: 2,
    question: `描述 DispatcherServlet 处理一次请求的完整流程。`,
    answer:
      `①客户端发送 HTTP 请求到达 DispatcherServlet（前端控制器，拦截所有请求）；②DispatcherServlet 调用 HandlerMapping 查找处理该请求的控制器方法及拦截器链（根据 URL + HTTP 方法匹配 @RequestMapping）；③DispatcherServlet 调用 HandlerAdapter 适配执行控制器方法（处理参数绑定、@Valid 校验、@ResponseBody 序列化等）；④HandlerAdapter 反射调用控制器方法，@RequestParam/@PathVariable/@RequestBody 完成参数绑定；⑤控制器方法执行业务逻辑返回结果；⑥若有 @ResponseBody，HttpMessageConverter（如 Jackson）将返回值序列化为 JSON 写入响应体；⑦若无 @ResponseBody，ViewResolver 将视图名解析为模板渲染 HTML；⑧DispatcherServlet 将响应写回客户端。`,
    tags: ["DispatcherServlet", "请求流程"],
  },
  {
    id: "sia-mvc-2",
    chapter: "sia-spring-mvc",
    level: 3,
    question: `@RestController 和 @Controller 有什么区别？什么时候用哪个？`,
    answer:
      `@Controller 标记类为控制器，方法返回值默认被 ViewResolver 解析为视图名（渲染 HTML 模板）。@RestController = @Controller + @ResponseBody，每个方法的返回值直接通过 HttpMessageConverter（如 Jackson）序列化为 JSON/XML 写入响应体，不经过视图解析。用法：写 RESTful API（返回 JSON）用 @RestController；写传统 MVC（返回 HTML 页面）用 @Controller。混合场景：@Controller 类中需要返回 JSON 的方法单独加 @ResponseBody。注意 @RestController 的方法返回 String 时，这个 String 是 JSON 文本而非视图名。`,
    tags: ["控制器注解", "REST"],
  },
  {
    id: "sia-mvc-3",
    chapter: "sia-spring-mvc",
    level: 3,
    question: `如何设计一个 RESTful 的订单 API？列出端点和状态码。`,
    answer:
      `资源名用复数（/orders），HTTP 方法表达操作：GET /orders（列表，200）、GET /orders/{id}（单个，200 或 404）、POST /orders（新建，201 或 400 校验失败）、PUT /orders/{id}（整体更新，200 或 404）、PATCH /orders/{id}（部分更新，200 或 404）、DELETE /orders/{id}（删除，204 或 404）。嵌套资源：GET /orders/{id}/items（订单明细列表）。状态码：200 OK、201 Created、204 No Content、400 Bad Request、404 Not Found、409 Conflict、500 Internal Server Error。关键原则：URL 表达资源、HTTP 方法表达操作、状态码表达结果、GET 幂等可缓存、POST 不幂等。绝不用 POST /orderAction?action=xxx 混用所有操作。`,
    tags: ["RESTful", "端点设计"],
  },
  {
    id: "sia-mvc-4",
    chapter: "sia-spring-mvc",
    level: 4,
    question: `如何用 @ControllerAdvice 实现全局异常处理？为什么不在每个控制器里写 try-catch？`,
    answer:
      `@RestControllerAdvice（=@ControllerAdvice+@ResponseBody）+ @ExceptionHandler 集中把异常映射为 HTTP 响应。例如 @ExceptionHandler(OrderNotFoundException.class) 返回 ResponseEntity.status(404)，@ExceptionHandler(MethodArgumentNotValidException.class) 处理校验失败返回 400。不在每个控制器写 try-catch 的原因：①代码重复——同一异常在每个控制器都要 catch，违反 DRY；②不一致——不同控制器的错误响应格式可能不统一；③业务逻辑纠缠——异常处理代码混入业务方法降低可读性。@ControllerAdvice 集中管理后：统一错误响应格式（ErrorResult(code, message)）、统一状态码映射、业务方法只写业务逻辑。可定义兜底 @ExceptionHandler(Exception.class) 处理未预料异常返回 500，避免堆栈泄露给客户端。`,
    tags: ["全局异常处理", "ControllerAdvice"],
  },
];
