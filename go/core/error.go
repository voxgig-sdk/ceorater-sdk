package core

type CeoraterError struct {
	IsCeoraterError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCeoraterError(code string, msg string, ctx *Context) *CeoraterError {
	return &CeoraterError{
		IsCeoraterError: true,
		Sdk:              "Ceorater",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CeoraterError) Error() string {
	return e.Msg
}
