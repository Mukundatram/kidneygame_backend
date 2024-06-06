//creating a HTTP server 
//Express
//node default library => no


// const express = require("express") //Creating your hospital

// function sum(n) {
//     let ans = 0;
//     for (let i = 1; i <= n; i++) {
//         ans = ans + i;
//     }
//     return ans;


// }
// const app = express(); // creating the clinic

// app.get("/", function (req, res) {
//     const n = req.query.n;
//     const ans = sum(n)
//     res.send("Hii Your Answer Is "+ans);
//     // res.send("HII there !! I am Mukund what about u")
// })
// app.listen(3000); //listening  the specific port
const express = require("express") //Creating your hospital

const app = express(); // creating the clinic


const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());
// req and res => request and response
app.get("/", function (req, res) {
    const johnkidney = users[0].kidneys;
    const numberofkidneys = johnkidney.length;
    let numberofhealthykidneys = 0;
    for (let i = 0; i < johnkidney.length; i++) {
        if (johnkidney[i].healthy) {
            numberofhealthykidneys = numberofhealthykidneys + 1;

        }
    }
    const numberofunhealthykidney = numberofkidneys - numberofhealthykidneys;
    res.json({
        numberofkidneys,
        numberofhealthykidneys,
        numberofunhealthykidney
    })
})
app.post("/", function (req, res) {
    const ishealthy = req.body.ishealthy;
    users[0].kidneys.push({
        healthy: ishealthy
    })
    res.json({
        msg: "Done!"
    })
})

app.put("/", function (req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {

        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msg: "replaced or retrived kidney"
    })
})


//Removing all the unhealthy kidneys

app.delete("/", function (req, res) {
    // you should return a 411
    // only is atleast one unhealthy kidneys do this ,else return 411

   
    if (isthereatleastoneunhealthykidney()) {
        const newkidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newkidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newkidneys;
        res.json({ msg: "Done!! :: removed unhealthy kidneys" })
    }
    else {

        res.status(411).json({
            msg: "you have no bad kidneys"
        })
    }
})
function isthereatleastoneunhealthykidney() {

    let atleastoneunhealthykidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastoneunhealthykidney = true;
        }
    }
    return atleastoneunhealthykidney
}

app.listen(3200); //listening  the specific port