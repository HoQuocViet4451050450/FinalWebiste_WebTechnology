// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../a_db");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const verifyToken = require("../middleware/auth"); // Import middleware

/*******************************************SINH VIEN ********************************************/
// Lấy tất cả bài đăng ứng tuyển của user (sinh viên) đang đăng nhập
router.get("/baidangungtuyen", verifyToken, (req, res) => {
  const nguoidang_id = req.user.id;

  const sqlGet = `
    SELECT 
      bdu.id,
      bdu.tieude,
      bdu.motangan,
      bdu.kynangchuyenmon,
      bdu.kinhnghiemlamviec,
      bdu.trinhdohocvan,
      bdu.mucluongmongmuon,
      bdu.vitritimviec,
      bdu.hinhthuclamviec,
      bdu.thongtinlienhe,
      bdu.ngaybatdaulam,
      bdu.hinhanh
    FROM table_baidangungtuyen bdu
    WHERE bdu.nguoidang_id = ?
    ORDER BY bdu.ngaybatdaulam DESC
  `;

  db.query(sqlGet, [nguoidang_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Lỗi khi lấy danh sách bài đăng ứng tuyển",
        error: err,
      });
    }
    res.json(results);
  });
});

// 🔹 API Thêm bài đăng ứng tuyển
router.post("/baidangungtuyen", verifyToken, (req, res) => {
  const nguoidang_id = req.user.id; // Lấy từ token
  const {
    tieude,
    motangan,
    kynangchuyenmon,
    kinhnghiemlamviec,
    trinhdohocvan,
    mucluongmongmuon,
    vitritimviec,
    hinhthuclamviec,
    thongtinlienhe,
    ngaybatdaulam,
    hinhanh,
  } = req.body;

  const sqlInsert = `
    INSERT INTO table_baidangungtuyen
    (
      nguoidang_id,
      tieude,
      motangan,
      kynangchuyenmon,
      kinhnghiemlamviec,
      trinhdohocvan,
      mucluongmongmuon,
      vitritimviec,
      hinhthuclamviec,
      thongtinlienhe,
      ngaybatdaulam,
      hinhanh
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nguoidang_id,
    tieude,
    motangan,
    kynangchuyenmon,
    kinhnghiemlamviec,
    trinhdohocvan,
    mucluongmongmuon,
    vitritimviec,
    hinhthuclamviec,
    thongtinlienhe,
    ngaybatdaulam,
    hinhanh,
  ];

  db.query(sqlInsert, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Lỗi khi thêm bài đăng", error: err });
    }

    res.status(201).json({
      message: "Thêm bài đăng thành công",
      baidang_id: result.insertId,
    });
  });
});

// 🔹 API Sửa bài đăng ứng tuyển
router.put("/baidangungtuyen/:id", verifyToken, (req, res) => {
  const baidangId = req.params.id;
  const nguoidang_id = req.user.id; // Lấy ID user từ token

  const {
    tieude,
    motangan,
    kynangchuyenmon,
    kinhnghiemlamviec,
    trinhdohocvan,
    mucluongmongmuon,
    vitritimviec,
    hinhthuclamviec,
    thongtinlienhe,
    ngaybatdaulam,
    hinhanh,
  } = req.body;

  const sqlUpdate = `
    UPDATE table_baidangungtuyen
    SET 
      tieude = ?,
      motangan = ?,
      kynangchuyenmon = ?,
      kinhnghiemlamviec = ?,
      trinhdohocvan = ?,
      mucluongmongmuon = ?,
      vitritimviec = ?,
      hinhthuclamviec = ?,
      thongtinlienhe = ?,
      ngaybatdaulam = ?,
      hinhanh = ?
    WHERE id = ? AND nguoidang_id = ?
  `;

  const values = [
    tieude,
    motangan,
    kynangchuyenmon,
    kinhnghiemlamviec,
    trinhdohocvan,
    mucluongmongmuon,
    vitritimviec,
    hinhthuclamviec,
    thongtinlienhe,
    ngaybatdaulam,
    hinhanh,
    baidangId,
    nguoidang_id,
  ];

  db.query(sqlUpdate, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Lỗi khi cập nhật bài đăng", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({
        message:
          "Bạn không có quyền sửa bài đăng này hoặc bài đăng không tồn tại",
      });
    }

    res.status(200).json({ message: "Cập nhật bài đăng thành công!" });
  });
});

// 🔹 API Xóa bài đăng ứng tuyển
router.delete("/baidangungtuyen/:id", verifyToken, (req, res) => {
  const baidangId = req.params.id;
  const userId = req.user.id; // ID người đăng từ token

  const sqlDelete =
    "DELETE FROM table_baidangungtuyen WHERE id = ? AND nguoidang_id = ?";

  db.query(sqlDelete, [baidangId, userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi khi xóa bài đăng" });

    if (result.affectedRows === 0) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xóa bài đăng này" });
    }

    res.status(200).json({ message: "Xóa bài đăng thành công!" });
  });
});

// 🔹 API Lấy thông tin bài đăng ứng tuyển theo ID
router.get("/baidangungtuyen/:id", (req, res) => {
  const baidangId = req.params.id;

  const sqlGetById = `
    SELECT 
      bdu.id,
      bdu.tieude,
      bdu.motangan,
      bdu.kynangchuyenmon,
      bdu.kinhnghiemlamviec,
      bdu.trinhdohocvan,
      bdu.mucluongmongmuon,
      bdu.vitritimviec,
      bdu.hinhthuclamviec,
      bdu.thongtinlienhe,
      bdu.ngaybatdaulam,
      bdu.hinhanh,
      nd.tendangnhap AS nguoi_dang
    FROM table_baidangungtuyen bdu
    JOIN nguoidung nd ON bdu.nguoidang_id = nd.id
    WHERE bdu.id = ?
  `;

  db.query(sqlGetById, [baidangId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Lỗi khi lấy bài đăng", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bài đăng" });
    }

    res.json(results[0]);
  });
});

// Lấy toàn bộ bài đăng ứng tuyển (không cần kiểm tra user đăng nhập)
router.get("/baidangungtuyenall", (req, res) => {
  const sqlGet = `
    SELECT
      bdu.id,
      bdu.tieude,
      bdu.motangan,
      bdu.kynangchuyenmon,
      bdu.kinhnghiemlamviec,
      bdu.trinhdohocvan,
      bdu.mucluongmongmuon,
      bdu.vitritimviec,
      bdu.hinhthuclamviec,
      bdu.thongtinlienhe,
      bdu.ngaybatdaulam,
      bdu.hinhanh,
      nd.tendangnhap AS nguoi_dang
    FROM table_baidangungtuyen bdu
    LEFT JOIN table_nguoidung nd ON bdu.nguoidang_id = nd.id
    ORDER BY bdu.ngaybatdaulam DESC
  `;

  db.query(sqlGet, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Lỗi khi lấy danh sách tất cả bài đăng ứng tuyển",
        error: err,
      });
    }
    res.json(results);
  });
});
/*******************************************NHA TUYEN DUNG ********************************************/
// Lấy tất cả bài đăng tuyển dụng của user (nhà tuyển dụng) đang đăng nhập
router.get("/baidangtuyendung", verifyToken, (req, res) => {
  const nguoidang_id = req.user.id;

  const sqlGet = `
    SELECT
      btd.id,
      btd.tieude,
      btd.motacongviec,
      btd.yeucaucongviec,
      btd.quyenloi,
      btd.mucluong,
      btd.vitrivieclam,
      btd.thongtinlienhe,
      btd.hannophoso,
      btd.yeucauvehoso,
      btd.hinhanh
    FROM table_baidangtuyendung btd
    WHERE btd.nguoidang_id = ?
    ORDER BY btd.id DESC
  `;

  db.query(sqlGet, [nguoidang_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Lỗi khi lấy danh sách bài đăng tuyển dụng",
        error: err,
      });
    }
    res.json(results);
  });
});

// 🔹 API Thêm bài đăng nhà tuyển dụng
router.post("/baidangtuyendung", verifyToken, (req, res) => {
  const nguoidang_id = req.user.id; // Lấy từ token
  const {
    tieude,
    motacongviec,
    yeucaucongviec,
    quyenloi,
    mucluong,
    vitrivieclam,
    thongtinlienhe,
    hannophoso,
    yeucauvehoso,
    hinhanh,
  } = req.body;

  const sqlInsert = `
    INSERT INTO table_baidangtuyendung (
      nguoidang_id,
      tieude,
      motacongviec,
      yeucaucongviec,
      quyenloi,
      mucluong,
      vitrivieclam,
      thongtinlienhe,
      hannophoso,
      yeucauvehoso,
      hinhanh
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nguoidang_id,
    tieude,
    motacongviec,
    yeucaucongviec,
    quyenloi,
    mucluong,
    vitrivieclam,
    thongtinlienhe,
    hannophoso,
    yeucauvehoso,
    hinhanh,
  ];

  db.query(sqlInsert, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Lỗi khi thêm bài đăng", error: err });
    }

    res.status(201).json({
      message: "Thêm bài đăng thành công",
      baidang_id: result.insertId,
    });
  });
});

// 🔹 API Sửa bài đăng tuyển dụng
router.put("/baidangtuyendung/:id", verifyToken, (req, res) => {
  const baidangId = req.params.id;
  const nguoidang_id = req.user.id; // Lấy ID user từ token

  const {
    tieude,
    motacongviec,
    yeucaucongviec,
    quyenloi,
    mucluong,
    vitrivieclam,
    thongtinlienhe,
    hannophoso,
    yeucauvehoso,
    hinhanh,
  } = req.body;

  const sqlUpdate = `
    UPDATE table_baidangtuyendung
    SET
      tieude = ?,
      motacongviec = ?,
      yeucaucongviec = ?,
      quyenloi = ?,
      mucluong = ?,
      vitrivieclam = ?,
      thongtinlienhe = ?,
      hannophoso = ?,
      yeucauvehoso = ?,
      hinhanh = ?
    WHERE id = ? AND nguoidang_id = ?
  `;

  const values = [
    tieude,
    motacongviec,
    yeucaucongviec,
    quyenloi,
    mucluong,
    vitrivieclam,
    thongtinlienhe,
    hannophoso,
    yeucauvehoso,
    hinhanh,
    baidangId,
    nguoidang_id,
  ];

  db.query(sqlUpdate, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Lỗi khi cập nhật bài đăng", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({
        message:
          "Bạn không có quyền sửa bài đăng này hoặc bài đăng không tồn tại",
      });
    }

    res.status(200).json({ message: "Cập nhật bài đăng thành công!" });
  });
});

// 🔹 API Xóa bài đăng nhà tuyển dụng
router.delete("/baidangtuyendung/:id", verifyToken, (req, res) => {
  const baidangId = req.params.id;
  const userId = req.user.id;

  const sqlDelete = `
    DELETE FROM table_baidangtuyendung
    WHERE id = ? AND nguoidang_id = ?
  `;

  db.query(sqlDelete, [baidangId, userId], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Lỗi khi xóa bài đăng", error: err });

    if (result.affectedRows === 0) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xóa bài đăng này" });
    }

    res.status(200).json({ message: "Xóa bài đăng thành công!" });
  });
});

// 🔹 API Lấy thông tin bài đăng nhà tuyển dụng theo ID
router.get("/baidangtuyendung/:id", (req, res) => {
  const baidangId = req.params.id;

  const sqlGetById = `
    SELECT 
      btd.id,
      btd.tieude,
      btd.motacongviec,
      btd.yeucaucongviec,
      btd.quyenloi,
      btd.mucluong,
      btd.vitrivieclam,
      btd.thongtinlienhe,
      btd.hannophoso,
      btd.yeucauvehoso,
      btd.hinhanh,
      nd.tendangnhap AS nguoi_dang
    FROM table_baidangtuyendung btd
    JOIN nguoidung nd ON btd.nguoidang_id = nd.id
    WHERE btd.id = ?
  `;

  db.query(sqlGetById, [baidangId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Lỗi khi lấy bài đăng", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bài đăng" });
    }

    res.json(results[0]);
  });
});

// Lấy toàn bộ bài đăng nhà tuyển dụng (không cần kiểm tra user đăng nhập)
router.get("/baidangtuyendungall", (req, res) => {
  const sqlGet = `
    SELECT
      btd.id,
      btd.tieude,
      btd.motacongviec,
      btd.yeucaucongviec,
      btd.quyenloi,
      btd.mucluong,
      btd.vitrivieclam,
      btd.thongtinlienhe,
      btd.hannophoso,
      btd.yeucauvehoso,
      btd.hinhanh,
      nd.tendangnhap AS nguoi_dang
    FROM table_baidangtuyendung btd
    LEFT JOIN table_nguoidung nd ON btd.nguoidang_id = nd.id
    ORDER BY btd.id DESC
  `;

  db.query(sqlGet, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Lỗi khi lấy danh sách tất cả bài đăng tuyển dụng",
        error: err,
      });
    }
    res.json(results);
  });
});

module.exports = router;
