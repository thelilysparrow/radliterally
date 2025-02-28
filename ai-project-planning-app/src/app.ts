import express from 'express';
import bodyParser from 'body-parser';
import { AIService } from './services/aiService';
import { ProjectPlanner } from './components';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const aiService = new AIService();
const projectPlanner = new ProjectPlanner();

app.post('/projects', (req, res) => {
    const projectData = req.body;
    const newProject = projectPlanner.createProject(projectData);
    res.status(201).json(newProject);
});

app.put('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const updatedData = req.body;
    const updatedProject = projectPlanner.updateProject(projectId, updatedData);
    res.json(updatedProject);
});

app.delete('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    projectPlanner.deleteProject(projectId);
    res.status(204).send();
});

app.get('/projects', (req, res) => {
    const projects = projectPlanner.renderProjects();
    res.json(projects);
});

app.post('/analyze', (req, res) => {
    const data = req.body;
    const analysis = aiService.analyzeData(data);
    res.json(analysis);
});

app.post('/generate-plan', (req, res) => {
    const projectDetails = req.body;
    const plan = aiService.generatePlan(projectDetails);
    res.json(plan);
});

app.get('/recommendations', (req, res) => {
    const recommendations = aiService.provideRecommendations();
    res.json(recommendations);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});