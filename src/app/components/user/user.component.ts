import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { ContractService, Contract } from '../../services/chequecompletion.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  standalone: true,
  styleUrl: './user.component.css'
})
export class UserComponent {
  items: MenuItem[] = [
      {
        label: 'Лист',
        routerLink: '/user',
      },
    ];
    constructor(private router : Router){
    }
    move(): void {
      this.router.navigate(['/cheque']);
    }
    navigate(): void {
      this.router.navigate(['/catalog']);
    }
    users: Contract[] = [];
    localStorageKey = 'Contracts';
    

    ngOnInit(): void {
      this.loadContracts();
    }

    loadContracts() {
      const dataString = localStorage.getItem(this.localStorageKey);

      if (dataString) {
        try {
          const parsedData: Contract[] = JSON.parse(dataString);
          if (Array.isArray(parsedData)) {
            this.users = parsedData;
            console.log('Данные успешно загружены из localStorage:', this.users);
          } else {
            console.error('Ошибка: данные в localStorage не являются массивом.');
            this.users = []; 
          }
        } catch (error) {
          console.error('Ошибка при разборе JSON из localStorage:', error);
          this.users = []; 
        }
      } else {
        console.warn(`Данные по ключу '${this.localStorageKey}' в localStorage не найдены.`);
        this.users = []; 
      }
    }
    editContracts(chequeId:number) {
      this.router.navigate(['/cheque', chequeId]);
    }
  
    deleteContracts(numcontract: number) {
      console.log('Удалить покупателя с номером договора:', numcontract);
    this.users = this.users.filter(b => b.numcontract !== numcontract);
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.users));
    console.log('Данные в localStorage обновлены.');
    }
}
