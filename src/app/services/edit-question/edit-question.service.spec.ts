import { TestBed } from '@angular/core/testing';

import { EditQuestionService } from './edit-question.service';

describe('EditQuestionService', () => {
  let service: EditQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
