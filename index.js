let state = {
  toDos: [],
  completed: false,
};

const getToDos = () => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((res) => {
      state.toDos = res.data;
      render();
    })
    .catch((err) => {
      console.log(err);
      render();
    });
};

// const checkComplete = (toDo) => {
//   console.log("checkComplete called");
//   let check = document.getElementById("checkbox").checked;

//   if (check == true) {
//     toDo = true;
//   }
// };

const checkComplete = () => {
  console.log("checkComplete called");

  state.toDos.forEach((t) => {
    if (document.getElementById("checkbox").checked) {
      t.completed = true;
    } else {
      t.completed = false;
    }
  });
};

const renderCheckbox = (toDocheck) => {
  if (toDocheck == true) {
    return `<input type='checkbox' id='checkbox' name='completed' onchange='checkComplete()' checked>
            <label for='completed'>Completed</label>`;
  } else {
    return `<input type='checkbox' id='checkbox' name='completed' onchange='checkComplete()'>
            <label for='completed'>Completed</label>`;
  }
};

const renderToDo = (toDo) => {
  return `<div class = 'card'>
          <h3>${toDo.id}</h3>
          <p>task: ${toDo.title}</p>
          <p>user id: ${toDo.userId}</p>
          <p>${renderCheckbox(toDo.completed)}</p>`;
};

const renderToDos = () => {
  let toDoStringArray = state.toDos.map((toDo) => {
    return renderToDo(toDo);
  });

  return `<div class='grid'> ${toDoStringArray.join("")} </div>`;
};

const showComplete = () => {
  console.log("showComplete called");

  let filteredToDos = state.toDos.filter((i) => i.completed !== false);
  state.toDos = filteredToDos;
  render();
};

const showIncomplete = () => {
  console.log("showInomplete called");

  let filteredToDos = state.toDos.filter((i) => i.completed !== true);
  state.toDos = filteredToDos;
  render();
};

const render = () => {
  let htmlString = "<div>";
  htmlString += "<h2>To Do List</h2>";
  htmlString += "<button class='btn' onclick='getToDos()'>Show List</button>";
  htmlString +=
    "<button class='btn' onclick='showComplete()'>Show Completed Tasks</button>";
  htmlString +=
    "<button class='btn' onclick='showIncomplete()'>Show Incomplete Tasks</button>";
  htmlString += "</div>";

  htmlString += renderToDos();
  document.getElementById("app").innerHTML = htmlString;
};

render();
console.log("index loaded");

// Have a button that triggers a call to get your todos and displays them to your UI
// Have buttons that filter todos that are complete and are not complete
// Be able to toggle a todo being complete or not
// Be able to sort todos by title and/or userId
// Add some custom styles
// Add a reset button that doesn't need a new API call to reset todos
