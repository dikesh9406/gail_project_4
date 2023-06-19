import Motor from '../models/motors.js'
import axios from 'axios';

const getlink = async(req, res)=>{
    try {
        res.cookie('_cfuvid', 'cookie-value', { secure: true, domain: 'gail-iitkgp-1.onrender.com' });
        res.cookie('__cf_bm', 'cookie-value', { secure: true, domain: 'gail-iitkgp-1.onrender.com' });

       
        const response = await axios.get('http://qts.iitkgp.ac.in/last/gail/current/2000');
        res.send(response.data); // Send the fetched data back to the client
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
      }

}

const addmotor  = async (req,res)=>{
    try {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
        const day = currentDate.getDate();

        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        const {motorName,motorBrand,motorLocation,motorStatus,motorType} = req.body;
        const data = await Motor.create({
            motorName,
            motorBrand,
            motorLocation,
            motorStatus,
            motorType,
            createdAt : formattedDate,
        })
        data.save();
        res.status(StatusCodes.CREATED).json({ msg : "data saved succesfully" });;
    } catch (error) {
        res.status(404).Json({msg : "Server Side issue data nor saved Successfully"});
    }
}

const showmotor = async (req, res) => {
    try {
      const data = await Motor.find().sort({ _id: -1 });
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ msg: "Server Side issue data not sent successfully" });
    }
  };
  

const realTimeData = async (req,res)=>{
    
}

export {addmotor, showmotor, realTimeData, getlink};