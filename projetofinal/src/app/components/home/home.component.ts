import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaSenaService } from '../../services/mega-sena.service';
import { HistoricoComponent } from '../historico/historico.component';
import { NumeroSorteadoComponent } from '../numero-sorteado/numero-sorteado.component';
import { PremiosComponent } from '../premios/premios.component';
import { SobreComponent } from '../sobre/sobre.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NumeroSorteadoComponent, HistoricoComponent, PremiosComponent, SobreComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loading = signal(false);
  jogoAtual = signal<{ numero: number[]; data: Date } | null>(null);

  constructor(private service: MegaSenaService) {
    const historico = this.service.historico();
    if (historico.length) {
      this.jogoAtual.set(historico[0]);
    }
  }

  sortear() {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    setTimeout(() => {
      const jogo = this.service.sortearJogo();
      this.jogoAtual.set(jogo);
      this.loading.set(false);
    }, 3000);
  }

  formatNumero(value: number) {
    return value.toString().padStart(2, '0');
  }
}
