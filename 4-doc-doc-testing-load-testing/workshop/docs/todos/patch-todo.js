module.exports = {
  patch: {
    description: "Update a todo",
    operationId: "updateTodo",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/_id",
        },
        required: true,
        description: "Id of todo to be updated",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TodoDone",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Todo updated successfully",
      },
      404: {
        description: "Todo not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
