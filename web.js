//ถ้า run ไม่ได้ npm i bcrypt / npm i express / npm i mysql / npm i path / npm i nodemailer
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//mailที่เอาไว้ยิงเข้าเมลลูกค้า
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "126530@satriwit3.ac.th",
    pass: "0863481843",
  },
});

//เชื่อมต่อดาต้าเบส
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "web_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as ID " + db.threadId);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname, "public/home.html"));
});

app.get("/category", function (req, res) {
  res.sendFile(path.join(__dirname, "public/category.html"));
});

app.get("/news", function (req, res) {
  res.sendFile(path.join(__dirname, "public/news.html"));
});

app.get("/article", function (req, res) {
  const articleId = req.params.id;
  res.sendFile(path.join(__dirname, `/article.html?news=${articleId}`));
});

app.get("/contact", function (req, res) {
  res.sendFile(path.join(__dirname, "public/contact.html"));
});

app.get("/backoffice", function (req, res) {
  res.sendFile(path.join(__dirname, "public/backoffice.html"));
});

app.get("/orders", function (req, res) {
  res.sendFile(path.join(__dirname, "public/orders.html"));
});

app.get("/wishlist", function (req, res) {
  res.sendFile(path.join(__dirname, "public/wishlist.html"));
});

app.get("/history", function (req, res) {
  res.sendFile(path.join(__dirname, "public/history.html"));
});

app.get("/orders", function (req, res) {
  res.sendFile(path.join(__dirname, "public/orders.html"));
});

app.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});

// สร้าง user
app.post("/api/reg", (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).send("All fields are required");
  }

  const checkQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(checkQuery, [username, email], (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).send("Database error");
    }

    if (results.length > 0) {
      return res.status(409).send("Username or email already exists");
    }

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("Error hashing password");
      }

      const query =
        "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
      db.query(query, [email, username, hashedPassword], (err, result) => {
        if (err) {
          console.error("Error executing query: " + err.stack);
          return res.status(400).send("Error creating user");
        }
        res.status(201).send("User created successfully");
      });
    });
  });
});

// เช็ค login ของ user
app.post("/api/users", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error comparing passwords" });
      }

      if (isMatch) {
        res.json({ success: true });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid username or password" });
      }
    });
  });
});

// เช็ค login ของ admin
app.post("/api/admin", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM admin WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error comparing passwords" });
      }

      if (isMatch) {
        res.json({ success: true });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid username or password" });
      }
    });
  });
});

// ส่งข้อมูล contact us
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).send("All fields are required");
  }

  const query =
    "INSERT INTO contact (name, email, phone, message) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(400).send("Error creating user");
    }
    res.status(201).send("sent message successfully");
  });
});

// เปลี่ยน password
app.post("/api/password", (req, res) => {
  const { newPassword, username } = req.body;

  if (!newPassword || !username) {
    return res.status(400).json({ error: "All fields are required" });
  }

  bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ error: "Error hashing password" });
    }

    const query =
      "UPDATE users SET password = ?, edit_at = NOW() WHERE username = ?";
    db.query(query, [hashedPassword, username], (err, result) => {
      if (err) {
        console.error("Error executing query: " + err.stack);
        return res.status(500).json({ error: "Error updating password" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "Password updated successfully" });
    });
  });
});

// เปลี่ยน password admin
app.post("/api/admin/password", (req, res) => {
  const { newPassword, username } = req.body;

  if (!newPassword || !username) {
    return res.status(400).json({ error: "All fields are required" });
  }

  bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ error: "Error hashing password" });
    }

    const query =
      "UPDATE admin SET password = ?, edit_at = NOW() WHERE username = ?";
    db.query(query, [hashedPassword, username], (err, result) => {
      if (err) {
        console.error("Error executing query: " + err.stack);
        return res.status(500).json({ error: "Error updating password" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "Password updated successfully" });
    });
  });
});

// เพิ่มเกมใน wishlist
app.post("/api/wishlist/:id", (req, res) => {
  const { username } = req.body;
  const gameList = req.params.id;

  const checkQuery = "SELECT * FROM wishlist WHERE username = ? AND list = ?";
  db.query(checkQuery, [username, gameList], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error executing query: " + checkErr.stack);
      return res.status(500).send("Server error");
    }

    if (checkResult.length > 0) {
      if (checkResult[0].enable === 0) {
        const updateQuery =
          "UPDATE wishlist SET enable = 1, edit_at = NOW() WHERE username = ? AND list = ?";
        db.query(
          updateQuery,
          [username, gameList],
          (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Error executing query: " + updateErr.stack);
              return res.status(500).send("Error updating wishlist");
            }
            return res.status(200).send("Game re-enabled in wishlist");
          }
        );
      } else {
        return res.status(400).send("Game already in wishlist and enabled");
      }
    } else {
      const insertQuery =
        "INSERT INTO wishlist (username, list, enable) VALUES (?, ?, 1)";
      db.query(insertQuery, [username, gameList], (insertErr, result) => {
        if (insertErr) {
          console.error("Error executing query: " + insertErr.stack);
          return res.status(400).send("Error creating wishlist");
        }
        res.status(201).send("Added to wishlist successfully");
      });
    }
  });
});

// ลบเกมออกจาก wishlist
app.post("/wishlist/update/:gamelist", (req, res) => {
  const gamelist = req.params.gamelist;
  const username = req.body.username;

  const sql = `UPDATE wishlist SET enable = 0, edit_at = NOW() WHERE list = ? AND username = ? AND enable = 1`;
  db.query(sql, [gamelist, username], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false });
    }

    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

// เรียก wishlist ทั้งหมด
app.get("/api/getwishlist/:username", (req, res) => {
  const username = req.params.username;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  const query =
    "SELECT wishlist.username, wishlist.list, game.price, game.discount , wishlist.enable FROM wishlist INNER JOIN game ON wishlist.list=game.name WHERE username = ? AND enable = 1";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).send("Error fetching wishlist");
    }

    res.json(results);
  });
});

// เรียก video มาโชว์ใน carousel
app.get("/api/carousel", (req, res) => {
  db.query("SELECT * FROM carousel", (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(results);
  });
});

// เรียกเกมทั้งหมด
app.get("/api/games", (req, res) => {
  db.query("SELECT * FROM game", (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(results);
  });
});

// เรียกเกมที่มี Discount
app.get("/api/discount", (req, res) => {
  db.query("SELECT * FROM game WHERE discount > 0", (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(results);
  });
});

// เรียกเกมโดยแบ่ง catagory
app.get("/api/catagory/:category", (req, res) => {
  const category = req.params.category;

  db.query(
    "SELECT * FROM game WHERE category = ?",
    [category],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        res.status(500).send("Error fetching games");
        return;
      }
      res.json(results);
    }
  );
});

// อัพเดทตะกร้า
app.post("/api/cart/:gamelist", (req, res) => {
  const gamelist = req.params.gamelist;
  const username = req.body.username;
  const price = req.body.price;

  const checkQuery =
    "SELECT * FROM cart WHERE username = ? AND cart = ? AND paid = 0";
  db.query(checkQuery, [username, gamelist], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error executing query: " + checkErr.stack);
      return res.status(500).send("Server error");
    }

    if (checkResult.length > 0) {
      return res.status(400).send("Game already in cart");
    }

    const query = "INSERT INTO cart (username, cart, price) VALUES (?, ?, ?)";
    db.query(query, [username, gamelist, price], (err, result) => {
      if (err) {
        console.error("Error executing query: " + err.stack);
        return res.status(400).send("Error adding to cart");
      }
      res.status(201).send("Added to cart successfully");
    });
  });
});

// ลบเกมจากตะกร้า
app.delete("/api/delete/:gamelist", (req, res) => {
  const gamelist = req.params.gamelist;
  const username = req.body.username;

  const deleteQuery = "DELETE FROM cart WHERE username = ? AND cart = ?";
  db.query(deleteQuery, [username, gamelist], (err, result) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).send("Error deleting from cart");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Game not found in cart");
    }

    res.status(200).send("Game removed from cart successfully");
  });
});

// ดึงข้อมูลเกมจากตะกร้า
app.get("/api/getcart/:username", (req, res) => {
  const username = req.params.username;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  const query = `
    SELECT cart.username, cart.cart, game.price, game.discount 
    FROM cart 
    INNER JOIN game ON cart.cart = game.name 
    WHERE cart.username = ? AND cart.paid = 0;`;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).send("Error fetching cart items");
    }
    res.json(results);
  });
});

// ซื้อเกมและไปลบในตะกร้า
app.post("/api/payment", (req, res) => {
  const { username, cartItems, paymentType } = req.body;

  const priceQuery = "SELECT price FROM cart WHERE username = ? AND cart = ?";
  const insertHistoryQuery =
    "INSERT INTO history (username, list, quantity, price, payment) VALUES (?, ?, ?, ?, ?)";
  const updateCartQuery =
    "UPDATE cart SET paid = 1 WHERE username = ? AND cart = ?";

  const promises = cartItems.map((item) => {
    const gameName = item.gameName;
    const quantity = item.quantity;

    return new Promise((resolve, reject) => {
      db.query(priceQuery, [username, gameName], (err, results) => {
        if (err) {
          console.error("Error executing price query: " + err.stack);
          return reject("Error fetching price");
        }

        if (results.length === 0) {
          return reject("Game not found in cart");
        }

        const price = results[0].price;

        db.query(
          insertHistoryQuery,
          [username, gameName, quantity, price, paymentType],
          (err) => {
            if (err) {
              console.error("Error executing insert query: " + err.stack);
              return reject("Error processing payment");
            }

            db.query(updateCartQuery, [username, gameName], (err) => {
              if (err) {
                console.error("Error executing update query: " + err.stack);
                return reject("Error updating cart");
              }
              resolve();
            });
          }
        );
      });
    });
  });

  Promise.all(promises)
    .then(() => {
      res.status(201).send("Payment processed successfully");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// ดึงข้อมูล history
app.get("/api/history/:username", (req, res) => {
  const username = req.params.username;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  const query =
    "SELECT history.create_at, history.username, COUNT(DISTINCT history.list) AS count, GROUP_CONCAT(DISTINCT history.list) AS games_list, GROUP_CONCAT(history.quantity ORDER BY history.list ASC) AS games_quantity, GROUP_CONCAT(history.price ORDER BY history.list ASC) AS games_price ,GROUP_CONCAT(DISTINCT history.payment) AS games_payment , GROUP_CONCAT(history.confirm ORDER BY history.list ASC) AS games_confirm , GROUP_CONCAT(history.cancel ORDER BY history.list ASC) AS games_cancel FROM history WHERE history.username = ? AND history.list IS NOT NULL AND history.quantity IS NOT NULL AND history.price IS NOT NULL GROUP BY history.create_at, history.username ORDER BY history.create_at DESC";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).send("Error fetching history");
    }
    res.json(results);
  });
});

// cancle order
app.post("/api/cancel-order", (req, res) => {
  const { create_at, username } = req.body;

  const query =
    "UPDATE history SET cancel = 1, cancel_at = NOW() WHERE create_at = ? AND username = ? AND cancel = 0";

  db.query(query, [create_at, username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error canceling order" });
    }

    return res.status(200).json({ message: "Order canceled successfully" });
  });
});

// ดึงข้อมูล order ทั้งหมดมาโชว์ของ Admin
app.get("/api/getOrder", (req, res) => {
  const query =
    "SELECT history.create_at, history.username, COUNT(DISTINCT history.list) AS count, GROUP_CONCAT(DISTINCT history.list) AS games_list, GROUP_CONCAT(history.quantity ORDER BY history.list ASC) AS games_quantity, GROUP_CONCAT(history.price ORDER BY history.list ASC) AS games_price, GROUP_CONCAT(DISTINCT history.payment) AS games_payment , GROUP_CONCAT(history.confirm ORDER BY history.list ASC) AS games_confirm , GROUP_CONCAT(history.cancel ORDER BY history.list ASC) AS games_cancel FROM history WHERE history.username = history.username AND history.list IS NOT NULL AND history.quantity IS NOT NULL AND history.price IS NOT NULL AND cancel = 0 AND confirm = 0 GROUP BY history.create_at, history.username ORDER BY history.create_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).send("Error fetching history");
    }
    res.json(results);
  });
});

// confirm order
app.post("/api/confirm-order", (req, res) => {
  const { create_at, username } = req.body;

  const confirmOrderQuery =
    "UPDATE history SET confirm = 1, confirm_at = NOW() WHERE create_at = ? AND username = ? AND cancel = 0";

  const getEmailQuery = "SELECT email FROM users WHERE username = ?";

  // First, confirm the order
  db.query(confirmOrderQuery, [create_at, username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error confirming order" });
    }

    db.query(getEmailQuery, [username], (err, emailResult) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching user email" });
      }

      if (emailResult.length === 0) {
        return res.status(404).json({ message: "User email not found" });
      }

      const userEmail = emailResult[0].email;

      var mailOptions = {
        from: "126530@satriwit3.ac.th",
        to: userEmail,
        subject: "Order Confirmation",
        text: `Dear ${username}, your order placed on ${create_at} has been successfully confirmed. "GET YOUR KEY". Thank you!`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        transporter.close();
        if (error) {
          console.log("Error sending email:", error);
          return res
            .status(500)
            .json({ message: "Order confirmed but email not sent" });
        } else {
          console.log("Email sent: " + info.response);
          return res
            .status(200)
            .json({ message: "Order confirmed and email sent" });
        }
      });
    });
  });
});

// ดึงข้อมูล user
app.post("/api/getusers", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  db.query(
    "SELECT username, email, create_at FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing query: " + err.stack);
        res.status(500).send("Error fetching user");
        return;
      }

      if (results.length === 0) {
        return res.status(404).send("User not found");
      }

      res.json(results);
    }
  );
});

// ดึงข้อมูล contact us
app.get("/api/contactUS", (req, res) => {
  db.query("SELECT * FROM contact WHERE reply = 0", (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(results);
  });
});

// reply
app.post("/api/reply", (req, res) => {
  const { name, email, messages } = req.body;

  const confirmOrderQuery = "UPDATE contact SET reply = 1 WHERE name = ? AND email = ?";

  db.query(confirmOrderQuery, [name, email, messages], (err, result) => {
    if (err) {
      res.status(500).send("Error reply");
      return;
    }

    var mailOptions = {
      from: "126530@satriwit3.ac.th",
      to: email,
      subject: "Reply from admin",
      text: messages,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      transporter.close();
      if (error) {
        console.log("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Order reply but email not sent" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Order reply and email sent" });
      }
    });
  });
});

// summary best seller
app.get("/api/best-seller", (req, res) => {
  const query = "SELECT list, COUNT(*) AS count FROM history GROUP BY list ORDER BY count DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
});

// summary best wishlist
app.get("/api/best-wishlist", (req, res) => {
  const query = "SELECT list, COUNT(*) AS count FROM wishlist WHERE enable = 1 GROUP BY list ORDER BY count DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
});

// ส่งข้อมูล review
app.post("/api/review", (req, res) => {
  const { username, game, text, star } = req.body;

  const query =
    "INSERT INTO review (username, game, text, star) VALUES (?, ?, ?, ?)";
  db.query(query, [username, game, text, star], (err, result) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(400).send("Error creating user");
    }
    res.status(201).send("sent review successfully");
  });
});

// ดึงข่อมูล review
app.post("/api/get-review", (req, res) => {
  const { username, game } = req.body;

  const query = "SELECT * FROM review WHERE username = ? AND game = ?";

  db.query(query, [username, game], (err, result) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Error fetching review" });
    }

    const hasReviewed = result.length > 0;

    res.status(200).json({ hasReviewed });
  });
});

// ดึงข่อมูล review ทุกคนโดยแยกตามเกม
app.post("/api/getall-review", (req, res) => {
  const { game } = req.body;

  const query = "SELECT * FROM review WHERE game = ?";

  db.query(query, [game], (err, result) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Error fetching review" });
    }

    res.json(result);
  });
});

