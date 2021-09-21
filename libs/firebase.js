export const createPost = async (post) => {
    initFirebase();
   
    const dateCreated = new Date().getTime();
    post.dateCreated = dateCreated;
   
    return firebase.database().ref(`/posts/${post.slug}`).set(post);
  };