import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerConnectionPage } from './server-connection.page';

describe('ServerConnectionPage', () => {
  let component: ServerConnectionPage;
  let fixture: ComponentFixture<ServerConnectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerConnectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
