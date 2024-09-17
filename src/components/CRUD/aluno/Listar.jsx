import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { styled } from "@mui/material/styles"
import { tableCellClasses } from "@mui/material/TableCell"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Listar = () => {
    const [alunos, setAlunos] = useState([])
    const [mediaIra, setMediaIra] = useState(0)
    const [colorir, setColorir] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3000/alunos/list')
            .then(response => {
                const alunosData = response.data
                setAlunos(alunosData)
                setMediaIra(calculaMediaIra(alunosData))
            })
            .catch(error => console.log(error))
    }, [])

    const calculaMediaIra = alunos => {
        if (alunos.length === 0) return 0
        const iraSoma = alunos.reduce((acc, aluno) => acc + aluno.ira, 0)
        return iraSoma / alunos.length
    }

    const deleteAlunoById = id => {
        if (window.confirm("Deseja Excluir?")) {
            axios.delete(`http://localhost:3000/alunos/delete/${id}`)
                .then(() => {
                    setAlunos(alunos.filter(aluno => aluno._id !== id))
                })
                .catch(error => console.log(error))
        }
    }

    const toggleColorir = () => {
        setColorir(!colorir)
    }

    return (
        <>
            <Typography variant="h5" fontWeight="bold">Listar Alunos</Typography>
            <Button variant="contained" onClick={toggleColorir} sx={{ mb: 2 }}>
                {colorir ? "Remover Cores" : "Destacar Alunos"}
            </Button>
            <TableContainer component={Paper} sx={{ mt: 4, mb: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Nome</StyledTableCell>
                            <StyledTableCell>Curso</StyledTableCell>
                            <StyledTableCell>IRA</StyledTableCell>
                            <StyledTableCell>Ações</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alunos.map(aluno => (
                            <StyledTableRow
                                key={aluno._id}
                                sx={{
                                    backgroundColor: colorir
                                        ? aluno.ira >= 7
                                            ? '#cce5ff' // azul claro para alunos acima da média
                                            : '#f8d7da' // vermelho claro para alunos abaixo da média
                                        : 'inherit' // sem cor quando `colorir` está desativado
                                }}
                            >
                                <StyledTableCell>{aluno._id}</StyledTableCell>
                                <StyledTableCell>{aluno.nome}</StyledTableCell>
                                <StyledTableCell>{aluno.curso}</StyledTableCell>
                                <StyledTableCell>{aluno.ira}</StyledTableCell>
                                <StyledTableCell>
                                    <Box>
                                        <IconButton aria-label="edit" color="primary" component={Link} to={`/editarAluno/${aluno._id}`}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" color="primary" onClick={() => deleteAlunoById(aluno._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                        {/* Linha com a média aritmética destacada */}
                        {alunos.length >= 5 &&
                            <StyledTableRow sx={{ backgroundColor: '#f0f8ff' }}>
                                <StyledTableCell colSpan={3} sx={{ fontWeight: 'bold' }}>Média Aritmética do IRA</StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: 'bold' }}>{mediaIra.toFixed(2)}</StyledTableCell>
                                <StyledTableCell />
                            </StyledTableRow>
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

export default Listar
