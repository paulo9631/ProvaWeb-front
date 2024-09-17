import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Cadastrar = () => {
    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("CC") // variável iniciada com valor padrão, para evitar valor nulo
    const [ira, setIra] = useState("0.0")

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const novoAluno = { nome, curso, ira }
        axios.post('http://localhost:3000/alunos/register', novoAluno)
            .then(response => {
                alert(`Aluno ID: ${response.data._id} adicionado`)
                navigate("/listarAluno")
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Cadastrar Aluno
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    name="nome"
                    label="Nome Completo"
                    autoFocus
                    onChange={(event) => setNome(event.target.value)}
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="select-tit-label">Curso</InputLabel>
                    <Select
                        labelId="select-tit-label"
                        label="Curso"
                        value={curso}
                        onChange={(event) => setCurso(event.target.value)} // a variavel de estado curso será atualizada quando selecionada no select
                    >
                        {/* Um item de menu para cada curso */}
                        <MenuItem value="CC">Ciência da Computação</MenuItem>
                        <MenuItem value="ES">Engenharia de Software</MenuItem>
                        <MenuItem value="EC">Engenharia da Computação</MenuItem>
                        <MenuItem value="SI">Sistemas de Informação</MenuItem>
                        <MenuItem value="DD">Design Digital</MenuItem>
                        <MenuItem value="RC">Redes de Computadores</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ira"
                    name="ira"
                    type="number"
                    label="IRA"
                    inputProps={{
                        maxLength: 10,
                        step: "0.1"
                    }}
                    onChange={(event) => setIra(parseFloat(event.target.value))}
                />

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button type="submit"
                        variant="contained"
                        sx={{ my: 3 }}>
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default Cadastrar