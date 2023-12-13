    import styled from "styled-components";
    const Header = () => {

        const Navbar = styled.div`
            background-color: #EF476F;
            width: 100%;
            height: 100px;
            display: flex;           
            align-items: center;  
            justify-content: flex-end;

        h1{ 
            color: white;
            margin: 0;
        }

        img{
            height: 100px;
            width: auto;          
            margin-left: 20px; 
        }

        @media (max-width: 768px) {
            flex-direction: column; 
            height: auto; 
            width: 100%;

            h1 {
                margin-bottom: 10px; 
            }

            img {
                margin-left: 0; 
            }
            }  
    `;

        return (
            <>
                <Navbar>
                    <h1>PRE-FLIGHT-CHECKLIST</h1>
                    <img src="Logo.png" alt="" />
                </Navbar>
            </>

        );
    }

export default Header;
