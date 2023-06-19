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
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(50) NULL DEFAULT NULL,
  `Senha` VARCHAR(45) NOT NULL,
  `NivelPermissao` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `idUsuario_UNIQUE` (`idUsuario` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`adiministrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`adiministrador` (
  `idAdiministrador` INT NOT NULL AUTO_INCREMENT,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idAdiministrador`),
  INDEX `fk_Adiministrador_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Adiministrador_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `mydb`.`usuario` (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`mentor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`mentor` (
  `idMentor` INT NOT NULL AUTO_INCREMENT,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idMentor`),
  INDEX `fk_Mentor_Usuario_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Mentor_Usuario`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `mydb`.`usuario` (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`aluno` (
  `idAluno` INT NOT NULL AUTO_INCREMENT,
  `Usuario_idUsuario` INT NOT NULL,
  `Mentor_idMentor` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idAluno`),
  INDEX `fk_Aluno_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  INDEX `fk_Aluno_Mentor1_idx` (`Mentor_idMentor` ASC) VISIBLE,
  CONSTRAINT `fk_Aluno_Mentor1`
    FOREIGN KEY (`Mentor_idMentor`)
    REFERENCES `mydb`.`mentor` (`idMentor`),
  CONSTRAINT `fk_Aluno_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `mydb`.`usuario` (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`treinamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`treinamento` (
  `idTreinamento` INT NOT NULL AUTO_INCREMENT,
  `NomeComercial` VARCHAR(45) NOT NULL,
  `Descricao` VARCHAR(80) NOT NULL,
  `CargaHoraria` VARCHAR(45) NOT NULL,
  `DataInicio` DATETIME NOT NULL,
  `DataFim` DATETIME NOT NULL,
  PRIMARY KEY (`idTreinamento`),
  UNIQUE INDEX `NomeComercial_UNIQUE` (`NomeComercial` ASC) VISIBLE,
  UNIQUE INDEX `idTreinamento_UNIQUE` (`idTreinamento` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`alunotreinamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`alunotreinamento` (
  `idAlunoTreinamento` INT NOT NULL AUTO_INCREMENT,
  `DataInsc` DATETIME NOT NULL,
  `status` VARCHAR(4) NOT NULL,
  `Aluno_idAluno` INT NOT NULL,
  `Treinamento_idTreinamento` INT NOT NULL,
  `NotaN` FLOAT NULL DEFAULT NULL,
  `NotaCase1` FLOAT NULL DEFAULT NULL,
  `NotaCase2` FLOAT NULL DEFAULT NULL,
  `NomeTreinamento` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idAlunoTreinamento`),
  INDEX `fk_AlunoTreinamento_Aluno1_idx` (`Aluno_idAluno` ASC) VISIBLE,
  INDEX `fk_AlunoTreinamento_Treinamento1_idx` (`Treinamento_idTreinamento` ASC) VISIBLE,
  CONSTRAINT `fk_AlunoTreinamento_Aluno1`
    FOREIGN KEY (`Aluno_idAluno`)
    REFERENCES `mydb`.`aluno` (`idAluno`),
  CONSTRAINT `fk_AlunoTreinamento_Treinamento1`
    FOREIGN KEY (`Treinamento_idTreinamento`)
    REFERENCES `mydb`.`treinamento` (`idTreinamento`))
ENGINE = InnoDB
AUTO_INCREMENT = 90
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idEmpresa`),
  INDEX `fk_Empresa_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Empresa_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `mydb`.`usuario` (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`vagaemprego`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`vagaemprego` (
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
    REFERENCES `mydb`.`empresa` (`idEmpresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`canditatovagaemprego`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`canditatovagaemprego` (
  `idCanditatoVagaEmprego` INT NOT NULL AUTO_INCREMENT,
  `DataCandidatura` VARCHAR(45) NULL DEFAULT NULL,
  `Aluno_idAluno` INT NOT NULL,
  `VagaEmprego_idVagaEmprego` INT NOT NULL,
  PRIMARY KEY (`idCanditatoVagaEmprego`),
  INDEX `fk_CanditatoVagaEmprego_Aluno1_idx` (`Aluno_idAluno` ASC) VISIBLE,
  INDEX `fk_CanditatoVagaEmprego_VagaEmprego1_idx` (`VagaEmprego_idVagaEmprego` ASC) VISIBLE,
  CONSTRAINT `fk_CanditatoVagaEmprego_Aluno1`
    FOREIGN KEY (`Aluno_idAluno`)
    REFERENCES `mydb`.`aluno` (`idAluno`),
  CONSTRAINT `fk_CanditatoVagaEmprego_VagaEmprego1`
    FOREIGN KEY (`VagaEmprego_idVagaEmprego`)
    REFERENCES `mydb`.`vagaemprego` (`idVagaEmprego`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`conteudotreinamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`conteudotreinamento` (
  `idConteudoTreinamento` INT NOT NULL AUTO_INCREMENT,
  `Titulo1` VARCHAR(450) NOT NULL,
  `Descricao1` VARCHAR(1450) NOT NULL,
  `linkVideo1` VARCHAR(300) NOT NULL,
  `Tipo` INT NULL DEFAULT NULL,
  `Titulo2` VARCHAR(45) NOT NULL,
  `Descricao2` VARCHAR(1450) NOT NULL,
  `linkVideo2` VARCHAR(145) NOT NULL,
  PRIMARY KEY (`idConteudoTreinamento`))
ENGINE = InnoDB
AUTO_INCREMENT = 1235
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`quiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`quiz` (
  `idQuiz` INT NOT NULL AUTO_INCREMENT,
  `Titulo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idQuiz`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`pergunta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pergunta` (
  `idPergunta` INT NOT NULL AUTO_INCREMENT,
  `DescricaoPergunta` VARCHAR(300) NOT NULL,
  `tipoPergunta` INT NOT NULL,
  `Quiz_idQuiz` INT NOT NULL,
  `Pergunta1` VARCHAR(200) NOT NULL,
  `Pergunta2` VARCHAR(200) NOT NULL,
  `Pergunta3` VARCHAR(200) NOT NULL,
  `Pergunta4` VARCHAR(200) NOT NULL,
  `Pergunta5` VARCHAR(50) NOT NULL,
  `Resposta` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idPergunta`),
  INDEX `Quiz_idQuiz` (`Quiz_idQuiz` ASC) VISIBLE,
  CONSTRAINT `pergunta_ibfk_1`
    FOREIGN KEY (`Quiz_idQuiz`)
    REFERENCES `mydb`.`quiz` (`idQuiz`))
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`treinamento_has_conteudotreinamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`treinamento_has_conteudotreinamento` (
  `Treinamento_idTreinamento` INT NOT NULL,
  `ConteudoTreinamento_idConteudoTreinamento` INT NOT NULL,
  PRIMARY KEY (`Treinamento_idTreinamento`, `ConteudoTreinamento_idConteudoTreinamento`),
  INDEX `fk_Treinamento_has_ConteudoTreinamento_ConteudoTreinamento1_idx` (`ConteudoTreinamento_idConteudoTreinamento` ASC) VISIBLE,
  INDEX `fk_Treinamento_has_ConteudoTreinamento_Treinamento1_idx` (`Treinamento_idTreinamento` ASC) VISIBLE,
  CONSTRAINT `fk_Treinamento_has_ConteudoTreinamento_ConteudoTreinamento1`
    FOREIGN KEY (`ConteudoTreinamento_idConteudoTreinamento`)
    REFERENCES `mydb`.`conteudotreinamento` (`idConteudoTreinamento`),
  CONSTRAINT `fk_Treinamento_has_ConteudoTreinamento_Treinamento1`
    FOREIGN KEY (`Treinamento_idTreinamento`)
    REFERENCES `mydb`.`treinamento` (`idTreinamento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`treinamentosparavaga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`treinamentosparavaga` (
  `idTreinamentosParavaga` INT NOT NULL AUTO_INCREMENT,
  `Treinamento_idTreinamento` INT NOT NULL,
  `VagaEmprego_idVagaEmprego` INT NOT NULL,
  PRIMARY KEY (`idTreinamentosParavaga`),
  INDEX `fk_TreinamentosParavaga_Treinamento1_idx` (`Treinamento_idTreinamento` ASC) VISIBLE,
  INDEX `fk_TreinamentosParavaga_VagaEmprego1_idx` (`VagaEmprego_idVagaEmprego` ASC) VISIBLE,
  CONSTRAINT `fk_TreinamentosParavaga_Treinamento1`
    FOREIGN KEY (`Treinamento_idTreinamento`)
    REFERENCES `mydb`.`treinamento` (`idTreinamento`),
  CONSTRAINT `fk_TreinamentosParavaga_VagaEmprego1`
    FOREIGN KEY (`VagaEmprego_idVagaEmprego`)
    REFERENCES `mydb`.`vagaemprego` (`idVagaEmprego`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`treinamentosparavaga_has_quiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`treinamentosparavaga_has_quiz` (
  `TreinamentosParavaga_idTreinamentosParavaga` INT NOT NULL,
  `Quiz_idQuiz` INT NOT NULL,
  PRIMARY KEY (`TreinamentosParavaga_idTreinamentosParavaga`, `Quiz_idQuiz`),
  INDEX `fk_TreinamentosParavaga_has_Quiz_Quiz1_idx` (`Quiz_idQuiz` ASC) VISIBLE,
  INDEX `fk_TreinamentosParavaga_has_Quiz_TreinamentosParavaga1_idx` (`TreinamentosParavaga_idTreinamentosParavaga` ASC) VISIBLE,
  CONSTRAINT `fk_TreinamentosParavaga_has_Quiz_Quiz1`
    FOREIGN KEY (`Quiz_idQuiz`)
    REFERENCES `mydb`.`quiz` (`idQuiz`),
  CONSTRAINT `fk_TreinamentosParavaga_has_Quiz_TreinamentosParavaga1`
    FOREIGN KEY (`TreinamentosParavaga_idTreinamentosParavaga`)
    REFERENCES `mydb`.`treinamento` (`idTreinamento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

USE `mydb`;

DELIMITER $$
USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`usuario_AFTER_INSERT`
AFTER INSERT ON `mydb`.`usuario`
FOR EACH ROW
BEGIN
    IF NEW.NivelPermissao = 1 THEN
        INSERT INTO aluno (Usuario_idUsuario) VALUES (NEW.idUsuario);
    END IF;
    IF NEW.NivelPermissao = 2 THEN
        INSERT INTO adiministrador (Usuario_idUsuario) VALUES (NEW.idUsuario);
    END IF;
    IF NEW.NivelPermissao = 3 THEN
        INSERT INTO empresa (Usuario_idUsuario) VALUES (NEW.idUsuario);
    END IF;
    IF NEW.NivelPermissao = 4 THEN
        INSERT INTO mentor (Usuario_idUsuario) VALUES (NEW.idUsuario);
    END IF;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
