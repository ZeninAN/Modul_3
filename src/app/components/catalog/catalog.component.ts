import {Component} from "@angular/core";
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: "catalog",
    imports: [
        CommonModule
      ],
    templateUrl: './catalog.component.html',
    standalone: true,
    styleUrl: './catalog.component.css'
})
export class CatalogComponent { 
    items: MenuItem[] = [
        {
          label: 'Каталог',
          icon: 'pi pi-chart-pie',
          routerLink: '/catalog',
        },
    ];
    constructor(private router : Router){
      
    }
    navigate() : void{
      this.router.navigate(['/cheque']);
    }
}
