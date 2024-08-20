export class RateLimiter {
  private queue: [() => Promise<unknown>, (x: unknown) => void, (x: unknown) => void][];
  private timeout = 1000 / 2;
  private timer: ReturnType<typeof setInterval> | null;

  constructor() {
    this.queue = [];
    this.timer = null;
  }

  enqueue<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push([fn, resolve, reject]);
      setTimeout(() => this.ensureWorking(), 0);
    });
  }

  private ensureWorking() {
    if (this.timer != null) {
      return;
    }

    this.timer = setInterval(
      () => {
        if (!this.work()) {
          this.stop();
        }
      },
      this.timeout,
    );

    this.work();
  }

  private work() {
    const item = this.queue.shift();
  
    if (!item) {
      return false;
    }

    const [fn, resolve, reject] = item;
    
    fn()
      .then(resolve)
      .catch(reject);
    
    return true;
  }

  private stop() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
