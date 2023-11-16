import { Component, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tasks } from '../../models/tasks.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  tasks = signal<Tasks[]>([]);

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

  filter = signal<'all' | 'pending' | 'completed'>('all')

  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(item => !item.completed)
    }
    if (filter === 'completed') {
      return tasks.filter(item => item.completed)
    }
    return tasks;
  })

  injector = inject(Injector);

  // constructor() {
  //   effect(() => {
  //     const tasks = this.tasks();
  //     localStorage.setItem("tasks", JSON.stringify(tasks))
  //     console.log('run effect')
  //   });
  // } ESTE METODO SE CONFIGURO PARA EJECUTARSE DESPUES DEL ONINIT SI ES NECESARIO...DE LO CONTRARIO SE EJECUTARIA PRIMERO

  ngOnInit(): void {
    const storage = localStorage.getItem("tasks");
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    console.log("OnInit")
    this.trackTasks();
  }

  trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem("tasks", JSON.stringify(tasks))
      console.log('run effect')
    }, { injector: this.injector });
  }

  changeHandler() {
    if (this.newTaskControl.valid) {
      const value = this.newTaskControl.value.trim();
      if (value !== '') {
        this.addTask(value)
        this.newTaskControl.setValue('')
      }
    } else {
      this.newTaskControl.markAllAsTouched();
    }
  }

  addTask(title: string) {
    const newTask: Tasks = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index))
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    });
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    });
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;

    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter)
  }
}
