import { Component, useState, useRef, onMounted } from "@odoo/owl";
import { useAutofocus                           } from "./utils";
import { TodoItem } from "./todoitem";

export class TodoList extends Component {
   static template = "awesome_owl.TodoList";
   static components = { TodoItem };
   addTodo (event) {
      if (event.keyCode === 13 && event.target.value !== "") {
         this.todos.push ({id : this.todos.length + 1, description : event.target.value.trim(), isCompleted : false});
         event.target.value = "";
      }
   }
   setup () {
      this.todos = useState([]);
      useAutofocus ('input_ref');
      /*
      this.todos = useState([
         { id: 1, description: "buy milk", isCompleted: false },
         { id: 2, description: "buy bread", isCompleted: true },
         { id: 3, description: "buy newspaper", isCompleted: false },
         { id: 4, description: "buy wine", isCompleted: true },
      ]);
      */
   }
}

