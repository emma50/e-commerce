import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const node_env = () => {
  if (process.env.NODE_ENV === "test") {
    dotenv.config({ path: "../../.env.test"});
    return process.env.NODE_ENV;
  } else if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: "../../.env"})
    return process.env.NODE_ENV;
  }
};

export default node_env