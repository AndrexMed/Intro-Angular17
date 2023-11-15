import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {

  welcome = 'Bienvenido a mi primera aplicación con Angular';
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio',
  ]);

  name = signal('Giovanni');

  age = 18;
  disabled = false;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = signal({
    name: 'Giovanni',
    age: 17,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });
  nameCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => console.log(value))
  }

  clickHanlder() {
    console.log("Hola mundo")
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value
    this.name.set(newValue)
  }

  inputValue = ''
  keydownHandler(event: KeyboardEvent) {
    const inputValue = event.target as HTMLInputElement;
    this.inputValue = inputValue.value
    console.log(this.inputValue)
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue)
      }
    })
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newName = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newName
      }
    })
  }
}
