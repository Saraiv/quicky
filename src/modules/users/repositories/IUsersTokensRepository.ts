import UsersTokens from '../infra/typeorm/entities/UsersTokens';

export default interface IUsersTokenssRepository {
  generate(id_cadusuarios: string): Promise<UsersTokens>;
  findByToken(token: string): Promise<UsersTokens | undefined>;
}
