const { initializeDatabase } = require('./db/db.connect') 
const  Meetup = require("./model/meetup.model");  

const express = require('express') 

const app = express() 
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json()) 

initializeDatabase()        

// const newEvent = {
//   title: "Event Snapshot",
//   date: "Thu Oct 21st 2025",
//   time: "7:00 AM IST",
//   event: "Offline Event",
//   imageUrl: "https://images.unsplash.com/photo-1698502453332-03fa2ddceb71?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   hosted: "Photographer",
//   details: "Stay ahead of the game in the photography field by attending the photography worshop organized by Photography Expert. This offline workshop will be held on October 21st from 7:00 AM to 12:00 PM at Photography City, situated at 789 photography Avenue, City. Join industry leaders Tony Jordan, photographer, and Michael Brown, photographer, as they delve into the latest techniques and strategies in Photography. The workshop is open to individuals aged 18 and above and requires a ticket priced at ₹50,000. The dress code for the event is smart casual.",
//   dressCode: "Casuals",
//   ageRestriction: "18 and above",
//   eventTags: ["DLSR", "Strategy"],
//   address: "Photography City, 789 Photography Avenue, City",
//   price: "₹35,000",
//   speakerImg: "https://randomuser.me/api/portraits/men/36.jpg",
//   speakerName: ["Tony Jordan"],
//   speakerDesignation: ["Photographer"] 
// } 

async function createNewEvent(newEvent){
  try {
    const event = new Meetup(newEvent)
    const savedEvent = await event.save() 
    return savedEvent 
  } catch (error) {
    throw error 
  }
} 

app.post("/event", async (req, res) => {
  try {
    const event = await createNewEvent(req.body)
    res.status(200).json({message: "Added new event successfully.", event}) 
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({error: "Failed to add new event"})
  }
}) 

async function readAllEvents(){
  try {
    const event = Meetup.find() 
    return event 
  } catch (error) {
    throw error 
  }
}

app.get("/events", async (req, res) => {
  try {
    const event = await readAllEvents() 
    if(event){
      res.status(200).json({message: "Events Found", event}) 
    } else {
      res.status(404).json({error: "NO events data found."})
    }
  } catch (error) {
    res.status(500).json({error: "Unable to fetch events data."})
  }
})

const PORT = 3000 

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`) 
}) 