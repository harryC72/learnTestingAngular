import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';

describe('Heroes component', () => {
  let fixture;
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

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

    component = new HeroesComponent(mockHeroService);
  });

  it('should delete the indicated hero from the heroes list', () => {
    // arrange
    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = HEROES;

    // act
    component.deleteHero(HEROES[2]);

    // assert
    expect(component.heroes.length).toBe(2);
  });

  it('should call deleteHero with correct parameter', () => {
    // arrange
    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = HEROES;

    // act
    component.deleteHero(HEROES[2]);

    // assert
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
  });

  
});
