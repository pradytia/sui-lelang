# Sui Lelang

Proyek ini merupakan aplikasi lelang yang dibangun menggunakan teknologi modern untuk mendukung kemudahan dan fleksibilitas dalam penggunaannya. Proyek ini memanfaatkan:  
- **React Native** untuk frontend (FE) agar dapat dijalankan di perangkat Android.  
- **Express** sebagai backend framework yang ringan dan cepat.  
- **GraphQL** untuk query API yang efisien dan fleksibel.  
- **MongoDB** sebagai database berbasis dokumen.  
- **Docker** untuk containerisasi, sehingga lebih mudah dalam pengelolaan lingkungan aplikasi.  

## Instalasi

Pastikan Anda memiliki **Node.js** dan **Docker** yang sudah terinstal di sistem Anda.  

### Langkah Instalasi
1. Clone repository ini:
   ```bash
   git clone https://github.com/pradytia/sui-lelang.git
   cd sui-lelang

2. Instal dependencies untuk frontend:
   ```bash
   cd todo_sui_fe
   npm install
   npm run android

3. Instal dependencies untuk backend:
   ```bash
   cd todo_sui_be
   npm install
   npm run dev

### Menjalankan MongoDB dengan Docker

Untuk menjalankan MongoDB tanpa file `docker-compose.yml`, Anda bisa menggunakan perintah Docker berikut:

1. Jalankan MongoDB container:
   ```bash
   docker run -d --name mongodb -p 27017:27017 -v mongodb_data:/data/db mongo
