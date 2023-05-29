import User from "../schemas/user";
import {
  FastifyReply,
  FastifyRequest,
  RawServerBase,
  RouteGenericInterface,
} from "fastify";
import { UnprocessableEntityException } from "../utils/http_exceptions";

class AccountService<
  Request extends RouteGenericInterface,
  Reply extends RawServerBase
> {
  constructor(
    private readonly request: FastifyRequest<Request>,
    private readonly reply: FastifyReply<Reply>
  ) {}

  public async findByParameter(parameter: string) {
    const user = await User.findOne({
      $or: [{ username: parameter }, { email: parameter }],
    });
    if (!user) {
      throw new UnprocessableEntityException(
        "Account not found using this parameter"
      );
    }
    return user;
  }

  public async create(username: string, email: string, password: string) {
    return await User.create({
      username,
      email,
      password,
    });
  }
}

export default AccountService;