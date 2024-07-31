const app = require('./index');
const cors = require('cors');

const PORT =  5000;
app.use(cors())
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
