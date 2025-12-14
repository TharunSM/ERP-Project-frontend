import { ProjectProposal } from './projectProposal.model';

describe('Project Model', () => {

  fit('frontend_projectProposal model should create an instance', () => {
    // Create a sample user object
    const projectProposal: ProjectProposal = {
        status:'Accepted'
    };

    expect(projectProposal).toBeTruthy();
    expect(projectProposal.status).toBe('Accepted');

  });
});
