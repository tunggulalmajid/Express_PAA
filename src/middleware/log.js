const logRequest = (req, res, next) => {
  const time = new Date().toLocaleString("id-ID");
  console.log(`[${time}] ${req.method} request ke: ${req.url}`);

  if (
    req.body &&
    typeof req.body === "object" &&
    Object.keys(req.body).length > 0
  ) {
    const safeBody = { ...req.body };

    if (safeBody.password) delete safeBody.password;

    console.log("Data Body:", safeBody);
  }

  next();
};

module.exports = logRequest;
