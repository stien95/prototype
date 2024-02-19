export function errorLength(
  name: string,
  length: number,
  problem: "min" | "max"
) {
  const verb = problem === "min" ? "at least" : "less than";
  const message = `${name} must be ${verb} ${length} characters long.`;
  return {
    message,
  };
}