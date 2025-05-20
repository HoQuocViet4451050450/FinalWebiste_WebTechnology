// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../a_db");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const verifyToken = require("../middleware/auth"); // Import middleware

// 🔐 Đăng ký người dùng /api/auth/dangky
router.post("/dangky", (req, res) => {
  const { tendangnhap, matkhau, email, loainguoidung } = req.body;

  if (!tendangnhap || !matkhau || !email || !loainguoidung) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
  }

  const sqlInsertUser =
    "INSERT INTO table_nguoidung (tendangnhap, matkhau, email, loainguoidung) VALUES (?, ?, ?, ?)";

  db.query(
    sqlInsertUser,
    [tendangnhap, matkhau, email, loainguoidung],
    (err, result) => {
      if (err) {
        console.error("❌ Lỗi khi đăng ký người dùng:", err);
        return res.status(500).json({ error: "Lỗi khi đăng ký người dùng!" });
      }

      const userId = result.insertId;
      const sqlInsertDetail =
        "INSERT INTO table_chitietnguoidung (nguoidung_id) VALUES (?)";

      db.query(sqlInsertDetail, [userId], (err2) => {
        if (err2) {
          console.error("❌ Lỗi khi tạo chi tiết người dùng:", err2);
          return res
            .status(500)
            .json({ error: "Lỗi khi tạo chi tiết người dùng!" });
        }

        let sqlInsertProfile = "";
        if (loainguoidung === "sinhvien") {
          sqlInsertProfile =
            "INSERT INTO table_hososinhvien (nguoidung_id) VALUES (?)";
        } else if (loainguoidung === "nhatuyendung") {
          sqlInsertProfile =
            "INSERT INTO table_hosonhatuyendung (nguoidung_id) VALUES (?)";
        }

        if (sqlInsertProfile) {
          db.query(sqlInsertProfile, [userId], (err3) => {
            if (err3) {
              console.error("❌ Lỗi khi tạo hồ sơ người dùng:", err3);
              return res
                .status(500)
                .json({ error: "Lỗi khi tạo hồ sơ người dùng!" });
            }

            res.status(201).json({
              message: "✅ Đăng ký người dùng thành công!",
              userId: userId,
            });
          });
        } else {
          res.status(201).json({
            message: "⚠️ Đăng ký thành công nhưng loại người dùng không rõ!",
            userId: userId,
          });
        }
      });
    }
  );
});

// 🔐 Đăng nhập người dùng /api/auth/dangnhap
router.post("/dangnhap", (req, res) => {
  const { tendangnhap, matkhau } = req.body;

  if (!tendangnhap || !matkhau) {
    return res
      .status(400)
      .json({ error: "Vui lòng nhập tên đăng nhập và mật khẩu!" });
  }

  const sql =
    "SELECT * FROM table_nguoidung WHERE tendangnhap = ? AND matkhau = ?";

  db.query(sql, [tendangnhap, matkhau], (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi đăng nhập:", err);
      return res.status(500).json({ error: "Lỗi khi đăng nhập!" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ error: "Tên đăng nhập hoặc mật khẩu không đúng!" });
    }

    const user = results[0];
    const token = jwt.sign(
      {
        id: user.id,
        tendangnhap: user.tendangnhap,
        email: user.email,
        loainguoidung: user.loainguoidung,
      },
      SECRET_KEY,
      { expiresIn: "5h" } // Token có hiệu lực 5 tiếng
    );

    res.status(200).json({
      message: "✅ Đăng nhập thành công!",
      token: token,
    });
  });
});

const blacklistToken = new Set(); // Danh sách token bị vô hiệu hóa

// 🔹 API Đăng xuất
router.post("/dangxuat", verifyToken, (req, res) => {
  const token = req.headers["authorization"].split(" ")[1]; // Lấy token từ Header
  blacklistToken.add(token); // Thêm token vào danh sách đen

  res.status(200).json({ message: "Đăng xuất thành công!" });
});

module.exports = router;
