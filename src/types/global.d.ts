// define type of environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NOTION_DATABASE: string;
  }
}
