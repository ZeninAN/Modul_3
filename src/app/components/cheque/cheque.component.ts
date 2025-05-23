import {MenuItem} from 'primeng/api';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractService } from '../../services/chequecompletion.service';
import { FormsModule }   from '@angular/forms'
import { ActivatedRoute,Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

export interface Contract {
  numcontract: number;
  username: string;
  machine: string;
  cost : number;
  status: string;
}
@Component({
  selector: 'cheque',
  imports: [ReactiveFormsModule, CommonModule,FormsModule ],
  templateUrl: './cheque.component.html',
  standalone: true,
  styleUrl: './cheque.component.css'
})
export class ChequeComponent {
  items: MenuItem[] = [
    {
      label: 'Договор',
      routerLink: '/cheque',
    },
  ];
  select() : void{
    this.router.navigate(['/user']);
  }
  signUpForm: FormGroup;
  storageKey = 'Contracts';
  editingNumContract: number | null = null; 
  isEditMode = false; 
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
  private machineValueChangesSubscription: Subscription | undefined; 

  constructor(private fb: FormBuilder,private router : Router,private route: ActivatedRoute ) {
    this.signUpForm = this.fb.group({
      numcontract: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      username: ['', Validators.required],
      machine: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      status: ['active', Validators.required]
    });
  }

  ngOnInit(): void {
    
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.editingNumContract = +idParam; 

      
      const contracts = this.loadLS();

      
      const recordToEdit = contracts.find(contract => contract.numcontract === this.editingNumContract);

      if (recordToEdit) {
        
        this.signUpForm.patchValue(recordToEdit);
        
        this.signUpForm.get('numcontract')?.disable(); 
      } else {
        
        console.error(`Запись с numcontract ${this.editingNumContract} не найдена.`);
        
        this.router.navigate(['/user']); 
      }
    } else {
      this.isEditMode = false;
      this.signUpForm.get('numcontract')?.enable();
    }
    this.machineValueChangesSubscription = this.signUpForm.get('machine')?.valueChanges.subscribe(selectedMachineValue => {
    this.updateCostBasedOnMachine(selectedMachineValue);
  });
    if (this.signUpForm.get('machine')?.value) {
      this.updateCostBasedOnMachine(this.signUpForm.get('machine')?.value);
    }
  }
  updateCostBasedOnMachine(selectedMachineValue: string | null): void {
    let cost = 0; 

    if (selectedMachineValue && this.machinePrices.hasOwnProperty(selectedMachineValue)) {
        cost = this.machinePrices[selectedMachineValue];
    } else {
       
       cost = 0; 
    }

    
    this.signUpForm.get('cost')?.setValue(cost, { emitEvent: false });
    console.log(`Выбрана машина: ${selectedMachineValue}, установлена цена: ${cost}`);
}



  ngOnDestroy(): void {
    this.machineValueChangesSubscription?.unsubscribe();
  }
  
  onSubmit(): void {
    if (this.signUpForm.invalid) {
     
      this.signUpForm.markAllAsTouched();
      console.warn('Форма невалидна');
      return;
    }

    const formData = this.signUpForm.getRawValue() as Contract;

    const existingData = this.loadLS();

    if (this.isEditMode) {
      const indexToUpdate = existingData.findIndex(contract => contract.numcontract === this.editingNumContract);

      if (indexToUpdate > -1) {
        existingData[indexToUpdate] = {
             ...formData, 
             numcontract: this.editingNumContract! 
        };

        this.saveLS(existingData);

        console.log('Данные записи успешно обновлены:', formData);
        alert('Данные обновлены успешно!'); 

        this.router.navigate(['/cheque']);

      } else {
         console.error(`Ошибка: Редактируемая запись с numcontract ${this.editingNumContract} не найдена для обновления.`);
         alert('Ошибка: Запись для обновления не найдена!');
         this.router.navigate(['/user']);
      }

    } else {
      const existingRecord = existingData.find(contract => contract.numcontract === formData.numcontract);
      if (existingRecord) {
          console.warn(`Запись с номером договора ${formData.numcontract} уже существует.`);
          alert(`Запись с номером договора ${formData.numcontract} уже существует!`);
          return; 
      }

      existingData.push(formData);

      this.saveLS(existingData);

      console.log('Новая запись успешно сохранена:', formData);
      alert('Данные сохранены успешно!'); 

      this.signUpForm.reset();
    }
  }

  private loadLS(): Contract[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Ошибка загрузки из localStorage:', error);
      return []; 
    }
  }

  
  private saveLS(contracts: Contract[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(contracts));
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error);
      alert('Ошибка сохранения данных!');
    }
  }

  
}
