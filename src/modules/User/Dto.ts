import { userDTOInterface } from '../../types/interfaces/user_interface';

class UserDTO {
  id;
  gender;
  firstname;
  lastname;
  email;
  email_verified;
  photo_url;
  address_line01;
  address_line02;
  address_line03;
  firm;
  created_date;
  updated_date;

  constructor({
    id,
    gender,
    firstname,
    lastname,
    email,
    email_verified,
    photo_url,
    address_line01,
    address_line02,
    address_line03,
    firm,
    created_date,
    updated_date
  }: userDTOInterface) {
    this.id = id;
    this.gender = gender;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.email_verified = email_verified;
    this.photo_url = photo_url;
    this.address_line01 = address_line01;
    this.address_line02 = address_line02;
    this.address_line03 = address_line03;
    this.firm = firm;
    this.created_date = created_date;
    this.updated_date = updated_date;
  }
}

export default UserDTO;
