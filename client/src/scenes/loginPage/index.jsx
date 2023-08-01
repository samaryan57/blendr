import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Form from "./Form";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const [isLoginPage, setIsLoginPage] = useState(true);
    const setPageStyle = (isLogin) => {
        setIsLoginPage(isLogin);
    }

    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={alt}
                p="1rem 6%"
                textAlign="center"
            >
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    Blendr&reg;
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "90%"}
                m="2rem auto"
                display="flex"
                justifyContent="center"
                gap="0"
            >
                {isLoginPage && isNonMediumScreens && 
                    <Box 
                        mr="0"
                    >
                        <img
                            width="320px"
                            height="500px"
                            style={{ 
                                objectFit: "cover",
                                borderTopLeftRadius: "1.5rem", 
                                borderBottomLeftRadius: "1.5rem",
                                m: 0,
                                display: "inline"
                            }}
                            src={"http://localhost:3001/assets/loginPic.jpg"}
                        />
                    </Box>
                }
                <Box 
                    p={isNonMobileScreens ? "3rem" : "2rem"}
                    borderRadius={isLoginPage ? undefined : "1.5rem"}
                    sx={{
                        borderTopRightRadius: "1.5rem",
                        borderBottomRightRadius: "1.5rem"
                    }}
                    ml="0"
                    backgroundColor={alt}
                    height={isLoginPage ? "500px" : undefined}
                >
                    <Typography
                        fontWeight="500"
                        variant="h5"
                        fontSize="20px"
                        sx={{
                            mb: "2.5rem",
                        }}
                    >
                        Blendr&reg; – where diversity blends seamlessly on a digital canvas.
                    </Typography>
                    <Form setPageStyle={setPageStyle} />
                </Box>
            </Box>
            
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                textAlign="center"
            >
                <Typography fontWeight="400" variant="h6" color={neutralLight}>&copy; Blendr inc.</Typography>
            </Box>
        </Box>
    );
};

export default LoginPage;