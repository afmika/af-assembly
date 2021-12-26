; reverse an even sized stack
; for an odd number, push a value that doesnt mean anything
; to make it even
push 1
push 2
push 3
push 4
:rev
	print
	pop rz
	push 44
	pchar
	pop rz
	goto rev ; stop if stack is empty