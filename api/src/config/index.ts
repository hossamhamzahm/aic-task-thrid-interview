import dotenv from "dotenv";
import path from "path"


if(process.env.NODE_ENV != "prod") dotenv.config({path: path.join(__dirname, "..", "..", "..", ".env")})

const get_config = (env_var: string) => {
    return process.env[env_var] as string;
}

export default get_config;