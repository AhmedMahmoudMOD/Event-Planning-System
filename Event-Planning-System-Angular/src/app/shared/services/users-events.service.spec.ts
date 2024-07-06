import { TestBed } from '@angular/core/testing';

import { UsersEventsService } from './users-events.service';

describe('UsersEventsService', () => {
  let service: UsersEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
