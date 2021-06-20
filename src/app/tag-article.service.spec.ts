import { TestBed } from '@angular/core/testing';

import { TagArticleService } from './tag-article.service';

describe('TagArticleService', () => {
  let service: TagArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
