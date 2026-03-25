// wrapper, modalWindow, header, closeButton, title, body

import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const wrapper = style({
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    zIndex: 10000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const modalWindow = style({
    display: 'flex',
    flexDirection: 'column',
    width: '800px',
    height: 'max-content',
    alignItems: 'center',
    maxHeight: "500px",
    overflowY: "auto",
    backgroundColor: vars.color.mainDarker,
    opacity: 0.95,
    borderRadius: "14px",
    padding: "20px",
    boxShadow: vars.shadow.basic,
    color: vars.color.brightText,
});

export const header = style({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "40px",
});

export const closeButton = style({
    cursor: 'pointer',
    fontSize: vars.fontSizing.T2,
    marginTop: "-20px",
    ":hover": {
        opacity: 0.8,
    }
});

export const title = style({
    fontSize: vars.fontSizing.T2,
    color: vars.color.brightText,
    marginRight: 'auto',
    marginBottom: vars.spacing.medium,
});

export const body = style({
    maxHeight: '400px',
    width: '100%',
    overflowY: "auto",
});
