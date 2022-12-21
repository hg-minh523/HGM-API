import { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import config from "../../config";
import { FaFacebookF } from 'react-icons/fa'
import { AiOutlineGooglePlus } from 'react-icons/ai'




interface RegisterProps {

}

const Register:FC<RegisterProps> = () => {
    return ( 
    <Container>
       <div className="wrapper">
            <form className="register-form">
                <div className="header">
                    <h1>CREATE ACCOUNT</h1>
                </div>

                <div className="form-body">

                    <div className="input-bar">
                        <input type="text" placeholder="Your name?"/>
                    </div>

                    <div className="input-bar">
                        <input type="email" placeholder="Email or username"/>
                    </div>

                    <div className="input-bar">
                        <input type="password" placeholder="Password"/>
                    </div>

                    <Button>CREATE ACCOUNT</Button>

                    <div className="ask">
                        <p>Already have account ? </p>
                        <Link to={config.routePath.login}>LOGIN</Link>
                    </div>
                </div>
                <div className="link">

                    <div className="icon fb">
                        <FaFacebookF />
                    </div>

                    <div className="icon gg">
                        <AiOutlineGooglePlus/>
                    </div>
                    
                </div>
            </form>
       </div>
    </Container>
    );
}
 
export default Register;

const Container = styled.div`
width: 100vw;
height: 100vh;

display: flex;
justify-content: center;
align-items: center;

    .wrapper{
        max-width: calc(100vw - 20px);
        width: 450px;
        
        .register-form {
            
            box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px ;
            max-width: 450px;
            width: 100%;

            padding: 30px;

            .header{
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .form-body{
                width: 100%;
                
                .input-bar{
                    height: 56px;
                    width: 100%;
                    background-color: #F4F4F4;

                    input {
                        width: 100%;
                        height: 100%;
                        padding: 20px;
                        background-color: transparent;
                        border: none;
                        outline: none;
                    }

                    &.input-bar{
                        margin-top: 20px;
                    }
                }
                
                .keep{
                    margin-top: 17px;
                    input {
                    }
                    label {
                        margin-left: 7px;
                    }
                }

                .ask{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-top: 10px;
                    
                    a{

                    }
                }
            }

            .link {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 25px;
                gap: 14px;

                .icon{
                    background-color: #6666a8;
                    border-radius: 999px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    height: 50px;
                    color: #F4F4F4;
                    cursor: pointer;

                    &.gg{
                        font-size: 25px;
                        background-color: #DE4B39;
                        
                    }

                    &.fb{
                        background-color: #3C5997;
                    }
                }
            }

        }
    }

`

const Button = styled.button`
    margin-top: 20px;
    border: none;
    width: 100%;
    height: 44px;
    background-color: var(--primary);
    cursor: pointer;
    color: #FAFAFA;
`