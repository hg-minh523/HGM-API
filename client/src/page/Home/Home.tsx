import { FC } from 'react';
import styled from 'styled-components'

interface HomeProps {

}

const Home:FC<HomeProps> = () => {
    return ( 
        <Container>
            Home
        </Container>
     );
}
 
export default Home;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`