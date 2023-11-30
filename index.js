const fs = require("fs")

const content = fs.readFileSync("./index.ejs", { encoding: "utf-8" })

// 第一步转换: <div>{{name}}</div> -> return `<div>${name}</div>`
let temp =
  "let str = ''; with(obj) { str += `" +
  content.replace(/\{\%\=([^\}]+)\%\}/g, ($0, $1) => `\$\{${$1.trim()}\}`) +
  "`} return str"

/*
// 第二步转换
with(obj) { return `{% if (isShow) { %}
<div>${name}</div>
{% } else { %}
<div>age: ${age}</div>
{% } %}
`}
=====================
let str = ''
将 %{ 变为 `，将 %} 变为 str += `
with(obj) { return str += ``
if (isShow) {
  str += `<div>${name}</div>`
} else {
  str += `<div>age: ${age}</div>`
}
 str += ``
}
return str
*/
temp = temp.replace(/\{\%([^\%]+)\%\}/g, ($0, $1) => `\`\n${$1}str+=\``)

const build = (template, data) => {
  const fn = new Function("obj", template)
  return fn(data)
}
const res = build(temp, {
  name: "whx111",
  age: "100",
  isShow: true
})
fs.writeFileSync("./index.html", res)
