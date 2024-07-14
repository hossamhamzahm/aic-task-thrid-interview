import app from ".";
import get_config from "./config";



const port = get_config("PORT") || 3000


// starting the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})