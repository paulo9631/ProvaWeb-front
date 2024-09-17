import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useState } from "react";

const MyMenu = () => {
  const [anchorElAluno, setAnchorElAluno] = useState(null);

  const handleOpenAnchorElAluno = (event) => {
    setAnchorElAluno(event.currentTarget);
  };

  const handleCloseAlunoMenu = () => {
    setAnchorElAluno(null);
  };

  const dropAlunoMenu = () => (
    <Box>
      <Button sx={{ color: "white", my: 2 }} onClick={handleOpenAnchorElAluno}>
        Alunos
      </Button>
      <Menu anchorEl={anchorElAluno} open={Boolean(anchorElAluno)} onClose={handleCloseAlunoMenu}>
        <MenuItem onClick={handleCloseAlunoMenu} component={Link} to="cadastrarAluno">
          Cadastrar
        </MenuItem>
        <MenuItem onClick={handleCloseAlunoMenu} component={Link} to="listarAluno">
          Listar
        </MenuItem>
        <MenuItem onClick={handleCloseAlunoMenu} component={Link} to="listarPorCurso">
          Listar Alunos por Curso
        </MenuItem>
      </Menu>
    </Box>
  );

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Box sx={{ ml: 3, width: "100%", display: "flex", justifyContent: "flex-end" }}>
            {dropAlunoMenu()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MyMenu;
