#! /usr/bin/env node
import chalk, { backgroundColorNames } from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import chalkAniamtion from "chalk-animation";
import promptSync from "prompt-sync";
import gradient from "gradient-string";
const prompt = promptSync();
let withdrawAmount: number | undefined;
let depositAmount: number | undefined;
let id: string | undefined;
let balance: number;
let continueChoice;

const wait = (ms = 500) => new Promise((r) => setTimeout(r, ms));
const Secondwait = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
function welcome() {
  figlet("Faran Bank Limited", (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}
async function Identity() {
  let identity: {id:string, pin:number}= await inquirer.prompt([
    {
      name: "id",
      type: "string",
      message: "Please enter your id",
    },
    {
      name: "pin",
      type: "password",
      message: "Please enter your pin",
    },
  ]);
  id = identity.id;
}

function Balance() {
  return Math.floor(Math.random() * 10000) + 1000;
}
async function choices() {
  let choice = await inquirer.prompt([
    {
      name: "options",
      type: "list",
      message: "Please choose to : ",
      choices: ["Withdraw", "Deposit", "Exit"],
    },
  ]);
  return ATM(choice.options);
}
async function ATM(choice: string) {
  const spinner = createSpinner("Wait Please...").start();
  await Secondwait();
  spinner.success({ text: `` });
  if (choice === "Withdraw" && balance > 0) {
    let withdrawAmount = parseFloat(prompt("Plese enter amount to withdraw"));
    balance = balance - withdrawAmount;
  } else if (choice === "Deposit") {
    let depositAmount = parseFloat(prompt("Please enter amount to deposit"));
    balance = balance + depositAmount;
  } else if (choice === "Exit") {
    process.exit(0);
  }
  else{
    console.log(chalk.red("Sorry! You don't have any credits left"))
  }
}
async function showBalance() {
  figlet(`Welcome ${id}`, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
  console.log(chalk.bgCyan("\tBalance"));
  const currentBalance = chalkAniamtion.rainbow(` \tBALANCE : \t${balance}$`);
  await Secondwait();
  currentBalance.stop();
}
async function cont() {
  let cont = await inquirer.prompt([
    {
      name: "Choice",
      type: "list",
      message: "Do you want to continue:",
      choices: ["Yes", "No"],
    },
  ]);
  return cont.Choice;
}
console.clear();
welcome();
await wait();
await Identity();
balance = Balance();
do {
  console.clear();
  await wait();
  showBalance();
  await Secondwait();
  await choices();
  await Secondwait();
  continueChoice = await cont();
} while (continueChoice === "Yes");
