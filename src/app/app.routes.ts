import { Routes } from '@angular/router';
import {CatalogComponent} from "./pages/catalog/catalog.component";
import {ChequeComponent} from "./pages/cheque/cheque.component";

export const routes: Routes = [
    {
        component: CatalogComponent,
        path: './pages/catalog/catalog.component',
    },
    {
        component: ChequeComponent,
        path: './pages/cheque/cheque.component',
    },
];
