export default interface IUpdateUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  status: string;
  address: string;
  number: string;
  avatar: string;
  created_at?: Date;
  updated_at?: Date;
}
