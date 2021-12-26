; Output = ABCDEFGHIJKLMNOPQRSTUVWXYZ
push 65          ; start
push 65          ; op1
push 5           ; op2 <- nb iteration
pop              ; X 26, Y 65
add              ; stack <- 91 65
pop rz           ; z = 91, stack <- 65
; test conditional jump
push 177013      ; garbage value, stack <- 177013 65
:loop
	pop rx       ; getting rid of it
	pchar        ; prints the current stack
	push 1       ; stack <- 1 curr
	pop          ; 1 on X, curr on Y, stack <-
	add          ; ... stack <- (curr + 1)
	push rz      ; ... stack <- 91 (curr + 1)
	pop          ; 91 on X, (curr + 1) on Y, stack <-
	push ry      ; 91 on X, (curr + 1) on Y, stack <- (curr + 1)
	xor          ; ... stack <- (xor_ans) (curr + 1)
	goto loop   ; goto loop if current stack value is not 0
