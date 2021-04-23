import express from "express";
import jwt from "jsonwebtoken";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
// import { swaggerDocument } from "./doc.js";

const app = express();
const port = 3000;

const secretKey = "jdASIhD564xAwr7vc9axAS";

const userNextId = 0;
const usersAccountArray = [];

app.use(express.json());
// app.use(cors());
// app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function validaToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).end();
    }
    token = token.replace("Bearer ", "");

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).end();
        }
        req.userId = decoded.id;
        next();
    });
}

app.post("/account", validaToken, (req, res) => {

    const userName = req.body.name;
    const userBalance = req.body.name;

    const newUser = { 
        "id": userNextId,
        "name": userName,
        "balance": userBalance
    };

    usersAccountArray.push[newUser];
    userNextId++;


    const idAccount = req.body.idAccount;
});

app.post("/account/deposit", validaToken, (req, res) => {
    res.send({ userId: req.userId });

    const idAccount = req.body.idAccount;
    const valueDeposit = req.body.deposit;

    const user = usersAccountArray.find(user => idAccount === user.id);
    if (user) {

        user.balance += valueDeposit;
        return res.status(200).end();

    } else {

        res.status(401).body({ message: "Erro: Usuário não encontrado." });
    }
});

app.post("/account/withdraw", validaToken, (req, res) => {
    res.send({ userId: req.userId });

    const idAccount = req.body.idAccount;
    const valueWithdraw = req.body.withdraw;

    const user = usersAccountArray.find(user => idAccount === user.id);
    if (user) {

        if (user.balance >= valueWithdraw) {

            user.balance -= valueDeposit;
            return res.status(200).end();
        } else {

            res.status(401).body({ message: "Erro: Saldo insuficiente." });
        }
    } else {

        res.status(401).body({ message: "Erro: Usuário não encontrado." });
    }
});

app.post("/account/remove", validaToken, (req, res) => {
    res.send({ userId: req.userId });

    const idAccount = req.body.idAccount;

    const userIndex = usersAccountArray.findIndex(user => idAccount === user.id);
    if (user) {

       delete usersAccountArray[userIndex];
        return res.status(200).end();
    } else {

        res.status(401).body({ message: "Erro: Usuário não encontrado." });
    }
});

app.get("/account/balance", validaToken, (req, res) => {
    res.send({ userId: req.userId });

    const idAccount = req.body.idAccount;

    const user = usersAccountArray.find(user => idAccount === user.id);
    if (user) {

        res.send(user.balance);
        
    } else {

        res.status(401).body({ message: "Erro: Usuário não encontrado." });
    }
});

app.post("/login", (req, res) => {
    if (req.body.user === "joao" && req.body.pwd === "1234") {
        const id = 1;
        const token = jwt.sign({ id }, secretKey, {
            expiresIn: 600
        });
        res.send({ token });
    } else {
        res.status(401).body({ message: "Usuário e/ou senha inválidos." });
    }
});

app.listen(port, () => {
    console.log("API Started!");
});
