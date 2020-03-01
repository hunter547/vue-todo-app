<template>
  <div>
    <input v-model="currentTodo" @keydown.enter="addTodo()" placeholder="Add a todo">
    <ul class="todos">
      <li v-for="todo in todos" v-if="todo.edit===false" :key="todo.id" @dblclick="editTodo(todo, true)" :class="{ completedTodo: todo.completed }">
        {{ todo.label }} <input type="checkbox" @click="completeTodo(todo)"/><button @click="removeTodo(todo)">Delete</button>
      </li>
      <li v-else>
        <input
          class="edit-todo"
          v-model="todo.label"
          v-focus
          @keydown.enter="editTodo(todo,false)"
          @focusout="editTodo(todo,false)"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      currentTodo: ''
    };
  },
  methods: {
    addTodo() {
      this.todos.push({
        id: this.todos.length,
        label: this.currentTodo,
        completed: false,
        edit: false
      });
      this.currentTodo = '';
    },
    removeTodo(todo) {
      todo.edit = false;
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    editTodo(todo, toggle){
      if (toggle){
        todo.edit = true;
        todo.completed = false;
      }
      else {
        todo.edit = false;
      }
    },
    completeTodo(todo) {
      if (event.target.checked) {
        todo.completed = true
      }
      else {
        todo.completed = false;
      }
    }
  },
  directives: {
    focus: {
    inserted: function (el) {
      el.focus()
    }
  }
}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.edit-todo{
  font-size: 16px;
  font-family: times;
}
.completedTodo {
  text-decoration: line-through;
  color: lighten(black, 40%)
}
</style>
