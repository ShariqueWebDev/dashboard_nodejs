const url = 'http://localhost:5000'

export const fetchApiloginUser = async(param) =>{
    try {
        const response = await fetch(`${url}${param}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(response)
        })
    
        if(response.ok){
            const storeData = await response.json()
            localStorage.setItem('userLogin', JSON.stringify(storeData))
        }
        
    } catch (error) {
        console.log(error);        
    }
}