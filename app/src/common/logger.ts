export const loggerPlugin = {
  async requestDidStart(requestContext) {
    const timestamp = new Date().toISOString();
    console.log(
      `${timestamp}:`,
      "Request started! Query:\n" + requestContext.request.query
    );
    return {
      async parsingDidStart(requestContext) {
        console.log(`${timestamp}:`, "Parsing started!");
      },
      async validationDidStart(requestContext) {
        console.log(`${timestamp}:`, "Validation started!");
      },
      async didEncounterErrors(requestContext) {
        const errors = requestContext.errors;
        if (errors && errors.length > 0) {
          console.error(`${timestamp}:`, "Encountered errors:");
          errors.forEach((error, index) => {
            console.error(`${timestamp}:`, `Error ${index + 1}:`, error);
          });
        }
      },
    };
  },
};
