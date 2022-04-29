const axios = require("axios");

describe("Units test", () => {
  it("Should create a todo and get it", async () => {
    // const respPost = await axios.post("http://localhost:5000/todo", {
    //   done: false,
    //   text: "testPost",
    // });
    const resp = await axios.get("http://localhost:5000/todo");
    expect(resp.data[resp.data.length -1].done.toString()).toEqual("false");
    expect(resp.data[resp.data.length -1].text.toString()).toEqual("testPost");
  });
  it("Should get a todo with specific id", async () => {
    const resp = await axios.patch("http://localhost:5000/todo/626ba3a7e9921ce2f5cbb63d");
    expect(resp.data.done.toString()).toEqual("true");
    expect(resp.data.text.toString()).toEqual("test");
    expect(resp.data._id.toString()).toEqual("626ba3a7e9921ce2f5cbb63d");
  });
});
