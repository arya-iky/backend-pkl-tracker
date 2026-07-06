import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint Registrasi yang sudah ter-update
app.post('/api/users', async (req, res) => {
  try {
    console.log("Data diterima dari Flutter:", req.body); // Untuk lihat apa yang dikirim
    
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || "SISWA",
        guru_uid: req.body.guru_uid,
        pkl_place_name: req.body.pkl_place_name,
        pkl_place_address: req.body.pkl_place_address,
        latitude: req.body.pkl_lat ? parseFloat(req.body.pkl_lat) : null,
        longitude: req.body.pkl_lng ? parseFloat(req.body.pkl_lng) : null,
      },
    });

    res.status(201).json({ message: "Sukses!", user: newUser });
  } catch (error: any) {
    // INI YANG PALING PENTING:
    console.error("DEBUG ERROR PRISMA:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: error.message }); // Kirim pesan error ke Flutter agar muncul di log
  }
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});