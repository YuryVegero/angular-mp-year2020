import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreComponent } from './load-more.component';
import { By } from '@angular/platform-browser';
import { click } from 'tests/unit';
import { DebugElement } from '@angular/core';

describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent;
  let fixture: ComponentFixture<LoadMoreComponent>;
  let loadMoreDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadMoreComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreComponent);
    component = fixture.componentInstance;
    loadMoreDebug = fixture.debugElement.query(By.css('.mp-load-more'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include wrapper', () => {
    expect(loadMoreDebug).toBeDefined();
  });

  it('should call onClick fn on click', () => {
    spyOn(component, 'onClick');

    const anchorDebug = loadMoreDebug.query(By.css('a'));
    click(anchorDebug);
    expect(component.onClick).toHaveBeenCalled();
  });

  it('should log on onClick call', () => {
    spyOn(console, 'log');
    component.onClick();
    expect(console.log).toHaveBeenCalled();
  });
});
