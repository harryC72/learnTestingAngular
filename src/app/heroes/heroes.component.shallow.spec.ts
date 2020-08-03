import { HeroService } from './../hero.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Hero } from '../hero';
describe('Describes the HeroesComponent (ShallowTest)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  @Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();
  }

  HEROES = [
    { id: 1, name: 'Joe Strong', strength: 8 },
    { id: 2, name: 'Philip Danger', strength: 10 },
    { id: 3, name: 'Harry Bulk', strength: 22 },
  ];
  beforeEach(function () {
    HEROES = [
      { id: 1, name: 'Joe Strong', strength: 8 },
      { id: 2, name: 'Philip Danger', strength: 10 },
      { id: 3, name: 'Harry Bulk', strength: 22 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      //   schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it('should creat one li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const liCount = fixture.nativeElement.querySelectorAll('li').length;
    expect(liCount).toBe(3);
  });
});
