import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
  get: async () => {
    const req = await httpService.get(userEndpoint);
    // console.log(req.data.content);
    return req.data;
  }
};

export default userService;
