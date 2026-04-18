import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "./AxiosToastError";

const fetchUserDetails = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        })
        return response.data
    }catch(error){
        AxiosToastError(error);
    }
}

export default fetchUserDetails