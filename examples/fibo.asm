push 1  ; a
push 1  ; b
print
push 44   ; ,
pchar
pop rx
push 20 ; -- max iteration
; so far stack <- 10 1 1
:fibo
	pop rz    ; update rz
	print
	push 44   ; ,
	pchar
	pop rx    ; destroy
	pop       ; X = b, Y = a, Z = rz, stack <-
	add       ; X = b, Y = a, Z = rz, stack <- (b + a)
	pop ry    ; X = b, Y = (b + a), Z = rz, stack <-
	push rx   ; X = b, Y = (b + a), Z = rz, stack <- b
	push ry   ; X = b, Y = (b + a),Z = rz, stack <- (b + a) b
	push rz   ; ... stack <- rz (b + a) b
	push 1    ; ... stack <- 1 rz (b + a) b
	pop       ; X = 1, Y = rz, Z = rz, stack <- (b + a) b
	sub       ; ... stack <- (rz - 1) (b + a) b
	goto fibo