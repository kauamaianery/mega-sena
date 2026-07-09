import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = signal(false);

  menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Gerar Jogo', href: '#gerar' },
    { label: 'Últimos Jogos', href: '#ultimos-jogos' },
    { label: 'Premiações', href: '#premiacoes' },
    { label: 'Sobre', href: '#sobre' }
  ];

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
