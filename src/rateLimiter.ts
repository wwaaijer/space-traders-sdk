export class RateLimiter {
  private queue: [() => Promise<unknown>, (x: unknown) => void, (x: unknown) => void][];
  private timer: ReturnType<typeof setInterval>;

  constructor() {
    this.queue = [];
    this.timer = setInterval(async () => {
      const item = this.queue.shift();

      if (!item) {
        return;
      }

      const [fn, resolve, reject] = item;
      try {
        resolve(await fn());
      } catch (error) {
        reject(error);
      }
    }, 1000 / 2);
  }

  run<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push([fn, resolve, reject]);
    });
  }

  stop() {
    clearInterval(this.timer);
  }
}
