const script1 = require("./script1.js");
const script2 = require("./script2.js");

class Mutex {
  constructor() {
    this._queue = [];
    this._locked = false;
  }

  lock() {
    if (this._locked) {
      const unlockPromise = new Promise((resolve) => {
        this._queue.push(resolve);
      });
      return unlockPromise;
    } else {
      this._locked = true;
      return Promise.resolve(() => this._unlock());
    }
  }

  _unlock() {
    if (this._queue.length > 0) {
      const nextResolve = this._queue.shift();
      nextResolve(() => this._unlock());
    } else {
      this._locked = false;
    }
  }
}

const mutex = new Mutex();
let result = {
  sum: 0,
};

async function main() {
  await Promise.all([
    script1(mutex, result),
    script2(mutex, result),
    script1(mutex, result),
    script2(mutex, result),
    script1(mutex, result),
    script2(mutex, result),
    script1(mutex, result),
    script2(mutex, result),
  ]);

  console.log("All scripts finished");
  console.log(`Total sum of all requests: ${result.sum}`);
}

main();
