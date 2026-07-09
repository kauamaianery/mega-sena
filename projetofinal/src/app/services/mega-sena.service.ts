import { Injectable, signal, computed } from '@angular/core';
import { Jogo } from '../models/jogo.model';
import { Premio } from '../models/premio.model';

const STORAGE_KEY = 'mega-sorte-historico';

@Injectable({ providedIn: 'root' })
export class MegaSenaService {
  private historicoValue = signal<Jogo[]>(this.readHistorico());
  historico = this.historicoValue.asReadonly();

  premios: Premio[] = [
    {
      concurso: 2890,
      valor: 'R$ 127.500.000,00',
      ganhadores: 2,
      data: '10/07/2026'
    },
    {
      concurso: 2889,
      valor: 'R$ 74.000.000,00',
      ganhadores: 0,
      data: '07/07/2026'
    },
    {
      concurso: 2888,
      valor: 'R$ 51.400.000,00',
      ganhadores: 1,
      data: '03/07/2026'
    },
    {
      concurso: 2887,
      valor: 'R$ 29.300.000,00',
      ganhadores: 5,
      data: '30/06/2026'
    },
    {
      concurso: 2886,
      valor: 'R$ 18.500.000,00',
      ganhadores: 10,
      data: '27/06/2026'
    }
  ];

  get jogosRecentes() {
    return this.historico();
  }

  sortearJogo(): Jogo {
    const jogo: Jogo = {
      numero: Array.from({ length: 60 }, (_, index) => index + 1)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6)
        .sort((a, b) => a - b)
        .map((value) => Number(value.toString().padStart(2, '0'))),
      data: new Date()
    };

    this.adicionarJogo(jogo);
    return jogo;
  }

  adicionarJogo(jogo: Jogo) {
    const historicoAtual = [jogo, ...this.historicoValue()];
    this.historicoValue.set(historicoAtual.slice(0, 5));
    this.saveHistorico();
  }

  limparHistorico() {
    this.historicoValue.set([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  private readHistorico(): Jogo[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as Jogo[];
      return parsed.map((jogo) => ({ ...jogo, data: new Date(jogo.data) }));
    } catch {
      return [];
    }
  }

  private saveHistorico() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.historicoValue()));
  }
}
