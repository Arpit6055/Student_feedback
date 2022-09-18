module.exports = validateRequest;

function validateRequest(req, res, next, schema, querySchema) {
  const options = {
    abortEarly: true, // include all errors = false
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  var { error, value } = querySchema?schema.validate(req.query, options):schema.validate(req.body, options);
  if (error) {
    let errorObj = [];
    error.details.forEach((e) => {
      let tob = {};
      tob[e.context.key] = e.message.replace(/['"]/g, "");
      errorObj.push(tob);
    });
    res.status(400).json({ error: errorObj });
  } else {
    if(querySchema)req.query = value;
    else req.body = value;
    next();
  }
}
  
  