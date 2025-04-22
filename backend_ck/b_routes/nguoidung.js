// routes/nguoidung.js
const express = require("express");
const router = express.Router();
const db = require("../a_db");

// 🔹 Lấy danh sách người dùng
router.get("/danhsach", (req, res) => {
  const sql = "SELECT * FROM table_nguoidung";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi lấy danh sách người dùng:", err);
      return res
        .status(500)
        .json({ error: "Lỗi khi lấy danh sách người dùng!" });
    }
    res.status(200).json(results);
  });
});

//Lấy id  người dùng từ bảng [Người dùng]
router.get("/laynguoidung/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = "SELECT * FROM table_nguoidung WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });

    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.status(200).json(results[0]);
  });
});

// 🔹 Xóa người dùng theo ID
router.delete("/xoa/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM table_nguoidung WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi xóa người dùng:", err);
      return res.status(500).json({ error: "Lỗi khi xóa người dùng!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng!" });
    }
    res.status(200).json({ message: "✅ Xóa người dùng thành công!" });
  });
});

// 🔹 Cập nhật mật khẩu hoặc email
router.put("/capnhat/:id", (req, res) => {
  const userId = req.params.id;
  const { matkhau, email } = req.body;

  const sql = "UPDATE table_nguoidung SET matkhau = ?, email = ? WHERE id = ?";
  db.query(sql, [matkhau, email, userId], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi cập nhật người dùng:", err);
      return res.status(500).json({ error: "Lỗi khi cập nhật người dùng!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng!" });
    }
    res.status(200).json({ message: "✅ Cập nhật người dùng thành công!" });
  });
});

// 🔹 Tìm kiếm người dùng theo tên đăng nhập hoặc email
router.get("/timkiem", (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Vui lòng nhập từ khóa tìm kiếm!" });
  }

  const sql =
    "SELECT * FROM table_nguoidung WHERE tendangnhap LIKE ? OR email LIKE ?";
  const searchValue = `%${keyword}%`;

  db.query(sql, [searchValue, searchValue], (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi tìm kiếm người dùng:", err);
      return res.status(500).json({ error: "Lỗi khi tìm kiếm người dùng!" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }
    res.status(200).json(results);
  });
});

// 🔹 Cập nhật thông tin chi tiết người dùng
router.put("/chitiet/:id", (req, res) => {
  const nguoidung_id = req.params.id;
  const {
    hoten,
    ngaysinh,
    quequan,
    sodienthoai,
    cccd,
    diachithuongtru,
    nghenghiep,
  } = req.body;

  const sqlUpdateDetail = `
    UPDATE table_chitietnguoidung
    SET 
      hoten = ?,
      ngaysinh = ?,
      quequan = ?,
      sodienthoai = ?,
      cccd = ?,
      diachithuongtru = ?,
      nghenghiep = ?,
  
    WHERE nguoidung_id = ?
  `;

  db.query(
    sqlUpdateDetail,
    [
      hoten,
      ngaysinh,
      quequan,
      sodienthoai,
      cccd,
      diachithuongtru,
      nghenghiep,
      nguoidung_id,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Lỗi khi cập nhật chi tiết người dùng:", err);
        return res
          .status(500)
          .json({ error: "Lỗi khi cập nhật chi tiết người dùng!" });
      }

      res.status(200).json({
        message: "✅ Cập nhật thông tin chi tiết thành công!",
      });
    }
  );
});

// 🔹 Lấy danh sách chi tiết người dùng
router.get("/danhsach_nguoidung_chitiet", (req, res) => {
  const sql = "SELECT * FROM table_chitietnguoidung";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi lấy danh sách người dùng:", err);
      return res
        .status(500)
        .json({ error: "Lỗi khi lấy danh sách người dùng!" });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
