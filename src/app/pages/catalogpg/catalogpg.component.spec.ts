import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogpgComponent } from './catalogpg.component';

describe('CatalogpgComponent', () => {
  let component: CatalogpgComponent;
  let fixture: ComponentFixture<CatalogpgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogpgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
