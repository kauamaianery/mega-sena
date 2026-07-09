import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-numero-sorteado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './numero-sorteado.component.html',
  styleUrls: ['./numero-sorteado.component.css']
})
export class NumeroSorteadoComponent {
  @Input() numeros: number[] = [];
  @Input() loading = false;
  @Input() title = 'Seus números';

  formatNumero(value: number) {
    return value.toString().padStart(2, '0');
  }
}
