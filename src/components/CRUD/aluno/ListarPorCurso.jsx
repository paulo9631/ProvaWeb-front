import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const ListarPorCurso = () => {
  const [alunosPorCurso, setAlunosPorCurso] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/alunos/list')
      .then(response => {
        const alunosData = response.data;
        const agrupadosPorCurso = agruparAlunosPorCurso(alunosData);
        setAlunosPorCurso(agrupadosPorCurso);
      })
      .catch(error => console.log(error));
  }, []);

  const agruparAlunosPorCurso = (alunos) => {
    return alunos.reduce((acc, aluno) => {
      const curso = aluno.curso;
      if (!acc[curso]) acc[curso] = [];
      acc[curso].push(aluno);
      return acc;
    }, {});
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold">Listar Alunos por Curso</Typography>
      {Object.keys(alunosPorCurso).map(curso => (
        <Box key={curso} sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" fontWeight="bold">{curso}</Typography>
          <TableContainer component={Paper}>
            <Table aria-label="alunos por curso">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>IRA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alunosPorCurso[curso].map(aluno => (
                  <TableRow 
                    key={aluno._id} 
                    sx={{
                      backgroundColor: aluno.ira >= 7 ? '#cce5ff' : '#f8d7da' // Verde claro para IRA >= 7, vermelho claro para IRA < 7
                    }}
                  >
                    <TableCell>{aluno._id}</TableCell>
                    <TableCell>{aluno.nome}</TableCell>
                    <TableCell>{aluno.ira}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </>
  );
};

export default ListarPorCurso;
