import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLaimComponent } from './claim.component';

describe('CLaimComponent', () => {
  let component: CLaimComponent;
  let fixture: ComponentFixture<CLaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CLaimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CLaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
