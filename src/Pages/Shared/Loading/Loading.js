import React from "react";
import { Comment } from "react-loader-spinner";
const Loading = () => {
   return (
      <div className="z-50 flex items-center justify-center  fixed w-full min-h-screen  top-0 left-0">
         <Comment
            visible={true}
            height="200"
            width="200"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#F4442E"
         />
      </div>
   );
};

export default Loading;
