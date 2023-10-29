const getUniqueId = (): string => {
      let id: string = ""

      const str: string = "1312e90mucqu93y48c7n8jgkasbcn7yqw9x,w8rasl";

      for (let i = 0; i < 10; i++)
            id += str[Math.floor(Math.random() * 10 % str.length)]

      return id
}

interface Todo {
      text: string,
      isCompleted: boolean,
      readonly id: string
}

let storage: string | null = localStorage.getItem("todo")
let todo: Todo[] = []


try {
      if (storage !== null) {
            const local_Storage: Todo[] = JSON.parse(storage)

            todo = [...local_Storage]
      }
}
catch (e) {
      todo = []
}


const GetTodoBox = (todo: Todo): HTMLDivElement => {

      const div1: HTMLDivElement = document.createElement("div")
      const div2: HTMLDivElement = document.createElement("div")
      const p: HTMLParagraphElement = document.createElement("p")
      const i: HTMLElement = document.createElement("i")
      const input: HTMLInputElement = document.createElement("input")

      div1.classList.add("todo")
      i.classList.add("bi")
      i.classList.add("bi-x-lg")
      input.type = "checkbox"

      if (todo.isCompleted) {
            input.setAttribute("checked", "")
      }

      i.addEventListener("click", () => {
            deleteTodo(todo.id)
      })

      input.addEventListener("change", () => {
            setCheckedTodo(todo.id)
      })

      p.textContent = todo.text;

      div2.insertAdjacentElement("beforeend", input)
      div2.insertAdjacentElement("beforeend", p)

      div1.insertAdjacentElement("beforeend", div2)
      div1.insertAdjacentElement("beforeend", i)

      return div1
      // return `<div class="todo">
      //             <div>
      //                   ${(todo.isCompleted) ? `<input type="checkbox" checked>` : `<input type="checkbox">`}
      //                   <p>${todo.text}</p>
      //             </div>
      //             <i class="bi bi-x-lg" onClick="deleteTodo(${todo.id})"></i>
      //       </div>`
}

// const todo: Todo[] = []




const deleteTodo = (id: string) => {
      let tempTodo: Todo[] = [...todo]

      tempTodo = tempTodo.filter((tod: Todo): boolean => {
            return tod.id !== id
      })

      todo = tempTodo
      updateEveryThing()
}


const setCheckedTodo = (id: string) => {
      let tempTodo: Todo[] = [...todo]

      for (let i = 0; i < todo.length; i++) {

            if (todo[i].id === id) {
                  const temp: Todo = {
                        ...todo[i],
                        isCompleted: !todo[i].isCompleted
                  }

                  tempTodo[i] = temp
                  break;
            }
      }

      todo = tempTodo
      console.log(todo);

      updateEveryThing()
}


const updateEveryThing = () => {
      const todoContainer = <HTMLDivElement>document.querySelector(".todo-container");

      if (!todo.length)
            todoContainer.innerHTML = "<h2>No Todo Present 😥</h2>"
      else
            todoContainer.innerHTML = ""

      todo.forEach((todos: Todo) => {
            todoContainer.insertAdjacentElement("beforeend", GetTodoBox(todos))
      })

      localStorage.setItem("todo", JSON.stringify(todo))
}


const addTodo = () => {
      const input = <HTMLInputElement>document.querySelector("form input");
      input.focus()

      if (!input.value.trim()) return;

      const newTodo: Todo = {
            text: input.value,
            id: getUniqueId(),
            isCompleted: false
      }

      todo.push(newTodo)
      updateEveryThing()
      input.value = ""
}


const form = <HTMLFormElement>document.querySelector("form");
form.addEventListener("submit", (e) => {
      e.preventDefault();

      addTodo()
})


const button = <HTMLButtonElement>document.querySelector("form button");
button.onclick = () => {

      addTodo()
}


updateEveryThing()