// Compare function for sorting todos by active/completed state.
// First active, then completed.
export default (todo1, todo2) => {
  const completed1 = todo1.completed;
  const completed2 = todo2.completed;
  if (completed1 === true && completed2 === false) {
    return 1;
  }
  if (completed1 === false && completed2 === true) {
    return -1;
  }
  return 0;
};
