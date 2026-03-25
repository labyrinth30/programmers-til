// warpper, modalWindow, header, closeButton, title
// content, inputContainer, input, buttonContainer, button

import { style } from '@vanilla-extract/css';
import { vars } from '../../App.css';

export const warpper = style({
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
    maxHeight: "auto",
    overflowY: "auto",
    backgroundColor: vars.color.mainDarker,
    opacity: 0.95,
    borderRadius: 14,
    padding: 20,
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

export const buttons = style({
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 50,
});

export const updateButton = style({
    border: "none",
    borderRadius: 5,
    fontSize: vars.fontSizing.T4,
    padding: vars.spacing.big2,
    cursor: 'pointer',
    backgroundColor: vars.color.updateButton,
    ":hover": {
        opacity: 0.8
    }

});

export const deleteButton = style({
    border: "none",
    borderRadius: 5,
    marginRight: vars.spacing.big1,
    fontSize: vars.fontSizing.T4,
    padding: vars.spacing.big2,
    cursor: 'pointer',
    backgroundColor: vars.color.deleteButton,
    ":hover": {
        opacity: 0.8
    }
});

export const input = style({
    width: "100%",
    minHeight: "30px",
    border: "none",
    borderRadius: 5,
    marginBottom: vars.spacing.big2,
    padding: vars.spacing.medium,
    fontSize: vars.fontSizing.T4,
    boxShadow: vars.shadow.basic,
});
