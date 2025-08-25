const numerodasorte = 7
let randomNumber = Math.floor(Math.random() * 10)+ 1;
while(numerodasorte !== randomNumber)
{
    console.log("Não é o numero :"+ randomNumber);
    randomNumber = Math.floor(Math.random() * 10)+ 1;
}
console.log(" É o numero:"+ randomNumber);