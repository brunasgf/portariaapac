CREATE SCHEMA IF NOT EXISTS `portaria_db` DEFAULT CHARACTER SET utf8 ;
USE `portaria_db` ;

-- -----------------------------------------------------
-- Table `portaria_db`.`visitante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portaria_db`.`visitante` (
  `id_visitante` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `rg` VARCHAR(30) NOT NULL,
  `tipo` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_visitante`),
  UNIQUE INDEX `rg_tipo_UNIQUE` (`rg`, `tipo`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `portaria_db`.`visita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portaria_db`.`visita` (
  `id_visita` INT NOT NULL AUTO_INCREMENT,
  `data_hora_entrada` DATETIME NOT NULL,
  `data_hora_saida` DATETIME NULL,
  `recuperando_visitado` VARCHAR(45) NULL,
  `parentesco` VARCHAR(20) NULL,
  `visitante_id_visitante` INT NOT NULL,
  PRIMARY KEY (`id_visita`),
  INDEX `fk_visita_visitante1_idx` (`visitante_id_visitante` ASC),
  CONSTRAINT `fk_visita_visitante1`
    FOREIGN KEY (`visitante_id_visitante`)
    REFERENCES `portaria_db`.`visitante` (`id_visitante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;