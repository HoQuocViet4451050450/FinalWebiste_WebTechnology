// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../a_db");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const verifyToken = require("../middleware/auth"); // Import middleware

// 🔹 Lấy thông tin hồ sơ sinh viên /api/hoso/sinhvien
router.get("/sinhvien", verifyToken, (req, res) => {
  const nguoidung_id = req.user.id; // Lấy ID từ token

  const sqlGetDetail = `
    SELECT * FROM table_hososinhvien WHERE nguoidung_id = ?;
  `;

  db.query(sqlGetDetail, [nguoidung_id], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi lấy hồ sơ sinh viên:", err);
      return res.status(500).json({ error: "Lỗi khi lấy hồ sơ sinh viên" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hồ sơ sinh viên" });
    }

    // Trả về hồ sơ sinh viên đầu tiên tìm thấy
    res.status(200).json(result[0]);
  });
});

// 🔹 Lấy thông tin hồ sơ nhà tuyển dụng /api/hoso/nhatuyendung
router.get("/nhatuyendung", verifyToken, (req, res) => {
  const nguoidung_id = req.user.id; // Lấy ID từ token

  const sqlGetDetail = `
    SELECT * FROM table_hosonhatuyendung WHERE nguoidung_id = ?;
  `;

  db.query(sqlGetDetail, [nguoidung_id], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi lấy hồ sơ nhà tuyển dụng:", err);
      return res
        .status(500)
        .json({ error: "Lỗi khi lấy hồ sơ nhà tuyển dụng" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hồ sơ nhà tuyển dụng" });
    }

    // Trả về hồ sơ nhà tuyển dụng đầu tiên tìm thấy
    res.status(200).json(result[0]);
  });
});

// 🔹 Cập nhật thông tin hồ sơ sinh viên /api/hoso/sinhvien
router.put("/sinhvien", verifyToken, (req, res) => {
  const nguoidung_id = req.user.id; // Lấy ID từ token
  const {
    anhdaidien,
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
      anhdaidien = ?,
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
      anhdaidien,
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

// 🔹 Cập nhật thông tin hồ sơ nhà tuyển dụng /api/hoso/nhatuyendung
router.put("/nhatuyendung", verifyToken, (req, res) => {
  const nguoidung_id = req.user.id; // Lấy ID từ token
  const {
    anhdaidien,
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
      anhdaidien = ?,
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
      anhdaidien,
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
        console.error("❌ Lỗi khi cập nhật hồ sơ nhà tuyên dụng:", err);
        return res
          .status(500)
          .json({ error: "Lỗi khi cập nhật hồ sơ nhà tuyên dụng" });
      }

      res.status(200).json({
        message: "✅ Cập nhật thông tin hồ sơ nhà tuyên dụng thành công!",
      });
    }
  );
});

module.exports = router;
