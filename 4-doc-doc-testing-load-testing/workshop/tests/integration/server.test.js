const axios = require("axios");

describe("Units test", () => {
  it("Should create a todo and get it", async () => {
    const respPost = await axios.post("http://localhost:5000/todo", {
      done: false,
      text: "testPost",
    });
    const resp = await axios.get("http://localhost:5000/todo");
    expect(resp.data[resp.data.length -1].done.toString()).toEqual("false");
    expect(resp.data[resp.data.length -1].text.toString()).toEqual("testPost");
  });
  it("Should get a todo with specific id and update it", async () => {
    const respPost = await axios.post("http://localhost:5000/todo", {
      done: false,
      text: "testPost patch",
    });
    const respGet = await axios.get("http://localhost:5000/todo");
    const resp = await axios.patch("http://localhost:5000/todo/"+respGet.data[respGet.data.length -1]._id,{});
    const result = await axios.get("http://localhost:5000/todo");
    expect(result.data[result.data.length -1].done.toString()).toEqual("true");
    expect(result.data[result.data.length -1].text.toString()).toEqual("testPost patch");
    expect(result.data[result.data.length -1]._id.toString()).toEqual(respGet.data[respGet.data.length -1]._id);
  });
});
