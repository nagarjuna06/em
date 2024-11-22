const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    next();
  } catch (error) {
    return res.status(422).json({
      success: false,
      data: {
        path: error.inner[0].path,
        message: error.inner[0].message,
      },
    });
  }
};

export default validate;
