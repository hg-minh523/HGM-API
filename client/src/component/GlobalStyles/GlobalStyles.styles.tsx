import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --primary: #64BBF3;
        --secondary: #469df9;
        --text-color: #333;
        --white-color: #F7F7F7;
        --black-color: #303030;
        --header-height: 60px;
    }
    
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Trebuchet MS', sans-serif;
    }
    html {
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
        text-rendering: optimizeSpeed;
    }

    a {
        color: var(--text-color);
    }

    .icon {
        cursor: pointer;
        color: var(--white-color);
        transition: all .2s ease-in-out;

        &:hover {
            color: var(--black-color);
        }
    }

`