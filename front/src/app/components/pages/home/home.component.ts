import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(
    private service: FoodService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.foods = this.service.getAllFoodsBySearchTerm(params['searchTerm']);
      } else if (params['tag']) {
        this.foods = this.service.getAllFoodsByTag(params['tag']);
      } else {
        this.foods = this.service.getAll();
      }
    });
  }

  ngOnInit(): void {}
}
