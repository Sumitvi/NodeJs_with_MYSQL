const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
let express = require("express");
let app = express();
let port = 8080;
let path = require("path");


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "Delta_app",
    password: "Sumit@2004"
});


// // INSERTING ONLY ONE ROW DATA 
// let q = "INSERT INTO USER (ID , USERNAME , EMAIL , PASSWORD) VALUES (?,?,?,?)";
// let user = ["12","Sumit","sumit@gmail.com","Sumit123"];



// INSERTING MULTIPLE DATA
// let q = "INSERT INTO USER (ID , USERNAME , EMAIL , PASSWORD) VALUES ?";
// let users = [["12b","Sumitb","sumit@gmail.comb","Sumit123b"],
//             ["12c","Sumitc","sumit@gmail.comc","Sumit123c"]];





let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ]
}



// INSERTING 100 USERS DATA USING FAKER PACKAGE
// let q = "INSERT INTO USER (ID , USERNAME , EMAIL , PASSWORD) VALUES ?";
// let data = [];

// for(let i =1 ; i<=100 ; i++){
//     data.push(getRandomUser());
// }


// try {
//     connection.query(q, [data], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     })

// } catch (err) {
//     console.log(err);
// }

// connection.end();


//   console.log(getRandomUser());

app.listen(port,()=>{
   
    console.log("Server has listen");
})


app.get("/",(req,res)=>{

    let q = "SELECT COUNT(*) FROM USER;";

    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let count = result[0]["COUNT(*)"];
            res.render("home.ejs", {count});
            // console.log(count);
            // res.send("Send");
        
        })

    }catch(err){
        console.log("An Error Occurs",err);
    }
})


app.get("/user",(req,res)=>{
    let q = "SELECT * FROM USER";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            console.log(result);
            console.log(result);
            // res.render("show.ejs",{result});
            // res.send(result);
            res.render("show.ejs",{result});
        })

    }catch(err){
        console.log("Some Error From DB");


    }
})

