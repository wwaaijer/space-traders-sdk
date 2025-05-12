export class RateLimiter {
  private queue: [() => Promise<unknown>, (x: unknown) => void, (x: unknown) => void][];
  
  private timeout1 = 1000 / 2; // Targeting 2 requests per second
  private timeout2 = 1000 / (30 / 60); // Targeting 30 requests per minute
  
  private timer1: ReturnType<typeof setInterval> | null;
  private timer2: ReturnType<typeof setInterval> | null;
  private timer2OffsetTimer: ReturnType<typeof setTimeout> | null;

  constructor() {
    this.queue = [];
  
    this.timer1 = null;
    this.timer2 = null;
    this.timer2OffsetTimer = null;
  }

  enqueue<T>(fn: () => Promise<T>): Promise<T> {
    setTimeout(() => this.ensureWorking(), 0); // Next tick
    return new Promise((resolve, reject) => this.queue.push([fn, resolve, reject]));
  }

  // Put an item for a retry at the front of the queue
  retry<T>(fn: () => Promise<T>): Promise<T> {
    setTimeout(() => this.ensureWorking(), 0); // Next tick
    return new Promise((resolve, reject) => this.queue.unshift([fn, resolve, reject]));
  }

  private ensureWorking() {
    if (this.timer1 != null) {
      return;
    }

    this.timer1 = setInterval(() => this.work(), this.timeout1);

    // Start the second timer in between the first and second request, weaving in the burst request between the normal requests
    this.timer2OffsetTimer = setTimeout(() => {
      this.timer2 = setInterval(() => this.work(), this.timeout2);
    }, this.timeout1 / 2);

    this.work();
  }

  private work() {
    const item = this.queue.shift();
  
    if (!item) {
      this.stop();
      return;
    }

    const [fn, resolve, reject] = item;
    
    fn()
      .then(resolve)
      .catch(reject);
  }

  private stop() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
    clearTimeout(this.timer2OffsetTimer);
  
    this.timer1 = null;
    this.timer2 = null;
    this.timer2OffsetTimer = null;
  }
}
