CREATE SCHEMA IF NOT EXISTS `portaria_db` DEFAULT CHARACTER SET utf8 ;
USE `portaria_db` ;

-- -----------------------------------------------------
-- Table `portaria_db`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portaria_db`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(20) NOT NULL,
  `senha` VARCHAR(20) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portaria_db`.`visitante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portaria_db`.`visitante` (
  `id_visitante` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `rg` VARCHAR(30) NOT NULL,
  `tipo` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_visitante`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portaria_db`.`visita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portaria_db`.`visita` (
  `id_visita` INT NOT NULL AUTO_INCREMENT,
  `data_hora_entrada` DATE NOT NULL,
  `data_hora_saida` DATE NULL,
  `recuperando_visitado` VARCHAR(45) NULL,
  `parentesco` VARCHAR(20) NULL,
  `usuario_id_usuario` INT NOT NULL,
  `visitante_id_visitante` INT NOT NULL,
  PRIMARY KEY (`id_visita`),
  INDEX `fk_visita_usuario_idx` (`usuario_id_usuario` ASC),
  INDEX `fk_visita_visitante1_idx` (`visitante_id_visitante` ASC),
  CONSTRAINT `fk_visita_usuario`
    FOREIGN KEY (`usuario_id_usuario`)
    REFERENCES `portaria_db`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_visita_visitante1`
    FOREIGN KEY (`visitante_id_visitante`)
    REFERENCES `portaria_db`.`visitante` (`id_visitante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;