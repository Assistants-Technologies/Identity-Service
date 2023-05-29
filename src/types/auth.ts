import { Length, Validate, validate } from "class-validator";
import { UnprocessableEntityException } from "../utils/http_exceptions";

import {
  EmailValidator,
  ParameterValidator,
  UsernameValidator,
} from "../utils/validators";

type AccountLogin_Plain_Request = {
  parameter: string;
  password: string;
};

class AccountLogin_Plain_Request_DTO implements AccountLogin_Plain_Request {
  @Length(5, 255)
  @Validate(ParameterValidator)
  parameter: string;

  @Length(6, 255)
  password: string;

  constructor(body: AccountLogin_Plain_Request) {
    this.parameter = body.parameter;
    this.password = body.password;
  }

  public readonly validate = async () => {
    await validate(this).then((errors) => {
      if (errors.length > 0) {
        const errorsString = errors
          .map((error) => {
            return error.constraints
              ? Object.values(error.constraints).join(", ")
              : "";
          })
          .join(", ");
        throw new UnprocessableEntityException(
          `Validation failed: ${errorsString}`
        );
      }
    });
  };
}

type AccountCreate_Plain_Request = {
  username: string;
  email: string;
  password: string;
};

class AccountCreate_Plain_Request_DTO implements AccountCreate_Plain_Request {
  @Length(1, 255)
  @Validate(UsernameValidator)
  username: string;

  @Length(5, 255)
  @Validate(EmailValidator)
  email: string;

  @Length(6, 255)
  password: string;

  constructor(body: AccountCreate_Plain_Request) {
    this.username = body.username;
    this.email = body.email;
    this.password = body.password;
  }

  public readonly validate = async () => {
    await validate(this).then((errors) => {
      if (errors.length > 0) {
        const errorsString = errors
          .map((error) => {
            return error.constraints
              ? Object.values(error.constraints).join(", ")
              : "";
          })
          .join(", ");
        throw new UnprocessableEntityException(
          `Validation failed: ${errorsString}`
        );
      }
    });
  };
}

export {
  AccountLogin_Plain_Request,
  AccountLogin_Plain_Request_DTO,
  AccountCreate_Plain_Request,
  AccountCreate_Plain_Request_DTO,
};
