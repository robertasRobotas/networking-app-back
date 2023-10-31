const validationMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);

      if (error) {
        console.log("error", error);
        return res.status(401).json({ message: "bad auth" });
      }

      return next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "bad auth" });
    }
  };
};

export default validationMiddleware;
