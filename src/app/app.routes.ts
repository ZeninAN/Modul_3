import { Routes } from '@angular/router';
import {CatalogpgComponent} from './pages/catalogpg/catalogpg.component';
import {ChequeComponent} from './components/cheque/cheque.component';
import {UserComponent} from './components/user/user.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full',
    },
    {
        component:CatalogpgComponent,
        path:'catalog', 
        
    },
    {
        component:ChequeComponent,
        path:'cheque', 
    },
    {
        component:UserComponent,
        path:'user', 
    },
    {
        component:ChequeComponent,
        path:'cheque/:id', 
    }
];
