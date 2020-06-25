import { addNewTask, updateTask } from "./server";

(async function myFunc() {
  /* await addNewTask({
    name: "My new test Kanban Task",
    id: "12346",
  }); */

  await updateTask({
    name: "My UPDATED new test Kanban Task",
    id: "12346",
  });
})();
