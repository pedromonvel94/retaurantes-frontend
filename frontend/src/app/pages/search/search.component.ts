import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Restaurant interface
interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  image: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.http.get<Restaurant[]>('http://localhost:3000/listar').subscribe(
      (data) => {
        this.restaurants = data.map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          address: restaurant.address,
          image: restaurant.image,
        }));
        this.filteredRestaurants = [...this.restaurants];
      },
      (error) => {
        console.error('Error loading restaurants:', error);
      }
    );
  }

  filterRestaurants(): void {
    if (!this.searchTerm.trim()) {
      this.filteredRestaurants = [...this.restaurants];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredRestaurants = this.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(term)
    );
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.filteredRestaurants = [...this.restaurants];
  }
}
