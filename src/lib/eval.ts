import SafeExpression from "safe-expression";

const libExecute = SafeExpression();

export function safeExecute(expr: string, fallback: number = 0) {
  try {
    let c = libExecute(expr)();
    if (isFinite(c) && !isNaN(c)) {
      return c;
    } else {
      return fallback;
    }
  } catch (e) {
    return fallback;
  }
}


export function execute(expr: string) {
    return libExecute(expr)();
}