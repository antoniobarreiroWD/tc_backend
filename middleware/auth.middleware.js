const usernameMiddleware = (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
      
      if (!req.user.username) {
        return res.status(403).json({ error: 'User without a username' });
      }
  
      next();
    } catch (err) {
      next(err);
    }
  }
  
  module.exports = usernameMiddleware;
  