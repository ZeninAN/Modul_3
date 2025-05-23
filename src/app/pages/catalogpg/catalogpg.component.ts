import { Component } from '@angular/core';
import {CatalogComponent} from '../../components/catalog/catalog.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-catalogpg',
  imports: [CatalogComponent, RouterOutlet],
  templateUrl: './catalogpg.component.html',
  standalone: true,
  styleUrl: './catalogpg.component.css'
})
export class CatalogpgComponent {

}
