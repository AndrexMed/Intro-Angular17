import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {

  welcome = 'Bienvenido a mi primera aplicación con Angular';
  tasks = [
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio',
  ];

  name = signal('Giovanni');

  age = 18;
  disabled = false;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = {
    name: 'Nicolas',
    age: 18,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
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
}
