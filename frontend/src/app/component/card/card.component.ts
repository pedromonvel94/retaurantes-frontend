import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CardItem {
  id: number;
  name: string;
  description: string;
  address: string;
  image: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() cards: CardItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.cards.length === 0) {
      this.http.get<CardItem[]>('http://localhost:3000/listar').subscribe((data) => {
        this.cards = data;
      });
    }
  }
}

