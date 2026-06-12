import type { TaskStateModel } from '../models/TaskStateModel';

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL('./timerWorker.js', import.meta.url));
  }

  static getInstance(): TimerWorkerManager {
    if (!instance) {
      instance = new TimerWorkerManager();
    }
    return instance;
  }

  // 👇 Agora aceita tipagem estrita do modelo de Estado
  postMessage(message: TaskStateModel): void {
    this.worker.postMessage(message);
  }

  onmessage(cb: (e: MessageEvent) => void): void {
    this.worker.onmessage = cb;
  }

  terminate(): void {
    this.worker.terminate();
    instance = null;
  }
}