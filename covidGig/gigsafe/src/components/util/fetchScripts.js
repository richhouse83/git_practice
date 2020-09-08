import UserComponent from "../UserComponent";



const uri = 'http://localhost:4000';
const headers = {'Content-Type': 'application/json'};

const MongoReq = {
    addUser(user){
        let result = {};
        const newUser = JSON.stringify(user);
        //console.log(user.number + user.passCode)
        fetch(`${uri}/api/user/adduser`, {headers: headers, method : 'POST', body : newUser
        }).then(response=>{
            if (response.ok){
                fetch(`${uri}/api/user/getuser/${user.number}/${user.passCode}`
                ).then(response => response.json()
                ).then(jsonResponse => {
                    result.number = jsonResponse.number;
                    result._id = jsonResponse._id;
                });  
            }
        })
        return result;
    },
    getUsers(){
        let userArray = [];
        fetch(`${uri}/api/user`, {method: 'GET'
        }).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(jsonResponse=>{
                
                jsonResponse.map(user=>{
                    userArray.push({number: user.number, transmission: user.transmission, gigs_attended: user.gigs_attended});
                });
                //console.log(userArray);
        })
        return userArray;
    },
    addVenue(venue){
        const newVenue = JSON.stringify(venue);
        const reqResponse = fetch(`${uri}/api/venue/addvenue`, {headers: headers, method: 'POST', body: newVenue});
    return reqResponse;
    },
    addGig(gig){
        let reqResponse = ''
        const newGig = JSON.stringify(gig);
        fetch(`${uri}/api/gig/addgig`, {headers: headers, method: 'POST', body: newGig
    }).then(response=>{
        if(response.ok){
            reqResponse = `${gig.artist} show created successfully`;
        }
    });
    return reqResponse
    },
    addGigToUser(gig){
        const updateUser = JSON.stringify(gig);
        fetch(`${uri}/api/attended`, {headers: headers, method: 'PUT', body: updateUser});
    },
    updateTransmission(user){
        const updateUser = JSON.stringify(user);
        fetch(`${uri}/api/transmission`, {headers: headers, method: 'PUT', body: updateUser});
    },
    async getContactsList(){
        const contactsList = await fetch(`${uri}/api/contacts`
        ).then(response => response.json()
        ).then(jsonResponse => {
            return jsonResponse }
            );
        return contactsList;
    }
}

export default MongoReq;