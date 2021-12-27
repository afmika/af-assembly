const fs = require ('fs');

const [ , , filename, op] = process.argv;
if (!filename) {
    console.log('Syntax : node run.js filename [--debug]');
    return;
}
const code = fs.readFileSync (filename).toString();

function run (code, debug = false) {
    const stack = [];
    const reg = {X : 0, Y : 0, Z : 0};
    const instrx = code.split(/[\r\n]+/g);
    const code_regx = /([:a-z]+)?[ ]*(.*)?/;
    const register_reg = /r[xyz]/;
    const regIndex = str => {
        let temp = str.substring(1).toUpperCase();
        if (reg[temp] == undefined)
            throw 'Error : Register ' + temp + ' unrecognized';
        return temp;
    }
    const no_args = [
        'print', 'sub', 'add',
        'not', 'and', 'or', 'xor'
    ];
    const goto_map = {};
    let stdout_string = '';
    const stdout = x => { stdout_string +=  x;};
    const showState = (instr, value) => {
        const r_str = Object.keys(reg)
                            .map(r => r + ' = ' + reg[r])
                            .join(', ');
        let str = r_str;
        let s = stack;
        str += ' :: stack <- ' + s.map((u, i) => s[s.length - i - 1]).join(', ');
        str += ' :: ' + instr + ' ' + value;
        console.log (str);
    }
    
    for (let i = 0; i < instrx.length; i++) {
        let row = instrx[i];
        // cleanup
        if (stdout_string != '') stdout_string = '';
        if (row.trim() == '') continue;
        row = row.split(';')[0]; // remove comments
        if (row == '') continue; // comment only
        row = row.replace(/^[ \t\r]+/g, ''); // remove indents
        
        code_regx.test(row);
        let [instr, value] = [RegExp.$1, RegExp.$2].map(
            it => it.replace(/[\t\r ]+/g, '').toLowerCase()
        );
        
        // if (no_args.includes(instr)) {
            // throw 'Error : ' + instr + ' does not have any arg, got ' + value;
        // }
        
        value = isNaN(parseInt(value)) ? value : parseInt(value);
        
        
        // label goto
        if (instr.startsWith(':')) {
            goto_map[instr.substring(1)] = i;
            continue;
        }
        let top_stack = stack[stack.length - 1];

        switch (instr) {
            case 'push':
                if (register_reg.test(value)) // reg value === push ==> stack
                    stack.push(reg[regIndex(value)]);
                else                      // number === push ===> stack
                    stack.push(value);
                break;
            case 'pop':
                if (register_reg.test(value)) // top stack == pop ==> reg 
                    reg[regIndex(value)] = stack.pop(); // single pop
                else {
                    reg.X = stack.pop();
                    reg.Y = stack.pop();
                    if (reg.X == undefined || reg.Y == undefined)
                        throw 'Error : stack empty, pop can only work on 2 value at once';
                }
                break;
            case 'add':
                stack.push(reg.Y + reg.X);
                break;
            case 'sub':
                stack.push(reg.Y - reg.X);
                break;
            case 'and':
                stack.push(reg.Y & reg.X);
                break;
            case 'or':
                stack.push(reg.Y | reg.X);
                break;
            case 'xor':
                stack.push(reg.Y ^ reg.X);
                break;
            case 'not':
                const n = stack.pop();
                stack.push(~n);
                break;
            case 'bitr':
                stack.push(reg.Y >> reg.X);
                break;
            case 'bitl':
                stack.push(reg.Y << reg.X);
                break;
            case 'print':
                if (top_stack == undefined)
                    throw 'Error : Stack empty, unable to print';
                stdout(top_stack);
                break;
            case 'pchar':
                if (top_stack == undefined)
                    throw 'Error : Stack empty, unable to print';
                stdout(String.fromCharCode(top_stack));
                break;
            case 'goto':
                let dont_skip = true;
                if (stack.length == 0) dont_skip = false; // no items
                if (stack[stack.length - 1] == 0) dont_skip = false; // if top == 0
                if (dont_skip) {
                    i = goto_map[value];
                    if (i == undefined)
                        throw 'Error : Label <' + value + '> doesnt exist';
                }
                break;
            default:
                throw 'Error : Unrecognized instruction <' + instr + '>';
        }
        if (debug) {
            showState (instr, value);
            if (stdout_string != '')
                console.log (stdout_string);
        } else {
            process.stdout.write (stdout_string);
        }
    }
}

run (code, op == '--debug');