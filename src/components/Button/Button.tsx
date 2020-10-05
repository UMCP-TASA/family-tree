import React from "react"
import { Link } from "gatsby"
import Button, { ButtonProps } from "@material-ui/core/Button"

export interface CustomButtonProps extends ButtonProps {
    to?: string
}

function CustomButton(props: CustomButtonProps, ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>) {
    const { to, ...rest } = props

    return <Button component={to ? Link : `button`} to={to} {...rest} />
}

export default React.forwardRef(CustomButton)