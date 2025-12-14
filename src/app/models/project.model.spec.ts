import { Project } from './project.model';

describe('Project Model', () => {

  fit('frontend_project model should create an instance', () => {
    // Create a sample user object
    const project: Project = {
        status:'Completed'
    };

    expect(project).toBeTruthy();
    expect(project.status).toBe('Completed');

  });
});
