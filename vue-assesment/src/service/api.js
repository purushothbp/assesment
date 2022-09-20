import axios from 'axios'

class AXIOS{
    constructor() {

    }
    async read(url){
        return await axios.get(url)
 }
 async insert(url,val) {
    return await axios.post(url,val)
}
async delete(url,val) {
    await axios.delete(url,val)
}
async update(url,val){
    await axios.put(url,val)
}
}
const route= new AXIOS
export default route;