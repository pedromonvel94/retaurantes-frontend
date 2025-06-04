import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  image: string;
  rating?: number; 
  priceRange?: number; 
  cuisineType?: string;   
  distance?: number;   
}

interface FilterOptions {
  minRating: number;
  priceRange: number[];
  selectedCuisines: string[];
  maxDistance: number;
  sortBy: string;
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
  
  cuisineTypes: string[] = ['Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'American', 'French', 'Thai'];
  
  sortOptions: {value: string, label: string}[] = [
    {value: 'name_asc', label: 'Name (A-Z)'},
    {value: 'name_desc', label: 'Name (Z-A)'},
    {value: 'rating_desc', label: 'Highest Rating'},
    {value: 'rating_asc', label: 'Lowest Rating'},
    {value: 'price_asc', label: 'Price (Low to High)'},
    {value: 'price_desc', label: 'Price (High to Low)'},
    {value: 'distance_asc', label: 'Distance (Near to Far)'}
  ];
  
  filters: FilterOptions = {
    minRating: 0,
    priceRange: [1, 2, 3, 4],
    selectedCuisines: [],
    maxDistance: 50,
    sortBy: 'name_asc'
  };
  
  showFilters: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.http.get<any[]>('http://localhost:3000/listar').subscribe(
      (data) => {
        this.restaurants = data.map((restaurant, index) => ({
          id: restaurant.id || index + 1,
          name: restaurant.name || `Restaurant ${index + 1}`,
          description: restaurant.description || 'A wonderful restaurant with delicious food.',
          address: restaurant.address || '123 Main St, Anytown',
          image: restaurant.image,
          rating: Math.floor(Math.random() * 5) + 1,
          priceRange: Math.floor(Math.random() * 4) + 1,
          cuisineType: this.cuisineTypes[Math.floor(Math.random() * this.cuisineTypes.length)],
          distance: Math.floor(Math.random() * 30) + 1
        }));
        this.applyFilters();
      },
      (error) => {
        console.error('Error loading restaurants:', error);
      }
    );
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  applyFilters(): void {
    // Start with text search
    let results = this.restaurants;
    
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      results = results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(term) ||
        restaurant.description.toLowerCase().includes(term) ||
        restaurant.cuisineType?.toLowerCase().includes(term)
      );
    }
    
    if (this.filters.minRating > 0) {
      results = results.filter(r => (r.rating || 0) >= this.filters.minRating);
    }
    
    if (this.filters.priceRange.length > 0 && this.filters.priceRange.length < 4) {
      results = results.filter(r => this.filters.priceRange.includes(r.priceRange || 1));
    }
    
    if (this.filters.selectedCuisines.length > 0) {
      results = results.filter(r => 
        r.cuisineType && this.filters.selectedCuisines.includes(r.cuisineType)
      );
    }
    
    results = results.filter(r => (r.distance || 0) <= this.filters.maxDistance);
    
    results = this.sortRestaurants(results);
    
    this.filteredRestaurants = results;
  }
  
  sortRestaurants(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => {
      switch(this.filters.sortBy) {
        case 'name_asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name_desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'rating_desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'rating_asc':
          return (a.rating || 0) - (b.rating || 0);
        case 'price_asc':
          return (a.priceRange || 0) - (b.priceRange || 0);
        case 'price_desc':
          return (b.priceRange || 0) - (a.priceRange || 0);
        case 'distance_asc':
          return (a.distance || 0) - (b.distance || 0);
        default:
          return 0;
      }
    });
  }
  
  updateRating(rating: number): void {
    this.filters.minRating = rating;
    this.applyFilters();
  }
  
  togglePriceFilter(price: number): void {
    const index = this.filters.priceRange.indexOf(price);
    if (index > -1) {
      this.filters.priceRange.splice(index, 1);
    } else {
      this.filters.priceRange.push(price);
    }
    this.applyFilters();
  }
  
  toggleCuisineFilter(cuisine: string): void {
    const index = this.filters.selectedCuisines.indexOf(cuisine);
    if (index > -1) {
      this.filters.selectedCuisines.splice(index, 1);
    } else {
      this.filters.selectedCuisines.push(cuisine);
    }
    this.applyFilters();
  }
  
  updateDistance(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filters.maxDistance = Number(input.value);
    this.applyFilters();
  }
  
  updateSort(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filters.sortBy = select.value;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filters = {
      minRating: 0,
      priceRange: [1, 2, 3, 4],
      selectedCuisines: [],
      maxDistance: 50,
      sortBy: 'name_asc'
    };
    this.applyFilters();
  }

  resetPriceRange(): void {
    this.filters.priceRange = [1, 2, 3, 4];
    this.applyFilters();
  }

  resetMaxDistance(): void {
    this.filters.maxDistance = 50;
    this.applyFilters();
  }

  resetPriceAndApply(price: number[]): void {
    this.filters.priceRange = price;
    this.applyFilters();
  }

  resetDistanceAndApply(distance: number): void {
    this.filters.maxDistance = distance;
    this.applyFilters();
  }
}
