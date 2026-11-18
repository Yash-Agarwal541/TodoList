const input = JSON.parse(require("fs").readFileSync(0, "utf8"));

const tool = input.tool_name || "unknown";

console.error(`[TaskFlow] Before tool execution: ${tool}`);