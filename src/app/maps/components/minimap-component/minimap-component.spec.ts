import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimapComponent } from './minimap-component';

describe('MinimapComponent', () => {
  let component: MinimapComponent;
  let fixture: ComponentFixture<MinimapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MinimapComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
