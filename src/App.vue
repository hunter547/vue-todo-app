<template>
  <div>
    <md-card class="todo-card">
      <md-card-header>
        <div class="md-title">What Vue Gotta Do</div>
        <div class="md-subhead">Your personalized to do list</div>
      </md-card-header>
      <md-card-content>
        <md-field :class="{'md-invalid': errorMessage}">
          <md-input
            class="todo-input"
            v-model="currentTodo"
            @keydown.enter="addTodo()"
            placeholder="Add a todo">
          </md-input>
          <span class="md-error">Please enter a todo item</span>
        </md-field>
        <md-list class="todos">
          <draggable v-model="todos" group="list-items" :disabled="!dragAllowed" @start="drag=true" @end="drag=false">
          <md-list-item
            v-for="todo in todos"
            v-if="todo.edit===false"
            :key="todo.id"
            @dblclick="editTodo(todo, true)"
            :md-ripple="false"
            class="list-item"
            >
              <div class="todo-items">
                <md-checkbox v-model="todo.completed"></md-checkbox>
                <div class="todo-label" :class="{ completedTodo: todo.completed }">{{ todo.label }}</div>
              </div>
              <div class="list-item-actions">
                <md-button class="edit-button" @click="editTodo(todo, true)">
                  <md-icon class="edit-icon">edit</md-icon>
                </md-button>
                <md-button class="delete-button" @click="removeTodo(todo)">
                  <md-icon class="delete-icon">delete</md-icon>
                </md-button>
              </div>
          </md-list-item>
          <md-list-item v-else>
             <md-field>
               <md-input
                  class="edit-todo"
                  v-model="todo.label"
                  v-focus
                  @keydown.enter="editTodo(todo,false)"
                  @focusout="editTodo(todo,false)">
                </md-input>
              </md-field>
          </md-list-item>
          </draggable>
        </md-list>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data() {
    return {
      todos: [],
      currentTodo: '',
      errorMessage:false,
      dragAllowed:true
    };
  },
  methods: {
    addTodo() {
      if (this.currentTodo.length === 0){
        this.errorMessage = true;
      }
      else {
        this.errorMessage = false;
        this.todos.push({
          id: this.todos.length,
          label: this.currentTodo,
          completed: false,
          edit: false
        });
      }
      this.currentTodo = '';
    },
    removeTodo(todo) {
      this.errorMessage = false;
      todo.edit = false;
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    editTodo(todo, toggle){
      this.errorMessage = false;
      if (toggle){
        todo.edit = true;
        this.dragAllowed=false;
      }
      else {
        todo.edit = false;
        this.dragAllowed=true;
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
.completedTodo {
  text-decoration: line-through;
  color: lighten(black, 40%)
}
.md-button.edit-button.md-theme-default {
  color: rgba(78, 205, 196, 1);
  min-width: 3rem;
  max-width: 3rem;
}
.md-card-content {
  padding: 1rem 2.5rem !important;
}
.md-card-header {
  padding: 1rem 2.5rem !important;
}
.md-icon.md-icon-font.edit-icon.md-theme-default {
  color: rgba(78, 205, 196, 1);
}
.md-card.md-theme-default,
.md-field.md-theme-default,
.md-list.md-theme-default{
  background-color: rgb(12,24,36) !important;
}
.md-button.delete-button.md-theme-default {
  color: rgba(226, 106, 106, 1);
  min-width: 3rem;
  max-width: 3rem;
}
.md-icon.md-icon-font.delete-icon.md-theme-default {
  color: rgba(226, 106, 106, 1);
}
.md-list-item-content {
  padding-left: .8rem !important;
}
.md-title {
  font-weight: 600;
}
.edit-todo {
  font-size: 16px;
  font-family: times;
}
.md-list-item-container:not(.md-list-item-default):not([disabled])>.md-list-item-content:hover {
  cursor:all-scroll;
}

:root {
  --md-theme-default-primary: #81cfe0 !important;
  --md-theme-default-background-variant: rgb(13,37,61) !important;
}
.todo-card {
  border-radius: 1.5rem !important;
  margin: 2rem auto;
  width: 45%;
}
.todo-items {
  display: flex;
}
.todo-label {
  margin-top: 1rem;
  margin-left: .5rem;
  cursor: pointer;
}
</style>
