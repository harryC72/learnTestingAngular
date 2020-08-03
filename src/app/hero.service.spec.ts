import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MessageService } from './message.service';
import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;
  beforeEach(function () {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
      ],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
  });

  describe('getHero', () => {
    it('should call getHero with the correct url', () => {
      heroService.getHero(4).subscribe();
      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({
        id: 4,
        name: 'SuperDude',
        strength: 100,
      });
      httpTestingController.verify();
    });
  });
});
