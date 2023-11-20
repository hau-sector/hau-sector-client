export function capCase(value: string): string {
  return value[0]?.toUpperCase() + value.slice(1)
}
