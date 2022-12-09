import axios from "axios";

export const verifyToken = async (token) => {
    try {
        let response = await axios.post(`http://localhost:8000/verify-token`, {

            secret: process.env.REACT_APP_SECRET_KEY,
            token
        });
        return response.data;
    } catch (error) {
        console.log("error ", error);
    }
}
