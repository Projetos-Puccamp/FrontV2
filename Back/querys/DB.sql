-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(50) NULL,
  `Senha` VARCHAR(45) NOT NULL,
  `NivelPermissao` VARCHAR(10) NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `idUsuario_UNIQUE` (`idUsuario` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Treinamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Treinamento` (
  `idTreinamento` INT NOT NULL AUTO_INCREMENT,
  `NomeComercial` VARCHAR(45) NOT NULL,
  `Descricao` VARCHAR(80) NOT NULL,
  `CargaHoraria` VARCHAR(45) NOT NULL,
  `DataInicio` DATETIME NOT NULL,
  `DataFim` DATETIME NOT NULL,
  PRIMARY KEY (`idTreinamento`),
  UNIQUE INDEX `NomeComercial_UNIQUE` (`NomeComercial` ASC) VISIBLE,
  UNIQUE INDEX `idTreinamento_UNIQUE` (`idTreinamento` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Quiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Quiz` (
  `idQuiz` INT NOT NULL AUTO_INCREMENT,
  `Titulo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idQuiz`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pergunta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pergunta` (
  `idPergunta` INT NOT NULL AUTO_INCREMENT,
  `DescricaoPergunta` VARCHAR(300) NOT NULL,
  `idTreinamento` INT NOT NULL,
  `Quiz_idQuiz` INT NOT NULL,
  `Quiz_Pergunta_idPergunta` INT NOT NULL,
  `Pergunta1` VARCHAR(200) NOT NULL,
  `Pergunta2` VARCHAR(200) NOT NULL,
  `Pergunta3` VARCHAR(200) NOT NULL,
  `Pergunta4` VARCHAR(200) NOT NULL,
  `Pergunta5` VARCHAR(50) NOT NULL,
  `Resposta` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idPergunta`),
  INDEX `fk_Pergunta_Quiz1_idx` (`Quiz_idQuiz` ASC, `Quiz_Pergunta_idPergunta` ASC) VISIBLE,
  CONSTRAINT `fk_Pergunta_Quiz1`
    FOREIGN KEY (`Quiz_idQuiz`)
    REFERENCES `mydb`.`Quiz` (`idQuiz`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Mentor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Mentor` (
  `idMentor` INT NOT NULL AUTO_INCREMENT,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idMentor`),
  INDEX `fk_Mentor_Usuario_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Mentor_Usuario`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Aluno` (
  `idAluno` INT NOT NULL AUTO_INCREMENT,
  `idMentor` VARCHAR(45) NULL,
  `Usuario_idUsuario` INT NOT NULL,
  `Mentor_idMentor` INT NOT NULL,
  PRIMARY KEY (`idAluno`),
  INDEX `fk_Aluno_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  INDEX `fk_Aluno_Mentor1_idx` (`Mentor_idMentor` ASC) VISIBLE,
  CONSTRAINT `fk_Aluno_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Aluno_Mentor1`
    FOREIGN KEY (`Mentor_idMentor`)
    REFERENCES `mydb`.`Mentor` (`idMentor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idEmpresa`),
  INDEX `fk_Empresa_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Empresa_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`VagaEmprego`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`VagaEmprego` (
  `idVagaEmprego` INT NOT NULL AUTO_INCREMENT,
  `Vaga` VARCHAR(45) NOT NULL,
  `DescricaoAtv` VARCHAR(45) NOT NULL,
  `Requisitos` VARCHAR(45) NOT NULL,
  `Salario` VARCHAR(45) NOT NULL,
  `Empresa_idEmpresa` INT NOT NULL,
  PRIMARY KEY (`idVagaEmprego`),
  INDEX `fk_VagaEmprego_Empresa1_idx` (`Empresa_idEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_VagaEmprego_Empresa1`
    FOREIGN KEY (`Empresa_idEmpresa`)
    REFERENCES `mydb`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`AlunoTreinamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`AlunoTreinamento` (
  `idAlunoTreinamento` INT NOT NULL AUTO_INCREMENT,
  `DataInsc` DATETIME NOT NULL,
  `status` VARCHAR(4) NOT NULL,
  `Aluno_idAluno` INT NOT NULL,
  `Treinamento_idTreinamento` INT NOT NULL,
  `NotaFinal` VARCHAR(45) NULL,
  PRIMARY KEY (`idAlunoTreinamento`),
  INDEX `fk_AlunoTreinamento_Aluno1_idx` (`Aluno_idAluno` ASC) VISIBLE,
  INDEX `fk_AlunoTreinamento_Treinamento1_idx` (`Treinamento_idTreinamento` ASC) VISIBLE,
  CONSTRAINT `fk_AlunoTreinamento_Aluno1`
    FOREIGN KEY (`Aluno_idAluno`)
    REFERENCES `mydb`.`Aluno` (`idAluno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AlunoTreinamento_Treinamento1`
    FOREIGN KEY (`Treinamento_idTreinamento`)
    REFERENCES `mydb`.`Treinamento` (`idTreinamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TreinamentosParavaga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TreinamentosParavaga` (
  `idTreinamentosParavaga` INT NOT NULL AUTO_INCREMENT,
  `Treinamento_idTreinamento` INT NOT NULL,
  `VagaEmprego_idVagaEmprego` INT NOT NULL,
  PRIMARY KEY (`idTreinamentosParavaga`),
  INDEX `fk_TreinamentosParavaga_Treinamento1_idx` (`Treinamento_idTreinamento` ASC) VISIBLE,
  INDEX `fk_TreinamentosParavaga_VagaEmprego1_idx` (`VagaEmprego_idVagaEmprego` ASC) VISIBLE,
  CONSTRAINT `fk_TreinamentosParavaga_Treinamento1`
    FOREIGN KEY (`Treinamento_idTreinamento`)
    REFERENCES `mydb`.`Treinamento` (`idTreinamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TreinamentosParavaga_VagaEmprego1`
    FOREIGN KEY (`VagaEmprego_idVagaEmprego`)
    REFERENCES `mydb`.`VagaEmprego` (`idVagaEmprego`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Adiministrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Adiministrador` (
  `idAdiministrador` INT NOT NULL AUTO_INCREMENT,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idAdiministrador`),
  INDEX `fk_Adiministrador_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Adiministrador_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CanditatoVagaEmprego`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CanditatoVagaEmprego` (
  `idCanditatoVagaEmprego` INT NOT NULL AUTO_INCREMENT,
  `DataCandidatura` VARCHAR(45) NULL,
  `Aluno_idAluno` INT NOT NULL,
  `VagaEmprego_idVagaEmprego` INT NOT NULL,
  PRIMARY KEY (`idCanditatoVagaEmprego`),
  INDEX `fk_CanditatoVagaEmprego_Aluno1_idx` (`Aluno_idAluno` ASC) VISIBLE,
  INDEX `fk_CanditatoVagaEmprego_VagaEmprego1_idx` (`VagaEmprego_idVagaEmprego` ASC) VISIBLE,
  CONSTRAINT `fk_CanditatoVagaEmprego_Aluno1`
    FOREIGN KEY (`Aluno_idAluno`)
    REFERENCES `mydb`.`Aluno` (`idAluno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CanditatoVagaEmprego_VagaEmprego1`
    FOREIGN KEY (`VagaEmprego_idVagaEmprego`)
    REFERENCES `mydb`.`VagaEmprego` (`idVagaEmprego`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TreinamentosParavaga_has_Quiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TreinamentosParavaga_has_Quiz` (
  `TreinamentosParavaga_idTreinamentosParavaga` INT NOT NULL,
  `Quiz_idQuiz` INT NOT NULL,
  PRIMARY KEY (`TreinamentosParavaga_idTreinamentosParavaga`, `Quiz_idQuiz`),
  INDEX `fk_TreinamentosParavaga_has_Quiz_Quiz1_idx` (`Quiz_idQuiz` ASC) VISIBLE,
  INDEX `fk_TreinamentosParavaga_has_Quiz_TreinamentosParavaga1_idx` (`TreinamentosParavaga_idTreinamentosParavaga` ASC) VISIBLE,
  CONSTRAINT `fk_TreinamentosParavaga_has_Quiz_TreinamentosParavaga1`
    FOREIGN KEY (`TreinamentosParavaga_idTreinamentosParavaga`)
    REFERENCES `mydb`.`TreinamentosParavaga` (`idTreinamentosParavaga`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TreinamentosParavaga_has_Quiz_Quiz1`
    FOREIGN KEY (`Quiz_idQuiz`)
    REFERENCES `mydb`.`Quiz` (`idQuiz`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ConteudoTreinamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ConteudoTreinamento` (
  `idConteudoTreinamento` INT NOT NULL AUTO_INCREMENT,
  `Titulo` VARCHAR(450) NOT NULL,
  `Descricao` VARCHAR(450) NOT NULL,
  `linkVideo` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`idConteudoTreinamento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Treinamento_has_ConteudoTreinamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Treinamento_has_ConteudoTreinamento` (
  `Treinamento_idTreinamento` INT NOT NULL,
  `ConteudoTreinamento_idConteudoTreinamento` INT NOT NULL,
  PRIMARY KEY (`Treinamento_idTreinamento`, `ConteudoTreinamento_idConteudoTreinamento`),
  INDEX `fk_Treinamento_has_ConteudoTreinamento_ConteudoTreinamento1_idx` (`ConteudoTreinamento_idConteudoTreinamento` ASC) VISIBLE,
  INDEX `fk_Treinamento_has_ConteudoTreinamento_Treinamento1_idx` (`Treinamento_idTreinamento` ASC) VISIBLE,
  CONSTRAINT `fk_Treinamento_has_ConteudoTreinamento_Treinamento1`
    FOREIGN KEY (`Treinamento_idTreinamento`)
    REFERENCES `mydb`.`Treinamento` (`idTreinamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Treinamento_has_ConteudoTreinamento_ConteudoTreinamento1`
    FOREIGN KEY (`ConteudoTreinamento_idConteudoTreinamento`)
    REFERENCES `mydb`.`ConteudoTreinamento` (`idConteudoTreinamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



