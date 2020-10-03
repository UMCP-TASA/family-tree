import React from "react"
import styled from "styled-components"

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {

}

const StyledInput = styled.input``

function TextInput(props: TextInputProps, ref: React.Ref<HTMLInputElement>) {
    const { ...rest} = props
    return (
        <StyledInput type="text" {...rest} ref={ref}></StyledInput>
    )
}

export default React.forwardRef(TextInput)