import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss'],
})
export class FoodPageComponent implements OnInit {
  food!: Food;

  constructor(
    private service: FoodService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.food = this.service.getFoodById(params['id']);
      }
    });
  }

  ngOnInit(): void {}
}
