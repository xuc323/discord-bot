const { Message, Client } = require("discord.js");

module.exports = {
    name: "math",
    description: "Perform math calculation. (+-*/%^)",
    args: true,
    usage: "[num1] [operator] [num2]",
    category: "math",
    /**
     * performs basic math operations
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     * @returns 
     */
    execute(message, args, client) {
        if (args.length != 3) {
            return message.channel.send(`Please follow the format: \`${this.usage}\``);
        }

        const num1 = Number(args[0]);
        const num2 = Number(args[2]);

        if (!num1 || !num2) {
            return message.channel.send("Only numbers are allowed.");
        }

        switch (args[1]) {
            case "+":
                message.channel.send(`${args[0]} + ${args[2]} = ${num1 + num2}`);
                break;
            case "-":
                message.channel.send(`${args[0]} - ${args[2]} = ${num1 - num2}`);
                break;
            case "*":
                message.channel.send(`${args[0]} * ${args[2]} = ${num1 * num2}`);
                break;
            case "/":
                message.channel.send(`${args[0]} / ${args[2]} = ${num1 / num2}`);
                break;
            case "%":
                message.channel.send(`${args[0]} % ${args[2]} = ${num1 % num2}`);
                break;
            case "^":
                message.channel.send(`${args[0]} ^ ${args[2]} = ${Math.pow(num1, num2)}`);
                break;
            default:
                message.channel.send("Unknown operator.");
                break;
        }
    }
}