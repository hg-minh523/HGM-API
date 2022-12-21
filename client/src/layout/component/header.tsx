import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiAlignJustify } from 'react-icons/fi'
import { BiSearch } from 'react-icons/bi'

interface HeaderProps {}


const Header:FC<HeaderProps> = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const inputWrapRef = useRef<HTMLDivElement>(null)
    const [text, setText] = useState<string>('')

    useEffect(() => {
        if(inputRef.current && inputRef.current?.value !== ''){
            inputWrapRef.current?.setAttribute('style', 'width: 300px')
        }
        else {
            inputWrapRef.current?.setAttribute('style', 'width: 40px')
        }

    }, [text])
    
    
    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    
    return ( 
        <HeaderBar>
            <Container>
                <FiAlignJustify className="icon select"/>

                <div ref={inputWrapRef} className="wrap-search-bar">
                    <input value={text} ref={inputRef} type="text" onInput={handleInput} placeholder="Search here ..." />
                    <div className="wrap-icon"> 
                        <BiSearch className="icon search"/>
                    </div>

                </div>

            </Container>
        </HeaderBar>
     );
}
 
export default Header;

const HeaderBar = styled.div`

height: var(--header-height);
width: 100vw;
background-color: var(--primary);
display: flex;
align-items: center ;
justify-content: center;


`

const Container = styled.div`
width: 1200px;
height: 100%;
display: grid;
align-items: center;
grid-template-columns: 10% 50% 20% 20%;

    .select {
        font-size: 30px;
    }
    .wrap-search-bar{
        position: relative;
        -webkit-transition: all .5s ease-in-out;
        transition: all .5s ease-in-out;
        width: 40px;
        height: 40px;
        background: white;
        border-radius: 25px;
        border: 4px solid white;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 0;
        &:hover {
            width: 300px!important;
            cursor: pointer;
            
        }

        &:hover input {
            display: block;
        }

        input{
            position: absolute;
            width: 100%;;
            height: 80%;
            line-height: 30px;
            outline: 0;
            border: none;
            display: none;
            font-size: 1em;
            border-radius: 20px;
            padding: 0 20px;
            background-color: transparent;
            transition: all .5 ease-in-out;

            &:not(:placeholder-shown) {
                display: block;
                
            }
        }




        /* width: ; */
        .wrap-icon{
            box-sizing: border-box;
    /* position: absolute; */
    color: #07051a;
    text-align: center;
    font-size: 1.2em;
    transition: all .5s ease-in-out;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: var(--secondary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99;
            .search {
                font-size: 25px;
            }
    }}

    


`