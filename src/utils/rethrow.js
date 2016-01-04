// Promise onRejected handler that rethrows the error, making sure
// the new Promise gets rejected as well.
export default (reason) => {
  throw reason;
};
