const authorization = (permission) => {
  return (req, res, next) => {
    const permissions = req.token.role.permissions;
    const filteredRole = permissions.filter((element, index) => {
      return element === permission;
    });

    if (filteredRole.length === 1) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
  };
};

module.exports =  authorization ;
