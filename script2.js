async function run(mutex, result) {
  console.log("Script 2 started");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const release = await mutex.lock();
  try {
    result.sum += 2;
    console.log("Script 2 finished");
  } finally {
    release();
  }
}

module.exports = run;
