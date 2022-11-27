var readline = require('readline');
var fs = require('fs');
var rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});

rl.question("What are you trying to do? (1: Save account, 2: Get account, 3: Dump accounts): ", function(answer) {
    if (isNaN(answer)) {
        console.log("Please enter a number GRRRRRRRRRRRRRRRRRRR");
        return process.exit(1);
    } 

    if (answer != 1 && answer != 2 && answer != 3) {
        console.log("Please enter a valid number");
        return process.exit(1);
    }

    if (answer == 1){
        rl.question("Enter type of account: ", function(accType){
            rl.question("Enter username: ", function(username) {
                rl.question("Enter email: ", function(email) {
                    rl.question("Enter password: ", function(password) {
                        console.log("Saving account...");

                        let account = {
                            "type": accType,
                            "username": username,
                            "email": email,
                            "password": password
                        }

                        let accounts = [];


                        if (fs.existsSync("alts.json")) {
                            accounts = JSON.parse(fs.readFileSync("alts.json"));
                        }

                        accounts.push(account);
                        fs.writeFileSync("alts.json", JSON.stringify(accounts));

                        console.log("Account saved!");


                        return process.exit(0);
                    });
                })
            });
        })
    } else if (answer == 2) {
        rl.question("Enter username of account: ", function(username){

            let accounts = JSON.parse(fs.readFileSync("alts.json"));

            for (let i = 0; i < accounts.length; i++) {
                let acc = accounts[i].username.toLowerCase();
                let usernameToLowerCase = username.toLowerCase();
                if (acc.includes(usernameToLowerCase)) {
                    console.log(`Type: ${accounts[i].type}\nUsername: ${accounts[i].username}\nEmail: ${accounts[i].email}\nPassword: ${accounts[i].password}`);
                    return process.exit(0);
                }
            }

            console.log("Account not found");
            return process.exit(1);
        })
    } else if (answer == 3){
        rl.question("Type of accounts to dump: ", function(type){

            let accounts = JSON.parse(fs.readFileSync("alts.json"));

            for (let i = 0; i < accounts.length; i++) {
                let typee = accounts[i].type.toLowerCase();
                let typeToLowerCase = type.toLowerCase();
                
                if (typee.includes(typeToLowerCase)) {
                    console.log(`\nUsername: ${accounts[i].username}\nEmail: ${accounts[i].email}\nPassword: ${accounts[i].password}\n\n`);
                }
            }
    
            return process.exit(0);

        })
    }
})
