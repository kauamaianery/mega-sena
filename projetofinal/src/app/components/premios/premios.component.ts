import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaSenaService } from '../../services/mega-sena.service';
import { Premio } from '../../models/premio.model';

@Component({
  selector: 'app-premios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})
export class PremiosComponent implements OnInit {
  premios: Premio[] = [];
  activeIndex = signal(0);

  constructor(private service: MegaSenaService) {
    this.premios = this.service.premios;
  }

  ngOnInit() {
    setInterval(() => {
      this.activeIndex.set((this.activeIndex() + 1) % this.premios.length);
    }, 4000);
  }

  get premioAtual(): Premio {
    return this.premios[this.activeIndex()];
  }
}
