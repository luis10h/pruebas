import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TablerIconsModule } from 'angular-tabler-icons';

interface cardimgs {
  id: number;
  time: string;
  imgSrc: string;
  title: string;
  views: string;
  category: string;
  comments: number;
  date: string;
  sexo: 'femenino' | 'masculino';
}

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    TablerIconsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './blog-card.component.html',
})
export class AppBlogCardsComponent implements OnInit {

  sexo: string = 'femenino';

  // Lista filtrable y lista original
  cardimgs: cardimgs[] = [];
  allCardimgs: cardimgs[] = [];

  imagenesPorId: { [key: number]: number } = {};
  trackById(index: number, item: cardimgs) {
    return item.id;
  }

  ngOnInit(): void {
    // Lista original
    this.allCardimgs = [
      {
        id: 1,
        time: 'Agregado hace 2 mins',
        imgSrc: '/assets/images/blog/LOGO-2.jpg',
        title: 'Luis Enrique',
        views: '9,125',
        category: 'Taxista',
        comments: 3,
        date: 'Mon, Dec 2025',
        sexo: 'masculino',
      },
      {
        id: 2,
        time: 'Agregado hace 2 mins',
        imgSrc: '/assets/images/blog/LOGO-2.jpg',
        title: 'Jose Rodriguez',
        views: '9,125',
        category: 'Taxista',
        comments: 3,
        date: 'Sun, Dec 2025',
        sexo: 'masculino',
      },
      {
        id: 3,
        time: 'Agregado hace 2 mins',
        imgSrc: '/assets/images/blog/LOGO-2.jpg',
        title: 'Jordano Gonzalez',
        views: '9,125',
        category: 'Taxista',
        comments: 12,
        date: 'Sat, Dec 2025',
        sexo: 'masculino',
      },
      {
        id: 4,
        time: 'Agregado hace 2 mins',
        imgSrc: '/assets/images/blog/LOGO-2.jpg',
        title: 'Paola Fernández',
        views: '9,125',
        category: 'Social',
        comments: 3,
        date: 'Mon, Dec 2025',
        sexo: 'femenino',
      },
      {
        id: 5,
        time: 'Agregado hace 2 mins',
        imgSrc: '/assets/images/blog/LOGO-2.jpg',
        title: 'María López',
        views: '9,125',
        category: 'Social',
        comments: 3,
        date: 'Mon, Dec 2025',
        sexo: 'femenino',
      },
      {
        id: 6,
        time: 'Agregado hace 2 mins',
        imgSrc: '/assets/images/blog/LOGO-2.jpg',
        title: 'Camila Torres',
        views: '9,125',
        category: 'Social',
        comments: 3,
        date: 'Mon, Dec 2025',
        sexo: 'femenino',
      },
    ];

    // Copiamos la lista completa para mostrar inicialmente
    this.cardimgs = [...this.allCardimgs];

    // Asignamos imágenes según el sexo
    for (let card of this.cardimgs) {
      let numeroAleatorio = 0;
      if (card.sexo === 'femenino') {
        const opciones = [2, 4, 10];
        numeroAleatorio = opciones[Math.floor(Math.random() * opciones.length)];
      } else {
        const opciones = [1, 3, 5, 6, 7, 8, 9];
        numeroAleatorio = opciones[Math.floor(Math.random() * opciones.length)];
      }
      this.imagenesPorId[card.id] = numeroAleatorio;
    }
  }

  buscar(bus: string): void {
    console.log('Buscando:', bus);

    if (bus && bus.trim() !== '') {
      this.cardimgs = this.allCardimgs.filter((card) =>
        card.title.toLowerCase().includes(bus.toLowerCase())
      );
    } else {
      // Restauramos todas las tarjetas si no hay texto
      this.cardimgs = [...this.allCardimgs];
    }
  }
}
