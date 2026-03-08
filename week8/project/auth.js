import jwt from "jsonwebtoken";

export const ensureAuthorization = (req, res) => {
    try {
        const receivedJwt = req.headers["authorization"];
        const decodedJwt = jwt.verify(receivedJwt, process.env.JWT_SECRET);
        return decodedJwt;
    } catch (err) {
        return err;
    }
};
