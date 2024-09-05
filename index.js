const express = require("express");
const crypto = require("crypto");
const app = express();

app.use(express.static("public")); //Define o local dos arquivos estáticos
app.use(eudxpress.static("./public")); //Define o local dos arquivos estáticos
app.set("view engine", "pug"); //Define o motor de renderizacao das minhas paginas dinamicas
app.set("views", "./views"); //Define o local onde estão as minhas páginas dinâmicas

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//mudei irraaaa

<<<<<<< HEAD
// Lista de usuários
=======
//Lista de usuários
>>>>>>> c134d2c58e9584653bfaeb1b3bbbea32e3b50408
const users = [
    {
        uid: 1,
        name: "Wellington Wagner",
        email: "well@example.com",
        password: "senha123",
    },
    {
        uid: 2,
        name: "Maria Clara",
        email: "maria.clara@example.com",
        password: "senha456",
    },
    {
        uid: 3,
        name: "João Gabriel",
        email: "joao.gabriel@example.com",
        password: "senha789",
    },
    {
        uid: 4,
        name: "Ana Luiza",
        email: "ana.luiza@example.com",
        password: "senha321",
    },
    {
        uid: 5,
        name: "Carlos Eduardo",
        email: "carlos.eduardo@example.com",
        password: "senha654",
    },
    {
        uid: 6,
        name: "Beatriz Santos",
        email: "beatriz.santos@example.com",
        password: "senha987",
    },
];

<<<<<<< HEAD
let sessionToken;
=======
let session = {};
>>>>>>> c134d2c58e9584653bfaeb1b3bbbea32e3b50408

// Função de autenticação
function autenticador(email, password) {
    let count;
    let token;

    for (count = 0; count < users.length; count++) {
<<<<<<< HEAD
        if (users[count].email === email &&            users[count].password === password) {
            token = gerarToken(users[count]);
            return { uid: users[count].uid, authToken: token};
=======
        if (
            users[count].email === email &&
            users[count].password === password
        ) {
            token = gerarToken(users[count]);
            return { user: users[count], authToken: token };
>>>>>>> c134d2c58e9584653bfaeb1b3bbbea32e3b50408
        }
    }
    return null;
}

// Função para gerar um token baseado nas informações do usuário
function gerarToken(user) {
    const tokenBase = `${user.uid}-${user.email}-${Date.now()}`;
    return crypto.createHash("sha256").update(tokenBase).digest("hex"); //Cria um hash SHA-256 com o token base
}

// Middleware de autenticação
function authMiddleware(req, res, next) {
<<<<<<< HEAD
    const { authToken } = req.query;
    //const user = users.find((u) => gerarToken(u) === authToken);
    const user = users.find(() => sessionToken.authToken === authToken);
    if (user) {
        req.user = user;
        next();
    } else {
=======
    const {authToken } = req.query;
    
    if (session.authToken === authToken) {
        req.user = session.user;
        console.log(session.user);
        next();
    } else {
        console.log(session.user);
>>>>>>> c134d2c58e9584653bfaeb1b3bbbea32e3b50408
        res.status(401).redirect("/");
    }
}

//Rota principal: wwww.exemplo.br/
app.get("/", (_, res) => {
    res.render("login");
});
<<<<<<< HEAD
=======

>>>>>>> c134d2c58e9584653bfaeb1b3bbbea32e3b50408
// Rota de autenticação
app.post("/authenticated", (req, res) => {
    const { email, password } = req.body;
    const authResult = autenticador(email, password);
<<<<<<< HEAD
    sessionToken = autenticador(email, password);
    
=======
    session = autenticador(email, password);

>>>>>>> c134d2c58e9584653bfaeb1b3bbbea32e3b50408
    if (authResult) {
        res.status(200).json({
            message: "Login realizado com sucesso!",
            authToken: authResult.authToken,
        });
        //res.redirect(`/home?token=${authResult.token}`);
    } else {
        res.status(401).json({ message: "Usuário ou senha inválidos" });
    }
});

// Rota protegida - Home
app.get("/home", authMiddleware, (req, res) => {
<<<<<<< HEAD
    res.render("home", { produtos, user: req.user });
=======
    res.render("home", { produtos, user: session.user, authToken: session.authToken });
>>>>>>> c134d2c58e9584653bfaeb1b3bbbea32e3b50408
});

// Produtos para exibição

const produtos = [
    {
        id: 1,
        nome: "Notebook",
        descricao:
            "Notebook Dell Inspiron 15, com processador Intel i7, 16GB de RAM, 512GB SSD, tela Full HD de 15.6 polegadas.",
        preco: 2999.99,
    },
    {
        id: 2,
        nome: "Mouse",
        descricao:
            "Mouse sem fio Logitech MX Master 3, ergonômico, com sensor de alta precisão e bateria recarregável.",
        preco: 99.99,
    },
    {
        id: 3,
        nome: "Teclado",
        descricao:
            "Teclado mecânico sem fio Keychron K2, com switches Red, retroiluminação RGB, compatível com Windows e macOS.",
        preco: 199.99,
    },
    {
        id: 4,
        nome: "Monitor",
        descricao:
            "Monitor LG UltraWide 34'', resolução 2560x1080, tecnologia IPS, ideal para multitarefa e edição de vídeo.",
        preco: 1499.99,
    },
    {
        id: 5,
        nome: "Headset",
        descricao:
            "Headset Gamer HyperX Cloud II, som surround 7.1, microfone removível, estrutura em alumínio.",
        preco: 499.99,
    },
    {
        id: 6,
        nome: "Impressora",
        descricao:
            "Impressora Multifuncional HP DeskJet 3776, com Wi-Fi, impressão, cópia e digitalização, compatível com smartphones e tablets.",
        preco: 399.99,
    },
];

// Rota protegida - Produtos
app.get("/produtos", authMiddleware, (req, res) => {
<<<<<<< HEAD
    res.render("produtos", { produtos, user: req.user });
=======
    res.render("produtos",{authToken: session.authToken, produtos});
>>>>>>> c134d2c58e9584653bfaeb1b3bbbea32e3b50408
});

// Rota protegida - Cadastro
app.get("/cadastro", authMiddleware, (req, res) => {
<<<<<<< HEAD
    res.render("cadastro", { user: req.user });
=======
    res.render("cadastro",{authToken: session.authToken});
>>>>>>> c134d2c58e9584653bfaeb1b3bbbea32e3b50408
});

// Iniciar o servidor
const server = app.listen(3000, "0.0.0.0", () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(
        `Aplicação WesleyTech Store está rodando no endereço IP ${host} e na porta ${port}`,
    );
});
