import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --primary: #64BBF3;
        --text-color: #333;
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

`