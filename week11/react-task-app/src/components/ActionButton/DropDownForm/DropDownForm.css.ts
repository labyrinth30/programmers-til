import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const taskForm = style({
    display: "flex",
    flexDirection: 'column',
    height: 'max-content',
    borderRadius: 4,
    marginTop: vars.spacing.small,
    fontSize: vars.fontSizing.T3,
    padding: vars.spacing.medium,
})

export const listForm = style({
    display: "flex",
    flexDirection: 'column',
    width: 'max-content',
    height: 'max-content',
    borderRadius: 20,
    marginRight: vars.spacing.listSpacing,
    fontSize: vars.fontSizing.T3,
    padding: vars.spacing.medium,
    backgroundColor: vars.color.list,
})

export const input = style({
    width: 'max-content',
    minHeight: 60,
    marginBottom: vars.spacing.medium,
    fontSize: vars.fontSizing.P1,
    border: 'none',
    boxShadow: vars.shadow.basic,
    borderRadius: 4,
    resize: 'none',
    outline: 'hidden',
    wordWrap: 'break-word',
})

export const button = style({
    width: 150,
    color: vars.color.brightText,
    padding: vars.spacing.medium,
    fontSize: vars.fontSizing.T3,
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: vars.color.mainDarker,
    ':hover': {
        backgroundColor: vars.color.mainFaded,
    }
})

export const buttons = style({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
})

export const close = style({
    marginLeft: vars.spacing.big2,
    fontSize: vars.fontSizing.T1,
    opacity: 0.5,
    cursor: 'pointer',
    ':hover': {
        opacity: 0.7,
    }
})  