import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import paymentRoutes from './routes/payment.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); // Middleware para manejar JSON
app.use(express.urlencoded({ extended: true })); // Middleware para manejar datos URL-encoded

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'src/public')));

app.use(paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
