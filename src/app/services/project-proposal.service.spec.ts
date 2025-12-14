import { TestBed } from '@angular/core/testing';

import { ProjectProposalService } from './project-proposal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectProposalService', () => {
  let service: ProjectProposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule],});
    service = TestBed.inject(ProjectProposalService);
  });

  fit('frontend_project_proposal service should be created', () => {
    expect(service).toBeTruthy();
  });
});
