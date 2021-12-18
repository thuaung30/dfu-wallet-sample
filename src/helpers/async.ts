export function rejectAfterTimeout(
  time: number,
  label: string
): Promise<Error> {
  return new Promise((resolve, reject) =>
    setTimeout(
      () => reject(new Error(`${label}: Timeout after ${time} ms`)),
      time
    )
  );
}
