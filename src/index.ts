import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 8080; // Railway biasanya pakai 8080

// Middleware wajib biar bisa terima data JSON dan akses dari frontend
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend PKL Tracker sudah jalan!');
});

// Endpoint untuk Registrasi User
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    
    res.status(201).json({ message: "User berhasil dibuat", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mendaftar" });
  }
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});