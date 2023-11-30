console.log(
  "<div>{{name}}</div>".replace(/\{\{([^\}]+)\}\}/g, ($0, $1) => `${$1.trim()}`)
)
