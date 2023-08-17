async function run(mutex, result) {
  console.log("Script 1 started");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const release = await mutex.lock();
  try {
    result.sum += 1;
    console.log("Script 1 finished");
  } finally {
    release();
  }
}

module.exports = run;
