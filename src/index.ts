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
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body; // Pastikan 'name' ada di sini
    
    const newUser = await prisma.user.create({
      data: { 
        name: name,     // Pastikan ini terisi
        email: email, 
        password: password 
      },
    });
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error("DETAIL ERROR:", error);
    res.status(500).json({ error: "Gagal mendaftar" });
  }
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});