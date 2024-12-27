/**
 * Returns true if the current URL matches the given pattern. Otherwise, returns false
 */
export function matchesUrl(currentUrl: string, urlToTest: string) {
  if (!currentUrl || !urlToTest) {
    return false
  }
  const matcher = new RegExp(`^${urlToTest.replace('*', '(.*)')}$`);
  return matcher.test(currentUrl)
}