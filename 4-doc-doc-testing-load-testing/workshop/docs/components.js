module.exports = {
  components: {
    schemas: {
      _id: {
        type: "string",
        description: "An id of a todo",
        example: "626b9f56e54ad72dea6b1f5e",
      },
      TodoDone: {
        type: "object",
        properties: {
          done: {
            type: "boolean",
            description: "The status of the todo",
            example: true,
          },
        },
      },
      Todo: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "Todo identification number",
            example: "626b9f56e54ad72dea6b1f5e",
          },
          text: {
            type: "string",
            description: "Todo's title",
            example: "Dernier jour de cours après 6 ans de torture 💪",
          },
          done: {
            type: "boolean",
            description: "The status of the todo",
            example: true,
          },
        },
      },
      TodoInput: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "Todo's title",
            example: "Dernier jour de cours après 6 ans de torture 💪",
          },
          done: {
            type: "boolean",
            description: "The status of the todo",
            example: true,
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Error message",
            example: "Not found",
          },
          internal_code: {
            type: "string",
            description: "Error internal code",
            example: "Invalid parameters",
          },
        },
      },
    },
  },
};
