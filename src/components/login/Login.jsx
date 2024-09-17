import { Box, Button, Container, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [credentials, setCredentials] = useState({ login: "", senha: "" })
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setCredentials(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        // Requisição para o backend na rota de login
        axios.post('http://localhost:3000/login', credentials)
            .then(response => {
                if (response.data.res) {
                    navigate("/listarAluno")
                } else {
                    alert('Login ou senha inválidos')
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <Container maxWidth="xs">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 10
                }}
            >
                <Typography component="h1" variant="h5">
                    Tela Login
                </Typography>
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    name="login"
                    label="Login"
                    type="text"
                    id="login"
                    autoFocus
                    value={credentials.login}
                    onChange={handleChange}
                />
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    name="senha"
                    label="Senha"
                    type="password"
                    id="senha"
                    value={credentials.senha}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
            </Box>
        </Container>
    )
}

export default Login
