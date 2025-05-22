const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bookbox"
})

app.post('/usuario', (req, res) => {
    if (req.body.nomeUsuario) {
        const { email, senha, nomeUsuario } = req.body;

        const sqlCheckEmail = "SELECT COUNT(*) AS count FROM usuario WHERE email = ?";
        db.query(sqlCheckEmail, [email], (err, result) => {
            if (err) {
                console.error("Erro ao verificar o email:", err);
                return res.status(500).json("Falha ao criar conta. Tente novamente.");
            }

            if (result[0].count > 0) {
                return res.status(409).json("Este email já está cadastrado."); 
            } else {
                const sqlInsert = "INSERT INTO usuario (email, senha, nomeUsuario) VALUES (?, ?, ?)";
                db.query(sqlInsert, [email, senha, nomeUsuario], (err, result) => {
                    if (err) {
                        console.error("Erro ao cadastrar usuário:", err);
                        return res.status(500).json("Falha ao criar conta. Tente novamente.");
                    }
                    return res.status(201).json("Conta criada com sucesso!");
                });
            }
        });
    }
    else if (req.body.email && req.body.senha) {
        const sqlSelect = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
        db.query(sqlSelect, [req.body.email, req.body.senha], (err, data) => {
            if (err) {
                console.error("Erro ao realizar login:", err);
                return res.status(500).json("Falha na realização do Login. Tente Novamente.");
            }
            if (data.length > 0) {
                return res.status(200).json("Login Realizado com Sucesso!");
            } else {
                return res.status(401).json("Credenciais inválidas. Tente novamente.");
            }
        });
    }
    else {
        return res.status(400).json("Requisição inválida.");
    }
});

app.listen(8081, () => {
    console.log("Listening...");
});