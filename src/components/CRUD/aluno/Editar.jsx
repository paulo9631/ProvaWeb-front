import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Editar = () => {
    const { id } = useParams() 

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("CC")
    const [ira, setIra] = useState("0.0")

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const alunoAtualizado = {nome, curso, ira}

        axios.put(`http://localhost:3000/alunos/update/${id}`, alunoAtualizado)
            .then(response => {

                alert(`Aluno de ID ${response.data._id} adicionado`)
                navigate('/listarAluno')
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/alunos/retrieve/${id}`)
            .then(response => {
                const {nome, curso, ira} = response.data

                setNome(nome)
                setCurso(curso)
                setIra(ira)
            })
            .catch(error => console.log(error))
    }, [id])

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Editar Aluno
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
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="select-tit-label">Curso</InputLabel>
                    <Select
                        labelId="select-tit-label"
                        label="Curso"
                        value={curso}
                        onChange={(event) => setCurso(event.target.value)}
                    >
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
                    value={ira}
                    onChange={(event) => setIra(parseFloat(event.target.value))}
                />


                <Box sx={{display: "flex", justifyContent: "center", mt: 2, mb: 2}}>
                    <Button type="submit"
                        variant="contained"
                        sx={{ my: 3 }}>
                        Atualizar
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default Editar