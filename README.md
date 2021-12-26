# af-assembly
af-Assembly is a very basic 1-stack machine with 3 general purpose registers that allows you to execute assembly-like code using 64-bit integers.

# CLI
```bash
node af-asm.js my_code.asm [--debug]
```
# Basic syntax
## Operators
1. `push [64bit integer|rx|ry|rz]`
  - Push a register value or an integer value to the top of the stack
3. `pop [rx|ry|rz]`
  - Pop at the top of the stack, if a register name is not given then this instruction is equivalent to `pop rx` then `pop ry`
3. Binary operators : `add`, `sub`, bitwise `and`, bitwise `or`, bitwise `xor`
  - Use Y and X registers as inputs
4. Unary operators : bitwise `not`, print as a 64 bit number `print`, print as an ASCII char `pchar`
  - Use the value at the top of the stack as an input
## Loop / Conditional Jump
```asm
:my_loop
    ; some_code
    goto my_loop ; if the value at the top of the stack is not 0 then it will jump to :my_loop 
```
