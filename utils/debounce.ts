export function debounce(callback: (...value: any) => void, delay: number) {
  let timeout: number | undefined;

  return (...data: string[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      callback(...data);
    }, delay);
  };
}
