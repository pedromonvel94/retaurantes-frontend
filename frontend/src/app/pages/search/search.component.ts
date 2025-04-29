import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    this.initMockData();
    this.filteredRestaurants = [...this.restaurants];
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

  private initMockData(): void {
    this.restaurants = [
      {
        id: 1,
        name: 'The Urban Kitchen',
        description:
          'A modern restaurant with a focus on fresh, locally-sourced ingredients. Our menu changes seasonally to provide the best dining experience.',
        address: '123 Main Street, Downtown',
        image:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      },
      {
        id: 2,
        name: 'Seaside Grill',
        description:
          'Enjoy the freshest seafood with stunning ocean views. Our chef specializes in traditional recipes with a modern twist.',
        address: '456 Ocean Drive, Beachfront',
        image:
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      },
      {
        id: 3,
        name: 'Italian Corner',
        description:
          'Authentic Italian cuisine made with imported ingredients and traditional recipes passed down through generations.',
        address: '789 Pasta Lane, Little Italy',
        image:
          'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      },
      {
        id: 4,
        name: 'Smokey BBQ House',
        description:
          'Slow-cooked meats and homemade sauces create the perfect BBQ experience in a rustic atmosphere.',
        address: '101 Smoke Street, Westside',
        image:
          'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmJxfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      },
      {
        id: 5,
        name: 'Sushi Revolution',
        description:
          'Contemporary Japanese cuisine with creative sushi rolls and traditional favorites in a sleek, modern setting.',
        address: '202 East Avenue, Downtown',
        image:
          'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3VzaGl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      },
      {
        id: 6,
        name: 'Spice Garden',
        description:
          'Authentic Indian flavors with a wide range of vegetarian and non-vegetarian options in a colorful, vibrant atmosphere.',
        address: '303 Curry Road, Northside',
        image:
          'https://images.unsplash.com/photo-1517244683847-7456b63c5969?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      },
    ];
  }
}
