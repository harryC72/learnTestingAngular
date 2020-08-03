import { FormsModule } from '@angular/forms';
import { HeroComponent } from './../hero/hero.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { Location } from '@angular/common';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService = jasmine.createSpyObj(['getHero', 'addHero']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };
    mockLocation = jasmine.createSpyObj(['back']);
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: 'SuperDude', strength: 100 })
    );
  });

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain(
      'SUPERDUDE'
    );
  });
});
