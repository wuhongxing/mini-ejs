const str = 'console.log("Hello world!", a, b)'

// 方式一: 使用 eval
// eval(str, 10, 20)

// 方式二: 使用 new Function 构造函数
// 问题一: 如何传参？使用 new Function("params", str)
const fun = new Function("a", "b", str)
fun(1, 2)
// 问题二: 多个参数使用对象传递
// 需要添加 with(obj) 拦截作用域
const fun1 = new Function("obj", `with(obj) ${str}`)
fun1({ a: 1, b: 2 })

// 测试 with 的代码
// var a = 10
// console.log(a)
// with ({ a: 20 }) {
//   console.log(a)
// }
