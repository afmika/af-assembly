push 5
push 4
push 3 ; X = 0, Y = 0, Z = 0, stack 3 4 5
pop rx ; X = 3, Y = 0, Z = 0, stack 4 5
pop ry ; X = 3, Y = 4, Z = 0, stack 5
pop rz ; X = 3, Y = 4, Z = 5, stack
add    ; X = 3, Y = 4, Z = 5, stack 7
print    ; 7
push rz ; X = 3, Y = 4, Z = 5, stack 5 7
print   ; 5
pop     ; X = 5, Y = 7, Z = 5, stack 
add
print   ; 12