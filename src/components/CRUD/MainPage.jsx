import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Container } from "@mui/material"
import MyMenu from "./MyMenu"

// Páginas do Aluno
import CadastrarAluno from "./aluno/Cadastrar"
import ListarAluno from "./aluno/Listar"
import EditarAluno from "./aluno/Editar"
import Login from "./../login/Login"
import ListarPorCurso from "./aluno/ListarPorCurso"

const MainPage = () => {
    return (
        <BrowserRouter>
            <MyMenu />
            <Container sx={{ mt: 4 }}>
                <Routes>
                    <Route path="cadastrarAluno" element={<CadastrarAluno />} />
                    <Route path="listarAluno" element={<ListarAluno />} />
                    <Route path="ListarPorCurso" element={<ListarPorCurso />} />
                    <Route path="editarAluno/:id" element={<EditarAluno />} />
                    <Route path="login" element={<Login />} />                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default MainPage
