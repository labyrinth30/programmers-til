import { style } from "@vanilla-extract/css"
import { vars } from "../../App.css.ts"

export const container = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 'max-content',
    backgroundColor: vars.color.mainDarker,
    padding: vars.spacing.big2,
    width: '100%',
})

export const title = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T2,
    marginRight: vars.spacing.big1,
    flexShrink: 0,
})

export const boardRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: vars.spacing.big1,
    width: '100%',
    minWidth: 0,
})

export const addButton = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T2,
    cursor: 'pointer',
    ":hover": {
        opacity: 0.8,
    }
})

export const boardItem = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T3,
    padding: vars.spacing.medium,
    borderRadius: 10,
    backgroundColor: vars.color.mainFaded,
    cursor: 'pointer',
    ':hover': {
        opacity: 0.8,
        transform: "scale(1.03)",
    }
})

export const boardItemActive = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T3,
    backgroundColor: vars.color.selectedTab,
    padding: vars.spacing.medium,
    borderRadius: 10,
    cursor: 'pointer',
})

export const addSection = style({
    display: 'flex',
    alignItems: 'center',
    marginLeft: "auto",
    flexShrink: 0,
})

export const smallTitle = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T3,
})
