create database SiteCursos;
Use SiteCursos;

create table AlunoInsc (
IdAluno int primary key auto_increment,
Idtreinamento int,
CargaHorariaAtual varchar (3),
FaseAtual varchar (5),
StatusAtual varchar (2),
NotaCase1 float (2,2),
NotaCase2 float (2,2),
DataInsc date
);