// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const nguoiDungRoutes = require("../b_routes/nguoidung");
const authRoutes = require("../b_routes/auth");
const hosoNguoidungRoutes = require("../b_routes/hoso_nguoidung");
// const viecLamRoutes = require("./routes/vieclam"); // bạn có thể thêm sau

// Use routes
app.use("/api/nguoidung", nguoiDungRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hoso", hosoNguoidungRoutes);
// app.use("/api/vieclam", viecLamRoutes); // ví dụ route cho việc làm

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy trên cổng ${PORT}`);
});
