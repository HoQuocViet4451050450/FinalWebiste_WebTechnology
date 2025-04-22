// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../a_db");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const verifyToken = require("../middleware/auth"); // Import middleware

// 🔹 Cập nhật thông tin hồ sơ sinh viên /api/hoso/sinhvien/id
router.put("/sinhvien/:id", verifyToken, (req, res) => {
  const nguoidung_id = req.params.id;
  const {
    tentruong,
    nganhhoc,
    namtotnghiep,
    trangthaitotnghiep,
    linkcv,
    gioithieubanthan,
  } = req.body;

  const sqlUpdateDetail = `
    UPDATE table_hososinhvien
    SET 
      tentruong = ?,
      nganhhoc = ?,
      namtotnghiep = ?,
      trangthaitotnghiep = ?,
      linkcv = ?,
      gioithieubanthan = ?

    WHERE nguoidung_id = ?
  `;

  db.query(
    sqlUpdateDetail,
    [
      tentruong,
      nganhhoc,
      namtotnghiep,
      trangthaitotnghiep,
      linkcv,
      gioithieubanthan,
      nguoidung_id,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Lỗi khi cập nhật hồ sơ sinh viên:", err);
        return res
          .status(500)
          .json({ error: "Lỗi khi cập nhật hồ sơ sinh viên" });
      }

      res.status(200).json({
        message: "✅ Cập nhật thông tin hồ sơ sinh viên thành công!",
      });
    }
  );
});

// 🔹 Cập nhật thông tin hồ sơ nhà tuyển dụng /api/hoso/nhatuyendung/id
router.put("/nhatuyendung/:id", verifyToken, (req, res) => {
  const nguoidung_id = req.params.id;
  const {
    tencongty,
    nguoidaidien,
    sonamhoatdong,
    emailcongty,
    sodienthoaicongty,
    linkwebsite,
    gioithieucongty,
  } = req.body;

  const sqlUpdateDetail = `
    UPDATE table_hosonhatuyendung
    SET 
      tencongty = ?,
      nguoidaidien = ?,
      sonamhoatdong = ?,
      emailcongty = ?,
      sodienthoaicongty = ?,
      linkwebsite = ?,
      gioithieucongty = ?

    WHERE nguoidung_id = ?
  `;

  db.query(
    sqlUpdateDetail,
    [
      tencongty,
      nguoidaidien,
      sonamhoatdong,
      emailcongty,
      sodienthoaicongty,
      linkwebsite,
      gioithieucongty,
      nguoidung_id,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Lỗi khi cập nhật hồ sơ nhà tuyển dụng:", err);
        return res
          .status(500)
          .json({ error: "Lỗi khi cập nhật hồ sơ nhà tuyển dụng" });
      }

      res.status(200).json({
        message: "✅ Cập nhật thông tin hồ sơ nhà tuyển dụng thành công!",
      });
    }
  );
});

module.exports = router;
