import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Inicio from './pages/Home'
import Partituras from './pages/Partituras'
import Contato from './pages/Contato'
import Login from './pages/Login'
import Agenda from './pages/Agenda'
import PrivateRoute from './components/PrivateRoute'
import GerentePartitura from './pages/Gerente/partituras'
import GerenteAlunos from './pages/Gerente/alunos'
import GerenteMusicos from './pages/Gerente/musicos'
import GerenteContato from './pages/Gerente/GerenciarContatos'
import GerenciarAgenda from './pages/Gerente/GerenciarAgenda'
import FacaParte from './pages/FacaParte'
import Profile from './pages/profile/profile'
import MusicoRoute from './components/MusicoRoute'
import FacaParteMusico from './pages/facaParte/FacaParteMusico'
import FacaParteAluno from './pages/facaParte/FacaParteAluno'
import GroupRoute from './components/GroupRoute'
import Teste from './pages/Teste'
import PreCadastroMusico from './pages/facaParte/PreCadastroMusico'
import GerenteInventario from './pages/Gerente/inventario'


const Routers = () => {
    
    return (
        <>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={<Inicio />} />
                        

                        <Route path="/facaparte" element={<FacaParte />} />
                        <Route path="/contato" element={<Contato />} />
                        <Route path="/agenda" element={<Agenda />} />
                        <Route path="/teste" element={<PreCadastroMusico />} />
                        <Route path="/teste2" element={<Teste />} />


                        <Route path="/facaparte/musico" element={<FacaParteMusico />} />
                        <Route path="/facaparte/aluno" element={<FacaParteAluno />} />

                        <Route path="/partituras"  element={<MusicoRoute />}>
                            <Route path="/partituras" element={<Partituras />} />
                        </Route>

                        <Route path="/orquestra/partituras"  element={<PrivateRoute />}>
                            <Route path="/orquestra/partituras" element={<GerentePartitura />} />
                        </Route>
                        <Route path="/orquestra/agenda"  element={<PrivateRoute />}>
                            <Route path="/orquestra/agenda" element={<GerenciarAgenda />} />
                        </Route>
                        <Route path="/orquestra/contatos"  element={<PrivateRoute />}>
                            <Route path="/orquestra/contatos" element={<GerenteContato />} />
                        </Route>
                        <Route path="/orquestra/inventario"  element={<PrivateRoute />}>
                            <Route path="/orquestra/inventario" element={<GerenteInventario />} />
                        </Route>
                        <Route path="/orquestra/alunos"  element={<PrivateRoute />}>
                            <Route path="/orquestra/alunos" element={<GerenteAlunos />} />                    
                        </Route>
                        <Route path="/orquestra/musicos"  element={<PrivateRoute />}>
                            <Route path="/orquestra/musicos" element={<GerenteMusicos />} />                    
                        </Route>
                        <Route path="/profile"  element={<GroupRoute />}>
                            <Route path="/profile"  element={<Profile />} />                    
                        </Route>       
                        

                    </Routes>
        </>
    )
}

export default Routers
