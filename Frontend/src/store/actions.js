import axios from 'axios';

//Posts
export const fetchAllPosts = ({commit}) => {
    axios
    .get("http://localhost:4000/api/post", {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    })
    .then(response =>{commit('SET_POSTS', response.data)}) //on utiliser Set_Posts dans mutations qui remplira le Posts dans state
}


//export const fetchPost = ({commit}, postId) => {
  //  axios.get(`http://localhost:4000/api/post/${postId}`,
    //{
      //  headers: {
        //  Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    //    },
  //    })
 //     .then(response =>{commit('SET_POST', response.data)})
// }

//Comments
export const fetchAllComments = ({commit}, postId)=> {
    axios.get(`http://localhost:4000/api/post/${postId}/comment`,{
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
    })
    .then(response =>{commit('SET_COMMENTS', response.data)})
}

//Reactions
export const fetchAllReactions = ({commit}, postId)=> {
    axios.get(`http://localhost:4000/api/post/${postId}/react`,{
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
    })
    .then(response =>{commit('SET_REACTIONS', response.data)})
}

export const addALike = ({commit}, postId) => {
    axios.post(`http://localhost:4000/api/post/${postId}/react`, {
        userId: localStorage.getItem("userId"),
        postId: 5,
        isLike: "like"
    },{
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
    })
    .then(response =>{commit('SET_LIKE', response.data)})
}



