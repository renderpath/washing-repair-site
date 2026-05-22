import 'dotenv/config';

import { app } from './app';

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});