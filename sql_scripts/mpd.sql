-- -----------------------------------------------------
-- Schema afvp_site2022
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `afvp_site2022` ;

CREATE SCHEMA IF NOT EXISTS `afvp_site2022` DEFAULT CHARACTER SET utf8 ;
USE `afvp_site2022` ;

-- -----------------------------------------------------
-- Table `afvp_site2022`.`country`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `afvp_site2022`.`country` ;

CREATE TABLE IF NOT EXISTS `afvp_site2022`.`country` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `iso_code` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `afvp_site2022`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `afvp_site2022`.`user` ;

CREATE TABLE IF NOT EXISTS `afvp_site2022`.`user` (
  `id` INT NOT NULL,
  `gender` VARCHAR(20) NOT NULL,
  `firstname` VARCHAR(50) NOT NULL,
  `lastname` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `email_verified` BOOLEAN NOT NULL DEFAULT 0,
  `email_verification_token` VARCHAR(50) NULL DEFAULT NULL,
  `password` VARCHAR(50) NULL DEFAULT NULL,
  `password_confirm` VARCHAR(50) NULL DEFAULT NULL,
  `password_changed_dt` DATETIME NULL DEFAULT NULL,
  `password_reset_token` VARCHAR(50) NULL DEFAULT NULL,
  `password_reset_expired_dt` DATETIME NULL DEFAULT NULL,
  `photo_url` VARCHAR(100) NULL DEFAULT NULL,
  `address_line01` VARCHAR(100) NULL DEFAULT NULL,
  `address_line02` VARCHAR(100) NULL DEFAULT NULL,
  `address_line03` VARCHAR(100) NULL DEFAULT NULL,
  `firm` VARCHAR(50) NULL DEFAULT NULL,
  `country_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `afvp_site2022`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `afvp_site2022`.`role` ;

CREATE TABLE IF NOT EXISTS `afvp_site2022`.`role` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `afvp_site2022`.`membership_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `afvp_site2022`.`membership_type` ;

CREATE TABLE IF NOT EXISTS `afvp_site2022`.`membership_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `afvp_site2022`.`member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `afvp_site2022`.`member` ;

CREATE TABLE IF NOT EXISTS `afvp_site2022`.`member` (
  `id` INT NOT NULL,
  `title` VARCHAR(50) NULL DEFAULT NULL,
  `speciality` VARCHAR(50) NULL DEFAULT NULL,
  `biography` LONGTEXT NULL DEFAULT NULL,
  `hobby` MEDIUMTEXT NULL DEFAULT NULL,
  `registration_status` ENUM('toValidate', 'validated', 'registered', 'rejected') DEFAULT 'toValidate',
  `subscription_dt` DATETIME NULL DEFAULT NULL,
  `active_limit_dt` DATETIME NULL DEFAULT NULL,
  `reactivation_dt` DATETIME NULL DEFAULT NULL,
  `is_board_member` BOOLEAN NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  `role_id` INT NULL DEFAULT NULL,
  `membership_type_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `afvp_site2022`.`super_admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `afvp_site2022`.`super_admin` ;

CREATE TABLE IF NOT EXISTS `afvp_site2022`.`super_admin` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `afvp_site2022`.`payment_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `afvp_site2022`.`payment_type` ;

CREATE TABLE IF NOT EXISTS `afvp_site2022`.`payment_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `afvp_site2022`.`membership`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `afvp_site2022`.`membership` ;

CREATE TABLE IF NOT EXISTS `afvp_site2022`.`membership` (
  `id` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `member_id` INT NOT NULL,
  `membership_type_id` INT NULL DEFAULT NULL,
  `payment_type_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `afvp_site2022`.`donation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `afvp_site2022`.`donation` ;

CREATE TABLE IF NOT EXISTS `afvp_site2022`.`donation` (
  `id` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `amount` INT NOT NULL,
  `payment_type_id` INT NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Indexes creation
-- -----------------------------------------------------
CREATE INDEX `fk_user_country_idx` ON `afvp_site2022`.`user` (`country_id` ASC);

CREATE UNIQUE INDEX `fk_member_user_idx` ON `afvp_site2022`.`member` (`user_id` ASC);
CREATE INDEX `fk_member_role_idx` ON `afvp_site2022`.`member` (`role_id` ASC);
CREATE INDEX `fk_member_membership_type_idx` ON `afvp_site2022`.`member` (`membership_type_id` ASC);

CREATE UNIQUE INDEX `fk_super_admin_user_idx` ON `afvp_site2022`.`super_admin` (`user_id` ASC);

CREATE INDEX `fk_membership_member_idx` ON `afvp_site2022`.`membership` (`member_id` ASC);
CREATE INDEX `fk_membership_membership_type_idx` ON `afvp_site2022`.`membership` (`membership_type_id` ASC);
CREATE INDEX `fk_membership_payment_type_idx` ON `afvp_site2022`.`membership` (`payment_type_id` ASC);

CREATE INDEX `fk_donation_user_idx` ON `afvp_site2022`.`donation` (`user_id` ASC);
CREATE INDEX `fk_donation_payment_type_idx` ON `afvp_site2022`.`donation` (`payment_type_id` ASC);

-- -----------------------------------------------------
-- Foreign Keys creation
-- -----------------------------------------------------
ALTER TABLE `afvp_site2022`.`user`
  ADD CONSTRAINT `fk_user_country_idx` FOREIGN KEY (`country_id`) REFERENCES `afvp_site2022`.`country` (`id`) ON DELETE SET NULL;

ALTER TABLE `afvp_site2022`.`member`
  ADD CONSTRAINT `fk_member_user_idx` FOREIGN KEY (`user_id`) REFERENCES `afvp_site2022`.`user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_member_role_idx` FOREIGN KEY (`role_id`) REFERENCES `afvp_site2022`.`role` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_member_membership_type_idx` FOREIGN KEY (`membership_type_id`) REFERENCES `afvp_site2022`.`membership_type` (`id`) ON DELETE SET NULL;

ALTER TABLE `afvp_site2022`.`super_admin`
  ADD CONSTRAINT `fk_super_admin_user_idx` FOREIGN KEY (`user_id`) REFERENCES `afvp_site2022`.`user` (`id`) ON DELETE CASCADE;

ALTER TABLE `afvp_site2022`.`membership`
  ADD CONSTRAINT `fk_membership_member_idx` FOREIGN KEY (`member_id`) REFERENCES `afvp_site2022`.`member` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_membership_membership_type_idx` FOREIGN KEY (`membership_type_id`) REFERENCES `afvp_site2022`.`membership_type` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_membership_payment_type_idx` FOREIGN KEY (`payment_type_id`) REFERENCES `afvp_site2022`.`payment_type` (`id`) ON DELETE SET NULL;

ALTER TABLE `afvp_site2022`.`donation`
  ADD CONSTRAINT `fk_donation_user_idx` FOREIGN KEY (`user_id`) REFERENCES `afvp_site2022`.`user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_donation_payment_type_idx` FOREIGN KEY (`payment_type_id`) REFERENCES `afvp_site2022`.`payment_type` (`id`) ON DELETE SET NULL;
