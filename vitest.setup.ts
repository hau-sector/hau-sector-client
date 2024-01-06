const originalConsoleError = console.error
const jsDomCssError = 'Error: Could not parse CSS stylesheet'
console.error = (...params: string[]) => {
  if (!params.find(p => p.toString().includes(jsDomCssError)))
    originalConsoleError(...params)
}
