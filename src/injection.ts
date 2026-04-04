import express from 'express';
import { injectionRunner } from './pipeline/injection/injection.runner.js';

const app = express();

app.use(express.json());

app.post('/inject', async (req, res) => {
  const nodeIds = req.body.nodeId;
  try{
    const context = await injectionRunner(nodeIds);
    res.status(200).json({
        success : true,
        message : "Injection process completed successfully", 
        data : context
    });
  }
  catch(error){
    res.status(500).json({
        success : false,
        error : "Internal Server Error"
    });
  }
});


app.listen(3000, () => console.log('Server is running on port 3000'));