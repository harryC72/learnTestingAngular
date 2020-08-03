import { HeroComponent } from './../hero/hero.component';
import { HeroService } from './../hero.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
describe('Describes the HeroesComponent (DeepTest)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

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
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a hero component', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnIn
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentDEs.length).toBe(3);
    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toBe(HEROES[i]);
    }
  });

  //  VERSION 1 it(`should call heroService.deleteHero
  //     when the Hero Component's delete button is clicked`, () => {
  //     mockHeroService.getHeroes.and.returnValue(of(HEROES));
  //     spyOn(fixture.componentInstance, 'delete');

  //     // run ngOnIn
  //     fixture.detectChanges();

  //     const heroComponents = fixture.debugElement.queryAll(
  //       By.directive(HeroComponent)
  //     );
  //     heroComponents[0]
  //       .query(By.css('button'))
  //       .triggerEventHandler('click', { stopPropagation: () => {} });

  //     expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  //   });

  //  VERSION 2
  it(`should call heroService.deleteHero
    when the Hero Component's delete button is clicked`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    spyOn(fixture.componentInstance, 'deleteHero');

    // run ngOnIn
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    expect(fixture.componentInstance.deleteHero).toHaveBeenCalledWith(
      HEROES[0]
    );
  });

  it('should add a new hero to the heroes list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(
      of({
        id: 5,
        name: name,
        strength: 10,
      })
    );
    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement
      .textContent;

    expect(heroText).toContain(name);
  });
});
