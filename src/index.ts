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
    // req.body sekarang akan berisi semua data dari Flutter:
    // name, email, password, guru_uid, pkl_place_name, 
    // pkl_place_address, pkl_lat, pkl_lng
    
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || "SISWA", // Default ke SISWA
        guru_uid: req.body.guru_uid,
        pkl_place_name: req.body.pkl_place_name,
        pkl_place_address: req.body.pkl_place_address,
        latitude: parseFloat(req.body.pkl_lat), // Konversi ke Float
        longitude: parseFloat(req.body.pkl_lng), // Konversi ke Float
      },
    });

    res.status(201).json({ message: "User berhasil dibuat", user: newUser });
  } catch (error: any) {
    console.error("DETAIL ERROR:", error);
    
    // Memberikan pesan error yang jelas jika email sudah terdaftar
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Email sudah terdaftar!" });
    }
    
    res.status(500).json({ error: "Gagal menyimpan ke database" });
  }
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});