const express = require('express');
const cors = require('cors');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());

// Читаємо нашу базу
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

// Налаштування Swagger
const swaggerDocument = {
  openapi: '3.0.0',
  info: { title: 'Flora API', version: '1.0.0' },
  paths: {
    '/api/bestsellers': { get: { summary: 'Get bestsellers', responses: { '200': { description: 'OK' } } } },
    '/api/bouquets': { get: { summary: 'Get all bouquets', responses: { '200': { description: 'OK' } } } },
    '/api/feedbacks': { get: { summary: 'Get feedbacks', responses: { '200': { description: 'OK' } } } }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Наші Ендпоінти
app.get('/api/bestsellers', (req, res) => res.json(data.bestsellers));
app.get('/api/bouquets', (req, res) => res.json(data.bouquets));
app.get('/api/feedbacks', (req, res) => res.json(data.feedbacks));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger Docs at http://localhost:${PORT}/api-docs`);
});