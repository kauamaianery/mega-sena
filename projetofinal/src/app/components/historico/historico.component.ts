import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaSenaService } from '../../services/mega-sena.service';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {
  constructor(private service: MegaSenaService) {}

  get historico() {
    return this.service.historico;
  }

  get registros() {
    return this.historico();
  }

  limparHistorico() {
    if (!confirm('Deseja realmente limpar o histórico?')) {
      return;
    }
    this.service.limparHistorico();
  }
}
