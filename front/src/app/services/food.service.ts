import { Injectable } from '@angular/core';
import { Food } from './../shared/models';
import { sample_foods } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): Food[] {
    return sample_foods;
  }
}
