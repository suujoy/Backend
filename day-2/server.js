const express = require("express");

const app = express(); //Server Intense ko create karna

const users = [
    {
        name: "Amit Sharma",
        age: 24,
        gender: "male",
        profilePhoto:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        email: "amit.sharma@example.com",
        city: "Delhi",
        isActive: true,
        role: "developer",
    },
    {
        name: "Riya Sen",
        age: 22,
        gender: "female",
        profilePhoto:
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        email: "riya.sen@example.com",
        city: "Kolkata",
        isActive: false,
        role: "student",
    },
    {
        name: "Arjun Verma",
        age: 28,
        gender: "male",
        profilePhoto:
            "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9",
        email: "arjun.verma@example.com",
        city: "Bangalore",
        isActive: true,
        role: "designer",
    },
    {
        name: "Neha Gupta",
        age: 25,
        gender: "female",
        profilePhoto:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        email: "neha.gupta@example.com",
        city: "Mumbai",
        isActive: true,
        role: "hr",
    },
    {
        name: "Rohit Mehta",
        age: 30,
        gender: "male",
        profilePhoto:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        email: "rohit.mehta@example.com",
        city: "Pune",
        isActive: false,
        role: "manager",
    },
    {
        name: "Ananya Das",
        age: 23,
        gender: "female",
        profilePhoto:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        email: "ananya.das@example.com",
        city: "Bhubaneswar",
        isActive: true,
        role: "content writer",
    },
    {
        name: "Karan Singh",
        age: 27,
        gender: "male",
        profilePhoto:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
        email: "karan.singh@example.com",
        city: "Jaipur",
        isActive: true,
        role: "marketing",
    },
    {
        name: "Pooja Nair",
        age: 26,
        gender: "female",
        profilePhoto:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        email: "pooja.nair@example.com",
        city: "Kochi",
        isActive: false,
        role: "ui designer",
    },
    {
        name: "Sahil Khan",
        age: 21,
        gender: "male",
        profilePhoto:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
        email: "sahil.khan@example.com",
        city: "Bhopal",
        isActive: true,
        role: "intern",
    },
    {
        name: "Meera Iyer",
        age: 29,
        gender: "female",
        profilePhoto:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        email: "meera.iyer@example.com",
        city: "Chennai",
        isActive: true,
        role: "product manager",
    },
];

const states = [
  {
    name: "Andhra Pradesh",
    capital: "Amaravati",
    region: "South India",
    language: "Telugu",
    populationCrore: 5.3,
    areaSqKm: 162975,
    literacyRate: 67,
    foundedYear: 1956
  },
  {
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    region: "North East India",
    language: "English",
    populationCrore: 0.15,
    areaSqKm: 83743,
    literacyRate: 66,
    foundedYear: 1987
  },
  {
    name: "Assam",
    capital: "Dispur",
    region: "North East India",
    language: "Assamese",
    populationCrore: 3.6,
    areaSqKm: 78438,
    literacyRate: 73,
    foundedYear: 1950
  },
  {
    name: "Bihar",
    capital: "Patna",
    region: "East India",
    language: "Hindi",
    populationCrore: 12.4,
    areaSqKm: 94163,
    literacyRate: 70,
    foundedYear: 1950
  },
  {
    name: "Chhattisgarh",
    capital: "Raipur",
    region: "Central India",
    language: "Hindi",
    populationCrore: 3.0,
    areaSqKm: 135191,
    literacyRate: 71,
    foundedYear: 2000
  },
  {
    name: "Goa",
    capital: "Panaji",
    region: "West India",
    language: "Konkani",
    populationCrore: 0.16,
    areaSqKm: 3702,
    literacyRate: 88,
    foundedYear: 1987
  },
  {
    name: "Gujarat",
    capital: "Gandhinagar",
    region: "West India",
    language: "Gujarati",
    populationCrore: 7.0,
    areaSqKm: 196024,
    literacyRate: 79,
    foundedYear: 1960
  },
  {
    name: "Haryana",
    capital: "Chandigarh",
    region: "North India",
    language: "Hindi",
    populationCrore: 2.9,
    areaSqKm: 44212,
    literacyRate: 76,
    foundedYear: 1966
  },
  {
    name: "Himachal Pradesh",
    capital: "Shimla",
    region: "North India",
    language: "Hindi",
    populationCrore: 0.75,
    areaSqKm: 55673,
    literacyRate: 83,
    foundedYear: 1971
  },
  {
    name: "Jharkhand",
    capital: "Ranchi",
    region: "East India",
    language: "Hindi",
    populationCrore: 3.9,
    areaSqKm: 79716,
    literacyRate: 67,
    foundedYear: 2000
  },
  {
    name: "Karnataka",
    capital: "Bengaluru",
    region: "South India",
    language: "Kannada",
    populationCrore: 6.8,
    areaSqKm: 191791,
    literacyRate: 75,
    foundedYear: 1956
  },
  {
    name: "Kerala",
    capital: "Thiruvananthapuram",
    region: "South India",
    language: "Malayalam",
    populationCrore: 3.5,
    areaSqKm: 38863,
    literacyRate: 96,
    foundedYear: 1956
  },
  {
    name: "Madhya Pradesh",
    capital: "Bhopal",
    region: "Central India",
    language: "Hindi",
    populationCrore: 8.7,
    areaSqKm: 308245,
    literacyRate: 70,
    foundedYear: 1956
  },
  {
    name: "Maharashtra",
    capital: "Mumbai",
    region: "West India",
    language: "Marathi",
    populationCrore: 12.4,
    areaSqKm: 307713,
    literacyRate: 83,
    foundedYear: 1960
  },
  {
    name: "Manipur",
    capital: "Imphal",
    region: "North East India",
    language: "Manipuri",
    populationCrore: 0.32,
    areaSqKm: 22327,
    literacyRate: 79,
    foundedYear: 1972
  },
  {
    name: "Meghalaya",
    capital: "Shillong",
    region: "North East India",
    language: "English",
    populationCrore: 0.38,
    areaSqKm: 22429,
    literacyRate: 75,
    foundedYear: 1972
  },
  {
    name: "Mizoram",
    capital: "Aizawl",
    region: "North East India",
    language: "Mizo",
    populationCrore: 0.13,
    areaSqKm: 21081,
    literacyRate: 91,
    foundedYear: 1987
  },
  {
    name: "Nagaland",
    capital: "Kohima",
    region: "North East India",
    language: "English",
    populationCrore: 0.22,
    areaSqKm: 16579,
    literacyRate: 80,
    foundedYear: 1963
  },
  {
    name: "Odisha",
    capital: "Bhubaneswar",
    region: "East India",
    language: "Odia",
    populationCrore: 4.6,
    areaSqKm: 155707,
    literacyRate: 73,
    foundedYear: 1950
  },
  {
    name: "Punjab",
    capital: "Chandigarh",
    region: "North India",
    language: "Punjabi",
    populationCrore: 3.0,
    areaSqKm: 50362,
    literacyRate: 76,
    foundedYear: 1966
  },
  {
    name: "Rajasthan",
    capital: "Jaipur",
    region: "North West India",
    language: "Hindi",
    populationCrore: 8.1,
    areaSqKm: 342239,
    literacyRate: 69,
    foundedYear: 1956
  },
  {
    name: "Sikkim",
    capital: "Gangtok",
    region: "North East India",
    language: "Nepali",
    populationCrore: 0.07,
    areaSqKm: 7096,
    literacyRate: 82,
    foundedYear: 1975
  },
  {
    name: "Tamil Nadu",
    capital: "Chennai",
    region: "South India",
    language: "Tamil",
    populationCrore: 7.6,
    areaSqKm: 130058,
    literacyRate: 80,
    foundedYear: 1956
  },
  {
    name: "Telangana",
    capital: "Hyderabad",
    region: "South India",
    language: "Telugu",
    populationCrore: 3.9,
    areaSqKm: 112077,
    literacyRate: 72,
    foundedYear: 2014
  },
  {
    name: "Tripura",
    capital: "Agartala",
    region: "North East India",
    language: "Bengali",
    populationCrore: 0.41,
    areaSqKm: 10486,
    literacyRate: 87,
    foundedYear: 1972
  },
  {
    name: "Uttar Pradesh",
    capital: "Lucknow",
    region: "North India",
    language: "Hindi",
    populationCrore: 23.1,
    areaSqKm: 240928,
    literacyRate: 70,
    foundedYear: 1950
  },
  {
    name: "Uttarakhand",
    capital: "Dehradun",
    region: "North India",
    language: "Hindi",
    populationCrore: 1.1,
    areaSqKm: 53483,
    literacyRate: 79,
    foundedYear: 2000
  },
  {
    name: "West Bengal",
    capital: "Kolkata",
    region: "East India",
    language: "Bengali",
    populationCrore: 9.1,
    areaSqKm: 88752,
    literacyRate: 77,
    foundedYear: 1950
  }
];


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/about", (req, res) => {
    res.send("This is About ");
});

app.get("/data", (req, res) => {
    res.send(users);
});

app.get('/stateData',(req,res)=>{
    res.send(states)
})

app.listen(3000);
