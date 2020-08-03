import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './hero.component';

describe('HeroComponent Shallow', () => {
  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have a correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };

    expect(fixture.componentInstance.hero.name).toBe('SuperDude');
  });

  it('should render the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('a')).nativeElement.textContent
    ).toContain('SuperDude');
    expect(fixture.nativeElement.querySelector('a').textContent).toContain(
      'SuperDude'
    );
  });
});
