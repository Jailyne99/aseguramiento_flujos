-- MySQL Script generated by MySQL Workbench
-- Wed Sep 15 00:11:00 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema aseguramiento
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema aseguramiento
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `aseguramiento` DEFAULT CHARACTER SET utf8 ;
USE `aseguramiento` ;

-- -----------------------------------------------------
-- Table `aseguramiento`.`USUARIO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aseguramiento`.`USUARIO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `password` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aseguramiento`.`PROCEDIMIENTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aseguramiento`.`PROCEDIMIENTO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `descripcion` VARCHAR(500) NULL,
  `diagrama` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aseguramiento`.`TAREA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aseguramiento`.`TAREA` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(500) NULL,
  `tiempo` INT NULL,
  `PROCEDIMIENTO_id` INT NOT NULL,
  `USUARIO_id` INT NOT NULL,
  `estado` TINYINT NULL,
  `figura` VARCHAR(45) NULL,
  `color` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_TAREA_PROCEDIMIENTO_idx` (`PROCEDIMIENTO_id` ASC) VISIBLE,
  INDEX `fk_TAREA_USUARIO1_idx` (`USUARIO_id` ASC) VISIBLE,
  CONSTRAINT `fk_TAREA_PROCEDIMIENTO`
    FOREIGN KEY (`PROCEDIMIENTO_id`)
    REFERENCES `aseguramiento`.`PROCEDIMIENTO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TAREA_USUARIO1`
    FOREIGN KEY (`USUARIO_id`)
    REFERENCES `aseguramiento`.`USUARIO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aseguramiento`.`REPORTE_PNC`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aseguramiento`.`REPORTE_PNC` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` TIMESTAMP(6) NULL,
  `PROCEDIMIENTO_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_REPORTE_PNC_PROCEDIMIENTO1_idx` (`PROCEDIMIENTO_id` ASC) VISIBLE,
  CONSTRAINT `fk_REPORTE_PNC_PROCEDIMIENTO1`
    FOREIGN KEY (`PROCEDIMIENTO_id`)
    REFERENCES `aseguramiento`.`PROCEDIMIENTO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
