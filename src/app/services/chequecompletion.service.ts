import { Injectable } from '@angular/core';

export interface Contract {
  numcontract: number;
  username: string;
  machine: string;
  cost : number;
  status: string;
}
@Injectable({
  providedIn: 'root'
})


export class ContractService {
  constructor() {
    
  }
  storageKey = 'Contracts';
  machinePrices: { [key: string]: number } = {
    'macan': 7000000,
    '911': 9000000,
    'panamera': 6700000,
    'bmw4': 8000000,
    'bmw8': 11000000,
    'bmwx7': 7500000,
    'bmwz4': 12000000,
    'bmwm3': 5000000,
  };
  getMachinePrices(): { [key: string]: number } {
    return this.machinePrices;
  }

  loadLS(): Contract[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Ошибка загрузки из localStorage:', error);
      return []; 
    }
  }

  
  saveLS(contracts: Contract[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(contracts));
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error);
      alert('Ошибка сохранения данных!');
    }
  }
}
